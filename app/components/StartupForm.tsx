"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  LinkIcon,
  ImageIcon,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function StartupForm() {
  const handleSubmitForm = (formData: FormData) => {
    try {
      const title = formData.get("title")
      const description = formData.get("description")
      const category = formData.get("category")
      const mediaLink = formData.get("mediaLink")
      const pitch = formData.get("pitch")

    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <form className="space-y-8" action={handleSubmitForm}>
      <div className="space-y-2">
        <label className="font-semibold uppercase text-sm">Title</label>
        <Input name="title" placeholder="Your Startup Name" />
      </div>

      <div className="space-y-2">
        <label className="font-semibold uppercase text-sm">Description</label>
        <Textarea name="description" placeholder="Short description of your startup idea" className="min-h-[100px]" />
      </div>

      <div className="space-y-2">
        <label className="font-semibold uppercase text-sm">Category</label>
        <Input name="category" placeholder="Choose a category (e.g., Tech, Health, Education, etc.)" />
      </div>

      <div className="space-y-2">
        <label className="font-semibold uppercase text-sm">Image/Video Link</label>
        <Input name="mediaLink" placeholder="Paste a link to your demo or promotional media" />
      </div>

      <div className="space-y-2">
        <label className="font-semibold uppercase text-sm">Pitch</label>
        <div className="border rounded-md">
          <div className="flex items-center gap-1 p-2 border-b">
            {[Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, LinkIcon, ImageIcon].map(
              (Icon, index) => (
                <Button key={index} variant="ghost" size="icon" className="h-8 w-8" type="button">
                  <Icon className="h-4 w-4" />
                </Button>
              )
            )}
          </div>
          <div className="p-4 min-h-[200px]">
            <Textarea
              name="pitch"
              placeholder="Briefly describe your idea and what problem it solves"
              className="min-h-[150px]"
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full py-6 bg-emerald-600 hover:bg-emerald-700">
        SUBMIT YOUR PITCH
      </Button>
    </form>
  )
}
