<template>
  <div class="c-rigth-bar">
    <div class="c-rigth-bar__header">
      <div class="c-rigth-bar__header__title">
        {{ nameOfConsecuencia }}
      </div>
    </div>
    <div class="c-rigth-bar__ranking-title">Ranking</div>
    <div class="c-rigth-bar__ranking-options-container">
      <div
        class="c-rigth-bar__ranking-options-container__option"
        v-for="(item, index) of possiblesBestAnswers"
        :key="index"
      >
        <div class="ranking-number">{{ index + 1 }}</div>

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
  name: "RigthBar",
  props: {
    isChangeBaseConocimientos: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      possiblesBestAnswers: [],
      icons: ["bug_report"],
      nameOfConsecuencia: ""
    };
  },
  watch: {
    isChangeBaseConocimientos() {
      this.updateView();
    }
  },
  mounted() {
    // this.updateView();
  },
  methods: {
    updateView() {
      this.nameOfConsecuencia = sistemaExperto.rankingTitle;
      this.icons = [sistemaExperto.iconConsecuencia];
      this.possiblesBestAnswers = [];
      this.setProblemas();
    },
    setProblemas() {
      const pl = require("tau-prolog");
      const prologSession = pl.create(1000);
      const icons = this.icons;
      const randomIcon = x => {
        const maxRandom = icons.length;
        return icons[0];
      };
      const arrayOfAnswers = this.possiblesBestAnswers;
      const show = x => {
        if (x !== false && arrayOfAnswers.length < 5) {
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
    }
  }
};
</script>

<style lang="scss">
@import "./RigthBar.scss";
</style>
