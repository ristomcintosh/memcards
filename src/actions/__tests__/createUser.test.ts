import { createUser } from "../createUser"

describe(createUser.name, () => {
  it.each`
    username      | password      | expected
    ${"a"}        | ${"a"}        | ${"Invalid input"}
    ${"a"}        | ${"password"} | ${"Invalid input"}
    ${"username"} | ${"a"}        | ${"Invalid input"}
    ${"username"} | ${"password"} | ${"User created"}
  `(
    "returns $expected when username is $username and password is $password",
    ({ username, password, expected }) => {
      const payload = new FormData()
      payload.set("username", username)
      payload.set("password", password)
      expect(createUser({ message: "" }, payload)).toEqual({
        message: expected,
      })
    }
  )
})
