from flask import jsonify

def handle_error(error):
    """Handle different types of errors and return appropriate responses."""
    if isinstance(error, ValueError):
        return jsonify({
            'error': str(error),
            'type': 'ValueError'
        }), 400
    
    if isinstance(error, KeyError):
        return jsonify({
            'error': 'Missing required field',
            'type': 'KeyError',
            'details': str(error)
        }), 400
    
    # Handle unexpected errors
    return jsonify({
        'error': 'Internal server error',
        'type': type(error).__name__,
        'details': str(error)
    }), 500