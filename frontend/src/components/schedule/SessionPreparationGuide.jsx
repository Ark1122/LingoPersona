import React, { useState } from 'react';
import { Clipboard, CheckSquare, Clock, Book, Headphones, MessageCircle, ChevronRight, ChevronDown } from 'lucide-react';

export default function SessionPreparationGuide({ session, previousSessions }) {
  const [expandedSection, setExpandedSection] = useState(null);

  const preparationSteps = {
    conversation: [
      {
        title: 'Review Previous Topics',
        icon: Book,
        items: [
          'Go through notes from your last session',
          'Practice key phrases and vocabulary',
          'Identify areas where you needed clarification'
        ],
        resources: previousSessions.slice(-1).map(s => ({
          title: `Session Notes - ${new Date(s.date).toLocaleDateString()}`,
          type: 'notes',
          path: `/sessions/${s.id}/notes`
        }))
      },
      {
        title: 'Prepare Discussion Points',
        icon: MessageCircle,
        items: [
          'List 3-5 topics you want to discuss',
          'Prepare questions about previous topics',
          'Think of real-life situations to practice'
        ]
      },
      {
        title: 'Set Up Your Environment',
        icon: Headphones,
        items: [
          'Find a quiet space for your session',
          'Test your microphone and headphones',
          'Have water and any notes nearby'
        ]
      }
    ],
    vocabulary: [
      {
        title: 'Review Word List',
        icon: Book,
        items: [
          'Go through vocabulary from last session',
          'Identify challenging words',
          'Practice pronunciation of new terms'
        ],
        resources: [
          {
            title: 'Recent Vocabulary List',
            type: 'flashcards',
            path: '/vocabulary/recent'
          }
        ]
      },
      {
        title: 'Prepare Examples',
        icon: MessageCircle,
        items: [
          'Create sentences using new words',
          'Think of contextual examples',
          'List any questions about usage'
        ]
      }
    ],
    listening: [
      {
        title: 'Equipment Check',
        icon: Headphones,
        items: [
          'Test audio equipment',
          'Ensure good internet connection',
          'Find a quiet environment'
        ]
      },
      {
        title: 'Mental Preparation',
        icon: Book,
        items: [
          'Review common listening patterns',
          'Practice active listening techniques',
          'Prepare note-taking materials'
        ]
      }
    ]
  };

  const getTimeUntilSession = () => {
    const now = new Date();
    const sessionTime = new Date(session.date);
    const minutesUntil = Math.floor((sessionTime - now) / (1000 * 60));
    
    if (minutesUntil < 60) {
      return `${minutesUntil} minutes`;
    }
    const hours = Math.floor(minutesUntil / 60);
    return `${hours} hours`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <Clipboard className="w-6 h-6 mr-2 text-blue-500" />
          Session Preparation Guide
        </h2>
        <div className="text-sm text-gray-600 flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          Starts in {getTimeUntilSession()}
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Preparation Progress</span>
          <span className="text-sm font-medium text-blue-600">
            {Math.round((completedSteps / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 rounded-full h-2 transition-all duration-300"
            style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Preparation Steps */}
      <div className="space-y-4">
        {preparationSteps[session.type]?.map((step, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => setExpandedSection(expandedSection === index ? null : index)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center">
                <step.icon className="w-5 h-5 text-blue-500 mr-3" />
                <span className="font-medium">{step.title}</span>
              </div>
              {expandedSection === index ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedSection === index && (
              <div className="px-4 py-3 bg-gray-50 border-t">
                <ul className="space-y-3">
                  {step.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start"
                    >
                      <CheckSquare className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>

                {step.resources && step.resources.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Helpful Resources</h4>
                    <div className="space-y-2">
                      {step.resources.map((resource, resourceIndex) => (
                        <a
                          key={resourceIndex}
                          href={resource.path}
                          className="flex items-center text-blue-500 hover:text-blue-600 text-sm"
                        >
                          <ChevronRight className="w-4 h-4 mr-1" />
                          {resource.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}