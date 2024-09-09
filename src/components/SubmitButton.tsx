import { useFormStatus } from "react-dom"
import { Button, ButtonProps } from "./ui/button/button"
import { forwardRef } from "react"

export const SubmitButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function SubmitButton(props, ref) {
    const { pending } = useFormStatus()

    return (
      <Button type="submit" aria-disabled={pending} ref={ref} {...props}>
        {pending ? "Loading..." : "Submit"}
      </Button>
    )
  },
)
