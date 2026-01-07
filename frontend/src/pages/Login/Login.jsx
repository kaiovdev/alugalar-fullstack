import { SiHomeadvisor } from "react-icons/si";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const response = await api.post("/sessions", {
      email,
    });

    const user_id = response.data._id;

    localStorage.setItem("user_id", user_id);

    navigate("/home");
  }

  useEffect(() => {
    async function logout() {
      localStorage.removeItem("user_id");
    }
    logout();
  }, []);

  return (
    <div className="w-full min-h-screen bg-linear-to-t from-gray-800 to-gray-500">
      <div className="w=full min-h-screen flex flex-col items-center justify-center">
        <SiHomeadvisor className="text-white" size={80} />
        <p className="text-5xl font-bold text-white mb-5">AlugaLar</p>
        <form className="p-4 w-sm md:w-lg flex flex-col" onSubmit={handleLogin}>
          <input
            type="email"
            className="bg-zinc-500 text-white rounded-lg p-3 mb-2 outline-0"
            placeholder="Digite seu email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-white text-black font-medium p-2 rounded-lg cursor-pointer hover:bg-gray-900 hover:text-white duration-400"
            type="submit"
          >
            Acessar
          </button>
        </form>
      </div>
    </div>
  );
}
