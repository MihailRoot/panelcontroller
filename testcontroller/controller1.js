const { Worker } = require("worker_threads")
const express = require('express')
const app = express()

var WebSocket = new require('ws');
var websocket = new WebSocket.Server({
    port:3000
});
const request = require('request-promise');

var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
websocket.on('connection', (websocket) => {
    websocket.on('message', function message(data) {
        var data = data.toString()

        
        // const containerexec = new Worker("./containerexec.js",{
        //     workerData: data,
        // })
        var auxContainer;
        var secContainer;
        app.get('http://localhost:5240/api/Serversapi/1',(req,res)=>{
            console.log(req)
        })
        docker.createContainer({
          Image: 'ubuntu',
          AttachStdin: false,
          AttachStdout: true,
          AttachStderr: true,
          Tty: true,
          ExposedPorts: {
            "22/tcp": { }
            },
          Cmd: ['/bin/bash', '-c',""],
          OpenStdin: false,
          StdinOnce: false
        }, function(err,container){
            container.inspect(function(err,data){
                var gethostname = data[["Config"]];
                const containerexec = new Worker("./containerexec.js",{
                         workerData: gethostname,
                     })
                
            })

             
        //  });
         })
    })
    });
