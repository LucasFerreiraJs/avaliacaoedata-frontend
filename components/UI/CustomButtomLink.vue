

<template>
  <NuxtLink class="link-button" :to="linkTo" @click="$emit('click', $event) ">
    <slot />
  </NuxtLink>


</template>

<script>
export default {
  name: "CustomButtomLink",
  props: {
    linkTo: {
      type: String,
      default: undefined
    },
  },
}

</script>



<style lang="scss">
@import "~/assets/scss/config";
@import "~/assets/scss/variables";



.link-button{
  font-family: $font-default;
  color: $secondary-grey-800;
  text-decoration: none;

  padding: 12px 12px;
  border-radius: 4px;

  &:hover {
    background: $primary-red-500;
    color: $white;
  }
}
</style>

