<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <SignupForm/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import SignupForm from '@/components/SignupForm.vue'; // @ is an alias to /src

@Options({
  components: {
    SignupForm,
  },
})
export default class Home extends Vue {}
</script>
