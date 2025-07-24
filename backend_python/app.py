from flask import Flask
from flask_cors import CORS

from api.uploadController import qualityUpload_bp

app = Flask(__name__)

# ✅ Correct CORS config
CORS(
    app,
    origins=["http://localhost:5173"],  # your React dev server
    supports_credentials=True           # allows cookies, sessions
)


# quality upload
app.register_blueprint(qualityUpload_bp, url_prefix='/api')


if __name__ == '__main__':
    app.run(debug=True)