import { useMutation } from '@tanstack/react-query';

import { userSignUp } from '../../services/users/sign-up';

export const useUserSignUp = () =>
  useMutation({
    mutationKey: ['user-sign-up'],
    mutationFn: userSignUp,
  });
