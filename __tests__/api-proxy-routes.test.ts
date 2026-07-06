import { describe, it, expect, vi, afterEach } from "vitest"
import { POST as careerPOST } from "@/app/api/career-recommendations/route"
import { POST as culturePOST } from "@/app/api/cultural-match/route"

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  })
}

function postRequest(path: string, body: unknown) {
  return new Request(`http://localhost${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe("career-recommendations proxy route", () => {
  it("forwards the body to the Python backend and returns its JSON on success", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse([{ next_role: "Data Scientist" }]))
    vi.stubGlobal("fetch", fetchMock)

    const res = await careerPOST(postRequest("/api/career-recommendations", { current_role: "Data Analyst" }))

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual([{ next_role: "Data Scientist" }])

    const [url, init] = fetchMock.mock.calls[0]
    expect(String(url)).toMatch(/\/api\/career-recommendations$/)
    expect(init.method).toBe("POST")
    expect(JSON.parse(init.body as string)).toEqual({ current_role: "Data Analyst" })
  })

  it("propagates the upstream error detail and status code", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ detail: "Role not recognized." }, 400)))

    const res = await careerPOST(postRequest("/api/career-recommendations", { current_role: "???" }))

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: "Role not recognized." })
  })

  it("returns 500 when the backend is unreachable", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("ECONNREFUSED")))

    const res = await careerPOST(postRequest("/api/career-recommendations", { current_role: "Data Analyst" }))

    expect(res.status).toBe(500)
    expect((await res.json()).error).toBeTruthy()
  })
})

describe("cultural-match proxy route", () => {
  it("returns upstream recommendations on success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse({ recommendations: [{ company_name: "Acme" }] })),
    )

    const res = await culturePOST(postRequest("/api/cultural-match", { preferences: "remote" }))

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ recommendations: [{ company_name: "Acme" }] })
  })

  it("falls back to a generic error when upstream sends no detail", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({}, 502)))

    const res = await culturePOST(postRequest("/api/cultural-match", { preferences: "remote" }))

    expect(res.status).toBe(502)
    expect(await res.json()).toEqual({ error: "Python server error" })
  })
})
