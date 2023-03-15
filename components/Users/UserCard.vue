
<template>
  <div class="usercard">

    <div class="usercard-info">

      <div class="user-info-container">
        <div class="identity-info">
          <p class="user-name">
            {{ user.name }}
          </p>

          <p class="user-login">
            {{ user.userLogin }}
          </p>

          <p class="user-email">
            {{ user.email }}
          </p>


        </div>

        <div class="employee-info">
          <!-- {{ user.status }} -->


          <p class="user-rolename">
            {{ user.role.name }}
          </p>

          -
          <p class="user-regionname">
            {{ user.region.name }}
          </p>

          <p class="user-doc">
            CPF: {{ user.cpf }}
          </p>

        </div>

        <div class="access-info">

          <div :class="`user-status user-status-${String(user.status)}`">
            <!-- <p> {{ user.status }} </p> -->
            <div :class="`status-dot status-dot-${String(user.status)}`"></div>
            <p :class="`status-text status-text-${String(user.status)}`"> {{ status[String(user.status)] }} </p>
          </div>

          <div class="date-container">

            <p class="date-info">
              Data Ação:
            </p>


            <p class="user-dateAction">
              {{ formatDate(user.dateAction) }}
            </p>

          </div>

          <div class="date-container">

            <p class="date-info">
              Ultimo acesso:
            </p>

            <p class="user-lastAccess">
              {{ formatDate(user.lastAccess) }}
            </p>

          </div>
        </div>

      </div>
    </div>

    <div class="usercard-actions-container" v-if="!isUpdating">
      <CustomButtomAction actionType="delete" @click="onDelete">Excluir</CustomButtomAction>
      <CustomButtomAction @click="toggleShowEditCard">Editar</CustomButtomAction>
    </div>


    <div v-if="isUpdating">
      <EditUserCard :userToEdit="user" :closeEditCard="toggleShowEditCard" />
      <!-- @userUpdateAction="onUserUpdate" -->
    </div>

  </div>
</template>


<script>


import CustomButtomAction from "~/components/UI/CustomButtomAction";
import EditUserCard from "~/components/Users/EditUserCard";

export default {
  name: "UserCard",
  components: {
    CustomButtomAction,
    EditUserCard
  },
  props: {
    user: {
      type: Object,
      default: () => ({})
    },
    toggleShowDeleteConfirm: {
      type: Function,
      default: () => { },
    }
  },

  data() {
    return {
      status: {
        "0": "Inativo",
        "1": "Ativo",
        "9": "Excluído"
      },
      isUpdating: false,
    }
  },
  methods: {

    formatDate(date) {
      return this.$dayjs(date).format('DD/MM/YYYY');
    },

    onDelete(user) {
      this.$emit("deleteAction", this.user);
    },

    toggleShowEditCard() {
      this.isUpdating = !this.isUpdating;
    },

  }

}
</script>

<style lang="scss">
@import "~/assets/scss/config";
@import "~/assets/scss/variables";

.usercard {
  background: $white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  padding: 25px 30px 20px;
  gap: 25px;

  @media screen and (max-width: $sm) {
    padding: 25px 10px 15px;

  }

  .usercard-actions-container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
  }

  .usercard-info {
    width: 100%;
    display: flex;
    /* height: 120px; */

    /* margin-bottom: 30px; */

    .user-info-container {
      display: flex;
      width: 100%;
      background: $white;
      justify-content: space-between;

      align-items: center;

      @media screen and (max-width: $sm) {

        flex-wrap: wrap;
      }

      .identity-info,
      .employee-info,
      .access-info {
        display: flex;
        flex-direction: column;
        width:30%;

        @media screen and (max-width: 517px){
          width: 40%;
        }

      }

      .employee-info {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 0 10px;

        @media screen and (max-width: $sm) {
          justify-content: flex-end;
          width: 50%;
        }

        @media screen and (max-width: 517px){
          width: 50%;
        }
      }

      .access-info {
        align-items: flex-end;

        @media screen and (max-width: $sm) {
          width: 100%;
          flex-direction: row-reverse;
          justify-content: space-between;
          padding-top: 10px;

          .date-container {
            flex-direction: column;
          }
        }
        .date-container {
          display: flex;
          gap: 5px;
          justify-self: end;

          @media screen and (max-width: 700px) {
            flex-direction: column;
            align-items: self-end;
          }

          @media screen and (max-width: $sm) {
               flex-direction: column;
            align-items: center;

          }

          .date-info {
            color: $grey-400;
            font-size: 0.8em;
          }
        }

        .user-status {
          width: fit-content;
          padding: 4px 14px;
          border-radius: 50px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          @media screen and (max-width: $sm) {
            margin-bottom: 0;
          }
        }

        .user-status-0 {
          background: $red-100;
        }

        .user-status-1 {
          background: $green-100;
        }

        .user-status-9 {
          background: $grey-100;
        }
      }



      .date-info,
      .user-name,
      .user-login,
      .user-email,
      .user-doc,
      .user-rolename,
      .user-regionname,
      .user-status,
      .user-dateAction,
      .user-lastAccess {
        font-family: $font-default;
      }

      .user-name {
        font-weight: $fw-bold;
        font-size: 1em;
        color: $secondary-grey-800;
      }

      .user-email {
        font-size: 0.8em;
      }

      .user-login {
        color: $grey-400;
        font-size: 0.8em;
      }

      .user-doc {
        display: flex;
        width: 100%;
        font-size: .8rem;
        justify-content: center;

        @media screen and (max-width: $sm) {
          justify-content: end;
        }
      }

      .status-text {
        font-size: 0.8em;
        font-weight: $fw-sbold;
      }

      .user-dateAction,
      .user-lastAccess {
        color: $grey-400;
        font-size: 0.8em;
        font-weight: $fw-sbold;
      }

      .status-text-0 {
        color: $red-600;
      }

      .status-text-1 {
        color: $green-600;
      }

      .status-text-9 {
        color: $grey-600;
      }

      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 10px;
      }

      .status-dot-0 {
        background: #A33032;
      }

      .status-dot-1 {
        background: #30A345;
      }

      .status-dot-9 {
        background: #A4A4A4;
      }



      /* font-size: 1.5rem;
    font-weight: $fw-bold;
    color: $secondary-grey-800; */


    }
  }
}
</style>




