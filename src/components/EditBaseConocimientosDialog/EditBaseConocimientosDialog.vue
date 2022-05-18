<template>
  <q-dialog
    v-model="isOpen"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <!--
    full-width
    full-height
  -->
    <div
      class="c-editBaseDialog"
      v-if="sistemaExpertoToSave"
      :style="`background-color: ${sistemaExpertoToSave.colorPrincipal}`"
    >
      <div class="c-editBaseDialog__container">
        <q-icon
          class="close-btn"
          size="35px"
          :style="`color: ${sistemaExpertoToSave.colorPrincipal}`"
          name="close"
          @click="closeModal"
        />
        <div class="c-editBaseDialog__container__header">
          Configuración
          <!--{{ nameOfSistemaExperto }}-->
        </div>
        <div class="c-editBaseDialog__container__content">
          <div class="inputs-configurables-container">
            <div class="subtitle-configuration">
              Textos
            </div>
            <q-input
              v-model="sistemaExpertoToSave.titleHeader"
              type="text"
              label-color="grey"
              color="grey"
              outlined
              label="Titulo "
              maxlength="30"
            />
            <q-input
              v-model="sistemaExpertoToSave.nameOfConsecuencia"
              type="text"
              outlined
              label-color="grey"
              color="grey"
              label="Nombre de ''Consecuencia''"
            />
            <q-input
              v-model="sistemaExpertoToSave.rankingTitle"
              type="text"
              outlined
              label-color="grey"
              color="grey"
              label="Título del Ranking"
            />
            <q-input
              v-model="sistemaExpertoToSave.subtitleHeader"
              type="text"
              label-color="grey"
              outlined
              color="grey"
              label="Subtitulo"
            />
            <q-input
              v-model="sistemaExpertoToSave.nameOfCausa"
              type="text"
              label-color="grey"
              outlined
              color="grey"
              label="Nombre de ''Causa''"
            />
            <q-input
              v-model="sistemaExpertoToSave.initOfQuestion"
              type="text"
              label-color="grey"
              color="grey"
              outlined
              label="Inicio de Pregunta"
            />
          </div>
          <div class="icons-colors-configurables-container">
            <div class="subtitle-configuration">
              Iconos y colores
            </div>
            <div class="icon-picker">
              <div class="container-icon-picker">
                <q-icon
                  :name="sistemaExpertoToSave.iconPrincipal"
                  size="23px"
                  :style="`color: ${sistemaExpertoToSave.colorPrincipal}`"
                />
                <vue-awesome-icon-picker
                  :icon-preview="false"
                  button="Principal"
                  title="Escoge el Icono Principal"
                  @selected="selectPrincipalIcon"
                />
              </div>
              <div class="container-icon-picker">
                <q-icon
                  :name="sistemaExpertoToSave.iconConsecuencia"
                  size="23px"
                  :style="`color: ${sistemaExpertoToSave.colorPrincipal}`"
                />
                <vue-awesome-icon-picker
                  :icon-preview="false"
                  button="Consecuencias"
                  title="Escoge el Icono de Consecuencias"
                  @selected="selectConsecuenciaIcon"
                />
              </div>
              <div class="container-icon-picker">
                <q-icon
                  :name="sistemaExpertoToSave.iconCausa"
                  size="23px"
                  :style="`color: ${sistemaExpertoToSave.colorPrincipal}`"
                />
                <vue-awesome-icon-picker
                  :icon-preview="false"
                  button="Causas"
                  title="Escoge el Icono de Causas"
                  @selected="selectCausaIcon"
                />
              </div>
              <div class="color-picker">
                <q-input
                  v-model="sistemaExpertoToSave.colorPrincipal"
                  label-color="grey"
                  color="grey"
                  outlined
                >
                  <template v-slot:append>
                    <q-icon
                      name="format_color_fill"
                      :style="`color: ${sistemaExpertoToSave.colorPrincipal}`"
                      class="cursor-pointer"
                    >
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-color
                          v-model="sistemaExpertoToSave.colorPrincipal"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </div>
          <settings-draggable
            :is-open-aux="isOpenAux"
            :sistema-experto-to-save="sistemaExpertoToSave"
            @update-base-conocimiento="updateBaseString"
          />

          <div class="title-base-conocimiento">
            Codigo
          </div>
          <q-input
            style="margin:0 50px"
            :input-style="{
              padding: '0 30px',
              borderRadius: '4px'
            }"
            readonly
            autogrow
            outlined
            v-model="baseConocimientosAux"
            type="textarea"
          />
          <!--<q-btn
            color="primary"
            icon="save"
            label="Guardar cambios"
            @click="updateBaseConocimientos"
          />-->

          <q-btn
            :style="
              `background-color: ${sistemaExpertoToSave.colorPrincipal}; color: white`
            "
            class="save-btn"
            icon="save"
            label="Guardar cambios"
            @click="updateBaseConocimientos"
          />
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import {
  sistemaExperto,
  sistemaExpertoInit
} from "../../prolog/baseConocimientos";
import SettingsDraggable from "../../components/SettingsDraggable/settingsDraggable.vue";
import VueAwesomeIconPicker from "@rightbraintechbd/vue-awesome-icon-picker";

export default {
  name: "AuthDialog",
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    isForCreate: {
      type: Boolean,
      default: true
    },
    isChangeBaseConocimientos: {
      type: Boolean,
      default: false
    }
  },
  components: {
    SettingsDraggable,
    "vue-awesome-icon-picker": VueAwesomeIconPicker
  },
  data() {
    return {
      isOpenAux: false,
      baseConocimientosAux: sistemaExperto.baseConocimientos,
      baseConocimientos: sistemaExperto,
      nameOfSistemaExperto: "Detección de problemas de Pc",
      sistemaExpertoToSave: {}
    };
  },
  watch: {
    isOpen() {
      console.log("is open");
      this.isOpenAux = !this.isOpenAux;
      if (this.isOpen) {
        if (this.isForCreate) {
          this.initSistemaExperto();
        } else {
          this.getSistemaExperto();
        }
      }
    }
  },
  methods: {
    updateBaseString(causas, consecuencias) {
      const causasString = causas
        .map(causa => {
          return `causa(${causa.name}).`;
        })
        .join("\n");
      const consecuenciasString = consecuencias
        .map(consecuencia => {
          return `consecuencia(${consecuencia.name}).`;
        })
        .join("\n");
      let connectionString = [];
      consecuencias.forEach(consecuencia => {
        consecuencia.causasDelProblema.forEach(causa => {
          connectionString.push(
            `es_causa_de_consecuencia(${causa.name},${consecuencia.name}).`
          );
        });
      });
      connectionString = connectionString.join("\n");
      this.sistemaExpertoToSave.baseConocimientos = `${consecuenciasString}\n\n${causasString}\n\n${connectionString}\n\n`;
      this.baseConocimientosAux = this.sistemaExpertoToSave.baseConocimientos;
      console.log("this.sistemaExpertoToSave");
      console.log(this.sistemaExpertoToSave);
    },
    selectPrincipalIcon(icon) {
      this.sistemaExpertoToSave.iconPrincipal = `${icon.type + " "}fa-${
        icon.name
      }`;
    },
    selectConsecuenciaIcon(icon) {
      this.sistemaExpertoToSave.iconConsecuencia = `${icon.type + " "}fa-${
        icon.name
      }`;
    },
    selectCausaIcon(icon) {
      this.sistemaExpertoToSave.iconCausa = `${icon.type + " "}fa-${icon.name}`;
    },
    initSistemaExperto() {
      this.setSistemaExperto(sistemaExpertoInit);
    },
    getSistemaExperto() {
      this.setSistemaExperto(sistemaExperto);
    },
    setSistemaExperto(sistemaExpertoToInit) {
      this.sistemaExpertoToSave = {
        iconPrincipal: sistemaExpertoToInit.iconPrincipal,
        iconConsecuencia: sistemaExpertoToInit.iconConsecuencia,
        iconCausa: sistemaExpertoToInit.iconCausa,
        colorPrincipal: sistemaExpertoToInit.colorPrincipal,
        titleHeader: sistemaExpertoToInit.titleHeader,
        subtitleHeader: sistemaExpertoToInit.subtitleHeader,
        nameOfConsecuencia: sistemaExpertoToInit.nameOfConsecuencia,
        nameOfCausa: sistemaExpertoToInit.nameOfCausa,
        rankingTitle: sistemaExpertoToInit.rankingTitle,
        initOfQuestion: sistemaExpertoToInit.initOfQuestion,
        baseConocimientos: sistemaExpertoToInit.baseConocimientos
      };
    },
    closeModal() {
      this.$emit("close-modal");
    },
    setSistemaExpertoForUser() {
      let sistemasExpertosFromLocalStorage = JSON.parse(
        localStorage.getItem("sistemasExpertosByUser")
      );
      const emailFromActiveUser = this.getEmailOfActiveUser();
      sistemasExpertosFromLocalStorage.forEach(userSistemaExperto => {
        if (userSistemaExperto.emailId === emailFromActiveUser) {
          userSistemaExperto.sistemasExpertos.push(this.sistemaExpertoToSave);
        }
      });
      localStorage.setItem(
        "sistemasExpertosByUser",
        JSON.stringify(sistemasExpertosFromLocalStorage)
      );
    },
    updateSistemaExpertoForUser() {
      let sistemasExpertosFromLocalStorage = JSON.parse(
        localStorage.getItem("sistemasExpertosByUser")
      );
      const emailFromActiveUser = this.getEmailOfActiveUser();
      sistemasExpertosFromLocalStorage.forEach(userSistemaExperto => {
        if (userSistemaExperto.emailId === emailFromActiveUser) {
          userSistemaExperto.sistemasExpertos = userSistemaExperto.sistemasExpertos.filter(
            sistemaExpertoOfCurrentUser =>
              sistemaExpertoOfCurrentUser.titleHeader !==
              this.baseConocimientos.titleHeader
          );
          userSistemaExperto.sistemasExpertos.push(this.sistemaExpertoToSave);
        }
      });
      localStorage.setItem(
        "sistemasExpertosByUser",
        JSON.stringify(sistemasExpertosFromLocalStorage)
      );
    },
    getEmailOfActiveUser() {
      const authSystem = JSON.parse(localStorage.getItem("authSystem"));
      return authSystem.allAccounts.find(user => user.session === "active")
        .email;
    },
    updateBaseConocimientos() {
      if (this.isForCreate) {
        this.setSistemaExpertoForUser();
      } else {
        this.updateSistemaExpertoForUser();
      }

      this.baseConocimientos.iconPrincipal = this.sistemaExpertoToSave.iconPrincipal;
      this.baseConocimientos.iconConsecuencia = this.sistemaExpertoToSave.iconConsecuencia;
      this.baseConocimientos.iconCausa = this.sistemaExpertoToSave.iconCausa;
      this.baseConocimientos.colorPrincipal = this.sistemaExpertoToSave.colorPrincipal;
      this.baseConocimientos.titleHeader = this.sistemaExpertoToSave.titleHeader;
      this.baseConocimientos.subtitleHeader = this.sistemaExpertoToSave.subtitleHeader;
      this.baseConocimientos.nameOfConsecuencia = this.sistemaExpertoToSave.nameOfConsecuencia;
      this.baseConocimientos.nameOfCausa = this.sistemaExpertoToSave.nameOfCausa;
      this.baseConocimientos.rankingTitle = this.sistemaExpertoToSave.rankingTitle;
      this.baseConocimientos.initOfQuestion = this.sistemaExpertoToSave.initOfQuestion;
      this.baseConocimientos.baseConocimientos = this.sistemaExpertoToSave.baseConocimientos;

      this.$emit("already-edit", this.baseConocimientos);
    }
  }
};
</script>

<style lang="scss">
@import "./EditBaseConocimientosDialog.scss";
</style>
