# -*- coding: utf-8 -*-
import http.server
import socketserver
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

socketserver.TCPServer.allow_reuse_address = True

try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at http://localhost:{PORT}/", flush=True)
        httpd.serve_forever()
except OSError:
    PORT = 8081
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Port 8080 busy, serving at http://localhost:{PORT}/", flush=True)
        httpd.serve_forever()
