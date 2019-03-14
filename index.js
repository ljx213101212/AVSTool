var AuthManager = require("./src/avs/AuthManager")
var VoiceManager = require("./src/avs/VoiceManager") 

var vm = new VoiceManager();
vm.requestMic().then((e) =>{
  console.log(e);
});

var am = new AuthManager();




var AuthManagerTest = require("./src/test/AuthManagerTest")
var amTest = new AuthManagerTest();
amTest.buildAuthUrlTest();
amTest.getTokenFromUrlTest();
amTest.getSetTokenTest();

// //Pass
// console.log(am.buildAuthUrl());

// //https://localhost:3000/authresponse#access_token=Atza|IwEBIP1l6K6yU9NySgMm&token_type=bearer&expires_in=3600&scope=alexa%3Aall&state=6042d10f-6bcd-49

// //pass
// am.getTokenFromUrl().then((accToken) => {
//   console.log(accToken);
// });





// function helloworld(){
//   alert("hello");
// }

// window.synapse = {};
// window.synapse.helloworld = helloworld;