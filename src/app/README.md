# App Router

The idea is the keep the `app/` folder as lean as possible by only having routing related files inside (e.g. `pages.tsx`, `layout.tsx`, etc..) see [nextjs docs](https://nextjs.org/docs/app/building-your-application/routing#file-conventions)

## Rough guidelines

- To reduce the Client JavaScript bundle size, try braking down pages and layouts into smaller components, isolating interactive logic into Client Components.
- Components that are tightly coupled to a page can be placed within the folder `components/interfaces/xxx/...` (Refer to the README.md under the components folder)

## Example

```tsx
// app/page.tsx

// Import the main building blocks of the page
import { ... } from 'components/interfaces/xxx'

// Import reusable UI components if needed
import { ... } from 'components/ui/xxx'

// Name your page accordingly
export default function Page() {

  return (
    <main>
      <h1>Page title</h1>
      <div>
        <p>some text</p>
        <ClientComponent />
      </div>
    </main>
  )
}
```
