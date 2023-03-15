<template>
  <div class="cardinfo-container">
    <div class="cardinfo-content">
      <h4 class="cardinfo-name">{{ itemName }}</h4>
      <p class="cardinfo-id">id: {{ itemId }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "CustomCardInfo",

  props: {
    itemName: {
      type: String,
      default: ""
    },
    itemId: {
      type: String,
      default: ""
    }
  }
}

</script>


<style lang="scss">
@import "~/assets/scss/config";
@import "~/assets/scss/variables";


.cardinfo-container {
  background: $white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  padding: 25px 30px 20px;
  gap: 25px;


  .cardinfo-content {

    .cardinfo-name {
      font-family: $font-default;
      font-weight: $fw-bold;
      font-size: 1em;
      color: $secondary-grey-800;
    }

    .cardinfo-id {
      font-family: $font-default;
      color: $grey-400;
      font-size: 0.8em;
    }
  }
}
</style>