from flask import Flask, request, jsonify
from conversation.tutor import LanguageTutor
from speech.speech_to_text import SpeechToText
from speech.text_to_speech import TextToSpeech
from utils.error_handlers import handle_error

app = Flask(__name__)

# Initialize services
stt = SpeechToText()
tts = TextToSpeech()
tutors = {}

@app.route('/api/conversation', methods=['POST'])
def conversation():
    try:
        data = request.json
        user_id = data['user_id']
        message = data['message']
        language = data.get('language', 'en')
        
        # Get or create tutor for user
        if user_id not in tutors:
            tutors[user_id] = LanguageTutor(
                personality=data.get('personality', 'friendly'),
                teaching_style=data.get('teaching_style', 'conversational'),
                language=language
            )
        
        # Generate response
        response = tutors[user_id].generate_response(message)
        
        return jsonify({
            'response': response,
            'language': language
        })
    except Exception as e:
        return handle_error(e)

@app.route('/api/speech-to-text', methods=['POST'])
def transcribe_speech():
    try:
        audio_data = request.files['audio'].read()
        language = request.form.get('language', 'en')
        
        text = stt.transcribe(audio_data, language)
        
        return jsonify({
            'text': text,
            'language': language
        })
    except Exception as e:
        return handle_error(e)

@app.route('/api/text-to-speech', methods=['POST'])
def synthesize_speech():
    try:
        data = request.json
        text = data['text']
        language = data.get('language', 'en')
        voice = data.get('voice', 'female')
        
        audio_data = tts.synthesize(text, language, voice)
        
        return jsonify({
            'audio': audio_data.hex(),
            'language': language,
            'voice': voice
        })
    except Exception as e:
        return handle_error(e)

@app.route('/api/evaluate', methods=['POST'])
def evaluate_response():
    try:
        data = request.json
        user_id = data['user_id']
        response = data['response']
        
        if user_id not in tutors:
            return jsonify({'error': 'No active tutor found'}), 404
            
        evaluation = tutors[user_id].evaluate_response(response)
        
        return jsonify(evaluation)
    except Exception as e:
        return handle_error(e)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)