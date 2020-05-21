import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import Tabela from './Tabela';
import Formulario from './Formulario';
import Header from './Header';
import ApiService from './ApiService';
import PopUp from './PopUp';


class App extends Component {

  constructor(props) {

    super(props)

    this.state = {
      autores: [],
    };
  }

  removeAutor = id => {

    const { autores } = this.state;

    this.setState(
      {
        autores: autores.filter((autor) => {
          return autor.id !== id;
        }),
      }
    );
    PopUp.exibeMensagem("error", "Autor REMOVIDO com sucesso");
    ApiService.RemoveAutor(id);

  }

  escutadorDeSubmit = autor => {
    ApiService.CriaAutor(JSON.stringify(autor))
      .then(res => res.data)
      .then(autor => {
        this.setState({ autores: [...this.state.autores, autor] });
        PopUp.exibeMensagem("success", "Autor ADICIONADO com sucesso");
      });
  }

  componentDidMount() {
    ApiService.ListaAutores()
      .then(res => {
        this.setState({ autores: [...this.state.autores, ...res.data] })
      });

  }

  render() {
    return (
      <Fragment>
        <Header />
        <div className="container mb-10">
          <h1>Casa do código</h1>
          <Tabela autores={this.state.autores} removeAutor={this.removeAutor} />
          <Formulario escutadorDeSubmit={this.escutadorDeSubmit} />
        </div>
      </Fragment>
    );
  }
}

export default App;
