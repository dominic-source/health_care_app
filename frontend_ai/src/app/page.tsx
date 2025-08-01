'use client';

import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { useColors } from '@/hooks/useColors';
import Link from 'next/link';
import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
}) => {
  const { colors, getStatusColor } = useColors();

  return (
    <div
      className="overflow-hidden shadow rounded-lg"
      style={{ backgroundColor: colors.surface }}
    >
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="text-3xl">{icon}</div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt
                className="text-sm font-medium truncate"
                style={{ color: colors.textSecondary }}
              >
                {title}
              </dt>
              <dd>
                <div
                  className="text-lg font-medium"
                  style={{ color: colors.text }}
                >
                  {value}
                </div>
              </dd>
            </dl>
          </div>
        </div>
        {change && (
          <div className="mt-4">
            <div className="flex items-center text-sm">
              <span
                style={{
                  color:
                    changeType === 'positive'
                      ? getStatusColor('success')
                      : changeType === 'negative'
                      ? getStatusColor('error')
                      : colors.textMuted,
                }}
              >
                {change}
              </span>
              <span style={{ color: colors.textMuted }} className="ml-1">
                from last month
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface QuickActionProps {
  title: string;
  description: string;
  href: string;
  icon: string;
  buttonText: string;
}

const QuickAction: React.FC<QuickActionProps> = ({
  title,
  description,
  href,
  icon,
  buttonText,
}) => {
  const { colors } = useColors();

  return (
    <div
      className="overflow-hidden shadow rounded-lg"
      style={{ backgroundColor: colors.surface }}
    >
      <div className="p-6">
        <div className="flex items-center">
          <div className="text-3xl mr-4">{icon}</div>
          <div className="flex-1">
            <h3 className="text-lg font-medium" style={{ color: colors.text }}>
              {title}
            </h3>
            <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
              {description}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <Link
            href={href}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: colors.primary,
            }}
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { colors } = useColors();

  const stats = [
    {
      title: 'Total Patients',
      value: '2,847',
      change: '+12%',
      changeType: 'positive' as const,
      icon: '👥',
    },
    {
      title: 'New Registrations',
      value: '124',
      change: '+8%',
      changeType: 'positive' as const,
      icon: '📝',
    },
    {
      title: 'Appointments Today',
      value: '32',
      change: '+5%',
      changeType: 'positive' as const,
      icon: '📅',
    },
    {
      title: 'Pending Reviews',
      value: '7',
      change: '-15%',
      changeType: 'positive' as const,
      icon: '⏳',
    },
  ];

  const quickActions = [
    {
      title: 'Register New Patient',
      description: 'Add a new patient to the system with complete information',
      href: '/records/registration',
      icon: '➕',
      buttonText: 'Start Registration',
    },
    {
      title: 'Search Patients',
      description: 'Find and manage existing patient records',
      href: '/records/patients',
      icon: '🔍',
      buttonText: 'Search Patients',
    },
    {
      title: 'Generate Reports',
      description: 'Create compliance and analytics reports',
      href: '/records/reports',
      icon: '📊',
      buttonText: 'View Reports',
    },
    {
      title: 'System Settings',
      description: 'Configure system preferences and user management',
      href: '/settings',
      icon: '⚙️',
      buttonText: 'Manage Settings',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      patient: 'John Doe',
      action: 'Registration completed',
      timestamp: '2 hours ago',
      type: 'registration',
    },
    {
      id: 2,
      patient: 'Jane Smith',
      action: 'Medical history updated',
      timestamp: '4 hours ago',
      type: 'update',
    },
    {
      id: 3,
      patient: 'Mike Johnson',
      action: 'Appointment scheduled',
      timestamp: '6 hours ago',
      type: 'appointment',
    },
    {
      id: 4,
      patient: 'Sarah Wilson',
      action: 'Insurance information verified',
      timestamp: '8 hours ago',
      type: 'verification',
    },
  ];

  return (
    <div
      className="p-4 lg:p-6 space-y-6"
      style={{ backgroundColor: colors.background }}
    >
      {/* Page Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2
            className="text-2xl font-bold leading-7 sm:text-3xl sm:truncate"
            style={{ color: colors.text }}
          >
            Healthcare EMR Dashboard
          </h2>
          <p className="mt-1 text-sm" style={{ color: colors.textSecondary }}>
            Overview of patient records and system activities
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              borderColor: colors.border,
              color: colors.text,
              backgroundColor: colors.surface,
            }}
          >
            Export Data
          </button>
          <Link
            href="/records/registration"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ backgroundColor: colors.primary }}
          >
            New Patient
          </Link>
        </div>
      </div>

      {/* Theme Switcher Section */}
      <div className="mb-6">
        <ThemeSwitcher />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3
          className="text-lg leading-6 font-medium mb-4"
          style={{ color: colors.text }}
        >
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, index) => (
            <QuickAction key={index} {...action} />
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div
        className="shadow overflow-hidden sm:rounded-md"
        style={{ backgroundColor: colors.surface }}
      >
        <div className="px-4 py-5 sm:px-6">
          <h3
            className="text-lg leading-6 font-medium"
            style={{ color: colors.text }}
          >
            Recent Activities
          </h3>
          <p
            className="mt-1 max-w-2xl text-sm"
            style={{ color: colors.textSecondary }}
          >
            Latest patient record activities and system events
          </p>
        </div>
        <ul className="divide-y" style={{ borderColor: colors.border }}>
          {recentActivities.map(activity => (
            <li key={activity.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: colors.primary }}
                      ></div>
                    </div>
                    <div className="ml-4">
                      <p
                        className="text-sm font-medium"
                        style={{ color: colors.text }}
                      >
                        {activity.patient}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        {activity.action}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm" style={{ color: colors.textMuted }}>
                    {activity.timestamp}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div
          className="px-4 py-3 sm:px-6"
          style={{ backgroundColor: colors.cardBg }}
        >
          <div className="text-sm">
            <Link
              href="/records/activities"
              className="font-medium hover:opacity-80 transition-opacity"
              style={{ color: colors.primary }}
            >
              View all activities →
            </Link>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div
        className="overflow-hidden shadow rounded-lg"
        style={{ backgroundColor: colors.surface }}
      >
        <div className="px-4 py-5 sm:p-6">
          <h3
            className="text-lg leading-6 font-medium mb-4"
            style={{ color: colors.text }}
          >
            System Status
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-3"
                style={{ backgroundColor: colors.success }}
              ></div>
              <span className="text-sm" style={{ color: colors.text }}>
                Database: Online
              </span>
            </div>
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-3"
                style={{ backgroundColor: colors.success }}
              ></div>
              <span className="text-sm" style={{ color: colors.text }}>
                API: Operational
              </span>
            </div>
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-3"
                style={{ backgroundColor: colors.warning }}
              ></div>
              <span className="text-sm" style={{ color: colors.text }}>
                Backup: Scheduled in 2h
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
