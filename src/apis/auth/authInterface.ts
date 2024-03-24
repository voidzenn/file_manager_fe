interface IToken {
  token: string;
}

interface IErrorResponse {
  response: {
    data: {
      error: string | Array<unknown> | null;
      success: boolean;
    };
  };
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

export interface ISigninErrorResponse extends IErrorResponse{}

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
