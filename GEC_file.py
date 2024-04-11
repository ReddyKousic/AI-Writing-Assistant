from transformers import T5ForConditionalGeneration, T5Tokenizer
import os

def save_model(model, tokenizer, save_dir):
    model.save_pretrained(save_dir)
    tokenizer.save_pretrained(save_dir)

def load_model(model_dir):
    loaded_model = T5ForConditionalGeneration.from_pretrained(model_dir)
    loaded_tokenizer = T5Tokenizer.from_pretrained(model_dir)
    return loaded_model, loaded_tokenizer

def correct_grammar_with_saved_model(input_texts, num_return_sequences, model_dir):
    model, tokenizer = load_model(model_dir)
    corrected_texts = []
    for input_text in input_texts:
        batch = tokenizer([input_text], truncation=True, padding='max_length', max_length=64, return_tensors="pt")
        translated = model.generate(**batch, max_length=64, num_beams=4, num_return_sequences=num_return_sequences, temperature=1.5)
        tgt_text = tokenizer.batch_decode(translated, skip_special_tokens=True)
        corrected_texts.append(tgt_text)

    return corrected_texts

if __name__ == "__main__":
    input_texts = [
        "what happenning?",
        "He don't like it.",
        "The cat are on the mat."
    ]
    num_return_sequences = 1
    model_dir = "saved_grammar_corrector_model"

    model = T5ForConditionalGeneration.from_pretrained("deep-learning-analytics/GrammarCorrector")
    tokenizer = T5Tokenizer.from_pretrained("deep-learning-analytics/GrammarCorrector")
    save_model(model, tokenizer, model_dir)

    corrected_texts = correct_grammar_with_saved_model(input_texts, num_return_sequences, model_dir)

    print("Original Texts:")
    for text in input_texts:
        print(text)
    print("\nCorrected Texts:")
    for corrected_text in corrected_texts:
        print(corrected_text[0])