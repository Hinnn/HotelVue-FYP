<template>
  <div class="fb-login-button" data-size="medium" data-button-type="login_with"
       crossorigin="anonymous"
       data-auto-logout-link="true" data-use-continue-as="false" @click="checkLoginState()"
       src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2&appId=942016982662401&autoLogAppEvents=1"></div>
  <!--<div id="fb-root">-->
    <!--&lt;!&ndash;<v-btn outline color="indigo" flat @click="checkLoginState()">FaceBook</v-btn>&ndash;&gt;-->
    <!--<button class="fb-login-btn" @click="checkLoginState()">Login</button>-->
  <!--</div>-->
</template>

<script>
import props from '@/components/facebook-login/props'
import methods from '@/components/facebook-login/methods'
import mounted from '@/components/facebook-login/mounted'
// import FacebookLogin from '@/components/facebook-login/facebook-login'

export default {
  name: 'FacebookLogin',
  props,
  methods,
  mounted
  // components: {
  //   FacebookLogin
  // }
}
</script>

<style>
  button::-moz-focus-inner {
    border: 0;
  }

  /*.fb-login-btn {*/
    /*font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;*/
    /*font-weight: 700;*/
    /*color: #dfe3ee;*/
    /*background: #3b5998;*/
    /*border: none;*/
    /*border-radius: 10px;*/
    /*padding: 10px;*/
    /*min-width: 75px;*/
    /*outline: none;*/
  /*}*/

  /*.fb-login-btn:hover {*/
    /*background: #8b9dc3;*/
    /*color: #ffffff;*/
  /*}*/

  /*.fb-login-btn:active {*/
    /*background: #dfe3ee;*/
    /*color: #3b5998;*/
  /*}*/
</style>
