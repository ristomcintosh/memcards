import { ButtonHTMLAttributes } from "react"

type ButtonProps = {
  size?: "md" | "lg" | "sm"
  variant?: keyof typeof variants
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
  variant = "default",
  size = "md",
  children,
  ...delegated
}: ButtonProps) => {
  const classes = `${baseStyles} ${sizes[size]} ${variants[variant]}`
  return (
    <button
      className={classes}
      style={{ minWidth: 44, minHeight: 44 }}
      {...delegated}
    >
      {children}
    </button>
  )
}

const baseStyles =
  "px-4 py-1 rounded whitespace-nowrap shadow no-underline md:h-auto"

const variants = {
  default: "bg-brand-600 text-white",
  outline: "border-2 border-brand-600 text-brand-800 ",
  text: "font-semibold shadow-none",
  warn: "bg-danger-500 text-white",
}

const sizes = {
  sm: "text-base h-12",
  md: "text-2xl md:text-xl h-12",
  lg: "text-3xl h-14",
}
