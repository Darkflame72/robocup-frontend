import { HelperState } from "./state"

export default {
  setHeadingTitle(state: HelperState, payload: string) {
    state.headingTitle = payload
  },
}
