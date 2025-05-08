"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ImageUpload from "./ImageUpload";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Wand2, ArrowRight, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "./ui/card";
import { motion, AnimatePresence } from "framer-motion";

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
  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [category, setCategory] = useState<Category>(
    (initialData?.category as Category) || "Technology"
  );
  const [imageAssetId, setImageAssetId] = useState(
    initialData?.image?.asset?._ref || ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [idea, setIdea] = useState("");
  const [showAIGenerator, setShowAIGenerator] = useState(false);

  const generateStartupContent = async () => {
    if (!idea.trim()) {
      setError("Please tell us about your startup idea");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const response = await fetch("/api/openAI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          prompt: `Generate a startup name and description for this idea in the ${category} industry: ${idea}`
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate startup content");
      }

      if (!data.success || !data.data) {
        throw new Error("Invalid response from server");
      }

      setTitle(data.data.startup_name);
      
      const formattedDescription = data.data.description
        .replace(/\\n\\n/g, '\n\n')
        .replace(/\\n/g, '\n')
        .split('\n')
        .map((line: string) => line.trim())
        .filter((line: string) => line)
        .join('\n\n');

      setDescription(formattedDescription);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate startup content");
    } finally {
      setIsGenerating(false);
    }
  };

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
            Authorization: `Bearer ${session?.user?.accessToken}`,
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

  const nextStep = () => {
    if (currentStep === 1 && !category) {
      setError("Please select a category");
      return;
    }
    if (currentStep === 2 && !title) {
      setError("Please enter a title");
      return;
    }
    setCurrentStep(prev => prev + 1);
    setError("");
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    setError("");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-white to-emerald-50 shadow-2xl border-0">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 text-red-500 p-4 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {/* Step 1: Category Selection */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Step 1: Choose Your Industry
              </h2>
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
                  <SelectTrigger className="h-12 bg-white shadow-md hover:shadow-lg transition-shadow">
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
              <Button
                type="button"
                onClick={nextStep}
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Next Step <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* Step 2: Title and Description */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Step 2: Tell Us About Your Startup
              </h2>

              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                  <Button
                    type="button"
                    onClick={() => setShowAIGenerator(!showAIGenerator)}
                    className="w-full flex items-center justify-between bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 text-gray-700"
                  >
                    <span className="flex items-center">
                      <Wand2 className="h-5 w-5 mr-2 text-emerald-600" />
                      Generate with AI
                    </span>
                    {showAIGenerator ? <ChevronUp /> : <ChevronDown />}
                  </Button>

                  <AnimatePresence>
                    {showAIGenerator && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 space-y-4">
                          <Textarea
                            id="idea"
                            value={idea}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setIdea(e.target.value)}
                            placeholder="Describe your startup idea, target market, and what makes it unique..."
                            className="min-h-[100px] bg-white shadow-inner"
                          />
                          <Button
                            type="button"
                            onClick={generateStartupContent}
                            disabled={isGenerating}
                            className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <Wand2 className="h-4 w-4 mr-2" />
                            {isGenerating ? "Generating..." : "Generate Content"}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                      placeholder="Enter your startup name"
                      className="h-12 bg-white shadow-md hover:shadow-lg transition-shadow"
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
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                      placeholder="Describe your startup..."
                      className="min-h-[150px] bg-white shadow-md hover:shadow-lg transition-shadow whitespace-pre-wrap"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="flex-1 h-12 border-2 hover:border-emerald-600 hover:text-emerald-600 transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 h-12 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Image Upload and Submit */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Step 3: Add Your Startup Image
              </h2>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                  <ImageUpload
                    onImageUpload={setImageAssetId}
                    initialImage={initialData?.image}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="flex-1 h-12 border-2 hover:border-emerald-600 hover:text-emerald-600 transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 h-12 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isSubmitting
                    ? "Saving..."
                    : isEditing
                    ? "Update Startup"
                    : "Create Startup"}
                </Button>
              </div>
            </motion.div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateStartupForm; 