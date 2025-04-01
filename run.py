from flask import Flask, jsonify, render_template, redirect, url_for, flash, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Дозволяє взаємодію між фронтендом і бекендом

@app.route('/cart')
def get_message():
    return jsonify({"message": "asd!"})

if __name__ == '__main__':
    app.run(debug=True)