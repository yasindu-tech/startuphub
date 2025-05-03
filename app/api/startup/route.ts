import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, category, image, pitch } = body;

    // Validate required fields
    if (!title || !description || !category || !image || !pitch) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Get or create author
    const authorResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/author`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
        googleId: session.user.id,
      }),
    });

    const authorData = await authorResponse.json();

    if (!authorData.success) {
      throw new Error("Failed to get/create author");
    }

    // Convert pitch text to rich text format
    const pitchContent = [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: pitch,
          },
        ],
      },
    ];

    // Create the startup document
    const result = await client.create({
      _type: "startup",
      title,
      slug: {
        _type: "slug",
        current: title.toLowerCase().replace(/\s+/g, "-"),
      },
      description,
      category,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: image,
        },
        alt: title,
      },
      pitch: pitchContent,
      views: 0,
      publishedAt: new Date().toISOString(),
      author: {
        _type: "reference",
        _ref: authorData.data._id,
      },
    });

    if (!result) {
      throw new Error("Failed to create startup document");
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error creating startup:", error);
    
    // Check if it's a Sanity error
    if (error instanceof Error) {
      if (error.message.includes("token")) {
        return NextResponse.json(
          { success: false, error: "Authentication error. Please check your Sanity token." },
          { status: 401 }
        );
      }
      if (error.message.includes("dataset")) {
        return NextResponse.json(
          { success: false, error: "Dataset error. Please check your Sanity dataset configuration." },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { success: false, error: "Failed to create startup. Please try again." },
      { status: 500 }
    );
  }
} 