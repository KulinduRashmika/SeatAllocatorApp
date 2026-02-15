import React from 'react';
import { ChevronLeft, Info, Calendar, Check, Wallet, FileText, Armchair, RefreshCw, Headphones } from 'lucide-react';

const TrackRegistration = () => {
  const timelineSteps = [
    {
      id: 1,
      icon: <Check className="w-6 h-6" />,
      title: 'Application Submitted',
      description: 'Successfully received and logged in the central system.',
      timestamp: 'Oct 12, 10:30 AM',
      status: 'completed',
      iconBg: 'bg-blue-600',
      iconColor: 'text-white'
    },
    {
      id: 2,
      icon: <Wallet className="w-6 h-6" />,
      title: 'Payment Completed',
      description: 'Transaction #TXN-8821 confirmed. Receipt sent to email.',
      timestamp: 'Oct 12, 10:45 AM',
      status: 'completed',
      iconBg: 'bg-blue-600',
      iconColor: 'text-white'
    },
    {
      id: 3,
      icon: <FileText className="w-6 h-6" />,
      title: 'Document Review',
      description: 'Academic committee is verifying your submitted documents and eligibility.',
      timestamp: '',
      status: 'in-progress',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      badge: 'In Progress',
      info: 'Typical review time is 2-3 business days. You will be notified via SMS once completed.'
    },
    {
      id: 4,
      icon: <Armchair className="w-6 h-6" />,
      title: 'Seat Allocation',
      description: 'Venue and seat details will be visible once document review is approved.',
      timestamp: '',
      status: 'pending',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between mb-6">
        <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">
          Track Registration
        </h1>
        <button className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-colors">
          <Info className="w-6 h-6" />
        </button>
      </div>

      <div className="px-4">
        {/* Registration Card */}
        <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-gray-500 text-xs font-semibold tracking-wider mb-1">
                REGISTRATION ID
              </p>
              <p className="text-blue-600 text-xl font-bold">
                #REG-99283-AM
              </p>
            </div>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold">
              ACTIVE
            </span>
          </div>
          <h2 className="text-gray-900 text-xl font-bold mb-3">
            Advanced Mathematics Mid-term
          </h2>
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            Exam Date: Nov 15, 2023
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-6">
          <h3 className="text-gray-500 text-sm font-semibold tracking-wide mb-5">
            APPLICATION TIMELINE
          </h3>
          
          <div className="relative">
            {timelineSteps.map((step, index) => (
              <div key={step.id} className="relative pb-10 last:pb-0">
                {/* Timeline Line */}
                {index < timelineSteps.length - 1 && (
                  <div 
                    className={`absolute left-8 top-16 w-0.5 h-full ${
                      step.status === 'completed' ? 'bg-blue-600' : 'bg-gray-300'
                    } ${step.status === 'in-progress' ? 'bg-gradient-to-b from-blue-600 to-gray-300' : ''}`}
                    style={{ 
                      backgroundImage: step.status === 'in-progress' 
                        ? 'repeating-linear-gradient(0deg, #2563eb 0px, #2563eb 10px, #d1d5db 10px, #d1d5db 20px)' 
                        : undefined 
                    }}
                  />
                )}
                
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${step.iconBg} rounded-2xl flex items-center justify-center ${step.iconColor} flex-shrink-0 z-10`}>
                    {step.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-gray-900 font-bold text-lg">
                        {step.title}
                      </h4>
                      {step.badge && (
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">
                          {step.badge}
                        </span>
                      )}
                      {step.timestamp && (
                        <span className="text-gray-400 text-sm">
                          {step.timestamp}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      {step.description}
                    </p>
                    
                    {/* Info Box */}
                    {step.info && (
                      <div className="bg-blue-50 rounded-xl p-4 flex gap-3">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-blue-700 text-sm leading-relaxed">
                          {step.info}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all">
            <RefreshCw className="w-5 h-5" />
            Refresh Status
          </button>
          <button className="w-14 h-14 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-xl flex items-center justify-center transition-all">
            <Headphones className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackRegistration;