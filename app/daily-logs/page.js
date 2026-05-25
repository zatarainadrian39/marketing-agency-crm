const logs = [
  {
    date: "May 24, 2026",
    project: "Baker Residence",
    crew: "5 workers",
    weather: "Sunny · 82°",
    status: "Submitted",
    summary:
      "Framing crew continued second-floor work. Cabinet selections remain pending and may impact schedule.",
  },
  {
    date: "May 23, 2026",
    project: "River Oaks Custom Home",
    crew: "8 workers",
    weather: "Partly cloudy · 78°",
    status: "Draft",
    summary:
      "Foundation prep continued. Concrete delivery confirmed for tomorrow morning.",
  },
  {
    date: "May 22, 2026",
    project: "Downtown Retail Remodel",
    crew: "4 workers",
    weather: "Clear · 81°",
    status: "Submitted",
    summary:
      "Electrical rough-in progressed. Inspection should be scheduled before wall closure.",
  },
];

const aiSuggestions = [
  "Convert rough field notes into a professional daily report.",
  "Flag schedule risks caused by late selections or inspections.",
  "Summarize crew activity, delays, weather, and safety notes.",
  "Generate a client-friendly update from the daily log.",
];

export default function DailyLogsPage() {
  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-900">
      <div className="border-b border-slate-200 bg-[#0f7fb4] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div>
            <p className="text-xl font-extrabold">SitePilot AI</p>
            <p className="text-[11px] text-white/80">Daily log intelligence</p>
          </div>

          <nav className="hidden gap-6 text-sm md:flex">
            <a href="/" className="hover:text-cyan-100">Dashboard</a>
            <a href="/projects" className="hover:text-cyan-100">Projects</a>
            <a href="/daily-logs" className="font-semibold text-cyan-100">Daily Logs</a>
            <a href="#" className="hover:text-cyan-100">Schedule</a>
            <a href="#" className="hover:text-cyan-100">Financial</a>
            <a href="#" className="hover:text-cyan-100">AI Assistant</a>
          </nav>

          <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#0f7fb4] hover:bg-slate-100">
            + New Log
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#0f7fb4]">
              Field Reporting
            </p>
            <h1 className="mt-2 text-4xl font-extrabold">Daily Logs</h1>
            <p className="mt-2 text-slate-500">
              Capture jobsite activity, weather, crew, delays, photos, and AI-generated summaries.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-slate-50">
              Filter
            </button>
            <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Export Logs
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Logs This Week</p>
            <p className="mt-2 text-3xl font-extrabold">18</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Missing Logs</p>
            <p className="mt-2 text-3xl font-extrabold text-red-600">2</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">AI Reports Generated</p>
            <p className="mt-2 text-3xl font-extrabold">41</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Open Field Issues</p>
            <p className="mt-2 text-3xl font-extrabold text-amber-600">6</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.9fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Recent Daily Logs</h2>
                <p className="text-sm text-slate-500">
                  Jobsite reports organized by project and date.
                </p>
              </div>

              <button className="rounded-xl bg-[#0f7fb4] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b6f9e]">
                Create Log
              </button>
            </div>

            <div className="space-y-4">
              {logs.map((log) => (
                <div
                  key={`${log.project}-${log.date}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                    <div>
                      <p className="text-lg font-bold">{log.project}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {log.date} · {log.crew} · {log.weather}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        log.status === "Submitted"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {log.status}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-700">
                    {log.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold hover:bg-slate-50">
                      View Log
                    </button>
                    <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold hover:bg-slate-50">
                      Generate Client Update
                    </button>
                    <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold hover:bg-slate-50">
                      Attach Photos
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-[#0f7fb4]">
                AI Daily Log Writer
              </p>
              <h2 className="mt-2 text-2xl font-extrabold">
                Turn rough notes into a professional report
              </h2>

              <textarea
                className="mt-5 min-h-40 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-[#0f7fb4]"
                placeholder="Example: 5 workers onsite. Framed second floor. Cabinet selections delayed. Weather sunny. No safety issues."
              />

              <button className="mt-4 w-full rounded-xl bg-[#0f7fb4] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0b6f9e]">
                Generate AI Daily Log
              </button>

              <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-bold">AI Preview</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Today, a five-person crew continued second-floor framing at the jobsite.
                  Weather conditions were clear and did not impact work. Cabinet selections
                  remain delayed and should be reviewed to prevent schedule impact.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#0f7fb4]/20 bg-[#0f7fb4]/10 p-5">
              <p className="text-sm font-bold uppercase tracking-wide text-[#0f7fb4]">
                SitePilot AI Suggestions
              </p>

              <div className="mt-4 space-y-3">
                {aiSuggestions.map((item) => (
                  <div key={item} className="rounded-xl bg-white/70 p-3 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-bold">Field Issue Watch</h2>
              <div className="mt-4 space-y-3 text-sm">
                <div className="rounded-xl bg-red-50 p-3 text-red-700">
                  Cabinet selections may delay Baker Residence.
                </div>
                <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
                  Electrical inspection needed before drywall.
                </div>
                <div className="rounded-xl bg-slate-50 p-3 text-slate-700">
                  River Oaks concrete delivery confirmed.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}