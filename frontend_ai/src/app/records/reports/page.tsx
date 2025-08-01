'use client';

import { useColors } from '@/hooks/useColors';
import { useState } from 'react';

interface ReportMetric {
  label: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  lastGenerated?: string;
  frequency: string;
}

const reportTemplates: ReportTemplate[] = [
  {
    id: '1',
    name: 'Patient Demographics Report',
    description:
      'Overview of patient demographics including age, gender, and location distribution',
    category: 'Demographics',
    lastGenerated: '2024-01-15',
    frequency: 'Monthly',
  },
  {
    id: '2',
    name: 'Registration Trends',
    description: 'Analysis of new patient registrations over time',
    category: 'Registration',
    lastGenerated: '2024-01-14',
    frequency: 'Weekly',
  },
  {
    id: '3',
    name: 'HIPAA Compliance Report',
    description: 'Comprehensive HIPAA compliance status and audit trail',
    category: 'Compliance',
    lastGenerated: '2024-01-10',
    frequency: 'Monthly',
  },
  {
    id: '4',
    name: 'Medical History Summary',
    description:
      'Statistical analysis of patient medical histories and conditions',
    category: 'Medical',
    lastGenerated: '2024-01-12',
    frequency: 'Quarterly',
  },
  {
    id: '5',
    name: 'Insurance Coverage Analysis',
    description: 'Breakdown of insurance providers and coverage types',
    category: 'Insurance',
    frequency: 'Monthly',
  },
  {
    id: '6',
    name: 'System Activity Log',
    description: 'User activity and system usage statistics',
    category: 'System',
    lastGenerated: '2024-01-16',
    frequency: 'Daily',
  },
];

export default function ReportsPage() {
  const { colors, getStatusColor } = useColors();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('last30days');

  const metrics: ReportMetric[] = [
    {
      label: 'Total Reports Generated',
      value: 47,
      change: '+12%',
      changeType: 'positive',
    },
    {
      label: 'Compliance Score',
      value: '98.5%',
      change: '+2.1%',
      changeType: 'positive',
    },
    {
      label: 'Avg. Generation Time',
      value: '2.3s',
      change: '-15%',
      changeType: 'positive',
    },
    {
      label: 'Active Users',
      value: 24,
      change: '+8%',
      changeType: 'positive',
    },
  ];

  const categories = [
    'all',
    'Demographics',
    'Registration',
    'Compliance',
    'Medical',
    'Insurance',
    'System',
  ];

  const filteredReports = reportTemplates.filter(
    report => selectedCategory === 'all' || report.category === selectedCategory
  );

  const getCategoryColor = (category: string) => {
    const colors = {
      Demographics: 'bg-blue-100 text-blue-800',
      Registration: 'bg-green-100 text-green-800',
      Compliance: 'bg-red-100 text-red-800',
      Medical: 'bg-purple-100 text-purple-800',
      Insurance: 'bg-yellow-100 text-yellow-800',
      System: 'bg-gray-100 text-gray-800',
    };
    return (
      colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
    );
  };

  const getFrequencyColor = (frequency: string) => {
    const colors = {
      Daily: 'bg-green-100 text-green-800',
      Weekly: 'bg-blue-100 text-blue-800',
      Monthly: 'bg-yellow-100 text-yellow-800',
      Quarterly: 'bg-purple-100 text-purple-800',
    };
    return (
      colors[frequency as keyof typeof colors] || 'bg-gray-100 text-gray-800'
    );
  };

  return (
    <div className="space-y-6" style={{ backgroundColor: colors.background }}>
      {/* Page Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2
            className="text-2xl font-bold leading-7 sm:text-3xl sm:truncate"
            style={{ color: colors.text }}
          >
            Reports & Analytics
          </h2>
          <p className="mt-1 text-sm" style={{ color: colors.textSecondary }}>
            Generate and view comprehensive healthcare reports
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ backgroundColor: colors.primary }}
          >
            📈 Generate New Report
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="overflow-hidden shadow rounded-lg"
            style={{ backgroundColor: colors.surface }}
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="text-2xl">📊</div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt
                      className="text-sm font-medium truncate"
                      style={{ color: colors.textSecondary }}
                    >
                      {metric.label}
                    </dt>
                    <dd>
                      <div
                        className="text-lg font-medium"
                        style={{ color: colors.text }}
                      >
                        {metric.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm">
                  <span
                    style={{
                      color:
                        metric.changeType === 'positive'
                          ? getStatusColor('success')
                          : metric.changeType === 'negative'
                          ? getStatusColor('error')
                          : colors.textMuted,
                    }}
                  >
                    {metric.change}
                  </span>
                  <span className="ml-1" style={{ color: colors.textMuted }}>
                    from last month
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Category Filter */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label
                htmlFor="dateRange"
                className="block text-sm font-medium text-gray-700"
              >
                Date Range
              </label>
              <select
                id="dateRange"
                value={dateRange}
                onChange={e => setDateRange(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
              >
                <option value="last7days">Last 7 days</option>
                <option value="last30days">Last 30 days</option>
                <option value="last90days">Last 90 days</option>
                <option value="last365days">Last year</option>
                <option value="custom">Custom range</option>
              </select>
            </div>

            {/* Export Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Export Format
              </label>
              <div className="mt-1 flex space-x-2">
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  PDF
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Excel
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Templates */}
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Available Reports
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredReports.map(report => (
            <div
              key={report.id}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
                      report.category
                    )}`}
                  >
                    {report.category}
                  </span>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getFrequencyColor(
                      report.frequency
                    )}`}
                  >
                    {report.frequency}
                  </span>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  {report.name}
                </h4>
                <p className="text-sm text-gray-500 mb-4">
                  {report.description}
                </p>
                {report.lastGenerated && (
                  <p className="text-xs text-gray-400 mb-4">
                    Last generated:{' '}
                    {new Date(report.lastGenerated).toLocaleDateString()}
                  </p>
                )}
                <div className="flex space-x-2">
                  <button className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Generate
                  </button>
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Reports
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Recently generated reports and their status
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {[
            {
              name: 'Patient Demographics Report',
              generatedBy: 'Dr. Smith',
              generatedAt: '2024-01-15 14:30',
              status: 'Completed',
              size: '2.4 MB',
            },
            {
              name: 'Registration Trends',
              generatedBy: 'Admin User',
              generatedAt: '2024-01-14 09:15',
              status: 'Completed',
              size: '1.8 MB',
            },
            {
              name: 'HIPAA Compliance Report',
              generatedBy: 'System',
              generatedAt: '2024-01-10 00:00',
              status: 'Completed',
              size: '5.2 MB',
            },
          ].map((report, index) => (
            <li key={index}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        {report.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Generated by {report.generatedBy} • {report.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-500">
                      {report.generatedAt}
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Download
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Analytics */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Quick Analytics
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Registration Trends (Last 30 Days)
              </h4>
              <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-gray-500">Chart Placeholder</span>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Demographics Breakdown
              </h4>
              <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-gray-500">Chart Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
