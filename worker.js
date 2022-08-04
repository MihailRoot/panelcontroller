const { workerData} = require("worker_threads")
var usernameagate = workerData["email"]
console.log(usernameagate)
const FtpSrv = require('ftp-srv');

const port = 21;

const ftpServer = new FtpSrv({
    url: "ftp://0.0.0.0:" + port,
    anonymous: true
});

ftpServer.on('login', ({ connection, username, password }, resolve, reject) => {
    if (username === `${usernameagate}` && password === 'Xserewer') {
        return path.resolve({ root: "/home/" });
    }
    return reject(new errors.GeneralError('Invalid username or password', 401));
});

ftpServer.listen().then(() => {
    console.log('Ftp server is starting...')
})