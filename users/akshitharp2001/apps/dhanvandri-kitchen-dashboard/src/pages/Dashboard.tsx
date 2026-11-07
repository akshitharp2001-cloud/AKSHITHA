import React from 'react';
import { CalendarCheck, CheckCircle, Clock, XCircle, Users, UserCheck, Armchair, UtensilsCrossed } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAppContext } from '../context/AppContext';

export default function Dashboard() {
  const { bookings, tables, customers } = useAppContext();
  const today = new Date().toISOString().split('T')[0];

  const todayBookings = bookings.filter(b => b.date === today);
  const confirmed = todayBookings.filter(b => b.status === 'confirmed').length;
  const pending = todayBookings.filter(b => b.status === 'pending').length;
  const cancelled = todayBookings.filter(b => b.status === 'cancelled').length;
  const totalCustomers = customers.length;
  const totalGuests = todayBookings.reduce((sum, b) => sum + b.guests, 0);
  const availableTables = tables.filter(t => t.status === 'available').length;
  const occupiedTables = tables.filter(t => t.status === 'occupied' || t.status === 'reserved').length;

  const cards = [
    { label: 'Total Bookings Today', value: todayBookings.length, icon: CalendarCheck, color: '#1a5632', bg: '#e8f5e9' },
    { label: 'Confirmed', value: confirmed, icon: CheckCircle, color: '#2e7d32', bg: '#c8e6c9' },
    { label: 'Pending', value: pending, icon: Clock, color: '#f57f17', bg: '#fff8e1' },
    { label: 'Cancelled', value: cancelled, icon: XCircle, color: '#c62828', bg: '#ffebee' },
    { label: 'Total Customers', value: totalCustomers, icon: Users, color: '#1565c0', bg: '#e3f2fd' },
    { label: 'Total Guests Today', value: totalGuests, icon: UserCheck, color: '#6a1b9a', bg: '#f3e5f5' },
    { label: 'Available Tables', value: availableTables, icon: Armchair, color: '#00838f', bg: '#e0f7fa' },
    { label: 'Occupied Tables', value: occupiedTables, icon: UtensilsCrossed, color: '#e65100', bg: '#fff3e0' },
  ];

  // Last 7 days booking data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - (6 - i) * 86400000);
    return d.toISOString().split('T')[0];
  });
  const dailyData = last7Days.map(date => ({
    day: new Date(date).toLocaleDateString('en-IN', { weekday: 'short' }),
    bookings: bookings.filter(b => b.date === date).length,
  }));

  // Status pie
  const statusData = [
    { name: 'Confirmed', value: confirmed, color: '#2e7d32' },
    { name: 'Pending', value: pending, color: '#f57f17' },
    { name: 'Cancelled', value: cancelled, color: '#c62828' },
  ].filter(d => d.value > 0);

  return (
    <div className="dashboard">
      <div className="cards-grid">
        {cards.map((card, i) => (
          <div key={i} className="summary-card" style={{ borderLeftColor: card.color }}>
            <div className="card-icon" style={{ background: card.bg, color: card.color }}>
              <card.icon size={24} />
            </div>
            <div className="card-info">
              <h3>{card.value}</h3>
              <p>{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <h3>Bookings – Last 7 Days</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="day" tick={{ fill: '#555', fontSize: 12 }} />
              <YAxis tick={{ fill: '#555', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #1a5632' }} />
              <Bar dataKey="bookings" fill="#1a5632" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Today's Booking Status</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={50} paddingAngle={3} label={({ name, value }) => `${name}: ${value}`}>
                {statusData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="recent-bookings">
        <h3>Recent Bookings</h3>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Token</th>
                <th>Customer</th>
                <th>Time</th>
                <th>Guests</th>
                <th>Table</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {todayBookings.slice(0, 5).map(b => (
                <tr key={b.id}>
                  <td><span className="token-badge">{b.token}</span></td>
                  <td>{b.customerName}</td>
                  <td>{b.time}</td>
                  <td>{b.guests}</td>
                  <td>{b.tableNumber ? `T${b.tableNumber}` : '—'}</td>
                  <td><span className={`status-badge status-${b.status}`}>{b.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
