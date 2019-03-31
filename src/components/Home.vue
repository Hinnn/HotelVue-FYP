<template>
  <div id="home">
    <articles>
      <banner />
    </articles>

    <about />

    <subscribe />

    <social />
  </div>
</template>

<script>
export default {
  name: 'Home',

  components: {
    // About: () => import('@/components/home/About'),
    // Articles: () => import('@/components/home/Articles'),
    Banner: () => import('@/components/Banner'),

    Subscribe: () => import('@/components/Subscribe')
  }
}
</script>
