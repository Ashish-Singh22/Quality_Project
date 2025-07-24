import { User, Calendar, Filter, Info, ArrowLeft, Sparkles, BarChart3, PieChart, Table, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import React, { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from "recharts";

const Dashboard = ({ receivedData, onConfigureAgain, finalData }) => {
  const [activeTab, setActiveTab] = useState('accepted');
  const [selectedMetric, setSelectedMetric] = useState('Claim Count');
  const [activeView, setActiveView] = useState('summary');

  const metrics = ["Claim Count", "Quantity Under Claim", "Total Claim Value (In Rs)"];
  const metricIndex = { "Claim Count": 0, "Quantity Under Claim": 1, "Total Claim Value (In Rs)": 2 };

  // Process final data
  const processedData = useMemo(() => {
    if (!finalData) return { accepted: [], rejected: [], totals: {} };

    const accepted = Object.entries(finalData.Accepted || {}).map(([key, values]) => ({
      category: key,
      claimCount: values[0] || 0,
      quantity: values[1] || 0,
      totalValue: values[2] || 0
    }));

    const rejected = Object.entries(finalData.Rejected || {}).map(([key, values]) => ({
      category: key,
      claimCount: values[0] || 0,
      quantity: values[1] || 0,
      totalValue: values[2] || 0
    }));

    const totalAccepted = accepted.reduce((sum, item) => ({
      claimCount: sum.claimCount + item.claimCount,
      quantity: sum.quantity + item.quantity,
      totalValue: sum.totalValue + item.totalValue
    }), { claimCount: 0, quantity: 0, totalValue: 0 });

    const totalRejected = rejected.reduce((sum, item) => ({
      claimCount: sum.claimCount + item.claimCount,
      quantity: sum.quantity + item.quantity,
      totalValue: sum.totalValue + item.totalValue
    }), { claimCount: 0, quantity: 0, totalValue: 0 });

    const grandTotal = {
      claimCount: totalAccepted.claimCount + totalRejected.claimCount,
      quantity: totalAccepted.quantity + totalRejected.quantity,
      totalValue: totalAccepted.totalValue + totalRejected.totalValue
    };

    return {
      accepted,
      rejected,
      totals: { totalAccepted, totalRejected, grandTotal }
    };
  }, [finalData]);

  const getMonthName = (monthNumber) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNumber - 1];
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-IN').format(value);
  };

  const getChartData = () => {
    const data = activeTab === 'accepted' ? processedData.accepted : processedData.rejected;
    const index = metricIndex[selectedMetric];
    
    return data.map(item => {
      const value = index === 0 ? item.claimCount : index === 1 ? item.quantity : item.totalValue;
      return {
        category: item.category,
        value: Number(value) || 0, // Ensure it's a number
        displayValue: index === 2 ? formatCurrency(value) : formatNumber(value)
      };
    }).filter(item => item.value > 0); // Filter out zero values
  };

  const getPieData = () => {
    const data = activeTab === 'accepted' ? processedData.accepted : processedData.rejected;
    const index = metricIndex[selectedMetric];
    const total = data.reduce((sum, item) => sum + (index === 0 ? item.claimCount : index === 1 ? item.quantity : item.totalValue), 0);

    return data.map(item => {
      const value = index === 0 ? item.claimCount : index === 1 ? item.quantity : item.totalValue;
      return {
        name: item.category,
        value: value,
        percentage: total > 0 ? ((value / total) * 100).toFixed(1) : 0,
        displayValue: index === 2 ? formatCurrency(value) : formatNumber(value)
      };
    });
  };

  const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800/95 backdrop-blur-xl p-4 rounded-xl border border-gray-600/50 shadow-2xl">
          <p className="text-white font-semibold mb-2">{label}</p>
          <p className="text-cyan-300">
            {selectedMetric}: <span className="font-bold">{payload[0].payload.displayValue}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800/95 backdrop-blur-xl p-4 rounded-xl border border-gray-600/50 shadow-2xl">
          <p className="text-white font-semibold mb-2">{data.name}</p>
          <p className="text-cyan-300">
            {selectedMetric}: <span className="font-bold">{data.displayValue}</span>
          </p>
          <p className="text-purple-300">
            Percentage: <span className="font-bold">{data.percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (!finalData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6 flex items-center justify-center">
        <div className="text-white text-xl">No data available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Claims Analysis Dashboard</h1>
                <p className="text-gray-400 mt-1">Advanced analytics and insights</p>
              </div>
            </div>
            <button
              onClick={onConfigureAgain}
              className="group px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white rounded-2xl transition-all duration-300 flex items-center gap-3 font-semibold shadow-lg hover:shadow-purple-500/25 hover:shadow-2xl transform hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
              Configure Again
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Total Claims */}
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-xl">
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Total Claims</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Claim Count:</span>
                <span className="text-2xl font-bold text-blue-300">{formatNumber(processedData.totals.grandTotal?.claimCount || 0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total Quantity:</span>
                <span className="text-xl font-bold text-blue-300">{formatNumber(processedData.totals.grandTotal?.quantity || 0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total Value:</span>
                <span className="text-xl font-bold text-blue-300">{formatCurrency(processedData.totals.grandTotal?.totalValue || 0)}</span>
              </div>
            </div>
          </div>

          {/* Accepted Claims */}
          <button
            onClick={() => {setActiveTab('accepted'); setActiveView('charts');}}
            className={`bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border p-6 transition-all duration-300 transform hover:scale-105 text-left ${
              activeTab === 'accepted' ? 'border-green-500 bg-green-900/20' : 'border-gray-700/50 hover:border-green-400/50'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/20 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Accepted Claims</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Count:</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-green-300">{formatNumber(processedData.totals.totalAccepted?.claimCount || 0)}</span>
                  <div className="text-sm text-green-400">
                    {processedData.totals.grandTotal?.claimCount > 0 ? 
                      `${((processedData.totals.totalAccepted?.claimCount / processedData.totals.grandTotal?.claimCount) * 100).toFixed(1)}%` : '0%'}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Value:</span>
                <div className="text-right">
                  <span className="text-lg font-bold text-green-300">{formatCurrency(processedData.totals.totalAccepted?.totalValue || 0)}</span>
                  <div className="text-sm text-green-400">
                    {processedData.totals.grandTotal?.totalValue > 0 ? 
                      `${((processedData.totals.totalAccepted?.totalValue / processedData.totals.grandTotal?.totalValue) * 100).toFixed(1)}%` : '0%'}
                  </div>
                </div>
              </div>
            </div>
          </button>

          {/* Rejected Claims */}
          <button
            onClick={() => {setActiveTab('rejected'); setActiveView('charts');}}
            className={`bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border p-6 transition-all duration-300 transform hover:scale-105 text-left ${
              activeTab === 'rejected' ? 'border-red-500 bg-red-900/20' : 'border-gray-700/50 hover:border-red-400/50'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/20 rounded-xl">
                <XCircle className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Rejected Claims</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Count:</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-red-300">{formatNumber(processedData.totals.totalRejected?.claimCount || 0)}</span>
                  <div className="text-sm text-red-400">
                    {processedData.totals.grandTotal?.claimCount > 0 ? 
                      `${((processedData.totals.totalRejected?.claimCount / processedData.totals.grandTotal?.claimCount) * 100).toFixed(1)}%` : '0%'}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Value:</span>
                <div className="text-right">
                  <span className="text-lg font-bold text-red-300">{formatCurrency(processedData.totals.totalRejected?.totalValue || 0)}</span>
                  <div className="text-sm text-red-400">
                    {processedData.totals.grandTotal?.totalValue > 0 ? 
                      `${((processedData.totals.totalRejected?.totalValue / processedData.totals.grandTotal?.totalValue) * 100).toFixed(1)}%` : '0%'}
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Navigation Tabs */}
        {activeView === 'charts' && (
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-6 mb-8">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              {/* Tab Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('accepted')}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    activeTab === 'accepted' 
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/25' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Accepted Claims
                </button>
                <button
                  onClick={() => setActiveTab('rejected')}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    activeTab === 'rejected' 
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/25' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Rejected Claims
                </button>
              </div>

              {/* Metric Selector */}
              <div className="flex gap-2">
                {metrics.map((metric) => (
                  <button
                    key={metric}
                    onClick={() => setSelectedMetric(metric)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedMetric === metric 
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {metric}
                  </button>
                ))}
              </div>

              {/* View Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveView('charts')}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    activeView === 'charts' 
                      ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <BarChart3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setActiveView('table')}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    activeView === 'table' 
                      ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Table className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Charts Section */}
        {activeView === 'charts' && (
          <div className="space-y-8 mb-8">
            {/* Bar Chart */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-xl">
                    <BarChart3 className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {activeTab === 'accepted' ? 'Accepted' : 'Rejected'} Claims - {selectedMetric}
                  </h3>
                </div>
                
                {/* Color Legend for Bar Chart */}
                <div className="flex flex-wrap gap-2 max-w-md">
                  {getChartData().slice(0, 5).map((item, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-700/30 px-3 py-1 rounded-lg">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: colors[index % colors.length] }}
                      ></div>
                      <span className="text-xs text-gray-300 truncate max-w-20" title={item.category}>
                        {item.category.length > 8 ? item.category.substring(0, 8) + '...' : item.category}
                      </span>
                    </div>
                  ))}
                  {getChartData().length > 5 && (
                    <div className="flex items-center gap-2 bg-gray-700/30 px-3 py-1 rounded-lg">
                      <span className="text-xs text-gray-300">+{getChartData().length - 5} more</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={getChartData()} 
                    margin={{ top: 40, right: 30, left: 60, bottom: 80 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="category" 
                      angle={-45} 
                      textAnchor="end" 
                      height={80}
                      stroke="#9CA3AF"
                      fontSize={12}
                      interval={0}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      tickFormatter={(value) => {
                        if (selectedMetric === "Total Claim Value (In Rs)") {
                          return `₹${(value / 100000).toFixed(1)}L`;
                        }
                        return formatNumber(value);
                      }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="value" 
                      radius={[4, 4, 0, 0]}
                      minPointSize={5}
                    >
                      {getChartData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-xl">
                    <PieChart className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Distribution - {selectedMetric}
                  </h3>
                </div>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Pie Chart */}
                <div className="lg:col-span-2">
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={getPieData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ percentage }) => `${percentage}%`}
                          outerRadius={140}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {getPieData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomPieTooltip />} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Color Legend for Pie Chart */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-700/30 rounded-2xl p-4 h-96 overflow-y-auto">
                    <h4 className="text-lg font-semibold text-white mb-4">Legend</h4>
                    <div className="space-y-3">
                      {getPieData().map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-gray-600/20 rounded-lg hover:bg-gray-600/40 transition-colors duration-200">
                          <div 
                            className="w-4 h-4 rounded-full flex-shrink-0" 
                            style={{ backgroundColor: colors[index % colors.length] }}
                          ></div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-white truncate" title={item.name}>
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-400">
                              {item.percentage}% ({item.displayValue})
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Table View */}
        {activeView === 'table' && (
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-500/20 rounded-xl">
                <Table className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {activeTab === 'accepted' ? 'Accepted' : 'Rejected'} Claims Data
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-4 px-4 text-gray-300 font-semibold">Category</th>
                    <th className="text-right py-4 px-4 text-gray-300 font-semibold">Claim Count</th>
                    <th className="text-right py-4 px-4 text-gray-300 font-semibold">Quantity</th>
                    <th className="text-right py-4 px-4 text-gray-300 font-semibold">Total Value (Rs)</th>
                  </tr>
                </thead>
                <tbody>
                  {(activeTab === 'accepted' ? processedData.accepted : processedData.rejected).map((item, index) => (
                    <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors duration-200">
                      <td className="py-4 px-4 text-white font-medium">{item.category}</td>
                      <td className="py-4 px-4 text-right text-cyan-300 font-semibold">{formatNumber(item.claimCount)}</td>
                      <td className="py-4 px-4 text-right text-blue-300 font-semibold">{formatNumber(item.quantity)}</td>
                      <td className="py-4 px-4 text-right text-green-300 font-semibold">{formatCurrency(item.totalValue)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-600 bg-gray-700/30">
                    <td className="py-4 px-4 text-white font-bold">Total</td>
                    <td className="py-4 px-4 text-right text-cyan-300 font-bold">
                      {formatNumber(activeTab === 'accepted' ? processedData.totals.totalAccepted?.claimCount : processedData.totals.totalRejected?.claimCount)}
                    </td>
                    <td className="py-4 px-4 text-right text-blue-300 font-bold">
                      {formatNumber(activeTab === 'accepted' ? processedData.totals.totalAccepted?.quantity : processedData.totals.totalRejected?.quantity)}
                    </td>
                    <td className="py-4 px-4 text-right text-green-300 font-bold">
                      {formatCurrency(activeTab === 'accepted' ? processedData.totals.totalAccepted?.totalValue : processedData.totals.totalRejected?.totalValue)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* Back to Summary Button */}
        {activeView !== 'summary' && (
          <div className="text-center mt-8">
            <button
              onClick={() => setActiveView('summary')}
              className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white rounded-2xl transition-all duration-300 font-semibold shadow-lg hover:shadow-gray-500/25 hover:shadow-2xl transform hover:scale-105"
            >
              Back to Summary
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;