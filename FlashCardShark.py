from flask import Flask, render_template, request, jsonify
import requests
from bs4 import BeautifulSoup
from docx import Document
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'docx'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"})
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"})
    if file and allowed_file(file.filename):
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        cards = process_document(filepath)
        return jsonify(cards)
    else:
        return jsonify([{"error": "No file part"}])

@app.route('/scrape', methods=['POST'])
def scrape_webpage():
    url = request.form.get('url')
    content = requests.get(url).text
    soup = BeautifulSoup(content, 'html.parser')
    text = soup.get_text()
    cards = convert_to_flashcards(text)
    return jsonify(cards)

@app.route('/text-to-cards', methods=['POST'])
def text_to_cards():
    user_text = request.form.get('text')
    cards = convert_to_flashcards(user_text)
    return jsonify(cards)

def process_document(filepath):
    doc = Document(filepath)
    full_text = []
    for para in doc.paragraphs:
        full_text.append(para.text)
    text = '\n'.join(full_text)
    return convert_to_flashcards(text)

def convert_to_flashcards(text):
    lines = text.splitlines()
    cards = []
    for line in lines:
        if line:  # check if line is not empty
            if ':' in line:
                question, answer = line.split(':', 1)
                cards.append({"question": question.strip(), "answer": answer.strip()})
            else:
                cards.append({"question": line, "answer": "Topic"})
    return cards


if __name__ == '__main__':
    app.run(debug=True)
