export interface UserInterface {
  body: {
    username: string;
    email: string;
    password: string;
  };
}

export interface LoginUserInterface {
  body: {
    userId: string;
    password: string;
  };
}
