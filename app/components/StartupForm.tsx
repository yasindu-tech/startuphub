"use client"

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";
import { Wand2 } from "lucide-react";

const StartupForm = () => {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    prompt: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateDescription = async () => {
    if (!formData.prompt.trim()) {
      setError("Please enter a prompt for the AI");
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
          prompt: `Generate a compelling startup description for: ${formData.prompt}. 
                  Make it professional, engaging, and highlight the unique value proposition. 
                  Keep it concise but informative.`
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate description");
      }

      setFormData(prev => ({
        ...prev,
        description: data.data.choices[0].message.content
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate description");
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

      // Form submission logic here
      console.log("Form data:", formData);
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : "Failed to create startup");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg">{error}</div>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Startup Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter your startup title"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g., Technology, Finance, Healthcare"
                required
              />
            </div>

            <div>
              <Label htmlFor="prompt">AI Description Prompt</Label>
              <div className="space-y-2">
                <Textarea
                  id="prompt"
                  name="prompt"
                  value={formData.prompt}
                  onChange={handleInputChange}
                  placeholder="Describe your startup idea in a few sentences..."
                  className="min-h-[100px]"
                />
                <Button
                  type="button"
                  onClick={generateDescription}
                  disabled={isGenerating}
                  className="w-full sm:w-auto"
                  variant="secondary"
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  {isGenerating ? "Generating..." : "Generate Description"}
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Your startup description will appear here..."
                className="min-h-[150px]"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Creating..." : "Create Startup"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default StartupForm;
