<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>{{appName}}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form @keyup.enter="submit">
                <v-text-field @keyup.enter="submit" v-model="email" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                <v-text-field @keyup.enter="submit" v-model="password" prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
              </v-form>
              <div v-if="getLoginError">
                <v-alert :value="getLoginError" transition="fade-transition" type="error">
                  Incorrect email or password
                </v-alert>
              </div>
              <v-flex class="caption text-xs-right"><router-link to="/recover-password">Forgot your password?</router-link></v-flex>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click.prevent="submit">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { appName } from '@/env';
import { mapGetters, mapActions } from 'vuex'

@Options({
  computed: mapGetters([
    'loginError'
  ]),
  methods: mapActions([
    'actionLogIn'
  ])
})
export default class Login extends Vue {
  // type getters
  actionLogIn!: (payload: { username: string; password: string }) => Promise<void>
  loginError!: boolean | null

  public email = '';
  public password = '';
  public appName = appName;

  public get getLoginError(): any {
    return this.loginError;
  }

  public submit(): any {
    this.actionLogIn({username: this.email, password: this.password});
  }
}
</script>
