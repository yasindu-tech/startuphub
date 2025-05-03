import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { notFound } from "next/navigation";

const STARTUP_QUERY = `*[_type == "startup" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function StartupPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const startup = await client.fetch<SanityDocument>(STARTUP_QUERY, await params, options);

  if (!startup) {
    notFound();
  }

  const startupImageUrl = startup.image ? urlFor(startup.image) : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to startups
      </Link>
      {startupImageUrl && (
        <img
          src={startupImageUrl.url()}
          alt={startup.title}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{startup.title}</h1>
      <div className="prose">
        <p>Category: {startup.category}</p>
        <p>Views: {startup.views}</p>
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-2">Description</h2>
          <p>{startup.description}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Pitch</h2>
          {Array.isArray(startup.pitch) && <PortableText value={startup.pitch} />}
        </div>
      </div>
    </main>
  );
}