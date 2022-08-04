const { workerData} = require("worker_threads")
var WebSocket = new require('ws');
var websocket = new WebSocket.Server({
    port:3001
});
const docker = new Docker({ socketPath: '/var/run/docker.sock' });
var command = workerData
console.log(command)
function containerexec(){
    var container = docker.getContainer(`${command["Hostname"]}`);
    container.exec({Cmd: ['/bin/bash', '-c', `${data["com"]}`], AttachStdin: true, AttachStdout: true},function(err,exec){
    exec.start({hijack: true, stdin: true}, function(err, stream) {
        docker.modem.demuxStream(stream, process.stdout, process.stderr);
            })
        })
        container.attach({stream: true, stdout: true, stderr: true}, function (err, stream) {
           stream.pipe(process.stdout)
           stream.on("data", info => console.log(websocket.send(info)))  
       })
}