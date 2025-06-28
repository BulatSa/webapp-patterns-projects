import { observerMixin } from "./mixin.js";

export class TodoItem {
  constructor(text) {
    this.text = text;
  }

  equals(otherText) {
    return this.text == otherText;
  }
}

export class TodoList {
  #data = new Set();

  // Singleton
  constructor() {
    if (TodoList.instance) {
      throw new Error("Use TodoList.getInstance() to access the list");
    }
  }

  get items() {
    return this.#data;
  }

  static instance = null;
  static {
    this.instance = new TodoList();
  }

  static getInstance() {
    return this.instance;
  }

  // List behavior
  add(item) {
    const array = Array.from(this.#data);
    const todoExist = array.filter((todo) => todo.equals(item)).length > 0;
    if (!todoExist) {
      this.#data.add(item);
      this.notify();
    }
  }

  delete(todo_text) {
    const array = Array.from(this.#data);
    const todoToDelete = array.filter((todo) => todo.text == todo_text)[0];
    this.#data.delete(todoToDelete);
    this.notify();
  }

  find(todo_text) {
    const array = Array.from(this.#data);

    return array.find((todo) => (todo.text == todo_text));
  }

  replaceList(list) {
    this.#data = list;
    this.notify();
  }
}

// Add mixins data
Object.assign(TodoList.prototype, observerMixin);
