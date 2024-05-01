import { db } from "~/server/db";

export default async function HomePage() {
  const images = await db.query.images.findMany();

  console.log(images);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1>Checklist</h1>
      <div className="flex items-center justify-center gap-2">
        {images.map((img) => (
          <img key={img.id} src={img.url} className="h-48 w-48 object-cover" />
        ))}
      </div>
    </main>
  );
}
