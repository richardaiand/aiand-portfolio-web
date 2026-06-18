from flask import Flask, send_from_directory, abort
import os

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory(os.path.dirname(__file__), 'index.html')

@app.route('/<path:path>')
def static_files(path):
    # Prevent serving hidden or dot-files and block directory traversal
    if path.startswith('.') or '..' in path:
        abort(404)
    return send_from_directory(os.path.dirname(__file__), path)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
