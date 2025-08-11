import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge'; // required for formData()

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Forward to FastAPI backend (single server for all features)
    const base = (process.env.PYTHON_FASTAPI_URL || 'http://localhost:8000').replace(/\/$/, '')
    const response = await fetch(`${base}/api/analyze-skills`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { error: data?.detail || data?.error || "Python server error" },
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
