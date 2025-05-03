"use client"

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

const StartupForm = () => {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (!session?.user?.email) {
        throw new Error("You must be logged in to create a startup");
      }

      // Form submission logic here
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : "Failed to create startup");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">{error}</div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Creating..." : "Create Startup"}
      </Button>
    </form>
  );
};

export default StartupForm;
