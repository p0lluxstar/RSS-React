import { useState, useEffect } from 'react';

interface A {
  onChange(url: string): void;
}

const Image = (props: A) => {
  const [file, setFile] = useState<Blob>();
  const [previewUrl, setPreviewUrl] = useState<string>();

  useEffect(() => {
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setPreviewUrl(reader.result);
      }
    };

    if (typeof file === 'object') {
      reader.readAsDataURL(file);
    }
  }, [file]);

  if (previewUrl) {
    localStorage.setItem('ImageSave', previewUrl);
    props.onChange(previewUrl);
  }

  return (
    <>
      <input
        type="file"
        accept="images/*"
        onChange={(e) => {
          const file = e.target.files;
          if (file) {
            setFile(file[0]);
          }
        }}
      />
      {previewUrl && <img src={previewUrl} alt="Preview" />}
    </>
  );
};

export default Image;
