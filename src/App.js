import React, { useState, useEffect } from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Upload from './components/Upload';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  const [images, setImages] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    setImages([]);
    fetch(`http://localhost:1337/Fotografias`)
      .then(res => res.json())
      .then(data => {
        data.reverse();
        console.log(data);
        setImages(data);
        setAllImages(data);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, [term]);

  const search = (text) => {
    console.log(text);
    if (text) {
      const results = allImages.filter(item => {
        console.log(item);
        return (item.nome && item.nome.toLowerCase().includes(text.toLowerCase())) ||
          (item.descricao && item.descricao.toLowerCase().includes(text.toLowerCase())) ||
          (item.user.username && item.user.username.toLowerCase().includes(text.toLowerCase()));
      }
      );
      setImages(results);
    } else {
      setImages(allImages);
    }

  };

  const setCategoria = (categoria) => {
    console.log(categoria);

    if (categoria) {
      const results = allImages.filter(item => {
        console.log(item);
        return (item.categoria && item.categoria.toLowerCase().includes(categoria.toLowerCase()));
      }
      );
      setImages(results);
    } else {
      setImages(allImages);
    }
  }

  return (
    <Router>
      <div className="container mx-auto">
        <Header setCategoria={(categoria) => setCategoria(categoria)} />
        <Switch>
          <Route exact path="/">
            <ImageSearch searchText={(text) => search(text)} />

            {!isLoading && images && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">Não foi encontrada nenhuma imagem!</h1>}

            {isLoading || !images ? <h1 className="text-6xl text-center mx-auto mt-32">Carregando...</h1> : <div className="grid grid-cols-3 gap-4">
              {
                images.map(image => (
                  <ImageCard key={image.id} image={image} />
                ))}
            </div>}
          </Route>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
