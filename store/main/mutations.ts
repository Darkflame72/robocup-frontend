import { IUserProfile } from "@/interfaces"
import { AppNotification, MainState } from "./state"

export default {
  setToken(state: MainState, payload: string) {
    state.token = payload
  },
  setLoggedIn(state: MainState, payload: boolean) {
    state.isLoggedIn = payload
  },
  setLogInError(state: MainState, payload: boolean) {
    state.logInError = payload
  },
  setUserProfile(state: MainState, payload: IUserProfile) {
    state.userProfile = payload
  },
  addNotification(state: MainState, payload: AppNotification) {
    state.notifications.push(payload)
  },
  removeNotification(state: MainState, payload: AppNotification) {
    state.notifications = state.notifications.filter(
      (notification) => notification !== payload
    )
  },
}
