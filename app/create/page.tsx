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

export default function CreatePage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 py-8 mb-8 text-center">
        <h1 className="text-2xl font-bold text-white bg-black inline-block px-6 py-2">SUBMIT YOUR STARTUP PITCH</h1>
      </div>

      <form className="space-y-8">
        <div className="space-y-2">
          <label className="font-semibold uppercase text-sm">Title</label>
          <Input placeholder="Your Startup Name" />
        </div>

        <div className="space-y-2">
          <label className="font-semibold uppercase text-sm">Description</label>
          <Textarea placeholder="Short description of your startup idea" className="min-h-[100px]" />
        </div>

        <div className="space-y-2">
          <label className="font-semibold uppercase text-sm">Category</label>
          <Input placeholder="Choose a category (e.g., Tech, Health, Education, etc.)" />
        </div>

        <div className="space-y-2">
          <label className="font-semibold uppercase text-sm">Image/Video Link</label>
          <Input placeholder="Paste a link to your demo or promotional media" />
        </div>

        <div className="space-y-2">
          <label className="font-semibold uppercase text-sm">Pitch</label>
          <div className="border rounded-md">
            <div className="flex items-center gap-1 p-2 border-b">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Underline className="h-4 w-4" />
              </Button>
              <div className="w-px h-6 bg-gray-200 mx-1"></div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <AlignRight className="h-4 w-4" />
              </Button>
              <div className="w-px h-6 bg-gray-200 mx-1"></div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ListOrdered className="h-4 w-4" />
              </Button>
              <div className="w-px h-6 bg-gray-200 mx-1"></div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <LinkIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ImageIcon className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-4 min-h-[200px]">
              <div className="flex items-center gap-2 text-gray-400">
                <span>Briefly describe your idea and what problem it solves</span>
                <div className="flex -space-x-2">
                  <Avatar className="h-8 w-8 border-2 border-white bg-purple-500">
                    <AvatarFallback>K</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 border-2 border-white bg-emerald-500">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button className="w-full py-6 bg-emerald-600 hover:bg-emerald-700">SUBMIT YOUR PITCH</Button>
      </form>
    </div>
  )
}
