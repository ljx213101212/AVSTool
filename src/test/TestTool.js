var GOOD_TEMPLATE = "PASSED: ";
var FAIL_TEMPLATE = "FAILED: ";

var POSITIVE = function (text){
    console.log(`%c${GOOD_TEMPLATE}${text}`,'color: green');
}

var NEGAVITE = function (text){
    console.log(`%c${FAIL_TEMPLATE}${text}`, 'color:red');
}

var TestTool = {


    assertNotNull: (func, val)=>{ 
        if (typeof val === "undefined"){
            NEGAVITE(func.name);
        }else{
            POSITIVE(func.name);
        }
    },

    assertEqual:(func,a,b) =>{
        if (a !== b){
            NEGAVITE(func.name);
        }else{
            POSITIVE(func.name);
        }
    }
}

module.exports = TestTool;