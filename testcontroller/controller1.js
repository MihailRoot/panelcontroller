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
        console.log(data)
        console.log(data["Id"])
        const options = {
            method: 'GET',
            uri: `http://20.82.177.87:5062/Servers/Detailsapi/${data["Id"]}`,
            json:true
            }
            const information = request(options)
            .then((response) => {
                console.log(response)
            const ftpworker = new Worker("./ftpworker.js",{
                workerData: response,
            })
        // const containerexec = new Worker("./containerexec.js",{
        //     workerData: data,
        // })
        var auxContainer;
        var secContainer;


          docker.createContainer({
            Image: `${response["image"]}`,
            AttachStdin: false,
            AttachStdout: true,
            AttachStderr: true,
            Tty: true,
            ExposedPorts: {
              "22/tcp": { }
              },
           Cmd: ["/bin/bash","-c",`${response['setup']}`],
           OpenStdin: false,
           StdinOnce: false
          }, function(err,container){
            container.start()
             container.inspect(function(err,data){
                  var gethostname = data[["Config"]];
                  const containerexec = new Worker("./containerexec.js",{
                           workerData: gethostname,
                       })
                
              })
              container.attach({stream: true, stdout: true, stderr: true}, function (err, stream) {
                stream.pipe(process.stdout)
                stream.on("data", info => console.log(websocket.send(info)))  
            })
          })

 
          });
    }) 
    })
