export type UserFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  isVerified: boolean;
  userRole: string;
  [Key: string]: string | boolean;
};
