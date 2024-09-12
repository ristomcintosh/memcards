import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-base font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300",
  {
    variants: {
      variant: {
        default:
          "bg-brand-500 text-zinc-900 hover:bg-brand-500/80 dark:bg-brand-400 dark:text-zinc-900 dark:hover:bg-brand-400/80",
        secondary: "hover:bg-zinc-200 dark:hover:bg-zinc-800",
        destructive:
          "bg-destructive-700 text-zinc-50 dark:text-zinc-900 hover:bg-destructive-700/90 dark:bg-destructive-400 dark:hover:bg-destructive-400/80",
        destructiveSecondary:
          "text-destructive-700 hover:bg-zinc-200 dark:text-destructive-300 dark:hover:bg-zinc-800 dark:hover:text-destructive-400",
        outline: `border-2 border-brand-500 hover:bg-brand-500/30 text-brand-800 hover:text-brand-900
          dark:border-brand-400 dark:hover:bg-brand-400/30 dark:text-brand-400 dark:hover:text-inherit dark:hover:border-brand-400/80`,
        ghost:
          "text-inherit hover:text-brand-700 hover:bg-zinc-200 dark:text-inherit dark:hover:text-brand-500 dark:hover:bg-zinc-800",
        link: "text-brand-700  underline-offset-4 hover:underline dark:text-brand-400",
      },
      size: {
        default: "h-10 rounded px-4 py-2",
        sm: "h-9 rounded px-3 text-sm",
        lg: "h-11 rounded px-8 text-xl",
        icon: "h-10 w-10 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)
