export interface User {
  userId: number;
  name: string;
  lastName: string;
  motherLastName: string;
  email: string;
  role: Role;
}

export enum Role {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
  PENDING = 'PENDING',
  VIEWER = 'VIEWER',
}

export interface RegisterRequest extends Omit<User, 'userId' | 'role'> {
  password: string;
  confirmPassword: string;
}
