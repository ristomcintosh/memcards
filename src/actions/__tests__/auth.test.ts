/**
 * @jest-environment node
 */

import { createAccount, login } from "../auth"
import { createUser, getUserByUsername } from "@/service/dbService"

const mockedBcryptCompare = jest.fn()
jest.mock("@/service/dbService")
jest.mock("bcrypt", () => ({
  ...jest.requireActual("bcrypt"),
  compare: () => mockedBcryptCompare(),
}))

describe(createAccount.name, () => {
  it.each`
    username      | password      | expected
    ${"a"}        | ${"a"}        | ${"Invalid input"}
    ${"a"}        | ${"password"} | ${"Invalid input"}
    ${"username"} | ${"a"}        | ${"Invalid input"}
  `(
    "Validation - returns $expected when username is $username and password is $password",
    async ({ username, password, expected }) => {
      const payload = new FormData()
      payload.set("username", username)
      payload.set("password", password)

      const result = await createAccount({ message: "" }, payload)
      expect(result).toEqual({
        message: expected,
      })
    }
  )

  it("should not save plain text password", async () => {
    const payload = new FormData()
    payload.set("username", "username")
    payload.set("password", "password")

    await createAccount({ message: "" }, payload)
    expect(createUser).not.toHaveBeenCalledWith("username", "password")
  })
})

describe(login.name, () => {
  it.each`
    username      | password  | expected
    ${""}         | ${""}     | ${"Failed to save because of 2 invalid field(s)."}
    ${"username"} | ${"    "} | ${"Failed to save because of 1 invalid field(s)."}
  `(
    `Validation - returns $expected when username is $username and password is $password`,
    async ({ username, password, expected }) => {
      const result = await login({ username, password })

      expect(result).toEqual(
        expect.objectContaining({
          message: expected,
        })
      )
    }
  )

  it("returns list of invalid inputs", async () => {
    const result = await login({ username: "", password: "" })

    expect(result).toEqual({
      message: "Failed to save because of 2 invalid field(s).",
      formErrors: {
        username: ["Username is required"],
        password: ["Password is required"],
      },
    })
  })

  it("returns Incorrect password or Username when user does not exist", async () => {
    jest.mocked(getUserByUsername).mockResolvedValue(null)

    const result = await login({ username: "username", password: "password" })

    expect(result).toEqual({
      message: "Incorrect password or Username",
    })
  })

  it("returns Incorrect password or Username when password is incorrect", async () => {
    jest.mocked(getUserByUsername).mockResolvedValue({
      id: "1",
      username: "username",
      password: "password",
    })
    mockedBcryptCompare.mockResolvedValue(false)

    const result = await login({ username: "username", password: "incorrect" })

    expect(result).toEqual({
      message: "Incorrect password or Username",
    })
  })
})
