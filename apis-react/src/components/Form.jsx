import React, { useState } from "react";

function Form({ onSubmit }) {
    const [country, setCountry] = useState("");
    const [pokemon, setPokemon] = useState("");
    const [city, setCity] = useState("");
    const [launches, setLaunches] = useState(5);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ country, pokemon, city, launches });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Nombre del país:</label>
            <input value={country} onChange={(e) => setCountry(e.target.value)} />

            <label>Nombre del Pokémon:</label>
            <input value={pokemon} onChange={(e) => setPokemon(e.target.value)} />

            <label>Ciudad para clima:</label>
            <input value={city} onChange={(e) => setCity(e.target.value)} />

            <button type="submit">Consultar</button>
        </form>
    );
}

export default Form;