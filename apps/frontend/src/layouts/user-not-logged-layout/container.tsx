import { ReactNode } from 'react';

interface UserNotLoggedInContainerProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export const UserNotLoggedInContainer = ({
  title,
  subtitle,
  children,
}: UserNotLoggedInContainerProps) => {
  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-balance text-muted-foreground">{subtitle}</p>
      </div>
      {children}
    </div>
  );
};
