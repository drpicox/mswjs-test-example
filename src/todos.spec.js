import { addTodosCount } from "./todosMockServer";
import { apiListTodos, apiGetTodo } from "./todosApi";

test("list todos", async () => {
  addTodosCount(3);
  const fetched = await apiListTodos();
  expect(fetched).toHaveLength(3);
  expect(fetched).toContainEqual({ title: "Todo 1", id: "t1" });
  expect(fetched).toContainEqual({ title: "Todo 2", id: "t2" });
  expect(fetched).toContainEqual({ title: "Todo 3", id: "t3" });
});

test("gets an existing todo", async () => {
  addTodosCount(3);
  const fetched = await apiGetTodo("t2");
  expect(fetched).toEqual({ title: "Todo 2", id: "t2" });
});

test("gets a non-existing todo", async () => {
  addTodosCount(3);
  const fetching = apiGetTodo("t4");
  await expect(fetching).rejects.toEqual({ error: "Not found" });
});
