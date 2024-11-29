import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AddWordModal({ onAdd, onClose }) {
  const [wordData, setWordData] = useState({
    term: '',
    translation: '',
    context: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...wordData,
      mastery: 'learning'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add New Word</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Word or Phrase
            </label>
            <input
              type="text"
              value={wordData.term}
              onChange={(e) => setWordData({ ...wordData, term: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Translation
            </label>
            <input
              type="text"
              value={wordData.translation}
              onChange={(e) => setWordData({ ...wordData, translation: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Example Context
            </label>
            <textarea
              value={wordData.context}
              onChange={(e) => setWordData({ ...wordData, context: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={wordData.notes}
              onChange={(e) => setWordData({ ...wordData, notes: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="2"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Word
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}