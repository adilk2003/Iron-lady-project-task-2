
export type ProgramType = 'Lead' | 'Biz' | 'Tech' | 'Arts';

export type PaymentStatus = 'Paid' | 'Certificate' | 'Waitlist';

export interface Participant {
  id: string;
  name: string;
  email: string;
  program: ProgramType;
  paymentStatus: PaymentStatus;
  attendance: number; // 0-100
  createdAt: string;
  avatar: string;
}

export interface Activity {
  id: string;
  userName: string;
  action: string;
  timestamp: string;
  status?: PaymentStatus;
  avatar: string;
}

export interface MetricCardData {
  title: string;
  value: string | number;
  trend: number; // percentage
  trendUp: boolean;
  id: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error';
}
