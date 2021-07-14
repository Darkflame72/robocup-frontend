import { IUserProfile } from "@/interfaces"
import { AdminState } from "./state"

export default {
  setUsers(state: AdminState, payload: IUserProfile[]) {
    state.users = payload
  },
  setUser(state: AdminState, payload: IUserProfile) {
    const users = state.users.filter(
      (user: IUserProfile) => user.uuid !== payload.uuid
    )
    users.push(payload)
    state.users = users
  },
}
