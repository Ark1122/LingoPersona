import os
from typing import Dict, Any

class ModelLoader:
    """Utility class for loading and managing AI models."""
    
    def __init__(self):
        self.models: Dict[str, Any] = {}
        self.model_path = os.getenv('MODEL_PATH', 'models')
    
    def load_model(self, model_name: str) -> Any:
        """Load a model if not already loaded."""
        if model_name not in self.models:
            # Placeholder for actual model loading logic
            self.models[model_name] = {
                'name': model_name,
                'loaded': True
            }
        return self.models[model_name]
    
    def unload_model(self, model_name: str) -> None:
        """Unload a model to free up memory."""
        if model_name in self.models:
            # Placeholder for actual model unloading logic
            del self.models[model_name]
    
    def get_model(self, model_name: str) -> Any:
        """Get a loaded model or load it if not available."""
        return self.models.get(model_name) or self.load_model(model_name)