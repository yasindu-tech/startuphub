// app/create/page.tsx or pages/create.tsx depending on your structure
"use client"

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CreateStartupForm from "@/app/components/CreateStartupForm";
import { Button } from "../../components/ui/button";
import Link from "next/link";

export default function CreateStartupPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
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

  if (!session) {
    return (
      <div className="container mx-auto min-h-screen max-w-4xl p-8">
        <p className="text-red-500">You must be logged in to create a startup</p>
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
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back to home
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8">Create New Startup</h1>
        <CreateStartupForm
          onSuccess={() => router.push("/")}
        />
      </div>
    </main>
  );
}
