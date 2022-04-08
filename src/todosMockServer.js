import { rest } from "msw";
import { setupServer } from "msw/node";

let todos;
beforeEach(() => {
  todos = [];
});
function addTodo(todo) {
  todos.push(todo);
}
export function addTodosCount(count) {
  for (let i = 0; i < count; i++) {
    const id = `t${todos.length + 1}`;
    const title = `Todo ${todos.length + 1}`;
    addTodo({ title, id });
  }
}
const handlers = [
  rest.get("https://example.com/api/todos", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos));
  }),
  rest.get("https://example.com/api/todos/:id", (req, res, ctx) => {
    const found = todos.find((todo) => todo.id === req.params.id);
    if (found) return res(ctx.status(200), ctx.json(found));
    return res(ctx.status(404), ctx.json({ error: "Not found" }));
  }),
];
const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterAll(() => server.close());
