
var DeviceDefault = {
    DEVICE_ID : "test_device",
    DEVICE_SERAIL_NUMBER: 123
};
var scope = "alexa:all";
var AuthDefault = {
  
    CLIENT_ID:"amzn1.application-oa2-client.696ab90fc5844fdbb8efc17394a79c00",
    //amzn1.application-oa2-client.696ab90fc5844fdbb8efc17394a79c00
    //amzn1.application-oa2-client.a99e70a874e24fd7943c4064f4eec8b6
    CLIENT_SECRET:"",
    SCOPE:"alexa:all",
    SCOPE_DATA: {
        [scope]: {
            productID:  DeviceDefault.DEVICE_ID,
            productInstanceAttributes: {
              deviceSerialNumber: DeviceDefault.DEVICE_SERAIL_NUMBER
            }
        }
    },
    RESPONSE_TYPE: "token",
    REDIRECT_URI:`https://${window.location.host}/authresponse`
}

class AuthModel{
    constructor(options = {}) {

        //Private properties
        this._scope = AuthDefault.SCOPE;
        this._scopeData = AuthDefault.SCOPE_DATA;
        this._responseType = AuthDefault.RESPONSE_TYPE;
        this._redirectUri = AuthDefault.REDIRECT_URI;
        this._clientId = AuthDefault.CLIENT_ID;
        this._clientSecret = AuthDefault.CLIENT_SECRET;

    }

    //Getter/Setter
    get scope(){ return this._scope; }
    set scope(value = AuthDefault.SCOPE){
       this._scope = value;
    }

    get scopeData(){ return this._scopeData;}
    set scopeData(value = AuthDefault.SCOPE_DATA){
        this._scopeData = value;
    }

    get responseType() { return this._responseType;}
    set responseType(value = AuthDefault.RESPONSE_TYPE){
        this._responseType = value;
    }

    get redirectUri() { return this._redirectUri;}
    set redirectUri(value = AuthDefault.REDIRECT_URI){
        this._redirectUri = value;
    }

    get clientId() { return this._clientId;}
    set clientId(value = AuthDefault.CLIENT_ID){
        this._clientId = value;
    }

    get clientSecret() { return this._clientSecret;}
    set clientSecret(value = AuthDefault.CLIENT_SECRET){
        this._clientSecret = value;
    }
}

module.exports = AuthModel;