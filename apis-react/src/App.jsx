import React, { useState } from "react";
import Form from "./components/Form";
import Card from "./components/Card";
import "./App.css";

function App() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const API_KEY = "39054f9b59dc5ffde9d42dec7235705c"

  const handleSubmit = async ({ country, pokemon, city, launches }) => {
    setResults([]);
    setError(null);

    try {
      const newResults = [];

      // País
      const countryRes = await fetch(`https://restcountries.com/v3.1/name/${country}`);
      if (!countryRes.ok) throw new Error("País no encontrado");
      const countryData = await countryRes.json();
      newResults.push({
        title: `País: ${countryData[0].name.common}`,
        content: `Capital: ${countryData[0].capital} | Región: ${countryData[0].region}`,
        image: countryData[0].flags.png
      });

      // Pokémon
      const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
      if (!pokeRes.ok) throw new Error("Pokémon no encontrado");
      const pokeData = await pokeRes.json();
      newResults.push({
        title: `Pokémon: ${pokeData.name}`,
        content: `Altura: ${pokeData.height} | Peso: ${pokeData.weight}`,
        image: pokeData.sprites.front_default
      });

      // Clima
      const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`);
      if (!weatherRes.ok) throw new Error("Ciudad no encontrada");
      const weatherData = await weatherRes.json();
      newResults.push({
        title: `Clima en ${city}`,
        content: `Temp: ${weatherData.main.temp} °C | Condición: ${weatherData.weather[0].description}`,
        image: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
      });

      setResults(newResults);
      console.log(newResults)
    } catch (err) {
      setError(err.message);

    }

  };

  return (
    <div className="App">
      <h1 className="titulo">Consulta de APIs Públicas con React + Fetch</h1>
      <Form onSubmit={handleSubmit} />
      {error && <div className="card error">Error: {error}</div>}
      <div className="results">
        {results.map((res, idx) => (
          <Card key={idx} title={res.title} content={res.content} image={res.image} />
        ))}
      </div>
    </div>
  );
}

export default App;
