const Orvibo = require('./server/utils/Orvibo');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/server'));

const plugArray = str => {
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

const settings = {
    LOG_PACKET: true, //Show incoming packet data from the socket
    ORVIBO_KEY: process.env.orviboPK,
    plugInfo : 
        plugArray(process.env.plugArray)
    ,
};
let orvibo = new Orvibo(settings);
// When a socket first connects and initiates the handshake it will emit the connected event with the uid of the socket;
orvibo.on('plugConnected', ({uid, name}) => {
    console.log(`Connected ${uid} name = ${name}`);
});

// If the socket state is updated this event will fire
orvibo.on('plugStateUpdated', ({uid, state , name}) => {
    console.log(`Plug ${name} ${uid} updated state ${state}`);
});

// The plug sends a hearbeat to let the server know it's still alive
orvibo.on('gotHeartbeat', ({uid, name}) => {
    console.log(`Plug ${name} ${uid} sent heartbeat`);
});

// Called when the plug disconnects
orvibo.on('plugDisconnected', ({uid, name }) => {
    console.log(`Plug ${uid} - ${name} disconnected`);
});

// Called when the plug disconnects with an error ie it's been unplugged
orvibo.on('plugDisconnectedWithError', ({uid, name }) => {
    console.log(`Plug ${uid} - ${name} disconnected with error`);
});


// Start the Orvibo socket server
orvibo.startServer();

app.get('/', (req, res) => {
    // let sockets = orvibo.getConnectedSocket();
    let sockets = [{name: "Plug1", state: 1, uid: "222222"},{name: "Plug2", state: 0, uid: "111111"}]
    
    sockets.forEach(socket => {
        switch(socket.state) {
            case 1:
              socket.state = 'off'
              break;
            case 0:
              socket.state = 'on'
            break;
            default:
          }
    });

    const q = req.query
    if (q.uid != undefined) {
        orvibo.toggleSocket(q.uid);
    }

    res.render('index', {
        title: 'Orvibo b25 Server',
        sockets
    })
});

const server = app.listen(3000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });