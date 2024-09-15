# Writing components

## Where to create your components

- For components that are tightly coupled to a specific page:
  - `/components/interfaces/xxx`
- For components that are meant to be reusable across multiple pages:
  - `/components/ui/xxx`

## Component structure

- If a component has sub-components or any other related files that are tightly coupled to it, enclose them in a folder with an `index.tsx` as an entry point

- Otherwise it can just be a file on its own

For example:

```
  components/ui
    - sample-component-a
      - SampleComponentA.tsx
      - SampleComponentA.utils.ts
      - SampleComponentA.types.ts
      - index.ts
    - SampleComponentB.tsx
```

_based on the approach used by [Supabase](https://github.com/supabase/supabase)._
