import "./ImageCard.css";

interface ImageCardProps {
  image: {
    _id: string;
    user: string;
    imageUrl: string;
    caption: string;
  };
  onImageDeleted?: () => void;
  removeImage?: (id: string, onImageDeleted?: () => void) => Promise<void>;
}

const ImageCard = ({ image, onImageDeleted, removeImage }: ImageCardProps) => {
  return (
    <div className="image-container">
      <div className="pin-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#A30000"
          stroke="#A30000"
          strokeWidth={"0.5"}
          className="bi bi-pin-angle-fill"
          viewBox="0 0 16 16"
          style={{
            filter: "drop-shadow(2px 3px 4px rgba(8, 8, 8, 0.7))",
          }}
        >
          <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146" />
        </svg>
      </div>
      <img key={image._id} src={image.imageUrl} alt={image.caption} />
      <div className="caption-and-delete">
        <span>{image.caption}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-trash"
          viewBox="0 0 16 16"
          onClick={() => removeImage?.(image._id, onImageDeleted)}
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg>
      </div>
    </div>
  );
};

export default ImageCard;
