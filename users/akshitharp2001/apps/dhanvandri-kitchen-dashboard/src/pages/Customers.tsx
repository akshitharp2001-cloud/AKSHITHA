import React, { useState } from 'react';
import { Search, Plus, X, Phone, Calendar } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Customers() {
  const { customers, bookings } = useAppContext();
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  );

  const selected = selectedId ? customers.find(c => c.id === selectedId) : null;
  const selectedBookings = selected ? bookings.filter(b => selected.bookingHistory.includes(b.id)) : [];

  return (
    <div className="customers-page">
      <div className="page-header">
        <div className="search-box">
          <Search size={18} />
          <input placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="customers-grid">
        <div className="customers-list">
          {filtered.map(c => (
            <div key={c.id} className={`customer-card ${selectedId === c.id ? 'selected' : ''}`} onClick={() => setSelectedId(c.id)}>
              <div className="customer-avatar">{c.name.charAt(0)}</div>
              <div className="customer-info">
                <h4>{c.name}</h4>
                <p><Phone size={14} /> {c.phone}</p>
                <div className="customer-meta">
                  <span><Calendar size={14} /> {c.totalVisits} visits</span>
                  <span>Last: {c.lastVisit}</span>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="empty-state">No customers found</div>}
        </div>

        <div className="customer-detail">
          {selected ? (
            <>
              <div className="detail-header">
                <div className="detail-avatar">{selected.name.charAt(0)}</div>
                <div>
                  <h3>{selected.name}</h3>
                  <p>{selected.phone}</p>
                </div>
              </div>
              <div className="detail-stats">
                <div className="stat-box">
                  <h4>{selected.totalVisits}</h4>
                  <p>Total Visits</p>
                </div>
                <div className="stat-box">
                  <h4>{selected.lastVisit}</h4>
                  <p>Last Visit</p>
                </div>
              </div>
              <h4>Booking History</h4>
              <div className="booking-history">
                {selectedBookings.length > 0 ? selectedBookings.map(b => (
                  <div key={b.id} className="history-item">
                    <span className="token-badge">{b.token}</span>
                    <span>{b.date} at {b.time}</span>
                    <span>{b.guests} guests</span>
                    <span className={`status-badge status-${b.status}`}>{b.status}</span>
                  </div>
                )) : <p className="empty-state">No booking history</p>}
              </div>
            </>
          ) : (
            <div className="empty-state detail-placeholder">
              <p>Select a customer to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
