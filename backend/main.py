from flask import Flask, request, jsonify
from transformers import T5ForConditionalGeneration, T5Tokenizer
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

"""Loading the saved model and tokenizer from the specified directory."""
def load_model(model_dir):
    """Load the saved model and tokenizer from the specified directory."""
    loaded_model = T5ForConditionalGeneration.from_pretrained(model_dir)
    loaded_tokenizer = T5Tokenizer.from_pretrained(model_dir)
    return loaded_model, loaded_tokenizer
model_dir = "saved_grammar_corrector_model"
model, tokenizer = load_model(model_dir)
def correct_grammar(input_text, num_return_sequences):
    """Correct the grammar of the input text using the saved model."""
    batch = tokenizer([input_text], truncation=True, padding='max_length', max_length=512, return_tensors="pt")
    translated = model.generate(**batch, max_length=512, num_beams=4, num_return_sequences=num_return_sequences, temperature=1.5)
    tgt_text = tokenizer.batch_decode(translated, skip_special_tokens=True)
    return tgt_text

@app.route('/correct_grammar', methods=['POST'])
def handle_grammar_correction():
    """Endpoint to correct the grammar of the input text."""
    print("Request Received...")

    input_text = request.json['text']
    corrected_text = correct_grammar(input_text, 1)[0]
    return jsonify({"data":corrected_text})

if __name__ == '__main__':
    print("Starting the App....")
    app.run(debug=False, host="0.0.0.0", port="5000")