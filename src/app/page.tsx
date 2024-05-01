import { db } from "~/server/db";

export default async function HomePage() {
  const urls = [
    "https://utfs.io/f/dd0e64e1-38ab-491b-b914-56eed433e3bc-y0ghj0.jpg",
    "https://utfs.io/f/b3f2e8d7-225d-46c1-948b-7453a04b475b-jlo1ag.jpg",
    "https://utfs.io/f/f81d063f-cd81-4438-8673-449ad233b490-wvkjh8.jpg",
    "https://utfs.io/f/80280395-1120-44eb-8825-166a9d22b836-wvkjgd.jpg",
  ];

  const posts = await db.query.posts.findMany();

  console.log(posts);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1>Checklist</h1>
      <div className="flex items-center justify-center gap-2">
        {urls.map((img, idx) => (
          <img key={idx} src={img} className="h-48 w-48 object-cover" />
        ))}
      </div>
    </main>
  );
}
