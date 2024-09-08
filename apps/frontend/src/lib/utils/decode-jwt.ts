import { jwtDecode } from 'jwt-decode';

export interface UserAuthenticationPayload {
  name: string;
  email: string;
  sub: string;
}

export const decodeToken = (token: string) => {
  try {
    const decoded = jwtDecode<UserAuthenticationPayload>(token);
    return decoded;
  } catch (error) {
    console.error('Erro ao decodificar o token JWT', error);
    return null;
  }
};
