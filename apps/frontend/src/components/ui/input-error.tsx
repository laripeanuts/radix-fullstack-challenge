interface InputErrorProps {
  error: string | null;
}

export const InputError = ({ error }: InputErrorProps) => {
  return (
    <span className="text-xs font-semibold text-destructive">{error}</span>
  );
};
