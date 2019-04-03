<template>
  <div id="customerhome">
    <customerLine />
  </div>
</template>

<script>
export default {
  name: 'customerHome',
  components: {

    customerLine: () => import('@/components/customerLine')
  }
}
</script>

<style scoped>

</style>
