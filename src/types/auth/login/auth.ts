export interface LoginUserData {
  mail: string;
  password: string;
}

export interface LoginResponse {
  jwttoken: string;
}

export interface DecodedToken {

  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
  
  [key: string]: any;
}
