import { getMyImages } from "~/server/queries";
import UploadButtons from "./UploadButtons";

export default async function Images() {
  const images = await getMyImages();

  return (
    <div>
      <div className="flex items-center justify-center gap-2">
        {images.map((img) => (
          <img key={img.id} src={img.url} className="h-48 w-48 object-cover" />
        ))}
      </div>
      <UploadButtons />
    </div>
  );
}
