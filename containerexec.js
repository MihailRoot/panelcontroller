var Docker = require('dockerode');

const { workerData} = require("worker_threads")
const docker = new Docker({ socketPath: '/var/run/docker.sock' });
var command = workerData
console.log(command["com"])

    var container = docker.getContainer(`${command["ContainerId"]}`);
    container.exec({Cmd: ['/bin/bash', '-c', `${command["com"]}`], AttachStdin: true, AttachStdout: true},function(err,exec){
    exec.start({hijack: true, stdin: true}, function(err, stream) {
        docker.modem.demuxStream(stream, process.stdout, process.stderr);
            })
        })
