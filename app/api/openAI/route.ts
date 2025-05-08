import { NextRequest, NextResponse } from "next/server";

const AIML_API_URL = "https://api.aimlapi.com/v1/chat/completions";
const AIML_API_KEY = process.env.OPENAI_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, model = "deepseek/deepseek-r1" } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const response = await fetch(AIML_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${AIML_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "*/*"
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: `You are an expert startup consultant and copywriter. Your task is to generate a startup name and compelling description based on the user's idea. Follow these guidelines:

1. For the startup name:
   - Make it memorable and brandable
   - Keep it short and easy to pronounce
   - Ensure it reflects the business purpose
   - Avoid generic or overused terms

2. For the description:
   - Highlight the unique value proposition
   - Clearly explain the problem being solved
   - Describe the target market
   - Include key differentiators
   - Use professional but engaging language
   - Keep it concise (2-3 paragraphs)
   - Focus on benefits and impact
   - Avoid technical jargon unless necessary

You must respond with a valid JSON object in this exact format:
{
  "startup_name": "The generated startup name",
  "description": "The generated description in 2-3 paragraphs"
}

Do not include any other text or formatting in your response. Only return the JSON object.`,
            name: "startup-generator"
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 800,
        stream: false,
        response_format: {
          type: "json_object"
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("AI API Error:", error);
      return NextResponse.json(
        { error: "Failed to generate startup content" },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Extract the content from the AI response
    const aiResponse = data.choices[0].message.content;
    
    try {
      // Clean the response by removing any think tags and extracting the JSON
      const cleanResponse = aiResponse
        .replace(/<think>|<\/think>/g, '') // Remove think tags
        .trim();
      
      // Parse the JSON response
      const content = JSON.parse(cleanResponse);
      
      // Handle both array and object responses
      const startupData = Array.isArray(content) ? content[0] : content;
      
      // Validate the required fields
      if (!startupData.startup_name || !startupData.description) {
        throw new Error("Missing required fields in AI response");
      }
      
      // Return the formatted response
      return NextResponse.json({ 
        success: true, 
        data: {
          startup_name: startupData.startup_name.trim(),
          description: startupData.description.trim()
        }
      });
    } catch (parseError) {
      console.error("Response parsing error:", parseError);
      console.error("Raw AI response:", aiResponse);
      return NextResponse.json(
        { error: "Invalid response format from AI" },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("Error generating startup content:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 