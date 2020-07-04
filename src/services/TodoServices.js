import http from "../http-common";

const getTodos = () => {
  return http.get("/getAll");
};

const getTodoById = id => {
  return http.get(`/getTodoById/${id}`);
};

const addTodo = (data) => {
  return http.post("/add", data);
};

const updateTodo = (data) => {
  return http.put("/update", data);
};

const deleteTodo = (id) => {
  return http.delete(`/delete/${id}`);
};

const getPriorities = () => {
  return http.get('/getPriorities');
};

export default {
  getTodos,
  getTodoById,
  addTodo,
  updateTodo,
  deleteTodo,
  getPriorities
};
