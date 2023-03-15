

<template>
  <button :type="actionType" :class="`custom-item custom-item-${actionType}`" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script>
export default {
  name: "CustomButtomAction",
  props: {
    actionType: {
      type: String,
      default: undefined
    },
    actionFunction: {
      type: Function,
      default: () => { }
    }
  },
}

</script>



<style lang="scss">
@import "~/assets/scss/config";
@import "~/assets/scss/variables";



.custom-item {
  font-family: $font-default;
  color: $white;
  text-decoration: none;
  background: $primary-red-500;
  border: 0;
  padding: 12px 20px;
  border-radius: 4px;

  &:hover {
    color: $white;
  }
}



.custom-item-delete {
  background: transparent;
  color: $primary-red-500;

  &:hover {
    color: $primary-red-500;
  }
}


.custom-item-menu-exit {
  background: transparent;
  color: $primary-red-500;
  width: fit-content;

  &:hover {
    color: $primary-red-500;
  }
}
</style>

