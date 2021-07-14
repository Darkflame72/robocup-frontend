import { MainState } from "./state"

export default {
  hasAdminAccess: (state: MainState) => {
    return (
      state.userProfile &&
      state.userProfile.is_superuser &&
      state.userProfile.is_active
    )
  },
  loginError: (state: MainState) => state.logInError,
  userProfile: (state: MainState) => state.userProfile,
  token: (state: MainState) => state.token,
  isLoggedIn: (state: MainState) => state.isLoggedIn,
  firstNotification: (state: MainState) =>
    state.notifications.length > 0 && state.notifications[0],
}
