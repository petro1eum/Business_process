import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import ImageUpload from './components/ImageUpload';
import ProcessViewer from './components/ProcessViewer';
import ComparisonView from './components/ComparisonView';

function App() {
  const [processData, setProcessData] = useState<any>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Business Process Parser</h1>
      </header>
      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <ImageUpload 
                setProcessData={setProcessData} 
                setOriginalImage={setOriginalImage} 
              />
            } 
          />
          <Route 
            path="/view" 
            element={
              <ProcessViewer 
                processData={processData} 
              />
            } 
          />
          <Route 
            path="/compare" 
            element={
              <ComparisonView 
                processData={processData} 
                originalImage={originalImage} 
              />
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App; 