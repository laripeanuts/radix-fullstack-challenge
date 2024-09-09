import { api } from '../../infra/api';

export interface UserSignInBodyRequest {
  email: string;
  password: string;
}

export const userSignIn = async (body: UserSignInBodyRequest) => {
  const response = await api.post('/users/session', body);

  return response.data;
};
