<template>
  <div>
    <div class="page-heading-container">
      <h3 class="page-heading-title"> Grupo de acesso </h3>

      <!-- <CustomButtomAction linkTo="/">Criar novo grupo </CustomButtomAction> -->
    </div>

    <div class="list-container">

      <div v-for="role in roleList">

        <CustomCardInfo :key="role.id" :itemName="role.name" :itemId="role.id" />
      </div>
    </div>
  </div>
</template>

<script>

import CustomCardInfo from "~/components/UI/CustomCardInfo"

export default {
  name: 'rolePage',
  components: {
    CustomCardInfo
  },
  data() {
    return {
    };
  },
  methods: {},

  async asyncData(context) {

    return {
      roleList: await context.store.dispatch('role/getRoles')
        .then(res => {
          return res;
        }).catch(err => {
          context.redirect(`/error`);
          return []
        })

    }

  }

}
</script>
<style lang="scss">
@import '~assets/scss/variables';
</style>



