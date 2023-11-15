import { useState } from "react";

// przykładowy komponent nie przywiązujmy się do niego
function App() {
  const [count, setCount] = useState(0);

  const handleCount = () => {
    setCount((c) => c + 1);
    // jeżeli chcemy zmienić stan na podstawie poprzedniego stanu,
    // to musimy użyć funkcji żeby nie było problemów z asynchronicznością
    // szczególnie jeżeli będziemy korzystali z websocketów
  };

  return (
    <>
      <div className="h-screen">
        <section className="p-2 shadow-lg">
          <div className="mx-auto w-fit text-center">
            <h1 className="text-4xl">Love Letter</h1>
            <h2>- The AKAI project -</h2>
          </div>
        </section>

        <section>
          Counter: {count}
          <button className="m-2 px-4 py-2 bg-slate-800 text-white rounded-md" onClick={handleCount}>
            Add 1
          </button>
        </section>
      </div>
    </>
  );
}

export default App;
