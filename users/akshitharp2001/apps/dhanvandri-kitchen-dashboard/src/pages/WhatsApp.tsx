import React, { useState } from 'react';
import { MessageCircle, Send, CheckCircle, Phone, User, Calendar, Clock, Users, FileText } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function WhatsApp() {
  const { addBooking, tables } = useAppContext();
  const [form, setForm] = useState({ customerName: '', phone: '', guests: 2, date: new Date().toISOString().split('T')[0], time: '19:00', specialRequests: '' });
  const [confirmation, setConfirmation] = useState<{ token: string; name: string; date: string; time: string; guests: number } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const booking = addBooking({
      customerName: form.customerName,
      phone: form.phone,
      date: form.date,
      time: form.time,
      guests: form.guests,
      tableNumber: null,
      status: 'confirmed',
      specialRequests: form.specialRequests,
    });
    setConfirmation({ token: booking.token, name: booking.customerName, date: booking.date, time: booking.time, guests: booking.guests });
    setForm({ customerName: '', phone: '', guests: 2, date: new Date().toISOString().split('T')[0], time: '19:00', specialRequests: '' });
  };

  const openWhatsApp = () => {
    if (!confirmation) return;
    const msg = encodeURIComponent(
      `🍽️ *DHANVANDRI KITCHEN*\n\n✅ Booking Confirmed!\n\n🎫 Token: ${confirmation.token}\n👤 Name: ${confirmation.name}\n📅 Date: ${confirmation.date}\n⏰ Time: ${confirmation.time}\n👥 Guests: ${confirmation.guests}\n\nThank you for choosing Dhanvandri Kitchen!\nWe look forward to serving you. 🙏`
    );
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  return (
    <div className="whatsapp-page">
      <div className="whatsapp-container">
        <div className="whatsapp-header">
          <div className="whatsapp-logo">
            <MessageCircle size={32} fill="#25D366" color="#25D366" />
          </div>
          <div>
            <h2>WhatsApp Booking</h2>
            <p>Accept table reservations via WhatsApp messages</p>
          </div>
        </div>

        <div className="whatsapp-content">
          <div className="booking-form-card">
            <h3>New WhatsApp Booking</h3>
            <p className="form-subtitle">Enter details from the customer's WhatsApp message</p>

            <form onSubmit={handleSubmit} className="wa-form">
              <div className="form-group">
                <label><User size={16} /> Customer Name</label>
                <input required value={form.customerName} onChange={e => setForm({ ...form, customerName: e.target.value })} placeholder="Enter customer name" />
              </div>
              <div className="form-group">
                <label><Phone size={16} /> WhatsApp Number</label>
                <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label><Calendar size={16} /> Date</label>
                  <input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                </div>
                <div className="form-group">
                  <label><Clock size={16} /> Time</label>
                  <input type="time" required value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label><Users size={16} /> Number of Guests</label>
                <input type="number" min={1} max={20} required value={form.guests} onChange={e => setForm({ ...form, guests: parseInt(e.target.value) })} />
              </div>
              <div className="form-group">
                <label><FileText size={16} /> Special Requests</label>
                <textarea value={form.specialRequests} onChange={e => setForm({ ...form, specialRequests: e.target.value })} rows={3} placeholder="Any special requests..." />
              </div>
              <button type="submit" className="btn btn-whatsapp">
                <Send size={18} /> Confirm & Generate Token
              </button>
            </form>
          </div>

          {confirmation && (
            <div className="confirmation-card">
              <div className="confirmation-icon">
                <CheckCircle size={48} />
              </div>
              <h3>Booking Confirmed!</h3>
              <div className="confirmation-details">
                <div className="confirm-row"><span>Token</span><strong>{confirmation.token}</strong></div>
                <div className="confirm-row"><span>Name</span><strong>{confirmation.name}</strong></div>
                <div className="confirm-row"><span>Date</span><strong>{confirmation.date}</strong></div>
                <div className="confirm-row"><span>Time</span><strong>{confirmation.time}</strong></div>
                <div className="confirm-row"><span>Guests</span><strong>{confirmation.guests}</strong></div>
              </div>
              <button className="btn btn-whatsapp" onClick={openWhatsApp}>
                <MessageCircle size={18} /> Send via WhatsApp
              </button>
            </div>
          )}
        </div>

        <div className="wa-info-section">
          <h3>WhatsApp Integration Setup Guide</h3>
          <div className="setup-steps">
            <div className="step">
              <span className="step-num">1</span>
              <div>
                <h4>WhatsApp Business API</h4>
                <p>Register at <a href="https://business.whatsapp.com/products/business-platform" target="_blank" rel="noopener">business.whatsapp.com</a> and get your Business Account ID and API token.</p>
              </div>
            </div>
            <div className="step">
              <span className="step-num">2</span>
              <div>
                <h4>Make.com Automation</h4>
                <p>Create a scenario: WhatsApp trigger → Parse message → Add to Google Sheets → Send confirmation. Use webhooks for real-time processing.</p>
              </div>
            </div>
            <div className="step">
              <span className="step-num">3</span>
              <div>
                <h4>Google Sheets Backend</h4>
                <p>Create a shared Google Sheet with columns: Token, Name, Phone, Date, Time, Guests, Table, Status, Requests. Connect it to this dashboard.</p>
              </div>
            </div>
            <div className="step">
              <span className="step-num">4</span>
              <div>
                <h4>Auto-Reply Template</h4>
                <p>Set up a WhatsApp template message for automatic confirmations with token number, date, time, and guest count.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
