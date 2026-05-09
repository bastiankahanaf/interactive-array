import { useState } from "react";

function App() {
  const baseData = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [data, setData] = useState(baseData);
  const [isDoubled, setIsDoubled] = useState(false);

  // tampilannya
  const displayData = isDoubled ? data.map((n) => n * 2) : data;

  const handleAdd = () => {
    const last = data.length ? data[data.length - 1] : 0;
    setData([...data, last + 1]);
  };

  const handleToggle = () => {
    setIsDoubled(!isDoubled);
  };

  const handleReset = () => {
    setData(baseData);
    setIsDoubled(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8 tracking-wide">
        Interactive Array
      </h1>

      {/* Buttons */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={handleAdd}
          className="bg-green-500 hover:bg-green-600 transition px-5 py-2 rounded-xl shadow-lg hover:scale-105 active:scale-95"
        >
          ➕ Tambah
        </button>

        <button
          onClick={handleToggle}
          className="bg-blue-500 hover:bg-blue-600 transition px-5 py-2 rounded-xl shadow-lg hover:scale-105 active:scale-95"
        >
          🔁 Kali 2
        </button>

        <button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-xl shadow-lg hover:scale-105 active:scale-95"
        >
          ✖ Reset
        </button>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap gap-4">
        {displayData.map((num, index) => (
          <div
            key={index}
            className="bg-gray-800/80 backdrop-blur-md border border-gray-700 
            px-5 py-3 rounded-2xl shadow-md 
            hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] 
            hover:border-white/50
            hover:scale-105 hover:-translate-y-1 
            transition-all duration-300 ease-in-out cursor-pointer"
          >
            <span className="text-lg font-semibold">{num}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
