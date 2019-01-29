<meta name="viewpoint" content="width=device-width, initial-scale=1"/>
<template>
  <div class="hero">
    <h1 class="vue-title">Hello ! Customer !</h1>
    <table align="center">
      <tr>
        <td>
          <p class="lead"><b><i>Yve hotel feels like home</i></b>
          <p class="lead">Enjoy your trip enjoy our hotel</p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>
<style>
  .hero {
    height: 100vh;
    margin-top: 30px;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .hero .lead {
    font-weight: 200;
    font-size: 2.5rem;
  }
  #app1 {
    width: 60%;
    margin: 0 auto;
  }
  .vue-title {
    font-size: 70pt;
    margin-bottom: 10px;
  }
</style>
