const { workerData} = require("worker_threads")
var datas = workerData
const FtpSrv = require('ftp-srv');
const path = require('path');

const port=21;
const ftpServer = new FtpSrv({
    url: "ftp://0.0.0.0:" + port,
    anonymous: false
});

ftpServer.on("login", ({ connection, username, password }, resolve, reject) => { 
    if(username === `${datas["email"]}` && password === `${datas["name"]}`){
            return resolve({ root:"/home/" });    
    }
    return reject(new errors.GeneralError('Invalid username or password', 401));
});

ftpServer.listen().then(() => { 
    console.log('Ftp server is starting...')
});