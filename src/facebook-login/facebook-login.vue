<template>
  <!--<div id="fb-root"></div>-->
  <!--<script async defer crossorigin="anonymous" -->
          <!--src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2&appId=942016982662401&autoLogAppEvents=1"></script>-->
  <div>
    <button class="fb-login-btn" @click="onlogin()">FacebookLogin</button>
  </div>
  <!--<div class="fb-login-button" data-size="large" data-button-type="continue_with" data-auto-logout-link="false" -->
       <!--data-use-continue-as="false"></div>-->
</template>

<script>
import props from './props'
import methods from './methods'
import mounted from './mounted'
export default {
  name: 'FacebookLogin',
  props,
  methods,
  mounted
}
</script>

<style>
  button::-moz-focus-inner {
    border: 0;
  }
  .fb-login-btn {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-weight: 700;
    color: #dfe3ee;
    background: #3b5998;
    border: none;
    border-radius: 10px;
    padding: 10px;
    min-width: 75px;
    outline: none;
  }
  .fb-login-btn:hover {
    background: #8b9dc3;
    color: #ffffff;
  }
  .fb-login-btn:active {
    background: #dfe3ee;
    color: #3b5998;
  }
</style>
