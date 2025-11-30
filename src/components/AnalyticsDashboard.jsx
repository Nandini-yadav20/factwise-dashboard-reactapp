import { useState, useMemo } from "react";
import { processedData } from "../Data/processedData";

import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

export default function AnalyticsDashboard({ darkMode = true }) {
  const [data] = useState(processedData);
  const [selectedMetric, setSelectedMetric] = useState('performance');

  // Graph Data Transformations
  const performanceGraph = useMemo(() => 
    data.map(e => ({ name: e.firstName, rating: e.performanceRating }))
      .sort((a, b) => b.rating - a.rating).slice(0, 10),
    [data]
  );

  const salaryGraph = useMemo(() => 
    data.map(e => ({ name: e.firstName, salary: e.salary }))
      .sort((a, b) => b.salary - a.salary).slice(0, 10),
    [data]
  );

  const departmentCount = useMemo(() => {
    const counts = data.reduce((acc, e) => ({ 
      ...acc, 
      [e.department]: (acc[e.department] || 0) + 1 
    }), {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [data]);

  const promotionGraph = useMemo(() => 
    data.map(e => ({ name: e.firstName, promotion: parseFloat(e.promotionScore) }))
      .sort((a, b) => b.promotion - a.promotion).slice(0, 10),
    [data]
  );

  const tierDistribution = useMemo(() => {
    const tiers = data.reduce((acc, e) => ({ 
      ...acc, 
      [e.tier]: (acc[e.tier] || 0) + 1 
    }), {});
    return Object.entries(tiers).map(([name, value]) => ({ name, value }));
  }, [data]);

  const departmentPerformance = useMemo(() => {
    const deptData = {};
    data.forEach(e => {
      if (!deptData[e.department]) {
        deptData[e.department] = { 
          name: e.department, 
          performance: 0, 
          salary: 0, 
          projects: 0, 
          count: 0 
        };
      }
      deptData[e.department].performance += e.performanceRating;
      deptData[e.department].salary += e.salary;
      deptData[e.department].projects += e.projectsCompleted;
      deptData[e.department].count += 1;
    });
    
    return Object.values(deptData).map(dept => ({
      name: dept.name,
      performance: (dept.performance / dept.count).toFixed(2),
      avgSalary: Math.round(dept.salary / dept.count),
      avgProjects: Math.round(dept.projects / dept.count)
    }));
  }, [data]);

  // Insights
  const avgPerformance = useMemo(() => 
    (data.reduce((a, b) => a + b.performanceRating, 0) / data.length).toFixed(2),
    [data]
  );
  const avgSalary = useMemo(() => 
    (data.reduce((a, b) => a + b.salary, 0) / data.length).toFixed(0),
    [data]
  );
  const topPerformer = useMemo(() => 
    data.reduce((a, b) => a.performanceRating > b.performanceRating ? a : b),
    [data]
  );
  const highValue = useMemo(() => 
    data.reduce((a, b) => parseFloat(a.costEfficiency) > parseFloat(b.costEfficiency) ? a : b),
    [data]
  );

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

  return (
    <div style={{ 
      background: darkMode 
        ? 'rgba(30, 41, 59, 0.5)' 
        : 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '24px',
      border: darkMode 
        ? '1px solid rgba(255,255,255,0.1)' 
        : '1px solid rgba(0,0,0,0.1)'
    }}>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <h1 style={{ 
          margin: 0,
          fontSize: '24px',
          fontWeight: '700',
          color: darkMode ? '#e2e8f0' : '#1e293b'
        }}>
          📊 Advanced Analytics
        </h1>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['performance', 'salary', 'promotion'].map(metric => (
            <button
              key={metric}
              onClick={() => setSelectedMetric(metric)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: selectedMetric === metric 
                  ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                  : darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                color: selectedMetric === metric 
                  ? 'white' 
                  : darkMode ? '#e2e8f0' : '#334155',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '13px',
                transition: 'all 0.3s ease',
                textTransform: 'capitalize'
              }}
            >
              {metric}
            </button>
          ))}
        </div>
      </div>

      {/* Insights Panel */}
      <div style={{
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
        gap: "16px", 
        marginBottom: "24px"
      }}>
        <InsightCard 
          title="Avg Performance Rating" 
          value={avgPerformance} 
          icon="⭐"
          color="#3b82f6"
          darkMode={darkMode}
        />
        <InsightCard 
          title="Average Salary" 
          value={`$${parseInt(avgSalary).toLocaleString()}`} 
          icon="💰"
          color="#10b981"
          darkMode={darkMode}
        />
        <InsightCard 
          title="Top Performer" 
          value={`${topPerformer.firstName} (${topPerformer.performanceRating})`} 
          icon="🏆"
          color="#f59e0b"
          darkMode={darkMode}
        />
        <InsightCard 
          title="Best ROI" 
          value={`${highValue.firstName} (${highValue.costEfficiency})`} 
          icon="📈"
          color="#8b5cf6"
          darkMode={darkMode}
        />
      </div>

      {/* Main Charts Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", gap: "24px" }}>

        {/* Top 10 Performance */}
        <ChartCard title="🌟 Top 10 Performance Leaders" darkMode={darkMode}>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={performanceGraph}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
              <XAxis 
                dataKey="name" 
                stroke={darkMode ? '#94a3b8' : '#64748b'}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} />
              <Tooltip 
                contentStyle={{
                  background: darkMode ? '#1e293b' : 'white',
                  border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="rating" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Department Distribution */}
        <ChartCard title="🏢 Department Distribution" darkMode={darkMode}>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie 
                dataKey="value" 
                data={departmentCount} 
                cx="50%" 
                cy="50%" 
                outerRadius={100}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {departmentCount.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  background: darkMode ? '#1e293b' : 'white',
                  border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Top 10 Salaries */}
        <ChartCard title="💵 Top 10 Highest Paid" darkMode={darkMode}>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={salaryGraph} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
              <XAxis type="number" stroke={darkMode ? '#94a3b8' : '#64748b'} />
              <YAxis 
                dataKey="name" 
                type="category" 
                stroke={darkMode ? '#94a3b8' : '#64748b'}
                width={80}
              />
              <Tooltip 
                contentStyle={{
                  background: darkMode ? '#1e293b' : 'white',
                  border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                  borderRadius: '8px'
                }}
                formatter={(value) => `$${value.toLocaleString()}`}
              />
              <Bar dataKey="salary" fill="#10b981" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Tier Distribution */}
        <ChartCard title="🎯 Performance Tiers" darkMode={darkMode}>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie 
                dataKey="value" 
                data={tierDistribution} 
                cx="50%" 
                cy="50%" 
                innerRadius={60}
                outerRadius={100}
                label
              >
                {tierDistribution.map((entry, index) => (
                  <Cell key={index} fill={
                    entry.name === 'Elite' ? '#10b981' :
                    entry.name === 'Strong' ? '#3b82f6' :
                    entry.name === 'Average' ? '#f59e0b' : '#ef4444'
                  } />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  background: darkMode ? '#1e293b' : 'white',
                  border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                  borderRadius: '8px'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Department Performance Radar */}
        <ChartCard title="🎯 Department Performance Metrics" darkMode={darkMode}>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={departmentPerformance}>
              <PolarGrid stroke={darkMode ? '#334155' : '#e2e8f0'} />
              <PolarAngleAxis dataKey="name" stroke={darkMode ? '#94a3b8' : '#64748b'} />
              <PolarRadiusAxis stroke={darkMode ? '#94a3b8' : '#64748b'} />
              <Radar name="Performance" dataKey="performance" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Tooltip 
                contentStyle={{
                  background: darkMode ? '#1e293b' : 'white',
                  border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                  borderRadius: '8px'
                }}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Promotion Readiness */}
        <ChartCard title="🚀 Top 10 Promotion Ready" darkMode={darkMode}>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={promotionGraph}>
              <defs>
                <linearGradient id="colorPromotion" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
              <XAxis 
                dataKey="name" 
                stroke={darkMode ? '#94a3b8' : '#64748b'}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} />
              <Tooltip 
                contentStyle={{
                  background: darkMode ? '#1e293b' : 'white',
                  border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="promotion" 
                stroke="#8b5cf6" 
                fillOpacity={1}
                fill="url(#colorPromotion)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>
    </div>
  );
}

// COMPONENTS

function InsightCard({ title, value, icon, color, darkMode }) {
  return (
    <div style={{
      background: darkMode 
        ? 'rgba(51, 65, 85, 0.5)' 
        : 'rgba(248, 250, 252, 0.9)',
      padding: "20px",
      borderRadius: "12px",
      border: darkMode 
        ? '1px solid rgba(255,255,255,0.05)' 
        : '1px solid rgba(0,0,0,0.05)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = darkMode 
        ? '0 8px 16px rgba(0,0,0,0.3)' 
        : '0 8px 16px rgba(0,0,0,0.1)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        fontSize: '48px',
        opacity: 0.1
      }}>
        {icon}
      </div>
      <p style={{ 
        margin: "0 0 8px 0", 
        opacity: .8,
        fontSize: '13px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        color: darkMode ? '#94a3b8' : '#64748b'
      }}>
        {title}
      </p>
      <h2 style={{ 
        marginTop: "0", 
        fontSize: "26px", 
        color: color,
        fontWeight: '700'
      }}>
        {value}
      </h2>
    </div>
  );
}

function ChartCard({ title, children, darkMode }) {
  return (
    <div style={{ 
      background: darkMode 
        ? 'rgba(51, 65, 85, 0.5)' 
        : 'rgba(248, 250, 252, 0.9)',
      padding: "24px", 
      borderRadius: "12px",
      border: darkMode 
        ? '1px solid rgba(255,255,255,0.05)' 
        : '1px solid rgba(0,0,0,0.05)'
    }}>
      <h3 style={{ 
        margin: "0 0 16px 0",
        fontSize: '18px',
        fontWeight: '700',
        color: darkMode ? '#e2e8f0' : '#1e293b'
      }}>
        {title}
      </h3>
      {children}
    </div>
  );
}