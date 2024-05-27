import { Field, Label, Input } from "@headlessui/react"

export const TextInput = ({ label, name }: { label: string; name: string }) => {
  return (
    <Field>
      <Label className="block mb-2 text-base">{label}</Label>
      <Input
        type="text"
        name={name}
        className="w-full mb-5 text-xl py-1 rounded md:h-auto"
      />
    </Field>
  )
}
