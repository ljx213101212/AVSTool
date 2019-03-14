class AppLog{

    constructor(options = {}){
        this._debug = options.debug;
    }

    log(type, message) {
        if (type && !message) {
          message = type;
          type = 'log';
        }
    
        setTimeout(() => {
          //this.emit(AVS.EventTypes.LOG, message);
        }, 0);
    
        if (this._debug) {
          console[type](message);
        }
    }
}
module.exports = AppLog;