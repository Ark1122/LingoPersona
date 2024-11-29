# AI Service API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All endpoints require an API key to be passed in the header:
```
X-API-Key: your_api_key_here
```

## Endpoints

### Conversation API

#### POST /conversation
Generate a response from the AI tutor based on user input.

**Request:**
```json
{
  "user_id": "uuid",
  "message": "Hello, how are you?",
  "language": "en",
  "personality": "friendly",
  "teaching_style": "conversational"
}
```

**Response:**
```json
{
  "response": "Hi! I'm doing great, thank you. How can I help you with your language learning today?",
  "language": "en",
  "context": {
    "lesson_progress": 0.35,
    "current_topic": "greetings",
    "vocabulary_focus": ["hello", "how", "are", "you"]
  }
}
```

### Speech Processing

#### POST /speech-to-text
Convert speech audio to text.

**Request:**
Multipart form data:
- `audio`: Audio file (WAV format)
- `language`: Language code (e.g., "en", "es")

**Response:**
```json
{
  "text": "Hello, how are you?",
  "language": "en",
  "confidence": 0.95,
  "alternatives": [
    {
      "text": "Hello, how are you?",
      "confidence": 0.95
    }
  ]
}
```

#### POST /text-to-speech
Convert text to speech audio.

**Request:**
```json
{
  "text": "Hello, how are you?",
  "language": "en",
  "voice": "female",
  "speed": 1.0,
  "pitch": 1.0
}
```

**Response:**
```json
{
  "audio": "base64_encoded_audio_data",
  "language": "en",
  "voice": "female",
  "duration": 1.5
}
```

### Language Assessment

#### POST /evaluate
Evaluate user's language response.

**Request:**
```json
{
  "user_id": "uuid",
  "response": "Je suis allé au marché hier",
  "language": "fr",
  "context": {
    "lesson_id": "past-tense-1",
    "expected_patterns": ["être + allé", "hier"]
  }
}
```

**Response:**
```json
{
  "scores": {
    "grammar": 0.95,
    "vocabulary": 0.9,
    "pronunciation": 0.85
  },
  "feedback": {
    "general": "Excellent use of passé composé!",
    "corrections": [],
    "suggestions": [
      "Try using more varied vocabulary for time expressions"
    ]
  },
  "mastery": {
    "past_tense": 0.9,
    "time_expressions": 0.85
  }
}
```

### Error Handling

All endpoints follow a consistent error response format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

Common error codes:

- `INVALID_REQUEST`: Missing or invalid parameters
- `AUTHENTICATION_ERROR`: Invalid or missing API key
- `LANGUAGE_NOT_SUPPORTED`: Requested language is not supported
- `AUDIO_ERROR`: Issue with audio processing
- `MODEL_ERROR`: AI model processing error
- `RATE_LIMIT_EXCEEDED`: Too many requests

### Rate Limiting

Endpoints are rate-limited to:
- 60 requests per minute for conversation API
- 30 requests per minute for speech processing
- 100 requests per minute for text evaluation

Rate limit headers are included in all responses:
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 58
X-RateLimit-Reset: 1632825600
```

### Supported Languages

Currently supported languages:
- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Italian (it)
- Japanese (ja)
- Korean (ko)
- Mandarin Chinese (zh)

### Best Practices

1. **Error Handling**
   - Always check for error responses
   - Implement exponential backoff for rate limits
   - Cache responses when appropriate

2. **Performance**
   - Keep audio segments under 30 seconds
   - Batch evaluation requests when possible
   - Use appropriate audio formats (WAV, 16kHz, 16-bit)

3. **Context Management**
   - Maintain conversation context for better responses
   - Include relevant lesson context in evaluation requests
   - Track user progress and adjust difficulty accordingly