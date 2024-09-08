import { useMutation } from '@tanstack/react-query';

import { userSignIn } from '../../services/users/sign-in';

export const useUserSignIn = () =>
  useMutation({
    mutationKey: ['user-sign-in'],
    mutationFn: userSignIn,
  });
