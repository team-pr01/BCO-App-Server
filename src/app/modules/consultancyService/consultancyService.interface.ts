
export type TConsultancyService = {
  imageUrl?: string;
  name: string;
  email?:string;
  phoneNumber:string;
  specialty: string;
  experience: string;
  category: string;
  availableTime: string;
  availabilityType: string[];
  fees: string;
  rating: string;
  createdAt?: Date;
  updatedAt?: Date;
};