<template>
  <transition name="item">
    <div :class="{ darkItem: darkMode, completed: task.complete }" class="item">
      <button @click="toggleComplete(task)">
        <img src="../assets/images/icon-check.svg" alt="icon check" />
      </button>
      <p class="task">{{ task.task }}</p>
      <img
        @click="deleteItem(task)"
        class="close"
        src="../assets/images/icon-cross.svg"
        alt="icon close"
      />
    </div>
  </transition>
</template>

<script>
export default {
  props: ["darkMode", "task"],
  data() {
    return {};
  },
  methods: {
    deleteItem(task) {
      this.$emit("delete-item", task);
    },
    toggleComplete(task) {
      this.$emit("toggle-complete", task);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/globalStyles.scss";

.item-enter-active {
    transition: all .25s ease-in-out;
}
.item-enter-from {
    opacity: 0;
    transform: scale(.5);
}
.item-enter-to {
    opacity: 1;
    transform: scale(1);
}

.item {
  font-size: clamp(14px, 3.5vw, 18px);
  border-bottom: 1px solid $Light-Grayish-Blue;
  display: flex;
  align-items: start;
  padding-top: 18px;
  padding-bottom: 18px;
  button {
    @include button-check;
    margin-left: 18px;
  }
  .task {
    font-size: 18px;
    padding-top: 5px;
    flex: 2;
    color: $Very-Dark-Grayish-Blue;
    cursor: pointer;
  }
  .close {
    padding-top: 3px;
    margin-left: auto;
    margin-right: 18px;
    cursor: pointer;
  }
}
.darkItem {
  border-bottom: 1px solid $D-Very-Dark-Grayish-Blue;
  button {
    background: $D-Dark-Grayish-Blue;
    &::after {
      background-color: $D-Very-Dark-Desaturated-Blue;
    }
  }
  .task {
    color: $D-Light-Grayish-Blue;
  }
}
.completed {
  button {
    background: $Check-Background;
    &::after {
      display: none;
    }
    img {
      margin-bottom: -1px;
    }
  }
  .task {
    text-decoration: line-through;
    color: $Light-Grayish-Blue;
  }
}
.darkCompleted {
  button {
    background: $Check-Background;
  }
  .task {
    color: $D-Very-Dark-Grayish-Blue;
  }
}
</style>
