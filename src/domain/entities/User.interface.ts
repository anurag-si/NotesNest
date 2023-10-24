export interface IUserSignup {
  body: {
    username: string;
    email: string;
    password: string;
    createdAt?: string;
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

export const userSignUp = (props: IUserSignup) => ({
  username: props.body.username,
  email: props.body.email,
  password: props.body.password,
  createdAt: props.body.createdAt,
});
