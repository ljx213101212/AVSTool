var AuthManager = require("./src/avs/AuthManager")
var VoiceManager = require("./src/avs/VoiceManager") 

var vm = new VoiceManager();
vm.requestMic().then((e) =>{
  console.log(e);
});

var am = new AuthManager();
console.log(am.buildAuthUrl());



// function helloworld(){
//   alert("hello");
// }

// window.synapse = {};
// window.synapse.helloworld = helloworld;