import { useState } from 'react';
import Dashboard from "./components/Dashboard"
import StatsCard from "./components/StatCard"
import AnalyticsDashboard from "./components/AnalyticsDashboard"
import EmployeeData from "./Data/EmployeeData"

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeView, setActiveView] = useState('overview');

  // Calculate stats
  const totalEmployees = EmployeeData.length;
  const activeEmployees = EmployeeData.filter(e => e.isActive).length;
  const avgSalary = Math.round(EmployeeData.reduce((a, b) => a + b.salary, 0) / EmployeeData.length);
  const avgPerformance = (EmployeeData.reduce((a, b) => a + b.performanceRating, 0) / EmployeeData.length).toFixed(1);

  const departments = [...new Set(EmployeeData.map(e => e.department))];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div style={{
        minHeight: '100vh',
        background: darkMode 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' 
          : 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        transition: 'all 0.3s ease'
      }}>
        {/* Header */}
        <header style={{
          background: darkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
          padding: '16px 32px',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                📊
              </div>
              <h1 style={{
                margin: 0,
                fontSize: '24px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                FactWise Analytics
              </h1>
            </div>

            {/* Navigation */}
            <nav style={{ display: 'flex', gap: '8px' }}>
              {['overview', 'table', 'analytics'].map(view => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    background: activeView === view 
                      ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                      : darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    color: activeView === view ? 'white' : darkMode ? '#e2e8f0' : '#334155',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    textTransform: 'capitalize'
                  }}
                  onMouseEnter={(e) => {
                    if (activeView !== view) {
                      e.target.style.background = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeView !== view) {
                      e.target.style.background = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                    }
                  }}
                >
                  {view === 'overview' ? '🏠 Overview' : view === 'table' ? '📋 Table' : '📈 Analytics'}
                </button>
              ))}
            </nav>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                border: 'none',
                background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                color: darkMode ? '#fbbf24' : '#f59e0b',
                cursor: 'pointer',
                fontSize: '20px',
                transition: 'all 0.3s ease'
              }}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '32px'
        }}>
          {activeView === 'overview' && (
            <div style={{ animation: 'fadeIn 0.5s ease' }}>
              {/* Stats Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '32px'
              }}>
                <StatsCard
                  title="Total Employees"
                  value={totalEmployees}
                  icon="👥"
                  color="#3b82f6"
                  darkMode={darkMode}
                />
                <StatsCard
                  title="Active Employees"
                  value={activeEmployees}
                  icon="✅"
                  color="#10b981"
                  darkMode={darkMode}
                />
                <StatsCard
                  title="Avg. Salary"
                  value={`$${avgSalary.toLocaleString()}`}
                  icon="💰"
                  color="#f59e0b"
                  darkMode={darkMode}
                />
                <StatsCard
                  title="Avg. Performance"
                  value={avgPerformance}
                  icon="⭐"
                  color="#8b5cf6"
                  darkMode={darkMode}
                />
              </div>

              {/* Department Cards */}
              <div style={{
                background: darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '24px',
                border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                marginBottom: '32px'
              }}>
                <h2 style={{
                  margin: '0 0 20px 0',
                  fontSize: '20px',
                  fontWeight: '700',
                  color: darkMode ? '#e2e8f0' : '#1e293b'
                }}>
                  🏢 Departments Overview
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px'
                }}>
                  {departments.map((dept, i) => {
                    const deptEmployees = EmployeeData.filter(e => e.department === dept);
                    const deptAvgPerf = (deptEmployees.reduce((a, b) => a + b.performanceRating, 0) / deptEmployees.length).toFixed(1);
                    return (
                      <div key={i} style={{
                        background: darkMode ? 'rgba(51, 65, 85, 0.5)' : 'rgba(241, 245, 249, 0.8)',
                        padding: '16px',
                        borderRadius: '12px',
                        border: darkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
                        transition: 'transform 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        <div style={{
                          fontSize: '24px',
                          marginBottom: '8px'
                        }}>
                          {dept === 'Engineering' ? '⚙️' : dept === 'Marketing' ? '📢' : dept === 'Sales' ? '💼' : dept === 'HR' ? '👔' : '💵'}
                        </div>
                        <h3 style={{
                          margin: '0 0 8px 0',
                          fontSize: '16px',
                          fontWeight: '600',
                          color: darkMode ? '#e2e8f0' : '#1e293b'
                        }}>
                          {dept}
                        </h3>
                        <div style={{
                          fontSize: '13px',
                          color: darkMode ? '#94a3b8' : '#64748b',
                          marginBottom: '4px'
                        }}>
                          {deptEmployees.length} employees
                        </div>
                        <div style={{
                          fontSize: '13px',
                          color: darkMode ? '#94a3b8' : '#64748b'
                        }}>
                          Avg Rating: <span style={{ color: '#3b82f6', fontWeight: '600' }}>{deptAvgPerf}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Analytics Preview */}
              <div style={{
                background: darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '24px',
                border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)'
              }}>
                <h2 style={{
                  margin: '0 0 20px 0',
                  fontSize: '20px',
                  fontWeight: '700',
                  color: darkMode ? '#e2e8f0' : '#1e293b'
                }}>
                  🚀 Quick Actions
                </h2>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <ActionButton darkMode={darkMode} onClick={() => setActiveView('table')}>
                    📋 View Employee Table
                  </ActionButton>
                  <ActionButton darkMode={darkMode} onClick={() => setActiveView('analytics')}>
                    📊 View Analytics
                  </ActionButton>
                  <ActionButton darkMode={darkMode}>
                    📥 Export Data
                  </ActionButton>
                  <ActionButton darkMode={darkMode}>
                    ➕ Add Employee
                  </ActionButton>
                </div>
              </div>
            </div>
          )}

          {activeView === 'table' && (
            <div style={{ animation: 'fadeIn 0.5s ease' }}>
              <Dashboard darkMode={darkMode} />
            </div>
          )}

          {activeView === 'analytics' && (
            <div style={{ animation: 'fadeIn 0.5s ease' }}>
              <AnalyticsDashboard darkMode={darkMode} />
            </div>
          )}
        </main>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
}

function ActionButton({ children, darkMode, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '12px 24px',
        borderRadius: '10px',
        border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
        background: darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)',
        color: darkMode ? '#93c5fd' : '#2563eb',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '14px',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.target.style.background = darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.2)';
        e.target.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.target.style.background = darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)';
        e.target.style.transform = 'translateY(0)';
      }}
    >
      {children}
    </button>
  );
}

export default App