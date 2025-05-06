"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { use } from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

interface Startup {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: {
    asset: {
      _ref: string;
    };
  };
  pitch: Array<{ text: string }>;
  author: {
    email: string;
  };
  views: number;
  createdAt: string;
}

export default function StartupPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [startup, setStartup] = useState<Startup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { slug } = use(params);

  useEffect(() => {
    const fetchStartup = async () => {
      try {
        const response = await fetch(`/api/startup/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch startup');
        }
        const data = await response.json();
        setStartup(data);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to load startup");
      } finally {
        setLoading(false);
      }
    };

    fetchStartup();
  }, [slug]);

  useEffect(() => {
    const trackView = async () => {
      try {
        await fetch(`/api/startup/${slug}/views`, {
          method: "POST",
        });
      } catch (error) {
        console.error("Error tracking view:", error);
      }
    };

    if (startup) {
      trackView();
    }
  }, [slug, startup]);

  if (loading) {
    return (
      <div className="container mx-auto min-h-screen max-w-4xl p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-2/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !startup) {
    return (
      <div className="container mx-auto min-h-screen max-w-4xl p-8">
        <p className="text-red-500">{error || "Startup not found"}</p>
        <Button variant="outline" asChild className="mt-4">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  const isAuthor = session?.user?.email === startup.author.email;

  return (
    <main className="container mx-auto min-h-screen max-w-4xl p-8">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back to home
        </Link>
        {isAuthor && (
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link href={`/startup/${slug}/edit`}>Edit</Link>
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                if (window.confirm("Are you sure you want to delete this startup?")) {
                  try {
                    const response = await fetch(`/api/startup/${slug}`, {
                      method: "DELETE",
                      headers: {
                        Authorization: `Bearer ${session?.user?.accessToken}`,
                      },
                    });
                    const data = await response.json();
                    if (data.success) {
                      router.push("/");
                    } else {
                      throw new Error(data.error || "Failed to delete startup");
                    }
                  } catch (error) {
                    console.error("Error:", error);
                    alert("Failed to delete startup");
                  }
                }
              }}
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {startup.image && (
          <div className="relative h-64 w-full">
            <Image
              src={urlFor(startup.image).url()}
              alt={startup.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{startup.title}</h1>
            <span className="text-sm text-gray-500">
              {new Date(startup.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
              {startup.category}
            </span>
            <span className="text-sm text-gray-500">
              {startup.views} views
            </span>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 mb-6">{startup.description}</p>
            {startup.pitch && startup.pitch.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Pitch</h2>
                {startup.pitch.map((item, index) => (
                  <p key={index} className="text-gray-700">
                    {item.text}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 