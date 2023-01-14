import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);

  // Called on onChange event when user uploads file
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Uploads images and receives image for rendering
  const sendAndRenderFile = (formData) => {
    axios.post("http://127.0.0.1:8000/img", formData, {responseType: 'blob'})
      .then(res => {
        setImage(URL.createObjectURL(res.data));
      })
  };

  // Send uploaded file as formdata body
  const onFileUpload = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("uploaded_file", selectedFile, selectedFile.name);
    sendAndRenderFile(formData);
  };

  return (
    <div>
      <h1>FastAPI UploadFile Pratice</h1>
      <h3>File Upload using React</h3>
      <div>
        <input type="file" accept="image/png, image/jpeg" onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload</button>
      </div>
      {image && <img src={image} alt="uploaded file" />}
    </div>
  );
};

export default App;