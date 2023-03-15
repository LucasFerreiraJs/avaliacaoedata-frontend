<template>
  <div class="filter-container">
    <div class="form-field-name">
      <FormLabel> Nome usuário </FormLabel>
      <FormInput type="text" v-model="filter.name" placeholder="Nome"></FormInput>
    </div>


    <div class="form-field-selectrole">
      <FormLabel>Grupo de acesso</FormLabel>
      <FormInputSelect :options="roleOptions" placeholderSelect="Selecione um grupo" v-model="filter.roleId">
      </FormInputSelect>
    </div>

    <div class="form-field-selectRegion">
      <FormLabel>Região</FormLabel>
      <FormInputSelect :options="regionOptions" placeholderSelect="Selecione uma região" v-model="filter.regionId">
      </FormInputSelect>
    </div>


    <div class="form-field-selectStatus">
      <FormLabel>Status</FormLabel>
      <FormInputSelect :options="statusOptions" placeholderSelect="Selecione um status" alt="status"
        v-model="filter.status">
      </FormInputSelect>
    </div>
  </div>
</template>


<script>

import { debounce } from 'lodash';
import FormLabel from "~/components/UI/FormLabel";
import FormInput from "~/components/UI/FormInput";
import FormInputSelect from "~/components/UI/FormInputSelect";


export default {
  name: "UserFilter",

  components: {
    FormLabel,
    FormInput,
    FormInputSelect
  },

  data() {
    return {
      statusOptions: [{ name: "Inativo", id: "0" }, { name: "Ativo", id: "1" }, { name: "Excluído", id: "9" }],
      filter: {
        name: "",
        roleId: "",
        regionId: "",
        status: ""
      },
      regionOptions: [],
      roleOptions: [],
    }
  },

  async fetch() {
    this.regionOptions = await this.$store.dispatch("region/getRegions");
    this.roleOptions = await this.$store.dispatch("role/getRoles");
  },

  watch: {
    filter: {
      deep: true,
      handler() {
        this.onFilterDebounce();
      }
    }
  },

  methods: {
    onFilterDebounce: debounce(function () {
      this.onFilter()
    }, 300),

    onFilter() {
      this.$emit("filter", {
        filterName: this.filter.name || "",
        roleId: this.filter.roleId || "",
        regionId: this.filter.regionId || null,
        status: this.filter.status || null
      })
    }

  }
}
</script>


<style lang="scss">
.filter-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  /* background: red; */
  padding-top: 30px;
  margin: 0 auto;
  width: 100%;
  align-items: center;
  justify-content: center;

  .form-field-name,
  .form-field-selectrole,
  .form-field-selectRegion,
  .form-field-selectStatus {
    display: flex;
    flex-direction: column;
  }

  .form-field-name {}

  .form-field-selectrole {}

  .form-field-selectRegion {}

  .form-field-selectStatus {}
}
</style>