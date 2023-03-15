<template>
  <ValidationProvider :vid="vidProp" :rules="rules" v-slot="{ errors }">
    <select class="form-input-select" name="" @change="onChange">

      <option value="">{{ placeholderSelect }}</option>

      <option class="option-item" v-for="option in options" :key="option.id" :value="option.id"
        :selected="value === option.name" :alt="alt">
        <!-- :value="`${alt == 'status' ?   option.id :  option.name}` -->
        {{ option.name }}
      </option>

    </select>
  </ValidationProvider>
</template>
<script>

import { ValidationProvider } from "vee-validate";
export default {
  name: "FormInputSelect",
  components: {
    ValidationProvider
  },
  props: {
    value: {
      type: [String, Number, Object, Boolean],
      default: undefined
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholderSelect: {
      type: String,
      default: undefined
    },
    alt: {
      type: String,
      default: undefined

    },
    rules: {
      type: String,
      default: '',
    },
    vidProp: {
      type: String,
      default: ''
    },
    modeProp: {
      type: String,
      default: ''
    },
    validateProps: {
      type: String,
      default: ''

    }

  },
  data() {
    return {
      localValue: this.value,
    };
  },

  watch: {
    value(value) {
      this.localValue = value;
    },
  },

  methods: {
    onChange($evt) {
      this.$emit('input', $evt.target.value);
    }
  },
}

</script>


<style lang="scss" scoped>
@import "~/assets/scss/config";
@import "~/assets/scss/variables";



.form-input-select {
  margin-top: 10px;
  font-size: .9rem;
  font-family: $font-default;
  font-weight: $fw-medium;
  color: $secondary-grey-800;
  border-radius: 4px;
  border: 1px solid $grey-100;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
  padding: 0.5rem 1rem;

  @media screen and (max-width: $sm) {
    margin-top: 5px;
    width:100%;
  }

  &:focus {
    outline: 1px solid #4e4e4e !important;

  }

  &:-webkit-autofill {
    /* -webkit-text-fill-color: yellow !important; */
    -webkit-background-origin: transparent;
  }

}
</style>

