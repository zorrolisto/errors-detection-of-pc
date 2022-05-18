<template>
  <div class="c-header-bar">
    <div class="c-header-bar__rigth-side">
      <div class="c-header-bar__rigth-side__title">Hola, ten un buen día</div>
      <div class="c-header-bar__rigth-side__subtitle">{{ nameOfUser }}</div>
    </div>
    <div class="c-header-bar__title-container">
      <div class="c-header-bar__title-container__title">
        Sistema Experto: {{ title }}
      </div>
      <div class="c-header-bar__title-container__subtitle">
        {{ subtitle }}
      </div>
    </div>
    <div class="c-header-bar__left-side">
      <div style="display:flex; gap: 0.5rem;">
        <q-icon
          name="add"
          size="25px"
          class="add-btn"
          @click="emitAddSistemaExperto"
        >
          <q-tooltip
            :content-style="{
              fontWeight: 'bold',
              fontSize: '12px',
              color: 'var(--color-primary)',
              background: 'white',
              boxShadow: '0 0 2px 1px #eee'
            }"
          >
            Añadir
          </q-tooltip>
        </q-icon>
        <q-btn
          v-for="(sistema, index) in sistemas"
          :key="index"
          :icon="sistema.icon"
          class="normal-btn"
          flat
          :style="`color: ${sistema.color}`"
          size="10px"
          @click="changeBaseConocimientos(sistema.name)"
        >
          <q-tooltip
            :content-style="{
              fontWeight: 'bold',
              fontSize: '12px',
              color: `${sistema.color}`,
              background: 'white',
              boxShadow: '0 0 2px 1px #eee'
            }"
          >
            S.E. {{ sistema.name }}
          </q-tooltip>
        </q-btn>
      </div>
      <q-separator vertical spaced="" />
      <div style="display:flex; gap: 0.5rem;">
        <q-icon
          name="settings"
          class="settings-btn"
          :style="`color: ${sistemaExpertoAux.colorPrincipal}`"
          size="25px"
          @click="editBaseConocimientos"
        >
          <q-tooltip
            :content-style="{
              fontWeight: 'bold',
              fontSize: '12px',
              color: 'var(--color-primary)',
              background: 'white',
              boxShadow: '0 0 2px 1px #eee'
            }"
          >
            Editar
          </q-tooltip>
        </q-icon>
        <q-icon :name="iconPrincipal" class="choosed-btn" size="25px" />
        <q-icon
          name="logout"
          class="settings-btn"
          :style="`color: ${sistemaExpertoAux.colorPrincipal}`"
          size="25px"
          @click="logout"
        >
          <q-tooltip
            :content-style="{
              fontWeight: 'bold',
              fontSize: '12px',
              color: 'var(--color-primary)',
              background: 'white',
              boxShadow: '0 0 2px 1px #eee'
            }"
          >
            Salir
          </q-tooltip>
        </q-icon>
      </div>
    </div>
    <notifications classes="notify-message" group="foo" />
  </div>
</template>

<script>
import Vue from "vue";
import {
  sistemaExperto,
  sistemaExpertoTest
} from "../../prolog/baseConocimientos";

export default {
  name: "HeaderBar",
  props: {
    isLogin: {
      type: Boolean,
      default: false
    },
    isChangeBaseConocimientos: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sistemas: [],
      nameOfUser: "User",
      haveChangeAuth: false,
      sistemaExpertoAux: sistemaExperto,
      iconPrincipal: "",
      title: "",
      subtitle: ""
    };
  },
  watch: {
    isChangeBaseConocimientos() {
      this.getUserName();
      this.updateView();
      this.assignSistemasExpertosForView();
    },
    isLogin() {
      this.getUserName();
      this.updateView();
      this.assignSistemasExpertosForView();
    }
  },
  mounted() {
    this.getUserName();
    this.updateView();
    this.getExpertSystemConfiguration();
  },
  methods: {
    emitAddSistemaExperto() {
      this.$emit("create-new-sistema-experto");
    },
    updateView() {
      this.getExpertSystemConfiguration();
    },
    assignSistemasExpertosForView() {
      this.sistemas = [];
      const sistemasExpertosOfUser = this.getAllSistemasExpertosOfUser();
      sistemasExpertosOfUser.sistemasExpertos.forEach(sistemaExperto => {
        if (sistemaExperto.titleHeader !== this.sistemaExpertoAux.titleHeader) {
          this.sistemas.push({
            name: sistemaExperto.titleHeader,
            icon: sistemaExperto.iconPrincipal,
            color: sistemaExperto.colorPrincipal
          });
        }
      });
    },
    getAllSistemasExpertosOfUser() {
      let sistemasExpertosFromLocalStorage = JSON.parse(
        localStorage.getItem("sistemasExpertosByUser")
      );
      const emailOfLoggedUser = this.getEmailOfActiveUser();
      return sistemasExpertosFromLocalStorage.find(
        sistemExpert => sistemExpert.emailId === emailOfLoggedUser
      );
    },
    getEmailOfActiveUser() {
      const authSystem = JSON.parse(localStorage.getItem("authSystem"));
      return authSystem.allAccounts.find(user => user.session === "active")
        .email;
    },
    getExpertSystemConfiguration() {
      this.sistemaExpertoAux = sistemaExperto;
      this.iconPrincipal = sistemaExperto.iconPrincipal;
      this.title = sistemaExperto.titleHeader;
      this.subtitle = sistemaExperto.subtitleHeader;
    },
    getUserName() {
      const authSystem = JSON.parse(localStorage.getItem("authSystem"));
      if (authSystem) {
        const logedUser = authSystem.allAccounts.find(
          user => user.session === "active"
        );
        if (logedUser) {
          this.nameOfUser = logedUser.name;
        }
      }
    },
    editBaseConocimientos() {
      this.$emit("open-modal-to-edit-base-conocimientos");
    },
    changeBaseConocimientos(nameOfBaseConocimiento) {
      if (nameOfBaseConocimiento !== sistemaExperto.titleHeader) {
        this.$emit("change-base-conocimientos", nameOfBaseConocimiento);
      } else {
        Vue.notify({
          group: "foo",
          title: "Ya estamos en ese sistema experto"
        });
      }
    },
    logout() {
      this.$emit("logout");
    }
  }
};
</script>

<style lang="scss">
@import "./HeaderBar.scss";
</style>
