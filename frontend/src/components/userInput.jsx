import React, { useState } from 'react';
import { Calendar, Filter, Send, RotateCcw, Sparkles, Clock } from 'lucide-react';

const UserInput = ({ onDataSubmit }) => {
  const [startingWeek, setStartingWeek] = useState('1');
  const [startingMonth, setStartingMonth] = useState('1');
  const [endingWeek, setEndingWeek] = useState('1');
  const [endingMonth, setEndingMonth] = useState('1');
  const [selectedBasis, setSelectedBasis] = useState('Type of Claim');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weeks = ['1', '2', '3', '4'];

  const basisOptions = [
    'Type of Claim',
    'Customer Name',
    'Customer Type',
    'Customer Location',
    'Claim Responsibility',
    'Part Or Filter'
  ];

  const generateWeekMonthPairs = () => {
    const pairs = [];
    const startMonth = parseInt(startingMonth);
    const endMonth = parseInt(endingMonth);
    const startWeek = parseInt(startingWeek);
    const endWeek = parseInt(endingWeek);

    for (let month = startMonth; month <= endMonth; month++) {
      const weekStart = month === startMonth ? startWeek : 1;
      const weekEnd = month === endMonth ? endWeek : 4;

      for (let week = weekStart; week <= weekEnd; week++) {
        pairs.push([week, month]);
      }
    }
    return pairs;
  };

  const handleSubmit = () => {
    const pairs = generateWeekMonthPairs();
    const data = {
      selectedBasis,
      weekMonthPairs: pairs,
      rawData: {
        startingWeek: parseInt(startingWeek),
        startingMonth: parseInt(startingMonth),
        endingWeek: parseInt(endingWeek),
        endingMonth: parseInt(endingMonth)
      }
    };

    if (onDataSubmit) {
      onDataSubmit(data);
    }
  };

  const handleReset = () => {
    setStartingWeek('1');
    setStartingMonth('1');
    setEndingWeek('1');
    setEndingMonth('1');
    setSelectedBasis('Type of Claim');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-6xl pt-2 mx-auto relative z-10">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 px-10 py-6 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white">Data Filter Configuration</h1>
              </div>
              <p className="text-purple-100/80 text-base">Configure your advanced data analysis parameters</p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Time Period Selection + Live Preview */}
              <div className="lg:col-span-2 space-y-6">
                {/* Time Period */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Clock className="h-6 w-6 text-blue-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Time Period Selection</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Start */}
                    <div className="group">
                      <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-2xl p-4 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                          <h3 className="font-bold text-blue-100 text-base">Starting Period</h3>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-semibold text-blue-200 mb-2">
                              Starting Week
                            </label>
                            <select
                              value={startingWeek}
                              onChange={(e) => setStartingWeek(e.target.value)}
                              className="w-full px-4 py-2 bg-gray-900/60 border border-gray-600/50 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm hover:bg-gray-800/60"
                            >
                              {weeks.map(week => (
                                <option key={week} value={week} className="bg-gray-900">Week {week}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-blue-200 mb-2">
                              Starting Month
                            </label>
                            <select
                              value={startingMonth}
                              onChange={(e) => setStartingMonth(e.target.value)}
                              className="w-full px-4 py-2 bg-gray-900/60 border border-gray-600/50 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm hover:bg-gray-800/60"
                            >
                              {months.map((month, index) => (
                                <option key={index + 1} value={index + 1} className="bg-gray-900">{month}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* End */}
                    <div className="group">
                      <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-2xl p-4 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-300"></div>
                          <h3 className="font-bold text-purple-100 text-base">Ending Period</h3>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-semibold text-purple-200 mb-2">
                              Ending Week
                            </label>
                            <select
                              value={endingWeek}
                              onChange={(e) => setEndingWeek(e.target.value)}
                              className="w-full px-4 py-2 bg-gray-900/60 border border-gray-600/50 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm hover:bg-gray-800/60"
                            >
                              {weeks.map(week => (
                                <option key={week} value={week} className="bg-gray-900">Week {week}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-purple-200 mb-2">
                              Ending Month
                            </label>
                            <select
                              value={endingMonth}
                              onChange={(e) => setEndingMonth(e.target.value)}
                              className="w-full px-4 py-2 bg-gray-900/60 border border-gray-600/50 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm hover:bg-gray-800/60"
                            >
                              {months.map((month, index) => (
                                <option key={index + 1} value={index + 1} className="bg-gray-900">{month}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Preview */}
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-4 border border-gray-600/30 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-1000"></div>
                    <h3 className="font-bold text-green-100 text-base">Live Preview</h3>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded-lg">
                      <span className="text-gray-400 font-medium">Selected Basis:</span>
                      <span className="text-cyan-200 font-semibold">{selectedBasis}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded-lg">
                      <span className="text-gray-400 font-medium">Period:</span>
                      <span className="text-purple-200 font-semibold text-right">
                        Week {startingWeek}, {months[parseInt(startingMonth) - 1]}
                        <br />
                        → Week {endingWeek}, {months[parseInt(endingMonth) - 1]}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded-lg">
                      <span className="text-gray-400 font-medium">Data Points:</span>
                      <span className="text-green-200 font-bold text-base">{generateWeekMonthPairs().length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analysis Basis */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Filter className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Analysis Basis</h2>
                </div>

                <div className="bg-gradient-to-br from-cyan-900/40 to-teal-900/40 rounded-2xl p-4 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-700"></div>
                    <h3 className="font-bold text-cyan-100 text-base">Select Analysis Type</h3>
                  </div>

                  <div className="space-y-2">
                    {basisOptions.map((option) => (
                      <label key={option} className="flex items-center group cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-all duration-200">
                        <div className="relative">
                          <input
                            type="radio"
                            name="basis"
                            value={option}
                            checked={selectedBasis === option}
                            onChange={(e) => setSelectedBasis(e.target.value)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                            selectedBasis === option
                              ? 'border-cyan-400 bg-cyan-400'
                              : 'border-gray-500 group-hover:border-cyan-400'
                          }`}>
                            {selectedBasis === option && (
                              <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                            )}
                          </div>
                        </div>
                        <span className={`ml-4 font-medium transition-colors duration-200 ${
                          selectedBasis === option
                            ? 'text-cyan-100'
                            : 'text-gray-300 group-hover:text-cyan-200'
                        }`}>
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-700/50">
              <button
                onClick={handleReset}
                className="group px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-2xl transition-all duration-300 flex items-center gap-3 font-semibold border border-gray-600/30 hover:border-gray-500/50 backdrop-blur-sm"
              >
                <RotateCcw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                Reset Configuration
              </button>
              <button
                onClick={handleSubmit}
                className="group px-8 py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 text-white rounded-2xl transition-all duration-300 flex items-center gap-3 font-bold shadow-lg hover:shadow-cyan-500/25 hover:shadow-2xl transform hover:scale-105"
              >
                <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                Apply Filter Configuration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInput;
