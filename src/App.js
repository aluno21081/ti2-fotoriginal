import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Upload from './components/Upload';
import Ler from './components/Ler';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// como ler dados dos campos
// como enviar dados e receber dados nos components
// mudar este fetch para axios

function App() {
  const [images, setImages] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

   useEffect(() => {
    setImages([]);
    // fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
    fetch(`http://localhost:1337/Fotografias`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setImages(data);
        setAllImages(data);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, [term]); 

  const search = (text) => {
    console.log(text);
    if(text) {
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

    if(categoria) {
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

            {!isLoading && images && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1>}

            {isLoading || !images ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : <div className="grid grid-cols-3 gap-4">
              {images.map(image => (
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
          <Route path="/ler">
            <Ler />
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
