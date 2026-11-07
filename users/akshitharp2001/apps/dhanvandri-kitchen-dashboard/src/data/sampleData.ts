export interface Booking {
  id: string;
  token: string;
  customerName: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tableNumber: number | null;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  specialRequests: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  totalVisits: number;
  lastVisit: string;
  bookingHistory: string[];
}

export interface Table {
  id: number;
  number: number;
  seats: number;
  status: 'available' | 'occupied' | 'reserved';
  location: string;
}

const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0];
const threeDaysAgo = new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0];
const fourDaysAgo = new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0];
const fiveDaysAgo = new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0];
const sixDaysAgo = new Date(Date.now() - 6 * 86400000).toISOString().split('T')[0];
const nextWeek = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

export const initialBookings: Booking[] = [
  { id: '1', token: 'DK001', customerName: 'Rajesh Kumar', phone: '+91 98765 43210', date: today, time: '12:30', guests: 4, tableNumber: 1, status: 'confirmed', specialRequests: 'Window seat preferred', createdAt: today },
  { id: '2', token: 'DK002', customerName: 'Priya Sharma', phone: '+91 87654 32109', date: today, time: '13:00', guests: 2, tableNumber: 3, status: 'confirmed', specialRequests: '', createdAt: today },
  { id: '3', token: 'DK003', customerName: 'Amit Patel', phone: '+91 76543 21098', date: today, time: '19:00', guests: 6, tableNumber: 5, status: 'pending', specialRequests: 'Birthday celebration', createdAt: today },
  { id: '4', token: 'DK004', customerName: 'Sneha Reddy', phone: '+91 65432 10987', date: today, time: '20:00', guests: 3, tableNumber: null, status: 'pending', specialRequests: 'Vegetarian menu', createdAt: today },
  { id: '5', token: 'DK005', customerName: 'Vikram Singh', phone: '+91 54321 09876', date: today, time: '14:00', guests: 2, tableNumber: null, status: 'cancelled', specialRequests: '', createdAt: today },
  { id: '6', token: 'DK006', customerName: 'Ananya Iyer', phone: '+91 43210 98765', date: yesterday, time: '12:00', guests: 4, tableNumber: 2, status: 'completed', specialRequests: '', createdAt: yesterday },
  { id: '7', token: 'DK007', customerName: 'Karthik Nair', phone: '+91 32109 87654', date: yesterday, time: '19:30', guests: 5, tableNumber: 4, status: 'completed', specialRequests: 'Anniversary', createdAt: yesterday },
  { id: '8', token: 'DK008', customerName: 'Meera Joshi', phone: '+91 21098 76543', date: yesterday, time: '13:30', guests: 2, tableNumber: 6, status: 'completed', specialRequests: '', createdAt: yesterday },
  { id: '9', token: 'DK009', customerName: 'Rahul Verma', phone: '+91 10987 65432', date: twoDaysAgo, time: '20:00', guests: 8, tableNumber: 7, status: 'completed', specialRequests: 'Corporate dinner', createdAt: twoDaysAgo },
  { id: '10', token: 'DK010', customerName: 'Divya Menon', phone: '+91 09876 54321', date: twoDaysAgo, time: '12:30', guests: 3, tableNumber: 1, status: 'completed', specialRequests: '', createdAt: twoDaysAgo },
  { id: '11', token: 'DK011', customerName: 'Suresh Gupta', phone: '+91 98765 12340', date: threeDaysAgo, time: '19:00', guests: 4, tableNumber: 3, status: 'completed', specialRequests: '', createdAt: threeDaysAgo },
  { id: '12', token: 'DK012', customerName: 'Pooja Desai', phone: '+91 87654 01239', date: fourDaysAgo, time: '13:00', guests: 2, tableNumber: 2, status: 'completed', specialRequests: 'High chair needed', createdAt: fourDaysAgo },
  { id: '13', token: 'DK013', customerName: 'Arjun Rao', phone: '+91 76543 90128', date: fiveDaysAgo, time: '20:30', guests: 6, tableNumber: 5, status: 'completed', specialRequests: '', createdAt: fiveDaysAgo },
  { id: '14', token: 'DK014', customerName: 'Neha Kapoor', phone: '+91 65432 89017', date: sixDaysAgo, time: '12:00', guests: 4, tableNumber: 4, status: 'completed', specialRequests: '', createdAt: sixDaysAgo },
  { id: '15', token: 'DK015', customerName: 'Rohan Mehta', phone: '+91 54321 78906', date: nextWeek, time: '19:00', guests: 10, tableNumber: null, status: 'confirmed', specialRequests: 'Private dining area', createdAt: today },
];

export const initialCustomers: Customer[] = [
  { id: 'c1', name: 'Rajesh Kumar', phone: '+91 98765 43210', totalVisits: 8, lastVisit: today, bookingHistory: ['1'] },
  { id: 'c2', name: 'Priya Sharma', phone: '+91 87654 32109', totalVisits: 5, lastVisit: today, bookingHistory: ['2'] },
  { id: 'c3', name: 'Amit Patel', phone: '+91 76543 21098', totalVisits: 3, lastVisit: today, bookingHistory: ['3'] },
  { id: 'c4', name: 'Sneha Reddy', phone: '+91 65432 10987', totalVisits: 2, lastVisit: today, bookingHistory: ['4'] },
  { id: 'c5', name: 'Vikram Singh', phone: '+91 54321 09876', totalVisits: 1, lastVisit: today, bookingHistory: ['5'] },
  { id: 'c6', name: 'Ananya Iyer', phone: '+91 43210 98765', totalVisits: 12, lastVisit: yesterday, bookingHistory: ['6'] },
  { id: 'c7', name: 'Karthik Nair', phone: '+91 32109 87654', totalVisits: 7, lastVisit: yesterday, bookingHistory: ['7'] },
  { id: 'c8', name: 'Meera Joshi', phone: '+91 21098 76543', totalVisits: 4, lastVisit: yesterday, bookingHistory: ['8'] },
  { id: 'c9', name: 'Rahul Verma', phone: '+91 10987 65432', totalVisits: 15, lastVisit: twoDaysAgo, bookingHistory: ['9'] },
  { id: 'c10', name: 'Divya Menon', phone: '+91 09876 54321', totalVisits: 6, lastVisit: twoDaysAgo, bookingHistory: ['10'] },
  { id: 'c11', name: 'Suresh Gupta', phone: '+91 98765 12340', totalVisits: 9, lastVisit: threeDaysAgo, bookingHistory: ['11'] },
  { id: 'c12', name: 'Pooja Desai', phone: '+91 87654 01239', totalVisits: 3, lastVisit: fourDaysAgo, bookingHistory: ['12'] },
  { id: 'c13', name: 'Arjun Rao', phone: '+91 76543 90128', totalVisits: 11, lastVisit: fiveDaysAgo, bookingHistory: ['13'] },
  { id: 'c14', name: 'Neha Kapoor', phone: '+91 65432 89017', totalVisits: 5, lastVisit: sixDaysAgo, bookingHistory: ['14'] },
  { id: 'c15', name: 'Rohan Mehta', phone: '+91 54321 78906', totalVisits: 2, lastVisit: nextWeek, bookingHistory: ['15'] },
];

export const initialTables: Table[] = [
  { id: 1, number: 1, seats: 4, status: 'occupied', location: 'Main Hall' },
  { id: 2, number: 2, seats: 2, status: 'available', location: 'Main Hall' },
  { id: 3, number: 3, seats: 4, status: 'occupied', location: 'Main Hall' },
  { id: 4, number: 4, seats: 6, status: 'available', location: 'Garden' },
  { id: 5, number: 5, seats: 6, status: 'reserved', location: 'Garden' },
  { id: 6, number: 6, seats: 2, status: 'available', location: 'Window' },
  { id: 7, number: 7, seats: 8, status: 'available', location: 'Private' },
  { id: 8, number: 8, seats: 4, status: 'available', location: 'Main Hall' },
  { id: 9, number: 9, seats: 2, status: 'available', location: 'Window' },
  { id: 10, number: 10, seats: 10, status: 'available', location: 'Private' },
];

export function generateNextToken(bookings: Booking[]): string {
  const maxNum = bookings.reduce((max, b) => {
    const num = parseInt(b.token.replace('DK', ''), 10);
    return num > max ? num : max;
  }, 0);
  const next = maxNum + 1;
  return `DK${String(next).padStart(3, '0')}`;
}
