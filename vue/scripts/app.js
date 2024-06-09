const TodosApp = {
  data() {
    return {
      enteredTodoText: "",
      todos: [],
      editedTodoId: null,
    };
  },
  methods: {
    saveToDo(event) {
      event.preventDefault();

      if (this.editedTodoId) {
        const todoIndex = this.todos.findIndex((todo) => {
          return todo.id === this.editedTodoId;
        });

        const updatedTodoItem = {
          id: this.todos[todoIndex].id,
          text: this.enteredTodoText,
        };

        this.todos[todoIndex] = updatedTodoItem;
        this.editedTodoId = null;
      } else {
        const newTodo = {
          text: this.enteredTodoText.trim(),
          id: new Date().toISOString(),
        };
        if (this.enteredTodoText.trim().length > 0) {
          this.todos.push(newTodo);
        }
      }

      this.enteredTodoText = "";
    },

    startEditTodo(todoId) {
      this.editedTodoId = todoId;
      const todo = this.todos.find(function (todo) {
        return todo.id === todoId;
      });
      this.enteredTodoText = todo.text;
    },

    deleteTodo(todoId) {
      this.todos = this.todos.filter(function (todo) {
        return todo.id !== todoId;
      });
    },
  },
  created() {
    // Called before DOM start to take full control
  },
  mounted() {
    // Called after DOM start to take full control
  },
};

Vue.createApp(TodosApp).mount("#todos-app");
