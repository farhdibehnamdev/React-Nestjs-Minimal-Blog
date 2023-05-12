import User from '../entities/user.entity';
export type user = {
  id: number;
  email: string;
  role: string;
};
export type usersDataAndCount = {
  data: User[];
  count: number;
};

export type verifyTokenType = {
  isAuthenticated: boolean;
  userInfo: user;
};
