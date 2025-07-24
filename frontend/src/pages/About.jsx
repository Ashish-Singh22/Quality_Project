import React from "react";
import { BarChart3, PieChart, TrendingUp, Database, Filter, Calendar, Users, Shield, Target, Zap, Award, CheckCircle } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Database className="h-8 w-8" />,
      title: "Data Processing",
      description: "Advanced algorithms to process and analyze large volumes of claims data with precision and speed."
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Interactive Charts",
      description: "Dynamic bar charts and pie charts with customizable metrics and real-time data visualization."
    },
    {
      icon: <Filter className="h-8 w-8" />,
      title: "Smart Filtering",
      description: "Intelligent filtering system based on week-month pairs and custom analysis parameters."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Analytics Engine",
      description: "Comprehensive analytics for accepted vs rejected claims with detailed breakdowns."
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Time-based Analysis",
      description: "Period-specific analysis with configurable date ranges and temporal insights."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Data Security",
      description: "Enterprise-grade security ensuring your sensitive claims data remains protected."
    }
  ];

  const metrics = [
    { number: "10K+", label: "Claims Processed", icon: <CheckCircle className="h-6 w-6" /> },
    { number: "99.9%", label: "Accuracy Rate", icon: <Target className="h-6 w-6" /> },
    { number: "50ms", label: "Processing Speed", icon: <Zap className="h-6 w-6" /> },
    { number: "24/7", label: "System Uptime", icon: <Award className="h-6 w-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl px-6 py-3 rounded-full border border-cyan-500/30 mb-8">
            <PieChart className="h-6 w-6 text-cyan-400" />
            <span className="text-cyan-300 font-semibold">Claims Analytics Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Advanced Claims
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Analysis</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transform your claims data into actionable insights with our cutting-edge analytics platform. 
            Make data-driven decisions with comprehensive visualization and intelligent processing.
          </p>
        </div>

        {/* Metrics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 text-center transform hover:scale-105 transition-all duration-300">
              <div className="flex justify-center mb-3 text-cyan-400">
                {metric.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">{metric.number}</div>
              <div className="text-gray-400 text-sm">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* What We Do Section */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 md:p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">What We Do</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Our platform specializes in comprehensive claims analysis, providing businesses with the tools 
              they need to understand their claims data like never before.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-gray-700/40 to-gray-800/40 rounded-2xl p-6 border border-gray-600/30 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl text-cyan-400 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 md:p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-300 text-lg">
              Simple, powerful, and efficient - our three-step process transforms your data into insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Configure Analysis</h3>
              <p className="text-gray-300">
                Set your analysis parameters including time periods, basis criteria, and data filters to customize your analysis scope.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Process Data</h3>
              <p className="text-gray-300">
                Our advanced algorithms process your claims data, categorizing accepted and rejected claims with detailed breakdowns.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Visualize Insights</h3>
              <p className="text-gray-300">
                View comprehensive dashboards with interactive charts, detailed tables, and actionable insights for informed decision-making.
              </p>
            </div>
          </div>
        </div>

        {/* Key Benefits Section */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Our Platform</h2>
            <p className="text-gray-300 text-lg">
              Empowering businesses with intelligent claims analysis and data-driven insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Comprehensive Analysis</h4>
                  <p className="text-gray-300">
                    Analyze claims across multiple dimensions including claim count, quantity, and total value with detailed category breakdowns.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Interactive Visualizations</h4>
                  <p className="text-gray-300">
                    Dynamic charts and graphs that respond to your selections, providing immediate visual feedback and insights.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Real-time Processing</h4>
                  <p className="text-gray-300">
                    Lightning-fast data processing and analysis with real-time updates as you modify your analysis parameters.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Flexible Configuration</h4>
                  <p className="text-gray-300">
                    Customize your analysis with flexible time periods, multiple basis options, and configurable data filters.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Detailed Reporting</h4>
                  <p className="text-gray-300">
                    Generate comprehensive reports with tabular data, percentage calculations, and export capabilities.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-pink-400 rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">User-Friendly Interface</h4>
                  <p className="text-gray-300">
                    Intuitive design with smooth animations and responsive layouts that work seamlessly across all devices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Claims Analysis?</h3>
            <p className="text-gray-300 mb-6">
              Start making data-driven decisions today with our powerful analytics platform.
            </p>
            <a href="/" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
              Get Started Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;