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

export interface UserInfo {
  _id: String;
  user_id: String;
  name: String;
  email: String;
  role: String;
  iat: Number | any;
  exp: Number | any;
}
