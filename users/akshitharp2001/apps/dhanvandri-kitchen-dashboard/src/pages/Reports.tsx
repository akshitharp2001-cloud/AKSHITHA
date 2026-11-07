import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend, AreaChart, Area } from 'recharts';
import { useAppContext } from '../context/AppContext';

export default function Reports() {
  const { bookings, tables } = useAppContext();
  const [period, setPeriod] = useState<'week' | 'month'>('week');

  const days = period === 'week' ? 7 : 30;
  const dateRange = Array.from({ length: days }, (_, i) => {
    const d = new Date(Date.now() - (days - 1 - i) * 86400000);
    return d.toISOString().split('T')[0];
  });

  const dailyBookings = dateRange.map(date => ({
    date: new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
    bookings: bookings.filter(b => b.date === date).length,
    guests: bookings.filter(b => b.date === date).reduce((s, b) => s + b.guests, 0),
  }));

  const statusCounts = [
    { name: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, color: '#2e7d32' },
    { name: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: '#f57f17' },
    { name: 'Cancelled', value: bookings.filter(b => b.status === 'cancelled').length, color: '#c62828' },
    { name: 'Completed', value: bookings.filter(b => b.status === 'completed').length, color: '#1565c0' },
  ].filter(d => d.value > 0);

  const tableOccupancy = tables.map(t => ({
    name: `T${t.number}`,
    occupied: t.status === 'occupied' ? 1 : 0,
    available: t.status === 'available' ? 1 : 0,
    reserved: t.status === 'reserved' ? 1 : 0,
  }));

  const totalBookings = bookings.length;
  const totalGuests = bookings.reduce((s, b) => s + b.guests, 0);
  const avgGuests = totalBookings > 0 ? (totalGuests / totalBookings).toFixed(1) : '0';
  const completionRate = totalBookings > 0 ? ((bookings.filter(b => b.status === 'completed').length / totalBookings) * 100).toFixed(0) : '0';

  const handleExport = () => {
    const headers = ['Date', 'Bookings', 'Guests'];
    const rows = dailyBookings.map(d => [d.date, d.bookings, d.guests]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `report_${period}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="reports-page">
      <div className="page-header">
        <div className="header-left">
          <div className="period-toggle">
            <button className={period === 'week' ? 'active' : ''} onClick={() => setPeriod('week')}>Weekly</button>
            <button className={period === 'month' ? 'active' : ''} onClick={() => setPeriod('month')}>Monthly</button>
          </div>
        </div>
        <button className="btn btn-outline" onClick={handleExport}>Export Report</button>
      </div>

      <div className="report-summary">
        <div className="stat-card"><h4>{totalBookings}</h4><p>Total Bookings</p></div>
        <div className="stat-card"><h4>{totalGuests}</h4><p>Total Guests</p></div>
        <div className="stat-card"><h4>{avgGuests}</h4><p>Avg Guests/Booking</p></div>
        <div className="stat-card"><h4>{completionRate}%</h4><p>Completion Rate</p></div>
      </div>

      <div className="charts-grid">
        <div className="chart-card wide">
          <h3>Booking Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailyBookings}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="date" tick={{ fill: '#555', fontSize: 11 }} angle={-45} textAnchor="end" height={60} />
              <YAxis tick={{ fill: '#555', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 8 }} />
              <Legend />
              <Area type="monotone" dataKey="bookings" stroke="#1a5632" fill="#1a563240" name="Bookings" />
              <Area type="monotone" dataKey="guests" stroke="#d4af37" fill="#d4af3740" name="Guests" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Booking Status Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={statusCounts} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={45} paddingAngle={3} label={({ name, value }) => `${name}: ${value}`}>
                {statusCounts.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Table Occupancy</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={tableOccupancy}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" tick={{ fill: '#555', fontSize: 12 }} />
              <YAxis tick={{ fill: '#555', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 8 }} />
              <Legend />
              <Bar dataKey="occupied" stackId="a" fill="#c62828" name="Occupied" />
              <Bar dataKey="reserved" stackId="a" fill="#f57f17" name="Reserved" />
              <Bar dataKey="available" stackId="a" fill="#2e7d32" name="Available" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
