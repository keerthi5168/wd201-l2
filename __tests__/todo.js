/* eslint-disable no-undef */
const todo = require("../todo");
let today = new Date().toLocaleDateString("en-CA");

const { all, Complete, add, over_due, due_Today, due_Later } = todo();

describe("MY List", () => {
  beforeAll(() => {
    add({
      title: "Works to do",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });

  test("Add a new todo", () => {
    // expect(all.length).toBe(0);

    let length = all.length;

    add({
      title: "studying",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toBe(length + 1);
  });

  test("Mark as completed", () => {
    expect(all[0].completed).toBe(false);
    Complete(0);
    expect(all[0].completed).toBe(true);
  });

  test("retrive all todos which are overdue", () => {
    let listOfTodos = over_due();

    expect(
      listOfTodos.every((todo) => {
        return todo.dueDate < today;
      })
    ).toBe(true);
  });

  test("retrive all todos which are dueToday", () => {
    let listOfTodos = due_Today();

    expect(
      listOfTodos.every((todo) => {
        return todo.dueDate === today;
      })
    ).toBe(true);
  });

  test("retrive all todos which are dueLater", () => {
    let listOfTodos = due_Later();

    expect(
      listOfTodos.every((todo) => {
        return todo.dueDate > today;
      })
    ).toBe(true);
  });
});
