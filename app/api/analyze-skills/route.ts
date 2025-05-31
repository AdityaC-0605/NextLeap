import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge'; // required for formData()

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("resume");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No valid resume file provided" },
        { status: 400 }
      );
    }

    // Forward to Python backend
    const pythonUrl = process.env.PYTHON_SERVER_URL || "http://localhost:5001/api/analyze-skills";

    const forwardForm = new FormData();
    forwardForm.append("resume", file);

    const response = await fetch(pythonUrl, {
      method: "POST",
      body: forwardForm,
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error || "Python server error" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
