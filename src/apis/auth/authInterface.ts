interface IToken {
  token: string;
}

export interface ISigninRequest {
  data: {
    email: string;
    password: string;
  };
}

export interface ISigninResponse {
  email: string | null;
  fname: string | null;
  lname: string | null;
  meta: IToken;
}

export interface ISigninErrorResponse {
  success: boolean;
  error: string;
}

export interface ISignupRequest {
  user: {
    fname: string;
    lname: string;
    email: string;
    password: string;
  };
}

export interface ISignupResponse {
  response: {
    data: {
      success: boolean;
      message: string;
    };
  };
}

export interface ISignupErrorResponseData {
  fname: string | null;
  lname: string | null;
  email: string | null;
  password: string | null;
}

export interface ISignupErrorResponse {
  error: [ISignupErrorResponseData] | string;
  success: boolean;
}
