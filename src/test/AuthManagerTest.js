var AuthManager = require("./../avs/AuthManager")
var TestTool = require("./TestTool")

class AuthManagerTest{

    constructor(options = {}){
        this.am = new AuthManager();
        this.tt = TestTool;
    }

    //Test buildAuthUrl
    buildAuthUrlTest(){
        //Pass
        //console.log(this.am.buildAuthUrl());
        var url = this.am.buildAuthUrl();
        this.tt.assertNotNull(this.buildAuthUrlTest,url);
    }
    //Test getTokenFromUrl
    ////https://localhost:3000/authresponse#access_token=Atza|IwEBIP1l6K6yU9NySgMm&token_type=bearer&expires_in=3600&scope=alexa%3Aall&state=6042d10f-6bcd-49
    getTokenFromUrlTest(){
        //Pass
        this.am.getTokenFromUrl().then((token) => {
           // console.log(token);
           this.tt.assertNotNull(this.getTokenFromUrlTest,token);
        });
      
    }

    getSetTokenTest(){
        this.am.setToken("hahaha").then((token)=>{
            console.log(token);
            this.am.getToken().then((gotToken) =>{
                // if (token === gotToken){
                //     console.log("ok");
                // }
                this.tt.assertEqual(this.getSetTokenTest, token,gotToken);
            });
        });
    }
}

module.exports = AuthManagerTest;