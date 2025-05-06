import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const STARTUP_QUERY = `*[_type == "startup" && slug.current == $slug][0]{
  _id,
  title,
  description,
  category,
  image,
  views,
  pitch,
  publishedAt,
  "author": author->{
    _id,
    name,
    email,
    image
  }
}`;

// Helper to extract slug from the request URL
const getSlugFromRequest = (request: NextRequest) => {
  const url = new URL(request.url);
  const segments = url.pathname.split("/");
  return segments[segments.length - 1];
};

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const slug = getSlugFromRequest(request);
    const startup = await client.fetch(STARTUP_QUERY, { slug });

    if (!startup) {
      return NextResponse.json({ error: "Startup not found" }, { status: 404 });
    }

    return NextResponse.json(startup);
  } catch (error) {
    console.error("Error fetching startup:", error);
    return NextResponse.json(
      { error: "Failed to fetch startup" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const slug = getSlugFromRequest(request);
    const startup = await client.fetch(STARTUP_QUERY, { slug });

    if (!startup) {
      return NextResponse.json(
        { success: false, error: "Startup not found" },
        { status: 404 }
      );
    }

    if (startup.author.email !== session.user.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, category, pitch, image } = body;

    if (!title || !description || !category || !image) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedStartup = await client
      .patch(startup._id)
      .set({
        title,
        description,
        category,
        pitch,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: image,
          },
        },
      })
      .commit();

    return NextResponse.json({ success: true, data: updatedStartup });
  } catch (error) {
    console.error("Error updating startup:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update startup" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const slug = getSlugFromRequest(request);
    const startup = await client.fetch(STARTUP_QUERY, { slug });

    if (!startup) {
      return NextResponse.json(
        { success: false, error: "Startup not found" },
        { status: 404 }
      );
    }

    if (startup.author.email !== session.user.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await client.delete(startup._id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting startup:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete startup" },
      { status: 500 }
    );
  }
}
