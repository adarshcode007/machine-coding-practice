import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [focus, setFocus] = useState(false);
  const [cache, setCache] = useState({});

  const fetchData = async () => {
    if (cache[input]) {
      console.log("CACHE RETURNED ", cache[input]);
      setResults(cache[input]);
      return;
    }

    console.log("API CALL ", input);
    const res = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const json = await res.json();
    setResults(json?.recipes);
    setCache((prev) => ({ ...prev, [input]: json?.recipes }));
  };

  useEffect(() => {
    const timer = setTimeout(fetchData, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div>
      <h1>Autocomplete Search Bar</h1>
      <div>
        <input
          type="text"
          className="search-input"
          value={input}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => setInput(e.target.value)}
        />
        {focus && (
          <div className="result-container">
            {results.map((result) => (
              <span className="result" key={result.id}>
                {result.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
