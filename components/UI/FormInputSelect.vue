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
    <span v-show="isNOTFilterField && showCustomError && checkError" class="custom-error">Campo obrigatório</span>
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
    },
    isNOTFilterField: {
      type: Boolean,
      default: false
    },
    checkError: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localValue: this.value,
      showCustomError: true,
    };
  },

  watch: {
    value(value) {

      if (value != "") {
        this.showCustomError = false;
      }

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

.custom-error {
  margin-top: 5px;
  font-family: $font-default;
  font-weight: $fw-light;
  /* color: $secondary-grey-800; */
  color: $red-600;
  font-size: 12px;
}


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
  display: flex;
  flex-direction: column;



  @media screen and (max-width: $sm) {
    margin-top: 5px;
    width: 100%;
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

