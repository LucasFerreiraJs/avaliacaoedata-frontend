<template>
  <ValidationProvider :vid="vidProp" :rules="rules" v-slot="{ errors }" class="validationprovider">
    <input class="form-input" :type="type" :placeholder="placeholder" :value="value" :name="name" :moede="modeProp"
      :maxlength="type == 'number' && '11'" :v-validate="validateProps" v-on="inputListeners" />
    <span class="span-error">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>

import { ValidationProvider } from "vee-validate";

export default {
  name: "FormInput",
  components: {
    ValidationProvider
  },
  props: {
    value: {
      type: [String, Number],
      default: undefined,
    },
    placeholder: {
      tpe: String,
      default: undefined,
    },
    type: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
      default: 'text',
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

    }
  },

  watch: {
    value(value) {
      this.localValue = value;
    },
  },

  computed: {
    inputListeners() {
      const thisCtx = this;
      return {
        ...this.$listeners,
        input(event) {
          thisCtx.$emit('input', event.target.value);
        },
      };
    },
  },

}

</script>


<style lang="scss" scoped>
@import "~/assets/scss/config";
@import "~/assets/scss/variables";



.validationprovider {
  display: flex;
  flex-direction: column;

  .span-error {
    margin-top: 5px;
    font-family: $font-default;
    font-weight: $fw-light;
    /* color: $secondary-grey-800; */
    color: $red-600;
    font-size: 12px;
  }

  .form-input {
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
    }

    &:focus {
      outline: 1px solid #4e4e4e !important;
    }

    &:-webkit-autofill {
      /* -webkit-text-fill-color: yellow !important; */
      -webkit-background-origin: transparent;
    }

    &::placeholder {
      color: #a9a9a9;
    }

    &[type="number"] {
      -moz-appearance: textfield;


      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
}
</style>

