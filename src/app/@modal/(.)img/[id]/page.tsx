import { getImage } from "~/server/queries";
import { Modal } from "./modal";

export default async function PhotoModal({
  params: { id: imgId },
}: {
  params: { id: string };
}) {
  const image = await getImage(Number(imgId));

  return (
    <Modal>
      <img src={image.url} className="w-48" />
    </Modal>
  );
}
