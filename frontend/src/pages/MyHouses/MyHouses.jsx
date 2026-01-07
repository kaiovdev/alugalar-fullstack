import { Header } from "../../components/Header/Header";
import { IoLocationSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { api } from "../../services/api";

export function MyHouses() {
  const [myHouses, setMyHouses] = useState([]);
  const [loadingHouses, setLoadingHouses] = useState(true);

  async function loadHouses() {
    const user_id = localStorage.getItem("user_id");
    try {
      setLoadingHouses(true);

      const response = await api.get("/dashboard", {
        headers: {
          user_id,
        },
      });
      setMyHouses(response.data);
    } catch {
      console.log("Erro ao carregar minhas casas");
    } finally {
      setLoadingHouses(false);
    }
  }

  async function handleDeleteHouse(houseId) {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta casa?");

    if (!confirmDelete) return;

    const user_id = localStorage.getItem("user_id");

    try {
      await api.delete(`/houses/${houseId}`, {
        headers: {
          user_id,
        },
        data: {
          house_id: houseId,
        },
      });

      alert("Casa excluída com sucesso!");

      loadHouses();
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao excluir casa");
    }
  }

  useEffect(() => {
    loadHouses();
  }, []);

  return (
    <div className="w-full min-h-screen bg-linear-to-t from-gray-800 to-gray-500 flex justify-center">
      <div className="w-xs md:w-7xl">
        <Header />
        <p className="text-xl text-white mt-8 mb-2">Minhas casas...</p>
        <main className="w-full bg-white rounded-lg p-5">
          <div className="w-full flex flex-col md:flex-row justify-center items-center p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {myHouses.map((house) => (
                <div className="w-60 md:w-80 flex flex-col mx-0 md:mx-8 mb-6">
                  <img src={house.thumbnail_url} alt="Imagem casa" className="w-80 h-50 mb-2" />

                  <p>{house.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <IoLocationSharp size={18} color="#FF0000" />
                    <p className="font-medium">{house.location}</p>
                  </div>
                  <div className="w-full flex items-center justify-between gap-2 mt-1">
                    <p className="font-medium text-lg">R$ {house.price} / DIA</p>
                    <button
                      className="bg-red-500 py-1 px-3 rounded text-white cursor-pointer"
                      onClick={() => handleDeleteHouse(house._id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
