import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file)

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const { fileName, filePath } = res.data

      setUploadedFile({ fileName, filePath});

    } catch(err) {
      let message;
      if (err.reponse.status === 500) {
        message = 'There was a problem with the server'
      } else {
        message = 'Everything went fine'
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" id="file" onChange={onChange} />
          <label htmlFor="file"></label>
        </div>
        <input type="submit" value="Télécharger" />
      </form>
      {uploadedFile ? (
        <div>
          <img src={uploadedFile.filePath} alt=""/>
          <p>{uploadedFile.fileName}</p>
        </div>
      )
    : null}
    </div>
  )


  


}

export default FileUpload;
