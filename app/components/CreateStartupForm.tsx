"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ImageUpload from "./ImageUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
}

interface CreateStartupFormProps {
  initialData?: Startup;
  isEditing?: boolean;
  onSuccess?: () => void;
}

type Category = "Technology" | "Healthcare" | "Finance" | "Education" | "Other";

const CreateStartupForm = ({
  initialData,
  isEditing = false,
  onSuccess,
}: CreateStartupFormProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [category, setCategory] = useState<Category>(
    (initialData?.category as Category) || "Technology"
  );
  const [pitch, setPitch] = useState(initialData?.pitch || []);
  const [imageAssetId, setImageAssetId] = useState(
    initialData?.image?.asset?._ref || ""
  );
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

      const response = await fetch(
        isEditing ? `/api/startup/${initialData?._id}` : "/api/startup",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          body: JSON.stringify({
            title,
            description,
            category,
            pitch: [{ text: description }],
            image: imageAssetId,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to create startup");
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push(`/startup/${data.data.slug.current}`);
      }
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

      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your startup title"
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your startup"
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <Select
          value={category}
          onValueChange={(value) => setCategory(value as Category)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Healthcare">Healthcare</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="Education">Education</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <ImageUpload
          onImageUpload={setImageAssetId}
          initialImage={initialData?.image}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting
          ? "Saving..."
          : isEditing
          ? "Update Startup"
          : "Create Startup"}
      </Button>
    </form>
  );
};

export default CreateStartupForm; 