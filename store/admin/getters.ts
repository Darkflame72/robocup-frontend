import { AdminState } from "./state"


export default {
  adminUsers: (state: AdminState) => state.users,
  adminOneUser: (state: AdminState) => (userId: string) => {
    const filteredUsers = state.users.filter((user) => user.uuid === userId)
    if (filteredUsers.length > 0) {
      return { ...filteredUsers[0] }
    }
  },
}
