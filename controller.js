var WebSocket = new require('ws');
const {Docker} = require('node-docker-api');
const path = require("path")

//const docker = new Docker({ socketPath: 'C:\Program Files\Docker\Docker\resources\bin\dockerd' });
const docker = new Docker({ socketPath: '/var/run/docker.sock' });
const { Worker } = require("worker_threads")
'use strict';
const request = require('request-promise');

const options = {
    method: 'GET',
    uri: 'http://localhost:5240/api/Serversapi/1',
    json:true
}
const promisifyStream = stream => new Promise((resolve, reject) => {
    stream.on('data', data => console.log(data.toString()))
    stream.on('end', resolve)
    stream.on('error', reject)
  });
const faa =  request(options)
    .then(function (response) {
        const worker = new Worker("./worker.js", {
            workerData: response
        });

    })
    .catch(function (err) {
        // Произошло что-то плохое, обработка ошибки
    })



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
        console.log(data["Image"]);
        console.log(data)
        let stream;
        const worker1 = new Worker("./worker1.js",{
            workerData:data 
     })
        if (data["start"] == "dockercreate()") {
            docker.container.create(
                {
                    //Image: `${data["Image"]}`,
                    Image:`${data["Setup"]}`,
                    Cmd: [
                        '/bin/bash', '-c', 'tail -f /var/log/dmesg'
                    ],
                
                    ExposedPorts: {
                        "22/tcp": { }
                        },
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
                            "23/tcp": [{HostPort:"23"}]
                        }
                    },
                     NetworkSettings: {
                         Ports: {
                             "23/tcp": {}
                         }
                    }
                    }
                    
               
            )
             .then(container => container.start())
            //  docker.container.list()
            //  .then(containers => containers[0].status())
            //     .then(container => {
            //         _container = container
            //         return container.exec.create({
            //             AttachStdout: true,
            //             AttachStderr: true,
            //             Cmd: ['echo', 'test' ]
            //         })
            //     })
            //     .then(exec => {
            //         return exec.start({ Detach: true })
            //     })
            //     .then(stream =>  promisifyStream(stream))
            //     .catch(error => console.log(error))
            //     docker.container.list()
            //     .then(containers => containers[0].status())
            //     .then(container => container.logs({
            //         follow: true,
            //         stdout: true,
            //         stderr: true
            //       }))
            //       .then(stream => {
            //         stream.on('data', info => console.log(info))
            //         stream.on('error', err => console.log(err))
            //       })
        //      if(data["command"] =="dockercommand()"){ 
        //      docker.container.list()
        //      .then(containers => containers[0].status())
        //         .then(container => {
        //             _container = container
        //             return container.exec.create({
        //                 AttachStdout: true,
        //                 AttachStderr: true,
        //                 Cmd: ["echo","xuy"]
        //             })
        //         })
        //         .then(exec => {
        //             return exec.start({ Detach: true })
        //         })
        //         .then(stream => websocket.send(stream) =  promisifyStream(stream))
        //         .catch(error => console.log(error))
        //     console.log('ыыы')
        // }
    }
        if (data == "dockerstop()") {
            docker.container.list()
                .then(containers => containers[0].status())
                .then(container => container.stop());
        }
    });
    websocket.send("Open");
});
