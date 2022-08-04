const { workerData} = require("worker_threads")
var Docker = require('dockerode');

const {Docker} = require('node-docker-api');
const promisifyStream = stream => new Promise((resolve, reject) => {
    stream.on('data', data => console.log(data.toString()))
    stream.on('end', resolve)
    stream.on('error', reject)
  });
//const docker = new Docker({ socketPath: 'C:\Program Files\Docker\Docker\resources\bin\dockerd' });
const docker = new Docker({ socketPath: '/var/run/docker.sock' });
var usernameagate = workerData
console.log(usernameagate)
if(usernameagate["command"] =="dockercommand()"){ 
    docker.container.list()
    .then(containers => containers[0].status())
       .then(container => {
           _container = container
           return container.exec.create({
               AttachStdout: true,
               AttachStderr: true,
               Cmd: ["echo","xuy"]
           })
       })
       .then(exec => {
           return exec.start({ Detach: true })
       })
       .then(stream => stream=  promisifyStream(stream))
       .catch(error => console.log(error))
       docker.container.list()
            .then(containers => containers[0].status())
            .then(container => container.logs({
                follow: true,
                stdout: true,
                stderr: true
              }))
              .then(stream => {
                stream.on('data', info => console.log(info))
                stream.on('error', err => console.log(err))
              })
   console.log('ыыы')
}