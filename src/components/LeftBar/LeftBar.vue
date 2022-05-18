<template>
  <div class="c-left-bar">
    <div class="c-left-bar__header">
      <div
        class="c-left-bar__header__title"
        @click="esFallas = true"
        :style="esFallas ? 'color: #000' : ''"
      >
        {{ nameOfCausa }}
      </div>
      <div
        class="c-left-bar__header__title"
        @click="esFallas = false"
        :style="!esFallas ? 'color: #000' : ''"
      >
        {{ nameOfConsecuencia }}
      </div>
    </div>
    <div class="c-left-bar__options-container">
      <div
        class="c-left-bar__options-container__option"
        v-for="(item, index) of esFallas ? fallas : problemas"
        :key="index"
      >
        <q-icon :name="item.icon" size="17px" />
        <div class="title">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sistemaExperto } from "../../prolog/baseConocimientos";
export default {
  name: "LeftBar",
  props: {
    isChangeBaseConocimientos: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      esFallas: true,
      fallas: [],
      problemas: [],
      iconsProblemas: ["bug_report"],
      iconsFallas: ["power_settings_new"],
      nameOfCausa: "",
      nameOfConsecuencia: ""
    };
  },
  watch: {
    isChangeBaseConocimientos() {
      this.updateView();
    }
  },
  methods: {
    updateView() {
      this.nameOfCausa = sistemaExperto.nameOfCausa;
      this.nameOfConsecuencia = sistemaExperto.nameOfConsecuencia;
      this.iconsProblemas = [sistemaExperto.iconConsecuencia];
      this.iconsFallas = [sistemaExperto.iconCausa];
      this.fallas = [];
      this.setFallas();
      this.problemas = [];
      this.setProblemas();
    },
    setProblemas() {
      const pl = require("tau-prolog");
      const prologSession = pl.create(1000);
      const icons = this.iconsProblemas;
      const randomIcon = x => {
        return icons[0];
      };
      const arrayOfAnswers = this.problemas;
      const show = x => {
        if (x !== false) {
          arrayOfAnswers.push({
            name: prologSession
              .format_answer(x)
              .slice(3, -1)
              .replaceAll("_", " "),
            icon: randomIcon()
          });
        }
      };

      const program = `
        ${sistemaExperto.baseConocimientos}
      `;
      const goal = `
      consecuencia(P). 
      `;

      prologSession.consult(program, {
        success: function() {
          prologSession.query(goal, {
            success: function() {
              prologSession.answers(show);
            },
            error: function(error) {
              console.log("no se pudo hacer la query");
              console.log(error);
            }
          });
        },
        error: function(error) {
          console.log("no se pudo cargar");
          console.log(error);
        }
      });
    },
    setFallas() {
      const pl = require("tau-prolog");
      const prologSession = pl.create(1000);
      const icons = this.iconsFallas;
      const randomIcon = x => {
        return icons[0];
      };
      const arrayOfAnswers = this.fallas;
      const show = x => {
        if (x !== false) {
          arrayOfAnswers.push({
            name: prologSession
              .format_answer(x)
              .slice(3, -1)
              .replaceAll("_", " "),
            icon: randomIcon()
          });
        }
      };

      const program = `
        ${sistemaExperto.baseConocimientos}
      `;
      const goal = `
      causa(P). 
      `;

      prologSession.consult(program, {
        success: function() {
          prologSession.query(goal, {
            success: function() {
              prologSession.answers(show);
            },
            error: function(error) {
              console.log("no se pudo hacer la query");
              console.log(error);
            }
          });
        },
        error: function(error) {
          console.log("no se pudo cargar");
          console.log(error);
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "./LeftBar.scss";
</style>
