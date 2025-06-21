

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold uppercase">Painel de Votação</h1>

      <div className="bg-white border-t-2 border-r-2 border-l-2 border-black w-full max-w-sm rounded-t-lg flex items-center p-3">
        <input
          className="w-full p-2 border-2 border-black rounded-md focus:outline-none"
          type="text"
          placeholder="Buscar enquetes por categorias"
        />
      </div>

      <div className="flex flex-col border-2 border-black w-full max-w-sm rounded-b-lg bg-white">
        <div className="p-4 flex flex-col gap-5">
          <p className="text-sm text-gray-500 mb-1">Mais Popular</p>

          <div className="flex justify-between items-center">
            <h2 className="text-md font-semibold">
              Qual seu framework favorito?
            </h2>
            <button className="text-[15px] border-2 border-black text-black px-4 py-1 rounded-md cursor-pointer">
              Votar
            </button>
          </div>

          <div className="flex justify-between items-center">
            <h2 className="text-md font-semibold">
              Qual banco você prefere?
            </h2>
            <button className="text-[15px] border-2 border-black text-black px-4 py-1 rounded-md cursor-pointer">
              Votar
            </button>
          </div>
        </div>
      </div>

    </main>
  );
}
