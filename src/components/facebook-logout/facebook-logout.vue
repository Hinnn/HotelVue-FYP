<template>
  <div>
    <button class="fb-logout-btn" @click="onlogout()">Logout</button>
  </div>
  <!--<div class="fb-login-button" data-size="medium" data-button-type="logout_with"-->
       <!--data-auto-logout-link="true" data-use-continue-as="false" @click="onlogout()"-->
       <!--src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2&appId=942016982662401&autoLogAppEvents=1"></div>-->
  <!--<div id="fb-root">-->
</template>

<script>
import props from './props'
import methods from './methods'
import mounted from './mounted'

export default {
  name: 'FacebookLogout',
  props,
  methods,
  mounted
}
</script>

<style>
button::-moz-focus-inner {
  border: 0;
}

.fb-logout-btn {
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

.fb-logout-btn:hover {
  background: #8b9dc3;
  color: #ffffff;
}

.fb-logout-btn:active {
  background: #dfe3ee;
  color: #3b5998;
}
</style>
