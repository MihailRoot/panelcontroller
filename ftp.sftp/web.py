import time
from pyftpdlib.authorizers import DummyAuthorizer
from pyftpdlib.handlers import FTPHandler
from pyftpdlib.servers import FTPServer
import requests
from threading 

class Ftp(threading.Thread):
    def __init__(self,req):
        super().__init__()
        self.req = req
    def run(self):

        auth = DummyAuthorizer()
        auth.add_user(f'{self.req["email"]}',f'{self.req["name"]}',"/",perm='')
        handler  = FTPHandler
        handler.authorizer = auth

        server = FTPServer(("0.0.0.0",21),handler)
        server.serve_forever()
        
get = requests.get('http://20.82.177.87:5062/Servers/Detailsapi/1')
json = get.json()
th = Ftp(json)
th.start()
