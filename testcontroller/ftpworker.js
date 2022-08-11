const { ftpd } = require('jsftpd')
const { workerData} = require("worker_threads")
var datas = workerData

const server = new ftpd({cnf: {username: `${datas["email"]}`, password: `${datas["Name"]}`, basefolder: '/tmp'}})

server.start()
