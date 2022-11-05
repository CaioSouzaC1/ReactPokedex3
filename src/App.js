import React, { useEffect, useState } from "react";
import "./css/master.scss";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/pokeball.css";

function App() {
  useEffect(() => findPokemon());
  const [select, setSelect] = useState();
  const [artStyle, setArtStyle] = useState();
  if (select == undefined) {
    setSelect(1);
  }

  const findPokemon = () => {
    const pokeUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;
    let generations = 150 * select;
    const pokePromisses = [];
    let i = 1;
    if (select == 2) {
      i = 152;
      generations = 251;
    }
    if (select == 3) {
      i = 252;
      generations = 386;
    }
    if (select == 4) {
      i = 387;
      generations = 494;
    }
    if (select == 5) {
      i = 495;
      generations = 649;
    }
    const pokeCards = document.getElementsByClassName("pokeName");
    const filter = document.getElementById("filter");
    filter.addEventListener("input", (event) => {
      const filterValue = event.target.value.toUpperCase();
      Array.from(pokeCards).map((P) => {
        const PokeNameItem = P.innerText;
        const onlyId = P.id.split("-")[1];
        if (P.innerText.toUpperCase().includes(filterValue)) {
          document.getElementById(onlyId).classList.add("block");
          document.getElementById(onlyId).classList.remove("none");
        } else {
          document.getElementById(onlyId).classList.add("none");
          document.getElementById(onlyId).classList.remove("block");
        }
      });
    });

    for (i; i <= generations; i++) {
      pokePromisses.push(fetch(pokeUrl(i)).then((res) => res.json()));
    }
    Promise.all(pokePromisses).then((poke) => {
      const listPoke = poke.reduce((accumulator, pokemon) => {
        let typesFC = pokemon.types[0].type.name;
        let firstLetter = pokemon.name[0].toUpperCase();
        let restName = pokemon.name.slice(1);

        let types = pokemon.types.map((typeInfo) => {
          const firstLetterType = typeInfo.type.name[0].toUpperCase();
          const resttLettersType = typeInfo.type.name.slice(1);
          const text = " " + firstLetterType + resttLettersType;
          return text;
        });

        let abilities = pokemon.abilities.map((abilitiesInfo) => {
          const firstLetterType = abilitiesInfo.ability.name[0].toUpperCase();
          const resttLettersType = abilitiesInfo.ability.name.slice(1);
          const text = " " + firstLetterType + resttLettersType;
          return text;
        });

        const barnav = document.querySelector(".barnav");
        barnav.classList.add("block");
        barnav.classList.remove("none");
        const cont = document.querySelector("#secondSec");
        cont.classList.add("secondSecClass");
        cont.classList.remove("none");

        let url =
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";
        let format = ".svg";

        let pokeId = String(pokemon.id);

        if (artStyle == 1) {
          url =
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";
          format = ".svg";
        }

        if (artStyle == 3) {
          url = "https://urpgstatic.com/img_library/pokemon_icons_ani/";
          format = ".gif";
          pokeId =
            String(pokemon.id).length == 1
              ? "00" + String(pokemon.id)
              : String(pokemon.id).length == 2
              ? "0" + String(pokemon.id)
              : String(pokemon.id);
        }

        if (artStyle == 4) {
          url = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/";
          format = ".png";
          pokeId =
            String(pokemon.id).length == 1
              ? "00" + String(pokemon.id)
              : String(pokemon.id).length == 2
              ? "0" + String(pokemon.id)
              : String(pokemon.id);
        }
        if (artStyle == 5) {
          url = "https://play.pokemonshowdown.com/sprites/ani/";
          format = ".gif";
          // pokeId = String(pokemon.name).replace("-", "");
          pokeId = String(pokemon.name).split("-")[0];
          if (pokemon.id == 439) {
            pokeId = "mimejr";
          }

          if (pokemon.id == 122) {
            pokeId = "mrmime";
          }

          if (pokemon.id == 250) {
            pokeId = "hooh";
          }
        }

        const pokeNameTwo = firstLetter + restName;

        accumulator += `
      <div id="${pokemon.id}" class='col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 block'>
      <div class="scene">
      <div class='cardpoke ${typesFC}'>
        <div class="card__face card__face--front">
        <div class="mt-3 mb-2 w-100">
       <span>${pokemon.id} - </span><span id="Name-${pokemon.id}" class="pokeName">${pokeNameTwo}<span>
        </div>
          <img class="imgfront" src="${url}${pokeId}${format}" />
          <p class="pokeType">${types}</p>
        </div>
        <div class="card__face card__face--back">
        <div class="mt-2 mb-2 w-90">
        <div class="Abilities">Abilities:</div> <p class="paragraph-m0">${abilities}</p>
        <div class="Abilities">Xp base: <span class="numback">${pokemon.base_experience}.</span></div>
        <div class="Abilities">Height: <span class="numback">${pokemon.height}.</span></div>
        <div class="Abilities">Weight: <span class="numback">${pokemon.weight}.</span></div>
        <div class="d-flex">
        <img class="backImage" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" />
        <img class="backImage" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png" />
        </div>
        </div>
        </div>
      </div>
      </div>
      </div>
      
      `;
        return accumulator;
      }, "");

      const row = document.getElementById("row");

      row.innerHTML = listPoke;
    });
  };

  useEffect(() => {
    document.getElementById("filter").value = "";
  }, [select]);

  return (
    <div>
      <div className=" mt-3 w-100 barnav container none">
        <div className="myPoke">
          <div className="pokedex">React PokeDex</div>
          <div className="divCenter"></div>
          <div className="cursor">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              className="bi bi-hand-index-thumb negativemt"
              viewBox="0 0 16 16"
            >
              <path d="M6.75 1a.75.75 0 0 1 .75.75V8a.5.5 0 0 0 1 0V5.467l.086-.004c.317-.012.637-.008.816.027.134.027.294.096.448.182.077.042.15.147.15.314V8a.5.5 0 0 0 1 0V6.435l.106-.01c.316-.024.584-.01.708.04.118.046.3.207.486.43.081.096.15.19.2.259V8.5a.5.5 0 1 0 1 0v-1h.342a1 1 0 0 1 .995 1.1l-.271 2.715a2.5 2.5 0 0 1-.317.991l-1.395 2.442a.5.5 0 0 1-.434.252H6.118a.5.5 0 0 1-.447-.276l-1.232-2.465-2.512-4.185a.517.517 0 0 1 .809-.631l2.41 2.41A.5.5 0 0 0 6 9.5V1.75A.75.75 0 0 1 6.75 1zM8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v6.543L3.443 6.736A1.517 1.517 0 0 0 1.07 8.588l2.491 4.153 1.215 2.43A1.5 1.5 0 0 0 6.118 16h6.302a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5.114 5.114 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.632 2.632 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046l-.048.002zm2.094 2.025z" />
            </svg>{" "}
            for more details
          </div>
        </div>
        <div className="center-on-page sticky-top">
          <div className="pokeball">
            <div className="pokeball__button"></div>
          </div>
        </div>
      </div>

      <div className="container vhsete">
        <div id="secondSec" className="none">
          <span>
            <label htmlFor="Gen" className="text-white">
              Chose Generation
            </label>
            <select
              id="Gen"
              value={select}
              defaultValue={1}
              onChange={(e) => setSelect(e.target.value)}
            >
              <option value={1}>1º</option>
              <option value={2}>2º</option>
              <option value={3}>3º</option>
              <option value={4}>4º</option>
              <option value={5}>5º</option>
            </select>
          </span>
          <span>
            <label htmlFor="artStyle" className="text-white">
              Chose Art Style
            </label>
            <select
              id="artStyle"
              value={artStyle}
              defaultValue={1}
              onChange={(e) => setArtStyle(e.target.value)}
            >
              <option value={1}>PokeAPI</option>
              <option value={4}>Oficial Images</option>
              <option value={3}>Unova Gif</option>
              <option value={5}>ShowDown Gif</option>
            </select>
          </span>
          <span>
            <label className="text-white" htmlFor="filter">
              Filter Pokemons
            </label>
            <input id="filter" placeholder="Dragonite"></input>
          </span>
        </div>
        <div id="row" className="row"></div>
      </div>
      <div className="barnav text-center">
        <a target="_blank" href="https://github.com/CaioSouzaC1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            fill="currentColor"
            className="text-white bi bi-github"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default App;
