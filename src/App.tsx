import { useEffect, useState } from 'react';
// import reactLogo from './assets/react.svg';
import _axios from 'axios';
import fileDownload from 'js-file-download';
import './App.css';
import ApiService from './services/apiService';
import instance from './services/axios';

interface Photo {
  id: number;
  fileName: string;
  contentType: string;
}

function App() {
  const [photos, setPhotos] = useState<Array<Photo>>();

  async function fetchPhotos() {
    setPhotos(await ApiService.getPhotos());
  }

  useEffect(() => {
    fetchPhotos();
  }, []);

  // console.log(...(photos || []));

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  async function downloadFile(id: number, fileName: string) {
    const data = await ApiService.fetchFile(id);
    fileDownload(data, fileName);
  }
  async function removePhoto(id: number) {
    console.log(
      '❌ DELETE',
      photos?.find(p => p.id === id)
    );
    await ApiService.deletePhoto(id);
    fetchPhotos();
  }

  async function uploadFile(file: File | null) {
    if (file) {
      const formData = new FormData();
      formData.append('data', file);
      await ApiService.postFile(formData);

      console.log('✅ ADD', file);
      fetchPhotos();
    }
  }

  return (
    <div className='app'>
      <div className='upload'>
        <input type='file' title='' onChange={handleFileChange} />
        <button id='upload-button' onClick={() => uploadFile(file)}>
          Upload
        </button>
      </div>
      {photos?.map(photo => (
        <Card key={photo.id} downloadFile={downloadFile} removePhoto={removePhoto} {...photo} />
      ))}
    </div>
  );
}

export default App;

type CardProps = Photo & {
  removePhoto: (id: number) => void;
  downloadFile: (id: number, filename: string) => void;
};

function Card(props: CardProps) {
  const { id, contentType, fileName, removePhoto, downloadFile } = props;
  return (
    <div className='card'>
      <button onClick={() => removePhoto(id)}>X</button>
      <button style={{ marginLeft: '1rem' }} onClick={() => downloadFile(id, fileName)}>
        Download
      </button>
      <footer style={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
        <p>
          <span>ID: </span>
          {id}
        </p>
        <p>
          <span>FILENAME: </span>
          {fileName}
        </p>
        <p>
          <span>CONTENT_TYPE: </span>
          {contentType}
        </p>
        <br />
      </footer>
    </div>
  );
}
