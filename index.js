const Orvibo = require('./server/utils/Orvibo');
const utils = require('./server/utils/Utils')
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/server'));

const settings = {
    LOG_PACKET: true, //Show incoming packet data from the socket
    ORVIBO_KEY: process.env.orviboPK,
    plugInfo : 
        utils.generatePlugArray(process.env.plugArray)
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
    let sockets = orvibo.getConnectedSocket();
    // let sockets = [{name: "Plug1", state: 1, uid: "222222", modelId: "f8b11bed724647e98bd07a66dca6d5b6"},{name: "Plug2", state: 0, uid: "111111",  modelId: "f8b11bed724647e98bd07a66dca6d5b6"}]
    
    if (req.query.uid != undefined) {
        orvibo.toggleSocket(req.query.uid);
    }

    sockets = orvibo.getConnectedSocket();

    utils.setState(sockets)

    res.render('index', {
        title: 'Orvibo b25 Server',
        sockets
    })
});

const server = app.listen(3000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });