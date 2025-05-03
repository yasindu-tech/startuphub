import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function DELETE() {
  try {
    // Delete all startups
    const result = await client.delete({
      query: '*[_type == "startup"]',
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error cleaning up startups:", error);
    return NextResponse.json(
      { success: false, error: "Failed to clean up startups" },
      { status: 500 }
    );
  }
} 