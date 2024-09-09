import { api } from '../../infra/api';

export interface UserSignUpBodyRequest {
  name: string;
  email: string;
  password: string;
}

export const userSignUp = async (body: UserSignUpBodyRequest) => {
  const response = await api.post(`/users`, body);

  return response.data;
};
