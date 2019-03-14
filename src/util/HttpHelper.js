class HttpHelper{
    
    constructor(options = {}){
        this.xhr = new XMLHttpRequest();

    }

    sendHttpPost(options = { url:"", responseType:"json", postData:{}, successCB:(e)=>{}, errorCB:(e)=>{}}){
        xhr.open('POST', options.url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        xhr.onload = (event) => {
            options.successCB(event);
        }
        xhr.onerror = (event) => {
            options.errorCB(event);
        }
        xhr.responseType = options.responseType;
        xhr.send(options.postData);
    }
}
module.exports = HttpHelper;
