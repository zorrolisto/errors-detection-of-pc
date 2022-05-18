<template>
  <q-dialog
    class="c-authDialog"
    v-model="isOpenAuthDialog"
    maximized
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <div class="encapsulate">
      <div class="c-authDialog__login">
        <div class="c-authDialog__login__header">
          {{ title }}
        </div>
        <div class="c-authDialog__login__inputs">
          <q-input
            :disable="isLoadingAuth"
            v-model="email"
            outlined
            type="text"
            label="E-mail"
          />
          <q-input
            :disable="isLoadingAuth"
            v-if="authMethod === 'register'"
            v-model="name"
            outlined
            type="text"
            label="Nombre"
          />
          <q-input
            :disable="isLoadingAuth"
            v-model="password"
            type="password"
            label="Contraseña"
            outlined
            @keyup.enter="authVerification"
          />
        </div>
        <div class="c-authDialog__login__actions">
          <div class="changeLabel" @click="changeAuthMethod">
            {{ otherAuthMethod }}
          </div>
          <q-btn
            :loading="isLoadingAuth"
            class="goBtn"
            color="primary"
            round
            icon="arrow_forward"
            @click="authVerification"
          />
        </div>
        <div class="c-authDialog__login__error" v-if="authError !== ''">
          {{ authError }}
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import {
  sistemaExperto,
  sistemaExpertoBackup,
  sistemaExpertoEnfermedades,
  sistemaExpertoTest,
  sistemaExpertoTestVocacional
} from "../../prolog/baseConocimientos";

export default {
  name: "AuthDialog",
  props: {
    isOpenAuthDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      authError: "",
      otherAuthMethod: "Registrate",
      authMethod: "login",
      title: "Bienvenido de nuevo",
      possiblesBestAnswers: [],
      isOpen: true,
      email: "",
      name: "",
      password: "",
      isLoadingAuth: false
    };
  },
  methods: {
    resetAllInputs() {
      this.email = "";
      this.name = "";
      this.password = "";
    },
    authVerification() {
      this.isLoadingAuth = true;
      this.authError = "";
      setTimeout(() => {
        this.getInto();
        this.isLoadingAuth = false;
      }, 1000);
    },
    initSistemasExpertosForEmail(emailOfUser) {
      let sistemasExpertosFromLocalStorage = JSON.parse(
        localStorage.getItem("sistemasExpertosByUser")
      );
      sistemasExpertosFromLocalStorage.push({
        emailId: emailOfUser,
        sistemasExpertos: [
          sistemaExpertoTestVocacional,
          sistemaExpertoEnfermedades,
          sistemaExpertoBackup
        ]
      });
      localStorage.setItem(
        "sistemasExpertosByUser",
        JSON.stringify(sistemasExpertosFromLocalStorage)
      );
    },
    getInto() {
      let authSystem = JSON.parse(localStorage.getItem("authSystem"));
      if (this.authMethod === "register") {
        if (this.email !== "" && this.name !== "" && this.password !== "") {
          if (authSystem === null) {
            authSystem = {
              allAccounts: []
            };
          } else if (
            authSystem &&
            authSystem.allAccounts.includes(
              account => this.email === account.email
            )
          ) {
            this.authError = "Esta email ya está registrado";
          }
          authSystem.allAccounts.push({
            name: this.name,
            password: this.password,
            email: this.email,
            session: "active"
          });
          localStorage.setItem("authSystem", JSON.stringify(authSystem));
          this.initSistemasExpertosForEmail(this.email);
          this.$emit("auth-probed");
          return;
        } else {
          this.authError = "Todos los campos son obligatorios";
        }
      }

      if (
        this.authMethod === "login" &&
        !Boolean(this.email !== "" && this.password !== "")
      ) {
        this.authError = "Todos los campos son obligatorios";
        return;
      }

      if (
        authSystem &&
        authSystem.allAccounts &&
        authSystem.allAccounts.some(
          account =>
            account.email === this.email && account.password === this.password
        )
      ) {
        this.authError = "";
        this.isOpen = false;
        authSystem.allAccounts.forEach(user => {
          if (user.email === this.email) {
            user.session = "active";
          }
        });
        localStorage.setItem("authSystem", JSON.stringify(authSystem));
        this.$emit("auth-probed");
      } else {
        this.authError = "No existe la cuenta";
        return;
      }
    },
    changeAuthMethod() {
      if (this.authMethod === "login") {
        this.authMethod = "register";
        this.title = "Empecemos";
        this.otherAuthMethod = "Logueate";
      } else {
        this.authMethod = "login";
        this.title = "Bienvenido de nuevo";
        this.otherAuthMethod = "Registrate";
      }
    }
  }
};
</script>

<style lang="scss">
@import "./AuthDialog.scss";
</style>
