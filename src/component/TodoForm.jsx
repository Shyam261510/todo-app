import { useForm } from "react-hook-form";
import database from "../firebase/db";
import { useState } from "react";
import { useSelector } from "react-redux";
import Team from "./Team";

function TodoForm() {
  const userData = useSelector((state) => state.todoReducer);
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState("");

  async function createTeam(data) {
    try {
      setLoading(true);
      const userId = userData.todos?.id;
      await database.createTeam(userId, {
        teamName: data.teamName,
      });

      reset();

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  if (loading) return <h2>Loading....</h2>;
  return (
    <div>
      <h2>Create Team</h2>
      <input
        type="text"
        placeholder="enter team name..."
        {...register("teamName", { required: true })}
      />

      <button onClick={handleSubmit(createTeam)}>Add Team</button>
      <h2>Team Data</h2>
      <Team data={userData.todos?.data?.team} />
    </div>
  );
}
export default TodoForm;
