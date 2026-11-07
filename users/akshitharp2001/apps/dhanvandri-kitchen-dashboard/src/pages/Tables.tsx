import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Check, Armchair } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Table } from '../data/sampleData';

export default function Tables() {
  const { tables, bookings, addTable, updateTable, deleteTable } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ number: 0, seats: 4, status: 'available' as Table['status'], location: 'Main Hall' });

  const today = new Date().toISOString().split('T')[0];
  const todayBookings = bookings.filter(b => b.date === today && b.status !== 'cancelled');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateTable(editingId, form);
      setEditingId(null);
    } else {
      const maxNum = tables.reduce((max, t) => Math.max(max, t.number), 0);
      addTable({ ...form, number: maxNum + 1 });
    }
    setForm({ number: 0, seats: 4, status: 'available', location: 'Main Hall' });
    setShowForm(false);
  };

  const handleEdit = (t: Table) => {
    setForm({ number: t.number, seats: t.seats, status: t.status, location: t.location });
    setEditingId(t.id);
    setShowForm(true);
  };

  const toggleStatus = (t: Table) => {
    const next = t.status === 'available' ? 'occupied' : t.status === 'occupied' ? 'reserved' : 'available';
    updateTable(t.id, { status: next });
  };

  const statusColors: Record<string, string> = { available: '#2e7d32', occupied: '#c62828', reserved: '#f57f17' };

  return (
    <div className="tables-page">
      <div className="page-header">
        <div className="header-left">
          <div className="table-legend">
            <span className="legend-item"><span className="dot" style={{ background: '#2e7d32' }} /> Available</span>
            <span className="legend-item"><span className="dot" style={{ background: '#c62828' }} /> Occupied</span>
            <span className="legend-item"><span className="dot" style={{ background: '#f57f17' }} /> Reserved</span>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => { setShowForm(true); setEditingId(null); setForm({ number: 0, seats: 4, status: 'available', location: 'Main Hall' }); }}>
          <Plus size={18} /> Add Table
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingId ? 'Edit Table' : 'Add Table'}</h3>
              <button onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Seats</label>
                  <input type="number" min={1} max={20} required value={form.seats} onChange={e => setForm({ ...form, seats: parseInt(e.target.value) })} />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <select value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}>
                    <option>Main Hall</option>
                    <option>Garden</option>
                    <option>Window</option>
                    <option>Private</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as Table['status'] })}>
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="reserved">Reserved</option>
                  </select>
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary"><Check size={18} /> {editingId ? 'Update' : 'Add Table'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="tables-grid">
        {tables.map(t => (
          <div key={t.id} className={`table-card status-${t.status}`} onClick={() => toggleStatus(t)}>
            <div className="table-card-header">
              <span className="table-number">T{t.number}</span>
              <div className="table-actions" onClick={e => e.stopPropagation()}>
                <button className="icon-btn" onClick={() => handleEdit(t)}><Edit2 size={14} /></button>
                <button className="icon-btn danger" onClick={() => deleteTable(t.id)}><Trash2 size={14} /></button>
              </div>
            </div>
            <div className="table-icon">
              <Armchair size={40} style={{ color: statusColors[t.status] }} />
            </div>
            <div className="table-details">
              <span>{t.seats} Seats</span>
              <span>{t.location}</span>
            </div>
            <span className="table-status-label" style={{ color: statusColors[t.status] }}>{t.status}</span>
          </div>
        ))}
      </div>

      <div className="upcoming-seatings">
        <h3>Today's Seatings</h3>
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
              {todayBookings.map(b => (
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
