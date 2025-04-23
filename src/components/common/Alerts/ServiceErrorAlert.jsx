import ErrorAlert from './ErrorAlert';

export default function ServiceErrorAlert({ variant = 'outlined' }) {
  return (
    <ErrorAlert
      title="Oops! Something went wrong"
      description="Please try again after some time."
      variant={variant}
    />
  );
}
