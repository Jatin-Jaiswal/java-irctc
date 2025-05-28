
export interface User {
  name: string;
  password: string;
  hashed_password: string;
  tickets_booked: Ticket[];
  user_id: string;
}

export interface Train {
  train_id: string;
  train_no: string;
  seats: number[][];
  station_times: Record<string, string>;
  stations: string[];
}

export interface Ticket {
  ticket_id: string;
  user_id: string;
  source: string;
  destination: string;
  date_of_travel: string;
  train: Train;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}
