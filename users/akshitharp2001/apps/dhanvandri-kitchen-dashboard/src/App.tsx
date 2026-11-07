import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Customers from './pages/Customers';
import Tables from './pages/Tables';
import Reports from './pages/Reports';
import WhatsApp from './pages/WhatsApp';

function AppContent() {
  const [page, setPage] = useState('dashboard');

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard />;
      case 'bookings': return <Bookings />;
      case 'customers': return <Customers />;
      case 'tables': return <Tables />;
      case 'reports': return <Reports />;
      case 'whatsapp': return <WhatsApp />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={page} onNavigate={setPage}>
      {renderPage()}
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
