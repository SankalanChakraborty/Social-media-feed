import ImageCard from "../components/ImageCard";
import "./Feed.css";
import { API_BASE_URL } from "../constants";
import type { User, Image } from "../App";

interface FeedProps {
  images: Image[];
  filteredImageList: Image[];
  loggedInUser: User | null;
  onImageDeleted?: () => void;
  removeImage?: (id: string, onImageDeleted?: () => void) => Promise<void>;
}

const Feed = ({
  images,
  filteredImageList,
  loggedInUser,
  onImageDeleted,
  removeImage,
}: FeedProps) => {
  console.log("feed images>>>>>> ", filteredImageList);
  return (
    <div className="feed">
      {(filteredImageList.length > 0 ? filteredImageList : images).map(
        (image) => {
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
        },
      )}
    </div>
  );
};

export default Feed;
