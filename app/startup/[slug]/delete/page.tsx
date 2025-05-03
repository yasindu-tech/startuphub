"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function DeleteStartupPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const { slug } = use(params);

  useEffect(() => {
    const deleteStartup = async () => {
      try {
        const response = await fetch(`/api/startup/${slug}`, {
          method: "DELETE",
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
    };

    if (window.confirm("Are you sure you want to delete this startup?")) {
      deleteStartup();
    } else {
      router.push(`/startup/${slug}`);
    }
  }, [slug, router]);

  return null;
} 