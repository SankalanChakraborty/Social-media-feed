import Input from "../components/Input";
import "./UploadImage.css";
import { useState } from "react";

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");

  const onChangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <form className="upload-form">
      <Input
        type="file"
        value={selectedFile}
        onChange={onChangehandler}
        placeholder="Upload an image"
      />
      <Input
        type="caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Enter a caption"
      />
      <button className="btn btn-primary" type="submit">
        Upload
      </button>
    </form>
  );
};

export default UploadImage;
