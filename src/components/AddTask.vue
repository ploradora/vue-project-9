<template>
  <div class="header">
    <h1>todo</h1>
    <div class="dark-mode-toggle">
      <transition name="toggle" mode="out-in">
        <img
          v-if="darkMode"
          @click="darkModeOff"
          class="icon-sun toggle"
          src="../../src/assets/images/icon-sun.svg"
          alt="icon sun"
        />
        <img
          v-else
          @click="darkModeOn"
          class="icon-moon toggle"
          src="../../src/assets/images/icon-moon.svg"
          alt="icon moon"
        />
      </transition>
    </div>
  </div>
  <form :class="{ darkInput: darkMode }" @submit.prevent="submitTask">
    <div class="input-field">
      <button></button>
      <input
        @keyup.enter="submitOnEnter"
        v-model="task"
        type="text"
        placeholder="Create a new todo..."
      />
    </div>
  </form>
</template>

<script>
import { projectFirestore } from '@/firebase/config';
export default {
  emits: ["darkStatus"],
  props: ["darkMode"],
  data() {
    return {
      task: "",
      complete: false,
    };
  },
  methods: {
    submitOnEnter() {
      return this.task;
    },
    submitTask() {
      if (this.task === "" || this.task === " ") {
        return;
      }
      let todo = {
        task: this.task,
        complete: this.complete,
      };
      projectFirestore.collection('tasksList').add(todo)
      this.task = "";
    },
    darkModeOn() {
      this.$emit("darkStatus", true);
    },
    darkModeOff() {
      this.$emit("darkStatus", false);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/globalStyles.scss";

.header {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: clamp(25px, 5vw, 40px);
    text-transform: uppercase;
    letter-spacing: 8px;
    color: hsl(0, 0%, 98%);
  }
  .dark-mode-toggle {
    .toggle-enter-from,
    .toggle-leave-to {
      opacity: 0;
    }
    .toggle-enter-active {
      transition: all 0.1s ease-out;
    }
    .toggle-leave-active {
      transition: all 0.1s ease-in;
    }
    .toggle-enter-to,
    .toggle-leave-from {
      opacity: 1;
    }
    img {
      cursor: pointer;
    }
  }
}
form {
  margin-bottom: 18px;
  .input-field {
    display: flex;
    align-items: center;
    padding: $padding-item;
    background-color: #fff;
    border-radius: $radius;
    box-shadow: $shadow;
    overflow: hidden;
    button {
      @include button-check;
      &:hover {
        background: $Light-Grayish-Blue;
      }
    }
    input {
      background-color: unset;
      border: none;
      outline: none;
      font-family: $ff;
      flex: 2;
      padding: 5px 0;
      margin-bottom: -5px;
      font-size: 18px;
      color: $Very-Dark-Grayish-Blue;
      &::placeholder {
        padding: 5px 0;
        color: $Dark-Grayish-Blue;
      }
    }
  }
}
.darkInput {
  .input-field {
    background-color: $D-Very-Dark-Desaturated-Blue;
    button {
      background: $D-Dark-Grayish-Blue;
      &::after {
        background-color: $D-Very-Dark-Desaturated-Blue;
      }
      &:hover {
        background: $D-Dark-Grayish-Blue;
      }
    }
    input {
      color: $D-Light-Grayish-Blue;
      &::placeholder {
        color: $D-Dark-Grayish-Blue;
      }
    }
  }
}
</style>
