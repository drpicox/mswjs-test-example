export async function apiListTodos() {
  return fetch("https://example.com/api/todos").then((res) => res.json());
}

export async function apiGetTodo(id) {
  return fetch(`https://example.com/api/todos/${id}`).then(async (res) => {
    if (res.status >= 400) throw await res.json();
    return res.json();
  });
}
