
export type Studio = {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  hourlyRate: number;
  securityDeposit: number;
  ownerEmail: string;
  ownerName: string;
  createdAt: string;
  updatedAt?: string;

  // Studio images
  image?: string;
  images?: string[];
  gallery?: string[];

  // Studio details
  rating?: number;
  overview?: string;
  amenities?: string[];
  maxCapacity?: number;
};

export type Booking = {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioImage: string;
  studioLocation: string;
  hourlyRate: number;
  securityDeposit: number;
  date: string;
  startTime: string;
  endTime: string;
  hours: number;
  totalPrice: number;
  userEmail: string;
  userName: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
};
