import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
  try {
    const pythonUrl =
      process.env.PYTHON_FASTAPI_URL?.replace(/\/$/, '') || 'http://localhost:8000'

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)
    const resp = await fetch(`${pythonUrl}/health`, { signal: controller.signal })
    clearTimeout(timeout)

    const data = await resp.json().catch(() => ({}))
    return NextResponse.json({ ok: resp.ok, python: data, target: pythonUrl }, { status: resp.ok ? 200 : 502 })
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || 'Failed to reach Python backend', target: process.env.PYTHON_FASTAPI_URL || null },
      { status: 502 }
    )
  }
}


