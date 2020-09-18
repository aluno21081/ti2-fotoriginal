import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: "",
      descricao: "",
      categoria: "",
      image: "",
    };
  }

  actNome = (event) => {
    event.preventDefault();
    this.setState({
      nome: event.target.value,
    });
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

  onImageChange = event => {
    this.setState({ image: event.target.files[0] });
  };

  onSubmit = e => {
    e.preventDefault();

    let token = null;
    let userId = null;

    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      token = JSON.parse(localStorage.getItem('user')).jwt;
      userId = user.user.id;
    }

    const dados = {
      nome: this.state.nome,
      descricao: this.state.descricao,
      categoria: this.state.categoria,
      user: userId,
    }

    const config = {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }

    const formData = new FormData();
    formData.append('files', this.state.image);
    axios.post(`http://localhost:1337/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        dados.image = res.data[0].id;
        axios.post(`http://localhost:1337/Fotografias`, dados, config)
          .catch(err => { alert(err.message); })
          .then(res => {
            document.getElementById("formUpload").reset();
          })
      });

  };


  render() {
    return (
      <div className="container">
        <h3>Upload</h3>
        <form id="formUpload" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Nome:</label>
            <input className="form-control" type="text" onChange={this.actNome} />
          </div>
          <div className="form-group">
            <label >Descrição</label>
            <textarea className="form-control" rows="3" onChange={this.actDescricao}></textarea>
          </div>
          <div className="form-group">
            <label >Categoria</label>
            <select className="form-control" defaultValue="0" onChange={this.actCategoria}>
              <option value="0" disabled>Diga qual a categoria da fotografia</option>
              <option value="Animais">Animais</option>
              <option value="Arquitetura">Arquitetura</option>
              <option value="Desporto">Desporto</option>
              <option value="Natureza">Natureza</option>
              <option value="Noite">Noite</option>
              <option value="Retrato">Retrato</option>
              <option value="Outra">Outra</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="file"
              name="files"
              onChange={this.onImageChange}
              alt="image"
            />
          </div>
          <button type="submit" className="btn btn-primary">Adicionar</button>
        </form>
      </div>
    );
  }
}

export default Upload;