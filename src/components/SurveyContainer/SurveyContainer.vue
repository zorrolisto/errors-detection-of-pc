<template>
  <div class="c-surveyContainer">
    <div
      v-for="(pregunta, index) in arrayOfQuestions"
      :key="index"
      class="c-surveyContainer__question"
    >
      <div class="c-surveyContainer__header">
        <q-icon name="help" color="primary" size="18px" />
        <div class="c-surveyContainer__header__title">
          Pregunta {{ index + 1 }}
        </div>
      </div>
      <div class="c-surveyContainer__content">
        <div class="c-surveyContainer__content__question-container">
          <div class="c-surveyContainer__content__question-container__header">
            <q-icon
              class="c-surveyContainer__content__icon"
              color="primary"
              name="login"
            />
            <div class="c-surveyContainer__content__title">
              ¿{{ sistemaExperto.initOfQuestion }}
              {{ pregunta.label.replaceAll("_", " ") }}?
            </div>
          </div>

          <div class="c-surveyContainer__content__question-container__actions">
            <q-btn
              :color="pregunta.state === 'accepted' ? 'green' : 'primary'"
              :disable="
                pregunta.state === 'accepted' || pregunta.state === 'rejected'
              "
              @click="setQuestionStatus('accepted')"
              icon="check"
              label="SI"
              size="0.75rem"
            />
            <q-btn
              :color="pregunta.state === 'rejected' ? 'red' : 'primary'"
              :disable="
                pregunta.state === 'accepted' || pregunta.state === 'rejected'
              "
              @click="setQuestionStatus('rejected')"
              icon="close"
              label="NO"
              size="0.75rem"
            />
          </div>
        </div>
      </div>
    </div>
    <q-spinner-dots v-if="isLoadingQuestion" size="70px" color="primary" />
  </div>
</template>

<script>
import { sistemaExperto } from "../../prolog/baseConocimientos";
import Swal from "sweetalert2";

export default {
  name: "SurveyContainer",
  props: {
    isChangeBaseConocimientos: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      possiblesBestAnswers: [],
      //---------------
      sistemaExperto: sistemaExperto,
      isLoadingQuestion: false,
      fallasAceptadas: [],
      fallasRechazadas: [],
      allFallasOfProblem: [],
      indexOfFalla: 0,
      indexOfProblem: 0,
      arrayOfQuestions: [],
      allProblems: [],
      question: ""
    };
  },
  watch: {
    isChangeBaseConocimientos() {
      this.updateView();
    }
  },
  mounted() {
    /*this.isLoadingQuestion = true;
    this.getAllProblems();
    setTimeout(() => {
      this.getNewProblem("rejected", true);
    }, 500);*/
  },
  methods: {
    updateView() {
      this.resetAll();
      this.isLoadingQuestion = true;
      this.getAllProblems();
      setTimeout(() => {
        this.getNewProblem("rejected", true);
      }, 500);
    },
    resetAll() {
      this.isLoadingQuestion = true;
      this.possiblesBestAnswers = [];
      this.fallasAceptadas = [];
      this.allFallasOfProblem = [];
      this.fallasRechazadas = [];
      this.indexOfFalla = 0;
      this.indexOfProblem = 0;
      this.arrayOfQuestions = [];
      this.allProblems = [];
      this.question = "";
      this.isLoadingQuestion = false;
    },
    setQuestionStatus(statusLastQuestion) {
      if (statusLastQuestion === "accepted") {
        this.fallasAceptadas.push(
          this.arrayOfQuestions[this.arrayOfQuestions.length - 1].label
        );
      } else {
        this.fallasRechazadas.push(
          this.arrayOfQuestions[this.arrayOfQuestions.length - 1].label
        );
      }
      this.arrayOfQuestions[
        this.arrayOfQuestions.length - 1
      ].state = statusLastQuestion;
      this.getNewProblem(statusLastQuestion);
    },
    // const knownQuestions = this.knownQuestions.forEach();
    showMessageUnrecognizeProblem() {
      Swal.fire("Ups", "No conocemos su problema!", "error").then(() => {
        this.updateView();
      });
    },
    showProblemFound() {
      Swal.fire(
        `La respuesta es ${this.allProblems[this.indexOfProblem]
          .replaceAll("_", " ")
          .toUpperCase()}!`,
        "",
        "success"
      ).then(() => {
        this.updateView();
      });
    },
    getNewProblem(status, first) {
      this.isLoadingQuestion = true;
      if (status === "accepted") {
        if (this.indexOfFalla === this.allFallasOfProblem.length - 1) {
          this.showProblemFound();
        } else {
          this.indexOfFalla += 1;
          this.showNewFalla();
        }
      } else if (status === "rejected") {
        if (!Boolean(first)) {
          this.indexOfProblem += 1;
        }
        if (this.allProblems[this.indexOfProblem]) {
          const problem = this.allProblems[this.indexOfProblem];
          console.log("problem ");
          console.log(problem);
          this.getAllFallasDeProblema(problem);
        } else {
          this.showMessageUnrecognizeProblem();
          this.isLoadingQuestion = false;
        }
      }
    },
    showNewFalla() {
      setTimeout(() => {
        this.arrayOfQuestions.push({
          label: this.allFallasOfProblem[this.indexOfFalla],
          state: "onHold"
        });
        this.isLoadingQuestion = false;
      }, 500);
    },
    getAllFallasDeProblema(problem) {
      const prologSession = this.initPl();
      this.allFallasOfProblem = [];
      const allFallasOfProblem = this.allFallasOfProblem;
      const show = x => {
        console.log(prologSession.format_answer(x));
        if (x !== false) {
          allFallasOfProblem.push(prologSession.format_answer(x).slice(3, -1));
        }
      };
      const goal = `es_causa_de_consecuencia(F, ${problem}).`;
      this.initSessionOfTauProlog(show, goal, "");
      setTimeout(() => {
        console.log("allProblems");
        const isValid = this.verifyValidFalla();
        if (isValid) {
          this.cleanFallasAceptadas();
          this.indexOfFalla = 0;
          this.showNewFalla();
          // this.isLoadingQuestion = false;
        } else {
          this.getNewProblem("rejected");
        }
      }, 1000);
    },
    cleanFallasAceptadas() {
      this.allFallasOfProblem = this.allFallasOfProblem.filter(
        falla => !this.fallasAceptadas.includes(falla)
      );
    },
    verifyValidFalla() {
      let isValid = true;
      this.fallasAceptadas.forEach(fallaAntigua => {
        const isNotFound = !Boolean(
          this.allFallasOfProblem.some(
            fallaNueva => fallaNueva === fallaAntigua
          )
        );
        if (isNotFound) {
          isValid = false;
        }
      });
      this.fallasRechazadas.forEach(fallaRechazada => {
        const isFound = this.allFallasOfProblem.some(
          fallaNueva => fallaNueva === fallaRechazada
        );
        if (isFound) {
          console.log("Es una falla rechazada");
          isValid = false;
        }
      });
      if (this.allFallasOfProblem.length === 0) {
        isValid = false;
      }
      return isValid;
    },
    getAllProblems() {
      const prologSession = this.initPl();
      const allProblems = this.allProblems;
      const show = x => {
        if (x !== false) {
          allProblems.push(prologSession.format_answer(x).slice(3, -1));
        }
      };
      const goal = "consecuencia(P).";
      this.initSessionOfTauProlog(show, goal, "");
      setTimeout(() => {
        console.log("allProblems");
        console.log(this.allProblems);
      }, 500);
    },
    initPl() {
      const pl = require("tau-prolog");
      return pl.create(1000);
    },
    initSessionOfTauProlog(functionToShow, goalQuery, addToBaseConocimiento) {
      const prologSession = this.initPl();

      const program = `${sistemaExperto.baseConocimientos} ${addToBaseConocimiento}`;

      prologSession.consult(program, {
        success: function() {
          prologSession.query(goalQuery, {
            success: function() {
              prologSession.answers(functionToShow);
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
@import "./SurveyContainer.scss";
</style>
