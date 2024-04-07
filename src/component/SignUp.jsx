import { useForm } from "react-hook-form";
import { authService } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../Store/authSlice";
import database from "../firebase/db";
function SignUp() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function create(data) {
    const userData = await authService.createAccount(data);

    try {
      if (userData) {
        const userID = userData.user.uid;
        const userEmail = userData.user.email;
        await database.addUserToDatabase(userID, userEmail);
        dispatch(login(userData.user));
        await database.addUserData({ id: userID, email: userEmail });
        navigate("/");
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col flex-wrap p-8 gap-6 justify-center w-[50%] items-center">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit(create)} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="enter your email id"
          {...register("email", {
            required: true,
          })}
          className="p-1 border-2 border-black text-center "
        />
        <input
          type="password"
          placeholder="enter your password"
          {...register("password", {
            required: true,
          })}
          className="p-1 border-2 border-black text-center "
        />
        <button className="bg-black text-white p-1">Create Account</button>
      </form>
    </div>
  );
}
export default SignUp;
