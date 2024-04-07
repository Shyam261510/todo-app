import React, { useEffect } from "react";
import { authService } from "../firebase/auth";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import database from "../firebase/db";
import TodoForm from "./TodoForm";
import TodoItems from "./TodoItems";
import { login, logout } from "../Store/authSlice";
import { setTodosData } from "../Store/todoSlice";
export default function Home() {
  const [loading, setLoading] = React.useState(false);
  const user = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ id: userData.uid, email: userData.email }));
          dispatch(setTodosData({ user: user, id: userData.uid }));
        }
        setLoading(false);
      } catch (error) {
        console.log("Error fetching user:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const unsubscribe = await database.getData((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();

            if (user.userData.id === data.userData.id) {
              dispatch(setTodosData({ data, id: doc.id }));
            } else {
              return;
            }
          });

          setLoading(false);
        });

        return () => unsubscribe(); // Cleanup function to unsubscribe when component unmounts
      } catch (error) {
        console.log("get user Data error", error);
      }
    };
    fetchData();
  }, []);
  const handleLogout = () => {
    try {
      authService.logout();
      dispatch(logout());
      dispatch(setTodosData(null));
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };
  if (loading) return <h2>Loading...</h2>;
  return (
    <div>
      {user.userData ? (
        <div>
          <TodoForm />
          {/* <TodoItems /> */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="flex gap-2">
          <h2>
            <Link to="/login">Login</Link>
          </h2>
          <h2>
            <Link to="/signup">Sign Up</Link>
          </h2>
        </div>
      )}
    </div>
  );
}
