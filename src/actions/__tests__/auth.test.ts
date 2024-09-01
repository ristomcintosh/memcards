/**
 * @jest-environment node
 */

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { createAccount, login } from "../auth"
import { createUser, getUserByUsernameOrEmail } from "@/service/dbService"

const mockedBcryptCompare = jest.fn()
jest.mock("@/service/dbService")
jest.mock("bcrypt", () => ({
  ...jest.requireActual("bcrypt"),
  compare: () => mockedBcryptCompare(),
}))

describe(createAccount.name, () => {
  it.each`
    username      | password       | email                | expected
    ${""}         | ${""}          | ${""}                | ${"Failed to save because of 3 invalid field(s)."}
    ${"username"} | ${"    "}      | ${"email@email.com"} | ${"Failed to save because of 1 invalid field(s)."}
    ${"username"} | ${"password1"} | ${""}                | ${"Failed to save because of 1 invalid field(s)."}
  `(
    "Validation - returns $expected when username is $username and password is $password",
    async ({ username, password, email, expected }) => {
      const result = await createAccount({ username, password, email })

      expect(result).toEqual(
        expect.objectContaining({
          message: expected,
        })
      )
    }
  )

  it("should not save plain text password", async () => {
    await createAccount({
      email: "email",
      username: "username",
      password: "password",
    })

    expect(createUser).not.toHaveBeenCalledWith("username", "password")
  })

  it("returns list of invalid fields", async () => {
    const result = await createAccount({
      email: "",
      username: "",
      password: "",
    })

    expect(result).toEqual({
      message: "Failed to save because of 3 invalid field(s).",
      errors: {
        email: ["Please enter a valid email."],
        username: ["Username must be at least 2 characters long."],
        password: [
          "Must be at least 8 characters long",
          "Should contain at least one letter.",
          "Should contain at least one number.",
        ],
      },
    })
  })

  it.each(["email", "username"])(
    `returns %s already exists message`,
    async (field) => {
      jest.mocked(createUser).mockRejectedValue(
        new PrismaClientKnownRequestError(
          `Unique constraint failed on the fields: (${field})`,
          {
            code: "P2002",
            meta: { modelName: "User", target: [field] },
            clientVersion: "5.19.0",
          }
        )
      )

      const result = await createAccount({
        email: "email@gmail.com",
        username: "username",
        password: "password1",
      })

      expect(result).toEqual({
        message: `User with this ${field} already exists.`,
        errors: { [field]: ["Already taken"] },
      })
    }
  )
})

describe(login.name, () => {
  it.each`
    username      | password  | expected
    ${""}         | ${""}     | ${"Failed because of 2 invalid field(s)."}
    ${"username"} | ${"    "} | ${"Failed because of 1 invalid field(s)."}
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
      message: "Failed because of 2 invalid field(s).",
      formErrors: {
        username: ["Username is required"],
        password: ["Password is required"],
      },
    })
  })

  it("returns Incorrect password or Username when user does not exist", async () => {
    jest.mocked(getUserByUsernameOrEmail).mockResolvedValue(null)

    const result = await login({ username: "username", password: "password" })

    expect(result).toEqual({
      message: "Incorrect password or Username",
    })
  })

  it("returns Incorrect password or Username when password is incorrect", async () => {
    jest.mocked(getUserByUsernameOrEmail).mockResolvedValue({
      id: "1",
      username: "username",
      password: "password",
      email: "email",
    })
    mockedBcryptCompare.mockResolvedValue(false)

    const result = await login({ username: "username", password: "incorrect" })

    expect(result).toEqual({
      message: "Incorrect password or Username",
    })
  })
})
