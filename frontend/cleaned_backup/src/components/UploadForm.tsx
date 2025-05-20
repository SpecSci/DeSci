"use client";

import { useState, useRef, useCallback } from "react";

export function UploadForm() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [metadata, setMetadata] = useState({
    title: "",
    description: "",
    molecule: "",
    technique: "Absorption",
    author: "",
  });
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).filter(
        file => file.type === "text/csv" || file.name.endsWith(".csv") || file.name.endsWith(".txt")
      );
      setFiles(prev => [...prev, ...newFiles]);
    }
  }, []);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).filter(
        file => file.type === "text/csv" || file.name.endsWith(".csv") || file.name.endsWith(".txt")
      );
      setFiles(prev => [...prev, ...newFiles]);
    }
  }, []);
  
  const handleMetadataChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMetadata(prev => ({ ...prev, [name]: value }));
  }, []);
  
  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);
  
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      alert("Please select at least one file");
      return;
    }
    
    setUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setUploading(false);
        setFiles([]);
        setProgress(0);
        setMetadata({
          title: "",
          description: "",
          molecule: "",
          technique: "Absorption",
          author: "",
        });
        alert("Upload successful!");
      }
    }, 200);
    
    // In a real implementation, we would connect to the Internet Computer canister
    // and upload each file with the metadata
  }, [files, metadata]);
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <form 
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            dragActive 
              ? "border-primary bg-primary/10" 
              : "border-border hover:border-primary/50"
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-3">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 text-muted-foreground"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1} 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
              />
            </svg>
            <p className="text-lg font-medium">
              Drag and drop your spectroscopy files here
            </p>
            <p className="text-sm text-muted-foreground">
              Supports CSV and TXT files
            </p>
            <button
              type="button"
              className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium hover:bg-primary/90 mt-2"
              onClick={() => inputRef.current?.click()}
            >
              Select Files
            </button>
            <input
              ref={inputRef}
              type="file"
              multiple
              accept=".csv,.txt"
              onChange={handleChange}
              className="hidden"
            />
          </div>
        </div>
        
        {files.length > 0 && (
          <div 
            className="border border-border rounded-lg p-4"
          >
            <h3 className="font-medium mb-2">Selected Files ({files.length})</h3>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="text-sm font-mono">{file.name}</span>
                  <button
                    type="button"
                    className="text-destructive hover:text-destructive/80"
                    onClick={() => removeFile(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={metadata.title}
                onChange={handleMetadataChange}
                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="Absorption spectrum of benzene"
              />
            </div>
            
            <div>
              <label htmlFor="molecule" className="block text-sm font-medium mb-1">
                Molecule
              </label>
              <input
                id="molecule"
                name="molecule"
                type="text"
                required
                value={metadata.molecule}
                onChange={handleMetadataChange}
                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="e.g., C6H6"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={metadata.description}
              onChange={handleMetadataChange}
              className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
              placeholder="Brief description of the spectroscopy data"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="technique" className="block text-sm font-medium mb-1">
                Technique
              </label>
              <select
                id="technique"
                name="technique"
                value={metadata.technique}
                onChange={handleMetadataChange}
                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="Absorption">Absorption</option>
                <option value="Emission">Emission</option>
                <option value="Raman">Raman</option>
                <option value="IR">IR</option>
                <option value="NMR">NMR</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="author" className="block text-sm font-medium mb-1">
                Author
              </label>
              <input
                id="author"
                name="author"
                type="text"
                value={metadata.author}
                onChange={handleMetadataChange}
                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="Your name or institution"
              />
            </div>
          </div>
        </div>
        
        {uploading && (
          <div className="space-y-2">
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-right">
              {progress}% uploaded
            </p>
          </div>
        )}
        
        <button
          type="submit"
          disabled={uploading || files.length === 0}
          className="w-full bg-primary text-primary-foreground rounded-md py-3 text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? "Uploading..." : "Upload to SpectraNet"}
        </button>
      </form>
    </div>
  );
} 