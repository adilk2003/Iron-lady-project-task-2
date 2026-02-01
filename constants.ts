
import { Participant, Activity, MetricCardData } from './types';

export const COLORS = {
  primary: '#D31027', // Brand Red
  deepMaroon: '#2D0101', // Replacing Black with a deep maroon
  background: '#f7f6e4', // Requested body color
  surface: '#FFFFFF',
  paid: '#10B981',
  certificate: '#2563EB',
  waitlist: '#F59E0B',
  textPrimary: '#2D0101',
  textSecondary: '#666666',
};

export const INITIAL_PARTICIPANTS: Participant[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    program: 'Tech',
    paymentStatus: 'Paid',
    attendance: 95,
    createdAt: '2024-03-10T10:00:00Z',
    avatar: 'https://picsum.photos/seed/sarah/100/100',
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    email: 'm.rodriguez@example.com',
    program: 'Lead',
    paymentStatus: 'Certificate',
    attendance: 100,
    createdAt: '2024-03-08T14:30:00Z',
    avatar: 'https://picsum.photos/seed/maria/100/100',
  },
  {
    id: '3',
    name: 'Emily Chen',
    email: 'emily.c@example.com',
    program: 'Biz',
    paymentStatus: 'Waitlist',
    attendance: 45,
    createdAt: '2024-03-12T09:15:00Z',
    avatar: 'https://picsum.photos/seed/emily/100/100',
  },
  {
    id: '4',
    name: 'Jessica Taylor',
    email: 'j.taylor@example.com',
    program: 'Arts',
    paymentStatus: 'Paid',
    attendance: 78,
    createdAt: '2024-03-11T16:45:00Z',
    avatar: 'https://picsum.photos/seed/jessica/100/100',
  },
];

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    userName: 'Sarah Jenkins',
    action: 'Enrolled in Tech Program',
    timestamp: '2 mins ago',
    status: 'Paid',
    avatar: 'https://picsum.photos/seed/sarah/100/100',
  },
  {
    id: 'a2',
    userName: 'Emily Chen',
    action: 'Joined Waitlist for Biz',
    timestamp: '1 hour ago',
    status: 'Waitlist',
    avatar: 'https://picsum.photos/seed/emily/100/100',
  },
  {
    id: 'a3',
    userName: 'Maria Rodriguez',
    action: 'Earned Program Certificate',
    timestamp: '5 hours ago',
    status: 'Certificate',
    avatar: 'https://picsum.photos/seed/maria/100/100',
  },
];

export const INITIAL_METRICS: MetricCardData[] = [
  { id: 'total-participants', title: 'Total Participants', value: 1248, trend: 12, trendUp: true },
  { id: 'total-payments', title: 'Total Revenue', value: '$45.2K', trend: 8, trendUp: true },
  { id: 'avg-attendance', title: 'Avg Attendance', value: '87%', trend: 2, trendUp: false },
  { id: 'active-programs', title: 'Active Tracks', value: 4, trend: 0, trendUp: true },
];
