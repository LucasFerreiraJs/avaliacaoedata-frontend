
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
            <FormInput  vidProp="password" type="password" v-model="form.password" placeholder="Senha" rules="required|minChar:8|maxChar:30|passwordConfirmation:@confirm">
            </FormInput>
          </div>


          <div class="form-field-confirmPassword">
            <FormLabel>Confirmar senha</FormLabel>
            <FormInput vidProp="confirm" type="password" name="confirm" v-model="confirmPassword" rules="required" placeholder="Confirmar senha"></FormInput>
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
            <CustomButtomAction actionType="delete" @click="closeCardFn">
              Cancelar
            </CustomButtomAction>

            <!-- <CustomButtomAction @click="sendNewUserFn"> -->
            <CustomButtomAction actionType="submit">
              Adicionar
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
  name: "AddUserCard",
  components: {
    CustomButtomAction,
    FormLabel,
    FormInput,
    FormInputSelect,
    ValidationObserver,
    ValidationProvider
  },
  props: {
    user: {
      type: Object,
      default: () => ({})
    },
    closeCardFn: {
      type: Function,
      default: () => { }

    }
  },

  data() {
    return {
      options: [{ name: "Inativo", id: "0" }, { name: "Ativo", id: "1" }, { name: "Excluído", id: "9" }],

      form: {
        name: "",
        email: "",
        cpf: "",
        userLogin: "",
        password: "",
        role: "",
        rhCode: "",
        region: "",
        status: "",
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
          this.sendNewUserFn()
        }

      }).catch(err => {
        console.log("err", err);

      })
      // this.$refs.form.setErrors({email: ["teste email mensagem"]})
    },
    formatDate(date) {
      return this.$dayjs(date).format('DD/MM/YYYY');
    },
    sendNewUserFn() {


      this.$store.dispatch("user/sendNewUser", this.form)
        .then(res => {
          this.$emit("after-add", res.data.successUser)
        }).catch((err) => {
          console.log("err to send user", err);
        });
    }
  }

}
</script>

<style lang="scss">
@import "~/assets/scss/config";
@import "~/assets/scss/variables";


.add-form {
  width: 100%;
  /* background: orange !important; */
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  background: $white;

  margin-top: 20px;
  border-radius: 4px;
  /* border-style: dashed; */
  border-style: solid;
  border-width: 1px;
  border-color: $red-100;
  padding: 1.25rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
  gap: 20px 0;

  @media screen and (min-width: $sm) {

    .form-field-name {
      width: 40%;
      padding-right: 10px;
    }

    .form-field-email {
      width: 40%;
      padding: 0 10px;
    }

    .form-field-cpf {
      width: 20%;
      padding-left: 10px;

    }

    .form-field-userLogin {
      width: 30%;

    }

    .form-field-password {
      width: 30%;

    }

    .form-field-confirmPassword {
      width: 30%;

    }

    .form-field-selectrole {}

    .form-field-rhcode {}

    .form-field-selectRegion {}

    .form-field-selectStatus {}

  }

  &>span {
    width: 100%;

    form {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;

      @media screen and (min-width: $sm) {
        flex-direction: row;
        justify-content: space-between;
        gap: 20px 0;
      }

      div {
        display: flex;
        flex-direction: column;
      }

      div.form-actions-container {
        margin-top: 20px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-self: flex-end;
      }

    }
  }

}
</style>






