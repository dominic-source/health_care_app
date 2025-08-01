'use client';

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
    <div className="flex h-screen bg-gray-100">
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
          fixed inset-y-0 left-0 z-50 bg-white shadow-lg transition-transform duration-300 lg:relative lg:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isCollapsed ? 'lg:w-16' : 'lg:w-64'}
          w-64
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center">
              <h1 className="text-lg font-bold text-gray-900">🏥 EMR System</h1>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? '→' : '←'}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
                    className={`
                      group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                      ${
                        isModuleActive(module)
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                    title={isCollapsed ? module.name : undefined}
                  >
                    <span className="text-xl mr-3 flex-shrink-0">
                      {module.icon}
                    </span>
                    {!isCollapsed && (
                      <>
                        <span className="flex-1">{module.name}</span>
                        {module.badge && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {module.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full top-0 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      <div className="font-medium">{module.name}</div>
                      <div className="text-xs text-gray-300">
                        {module.description}
                      </div>
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* User Profile Section */}
        {!isCollapsed && (
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  DS
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Dr. Smith</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Top Bar with Records Tabs */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          {/* Main Header Row */}
          <div className="h-16 flex items-center justify-between px-4 lg:px-6">
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors mr-3"
                title="Open menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900">
                {getCurrentModuleName()}
              </h2>

              {/* Records Mobile Tab Button */}
              {isRecordsPage() && (
                <button
                  onClick={() => setMobileTabsOpen(!mobileTabsOpen)}
                  className="sm:hidden ml-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Toggle tabs"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Notifications"
              >
                <span className="text-lg">🔔</span>
              </button>
              <button
                className="hidden sm:block p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Help"
              >
                <span className="text-lg">❓</span>
              </button>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium cursor-pointer">
                DS
              </div>
            </div>
          </div>

          {/* Records Tabs Row - Desktop */}
          {isRecordsPage() && (
            <div className="hidden sm:block border-t border-gray-100">
              <div className="max-w-7xl mx-auto px-4 lg:px-6">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {recordsTabs.map(tab => (
                    <Link
                      key={tab.name}
                      href={tab.href}
                      onClick={e => handleTabClick(tab.href, e)}
                      className={`${
                        isTabActive(tab.href)
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } group inline-flex items-center py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 relative`}
                    >
                      <span className="mr-2 text-base">{tab.icon}</span>
                      {tab.name}
                      {loadingTab === tab.href && (
                        <div className="ml-2">
                          <div className="animate-spin rounded-full h-3 w-3 border border-blue-600 border-t-transparent"></div>
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
            <div className="sm:hidden border-t border-gray-100 bg-gray-50">
              <div className="px-4 py-2 space-y-1">
                {recordsTabs.map(tab => (
                  <Link
                    key={tab.name}
                    href={tab.href}
                    onClick={e => {
                      setMobileTabsOpen(false);
                      handleTabClick(tab.href, e);
                    }}
                    className={`${
                      isTabActive(tab.href)
                        ? 'bg-blue-100 text-blue-700 border-blue-500'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    } group flex items-center px-3 py-2 text-sm font-medium rounded-md border-l-4 border-transparent transition-colors relative`}
                  >
                    <span className="mr-3 text-base">{tab.icon}</span>
                    {tab.name}
                    {loadingTab === tab.href && (
                      <div className="ml-auto">
                        <div className="animate-spin rounded-full h-3 w-3 border border-blue-600 border-t-transparent"></div>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default SidebarNavigation;
