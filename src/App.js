import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";

function App() {
  const [pokeData, setPokeData] = useState("");
  const [pokeDisplay, setPokemonDisplayArray] = useState([]);

  useEffect(() => {
    console.log("loaded data");
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .catch((error) => {
        console.log(error);
      })
      .then((output) => {
        setPokeData(output.data.results);
      });
  }, []);

  function typeHandler(event) {
    const myReg = new RegExp(event.target.value, "ig");

    setPokemonDisplayArray(pokeData.filter((x) => x.name.match(myReg)));
  }

  function findImage(url) {
    let matchit = "" + url.match(/[^v2]([0-9]+)/gi);
    matchit = matchit.substring(1);
    return (
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
      matchit +
      ".png"
    );
  }

  const pokemonClickHandler = (props) => {
    console.log(props.target)
  }

  return (
    <div className="App">
      <div className="baner">
        <TextField
          id="outlined-basic"
          onChange={typeHandler}
          label="Search Pokemon"
          variant="outlined"
        />
      </div>

      <div className="pokecontainer">
        {pokeDisplay.map((x) => {
          return (
            <div className="pokemon" onClick={pokemonClickHandler}>
              <img
                alt={x.name}
                width={100}
                height={100}
                src={findImage(x.url)}
              ></img>
              <div className="pokename">{x.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
