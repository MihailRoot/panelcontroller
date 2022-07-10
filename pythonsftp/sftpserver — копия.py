import os

from pyftpdlib.authorizers import DummyAuthorizer
from pyftpdlib.handlers import FTPHandler
from pyftpdlib.servers import FTPServer
import asyncio
import websockets
import json
import requests
from threading import Thread
#async def createuser(websocket):
 #     while True: 
 #       try:
 #          message = await websocket.recv()
  #    except websockets.ConnectionClosedOK:
   #         break
  #      authorizer = DummyAuthorizer()
   #     jsone =json.loads(message)
   #     print(jsone["user"])
  #      fawq = requests.get("http://localhost:5240/api/Serversapi/1")
  #      responsedata = fawq.json()
  #      print(responsedata["name"])
  #      authorizer.add_user(f"{jsone['user']}",f"{jsone['pass']}", '.', perm='elradfmwMT')
def handler():
    # Instantiate a dummy authorizer for managing 'virtual' users
    authorizer = DummyAuthorizer()
    fawq = requests.get("http://localhost:5240/api/Serversapi/1")
    responsedata = fawq.json()
    authorizer.add_user(f"{responsedata['ftpuser']}",f"{responsedata['ftppassword']}", '.', perm='elradfmwMT')
    # Define a new user having full r/w permissions and a read-only
    # anonymous user


    # Instantiate FTP handler class
    handler = FTPHandler
    handler.authorizer = authorizer

    # Define a customized banner (string returned when client connects)
    handler.banner = "pyftpdlib based ftpd ready."

    # Specify a masquerade address and the range of ports to use for
    # passive connections.  Decomment in case you're behind a NAT.
    #handler.masquerade_address = '151.25.42.11'
    #handler.passive_ports = range(60000, 65535)

    # Instantiate FTP server class and listen on 0.0.0.0:2121
    address = ('', 2121)
    server = FTPServer(address, handler)

    # set a limit for connections
    server.max_cons = 256
    server.max_cons_per_ip = 5
    # start ftp server
    server.serve_forever()
#async def main():
  #  async with websockets.serve(handler,"",8001):
   #     await asyncio.Future()
if __name__ == "__main__":
   handler()
