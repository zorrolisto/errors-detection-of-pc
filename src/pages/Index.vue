<template>
  <div>
    <div class="loading" v-if="isLoadingViews">
      <div class="label">
        Aplicando cambios
      </div>
      <q-spinner-dots
        class="spinner"
        color="primary"
        size="8rem"
        :thickness="5"
      />
    </div>
    <div class="c-index" :style="isLoadingViews ? 'filter: blur(3px);' : ''">
      <header-bar
        :is-login="isLogin"
        :is-change-base-conocimientos="isChangeBaseConocimientos"
        @create-new-sistema-experto="openModalForCreateSistemaExperto"
        @change-base-conocimientos="changeBaseConocimientos"
        @logout="logout"
        @open-modal-to-edit-base-conocimientos="openModalEditBaseConocimientos"
      />
      <div class="c-index__content">
        <left-bar
          class="left-bar"
          :is-change-base-conocimientos="isChangeBaseConocimientos"
        />
        <SurveyContainer
          :is-change-base-conocimientos="isChangeBaseConocimientos"
        />
        <rigth-bar :is-change-base-conocimientos="isChangeBaseConocimientos" />
        <left-bar
          class="left-bar-down"
          :is-change-base-conocimientos="isChangeBaseConocimientos"
        />
      </div>
      <auth-dialog
        :is-open-auth-dialog="isOpenAuthDialog"
        @auth-probed="authProbed"
      />
      <edit-base-conocimientos-dialog
        :is-open="isShowEditBaseConocimientosDialog"
        :is-for-create="isForCreate"
        @already-edit="updateViews"
        @close-modal="closeModalEditBase"
      />
    </div>
    <notifications classes="notify-message" group="foo" />
  </div>
</template>

<script>
import Vue from "vue";
import HeaderBar from "../components/HeaderBar/HeaderBar.vue";
import LeftBar from "../components/LeftBar/LeftBar.vue";
import RigthBar from "../components/RigthBar/RigthBar.vue";
import SurveyContainer from "../components/SurveyContainer/SurveyContainer.vue";
import AuthDialog from "../components/AuthDialog/AuthDialog.vue";
import EditBaseConocimientosDialog from "../components/EditBaseConocimientosDialog/EditBaseConocimientosDialog.vue";

import { sistemaExperto } from "../prolog/baseConocimientos";

export default {
  name: "PageIndex",
  components: {
    HeaderBar,
    LeftBar,
    RigthBar,
    SurveyContainer,
    AuthDialog,
    EditBaseConocimientosDialog
  },
  data() {
    return {
      isForCreate: false,
      isOpenAuthDialog: false,
      isLoadingViews: false,
      isShowAuthDialog: false,
      isShowEditBaseConocimientosDialog: false,
      isChangeBaseConocimientos: false,
      isLogin: false
    };
  },
  mounted() {
    let sistemasExpertosFromLocalStorage = JSON.parse(
      localStorage.getItem("sistemasExpertosByUser")
    );
    if (
      sistemasExpertosFromLocalStorage === undefined ||
      sistemasExpertosFromLocalStorage === null
    ) {
      localStorage.setItem("sistemasExpertosByUser", JSON.stringify([]));
    }
    let authSystem = JSON.parse(localStorage.getItem("authSystem"));
    if (authSystem && authSystem.allAccounts) {
      const isAlreadyLogged = authSystem.allAccounts.some(
        user => user.session === "active"
      );
      if (isAlreadyLogged) {
        this.authProbed();
      } else {
        this.isOpenAuthDialog = true;
      }
    } else {
      this.isOpenAuthDialog = true;
    }
  },
  methods: {
    openModalForCreateSistemaExperto() {
      this.isForCreate = true;
      this.isShowEditBaseConocimientosDialog = true;
    },
    updateViews(sistemaExpertoToSave) {
      this.updateSistemaExperto(sistemaExpertoToSave);
      this.isChangeBaseConocimientos = !this.isChangeBaseConocimientos;
      this.isShowEditBaseConocimientosDialog = false;
      this.isLoadingViews = true;
      setTimeout(() => {
        this.isLoadingViews = false;
      }, 2000);
    },
    openModalEditBaseConocimientos() {
      this.isForCreate = false;
      this.isShowEditBaseConocimientosDialog = true;
    },
    changeBaseConocimientos(nameOfSelectBaseConocimiento) {
      const sistemasExpertosOfUser = this.getAllSistemasExpertosOfUser();
      const sistemaExpertoSelected = sistemasExpertosOfUser.sistemasExpertos.find(
        sistemaExperto =>
          sistemaExperto.titleHeader === nameOfSelectBaseConocimiento
      );
      this.updateViews(sistemaExpertoSelected);
    },
    updateSistemaExperto(sistemaExpertoSelected) {
      sistemaExperto.titleHeader = sistemaExpertoSelected.titleHeader;
      sistemaExperto.subtitleHeader = sistemaExpertoSelected.subtitleHeader;
      sistemaExperto.baseConocimientos =
        sistemaExpertoSelected.baseConocimientos;
      sistemaExperto.iconPrincipal = sistemaExpertoSelected.iconPrincipal;
      sistemaExperto.iconConsecuencia = sistemaExpertoSelected.iconConsecuencia;
      sistemaExperto.iconCausa = sistemaExpertoSelected.iconCausa;
      sistemaExperto.colorPrincipal = sistemaExpertoSelected.colorPrincipal;
      sistemaExperto.nameOfConsecuencia =
        sistemaExpertoSelected.nameOfConsecuencia;
      sistemaExperto.nameOfCausa = sistemaExpertoSelected.nameOfCausa;
      sistemaExperto.rankingTitle = sistemaExpertoSelected.rankingTitle;
      sistemaExperto.initOfQuestion = sistemaExpertoSelected.initOfQuestion;

      document.documentElement.style.setProperty(
        "--color-primary",
        sistemaExperto.colorPrincipal
      );
    },
    getAllSistemasExpertosOfUser() {
      let sistemasExpertosFromLocalStorage = JSON.parse(
        localStorage.getItem("sistemasExpertosByUser")
      );
      const emailOfLoggedUser = this.getEmailOfActiveUser();
      return sistemasExpertosFromLocalStorage.find(
        sistemaExperto => sistemaExperto.emailId === emailOfLoggedUser
      );
    },
    getEmailOfActiveUser() {
      const authSystem = JSON.parse(localStorage.getItem("authSystem"));
      return authSystem.allAccounts.find(user => user.session === "active")
        .email;
    },
    logout() {
      let authSystem = JSON.parse(localStorage.getItem("authSystem"));
      authSystem.allAccounts.forEach(account => {
        account.session = "inactive";
      });
      localStorage.setItem("authSystem", JSON.stringify(authSystem));

      this.isOpenAuthDialog = true;
    },
    closeModalEditBase() {
      this.isShowEditBaseConocimientosDialog = false;
    },
    setFirstSistemaExpertoOfUserLogged() {
      const sistemasOfUserObject = this.getAllSistemasExpertosOfUser();
      this.updateViews(
        sistemasOfUserObject.sistemasExpertos[
          sistemasOfUserObject.sistemasExpertos.length - 1
        ]
      );
    },
    authProbed() {
      this.isOpenAuthDialog = false;
      // this.isLogin = !this.isLogin;
      this.setFirstSistemaExpertoOfUserLogged();
      Vue.notify({
        group: "foo",
        title: "Usuario logueado",
        duration: 1000
      });
    }
  }
};
/*
    {
      name: string,
      password: string,
      {
        problemsFound:{
            nameOfProblem: string,
            date: date,
        }[],
        fallasOfProblemsNotFound:{
          fallas: string[],
          date: date,
        }[]
      }
    }
    */
</script>
<style lang="scss">
@import "./Index.scss";
</style>
