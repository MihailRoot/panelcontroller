import time
from pyftpdlib.authorizers import DummyAuthorizer
from pyftpdlib.handlers import FTPHandler
from pyftpdlib.servers import FTPServer
import websocket
auth = DummyAuthorizer()
auth.add_user("Userhere","Password","Dir",perm='')
handler  = FTPHandler
handler.authorizer = auth;

server = FTPServer(("0.0.0.0",21),handler)
server.serve_forever()
