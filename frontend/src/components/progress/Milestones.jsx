import React from 'react';
import { Flag, Target, ArrowRight, CheckCircle } from 'lucide-react';

export default function Milestones({ progress, goals }) {
  const calculateProgress = (goal) => {
    const current = progress[goal.metric] || 0;
    return Math.min(100, Math.round((current / goal.target) * 100));
  };

  const getStatusColor = (percentage) => {
    if (percentage >= 100) return 'text-green-500';
    if (percentage >= 60) return 'text-yellow-500';
    return 'text-blue-500';
  };

  const formatValue = (value, metric) => {
    switch (metric) {
      case 'study_time':
        return `${Math.round(value / 60)} hours`;
      case 'accuracy':
        return `${value}%`;
      default:
        return value;
    }
  };

  const getNextMilestone = (goal) => {
    const current = progress[goal.metric] || 0;
    const milestones = goal.milestones.sort((a, b) => a - b);
    return milestones.find(m => m > current) || milestones[milestones.length - 1];
  };

  return (
    <div className="space-y-8">
      {/* Current Goals */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Target className="w-6 h-6 mr-2" />
          Current Goals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map(goal => {
            const progressPercent = calculateProgress(goal);
            const statusColor = getStatusColor(progressPercent);
            const nextMilestone = getNextMilestone(goal);

            return (
              <div key={goal.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold">{goal.title}</h4>
                    <p className="text-sm text-gray-600">{goal.description}</p>
                  </div>
                  <goal.icon className={`w-6 h-6 ${statusColor}`} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {formatValue(progress[goal.metric] || 0, goal.metric)}
                    </span>
                    <span className={statusColor}>
                      {formatValue(nextMilestone, goal.metric)}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${progressPercent >= 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {progressPercent >= 100 && (
                  <div className="mt-4 flex items-center text-green-500 text-sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Goal Achieved!
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Milestone Timeline */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Flag className="w-6 h-6 mr-2" />
          Milestone Timeline
        </h3>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200" />

          {/* Milestone Items */}
          <div className="space-y-8">
            {goals.map(goal => (
              <div key={goal.id} className="relative pl-16">
                {/* Timeline Point */}
                <div className="absolute left-7 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500" />

                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="font-semibold mb-2">{goal.title}</h4>
                  <div className="space-y-4">
                    {goal.milestones.map((milestone, index) => {
                      const current = progress[goal.metric] || 0;
                      const isAchieved = current >= milestone;
                      const isNext = !isAchieved && current < milestone && 
                        (index === 0 || current >= goal.milestones[index - 1]);

                      return (
                        <div
                          key={milestone}
                          className={`flex items-center justify-between p-3 rounded-lg ${isAchieved
                            ? 'bg-green-50'
                            : isNext
                              ? 'bg-blue-50'
                              : 'bg-gray-50'}`}
                        >
                          <div className="flex items-center">
                            {isAchieved ? (
                              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            ) : isNext ? (
                              <Target className="w-5 h-5 text-blue-500 mr-2" />
                            ) : (
                              <div className="w-5 h-5 border-2 rounded-full mr-2" />
                            )}
                            <span className={isAchieved ? 'text-green-700' : isNext ? 'text-blue-700' : 'text-gray-600'}>
                              {formatValue(milestone, goal.metric)}
                            </span>
                          </div>

                          {isNext && (
                            <div className="flex items-center text-sm text-blue-500">
                              Next Milestone
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}