export interface LoginUserData {
    mail: string;
    password: string;
}
export interface LoginResponse {
    jwttoken: string;
    role: any; 
}
export interface DecodedToken {
  email?: string;
  nameid?: string;
  exp?: number;
  [key: string]: any; 
}
