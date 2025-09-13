import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function FileUploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await apiRequest("POST", "/api/uploads", formData);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Upload Successful",
        description: `Processed ${data.dataCount} soil data points from ${data.upload.filename}`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/uploads"] });
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    onError: (error: any) => {
      console.error("Upload error:", error);
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload and process the file",
        variant: "destructive",
      });
    },
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      toast({
        title: "Invalid File Type",
        description: "Please select a CSV file",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      uploadMutation.mutate(selectedFile);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-2xl mx-auto mb-16">
      <div 
        className={`file-upload-zone rounded-2xl p-12 text-center bg-card/20 backdrop-blur-sm transition-all duration-300 ${
          isDragging ? 'border-primary/80 bg-primary/5' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        data-testid="file-upload-zone"
      >
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className={`fas ${uploadMutation.isPending ? 'fa-spinner fa-spin' : 'fa-cloud-upload-alt'} text-primary text-3xl`}></i>
        </div>
        
        <h4 className="text-2xl font-bold mb-4 text-foreground">
          {selectedFile ? 'File Selected' : 'Upload Soil Data'}
        </h4>
        
        {selectedFile ? (
          <div className="mb-8">
            <p className="text-foreground mb-2">{selectedFile.name}</p>
            <p className="text-sm text-muted-foreground">Size: {(selectedFile.size / 1024).toFixed(1)} KB</p>
          </div>
        ) : (
          <p className="text-muted-foreground mb-8">
            Drop your CSV file here or click to browse<br/>
            <span className="text-sm">Supports: x, y, voltage, pollutant columns</span>
          </p>
        )}
        
        <input 
          ref={fileInputRef}
          type="file" 
          accept=".csv" 
          className="hidden" 
          onChange={handleFileInputChange}
          data-testid="input-file"
        />
        
        <div className="flex justify-center space-x-4">
          {selectedFile ? (
            <>
              <button 
                onClick={handleUpload}
                disabled={uploadMutation.isPending}
                className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground px-6 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-200 transform hover:scale-105"
                data-testid="button-upload"
              >
                <i className="fas fa-upload"></i>
                <span>{uploadMutation.isPending ? 'Processing...' : 'Upload & Analyze'}</span>
              </button>
              <button 
                onClick={() => {
                  setSelectedFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="inline-flex items-center space-x-2 border border-border hover:bg-secondary text-foreground px-6 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-200"
                data-testid="button-cancel"
              >
                <i className="fas fa-times"></i>
                <span>Cancel</span>
              </button>
            </>
          ) : (
            <button 
              onClick={handleBrowseClick}
              className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-200 transform hover:scale-105"
              data-testid="button-browse"
            >
              <i className="fas fa-upload"></i>
              <span>Choose File</span>
            </button>
          )}
        </div>
        
        <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <i className="fas fa-file-csv text-primary"></i>
            <span>CSV Format</span>
          </div>
          <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
          <div className="flex items-center space-x-1">
            <i className="fas fa-shield-alt text-primary"></i>
            <span>Secure Upload</span>
          </div>
          <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
          <div className="flex items-center space-x-1">
            <i className="fas fa-bolt text-accent"></i>
            <span>Instant Analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
}
