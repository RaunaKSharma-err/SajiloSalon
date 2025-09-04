export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  duration: number; // in minutes
  category: string;
}

export interface SelectedService extends Service {
  quantity: number;
}

export interface Transaction {
  date: string;
  services: SelectedService[];
  total: number;
  customerNote?: string;
  user_id:string;
}

export type FilterPeriod = '7days' | '15days' | '30days' | 'all';