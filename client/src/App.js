import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './service/api';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');
  const fileInputRef = useRef();

  const url = 'https://i.pinimg.com/originals/16/46/24/1646243661201a0892cc4b1a64fcbacf.jpg';

// client/src/App.js (inside the component)
useEffect(() => {
  const getImage = async () => {
    if (file) {
      const data = new FormData();
      data.append("name", file.name);
      data.append("file", file);

      const response = await uploadFile(data);
      setResult(response.path);
    }
  };
  getImage();
}, [file]);


  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='container'>
      <img src={url} className='img' alt="banner" />
      <div className='wrapper'>
        <h1>Simple file sharing!</h1>
        <p>Upload and share the download link.</p>

        <button onClick={onUploadClick}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        {result && (
          <div className="result-box">
            <p>Your download link:</p>
            <input type="text" readOnly value={result} />
            <button onClick={() => navigator.clipboard.writeText(result)}>Copy Link</button>
            <a href={result} target='_blank' rel='noreferrer'>Download</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;