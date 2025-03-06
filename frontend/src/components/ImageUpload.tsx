import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import './ImageUpload.css';

interface ImageUploadProps {
  setProcessData: (data: any) => void;
  setOriginalImage: (imageUrl: string | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setProcessData, setOriginalImage }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      
      // Create preview
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      setOriginalImage(objectUrl);
      setError(null);
    }
  }, [setOriginalImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1
  });

  const handleUpload = async () => {
    if (!file) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/api/process/parse', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setProcessData(response.data);
      navigate('/view');
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to process the image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-upload-container">
      <h2>Upload Business Process Diagram</h2>
      <p>Upload a screenshot of a business process diagram to parse and visualize it</p>
      
      <div 
        {...getRootProps()} 
        className={`dropzone ${isDragActive ? 'active' : ''}`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="image-preview" />
            <p>Click or drag to replace</p>
          </div>
        ) : (
          <p>Drag & drop an image here, or click to select</p>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <button 
        className="upload-button" 
        onClick={handleUpload} 
        disabled={!file || loading}
      >
        {loading ? 'Processing...' : 'Process Image'}
      </button>
    </div>
  );
};

export default ImageUpload; 