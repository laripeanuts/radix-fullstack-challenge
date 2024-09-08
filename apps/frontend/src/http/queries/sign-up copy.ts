import { DefinedInitialDataOptions, useQuery } from '@tanstack/react-query';

import { userSignUp, UserSignUpBodyRequest } from '../services/users/sign-up';

export const useUserSignUp = ({
  body,
  options,
}: {
  body: UserSignUpBodyRequest;
  options?: DefinedInitialDataOptions;
}) =>
  useQuery({
    ...options,
    queryKey: ['users', 'sign-up'],
    queryFn: () => userSignUp(body),
  });
