import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, image, googleId } = body;

    // Check if author already exists
    const existingAuthor = await client.fetch(
      `*[_type == "author" && googleId == $googleId][0]`,
      { googleId }
    );

    if (existingAuthor) {
      return NextResponse.json({ success: true, data: existingAuthor });
    }

    // Create new author
    const author = await client.create({
      _type: "author",
      email,
      name,
      image,
      googleId,
    });

    return NextResponse.json({ success: true, data: author });
  } catch (error) {
    console.error("Error creating/retrieving author:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create/retrieve author" },
      { status: 500 }
    );
  }
} 