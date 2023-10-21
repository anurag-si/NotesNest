export interface IUserSignup {
  body: {
    username: string;
    email: string;
    password: string;
  };
}

export interface IUserLogin {
  body: {
    userId: string;
    password: string;
  };
}

export interface IResponse {
  message: string;
}
