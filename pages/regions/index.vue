<template>
  <div>
    <div class="page-heading-container">
      <h3 class="page-heading-title"> Lista de regiões </h3>

      <!-- <CustomButtomAction linkTo="/">Criar nova Região</CustomButtomAction> -->
    </div>

    <div class="list-container">

      <div v-for="region in regionList">

        <CustomCardInfo :key="region.id" :itemName="region.name" :itemId="region.id" />
      </div>
    </div>
  </div>
</template>

<script>

import CustomCardInfo from "~/components/UI/CustomCardInfo"

export default {
  name: 'regionPage',
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
      regionList: await context.store.dispatch('region/getRegions')
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

.list-container {
  margin-top: 50px;
}
</style>



