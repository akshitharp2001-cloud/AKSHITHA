import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Booking } from '../data/sampleData';

export default function Bookings() {
  const { bookings, tables, addBooking, updateBooking, deleteBooking } = useAppContext();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ customerName: '', phone: '', date: new Date().toISOString().split('T')[0], time: '19:00', guests: 2, tableNumber: null as number | null, status: 'pending' as Booking['status'], specialRequests: '' });

  const filtered = bookings.filter(b => {
    const matchSearch = b.customerName.toLowerCase().includes(search.toLowerCase()) || b.token.toLowerCase().includes(search.toLowerCase()) || b.phone.includes(search);
    const matchStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateBooking(editingId, form);
      setEditingId(null);
    } else {
      addBooking(form);
    }
    setForm({ customerName: '', phone: '', date: new Date().toISOString().split('T')[0], time: '19:00', guests: 2, tableNumber: null, status: 'pending', specialRequests: '' });
    setShowForm(false);
  };

  const handleEdit = (b: Booking) => {
    setForm({ customerName: b.customerName, phone: b.phone, date: b.date, time: b.time, guests: b.guests, tableNumber: b.tableNumber, status: b.status, specialRequests: b.specialRequests });
    setEditingId(b.id);
    setShowForm(true);
  };

  const handleExport = () => {
    const headers = ['Token', 'Customer', 'Phone', 'Date', 'Time', 'Guests', 'Table', 'Status', 'Special Requests'];
    const rows = filtered.map(b => [b.token, b.customerName, b.phone, b.date, b.time, b.guests, b.tableNumber ? `T${b.tableNumber}` : '', b.status, b.specialRequests]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'bookings.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bookings-page">
      <div className="page-header">
        <div className="header-left">
          <div className="search-box">
            <Search size={18} />
            <input placeholder="Search by name, token or phone..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="filter-select">
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="header-right">
          <button className="btn btn-outline" onClick={handleExport}>Export CSV</button>
          <button className="btn btn-primary" onClick={() => { setShowForm(true); setEditingId(null); setForm({ customerName: '', phone: '', date: new Date().toISOString().split('T')[0], time: '19:00', guests: 2, tableNumber: null, status: 'pending', specialRequests: '' }); }}>
            <Plus size={18} /> New Booking
          </button>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingId ? 'Edit Booking' : 'New Booking'}</h3>
              <button onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Customer Name</label>
                  <input required value={form.customerName} onChange={e => setForm({ ...form, customerName: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input type="time" required value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Guests</label>
                  <input type="number" min={1} max={20} required value={form.guests} onChange={e => setForm({ ...form, guests: parseInt(e.target.value) })} />
                </div>
                <div className="form-group">
                  <label>Table</label>
                  <select value={form.tableNumber || ''} onChange={e => setForm({ ...form, tableNumber: e.target.value ? parseInt(e.target.value) : null })}>
                    <option value="">Unassigned</option>
                    {tables.filter(t => t.status === 'available').map(t => <option key={t.id} value={t.number}>Table {t.number} ({t.seats} seats)</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as Booking['status'] })}>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Special Requests</label>
                  <textarea value={form.specialRequests} onChange={e => setForm({ ...form, specialRequests: e.target.value })} rows={2} />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary"><Check size={18} /> {editingId ? 'Update' : 'Create Booking'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Table</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id}>
                <td><span className="token-badge">{b.token}</span></td>
                <td>{b.customerName}</td>
                <td>{b.phone}</td>
                <td>{b.date}</td>
                <td>{b.time}</td>
                <td>{b.guests}</td>
                <td>{b.tableNumber ? `T${b.tableNumber}` : '—'}</td>
                <td><span className={`status-badge status-${b.status}`}>{b.status}</span></td>
                <td className="actions-cell">
                  <button className="icon-btn" onClick={() => handleEdit(b)} title="Edit"><Edit2 size={16} /></button>
                  <button className="icon-btn danger" onClick={() => deleteBooking(b.id)} title="Delete"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && <div className="empty-state">No bookings found</div>}
    </div>
  );
}
