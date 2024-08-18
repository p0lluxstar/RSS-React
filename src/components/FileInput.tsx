import styles from '../styles/FileInput.module.css';
import React, { useRef, useState } from 'react';

interface FileInputProps {
  onFileChange: (file: string | null) => void;
  error?: string;
}

const FileInput: React.FC<FileInputProps> = ({ onFileChange, error }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        setFileError('Only JPEG and PNG files are allowed.');
        onFileChange(null);
        setPreview(null);
        return;
      }

      const maxSize = 1 * 1024 * 1024;
      if (file.size > maxSize) {
        setFileError('File size must be less than 1MB.');
        onFileChange(null);
        setPreview(null);
        return;
      }

      setFileError(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        onFileChange(reader.result as string);
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFileError(null);
      onFileChange(null);
      setPreview(null);
    }
  };

  return (
    <div className={styles.fileInput}>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg"
        onChange={handleFileChange}
      />
      {error && <p className={styles.error}>{error}</p>}
      {fileError && <p className={styles.error}>{fileError}</p>}
      {preview && <img src={preview} alt="Preview" />}
    </div>
  );
};

export default FileInput;
