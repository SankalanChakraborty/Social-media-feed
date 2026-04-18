import ImageCard from "../components/ImageCard";
import "./Feed.css";
import { API_BASE_URL } from "../constants";
import type { User } from "../App";

interface Image {
  _id: string;
  user: string;
  imageUrl: string;
  caption: string;
}

interface FeedProps {
  images: Image[];
  loggedInUser: User | null;
  onImageDeleted?: () => void;
  removeImage?: (id: string, onImageDeleted?: () => void) => Promise<void>;
}

const Feed = ({
  images,
  loggedInUser,
  onImageDeleted,
  removeImage,
}: FeedProps) => {
  return (
    <div className="feed">
      {images.map((image) => {
        const src = `${API_BASE_URL.BASE}/${image.imageUrl.replace(/\\/g, "/")}`;

        return (
          <ImageCard
            key={image._id}
            image={{ ...image, imageUrl: src }}
            loggedInUser={loggedInUser}
            onImageDeleted={onImageDeleted}
            removeImage={removeImage}
          />
        );
      })}
    </div>
  );
};

export default Feed;
