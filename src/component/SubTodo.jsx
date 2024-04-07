import database from "../firebase/db";
function SubTodo({ subTodo, id }) {
  const todoid = id;

  function update(id, todo) {
  
    database.updateData(id, { ...todo,status:"completed" });
    console.log(todo);
  }

  return (
    <div>
      {subTodo.map((todo) => (
        <div key={todo.id}>
          <h2>{todo.todo}</h2>
          <button onClick={() => update(todoid, todo)}>update</button>
        </div>
      ))}
    </div>
  );
}
export default SubTodo;
