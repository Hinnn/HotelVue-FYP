<template>
  <div id="adminhome">
    <adminLine />
  </div>
</template>

<script>
export default {
  name: 'adminHome',
  components: {

    adminLine: () => import('@/components/adminLine')
  }
}
</script>

<style scoped>

</style>
