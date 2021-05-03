import React, { Component } from 'react';
import axios from 'axios';

import Header from './components/Header';
import pokedex from './img/pokedex.png';

import './css/app.css';

// Will change this from a list to look like a real pokedex

// test

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonNumber: 1,
      pokemonName: '',
      sprite: '',
      types: [],
    };
  }

  componentDidMount = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonNumber}`)
      .then((res) => {
        this.setState({
          pokemonName: res.data.name,
          sprite: res.data.sprites.front_default,
          types: res.data.types,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handlePokemonChange = (value) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${value}`)
      .then((res) => {
        this.setState({
          pokemonNumber: res.data.id,
          pokemonName: res.data.name,
          sprite: res.data.sprites.front_default,
          types: res.data.types,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    console.log(this.state);

    return (
      <div className="App">
        <Header />
        <div className="pokemonBox">
          <img src={pokedex} alt="pokedex" className="pokedex" />
          <img className="pokemonImg" src={this.state.sprite} alt="" />
          <button
            id="next"
            onClick={() => {
              let num = this.state.pokemonNumber + 1;
              this.handlePokemonChange(num);
            }}
          >
            {`>`}
          </button>
          <button
            id="prev"
            onClick={() => {
              let num = this.state.pokemonNumber - 1;
              this.handlePokemonChange(num);
            }}
          >
            {`<`}
          </button>
          <span id="number"># {this.state.pokemonNumber}</span>
          <p id="name">{this.state.pokemonName}</p>
          {this.state.types.length !== 0 ? (
            <p className="type one">{this.state.types[0].type.name}</p>
          ) : null}
          {this.state.types.length === 2 ? (
            <p className="type two">{this.state.types[1].type.name}</p>
          ) : null}
        </div>
        {/* <button onClick={this.handleShowPokemon}>Show Pokemon</button> */}
        {/* <Button name="Next" buttonFn={this.handlePokemonChange} />
        <Button name="Prev" buttonFn={this.handlePokemonChange} /> */}
        {/* <ol>
          {this.state.show ? (
            <PokemonListDisplay pokemon={this.state.pokemon} />
          ) : null}
        </ol> */}
      </div>
    );
  }
}
