import { describe, it } from "@jest/globals"
import { testApiClient } from "../../global-test-state"

describe("Test users endpoints", () => {

  it("Should successfuly create, fetch and delete users", async () => {
    const newUser = {
      name: "John Smith",
      email: "john.smith@gmail.com",
      phone: "(123)4567890",
    }
    let getStaffRes = await testApiClient.get(
      `/users/get?email=${newUser.email}`
    )
    expect(getStaffRes.status).toEqual(200)
    expect(getStaffRes.data.length).toEqual(0)

    const createStaffRes = await testApiClient.post(
      `/users/create`,
      newUser
    )
    expect(createStaffRes.status).toEqual(200)
    getStaffRes = await testApiClient.get(
      `/users/get?email=${newUser.email}`
    )
    expect(getStaffRes.status).toEqual(200)
    expect(getStaffRes.data.length).toEqual(1)
    expect(getStaffRes.data[0].email).toEqual(newUser.email)
    const deleteRes = await testApiClient.delete(`/users/delete?email=${newUser.email}`)
    expect(deleteRes.status).toEqual(200)
  })
})
