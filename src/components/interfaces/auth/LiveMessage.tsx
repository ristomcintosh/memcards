import { CircleAlert } from "lucide-react";

type LiveMessageProps = {
  message?: string;
};

export function LiveMessage({ message }: LiveMessageProps) {
  return (
    message && (
      <div
        role="alert"
        className="mb-4 dark:bg-zinc-500 bg-amber-200 p-2 rounded flex gap-x-2 items-center"
        data-testid="login-message"
      >
        <CircleAlert aria-hidden />
        <p>{message}</p>
      </div>
    )
  );
}
