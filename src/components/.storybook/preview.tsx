import React from "react"
import type { Preview } from "@storybook/react"
import { withThemeByClassName } from "@storybook/addon-themes"
import { inter } from "../../styles/fonts"

import "../../styles/globals.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <main className={`${inter.variable} ${inter.className}`}>
        <Story />
      </main>
    ),
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
}

export default preview
