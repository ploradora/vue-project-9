<template>
  <section :class="{ dark: darkMode }">
    <div class="todo-container">
      <AddTask @darkStatus="darkMode = $event" :darkMode="darkMode" />
      <div v-if="tasks.length" class="list dark-list">
        <transition-group name="item">
          <ListTasks
            v-for="(task, index) in filteredTasks"
            :key="index"
            :task="task"
            :darkMode="darkMode"
            @delete-item="deleteItem"
            @toggle-complete="toggleComplete"
          />
        </transition-group>
        <div class="mobile-clear">
          <p class="mobile counter">{{ tasks.length }} items left</p>
          <button @click="clearCompleted" class="mobile clear-all">
            Clear Complete
          </button>
        </div>
      </div>
      <FilterButtons
        v-if="tasks.length"
        @selectedFilter="current = $event"
        :current="current"
        :darkMode="darkMode"
        :tasks="tasks"
      />
      <p class="hint">Drag and Drop to reorder list</p>
    </div>
  </section>
</template>

<script>
import AddTask from "./components/AddTask.vue";
import FilterButtons from "./components/FilterButtons.vue";
import ListTasks from "./components/ListTasks.vue";
import { projectFirestore } from "./firebase/config";
export default {
  components: { AddTask, FilterButtons, ListTasks },
  data() {
    return {
      darkMode: false,
      tasks: [],
      current: "all",
    };
  },
  created() {
    projectFirestore.collection("tasksList").onSnapshot((res) => {
      const changes = res.docChanges();
      changes.forEach((change) => {
        if (change.type === "added") {
          this.tasks.push({
            ...change.doc.data(),
            id: change.doc.id,
          });
        }
        if (change.type === "removed") {
          this.tasks = this.tasks.filter((item) => item.id !== change.doc.id);
        }
      });
    });
  },
  computed: {
    filteredTasks() {
      if (this.current === "completed") {
        return this.tasks.filter((task) => task.complete);
      }
      if (this.current === "active") {
        return this.tasks.filter((task) => !task.complete);
      }
      return this.tasks;
    },
  },
  methods: {
    darkStatus(status) {
      this.darkMode = status;
    },
    deleteItem(item) {
      projectFirestore.collection("tasksList").doc(item.id).delete();
    },
    toggleComplete(item) {
      projectFirestore
        .collection("tasksList")
        .doc(item.id)
        .update({
          complete: (item.complete = !item.complete),
        });
    },
    clearCompleted() {
      projectFirestore
        .collection("tasksList")
        .where("complete", "==", true)
        .get()
        .then((res) => {
          res.docs.forEach((doc) => doc.ref.delete());
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../src/assets/globalStyles.scss";

section {
  position: relative;
  transition: all 0.2s linear;
  background-color: $Very-Light-Gray;
  background-image: url("./assets/images/bg-mobile-light.jpg");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: contain;
  width: 100%;
  min-height: 100vh;
  .todo-container {
    width: 90%;
    margin: auto;
    padding-top: 40px;
    padding-bottom: 100px;
    max-width: 600px;
    .list {
      border-radius: $radius;
      box-shadow: $shadow;
      background-color: #fff;
      z-index: 10;
      .item-enter-active,
      .item-leave-active {
        transition: all 0.25s ease-in-out;
      }
      .item-enter-from,
      .item-leave-to {
        opacity: 0;
        transform: scale(0.5);
      }
      .item-enter-to,
      .item-leave-from {
        opacity: 1;
        transform: scale(1);
      }
      .mobile-clear {
        padding: $padding-item;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .counter {
          color: $Dark-Grayish-Blue;
          font-weight: 700;
        }
        .clear-all {
          &:hover {
            color: $Dark-Grayish-Blue;
          }
        }
        button {
          font-family: "Josefin Sans", sans-serif;
          border: none;
          background-color: transparent;
          color: hsl(236, 9%, 61%);
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
        }
      }
    }
    .hint {
      position: absolute;
      left: 50%;
      bottom: 60px;
      transform: translateX(-50%);
      font-size: 14px;
      font-weight: 700;
      color: $Dark-Grayish-Blue;
      text-align: center;
    }
  }
  @include desktop {
    background-image: url("./assets/images/bg-desktop-light.jpg");
    .todo-container {
      .list {
        border-radius: $radius $radius 0 0;
        box-shadow: 0px 55px 28px -3px rgba(0, 0, 0, 0.15);
        .mobile-clear {
          display: none;
        }
      }
    }
  }
}
.dark {
  transition: all 0.2s linear;
  background-color: $D-Very-Dark-Blue;
  background-image: url("./assets/images/bg-mobile-dark.jpg");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: contain;
  width: 100%;
  min-height: 100vh;
  .todo-container {
    .list {
      background-color: $D-Very-Dark-Desaturated-Blue;
      .mobile-clear {
        .counter {
          color: $D-Very-Dark-Grayish-Blue;
        }
        .clear-all {
          color: $D-Very-Dark-Grayish-Blue;
          &:hover {
            color: $D-Light-Grayish-Blue-hover;
          }
        }
      }
    }
    .hint {
      color: $D-Very-Dark-Grayish-Blue-2;
    }
  }
  @include desktop {
    background-image: url("./assets/images/bg-desktop-dark.jpg");
  }
}
</style>
