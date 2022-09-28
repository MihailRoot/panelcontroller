const { Worker } = require("worker_threads")
const { parentPort,workerData} = require("worker_threads")
const request = require('request-promise');
const Docker = require('dockerode');
const docker = new Docker({socketPath: '/var/run/docker.sock'});
var datas = workerData
const options = {
    method: 'GET',
    uri: `http://20.82.177.87:5240/Servers/Detailsapi/${datas["Id"]}`,
    json:true
    }
if (datas["start"] === "dockercreate()"){
    const fas = request(options)
    .then((response) => {


  docker.createContainer({
    Image: `${response["image"]}`,
    AttachStdin: false,
    AttachStdout: true,
    AttachStderr: true,
    Tty: true,
    ExposedPorts: {
      "22/tcp": { }
      },
   //Cmd: ["/bin/bash","-c",`${response['setup']}`],
   Cmd: ["/bin/bash","-c",`apt-get update`],
   OpenStdin: false,
   StdinOnce: false,
   HostConfig: {
    Mounts: [
        {
           Target:   "/home/container/",
           Source:   `${response["name"]}`,
           Type:     "volume",
           ReadOnly: false
        }
     ]
}
  }, function(err,container){
     container.inspect(function(err,data){
        var gethostname = data[["Config"]];
         // websocket.send(gethostname["Hostname"])
          const containerexec = new Worker("./containerexec.js",{
                   workerData: gethostname,
               })
               const options1 = {
                method:"PUT",
                uri:`http://20.82.177.87:5240/Servers/Detailsapi/${datas["Id"]}`,
                body:{
                    "id":`1`,
                    "name":response["name"],
                    "ContainerId":gethostname["Hostname"],
                    "ip":response["ip"],
                    "email":response["email"],
                    "setup": response["setup"],
                    "image": response["image"],
                    "cpu": response["cpu"],
                    "memory": response["memory"],
                    "disk": response["disk"],
                    "port": response["port"],
                },
                json:true
            }
            request(options1)
                .then(function (response) {
                   console.log(response)
                })
                .catch(function (err) {
                    console.log(err)
                })
      })

  })

})
     
}