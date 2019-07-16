module.exports.generateRandomTextValue = function(length) {
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
};

module.exports.generateRandomHexValue = function(length) {
    let chars = '0123456789abcdef';
    let result = '';
    for (let i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
};

module.exports.generateRandomNumber = function(length) {
    let numbers = '0123456789';
    let result = '';
    for (let i = length; i > 0; --i) {
        result += numbers[Math.floor(Math.random() * numbers.length)];
    }
    return parseInt(result);
};

module.exports.generatePlugArray = function(str) {
        const arr = str.split(',');
        const pairs = [];
        for (let i=0; i<arr.length; i+=2) {
          let o = {};
          o.uid = arr[i].split(':')[1];
          o.name = arr[i+1].split(':')[1];
          pairs.push(o);
        }
        return pairs;
      }    

module.exports.sleep = function(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }      

module.exports.setState = function(sockets) {
    sockets.forEach(socket => {
        switch(socket.state) {
            case 1:
              socket.state = 'OFF'
              break;
            case 0:
              socket.state = 'ON'
            break;
            default:
          }
    });
}  