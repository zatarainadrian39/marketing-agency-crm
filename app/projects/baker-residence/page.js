const tabs = [
  "Overview",
  "Schedule",
  "Daily Logs",
  "Photos",
  "Documents",
  "Change Orders",
  "Invoices",
  "Messages",
];

const activity = [
  "Daily log submitted for framing crew.",
  "Cabinet selection is still pending homeowner approval.",
  "Invoice #204 is 14 days overdue.",
  "Electrical inspection recommended before Friday.",
];

const schedule = [
  { day: "Mon", task: "Framing inspection", status: "Complete" },
  { day: "Tue", task: "Electrical rough-in", status: "Active" },
  { day: "Wed", task: "HVAC layout", status: "Scheduled" },
  { day: "Thu", task: "Plumbing rough-in", status: "Scheduled" },
  { day: "Fri", task: "Client walkthrough", status: "Pending" },
];

const changeOrders = [
  { title: "Upgrade windows", amount: "$8,400", status: "Draft" },
  {
    title: "Kitchen island electrical",
    amount: "$2,150",
    status: "Pending Approval",
  },
  { title: "Premium cabinet hardware", amount: "$1,250", status: "Approved" },
];

export default function ProjectDetailPage() {
  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-900">
      <div className="border-b border-slate-200 bg-[#0f7fb4] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div>
            <p className="text-xl font-extrabold">SitePilot AI</p>
            <p className="text-[11px] text-white/80">Project workspace</p>
          </div>

          <nav className="hidden gap-6 text-sm md:flex">
            <a href="/" className="hover:text-cyan-100">
              Dashboard
            </a>
            <a href="/projects" className="hover:text-cyan-100">
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
            Share with Client
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-5">
          <a href="/projects" className="text-sm font-semibold text-[#0f7fb4]">
            ← Back to Projects
          </a>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#0f7fb4]">
                Residential Project
              </p>
              <h1 className="mt-2 text-4xl font-extrabold">Baker Residence</h1>
              <p className="mt-2 text-slate-500">
                Austin, Texas · Baker Family · Managed by Maria Lopez
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="text-xs text-emerald-700">Status</p>
                <p className="font-bold text-emerald-800">On Track</p>
              </div>

              <div className="rounded-xl bg-sky-50 p-4">
                <p className="text-xs text-sky-700">Progress</p>
                <p className="font-bold text-sky-800">42%</p>
              </div>

              <div className="rounded-xl bg-amber-50 p-4">
                <p className="text-xs text-amber-700">AI Risk</p>
                <p className="font-bold text-amber-800">Medium</p>
              </div>

              <div className="rounded-xl bg-slate-100 p-4">
                <p className="text-xs text-slate-500">Budget</p>
                <p className="font-bold">$845K</p>
              </div>
            </div>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[42%] rounded-full bg-[#12b5ea]" />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                  index === 0
                    ? "bg-[#0f7fb4] text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Project Overview</h2>
                  <p className="text-sm text-slate-500">
                    Live construction status and key project details.
                  </p>
                </div>

                <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                  Edit Project
                </button>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Current Phase</p>
                  <p className="mt-1 text-lg font-bold">Framing</p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Start Date</p>
                  <p className="mt-1 text-lg font-bold">May 1, 2026</p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Target Finish</p>
                  <p className="mt-1 text-lg font-bold">Oct 18, 2026</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-gradient-to-br from-sky-100 to-slate-100 p-8 text-center">
                <p className="text-2xl font-bold text-slate-700">
                  Project Photo Gallery
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Later we’ll connect real jobsite photos and uploads here.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Weekly Schedule</h2>
                  <p className="text-sm text-slate-500">
                    Tasks, inspections, and field activity.
                  </p>
                </div>

                <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold">
                  Add Task
                </button>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-5">
                {schedule.map((item) => (
                  <div
                    key={item.day}
                    className="rounded-xl border border-slate-200 p-4"
                  >
                    <p className="text-xs font-bold uppercase text-slate-400">
                      {item.day}
                    </p>
                    <p className="mt-2 font-semibold">{item.task}</p>
                    <p className="mt-2 text-xs text-[#0f7fb4]">
                      {item.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Change Orders</h2>
                  <p className="text-sm text-slate-500">
                    Track owner requests, approvals, and cost changes.
                  </p>
                </div>

                <button className="rounded-xl bg-[#0f7fb4] px-4 py-2 text-sm font-semibold text-white">
                  + New Change Order
                </button>
              </div>

              <div className="mt-5 divide-y divide-slate-200">
                {changeOrders.map((order) => (
                  <div
                    key={order.title}
                    className="flex items-center justify-between py-4"
                  >
                    <div>
                      <p className="font-semibold">{order.title}</p>
                      <p className="text-sm text-slate-500">{order.status}</p>
                    </div>

                    <p className="font-bold">{order.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-bold">Financial Snapshot</h2>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Contract Price</span>
                  <span className="font-semibold">$845,000</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Approved COs</span>
                  <span className="font-semibold">$21,500</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Paid to Date</span>
                  <span className="font-semibold">$315,900</span>
                </div>

                <div className="flex justify-between border-t border-slate-200 pt-3">
                  <span className="font-semibold">Remaining Balance</span>
                  <span className="font-bold text-[#0f7fb4]">$550,600</span>
                </div>
              </div>

              <button className="mt-5 w-full rounded-xl bg-[#12b5ea] px-4 py-3 text-sm font-semibold text-white">
                Create Invoice
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-[#0f7fb4]">
                SitePilot AI
              </p>
              <h2 className="mt-2 text-xl font-bold">AI Recommendations</h2>

              <div className="mt-4 space-y-3">
                {activity.map((item) => (
                  <div key={item} className="rounded-xl bg-slate-50 p-3 text-sm">
                    {item}
                  </div>
                ))}
              </div>

              <button className="mt-5 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
                Ask AI About This Project
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-bold">Weather</h2>

              <div className="mt-4 rounded-xl bg-sky-50 p-4">
                <p className="text-sm text-slate-500">Austin, TX</p>
                <p className="mt-1 text-4xl font-extrabold">82°</p>
                <p className="text-sm text-slate-500">
                  Sunny · 10% rain chance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}