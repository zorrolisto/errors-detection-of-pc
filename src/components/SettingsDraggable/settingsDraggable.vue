<template>
  <div class="o-settingsDraggable">
    <!--<div
      class="see-code"
      :style="`color: ${sistemaExpertoToSave.colorPrincipal};`"
    >
      <q-btn
        @click="openCodeDialog"
        :style="
          `background-color: ${sistemaExpertoToSave.colorPrincipal}; color: white;`
        "
      >
        <q-icon name="visibility" class="--left" />
        <q-icon name="code" class="--right" />
      </q-btn>
    </div>-->
    <div class="container-causas-input-title">
      <div class="title-causas">
        {{
          sistemaExpertoToSave.nameOfCausa.trim() !== ""
            ? sistemaExpertoToSave.nameOfCausa
            : "Causas"
        }}
      </div>
      <div class="add-causa-container">
        <q-input
          v-model="newCausa"
          outlined
          label-color="grey"
          color="grey"
          type="text"
          label="Ingresa nueva causa"
          @keyup.enter="addNewCausaToArrayOfCausas"
        />
        <q-btn
          :style="
            `background-color: ${sistemaExpertoToSave.colorPrincipal}; color: white;`
          "
          round
          icon="add"
          @click="addNewCausaToArrayOfCausas"
        />
      </div>

      <div class="o-settingsDraggable__container-causas">
        <draggable
          class="draggable-causas-container"
          :list="causas"
          :group="{ name: 'people', pull: 'clone', put: false }"
        >
          <div
            class="item-causa"
            v-for="(causa, index) in causas"
            :key="causa.name + index"
            @dblclick.stop="deleteCausa(causa.name)"
            @dragstart="isDraggingACausa(causa)"
          >
            <div
              class="line"
              :style="
                `background-color: ${sistemaExpertoToSave.colorPrincipal};`
              "
            ></div>
            {{ causa.name.replaceAll("_", " ") }}
          </div>
        </draggable>
      </div>
    </div>

    <div class="container-consecuencias-input-title">
      <div class="title-consecuencias">
        {{
          sistemaExpertoToSave.nameOfConsecuencia.trim() !== ""
            ? sistemaExpertoToSave.nameOfConsecuencia
            : "Consecuencias"
        }}
      </div>
      <div class="add-consecuencias-container">
        <q-input
          outlined
          label-color="grey"
          color="grey"
          v-model="newConsecuencia"
          type="text"
          label="Ingresa una nueva consecuencia"
          @keyup.enter="addNewConsecuenciaToArrayOfConsecuencias"
        />
        <q-btn
          :style="
            `background-color: ${sistemaExpertoToSave.colorPrincipal}; color: white;`
          "
          round
          icon="add"
          @click="addNewConsecuenciaToArrayOfConsecuencias"
        />
      </div>
      <div class="o-settingsDraggable__container-consecuencias">
        <div
          class="item-consecuencia"
          v-for="(consecuencia, index) in consecuencias"
          :key="index"
        >
          <div
            class="title-consecuencia"
            @dblclick="deleteConsecuencia(consecuencia.name)"
          >
            {{ consecuencia.name.replaceAll("_", " ") }}
          </div>
          <div class="container-causas-draggable">
            <draggable
              class="draggable-causas-of-consecuencia-container"
              :list="consecuencia.causasDelProblema"
              handle=".handle"
              group="people"
              @change="log(consecuencia)"
            >
              <div
                class="causa-item-of-consecuencia"
                v-for="(causa, index) in consecuencia.causasDelProblema"
                :key="causa.name + index"
                @dblclick="
                  deleteCausaOfConsecuencia(causa.name, consecuencia.name)
                "
              >
                <div
                  class="line"
                  :style="
                    `background-color: ${sistemaExpertoToSave.colorPrincipal};`
                  "
                ></div>
                {{ causa.name.replaceAll("_", " ") }}
              </div>
              <div
                v-if="consecuencia.causasDelProblema.length === 0"
                class="causa-item-of-consecuencia --placeholder"
              >
                <div class="line"></div>
                Vacío
              </div>
            </draggable>
            <div
              class="subtitle-causa"
              :style="
                `background-color: ${sistemaExpertoToSave.colorPrincipal};`
              "
            >
              causas
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-dialog
      v-model="isOpenCodeDialog"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <div class="c-codeDialog bg-white">
        <h1>Hola</h1>
      </div>
    </q-dialog>

    <notifications classes="notify-message" group="foo" />
  </div>
</template>

<script>
import Vue from "vue";
import { sistemaExperto } from "../../prolog/baseConocimientos";
import draggable from "vuedraggable";

export default {
  name: "RigthBar",
  components: {
    draggable
  },
  props: {
    sistemaExpertoToSave: {
      type: Object,
      required: true
    },
    isForCreate: {
      type: Boolean,
      default: true
    },
    isOpenAux: {
      type: Boolean,
      default: false
    },
    causasArray: {
      type: Array
    },
    consecuenciasArray: {
      type: Array
    }
  },
  data() {
    return {
      isOpenCodeDialog: false,
      nameOfConsecuenciaInMove: "",
      newConsecuencia: "",
      newCausa: "",
      possiblesBestAnswers: [],
      icons: ["bug_report"],
      nameOfConsecuencia: "",
      consecuencias: [],
      causas: [],
      fallaDragged: {}
    };
  },
  mounted() {
    this.updateDraggableList();
  },
  watch: {
    sistemaExpertoToSave() {
      console.log("this.sistemaExpertoToSave");
      console.log(this.sistemaExpertoToSave);
      this.updateDraggableList();
    },
    causas() {
      this.$emit("update-base-conocimiento", this.causas, this.consecuencias);
    },
    consecuencias() {
      this.$emit("update-base-conocimiento", this.causas, this.consecuencias);
    }
  },
  methods: {
    showNotifyMessage(message) {
      Vue.notify({
        group: "foo",
        title: message,
        duration: 1000
      });
    },
    updateDraggableList() {
      const baseDeConocimientos = this.sistemaExpertoToSave.baseConocimientos;
      const baseDeConocimientosSplitted = baseDeConocimientos
        .split(/\r|\n/)
        .map(rule => {
          return rule.trim();
        });
      const consecuenciasArray = this.getNamesOfRules(
        "consecuencia(",
        baseDeConocimientosSplitted
      );
      this.consecuencias = [];
      this.consecuencias = consecuenciasArray.map(consecuenciaName => {
        return {
          name: consecuenciaName,
          tipo: "consecuencia",
          causasDelProblema: []
        };
      });
      this.consecuencias = this.consecuencias;
      const causasArray = this.getNamesOfRules(
        "causa(",
        baseDeConocimientosSplitted
      );
      this.causas = [];
      this.causas = causasArray.map(causaName => {
        return {
          name: causaName,
          tipo: "causa"
        };
      });
      const conecctionsArray = this.getNamesOfConectionRule(
        baseDeConocimientosSplitted
      );
      this.setConnections(conecctionsArray);
    },
    setConnections(conecctionsArray) {
      this.consecuencias.forEach(consecuencia => {
        console.log("consecuencia ");
        console.log(consecuencia);
        const connectionsWithConsecuencia = conecctionsArray.filter(
          connection => connection.includes(`,${consecuencia.name}`)
        );
        consecuencia.causasDelProblema = connectionsWithConsecuencia.map(
          connection => {
            const causa = connection.replace(`,${consecuencia.name}`, "");
            return {
              name: causa,
              tipo: "causa"
            };
          }
        );
      });
    },
    getNamesOfRules(nameOfRule, baseDeConocimientosSplitted) {
      let arrayOnlyNamesRules = baseDeConocimientosSplitted.filter(
        rule =>
          rule.includes(nameOfRule) &&
          !rule.includes("es_causa_de_consecuencia(")
      );
      return arrayOnlyNamesRules.map(rule => {
        let onlyName = rule.replace(nameOfRule, "");
        return onlyName.replace(").", "");
      });
    },
    getNamesOfConectionRule(baseDeConocimientosSplitted) {
      let arrayOnlyNamesRules = baseDeConocimientosSplitted.filter(rule =>
        rule.includes("es_causa_de_consecuencia(")
      );
      return arrayOnlyNamesRules.map(rule => {
        let onlyName = rule.replace("es_causa_de_consecuencia(", "");
        return onlyName.replace(").", "");
      });
    },
    openCodeDialog() {
      this.isOpenCodeDialog = true;
    },
    verifyNewCausa() {
      switch (true) {
        case this.newCausa === "" || this.newCausa === " ":
          return "El campo está incompleto";
        case this.causas.some(
          causa => causa.name === this.newCausa.trim().replaceAll(" ", "_")
        ):
          return "La causa ya existe";
        default:
          return "";
      }
    },
    verifyNewConsecuencia() {
      switch (true) {
        case this.newConsecuencia === "" || this.newConsecuencia === " ":
          return "El campo está incompleto";
        case this.consecuencias.some(
          consecuencia =>
            consecuencia.name ===
            this.newConsecuencia.trim().replaceAll(" ", "_")
        ):
          return "La consecuencia ya existe";
        default:
          return "";
      }
    },
    addNewCausaToArrayOfCausas() {
      const errorMessage = this.verifyNewCausa();
      if (errorMessage === "") {
        const causaWithDashes = this.newCausa.trim().replaceAll(" ", "_");
        this.causas.unshift({
          name: causaWithDashes,
          tipo: "causa"
        });
        this.newCausa = "";
      } else {
        this.showNotifyMessage(errorMessage);
      }
    },
    addNewConsecuenciaToArrayOfConsecuencias() {
      const errorMessage = this.verifyNewConsecuencia();
      if (errorMessage === "") {
        const consecuenciaWithDashes = this.newConsecuencia
          .trim()
          .replaceAll(" ", "_");
        this.consecuencias.unshift({
          name: consecuenciaWithDashes,
          tipo: "consecuencia",
          causasDelProblema: []
        });
        this.newConsecuencia = "";
      } else {
        this.showNotifyMessage(errorMessage);
      }
    },
    isOverOfProblem(consecuencia) {
      this.nameOfConsecuenciaInMove = consecuencia.name;
    },
    isOutOfProblem() {
      this.nameOfConsecuenciaInMove = "";
    },
    isDraggingACausa(evn) {
      this.fallaDragged = evn;
    },
    verifiedConnection(consecuencia) {
      console.log(consecuencia.causasDelProblema);
      console.log(this.fallaDragged.name);
      switch (true) {
        /*case consecuencia.causasDelProblema.some(
          causa => causa.name === this.fallaDragged.name
        ):
          return "Ya existe esta conección";*/
        default:
          return "";
      }
    },
    deleteConsecuencia(consecuenciaName) {
      this.consecuencias = this.consecuencias.filter(
        consecuencia => consecuenciaName !== consecuencia.name
      );
      this.$emit("update-base-conocimiento", this.causas, this.consecuencias);
    },
    deleteCausaOfConsecuencia(causaName, consecuenciaName) {
      this.consecuencias.forEach(consecuencia => {
        if (consecuenciaName === consecuencia.name) {
          consecuencia.causasDelProblema = consecuencia.causasDelProblema.filter(
            causa => causa.name !== causaName
          );
        }
      });
      this.$emit("update-base-conocimiento", this.causas, this.consecuencias);
    },
    deleteCausa(causaName) {
      this.causas = this.causas.filter(causa => causa.name !== causaName);
      this.consecuencias.forEach(consecuencia => {
        consecuencia.causasDelProblema = consecuencia.causasDelProblema.filter(
          causa => causa.name !== causaName
        );
      });
      this.$emit("update-base-conocimiento", this.causas, this.consecuencias);
    },
    log: function(consecuenciaDragged) {
      const errorMessage = this.verifiedConnection(consecuenciaDragged);
      if (errorMessage === "") {
        this.$emit("update-base-conocimiento", this.causas, this.consecuencias);
      } else {
        this.consecuencias.forEach(consecuencia => {
          if (consecuencia.name === consecuenciaDragged.name) {
            consecuencia.causasDelProblema = consecuencia.causasDelProblema.filter(
              causa => causa.name !== this.fallaDragged.name
            );
          }
        });
        this.showNotifyMessage(errorMessage);
      }
    },
    updateView() {
      this.nameOfConsecuencia = sistemaExperto.rankingTitle;
      this.icons = [sistemaExperto.iconConsecuencia];
      this.possiblesBestAnswers = [];
    }
  }
};
</script>

<style lang="scss">
@import "./settingsDraggable.scss";
</style>
