import { useEffect, useState } from "react";
import "./App.css";
import { Pokemon } from "./Pokemon.jsx";

const typeList = loadTypes();
const activeFilters = [];
let pokemonToDisplay = [];

export default function App() {
  //Alle Gen-1 Pokemon werden geladen
  const pokemonList = [];

  for (let i = 1; i <= 151; i++) {
    pokemonList.push(Pokemon(i));
  }

  //Wenn es Filter gäbe, würde hier aussortiert werden; dann bräuchte es auch noch einen Button, der 'pokemonToDisplay' neu rendert
  pokemonToDisplay = filterPokemon(pokemonList);

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
        <div className="filters">{createfilters(typeList, pokemonList)}</div>
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
          <img key={i} className="type" src={typeList.get(type)}></img>
        ))}
      </ul>
    </>
  );
}

function loadTypes() {
  const types = new Map();

  fetch("https://pokeapi.co/api/v2/type").then((res) =>
    res.json().then((data) => {
      for (let i = 0; i < 18; i++) {
        fetch(data.results[i].url).then((resType) =>
          resType.json().then((dataType) => {
            types.set(
              data.results[i].name,
              dataType.sprites["generation-ix"]["scarlet-violet"].name_icon
            );
          })
        );
      }
    })
  );

  return types;
}

function filterPokemon(pokemonList) {
  const filteredPokemon = [];
  if (activeFilters.length != 0) {
    pokemonList.forEach((pokemon) => {
      pokemon.types.forEach((type) => {
        if (
          activeFilters.includes(type) &&
          !filteredPokemon.includes(pokemon)
        ) {
          filteredPokemon.push(pokemon);
        }
      });
    });
  } else {
    pokemonList.forEach((pokemon) => {
      filteredPokemon.push(pokemon);
    });
  }

  return filteredPokemon;
}

function createfilters(typeList, pokemonList) {
  return Array.from(typeList.keys()).map((type, i) => {
    return (
      <div key={i} className="filter">
        <img className="filterSprite" src={typeList.get(type)}></img>
        <input
          className="filterCheck"
          type="checkbox"
          id={type}
          onChange={(event) => {
            if (event.target.checked) {
              activeFilters.push(event.target.id);
            } else {
              activeFilters.splice(activeFilters.indexOf(event.target.id), 1);
            }

            pokemonToDisplay = filterPokemon(pokemonList);
          }}
        />
      </div>
    );
  });
}
