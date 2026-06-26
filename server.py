#!/usr/bin/env python3
"""Simple dev server — run: python3 server.py"""
import http.server, socketserver, os

PORT = 8080
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def log_message(self, fmt, *args):
        pass  # quiet

with socketserver.TCPServer(('', PORT), Handler) as httpd:
    print(f'Command Center running at http://localhost:{PORT}')
    httpd.serve_forever()
