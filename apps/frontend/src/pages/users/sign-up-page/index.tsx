import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputError } from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import { useUserSignUp } from '@/http/queries/users';
import { UserNotLoggedInContainer } from '@/layouts/user-not-logged-layout/user-not-logged-container';

import { toast } from '@/hooks/use-toast';
import { decodeToken } from '@/lib/utils/decode-jwt';
import { signUpFormSchema, SignUpFormSchema } from './sign-up-form-schema';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { mutate: userSignUpMutation, isPending } = useUserSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit = (data: SignUpFormSchema) => {
    userSignUpMutation(data, {
      onSuccess: (data) => {
        const token = data['token'];
        const userPayload = decodeToken(token);

        if (userPayload) {
          toast({
            title: 'Success!',
            description: 'You are now logged in',
            variant: 'success',
          });

          navigate({ to: '/dashboard' });
        }
      },
      onError: (error) => {
        let description = 'An error occurred';

        if (error.message.includes('401')) {
          description = 'Invalid email or password';
        }

        toast({
          title: 'Error!',
          description,
          variant: 'destructive',
        });
      },
    });
  };

  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;
  const isLoading = isSubmitting || isPending;

  return (
    <UserNotLoggedInContainer
      title="Sing In"
      subtitle="Enter your email below to login to your account"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="flex items-end justify-between">
          <Label htmlFor="email">Email</Label>
          {emailError && <InputError error={emailError} />}
        </div>
        <Input
          id="email"
          type="email"
          placeholder="me@example.com"
          error={emailError}
          {...register('email')}
        />
        <div className="grid gap-2">
          <div className="flex items-end justify-between">
            <Label htmlFor="password">Password</Label>
            {passwordError && <InputError error={passwordError} />}
          </div>
          <Input
            id="password"
            type="password"
            error={passwordError}
            {...register('password')}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            'Sign In'
          )}
        </Button>
        <div className="text-sm text-center">
          Don&apos;t have an account?{' '}
          <Link to="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </form>
    </UserNotLoggedInContainer>
  );
};
