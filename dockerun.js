const { Worker, workerData } = require("worker_threads")
var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
var datas = workerData

var container = docker.getContainer(`${workerData["containerId"]}`)

container.start(function (err,data){
console.log(data)
});