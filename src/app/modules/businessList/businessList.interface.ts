
export type TBusinessList = {
  businessName: string;
  businessType: string;
  description: string;
  phoneNumber: string;
  email?: string;
  website?: string;
  location: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
};
