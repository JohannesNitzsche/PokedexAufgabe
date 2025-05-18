import { useState } from "react";
import "./App.css";
import { Pokemon } from "./Pokemon.jsx";

export default function App() {
  //Alle Gen-1 Pokemon werden geladen
  const pokemonList = [];
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
      {pokemon}
    </li>
  ));

  //Die App wird ausgegeben
  return (
    <>
      <h1>Pokedex</h1>
      <div className="mainWindow">{listItems}</div>
    </>
  );
}
