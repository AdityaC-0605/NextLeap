import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json()
    const pythonUrl =
      process.env.PYTHON_FASTAPI_URL?.replace(/\/$/, '') || 'http://localhost:8000'

    const resp = await fetch(`${pythonUrl}/api/ai-advice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await resp.json().catch(() => ({}))
    if (!resp.ok) {
      return NextResponse.json(
        { error: data?.detail || 'Python server error' },
        { status: resp.status }
      )
    }
    return NextResponse.json(data)
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}


