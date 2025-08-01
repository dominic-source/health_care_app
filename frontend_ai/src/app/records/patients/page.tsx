'use client';

import { useColors } from '@/hooks/useColors';
import { useState } from 'react';

export default function PatientsPage() {
  const { colors, getStatusColor } = useColors();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock patient data
  const patients = [
    {
      id: 'P001',
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      phone: '+1 (555) 123-4567',
      email: 'john.doe@email.com',
      lastVisit: '2024-01-15',
      status: 'active',
      condition: 'Hypertension',
    },
    {
      id: 'P002',
      name: 'Jane Smith',
      age: 32,
      gender: 'Female',
      phone: '+1 (555) 987-6543',
      email: 'jane.smith@email.com',
      lastVisit: '2024-01-10',
      status: 'active',
      condition: 'Diabetes Type 2',
    },
    {
      id: 'P003',
      name: 'Robert Johnson',
      age: 67,
      gender: 'Male',
      phone: '+1 (555) 456-7890',
      email: 'robert.j@email.com',
      lastVisit: '2023-12-28',
      status: 'inactive',
      condition: 'Arthritis',
    },
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' || patient.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: colors.text }}>
            Patients
          </h1>
          <p className="mt-1 text-sm" style={{ color: colors.textSecondary }}>
            Manage patient records and information
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-opacity"
            style={{
              backgroundColor: colors.primary,
            }}
          >
            <span className="mr-2">➕</span>
            Add New Patient
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div
        className="p-4 rounded-lg shadow"
        style={{ backgroundColor: colors.surface }}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="sr-only">
              Search patients
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span style={{ color: colors.textMuted }}>🔍</span>
              </div>
              <input
                id="search"
                name="search"
                type="text"
                placeholder="Search by name, ID, or email..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 rounded-md leading-5 focus:outline-none focus:ring-1"
                style={{
                  border: `1px solid ${colors.border}`,
                  backgroundColor: colors.background,
                  color: colors.text,
                }}
              />
            </div>
          </div>
          <div className="sm:w-48">
            <label htmlFor="status" className="sr-only">
              Filter by status
            </label>
            <select
              id="status"
              name="status"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base rounded-md focus:outline-none focus:ring-1"
              style={{
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.background,
                color: colors.text,
              }}
            >
              <option value="all">All Patients</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div
          className="overflow-hidden shadow rounded-lg"
          style={{ backgroundColor: colors.surface }}
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">👥</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt
                    className="text-sm font-medium truncate"
                    style={{ color: colors.textSecondary }}
                  >
                    Total Patients
                  </dt>
                  <dd
                    className="text-lg font-medium"
                    style={{ color: colors.text }}
                  >
                    {patients.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div
          className="overflow-hidden shadow rounded-lg"
          style={{ backgroundColor: colors.surface }}
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt
                    className="text-sm font-medium truncate"
                    style={{ color: colors.textSecondary }}
                  >
                    Active Patients
                  </dt>
                  <dd
                    className="text-lg font-medium"
                    style={{ color: colors.text }}
                  >
                    {patients.filter(p => p.status === 'active').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div
          className="overflow-hidden shadow rounded-lg"
          style={{ backgroundColor: colors.surface }}
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">📅</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt
                    className="text-sm font-medium truncate"
                    style={{ color: colors.textSecondary }}
                  >
                    Recent Visits
                  </dt>
                  <dd
                    className="text-lg font-medium"
                    style={{ color: colors.text }}
                  >
                    {
                      patients.filter(
                        p => new Date(p.lastVisit) > new Date('2024-01-01')
                      ).length
                    }
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div
          className="overflow-hidden shadow rounded-lg"
          style={{ backgroundColor: colors.surface }}
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">⚠️</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt
                    className="text-sm font-medium truncate"
                    style={{ color: colors.textSecondary }}
                  >
                    Inactive Patients
                  </dt>
                  <dd
                    className="text-lg font-medium"
                    style={{ color: colors.text }}
                  >
                    {patients.filter(p => p.status === 'inactive').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Patients Table */}
      <div
        className="shadow overflow-hidden sm:rounded-md"
        style={{ backgroundColor: colors.surface }}
      >
        <div className="px-4 py-5 sm:px-6">
          <h3
            className="text-lg leading-6 font-medium"
            style={{ color: colors.text }}
          >
            Patient List
          </h3>
          <p
            className="mt-1 max-w-2xl text-sm"
            style={{ color: colors.textSecondary }}
          >
            {filteredPatients.length} patient(s) found
          </p>
        </div>
        <ul className="divide-y" style={{ borderColor: colors.border }}>
          {filteredPatients.map(patient => (
            <li key={patient.id}>
              <div
                className="px-4 py-4 sm:px-6 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.surface }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div
                        className="h-10 w-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: colors.primary }}
                      >
                        <span className="text-sm font-medium text-white">
                          {patient.name
                            .split(' ')
                            .map(n => n[0])
                            .join('')}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <div
                          className="text-sm font-medium"
                          style={{ color: colors.text }}
                        >
                          {patient.name}
                        </div>
                        <span
                          className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor:
                              patient.status === 'active'
                                ? colors.success + '20'
                                : colors.textMuted + '20',
                            color:
                              patient.status === 'active'
                                ? getStatusColor('success')
                                : colors.textMuted,
                          }}
                        >
                          {patient.status}
                        </span>
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        ID: {patient.id} • {patient.age} years •{' '}
                        {patient.gender}
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        {patient.email} • {patient.phone}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-sm" style={{ color: colors.text }}>
                      {patient.condition}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: colors.textMuted }}
                    >
                      Last visit:{' '}
                      {new Date(patient.lastVisit).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <button
                        className="text-sm hover:opacity-80 transition-opacity"
                        style={{ color: colors.primary }}
                      >
                        View
                      </button>
                      <button
                        className="text-sm hover:opacity-80 transition-opacity"
                        style={{ color: getStatusColor('success') }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-sm hover:opacity-80 transition-opacity"
                        style={{ color: getStatusColor('error') }}
                      >
                        Archive
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
