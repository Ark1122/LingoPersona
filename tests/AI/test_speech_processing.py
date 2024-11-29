import unittest
from AI.speech.speech_to_text import SpeechToText
from AI.speech.text_to_speech import TextToSpeech

class TestSpeechProcessing(unittest.TestCase):
    def setUp(self):
        self.stt = SpeechToText()
        self.tts = TextToSpeech()

    def test_speech_to_text_supported_languages(self):
        self.assertIn('en', self.stt.supported_languages)
        self.assertIn('es', self.stt.supported_languages)

    def test_speech_to_text_unsupported_language(self):
        with self.assertRaises(ValueError):
            self.stt.transcribe(b'audio_data', 'unsupported_language')

    def test_text_to_speech_voices(self):
        self.assertIn('en', self.tts.voices)
        self.assertIn('male', self.tts.voices['en'])
        self.assertIn('female', self.tts.voices['en'])

    def test_text_to_speech_synthesis(self):
        audio_data = self.tts.synthesize(
            'Hello, how are you?',
            language='en',
            voice='female'
        )
        self.assertIsInstance(audio_data, bytes)

if __name__ == '__main__':
    unittest.main()