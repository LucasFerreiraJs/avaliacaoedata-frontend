<template>
  <div class="userpage-container">

    <div class="fullscreen-delete" v-if="showDeleteUserConfirm" @click="onCancelDeleteUserClickBg">

      <div class="delete-card-container">
        <p class="delete-message">
          Tem certeza que deseja <br> <b> excluir </b> esse usuário?
        </p>

        <div class="delete-card-actions">
          <CustomButtomAction actionType="delete" @click="onCancelDeleteUser">
            Cancelar
          </CustomButtomAction>
          <CustomButtomAction @click="onDeleteUser">Excluir</CustomButtomAction>
        </div>
      </div>
    </div>


    <div class="page-heading-container">
      <h3 class="page-heading-title"> Lista de usuários </h3>

      <CustomButtomAction @click="toggleShowAddUserForm">Novo Usuário</CustomButtomAction>
    </div>


    <div class="user-filter-container">
      <UserFilter @filter="onFilter" />
    </div>


    <div class="adduser-card-container" v-if="showAddUserForm">

      <AddUserCard :closeCardFn="toggleShowAddUserForm" @after-add="afterAddUser"></AddUserCard>
    </div>

    <div class="user-card-container" :key="keyValue">
      <div v-for="user in usersGruped" :key="user.id" class="user-card-item">
        <UserCard :key="user.id" :user="user" @deleteAction="setUserToDelete" @userUpdateAction="onUserUpdate" />
      </div>
    </div>

    <!--
    <pre>
                  {{ usersList }}
                </pre> -->
  </div>
</template>



<script>

import CustomButtomAction from "~/components/UI/CustomButtomAction";
import UserCard from "~/components/Users/UserCard";
import AddUserCard from "~/components/Users/AddUserCard";
import UserFilter from "~/components/Users/UserFilter"



export default {
  name: 'usersPage',

  components: {
    UserFilter,
    UserCard,
    CustomButtomAction,
    AddUserCard,
  },



  async asyncData(context) {
    return {
      usersList: await context.store.dispatch('user/getUsers')
        .then(async res => {
          return res.data.users;
        })
        .catch(err => {

          context.redirect(`/error`);
          return [];
        })
    }
  },
  data() {
    return {
      options: [{ name: "Inativo", id: "0" }, { name: "Ativo", id: "1" }, { name: "Excluído", id: "9" }],
      usersList: [],
      userToDelete: {},
      keyValue: 1,
      showAddUserForm: false,
      showDeleteUserConfirm: false,
      formSearch: {
        name: "",
      },
      regionOptions: [],
      roleOptions: [],
    }
  },

  async fetch() {
    this.regionOptions = await this.$store.dispatch("region/getRegions");
    this.roleOptions = await this.$store.dispatch("role/getRoles");

  },


  methods: {

    onCancelDeleteUser() {
      this.showDeleteUserConfirm = false;
      this.userToDelete = {}
    },
    onCancelDeleteUserClickBg(evt) {
      try {
        if (evt.target == evt.currentTarget) {
          this.showDeleteUserConfirm = false;
          this.userToDelete = {};
        }
      } catch (err) {
        console.log("err: click bg")
      }
    },
    onDeleteUser() {

      this.$store.dispatch('user/deleteUser', this.userToDelete.id)
        .then(res => {
          let index = this.usersList.findIndex(user => user.id == this.userToDelete.id);
          this.usersList.splice(index, 1);

          this.showDeleteUserConfirm = false
        }).catch(err => {
          console.log("deletar usuário", err);
        });
    },

    setUserToDelete(user) {
      this.showDeleteUserConfirm = true;


      this.userToDelete = user;
    },


    onUserUpdate(userToUpdateOnScreen, objectToSend) {

      let newUserList = this.usersList
      const index = newUserList.findIndex(item => item.id == userToUpdateOnScreen.id);

      if (index > -1) {
        newUserList[index] = userToUpdateOnScreen
        this.usersList = [...newUserList];
        this.$store.dispatch("user/editUser", { id: objectToSend.id, data: objectToSend });
      }
    },


    toggleShowDeleteConfirmCard(evt) {

      try {
        if (evt.target == evt.currentTarget) {
          this.showDeleteUserConfirm = !this.showDeleteUserConfirm;
        }
      } catch (err) { console.log(err) }
    },

    toggleShowAddUserForm() {

      this.showAddUserForm = !this.showAddUserForm;
    },
    afterAddUser(newUser) {


      try {

        this.usersList.unshift(newUser);

      } catch (err) {
        console.log("err userlist", err);
      }
      this.showAddUserForm = !this.showAddUserForm;
      this.keyValue = this.keyValue + 1;
    },

    onFilter(filter) {
      this.$store.dispatch("user/getUsers", filter)
        .then(res => {
          this.usersList = [...res.data.users]
        })
    }

  },

  computed: {
    //filtro
    usersGruped() {
      console.log("this.usersList", this.usersList)
      return this.usersList;
    },
  },

  watch: {
    usersList: (value) => {
      console.log("watch  userlist", value)
    }
  }
}
</script>


<style lang="scss">
@import "~/assets/scss/config";
@import "~/assets/scss/variables";

.userpage-container{

  padding-bottom: 300px;

}

.filter-container {
  .span-error {
    display: none;
  }

}

.fullscreen-delete {

  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  margin-right: 0;
  left: 0;
  margin-left: 0;
  z-index: 10;

  .delete-card-container {

    position: relative;
    top: 50%;
    right: 0;
    margin-right: auto;
    left: 0;
    margin-left: auto;

    width: 500px;



    background: $white;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;

    justify-content: center;
    margin-bottom: 30px;
    padding: 25px 30px 20px;
    gap: 25px;

    .delete-message {
      text-align: center;
      font-size: 1rem;
      font-family: $font-default;
      font-weight: $fw-medium;
      color: $secondary-grey-800;
    }

    .delete-card-actions {}
  }
}


.page-heading-container {
  display: flex;
  justify-content: space-between;

  padding-top: 50px;
  align-items: center;

  .page-heading-title {
    font-size: 1.5rem;
    font-family: $font-default;
    font-weight: $fw-bold;
    color: $secondary-grey-800;
  }

}



.user-card-container {
  margin-top: 50px;

  .user-card-item {
    border-radius: 60px;
  }
}
</style>



