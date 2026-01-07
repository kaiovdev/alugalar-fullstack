import { Header } from "../../components/Header/Header";
import { IoLocationSharp } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

export function Home() {
  const [houses, setHouses] = useState([]);
  const [loadingHouses, setLoadingHouses] = useState(true);
  const [reserves, setReserves] = useState([]);
  const [loadingReserves, setLoadingReserves] = useState(true);

  async function loadHouses() {
    try {
      setLoadingHouses(true);

      const response = await api.get("/houses", {
        params: {
          status: true,
        },
      });

      setHouses(response.data);
    } catch (error) {
      console.error("Erro ao carregar casas", error);
    } finally {
      setLoadingHouses(false);
    }
  }

  async function loadReserves() {
    try {
      const response = await api.get("/reserves");
      setReserves(response.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar reservas");
    } finally {
      setLoadingReserves(false);
    }
  }

  useEffect(() => {
    loadHouses();
    loadReserves();
  }, []);

  async function handleReserve(house) {
    const user_id = localStorage.getItem("user_id");

    if (house.user === user_id) {
      alert("Você não pode reservar a própria casa");
      return;
    }

    const date = prompt("Digite a data da reserva");

    if (!date) {
      alert("Data é obrigatória");
      return;
    }

    try {
      await api.post(
        `/houses/${house._id}/reserve`,
        { date }, // BODY
        {
          headers: {
            user_id,
          },
        }
      );

      alert("Reserva realizada com sucesso!");
      loadReserves();
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao reservar");
    }
  }

  async function handleCancelReserve(reserveId) {
    const user_id = localStorage.getItem("user_id");

    const confirm = window.confirm("Deseja realmente cancelar esta reserva?");
    if (!confirm) return;

    try {
      await api.post(
        "/reserves/cancel",
        {
          reserve_id: reserveId,
        },
        {
          headers: {
            user_id,
          },
        }
      );

      alert("Reserva cancelada com sucesso");
      loadReserves();
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao cancelar reserva");
    }
  }

  return (
    <div className="w-full min-h-screen bg-linear-to-t from-gray-800 to-gray-500 flex justify-center">
      <div className="w-xs md:w-7xl">
        <Header />

        <main className="w-full">
          <p className="text-xl text-white mb-2">Reserve casas e muito mais...</p>
          <div className="w-full flex items-center justify-center bg-white rounded-xl">
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {houses.map((house) => (
                <div className="max-w-64 my-8 mx-5" key={house.id}>
                  <img src={house.thumbnail_url} alt="Imagem casa" className="w-64 h-40" />
                  <p className="mt-2 text-base">{house.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <IoLocationSharp size={18} color="#FF0000" />
                    <p className="font-medium">{house.location}</p>
                  </div>
                  <div className="w-full flex items-center justify-between gap-2 mt-1">
                    <p className="font-medium text-lg">R$ {house.price} / DIA</p>
                    <button
                      className="bg-blue-500 py-1 px-3 rounded text-white cursor-pointer"
                      onClick={() => handleReserve(house)}
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xl text-white mt-8 mb-2">Minhas reservas...</p>

          <div className="w-full px-10 py-5 grid grid-cols-1 lg:grid-cols-2 content-center bg-white rounded-xl mb-10">
            {reserves.length === 0 && <p className="text-gray-500">Você não possui reservas.</p>}
            {reserves.map((reserve) => {
              if (!reserve.house) return null;
              return (
                <div className="w-full flex flex-col items-center justify-center md:w-xl md:flex-row my-5">
                  <img src={reserve.house.thumbnail_url} alt="Imagem casa" className="w-60 h-40" />
                  <div className="w-full ml-3 flex flex-col text-lg mt-4 md:mt-0 gap-y-3">
                    <p className="flex flex-row items-center gap-2">
                      <FaRegCalendarAlt size={20} color="#FF0000" />
                      <span>{reserve.date}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <IoLocationSharp size={22} color="#FF0000" />
                      <span>{reserve.house.location}</span>
                    </p>
                    <button
                      className="bg-red-500 py-1 px-4 rounded text-white cursor-pointer"
                      onClick={() => handleCancelReserve(reserve._id)}
                    >
                      Cancelar reserva
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
