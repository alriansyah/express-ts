/* eslint-disable @typescript-eslint/no-namespace */
export interface UserType {
  user_id: String;
  name: String;
  email: String;
  password: String;
  role: String;
}

export interface UserLoginType {
  email?: string;
  password?: string;
}

export interface RequestLocals {
  locals: {
    user?: any; // Adjust the type of 'user' as per your application's requirements
  };
}
