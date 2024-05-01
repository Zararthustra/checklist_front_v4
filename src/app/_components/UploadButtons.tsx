"use client";

import { useRouter } from "next/navigation";
import { UploadButton, UploadDropzone } from "~/utils/uploadthing";

export default function UploadButtons() {
  const router = useRouter();

  return (
    <div className="my-5">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={() => {
          router.refresh();
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
