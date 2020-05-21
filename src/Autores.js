import React, { Component, Fragment } from 'react';
import Header from './Header';

import DataTable from './DataTable';
import ApiService from './ApiService';
import PopUp from './PopUp';

class Autores extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nomes: [],
      titulo: 'Autores'
    }
  }

  componentDidMount() {
    ApiService.ListaNomes()
      .then(res => ApiService.TrataErros(res))
      .then(res => {

        if (res.message === 'success') {
          PopUp.exibeMensagem("success", "Autores listado com SUCESSO");
          this.setState({ nomes: [...this.state.nomes, ...res.data] });

        }
      })
      .catch(err => PopUp.exibeMensagem("error", "Erro ao tentar listar os Nomes dos Autores"));

  }

  render() {
    return (
      <Fragment>
        <Header />
        <div className="container">
          <h1>Autores</h1>
          <DataTable dados={this.state.nomes} titulo={this.state.titulo} colunas={['nome']} />

        </div>

      </Fragment>
    );
  }
}
export default Autores;