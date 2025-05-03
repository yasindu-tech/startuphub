"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DeleteStartupPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this startup?")) {
      return;
    }

    setIsDeleting(true);
    setError("");

    try {
      const response = await fetch(`/api/startup/${params.slug}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to delete startup");
      }

      router.push("/");
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : "Failed to delete startup");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <main className="container mx-auto min-h-screen max-w-4xl p-8">
      <div className="flex items-center justify-between mb-8">
        <Link
          href={`/startup/${params.slug}`}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back to startup
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4">Delete Startup</h1>
        <p className="text-gray-600 mb-8">
          Are you sure you want to delete this startup? This action cannot be
          undone.
        </p>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        <div className="flex gap-4">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Startup"}
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/startup/${params.slug}`}>Cancel</Link>
          </Button>
        </div>
      </div>
    </main>
  );
} 