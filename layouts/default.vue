
<template>
  <div class="page-container">
    <header class="header-container">

      <div class="header-content">

        <button class="mobile-menu-icon" @click="openMenu">
          <img class="mobile-menu-icon-image" :src="require(`~/assets/images/mobile-menu-icon.png`)" alt="menu-icon" />
        </button>

        <div class="menu-items-container">
          <CustomButtomLink linkTo="/users">Usuários</CustomButtomLink>
          <CustomButtomLink linkTo="/roles">Grupos de Acesso</CustomButtomLink>
          <CustomButtomLink linkTo="/regions">Regiões</CustomButtomLink>
        </div>

        <div class="full-screen-menu-bg" @click="toggleShowMenuMobile" v-show="showMenuMobile">
          <div class="mobile-menu-items-container">

            <CustomButtomAction @click="close" actionType="menu-exit" linkTo="/users">X</CustomButtomAction>
            <CustomButtomLink @click="close" linkTo="/users">Usuários</CustomButtomLink>
            <CustomButtomLink @click="close" linkTo="/roles">Grupos de Acesso</CustomButtomLink>
            <CustomButtomLink @click="close" linkTo="/regions">Regiões</CustomButtomLink>
          </div>
        </div>

        <div class="logo-container">
          <img class="logo-image" :src="require(`~/assets/images/edata-logo.png`)" alt="edata-logo" />
        </div>

      </div>
    </header>


    <div class="body-container">

      <div class="body-content">

        <Nuxt />

      </div>
    </div>

  </div>
</template>


<script>

import CustomButtomLink from "~/components/UI/CustomButtomLink";
import CustomButtomAction from "~/components/UI/CustomButtomAction";

export default {
  name: "default",
  components: {
    CustomButtomLink,
    CustomButtomAction
  },
  data() {
    return {
      showMenuMobile: false,
    }
  },
  methods: {
    toggleShowMenuMobile(evt) {

      if (evt.target == evt.currentTarget) {
        this.close();
      }
    },
    openMenu() {
      this.showMenuMobile = true;
    },
    close() {
      this.showMenuMobile = false;
    }
  },
  computed: {

  }

}

</script>

<style lang="scss">
@import "~/assets/scss/config";
@import "~/assets/scss/variables";


.body-container {
  background: $grey-200;
  height: 140vh;
  padding-bottom: 300px;


  .body-content {
    background: $grey-200;
    max-width: 1090px;
    margin: 0 auto;
    padding: 0 15px;
  }
}

.header-container {
  background: white;
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 16px 0px rgb(0 0 0 / 7%);

  @media screen and (max-width: $md) {}

  .header-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    max-width: 1200px;
    margin: 0 auto;
    padding: 0 30px;

    .mobile-menu-icon {
      display: none;
      background: transparent;
      border: 0;

      @media screen and (max-width: $md) {
        display: flex;
      }

      .mobile-menu-icon-image {
        object-fit: contain;
        width: 40px;
        height: 40px;
      }
    }




    .full-screen-menu-bg {

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
      display: none;

      @media screen and (max-width: $md) {
        display: flex;
      }


      .mobile-menu-items-container {
        position: fixed;
        background: $white;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        margin-bottom: 30px;
        padding: 25px 30px 20px;
        gap: 25px;
        width: 60%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }


    .menu-items-container {
      gap: 20px;
      display: flex;

      @media screen and (max-width: $md) {
        flex-direction: column;
        display: none;
      }
    }

    .logo-container {
      .logo-image {
        height: 53px;
      }
    }
  }
}
</style>