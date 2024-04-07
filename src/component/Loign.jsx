import { useForm } from "react-hook-form";
import { authService } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../Store/authSlice";
function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async (data) => {
    const userData = await authService.login(data);
    try {
      if (userData) {
        navigate("/");
      }
    } catch {
      console.log("login error");
    }
  };
  return (
    <div className="flex flex-col flex-wrap p-8 gap-6 justify-center w-[50%] items-center">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(login)} className="flex flex-col gap-3">
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
        <button className="bg-black text-white p-1">Login</button>
      </form>
    </div>
  );
}
export default Login;
