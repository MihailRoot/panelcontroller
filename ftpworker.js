const { workerData} = require("worker_threads")
var datas = workerData
const { ftpd } = require('jsftpd')



const server = new ftpd({cnf: {username: `${datas["email"]}`, password: `${datas["name"]}`, basefolder: `${datas["containervolume"]}`}})

server.start()