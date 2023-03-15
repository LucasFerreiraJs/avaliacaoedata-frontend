<template>
  <label class="form-label">
    <slot />
  </label>
</template>

<script>
export default {
  name: "FormLabel",

  data() {
    return {}
  }
}

</script>


<style lang="scss" scoped>
@import "~/assets/scss/config";
@import "~/assets/scss/variables";

.form-label {
  font-size: .9rem;
  font-family: $font-default;
  font-weight: $fw-medium;
  color: $secondary-grey-800;

}
</style>





