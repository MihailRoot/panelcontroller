const { Worker } = require("worker_threads")
const request = require('request-promise');

var WebSocket = new require('ws');
var websocket = new WebSocket.Server({
    port:3000
});

var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
websocket.on('connection', (websocket) => {

    websocket.on('message', function message(data) {

        var data = JSON.parse(data)
        console.log(data["start"])
        console.log(data["Id"]) // get id for get

        const createdocker = new Worker("./dockercreate.js",{
            workerData: data ,
        })
        const options = {
            method: 'GET',
            uri: `http://20.82.178.99:5240/Servers/Detailsapi/${data["Id"]}`,
            json:true
            }

            if (data["stop"] === "dockerstop()"){
              const dockerun = request(options)
              .then((response) => {
                  console.log(response)
               const ftpworker = new Worker("./dockerstop.js",{
                   workerData: response,
               })
         // const containerexec = new Worker("./containerexec.js",{
         //     workerData: data,
         // })
           });
         }
            if (data["run"] === "dockerun()"){
              const dockerun = request(options)
              .then((response) => {
                  console.log(response)
               const ftpworker = new Worker("./dockerun.js",{
                   workerData: response,
               })
         // const containerexec = new Worker("./containerexec.js",{
         //     workerData: data,
         // })
         var container = docker.getContainer(`${response["containerId"]}`);
         container.attach({stream: true, stdout: true, stderr: true}, function (err, stream) {
           stream.pipe(process.stdout)
           stream.on("data", info => websocket.send((info)))  
         })
           });
         }
            const information = request(options)
            .then((response) => {
                console.log(response)
             const ftpworker = new Worker("./ftpworker.js",{
                 workerData: response,
             })

          if(data["start"] === "dockercreate()"){
           const dockercontainerinfo = request(options)
          .then((response) => {
               var container = docker.getContainer(`${response["containerId"]}`);
               container.start()
               container.attach({stream: true, stdout: true, stderr: true}, function (err, stream) {
                stream.pipe(process.stdout)
                stream.on("data", info => websocket.send((info)))  
              })
            }) 
          }
        })
      })
    })
    //If it will be error, node js wont crash!
    process.on('uncaughtException', function (err) {
        console.error(err);
        console.log("Node NOT Exiting...");
      });
