<template>
  <div id="adminhome">
    <customerLine />
  </div>
</template>

<script>
export default {
  name: 'adminHome',
  components: {

    customerLine: () => import('@/components/adminLine')
  }
}
</script>

<style scoped>

</style>
