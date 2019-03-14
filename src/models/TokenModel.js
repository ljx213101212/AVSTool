
var TokenDefault = {
    GRANT_TYPE : "refresh_token",
    ACCESS_TOKEN:"",
    REFRESH_TOKEN:"",
    TOKEN_ROOT_URL: "https://api.amazon.com/auth/o2/token",
    ACCESS_CODE:""
}
class TokenModel{
    constructor(options = {}) {

        //Private properties
        this._grantType = TokenDefault.GRANT_TYPE;
        this._accessToken = TokenDefault.ACCESS_TOKEN;
        this._refreshToken = TokenDefault.REFRESH_TOKEN;
        this._tokenRootURL = TokenDefault.TOKEN_ROOT_URL;
        this._accessCode = TokenDefault.ACCESS_CODE;

    }

    //Getter/Setter
    get grantType(){ return this._grantType; }
    set grantType(value = TokenDefault.GRANT_TYPE){
       this._scope = value;
    }

    get accessToken() { return this._accessToken;}
    set accessToken(value = TokenDefault.ACCESS_TOKEN){
        this._accessToken = value;
    }

    get refreshToken() { return this._refreshToken;}
    set refreshToken(value = TokenDefault.REFRESH_TOKEN){
        this._refreshToken = value;
    }

    get tokenRootURL() { return this._tokenRootURL;}
    set tokenRootURL(value = TokenDefault.TOKEN_ROOT_URL){
        this._tokenRootURL = value;
    }

    get accessCode() { return this._accessCode;}
    set accessCode(value = TokenDefault.ACCESS_CODE){
        this._accessCode = value;
    }
}

module.exports = TokenModel;