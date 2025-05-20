import { useState } from "react";
import "./App.css";
import { Pokemon } from "./Pokemon.jsx";

export default function App() {
  //Alle Gen-1 Pokemon werden geladen
  const pokemonList = [];
  const types = fetchTypes();
  let pokemonToDisplay = [];

  for (let i = 1; i <= 151; i++) {
    pokemonList.push(Pokemon(i));
  }

  //Wenn es Filter gäbe, würde hier aussortiert werden; dann bräuchte es auch noch einen Button, der 'pokemonToDisplay' neu rendert
  pokemonList.forEach((pokemon) => {
    pokemonToDisplay.push(pokemon);
  });

  //Die darzustellenden Pokemon werden gelistet
  const listItems = pokemonToDisplay.map((pokemon, i) => (
    <li key={i} className="pokemon">
      {displayPokemon(pokemon)}
    </li>
  ));

  //Die App wird ausgegeben
  return (
    <>
      <h1>Pokedex</h1>
      <div className="mainWindow">{listItems}</div>
      <div className="filterWindow">
        <h3>Filters</h3>
        <div className="filters">{filters(types)}</div>
      </div>
    </>
  );
}

function displayPokemon(pokemon) {
  return (
    <>
      <div className="id">{pokemon.id}</div>
      <img className="sprite" src={pokemon.sprite}></img>
      <div className="name">{pokemon.species}</div>
      <ul className="typeContainer">
        {pokemon.types.map((type, i) => (
          <img key={i} className="type" src={type.sprite}></img>
        ))}
      </ul>
    </>
  );
}

function fetchTypes() {
  const types = [];

  fetch("https://pokeapi.co/api/v2/type").then((res) =>
    res.json().then((data) => {
      data.results.forEach((type) => {
        fetch(type.url).then((resType) =>
          resType.json().then((dataType) => {
            types.push({
              name: type.name,
              sprite:
                dataType.sprites["generation-ix"]["scarlet-violet"].name_icon,
            });
          })
        );
      });
    })
  );

  return types;
}

function filters(types) {
  return types.map((type, i) => {
    <div key={i} className="filter">
      <div>{type.name}</div>
      <img src={type.sprite}></img>
    </div>;
  });
}
