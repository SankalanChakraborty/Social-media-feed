import ImageCard from "../components/ImageCard";
import "./Feed.css";

interface Image {
  _id: string;
  user: string;
  imageUrl: string;
  caption: string;
}

interface FeedProps {
  images: Image[]; // ← array of Image objects, not strings
}

const Feed = ({ images }: FeedProps) => {
  return (
    <div className="feed">
      {images.map((image) => {
        const src = `http://localhost:8080/${image.imageUrl.replace(/\\/g, "/")}`;

        return (
          <ImageCard key={image._id} image={{ ...image, imageUrl: src }} />
        );
      })}
    </div>
  );
};

export default Feed;
