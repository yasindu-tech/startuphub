"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CreateStartupForm from "../../../components/CreateStartupForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { use } from "react";

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
  pitch: any[];
  author: {
    email: string;
  };
}

export default function EditStartupPage({
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
        const data = await response.json();

        if (data.success) {
          if (data.data.author.email !== session?.user?.email) {
            router.push("/");
            return;
          }
          setStartup(data.data);
        } else {
          throw new Error(data.error || "Failed to fetch startup");
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to load startup");
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchStartup();
    }
  }, [slug, session, router]);

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

  return (
    <main className="container mx-auto min-h-screen max-w-4xl p-8">
      <div className="flex items-center justify-between mb-8">
        <Link
          href={`/startup/${slug}`}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back to startup
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8">Edit Startup</h1>
        <CreateStartupForm
          initialData={startup}
          isEditing={true}
          onSuccess={() => router.push(`/startup/${slug}`)}
        />
      </div>
    </main>
  );
} 