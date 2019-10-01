import axios from 'axios';

const state = {
  todos: []
};
const getters = {
  allTodos(state) {
    return state.todos; 
  }
};
const actions = {
  async fetchTodos({commit}) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    commit('setTodos', response.data);
  },
  async addTodo({ commit }, title) {
    const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    });
    commit('newTodo', response.data);
  },
  async deleteTodo({ commit }, todoId) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
    commit('removeTodo', todoId);
  },
  async filterTodos({ commit }, option) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${option}`)
    commit('setTodos', response.data)
  },
  async updateTodo({ commit }, updateTodo) {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updateTodo.id}`, updateTodo);
    commit('updateTodo', response.data);
  }
};
const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, todoId) => state.todos = state.todos.filter(todo => todo.id !== todoId),
  updateTodo: (state, updateTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updateTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updateTodo);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}