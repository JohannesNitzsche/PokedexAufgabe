import { use, useState } from "react";
import "./pokemon.css";

//Pokemon Class, um für jedes Pokemon ein eigenes Objekt zu erstellen
export const Pokemon = function (num) {
  //Klassenvariablen
  const id = num;
  const [species, setSpecies] = useState();
  const [sprite, setSprite] = useState();
  const [types, setTypes] = useState([]);

  //Die URL für das spezifische Pokemon wird erstellt
  let url = "https://pokeapi.co/api/v2/pokemon/" + id;

  //Die Daten werden von der API gefetched und in die Klassenvariablen überschrieben
  if (species == null) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSpecies(capitalize(data.name));
        setSprite(data.sprites.front_default);
        let temp = [];
        data.types.forEach((element) => {
          fetch(element.type.url).then((resType) =>
            resType.json().then((dataType) => {
              temp.push(
                dataType.sprites["generation-ix"]["scarlet-violet"].name_icon
              );
            })
          );
        });
        setTypes(temp);
      });
  }

  //Die erhaltenen Daten werden als Komponenten zurückgegeben
  return (
    <>
      <div className="id">{id}</div>
      <img className="sprite" src={sprite}></img>
      <div className="name">{capitalize(species)}</div>
      <ul className="typeContainer">
        {types.map((type, i) => (
          <img key={i} className="type" src={type}></img>
        ))}
      </ul>
    </>
  );
};

//Funktion die den Wortanfang großschreibt
function capitalize(str) {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}
