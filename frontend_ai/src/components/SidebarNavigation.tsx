'use client';

import { useColors } from '@/hooks/useColors';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface NavigationModule {
  id: string;
  name: string;
  href: string;
  icon: string;
  description: string;
  badge?: string;
  children?: {
    name: string;
    href: string;
    icon?: string;
  }[];
}

const navigationModules: NavigationModule[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    href: '/',
    icon: '🏠',
    description: 'Main dashboard and overview',
  },
  {
    id: 'records',
    name: 'Records',
    href: '/records/patients',
    icon: '📋',
    description: 'Patient records management',
  },
  {
    id: 'appointments',
    name: 'Appointments',
    href: '/appointments',
    icon: '📅',
    description: 'Schedule and manage appointments',
    badge: 'Coming Soon',
  },
  {
    id: 'billing',
    name: 'Billing',
    href: '/billing',
    icon: '💰',
    description: 'Billing and insurance management',
    badge: 'Coming Soon',
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    href: '/pharmacy',
    icon: '💊',
    description: 'Prescription and medication management',
    badge: 'Coming Soon',
  },
  {
    id: 'lab',
    name: 'Laboratory',
    href: '/lab',
    icon: '🧪',
    description: 'Lab results and test management',
    badge: 'Coming Soon',
  },
  {
    id: 'settings',
    name: 'Settings',
    href: '/settings',
    icon: '⚙️',
    description: 'System configuration and preferences',
    badge: 'Coming Soon',
  },
];

const recordsTabs = [
  {
    name: 'Patients',
    href: '/records/patients',
    icon: '👥',
  },
  {
    name: 'Registration',
    href: '/records/registration',
    icon: '📝',
  },
  {
    name: 'Reports',
    href: '/records/reports',
    icon: '📈',
  },
];

interface SidebarNavigationProps {
  children: React.ReactNode;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  children,
}) => {
  const { colors, getStatusColor } = useColors();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [mobileTabsOpen, setMobileTabsOpen] = useState(false);
  const [loadingTab, setLoadingTab] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Prefetch all record pages on component mount
  useEffect(() => {
    recordsTabs.forEach(tab => {
      router.prefetch(tab.href);
    });
  }, [router]);

  // Clear loading state when pathname changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingTab(null);
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  const isModuleActive = (module: NavigationModule) => {
    if (module.href === '/' && pathname === '/') return true;
    if (module.href !== '/' && pathname.startsWith(module.href)) return true;
    return false;
  };

  const isTabActive = (href: string) => {
    return pathname === href;
  };

  const isRecordsPage = () => {
    return pathname.startsWith('/records');
  };

  const handleTabClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname !== href) {
      setLoadingTab(href);
      // Use router.replace for instant navigation with prefetched content
      router.push(href);
    }
  };

  // const toggleModule = (moduleId: string) => {
  //   setExpandedModule(expandedModule === moduleId ? null : moduleId);
  // };

  const getCurrentModuleName = () => {
    const currentModule = navigationModules.find(module =>
      isModuleActive(module)
    );
    return currentModule?.name || 'Healthcare EMR';
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: colors.cardBg }}>
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 shadow-lg transition-transform duration-300 lg:relative lg:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isCollapsed ? 'lg:w-16' : 'lg:w-64'}
          w-64
        `}
        style={{ backgroundColor: colors.surface }}
      >
        {/* Header */}
        <div
          className="h-16 flex items-center justify-between px-4"
          style={{ borderBottom: `1px solid ${colors.border}` }}
        >
          {!isCollapsed && (
            <div className="flex items-center">
              <h1 className="text-lg font-bold" style={{ color: colors.text }}>
                🏥 EMR System
              </h1>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:block p-2 rounded-lg transition-colors hover:opacity-80"
            style={{ backgroundColor: colors.cardBg }}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? '→' : '←'}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-2 rounded-lg transition-colors hover:opacity-80"
            style={{ backgroundColor: colors.cardBg }}
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-2 space-y-1">
            {navigationModules.map(module => (
              <div key={module.id}>
                {/* Main Module Link */}
                <div className="relative">
                  <Link
                    href={module.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                    style={{
                      backgroundColor: isModuleActive(module)
                        ? colors.primary + '20'
                        : 'transparent',
                      color: isModuleActive(module)
                        ? colors.primary
                        : colors.text,
                    }}
                    title={isCollapsed ? module.name : undefined}
                  >
                    <span className="text-xl mr-3 flex-shrink-0">
                      {module.icon}
                    </span>
                    {!isCollapsed && (
                      <>
                        <span className="flex-1">{module.name}</span>
                        {module.badge && (
                          <span
                            className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: getStatusColor('warning') + '20',
                              color: getStatusColor('warning'),
                            }}
                          >
                            {module.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div
                      className="absolute left-full top-0 ml-2 px-3 py-2 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50"
                      style={{
                        backgroundColor: colors.text,
                        color: colors.surface,
                      }}
                    >
                      <div className="font-medium">{module.name}</div>
                      <div
                        className="text-xs"
                        style={{ color: colors.textMuted }}
                      >
                        {module.description}
                      </div>
                      <div
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 rotate-45"
                        style={{ backgroundColor: colors.text }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* User Profile Section */}
        {!isCollapsed && (
          <div
            className="p-4"
            style={{ borderTop: `1px solid ${colors.border}` }}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                  style={{ backgroundColor: colors.primary }}
                >
                  DS
                </div>
              </div>
              <div className="ml-3">
                <p
                  className="text-sm font-medium"
                  style={{ color: colors.text }}
                >
                  Dr. Smith
                </p>
                <p className="text-xs" style={{ color: colors.textSecondary }}>
                  Administrator
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Top Bar with Records Tabs */}
        <header
          className="shadow-sm"
          style={{
            backgroundColor: colors.surface,
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          {/* Main Header Row */}
          <div className="h-16 flex items-center justify-between px-4 lg:px-6">
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:opacity-80 transition-opacity mr-3"
                style={{ backgroundColor: colors.cardBg }}
                title="Open menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ color: colors.text }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h2
                className="text-lg lg:text-xl font-semibold"
                style={{ color: colors.text }}
              >
                {getCurrentModuleName()}
              </h2>

              {/* Records Mobile Tab Button */}
              {isRecordsPage() && (
                <button
                  onClick={() => setMobileTabsOpen(!mobileTabsOpen)}
                  className="sm:hidden ml-4 p-2 rounded-lg hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: colors.cardBg }}
                  title="Toggle tabs"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ color: colors.text }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              )}
            </div>
            <div className="flex items-center space-x-2 lg:space-x-4">
              <button
                className="p-2 rounded-lg hover:opacity-80 transition-opacity"
                style={{ backgroundColor: colors.cardBg }}
                title="Notifications"
              >
                <span className="text-lg">🔔</span>
              </button>
              <button
                className="hidden sm:block p-2 rounded-lg hover:opacity-80 transition-opacity"
                style={{ backgroundColor: colors.cardBg }}
                title="Help"
              >
                <span className="text-lg">❓</span>
              </button>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium cursor-pointer"
                style={{ backgroundColor: colors.primary }}
              >
                DS
              </div>
            </div>
          </div>

          {/* Records Tabs Row - Desktop */}
          {isRecordsPage() && (
            <div
              className="hidden sm:block"
              style={{ borderTop: `1px solid ${colors.borderLight}` }}
            >
              <div className="max-w-7xl mx-auto px-4 lg:px-6">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {recordsTabs.map(tab => (
                    <Link
                      key={tab.name}
                      href={tab.href}
                      onClick={e => handleTabClick(tab.href, e)}
                      className={`${
                        isTabActive(tab.href)
                          ? `text-sm font-medium`
                          : `text-sm font-medium transition-colors duration-200`
                      } group inline-flex items-center py-3 px-1 border-b-2 relative`}
                      style={{
                        borderBottomColor: isTabActive(tab.href)
                          ? colors.primary
                          : 'transparent',
                        color: isTabActive(tab.href)
                          ? colors.primary
                          : colors.textSecondary,
                      }}
                      onMouseEnter={e => {
                        if (!isTabActive(tab.href)) {
                          e.currentTarget.style.color = colors.text;
                          e.currentTarget.style.borderBottomColor =
                            colors.borderLight;
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isTabActive(tab.href)) {
                          e.currentTarget.style.color = colors.textSecondary;
                          e.currentTarget.style.borderBottomColor =
                            'transparent';
                        }
                      }}
                    >
                      <span className="mr-2 text-base">{tab.icon}</span>
                      {tab.name}
                      {loadingTab === tab.href && (
                        <div className="ml-2">
                          <div
                            className="animate-spin rounded-full h-3 w-3 border border-t-transparent"
                            style={{
                              borderColor: colors.primary,
                              borderTopColor: 'transparent',
                            }}
                          ></div>
                        </div>
                      )}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* Records Tabs Row - Mobile Dropdown */}
          {isRecordsPage() && mobileTabsOpen && (
            <div
              className="sm:hidden border-t"
              style={{
                borderTopColor: colors.borderLight,
                backgroundColor: colors.cardBg,
              }}
            >
              <div className="px-4 py-2 space-y-1">
                {recordsTabs.map(tab => (
                  <Link
                    key={tab.name}
                    href={tab.href}
                    onClick={e => {
                      setMobileTabsOpen(false);
                      handleTabClick(tab.href, e);
                    }}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md border-l-4 transition-colors relative`}
                    style={{
                      backgroundColor: isTabActive(tab.href)
                        ? colors.accent + '20'
                        : 'transparent',
                      color: isTabActive(tab.href)
                        ? colors.primary
                        : colors.textSecondary,
                      borderLeftColor: isTabActive(tab.href)
                        ? colors.primary
                        : 'transparent',
                    }}
                    onMouseEnter={e => {
                      if (!isTabActive(tab.href)) {
                        e.currentTarget.style.backgroundColor =
                          colors.accent + '10';
                        e.currentTarget.style.color = colors.text;
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isTabActive(tab.href)) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = colors.textSecondary;
                      }
                    }}
                  >
                    <span className="mr-3 text-base">{tab.icon}</span>
                    {tab.name}
                    {loadingTab === tab.href && (
                      <div className="ml-auto">
                        <div
                          className="animate-spin rounded-full h-3 w-3 border border-t-transparent"
                          style={{
                            borderColor: colors.primary,
                            borderTopColor: 'transparent',
                          }}
                        ></div>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Page Content */}
        <main
          className="flex-1 overflow-auto"
          style={{ backgroundColor: colors.background }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarNavigation;
