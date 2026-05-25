const activityItems = [
  "3 pending change orders need review",
  "Cabinet selections due by Friday",
  "Electrical inspection should be scheduled",
  "Invoice #204 is 14 days overdue",
  "2 daily logs missing this week",
];

const photos = [
  "Front Elevation",
  "Kitchen Progress",
  "Living Area",
  "Exterior Framing",
];

const schedule = [
  { day: "Mon", task: "Framing" },
  { day: "Tue", task: "Electrical" },
  { day: "Wed", task: "HVAC" },
  { day: "Thu", task: "Insulation" },
  { day: "Fri", task: "Drywall" },
  { day: "Sat", task: "Punch List" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-900">
      {/* Top nav */}
      <div className="border-b border-slate-200 bg-[#0f7fb4] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-10">
            <div>
              <p className="text-xl font-extrabold tracking-tight">
                SitePilot AI
              </p>
              <p className="text-[11px] text-white/80">
                Construction management platform
              </p>
            </div>

            <nav className="hidden gap-6 text-sm md:flex">
              <a href="/projects" className="hover:text-cyan-100">Project Management</a>
              <a href="#" className="hover:text-cyan-100">Files</a>
              <a href="#" className="hover:text-cyan-100">Messaging</a>
              <a href="#" className="hover:text-cyan-100">Financial</a>
              <a href="#" className="hover:text-cyan-100">AI Assistant</a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-lg bg-white/15 px-4 py-2 text-sm font-medium hover:bg-white/20">
              Client Portal
            </button>
            <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#0f7fb4] hover:bg-slate-100">
              + New Project
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-4 p-4 lg:grid-cols-[260px_1.3fr_320px]">
            {/* Left column */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0f7fb4] text-xl font-bold text-white">
                    BM
                  </div>
                  <div>
                    <p className="text-lg font-bold">Baker Residence</p>
                    <p className="text-sm text-slate-500">Austin, Texas</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Project Owner</span>
                    <span className="font-medium">Adrian Z.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Project Manager</span>
                    <span className="font-medium">Maria Lopez</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Current Phase</span>
                    <span className="font-medium">Framing</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Completion</span>
                    <span className="font-medium">42%</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                  Financial Snapshot
                </h3>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Contract Price</span>
                    <span className="font-semibold">$845,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Approved COs</span>
                    <span className="font-semibold">$21,500</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Paid to Date</span>
                    <span className="font-semibold">$315,900</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Remaining Balance</span>
                    <span className="font-semibold text-[#0f7fb4]">
                      $550,600
                    </span>
                  </div>
                </div>

                <button className="mt-4 w-full rounded-xl bg-[#12b5ea] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0ea5d6]">
                  Pay Online
                </button>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                  Quick Links
                </h3>
                <div className="mt-3 space-y-2 text-sm">
                  {[
                    "Invoices",
                    "To-Dos",
                    "Documents",
                    "Messages",
                    "Selections",
                    "Warranty",
                    "Daily Logs",
                  ].map((item) => (
                    <button
                      key={item}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-slate-50"
                    >
                      <span>{item}</span>
                      <span className="text-slate-400">›</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Center column */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Baker Residence</h2>
                    <p className="text-sm text-slate-500">
                      Modern construction command center
                    </p>
                  </div>

                  <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                    On Track
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  <div className="flex h-[250px] items-center justify-center bg-gradient-to-br from-sky-200 via-slate-100 to-slate-200 text-center">
                    <div>
                      <p className="text-xl font-bold text-slate-700">
                        Main Project Photo
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Replace with actual jobsite or project image later
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-3">
                  {photos.map((photo) => (
                    <div
                      key={photo}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center text-xs font-medium text-slate-600"
                    >
                      <div className="mb-2 h-14 rounded-lg bg-gradient-to-br from-slate-200 to-slate-100" />
                      {photo}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">Project Schedule</h3>
                    <p className="text-sm text-slate-500">
                      Current week activity timeline
                    </p>
                  </div>
                  <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50">
                    Full Schedule
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
                  {schedule.map((item) => (
                    <div
                      key={item.day}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                    >
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        {item.day}
                      </p>
                      <p className="mt-2 text-sm font-semibold">{item.task}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 p-4">
                <h3 className="text-lg font-bold">What’s Happening</h3>
                <div className="mt-4 space-y-3">
                  {activityItems.map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <h3 className="text-lg font-bold">Weather</h3>
                <div className="mt-3 flex items-center justify-between rounded-xl bg-sky-50 p-4">
                  <div>
                    <p className="text-sm text-slate-500">Austin, TX</p>
                    <p className="text-3xl font-bold">82°</p>
                    <p className="text-sm text-slate-500">Sunny</p>
                  </div>
                  <div className="text-right text-sm text-slate-500">
                    <p>Humidity: 45%</p>
                    <p>Wind: 7 mph</p>
                    <p>Rain: 10%</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-[#0f7fb4]">
                  AI Assistant
                </p>
                <h3 className="mt-2 text-xl font-bold">
                  Today’s recommendations
                </h3>

                <div className="mt-4 space-y-3">
                  <div className="rounded-xl bg-slate-50 p-3 text-sm">
                    Recommend sending change order draft for upgraded windows.
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3 text-sm">
                    Flag cabinet selection delay before it impacts drywall.
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3 text-sm">
                    Suggest invoice reminder to homeowner.
                  </div>
                </div>

                <button className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                  Ask SitePilot AI
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}