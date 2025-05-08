import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query") || "";
    const sortBy = searchParams.get("sortBy") || "publishedAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const category = searchParams.get("category") || "all";

    // Build the GROQ query
    let groqQuery = `*[_type == "startup"`;
    
    // Add category filter if selected
    if (category && category !== "all") {
      groqQuery += ` && category == "${category}"`;
    }
    
    // Add search condition if query exists
    if (query) {
      groqQuery += ` && (
        title match "*${query}*" ||
        description match "*${query}*" ||
        category match "*${query}*"
      )`;
    }

    // Add sorting
    groqQuery += `] | order(${sortBy} ${sortOrder}) {
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
        email
      }
    }`;

    const startups = await client.fetch(groqQuery);

    return NextResponse.json({ success: true, data: startups });
  } catch (error) {
    console.error("Error searching startups:", error);
    return NextResponse.json(
      { success: false, error: "Failed to search startups" },
      { status: 500 }
    );
  }
} 