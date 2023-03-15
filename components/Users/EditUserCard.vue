<template>
  <div class="adduser-card">
    <div class="add-form">

      <ValidationObserver ref="form">
        <form @submit.prevent="onSubmit">

          <div class="form-field-name">
            <FormLabel> Nome usuário </FormLabel>
            <FormInput vidProp="name" name="name" type="text" modeProp="passive" v-model="form.name" validateProps=""
              rules="required|minChar:5|maxChar:30" placeholder="Nome"></FormInput>
          </div>
          <!--  -->

          <div class="form-field-email">
            <FormLabel> Email </FormLabel>
            <FormInput vidProp="email" name="email" type="text" modeProp="passive" v-model="form.email"
              rules="required|email|maxChar:30" placeholder="Email">
            </FormInput>
          </div>

          <div class="form-field-cpf">
            <FormLabel>Cpf </FormLabel>
            <FormInput vidProp="cpf" name="cpf" type="text" modeProp="passive" v-model="form.cpf"
              rules="required|cpfRegex" placeholder="CPF"></FormInput>
          </div>


          <div class="form-field-userLogin">
            <FormLabel>Login</FormLabel>
            <FormInput vidProp="userLogin" type="text" modeProp="passive" v-model="form.userLogin"
              rules="required|minChar:5|maxChar:30" placeholder="Login"></FormInput>
          </div>

          <div class="form-field-password">
            <FormLabel>Senha</FormLabel>
            <FormInput vidProp="password" type="password" v-model="form.password" placeholder="Senha"
              rules="required|minChar:8|maxChar:30|passwordConfirmation:@confirm">
            </FormInput>
          </div>


          <div class="form-field-confirmPassword">
            <FormLabel>Confirmar senha</FormLabel>
            <FormInput vidProp="confirm" type="password" name="confirm" v-model="confirmPassword" rules="required"
              placeholder="Confirmar senha"></FormInput>
          </div>

          <div class="form-field-selectrole">
            <FormLabel>Grupo de acesso</FormLabel>
            <FormInputSelect vidProp="roleOptions" :options="roleOptions" modeProp="passive"
              placeholderSelect="Selecione um grupo" rules="required" v-model="form.role">
            </FormInputSelect>
          </div>

          <div class="form-field-rhcode">
            <FormLabel>Código Rh</FormLabel>
            <FormInput type="number" vidProp="roleOptions" modeProp="passive" v-model="form.rhCode"
              placeholderSelect="Código RH" rules="required|selectRhcodeRegionStatus"></FormInput>
          </div>

          <div class="form-field-selectRegion">
            <FormLabel>Região</FormLabel>
            <FormInputSelect :options="regionOptions" placeholderSelect="Selecione uma região" v-model="form.region">
            </FormInputSelect>
          </div>

          <div class="form-field-selectStatus">
            <FormLabel>Status</FormLabel>
            <FormInputSelect :options="options" placeholderSelect="Selecione um status" alt="status"
              v-model="form.status">
            </FormInputSelect>
          </div>

          <div class="form-actions-container">
            <CustomButtomAction actionType="delete" @click="closeEditCard">
              Cancelar
            </CustomButtomAction>

            <CustomButtomAction actionType="submit">
              Salvar
            </CustomButtomAction>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>


<script>

import FormLabel from "~/components/UI/FormLabel";
import FormInput from "~/components/UI/FormInput";
import FormInputSelect from "~/components/UI/FormInputSelect";
import CustomButtomAction from "~/components/UI/CustomButtomAction";
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {

  name: "EditUserCard",

  components: {
    CustomButtomAction,
    FormLabel,
    FormInput,
    FormInputSelect,
    ValidationObserver,
    ValidationProvider
  },

  props: {
    userToEdit: {
      type: Object,
      default: undefined
    },
    closeEditCard: {
      type: Function,
      default: undefined
    }
  },

  data() {
    return {
      options: [{ name: "Inativo", id: "0" }, { name: "Ativo", id: "1" }, { name: "Excluído", id: "9" }],
      form: {
        id: this.userToEdit.id,
        name: this.userToEdit.name,
        email: this.userToEdit.email,
        cpf: this.userToEdit.cpf,
        userLogin: this.userToEdit.userLogin,
        password: this.userToEdit.password,
        role: this.userToEdit.role,
        rhCode: this.userToEdit.rhCode,
        region: this.userToEdit.region,
        status: this.userToEdit.status,
      },
      confirmPassword: "",
      regionOptions: [],
      roleOptions: [],
    }
  },

  async fetch() {
    this.regionOptions = await this.$store.dispatch("region/getRegions");
    this.roleOptions = await this.$store.dispatch("role/getRoles");



  },


  methods: {
    onSubmit() {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.saveEditUser()
        }

      }).catch(err => {
        console.log("err", err);

      })
      // this.$refs.form.setErrors({email: ["teste email mensagem"]})
    },

    saveEditUser() {

      let objectToSend = { ...this.form };
      let userToUpdateOnScreen = { ...this.form };

      let regionSelected = this.regionOptions.find(item => item.id == this.form.region);
      let roleSelected = this.roleOptions.find(item => item.id == this.form.role);

      userToUpdateOnScreen.region = regionSelected
      userToUpdateOnScreen.role = roleSelected

      this.$parent.$emit('userUpdateAction', userToUpdateOnScreen, objectToSend);
      this.closeEditCard();
    }
  }

}

</script>


<style lang="scss">
@import "~/assets/scss/config";
@import "~/assets/scss/variables";


</style>