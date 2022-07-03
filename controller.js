var WebSocket = new require('ws');
const {Docker} = require('node-docker-api');


//const docker = new Docker({ socketPath: 'C:\Program Files\Docker\Docker\resources\bin\dockerd' });
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

'use strict';
const request = require('request');
const https = require('https')
var FTPS = require('ftps');
/*request.post(
    'localhost:7240/Nodes/Details/1',

    {
    json: true,
    body:{

    }
},

)*/


var websocket = new WebSocket.Server({
    port:3000
});

/*const promisifyStream = stream => new Promise((resolve, reject) => {
    stream.on('data', data => console.log(data.toString()))
    stream.on('end', resolve)
    stream.on('error', reject)
});
let _container;
*/

websocket.on('connection', (websocket) => {
    websocket.on('message', function message(data) {
        data = JSON.parse(data);
        console.log(data["username"]);
        console.log(data)

        if (data["start"] == "dockercreate()") {
            docker.container.create(
                {
                    Image: `ubuntu`,
                    Cmd: [
                       // "/bin."`apt-get -y update`,"apt-get install -y nginx"
                    ],
                
                
                    Mounts: [
                        {
                            Target: `/var/lib/docker/volumes/${data["containerid"]}/_data`,
                            Source: `${data["containerid"]}`,
                            Type: "volume",
                            ReadOnly: false
                        }
                    ],
                    HostConfig: {
                        PortBindings: {
                            "22/tcp": [{HostPort:"11022"}]
                        }
                    },
                     NetworkSettings: {
                         Ports: {
                             "22/tcp": {}
                         }
                    }
                    }
                    
               
            )

/*              then(container => container.start())
               .then(container => {
                    _container = container
                    return container.exec.create({
                        AttachStdout: true,
                        AttachStderr: true,
                        Cmd: ['echo', 'test']
                    })
                })
                .then(exec => {
                    return exec.start({ Detach: false })
                })
                .then(stream => promisifyStream(stream))*/
            console.log('ыыы')//
        }
        if (data == "dockerstop()") {
            docker.container.list()
                .then(containers => containers[0].status())
                .then(container => container.stop());
        }
        var username = data["username"]
        var password = 6

    });
    websocket.send("Open");
});

const FtpSrv = require('ftp-srv');

const port = 21;
const ftpServer = new FtpSrv({
    url: "ftp://0.0.0.0:" + port,
    anonymous: true
});

setInterval(fa,1)
function fa() {

    return ftpServer.on('login', ({ connection, username, password }, resolve, reject) => {
        if (username === 'ihail' && password === 'Xserewer') {
            return resolve({ root: "/home/" });
        }
        return reject(new errors.GeneralError('Invalid username or password', 401));
    });
    

}
ftpServer.listen().then(() => {
    console.log('Ftp server is starting...')
})