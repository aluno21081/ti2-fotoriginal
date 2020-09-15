import React from 'react';

const ImageCard = ({ image }) => {
  const cats = image.categoria.split(',');

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img src={'http://localhost:1337' + image.image.url} alt="" className="w-full"/>
      <div className="px-6 py-4">
        <div className="font-bold text-purple-500 text-xl mb-2">
          {/* Photo by {image.created_by.firstname + ' ' + image.created_by.lastname} */}
        Nome {image.nome} 
        </div>
        <ul>
          <li>
            <strong>Created date: </strong>
            {new Date(image.created_at).toLocaleDateString()}
          </li>
          <li>
            <strong>Descricao: </strong>
            {image.descricao}
          </li>
          <li>
            <strong>Photo by: </strong>
            {image.user.username}
          </li>
          {/* <li>
            <strong>Downloads: </strong>
            {image.downloads}
          </li>
          <li>
            <strong>Likes: </strong>
            {image.likes}
          </li> */}
        </ul>
      </div>
      <div className="px-6 py-4">
        {cats.map((cat, index) => (
          <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {cat}
        </span>
        ))}
      </div>
    </div>
  )
}

export default ImageCard;
