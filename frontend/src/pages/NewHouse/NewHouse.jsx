import { Header } from "../../components/Header/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export function NewHouse() {
  const [thumbnail, setThumbnail] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!thumbnail) {
      alert("Selecione uma imagem");
      return;
    }

    const data = new FormData();
    data.append("thumbnail", thumbnail);
    data.append("description", description);
    data.append("price", price);
    data.append("location", location);
    data.append("status", status);

    const user_id = localStorage.getItem("user_id");

    try {
      setLoading(true);

      await api.post("/houses", data, {
        headers: {
          user_id,
        },
      });

      alert("Casa cadastrada com sucesso!");
      navigate("/myhouses");
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao cadastrar casa");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen bg-linear-to-t from-gray-800 to-gray-500 flex justify-center">
      <div className="w-xs md:w-7xl">
        <Header />
        <p className="text-xl text-white mt-8 mb-2">Cadastrar nova casa...</p>
        <main className="w-full bg-white rounded-lg p-5">
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-4">
            <h1 className="text-2xl font-bold">Informações da casa</h1>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="w-full border p-4 rounded cursor-pointer"
            />

            <input
              type="text"
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="number"
              placeholder="Preço da diária"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="text"
              placeholder="Localização"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value === "true")}
              className="w-full border p-2 rounded"
            >
              <option value="true">Disponível</option>
              <option value="false">Indisponível</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-zinc-600 text-white py-2 rounded hover:bg-zinc-700"
            >
              {loading ? "Salvando..." : "Cadastrar Casa"}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
