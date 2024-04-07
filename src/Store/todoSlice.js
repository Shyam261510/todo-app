import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: null,
};
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodosData: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const { setTodosData } = todoSlice.actions;
export default todoSlice.reducer;
