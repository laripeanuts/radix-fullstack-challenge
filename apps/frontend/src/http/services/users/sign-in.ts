import { api } from '../../infra/api';

export interface UserSignInBodyRequest {
  email: string;
  password: string;
}

export const userSignIn = (body: UserSignInBodyRequest) => {
  return api.post('/users/session', body);
};
