/**
 * @jest-environment node
 */
import { createAccount, login } from "../auth"
import { createUser } from "@/service/dbService"

jest.mock("@/service/dbService")

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
    username      | password      | expected
    ${""}         | ${""}         | ${"Incorrect password or Username"}
    ${"ab"}       | ${"password"} | ${"Incorrect password or Username"}
    ${"username"} | ${"    "}     | ${"Incorrect password or Username"}
  `(
    `Validation - returns $expected when username is $username and password is $password`,
    async ({ username, password, expected }) => {
      const payload = new FormData()
      payload.set("password", password)
      payload.set("username", username)

      const result = await login({ message: "" }, payload)
      expect(result).toEqual({
        message: expected,
      })
    }
  )
})
