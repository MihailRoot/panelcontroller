const { workerData} = require("worker_threads")
var datas = workerData
const { ftpd } = require('jsftpd')



const server = new ftpd({cnf: {username: `${datas["email"]}`, password: `${datas["name"]}`, basefolder: `/var/lib/docker/volumes/${datas["name"]}/_data`}})

server.start()
