const AuthModel = require("./../models/AuthModel")
const TokenModel = require("./../models/TokenModel")
const AppLog = require("./../util/AppLog")
const HttpHelper = require("./../util/HttpHelper")
const qs = require('qs');

class AuthManager{

    constructor(options = {}) {

        this.authModel = new AuthModel();
        this.tokenModel = new TokenModel();
        this.appLog = new AppLog({debug:true});
        this.httpHelper = new HttpHelper();
        //this.authModel.responseType = "code";
        this.authUrl = this.buildAuthUrl();
    }

    //#region ResponseTypeIsToken
    buildAuthUrl(){
        this.authUrl =  `https://www.amazon.com/ap/oa?`+
        `client_id=${this.authModel.clientId}`+
        `&scope=${encodeURIComponent(this.authModel.scope)}`+
        `&scope_data=${encodeURIComponent(JSON.stringify(this.authModel.scopeData))}`+
        `&response_type=${this.authModel.responseType}`+
        `&redirect_uri=${encodeURI(this.authModel.redirectUri)}`

        return this.authUrl;
    }

    //Use it when authModel responseType is token.
    getTokenFromUrl() {
        return new Promise((resolve, reject) => {
          let hash = window.location.hash.substr(1);
    
          const query = qs.parse(hash);
          const token = query.access_token;
          const refreshToken = query.refresh_token;
          const tokenType = query.token_type;
          const expiresIn = query.expiresIn;
    
          if (token) {
            this.setToken(token).then( (token) => {
                return resolve(token);
            });
            //this.emit(AVS.EventTypes.LOGIN);
            this.appLog.log('Logged in.');
            //I don't think we can get refreshToken here.But anyway.
            //Sample Implicit grant 
            //https://developer.amazon.com/docs/alexa-voice-service/authorize-companion-site.html#implicit-grant
            //https://localhost:3000/authresponse#access_token=Atza|IwEBIP1l6K6yU9NySgMm&token_type=bearer&expires_in=3600&scope=alexa%3Aall&state=6042d10f-6bcd-49
            if (refreshToken) {
              this.setRefreshToken(refreshToken);
            }
          }else{
            return reject();
          }
        });
    }

    //Promise thenable(token)
    getToken() {
      return new Promise((resolve, reject) => {
        const token = this.tokenModel.accessToken;
        if (token) {
          return resolve(token);
        }
        return reject();
      });
    }

    //Return:
    //Promise thenable(token)
    setToken(token) {
      return new Promise((resolve, reject) => {
        if (typeof token === 'string') {
          this.tokenModel.accessToken = token;
          //this.emit(AVS.EventTypes.TOKEN_SET);
          this.appLog.log('Token set.');
          resolve(this.tokenModel.accessToken);
        } else {
          const error = new TypeError('`token` must be a string.');
          this.appLog.log(error);
          reject(error);
        }
      });
    }
    //#endregion ResponseTypeIsToken

    //#region ResponseTypeIsCode

    buildRefreshTokenPostData(){
      const postData = `grant_type=${this.tokenModel.grantType}`+
      `&refresh_token=${this.tokenModel.refreshToken}`+
      `&client_id=${this.authModel.clientId}`+
      `&client_secret=${this.authModel.clientSecret}`+
      `&redirect_uri=${encodeURIComponent(this.authModel.redirectUri)}`

      return postData;
    }
    
    
    getCodeFromUrl() {
      return new Promise((resolve, reject) => {
        const query = qs.parse(window.location.search.substr(1));
        const code = query.code;
        if (code) {
          return resolve(code);
        }
        return reject(null);
      });
    }

    //Use it when authModel responseType is code.
    // Sample response    
    // {
    //   "access_token": "Atza|IQEBLjAsAhRBejiZKPfn5HO2562GBt26qt23EA",
    //   "expires_in": 3600,
    //   "refresh_token": "Atzr|IQEBLzAtAhUAibmh-1N0EsdqwqwdqdasdvferrE",  
    //   "token_type": "bearer"
    // }
    getTokenFromCode(code) {
      return new Promise((resolve, reject) => {
        if (typeof code !== 'string') {
          const error = new TypeError('`code` must be a string.');
          this.appLog.log(error);
          return reject(error);
        }
  
        const grantType = 'authorization_code';
        const postData = `grant_type=${grantType}&code=${code}&client_id=${this._clientId}&client_secret=${this._clientSecret}&redirect_uri=${encodeURIComponent(this._redirectUri)}`;
        const url = 'https://api.amazon.com/auth/o2/token';
  
        const xhr = new XMLHttpRequest();
  
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        xhr.onload = (event) => {
          let response = xhr.response;
  
          try {
            response = JSON.parse(xhr.response);
          } catch (error) {
            this.appLog.log(error);
            return reject(error);
          }
  
          const isObject = response instanceof Object;
          const errorDescription = isObject && response.error_description;
  
          if (errorDescription) {
            const error = new Error(errorDescription);
            this.appLog.log(error);
            return reject(error);
          }
  
          const token = response.access_token;
          const refreshToken = response.refresh_token;
          const tokenType = response.token_type;
          const expiresIn = response.expiresIn;
  
          this.setToken(token)
          this.setRefreshToken(refreshToken)
  
          this.emit(AVS.EventTypes.LOGIN);
          this.appLog.log('Logged in.');
          resolve(response);
        };
  
        xhr.onerror = (error) => {
          this.appLog.log(error);
          reject(error);
        };
  
        xhr.send(postData);
      });
  }

  
    setRefreshToken(refreshToken) {
      return new Promise((resolve, reject) => {
        if (typeof refreshToken === 'string') {
          this.tokenModel.refreshToken = refreshToken;
          //this.emit(AVS.EventTypes.REFRESH_TOKEN_SET);
          this.appLog.log('Refresh token set.');
          resolve(this._refreshToken);
        } else {
          const error = new TypeError('`refreshToken` must be a string.');
          this.appLog.log(error);
          reject(error);
        }
      });
    }
    refreshToken() {
      return this.getTokenFromRefreshToken(this._refreshToken)
      .then((tokenModel) => {
        return {
          token: tokenModel.accessToken,
          refreshToken: tokenModel.refreshToken
        };
      });
    }
    // Sample response    
    // {
    //   "access_token": "Atza|IQEBLjAsAhQ3yD47Jkj09BfU_qgNk4",
    //   "expires_in": 3600,
    //   "refresh_token": "Atzr|IQEBLzAtAhUAibmh-1N0EVztZJofMx",
    //   "token_type": "bearer"
    // }
    getTokenFromRefreshToken(refreshToken = this._refreshToken) {
      return new Promise((resolve, reject) => {
        if (typeof refreshToken !== 'string') {
          const error = new Error('`refreshToken` must a string.');
          this.appLog.log(error);
          return reject(error);
        }
        
        const postData = this.buildRefreshTokenPostData();
        const postOptions = {
            url: this.tokenModel.tokenRootURL,
            responseType: 'json',
            successCB: (event) => {
              const response = xhr.response;
  
              if (response.error) {
                const error = response.error.message;
                //this.emit(AVS.EventTypes.ERROR, error);
      
                return reject(error);
              } else  {
                const token = response.access_token;
                const refreshToken = response.refresh_token;
                this.setToken(token);
                this.setRefreshToken(refreshToken);
      
                return resolve(this.tokenModel);
              }
            },
            errorCB: (event) => {
              this.appLog.log(error);
              reject(error);
            },
            postData:postData
        }
        this.httpHelper.sendHttpPost(postOptions);
      });
    }
    
    //#endregion ResponseTypeIsCode


}
module.exports = AuthManager;