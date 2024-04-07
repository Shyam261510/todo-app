import { useEffect, useState } from "react";
import SubTodo from "./SubTodo";
import database from "../firebase/db";
import { authService } from "../firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { setTodosData } from "../Store/todoSlice";
function TodoItems() {
  const [text, setText] = useState("");
  const user = useSelector((state) => state.authReducer);
  const [loading, setLoading] = useState(false);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.todos);

  useEffect(() => {
    const unsubscribe = database.getData((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // Handle document data here
        // console.log(user.userData.id);
        const data = doc.data();
        if (user.userData.id === data.user_id.id) {
          // Suggested code may be subject to a license. Learn more: ~LicenseLog:3160947510.
          dispatch(setTodosData({ data, id: doc.id }));
        } else {
          return;
        }
      });
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe when component unmounts
  }, []);

  const update = async (id, data) => {
    data = { id: id, todo: text };
    await database.updateDocument(id, data);

    setText("");
  };
  if (todos && loading) return <h2>Loading....</h2>;
  return (
    <div>
      {todos &&
        todos.map((todo) => (
          <div key={todo.id}>
            <h2>{todo.todoTitle}</h2>
            <form onSubmit={(e) => (e.preventDefault(), update(todo.id, todo))}>
              <input
                type="text"
                placeholder="add subTodo.."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <button type="submit">Add sub Todo</button>
            </form>
            <SubTodo subTodo={todo.subTodo} id={todo.id} />
          </div>
        ))}
    </div>
  );
}

export default TodoItems;
