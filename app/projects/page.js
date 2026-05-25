const projects = [
  {
    name: "Baker Residence",
    client: "Baker Family",
    address: "Austin, TX",
    phase: "Framing",
    manager: "Maria Lopez",
    budget: "$845,000",
    paid: "$315,900",
    progress: 42,
    status: "On Track",
    risk: "Medium",
  },
  {
    name: "River Oaks Custom Home",
    client: "Martinez Family",
    address: "Houston, TX",
    phase: "Foundation",
    manager: "James Carter",
    budget: "$1,250,000",
    paid: "$410,000",
    progress: 28,
    status: "At Risk",
    risk: "High",
  },
  {
    name: "Downtown Retail Remodel",
    client: "Northline Group",
    address: "Dallas, TX",
    phase: "Electrical",
    manager: "Angela Smith",
    budget: "$210,000",
    paid: "$116,500",
    progress: 67,
    status: "On Track",
    risk: "Low",
  },
  {
    name: "Westside Kitchen Renovation",
    client: "Sarah Johnson",
    address: "San Antonio, TX",
    phase: "Selections",
    manager: "Chris Allen",
    budget: "$78,500",
    paid: "$22,000",
    progress: 28,
    status: "Needs Attention",
    risk: "High",
  },
];

function statusStyle(status) {
  if (status === "On Track") {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  if (status === "At Risk") {
    return "bg-red-50 text-red-700 border-red-200";
  }

  return "bg-amber-50 text-amber-700 border-amber-200";
}

function riskStyle(risk) {
  if (risk === "Low") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (risk === "Medium") {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-red-100 text-red-700";
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-900">
      <div className="border-b border-slate-200 bg-[#0f7fb4] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div>
            <p className="text-xl font-extrabold">SitePilot AI</p>
            <p className="text-[11px] text-white/80">
              Projects command center
            </p>
          </div>

          <nav className="hidden gap-6 text-sm md:flex">
            <a href="/" className="hover:text-cyan-100">
              Dashboard
            </a>
            <a href="/projects" className="font-semibold text-cyan-100">
              Projects
            </a>
            <a href="#" className="hover:text-cyan-100">
              Schedule
            </a>
            <a href="#" className="hover:text-cyan-100">
              Financial
            </a>
            <a href="#" className="hover:text-cyan-100">
              AI Assistant
            </a>
          </nav>

          <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#0f7fb4] hover:bg-slate-100">
            + New Project
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#0f7fb4]">
              Project Management
            </p>
            <h1 className="mt-2 text-4xl font-extrabold">Projects</h1>
            <p className="mt-2 text-slate-500">
              Track every job, client, phase, budget, payment, and AI risk
              status.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-slate-50">
              Filter
            </button>
            <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Export
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Projects</p>
            <p className="mt-2 text-3xl font-extrabold">24</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Active Jobs</p>
            <p className="mt-2 text-3xl font-extrabold">12</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Projected Revenue</p>
            <p className="mt-2 text-3xl font-extrabold">$3.8M</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">AI Risk Alerts</p>
            <p className="mt-2 text-3xl font-extrabold text-red-600">5</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-xl font-bold">Active Project List</h2>
                <p className="text-sm text-slate-500">
                  Builder-style project tracking with AI risk intelligence.
                </p>
              </div>

              <input
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-[#0f7fb4] md:w-80"
                placeholder="Search projects, clients, addresses..."
              />
            </div>
          </div>

          <div className="divide-y divide-slate-200">
            {projects.map((project) => (
              <div key={project.name} className="p-5 hover:bg-slate-50">
                <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr_1fr_0.8fr] lg:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold">{project.name}</h3>
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                      {project.client} · {project.address}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Manager: {project.manager}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Current Phase</p>
                    <p className="font-semibold">{project.phase}</p>

                    <div className="mt-3 h-2 rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-[#12b5ea]"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      {project.progress}% complete
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Budget</p>
                    <p className="font-semibold">{project.budget}</p>

                    <p className="mt-2 text-sm text-slate-500">Paid to date</p>
                    <p className="font-semibold text-[#0f7fb4]">
                      {project.paid}
                    </p>
                  </div>

                 <div className="flex flex-col gap-3 lg:items-end">
  <span
    className={`rounded-full px-3 py-1 text-xs font-bold ${riskStyle(
      project.risk
    )}`}
  >
    AI Risk: {project.risk}
  </span>

  <a
    href="/projects/baker-residence"
    className="rounded-xl bg-[#0f7fb4] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b6f9e]"
  >
    Open Project
  </a>
</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#0f7fb4]/20 bg-[#0f7fb4]/10 p-5">
          <p className="text-sm font-bold uppercase tracking-wide text-[#0f7fb4]">
            SitePilot AI Insight
          </p>
          <p className="mt-2 text-lg font-semibold">
            Two projects are likely to experience schedule delays this week.
            Review selections and inspection timing before Friday.
          </p>
        </div>
      </div>
    </main>
  );
}