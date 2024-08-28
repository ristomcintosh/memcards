import "@testing-library/jest-dom"
import { TextDecoder, TextEncoder } from "util"

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
})

// Work around to fix "ReferenceError: ResizeObserver is not defined"
// https://github.com/tailwindlabs/headlessui/discussions/2832
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
