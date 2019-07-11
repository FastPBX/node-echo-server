let dgram = require('dgram');

let PORT = 55510;
let HOST = '0.0.0.0';

let server = [];

for (let i = 0; i < 10; i++) {

    // UDP Server
    server[i] = dgram.createSocket('udp4');

    server[i].on('listening', function () {
        let address = this.address();
        console.log('UDP Server listening on ' + address.address + ":" + address.port);
    }.bind(server[i]));

    server[i].on('close', function () {
        console.log('udp socket closed..');
    });

    server[i].on('message', function (message, remote) {
        console.log('Data received from client : ' + message.toString());

        this.send(new Buffer(message), remote.port, remote.address, function (err, bytes) {
            if (err) throw err;
            console.log(`UDP message sent to ${remote.address}:${remote.port}`);
        });

    }.bind(server[i]));

    server[i].bind(PORT + i, HOST);

}