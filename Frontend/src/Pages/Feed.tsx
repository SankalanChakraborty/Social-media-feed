import ImageCard from "../components/ImageCard";
import "./Feed.css";
import { API_BASE_URL } from "../constants";

interface Image {
  _id: string;
  user: string;
  imageUrl: string;
  caption: string;
}

interface FeedProps {
  images: Image[];
  onImageDeleted?: () => void; // Add callback for image deletion
}

const Feed = ({ images, onImageDeleted }: FeedProps) => {
  return (
    <div className="feed">
      {images.map((image) => {
        const src = `${API_BASE_URL}/${image.imageUrl.replace(/\\/g, "/")}`;

        return (
          <ImageCard
            key={image._id}
            image={{ ...image, imageUrl: src }}
            onImageDeleted={onImageDeleted}
          />
        );
      })}
    </div>
  );
};

export default Feed;
