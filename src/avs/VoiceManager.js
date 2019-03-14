
class VoiceManager{

    constructor(options = {}) {
    }
    requestMic() {
        return new Promise((resolve, reject) => {
          // Ensure that the file can be loaded in environments where navigator is not defined (node servers)
          if (!navigator.getUserMedia) {
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia || navigator.msGetUserMedia;
          }
          navigator.getUserMedia({
            audio: true
          }, (stream) => {
            return this.connectMediaStream(stream).then(resolve);
          }, (error) => {
            return reject(error);
          });
        });
    }
    
    
    connectMediaStream(stream) {
        return new Promise((resolve, reject) => {
          const isMediaStream = Object.prototype.toString.call(stream) === '[object MediaStream]';
    
          if (!isMediaStream) {
            const error = new TypeError('Argument must be a `MediaStream` object.')
            this.emit(AVS.EventTypes.ERROR, error);
            return reject(error);
          }
    
          this._audioContext = new AudioContext();
          this._sampleRate = this._audioContext.sampleRate;
          this._volumeNode = this._audioContext.createGain();
          this._audioInput = this._audioContext.createMediaStreamSource(stream);
          this._audioInput.connect(this._volumeNode);
          this._recorder = this._audioContext.createScriptProcessor(this._bufferSize, this._inputChannels, this._outputChannels);
    
          this._recorder.onaudioprocess = (event) => {
            if (!this._isRecording) {
              return false;
            }
    
            const left = event.inputBuffer.getChannelData(0);
            this._leftChannel.push(new Float32Array(left));
    
            if (this._inputChannels > 1) {
              const right = event.inputBuffer.getChannelData(1);
              this._rightChannel.push(new Float32Array(right));
            }
    
            this._recordingLength += this._bufferSize;
          };
    
          this._volumeNode.connect(this._recorder);
          this._recorder.connect(this._audioContext.destination);
    
          return resolve(stream);
        });
      }
}


module.exports = VoiceManager;

