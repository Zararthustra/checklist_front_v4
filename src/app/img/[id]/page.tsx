import { getImage } from "~/server/queries";

export default async function PhotoModal({
  params: { id: imgId },
}: {
  params: { id: string };
}) {
  const image = await getImage(Number(imgId));

  return <img src={image.url} className="w-48" />;
}
