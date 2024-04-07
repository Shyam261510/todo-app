import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import database from "../firebase/db";
export default function TeamData({ team }) {
  const userData = useSelector((state) => state.todoReducer);
  const { register, handleSubmit, reset } = useForm();
  async function addTeamData(data) {
    console.log(team.id);
    await database.createTeamData(userData.todos.id, team.id, {
      teamProject: data.teamProject,
    });
    reset();
  }

  return (
    <div>
      <form onSubmit={handleSubmit(addTeamData)}>
        <input
          type="text"
          placeholder="enter team Project...."
          {...register("teamProject", { required: true })}
          className="p-2 rounded-md border-black"
        />

        <button className="bg-black p-2 rounded-md text-white font-semibold">
          Add Project
        </button>
      </form>
    </div>
  );
}
