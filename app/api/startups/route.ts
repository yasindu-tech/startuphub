import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const startups = await client.fetch(`
      *[_type == "startup"] | order(publishedAt desc) {
        _id,
        title,
        description,
        category,
        image,
        views,
        slug,
        publishedAt,
        author-> {
          _id,
          name,
          email}
      }
    `);

    return NextResponse.json({ success: true, data: startups });
  } catch (error) {
    console.error("Error fetching startups:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch startups" },
      { status: 500 }
    );
  }
} 

