"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UploadButton, UploadDropzone } from "~/utils/uploadthing";

export default function UploadButtons() {
  const router = useRouter();

  return (
    <div className="my-5">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={() => {
          router.refresh();
          toast.dismiss("toast");
          toast.success("Youpi !");
        }}
        onUploadBegin={() => {
          toast.success("Chargement...", { id: "toast" });
        }}
      />
      {/* <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={() => {
          router.refresh();
        }}
      /> */}
    </div>
  );
}
