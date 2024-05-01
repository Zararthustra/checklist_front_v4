import { getMyImages } from "~/server/queries";
import UploadButtons from "./UploadButtons";
import Image from "next/image";

export default async function Images() {
  const images = await getMyImages();

  return (
    <div>
      <div className="flex items-center justify-center gap-2">
        {images.map((img) => (
          <div key={img.id} className="relative h-48 w-48">
            <Image src={img.url} fill alt={img.name} />
            <p>{img.name}</p>
          </div>
        ))}
      </div>
      <UploadButtons />
    </div>
  );
}
