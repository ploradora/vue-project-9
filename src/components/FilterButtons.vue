<template>
  <div :class="{ darkFilter: darkMode }" class="filter-buttons">
    <p class="desktop counter">{{ tasks.length }} items left</p>
    <div class="buttons">
      <button
        :class="{ active: current === 'all' }"
        @click="selectFilter('all')"
      >
        All
      </button>
      <button
        :class="{ active: current === 'active' }"
        @click="selectFilter('active')"
      >
        Active
      </button>
      <button
        :class="{ active: current === 'completed' }"
        @click="selectFilter('completed')"
      >
        Completed
      </button>
    </div>
    <button @click="clearCompleted" class="desktop clear-all">
      Clear Complete
    </button>
  </div>
</template>

<script>
export default {
  emits: ["selectedFilter", "clearCompleted"],
  props: ["current", "darkMode", "tasks"],
  methods: {
    selectFilter(filter) {
      this.$emit("selectedFilter", filter);
    },
    clearCompleted() {
      this.$emit("clearCompleted");
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/globalStyles.scss";

button {
  font-family: "Josefin Sans", sans-serif;
  border: none;
  background-color: transparent;
  color: $Dark-Grayish-Blue;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
}
.filter-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 18px;
  padding: $padding-item;
  border-radius: 7px;
  box-shadow: $shadow;
  background-color: #fff;
  .desktop {
    display: none;
  }
  .counter {
    font-size: 15px;
    font-weight: 700;
    color: $Dark-Grayish-Blue;
  }
  .buttons {
    button {
      cursor: pointer;
      &:hover {
        color: $Very-Dark-Grayish-Blue;
      }
    }
    .active {
      color: $Bright-Blue;
      &:hover {
        color: $Bright-Blue;
      }
    }
    button:not(:last-child) {
      margin-right: 13px;
    }
  }
  .clear-all {
    font-size: 15px;
    color: $Dark-Grayish-Blue;
    &:hover {
      color: $Very-Dark-Grayish-Blue;
    }
  }
  @include desktop {
    position: relative;
    justify-content: space-between;
    margin-top: unset;
    border-radius: 0 0 $radius $radius;
    box-shadow: unset;
    .desktop {
      display: unset;
    }
    .buttons {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.darkFilter {
  background-color: $D-Very-Dark-Desaturated-Blue;
  .counter {
    color: $D-Very-Dark-Grayish-Blue;
  }
  .buttons {
    button {
      color: $D-Very-Dark-Grayish-Blue;
      &:hover {
        color: $D-Light-Grayish-Blue-hover;
      }
    }
  }
  .clear-all {
    color: $D-Very-Dark-Grayish-Blue;
    &:hover {
      color: $D-Light-Grayish-Blue-hover;
    }
  }
}
</style>
