import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

// Helper to extract slug from the request URL
const getSlugFromRequest = (request: Request) => {
  const url = new URL(request.url);
  const segments = url.pathname.split("/");
  return segments[segments.length - 2]; // -2 because the last segment is 'views'
};

export async function POST(request: Request) {
  try {
    const slug = getSlugFromRequest(request);

    // Get the current startup
    const startup = await client.fetch(
      `*[_type == "startup" && slug.current == $slug][0]`,
      { slug }
    );

    if (!startup) {
      return NextResponse.json(
        { success: false, error: "Startup not found" },
        { status: 404 }
      );
    }

    // Increment views
    const result = await client
      .patch(startup._id)
      .inc({ views: 1 })
      .commit();

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error updating views:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update views" },
      { status: 500 }
    );
  }
} 