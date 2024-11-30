import React, { useState } from 'react';
import { Book, Video, Headphones, Globe, Star, Filter, Search, BookOpen, Play, ExternalLink, X } from 'lucide-react';

export default function LearningResources({ learnerProfile, currentTopics }) {
  // Previous code remains the same...

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold flex items-center">
          <Book className="w-7 h-7 mr-2 text-blue-500" />
          Learning Resources
        </h2>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Category Filter */}
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap ${selectedCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.label}
            </button>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div className="relative">
          <button
            className="flex items-center px-4 py-2 bg-white rounded-lg border hover:bg-gray-50"
            onClick={() => document.getElementById('difficultySelect').click()}
          >
            <Filter className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-gray-700">
              {difficulties.find(d => d.id === difficultyFilter)?.label}
            </span>
          </button>
          <select
            id="difficultySelect"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="absolute opacity-0 inset-0 w-full cursor-pointer"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty.id} value={difficulty.id}>
                {difficulty.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>

      {/* Empty State */}
      {recommendations.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Book className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No resources found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters or search terms to find more resources.
          </p>
        </div>
      )}

      {/* Resource Preview Modal */}
      {selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="relative h-64">
              <img
                src={selectedResource.thumbnail}
                alt={selectedResource.title}
                className="w-full h-full object-cover rounded-t-lg"
              />
              <button
                onClick={() => setSelectedResource(null)}
                className="absolute top-4 right-4 p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-1">
                    {selectedResource.title}
                  </h2>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span>{selectedResource.rating}</span>
                    <span className="mx-2">•</span>
                    <span>{selectedResource.reviewCount} reviews</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {selectedResource.duration}
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                {selectedResource.description}
              </p>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setSelectedResource(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Close
                </button>
                <a
                  href={selectedResource.url}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                >
                  Start Learning
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}