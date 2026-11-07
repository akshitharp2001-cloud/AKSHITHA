import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Booking, Customer, Table, initialBookings, initialCustomers, initialTables, generateNextToken } from '../data/sampleData';

interface AppContextType {
  bookings: Booking[];
  customers: Customer[];
  tables: Table[];
  addBooking: (booking: Omit<Booking, 'id' | 'token' | 'createdAt'>) => Booking;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  addTable: (table: Omit<Table, 'id'>) => void;
  updateTable: (id: number, updates: Partial<Table>) => void;
  deleteTable: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [tables, setTables] = useState<Table[]>(initialTables);

  const addBooking = (bookingData: Omit<Booking, 'id' | 'token' | 'createdAt'>): Booking => {
    const token = generateNextToken(bookings);
    const newBooking: Booking = {
      ...bookingData,
      id: String(Date.now()),
      token,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const addCustomer = (customerData: Omit<Customer, 'id'>) => {
    const newCustomer: Customer = { ...customerData, id: `c${Date.now()}` };
    setCustomers(prev => [...prev, newCustomer]);
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const addTable = (tableData: Omit<Table, 'id'>) => {
    const maxId = tables.reduce((max, t) => Math.max(max, t.id), 0);
    setTables(prev => [...prev, { ...tableData, id: maxId + 1 }]);
  };

  const updateTable = (id: number, updates: Partial<Table>) => {
    setTables(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTable = (id: number) => {
    setTables(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider value={{
      bookings, customers, tables,
      addBooking, updateBooking, deleteBooking,
      addCustomer, updateCustomer,
      addTable, updateTable, deleteTable,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
