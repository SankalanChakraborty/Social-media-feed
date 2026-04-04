import Input from "./Input";
import "./UploadImage.css";
import { useState } from "react";
import type { User } from "../App";

interface UploadImageProps {
  loggedInUser: User | null;
  onSuccess?: () => void;
}

const UploadImage = ({ loggedInUser, onSuccess }: UploadImageProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");

  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("image", selectedFile); // "image" must match upload.single("image") in multer
    formData.append("caption", caption);

    const response = await fetch("http://localhost:8080/api/images/upload", {
      method: "POST",

      credentials: "include",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
    onSuccess?.();
  };

  const onChangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <form className="upload-form" onSubmit={handleImageUpload}>
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
