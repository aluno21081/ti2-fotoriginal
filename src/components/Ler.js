import React from 'react';
import axios from 'axios';

export default class Upload extends React.Component {
    state = {
        descricao: "",
        categoria: "",
        foto: null
    }

    actDescricao = (event) => {
      event.preventDefault();
      this.setState({
        descricao: event.target.value,
      });
  }

  actCategoria = (event) => {
      event.preventDefault();
      this.setState({
        categoria: event.target.value,
      });
  }

  actFoto = (event) => {
    event.preventDefault();
    this.setState({
        foto: event.target.files[0]
    });
}


    handleSubmit = event => {
        event.preventDefault();

        const dados = {
            descricao: this.state.descricao,
            categoria: this.state.categoria,
        };

        axios.post(`http://localhost:1337/Brunos`, dados)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

render() {
  return (
    <div class="container">
      <br />
      <h3>Upload</h3>
      <br />
      <form onSubmit={this.handleSubmit}>
        <div class="form-group">
          <label >Descrição</label>
          <textarea class="form-control" rows="3" onChange={this.actDescricao}></textarea>
        </div>
        <div class="form-group">
          <label >Categoria</label>
          <select class="form-control" onChange={this.actCategoria}>
            <option selected>Diga qual a categoria da fotografia</option>
            <option>Animais</option>
            <option>Arquitetura</option>
            <option>Desporto</option>
            <option>Natureza</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Add</button>
      </form>
    </div>
  );
} 
}