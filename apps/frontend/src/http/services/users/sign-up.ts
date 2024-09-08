import { api } from '../../infra/api';

export interface UserSignUpBodyRequest {
  name: string;
  email: string;
  password: string;
}

export const userSignUp = (body: UserSignUpBodyRequest) => {
  return api.post(`/users/session`, body);
};
