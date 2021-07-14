import Vue from "vue"
import { ValidationObserver, ValidationProvider, extend } from "vee-validate"
import { required, confirmed, email, integer } from "vee-validate/dist/rules"

extend("required", {
  ...required,
  message: "This field is required.",
})

extend("confirmed", {
  ...confirmed,
  message: "Please make sure the passwords match.",
})

extend("email", {
  ...email,
  message: "Please use a valid email address.",
})

extend("integer", {
  ...integer,
  message: "Please use valid phone number",
})

// Register it globally
Vue.component("ValidationProvider", ValidationProvider)
Vue.component("ValidationObserver", ValidationObserver)
