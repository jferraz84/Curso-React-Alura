import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './Home.css';
import Header from '../../Components/Header/Header';
import Tabela from '../../Components/Tabela/Tabela';
import Formulario from '../../Components/Formulario/Formulario';
import PopUp from '../../utils/PopUp';
import ApiService from '../../utils/ApiService';

class Home extends Component {

  constructor(props) {

    super(props)

    this.state = {
      autores: [],
    };
  }

  removeAutor = id => {

    const { autores } = this.state;

    const autoresAtualizado = autores.filter(autor => {
        return autor.id !== id;
    });
    ApiService.RemoveAutor(id)
              .then(res =>{
                if(res.message === 'deleted'){
                  this.setState({autores : [...autoresAtualizado]})
                  PopUp.exibeMensagem("error", "Autor REMOVIDO com sucesso");
                }
              })
              .catch(err => PopUp.exibeMensagem("error", "Erro ao tentar Remover"));

  }

  escutadorDeSubmit = autor => {
    ApiService.CriaAutor(JSON.stringify(autor))
      .then(res => {
        if (res.message === 'success') {
          this.setState({autores : [...this.state.autores, res.data]});
          PopUp.exibeMensagem("success", "Autor ADICIONADO com sucesso");

        }
      })
      .catch(err => PopUp.exibeMensagem("error", "Erro ao tentar criar o Autor"));
  }

  componentDidMount() {
    ApiService.ListaAutores()
      .then(res => {
        if (res.message === 'success') {
          this.setState({ autores: [...this.state.autores, ...res.data]});

        }
      })
      .catch(err => PopUp.exibeMensagem("error", "Erro ao tentar listar os Autores"));;

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
      </Fragment >
    );
  }
}

export default Home;
