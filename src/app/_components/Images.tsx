import { deleteImage, getMyImages } from "~/server/queries";
import UploadButtons from "./UploadButtons";
import Image from "next/image";
import Link from "next/link";

export default async function Images() {
  const images = await getMyImages();

  return (
    <div>
      <div className="flex items-center justify-center gap-2">
        {images.map((img) => (
          <>
            <Link key={img.id} href={`img/${img.id}`}>
              <div className="relative h-48 w-48">
                <Image src={img.url} fill alt={img.name} sizes="192px" />
              </div>
              <p>{img.name}</p>
            </Link>
            <form
              action={async () => {
                "use server";
                await deleteImage(img.id);
              }}
            >
              <button>Delete</button>
            </form>
          </>
        ))}
      </div>
      <UploadButtons />
    </div>
  );
}
