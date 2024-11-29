import unittest
from conversation.tutor import LanguageTutor

class TestLanguageTutor(unittest.TestCase):
    def setUp(self):
        self.tutor = LanguageTutor(
            personality='friendly',
            teaching_style='conversational',
            language='spanish'
        )

    def test_response_generation(self):
        response = self.tutor.generate_response('Hello, how are you?')
        self.assertIsNotNone(response)
        self.assertIsInstance(response, str)

    def test_evaluation(self):
        evaluation = self.tutor.evaluate_response('Me gusta la pizza')
        self.assertIn('accuracy', evaluation)
        self.assertIn('grammar', evaluation)
        self.assertIn('vocabulary', evaluation)
        self.assertIn('feedback', evaluation)

if __name__ == '__main__':
    unittest.main()