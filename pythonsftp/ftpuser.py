import os

from pyftpdlib.authorizers import DummyAuthorizer
from pyftpdlib.handlers import FTPHandler
from pyftpdlib.servers import FTPServer
import asyncio
import websockets
import json
import requests
from threading import Thread
async def createuser(websocket):
      while True: 
        try:
            message = await websocket.recv()
        except websockets.ConnectionClosedOK:
            break
        authorizer = DummyAuthorizer()
        jsone =json.loads(message)
        print(jsone["user"])
        fawq = requests.get("http://localhost:5240/api/Serversapi/1")
        responsedata = fawq.json()
        print(responsedata["name"])
        authorizer.add_user(f"{jsone['user']}",f"{jsone['pass']}", '.', perm='elradfmwMT')
async def main():
    async with websockets.serve(createuser,"",8001):
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())