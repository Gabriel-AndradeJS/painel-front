'use client';

import { useState } from "react";
import { useContextApi } from "@/context/contextApi";

interface optionsPoll {
  name: string;
  votes: number;
  id: number;
}

interface Props {
  id: number;
  title: string;
  category: string;
  options: optionsPoll[];
}

export default function Home() {
  const { fetchPolls } = useContextApi();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 2;
  const offset = (page - 1) * limit;

  const { data, isLoading, error } = fetchPolls({ limit, offset });

  const filteredData = data?.filter((item: Props) => {
    const searchLower = search.toLowerCase();
    return (
      item.title.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower)
    );
  });

  const isNextDisabled = !filteredData || filteredData.length < limit;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold uppercase mb-4">Painel de Votação</h1>

      <div className="bg-white border-t-2 border-r-2 border-l-2 border-black w-full max-w-sm rounded-t-lg flex items-center p-3">
        <input
          className="w-full p-2 border-2 border-black rounded-md focus:outline-none"
          type="text"
          placeholder="Buscar enquetes por título ou categoria"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col border-2 border-black w-full max-w-sm rounded-b-lg bg-white">
        <div className="p-4 flex flex-col gap-5">
          <p className="text-sm text-gray-500 mb-1">Mais Popular</p>

          {isLoading && <p className="text-gray-500">Carregando...</p>}
          {error && <p className="text-red-500">Erro ao carregar dados</p>}

          {filteredData && filteredData.length > 0 ? (
            filteredData.map((item: Props) => (
              <div key={item.id} className="flex justify-between items-center">
                <h2 className="text-md font-semibold">{item.title}</h2>
                <button className="text-[15px] border-2 border-black text-black px-4 py-1 rounded-md cursor-pointer">
                  Votar
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nenhuma enquete encontrada.</p>
          )}
        </div>

        <div className="flex justify-between p-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="border border-black px-3 py-1 rounded disabled:opacity-50"
          >
            Anterior
          </button>

          <span className="self-center">Página {page}</span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={isNextDisabled}
            className="border border-black px-3 py-1 rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>
    </main>
  );
}
