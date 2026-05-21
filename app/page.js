"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Phone,
  Users,
  DollarSign,
  Target,
  TrendingUp,
  Clock,
  CalendarDays,
  Search,
  Filter,
  Plus,
  BarChart3,
  PieChart,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  ClipboardList,
  Loader2,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const defaultLeadForm = {
  company_name: "",
  contact_name: "",
  phone: "",
  email: "",
  source: "Cold Call",
  stage: "New Lead",
  estimated_value: "",
  next_step: "",
};

const defaultCallForm = {
  customer_id: "",
  agent_id: "",
  outcome: "Connected",
  duration_seconds: "",
  notes: "",
};

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-sm transition hover:shadow-md ${className}`}>
      {children}
    </div>
  );
}

function Button({ children, className = "", variant = "solid", ...props }) {
  const base =
   "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60";

   const styles =
    variant === "outline"
      ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
  :"bg-slate-950 text-white shadow-sm hover:bg-slate-800 hover:shadow-md";
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}
function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <Card className="transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">{value}</p>
            <p className="mt-1 text-xs text-slate-500">{sub}</p>
          </div>
          <div className="rounded-2xl bg-slate-100 p-3">
            <Icon className="h-5 w-5 text-slate-700" />
          </div>
        </div>
      </div>
    </Card>
  );
}

function StageBadge({ stage }) {
  const styles = {
    "Closed Won": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Proposal Sent": "bg-blue-50 text-blue-700 border-blue-200",
    "Discovery Booked": "bg-purple-50 text-purple-700 border-purple-200",
    "Follow-Up Needed": "bg-amber-50 text-amber-700 border-amber-200",
    "New Lead": "bg-slate-50 text-slate-700 border-slate-200",
    Contacted: "bg-indigo-50 text-indigo-700 border-indigo-200",
    Lost: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${styles[stage] || styles["New Lead"]}`}>
      {stage}
    </span>
  );
}

function formatDuration(seconds) {
  if (!seconds) return "0m";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

function todayKey(dateString) {
  return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(new Date(dateString));
}

export default function MarketingAgencyCRM() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [agentFilter, setAgentFilter] = useState("All Agents");
  const [customers, setCustomers] = useState([]);
  const [agents, setAgents] = useState([]);
  const [calls, setCalls] = useState([]);
  const [deals, setDeals] = useState([]);
  const [leadForm, setLeadForm] = useState(defaultLeadForm);
  const [callForm, setCallForm] = useState(defaultCallForm);
  const [message, setMessage] = useState("");

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  async function loadCRM() {
    setLoading(true);
    setMessage("");

    const [agentsResult, customersResult, callsResult, dealsResult] = await Promise.all([
      supabase.from("agents").select("*").order("name"),
      supabase.from("customers").select("*, agents(name)").order("created_at", { ascending: false }),
      supabase
        .from("calls")
        .select("*, customers(company_name), agents(name)")
        .order("created_at", { ascending: false })
        .limit(100),
      supabase.from("deals").select("*, customers(company_name), agents(name)").order("created_at", { ascending: false }),
    ]);
const { data: appointmentRows } = await supabase
  .from("appointments")
  .select("*")
  .order("appointment_date", { ascending: true })
  .order("appointment_time", { ascending: true });
    const firstError =
      agentsResult.error || customersResult.error || callsResult.error || dealsResult.error;

    if (firstError) {
      setMessage(firstError.message);
    } else {
      setAgents(agentsResult.data || []);
      setCustomers(customersResult.data || []);
      setCalls(callsResult.data || []);
      setDeals(dealsResult.data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadCRM();
  }, []);

  async function addLead(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const assignedAgent = agents[0];

    const { error } = await supabase.from("customers").insert({
      company_name: leadForm.company_name,
      contact_name: leadForm.contact_name,
      phone: leadForm.phone,
      email: leadForm.email,
      source: leadForm.source,
      stage: leadForm.stage,
      estimated_value: Number(leadForm.estimated_value || 0),
      next_step: leadForm.next_step,
      agent_id: assignedAgent?.id || null,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setLeadForm(defaultLeadForm);
      setMessage("Lead added successfully.");
      await loadCRM();
    }

    setSaving(false);
  }

  async function logCall(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const { error } = await supabase.from("calls").insert({
      customer_id: callForm.customer_id,
      agent_id: callForm.agent_id,
      outcome: callForm.outcome,
      duration_seconds: Number(callForm.duration_seconds || 0),
      notes: callForm.notes,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setCallForm(defaultCallForm);
      setMessage("Call logged successfully.");
      await loadCRM();
    }

    setSaving(false);
  }

  const analytics = useMemo(() => {
    const totalCalls = calls.length;
    const connects = calls.filter((c) => ["Connected", "Booked", "Won"].includes(c.outcome)).length;
    const booked = calls.filter((c) => c.outcome === "Booked").length;
    const closedDeals = deals.filter((d) => d.stage === "Closed Won");
    const revenue = closedDeals.reduce((sum, d) => sum + Number(d.amount || 0), 0);

    const agentRows = agents.map((agent) => {
      const agentCalls = calls.filter((c) => c.agent_id === agent.id);
      const agentDeals = deals.filter((d) => d.agent_id === agent.id && d.stage === "Closed Won");

      return {
        ...agent,
        calls: agentCalls.length,
        connects: agentCalls.filter((c) => ["Connected", "Booked", "Won"].includes(c.outcome)).length,
        booked: agentCalls.filter((c) => c.outcome === "Booked").length,
        closed: agentDeals.length,
        revenue: agentDeals.reduce((sum, d) => sum + Number(d.amount || 0), 0),
        talkTimeSeconds: agentCalls.reduce((sum, c) => sum + Number(c.duration_seconds || 0), 0),
      };
    });

    const weeklyMap = {};
    calls.forEach((call) => {
      const day = todayKey(call.created_at);
      weeklyMap[day] ||= { day, calls: 0, connects: 0, booked: 0 };
      weeklyMap[day].calls += 1;
      if (["Connected", "Booked", "Won"].includes(call.outcome)) weeklyMap[day].connects += 1;
      if (call.outcome === "Booked") weeklyMap[day].booked += 1;
    });

    const pipelineMap = {};
    customers.forEach((customer) => {
      const stage = customer.stage || "New Lead";
      pipelineMap[stage] ||= { stage, value: 0 };
      pipelineMap[stage].value += Number(customer.estimated_value || 0);
    });

    const outcomeMap = {};
    calls.forEach((call) => {
      const name = call.outcome || "Unknown";
      outcomeMap[name] ||= { name, value: 0 };
      outcomeMap[name].value += 1;
    });

    return {
      totalCalls,
      connects,
      booked,
      revenue,
      closed: closedDeals.length,
      connectRate: totalCalls ? Math.round((connects / totalCalls) * 100) : 0,
      bookingRate: connects ? Math.round((booked / connects) * 100) : 0,
      agentRows,
      weeklyCalls: Object.values(weeklyMap),
      pipeline: Object.values(pipelineMap),
      outcomes: Object.values(outcomeMap),
    };
  }, [agents, calls, customers, deals]);

  const filteredCustomers = customers.filter((customer) => {
    const owner = customer.agents?.name || "Unassigned";
    const haystack = `${customer.company_name} ${customer.contact_name} ${customer.source} ${customer.stage} ${owner}`.toLowerCase();
    const matchesQuery = haystack.includes(query.toLowerCase());
    const matchesAgent = agentFilter === "All Agents" || owner === agentFilter;
    return matchesQuery && matchesAgent;
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-700">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading CRM...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 text-slate-950 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-slate-500">Marketing Agency CRM</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Outbound Sales Command Center
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Live Next.js + Supabase starter CRM for customers, calls, agents,
              deals, pipeline, and sales analytics.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              <ClipboardList className="mr-2 h-4 w-4" />
              Export Report
            </Button>

            <Button variant="outline" onClick={logout}>
              Logout
            </Button>

            <Button
              onClick={() => {
  const form = document.getElementById("add-lead-form");
  if (form) form.scrollIntoView({ behavior: "smooth", block: "start" });
}}
>
              <Plus className="mr-2 h-4 w-4" />
              Add Lead
            </Button>
          </div>
        </div>

        {message && (
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
            {message}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={Phone} label="Outbound Calls" value={analytics.totalCalls} sub="From Supabase call records" />
          <StatCard icon={UserCheck} label="Connect Rate" value={`${analytics.connectRate}%`} sub={`${analytics.connects} live conversations`} />
          <StatCard icon={CalendarDays} label="Appointments Booked" value={analytics.booked} sub={`${analytics.bookingRate}% of connects booked`} />
          <StatCard icon={DollarSign} label="Closed Revenue" value={money.format(analytics.revenue)} sub={`${analytics.closed} deals won`} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="p-6 space-y-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Weekly Call Performance</h2>
                  <p className="text-sm text-slate-500">Calls, live connects, and booked appointments from database records.</p>
                </div>
                <BarChart3 className="h-5 w-5 text-slate-500" />
              </div>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics.weeklyCalls}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="calls" strokeWidth={2} />
                    <Line type="monotone" dataKey="connects" strokeWidth={2} />
                    <Line type="monotone" dataKey="booked" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          <Card className="transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="p-6 space-y-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Call Outcomes</h2>
                  <p className="text-sm text-slate-500">Result breakdown for outbound activity.</p>
                </div>
                <PieChart className="h-5 w-5 text-slate-500" />
              </div>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie data={analytics.outcomes} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                      {analytics.outcomes.map((entry) => (
                        <Cell key={entry.name} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Customer Pipeline</h2>
                  <p className="text-sm text-slate-500">Search by company, contact, source, stage, or agent.</p>
                </div>
                <Target className="h-5 w-5 text-slate-500" />
              </div>

              <div className="mb-4 flex flex-col gap-3 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search customers, sources, stages..."
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-slate-400"
                  />
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <select
                    value={agentFilter}
                    onChange={(e) => setAgentFilter(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-8 text-sm outline-none focus:border-slate-400 md:w-56"
                  >
                    <option>All Agents</option>
                    {agents.map((agent) => (
                      <option key={agent.id}>{agent.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full min-w-[780px] text-left text-sm">
                  <thead className="bg-slate-100 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Customer</th>
                      <th className="px-4 py-3">Stage</th>
                      <th className="px-4 py-3">Owner</th>
                      <th className="px-4 py-3">Value</th>
                      <th className="px-4 py-3">Next Step</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200 bg-white">
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-slate-50">
                        <td className="px-4 py-4">
                          <p className="font-medium text-slate-950">{customer.company_name}</p>
                          <p className="text-xs text-slate-500">{customer.contact_name} · {customer.phone}</p>
                          <p className="text-xs text-slate-400">{customer.source}</p>
                        </td>
                        <td className="px-4 py-4">
                          <StageBadge stage={customer.stage} />
                        </td>
                        <td className="px-4 py-4 text-slate-700">
                          {customer.agents?.name || "Unassigned"}
                        </td>
                        <td className="px-4 py-4 font-medium">
                          {money.format(Number(customer.estimated_value || 0))}
                        </td>
                        <td className="px-4 py-4 text-slate-600">
                          {customer.next_step || "No next step"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
<Card className="transition hover:-translate-y-0.5 hover:shadow-md">
  <div className="p-5">
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold">Appointments Today</h2>
        <p className="text-sm text-slate-500">
          Scheduled appointments by client, time, and agent.
        </p>
      </div>
      <CalendarDays className="h-5 w-5 text-slate-500" />
    </div>

    <div className="space-y-3">
  {appointments.length === 0 ? (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
      No appointments scheduled yet.
    </div>
  ) : (
    appointments.map((appt) => (
      <div
        key={appt.id}
        className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
      >
        <p className="font-medium">
          {appt.customer_name}
        </p>

        <p className="text-sm text-slate-500">
          {appt.appointment_date} at {appt.appointment_time}
        </p>
      </div>
    ))
  )}
</div>
  </div>
</Card>
          <Card className="transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Pipeline Value</h2>
                  <p className="text-sm text-slate-500">Estimated value by stage.</p>
                </div>
                <TrendingUp className="h-5 w-5 text-slate-500" />
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.pipeline} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(value) => `$${value / 1000}k`} />
                    <YAxis dataKey="stage" type="category" width={110} />
                    <Tooltip formatter={(value) => money.format(value)} />
                    <Bar dataKey="value" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Agent Scoreboard</h2>
                  <p className="text-sm text-slate-500">Productivity, bookings, closes, revenue, and talk time.</p>
                </div>
                <Users className="h-5 w-5 text-slate-500" />
              </div>

              <div className="space-y-3">
                {analytics.agentRows.map((agent) => (
                  <div key={agent.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">{agent.name}</p>
                        <p className="text-sm text-slate-500">{agent.role || "Sales Agent"}</p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {formatDuration(agent.talkTimeSeconds)}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-5 gap-2 text-center text-sm">
                      <div><p className="font-semibold">{agent.calls}</p><p className="text-xs text-slate-500">Calls</p></div>
                      <div><p className="font-semibold">{agent.connects}</p><p className="text-xs text-slate-500">Connects</p></div>
                      <div><p className="font-semibold">{agent.booked}</p><p className="text-xs text-slate-500">Booked</p></div>
                      <div><p className="font-semibold">{agent.closed}</p><p className="text-xs text-slate-500">Won</p></div>
                      <div><p className="font-semibold">{money.format(agent.revenue)}</p><p className="text-xs text-slate-500">Revenue</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Recent Call Log</h2>
                  <p className="text-sm text-slate-500">Every outbound call creates a timestamped activity record.</p>
                </div>
                <Clock className="h-5 w-5 text-slate-500" />
              </div>

              <div className="space-y-3">
                {calls.slice(0, 8).map((call) => (
                  <div key={call.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-slate-100 p-2">
                          {call.outcome === "Booked" || call.outcome === "Won" ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <AlertCircle className="h-4 w-4" />
                          )}
                        </div>

                        <div>
                          <p className="font-medium">{call.customers?.company_name || "Unknown customer"}</p>
                          <p className="text-xs text-slate-500">
                            {call.agents?.name || "Unknown agent"} ·{" "}
                            {new Date(call.created_at).toLocaleString()} ·{" "}
                            {formatDuration(call.duration_seconds)}
                          </p>
                        </div>
                      </div>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {call.outcome}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-slate-600">{call.notes || "No notes"}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
           <form
  id="add-lead-form"
  onSubmit={addLead}
  className="space-y-4 p-5"
>
              <div>
                <h2 className="text-lg font-semibold">Add New Lead</h2>
                <p className="text-sm text-slate-500">Creates a customer record in Supabase.</p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {[
                  ["company_name", "Company name"],
                  ["contact_name", "Contact name"],
                  ["phone", "Phone"],
                  ["email", "Email"],
                  ["source", "Lead source"],
                  ["estimated_value", "Estimated value"],
                ].map(([key, label]) => (
                  <input
                    key={key}
                    value={leadForm[key]}
                    onChange={(event) => setLeadForm({ ...leadForm, [key]: event.target.value })}
                    placeholder={label}
                    className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
                  />
                ))}

                <select
                  value={leadForm.stage}
                  onChange={(event) => setLeadForm({ ...leadForm, stage: event.target.value })}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
                >
                  <option>New Lead</option>
                  <option>Contacted</option>
                  <option>Discovery Booked</option>
                  <option>Proposal Sent</option>
                  <option>Closed Won</option>
                  <option>Lost</option>
                </select>

                <input
                  value={leadForm.next_step}
                  onChange={(event) => setLeadForm({ ...leadForm, next_step: event.target.value })}
                  placeholder="Next step"
                  className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
                />
              </div>

              <Button disabled={saving}>{saving ? "Saving..." : "Save Lead"}</Button>
            </form>
          </Card>

          <Card>
            <form onSubmit={logCall} className="space-y-4 p-5">
              <div>
                <h2 className="text-lg font-semibold">Log Outbound Call</h2>
                <p className="text-sm text-slate-500">Creates a call record linked to a customer and agent.</p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <select
                  required
                  value={callForm.customer_id}
                  onChange={(event) => setCallForm({ ...callForm, customer_id: event.target.value })}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
                >
                  <option value="">Select customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.company_name}
                    </option>
                  ))}
                </select>

                <select
                  required
                  value={callForm.agent_id}
                  onChange={(event) => setCallForm({ ...callForm, agent_id: event.target.value })}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
                >
                  <option value="">Select agent</option>
                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name}
                    </option>
                  ))}
                </select>

                <select
                  value={callForm.outcome}
                  onChange={(event) => setCallForm({ ...callForm, outcome: event.target.value })}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
                >
                  <option>Connected</option>
                  <option>Booked</option>
                  <option>Won</option>
                  <option>Voicemail</option>
                  <option>No Answer</option>
                  <option>Bad Fit</option>
                  <option>Lost</option>
                </select>

                <input
                  value={callForm.duration_seconds}
                  onChange={(event) => setCallForm({ ...callForm, duration_seconds: event.target.value })}
                  placeholder="Duration in seconds"
                  className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
                />

                <textarea
                  value={callForm.notes}
                  onChange={(event) => setCallForm({ ...callForm, notes: event.target.value })}
                  placeholder="Call notes"
                  className="min-h-24 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 md:col-span-2"
                />
              </div>

              <Button disabled={saving}>{saving ? "Saving..." : "Log Call"}</Button>
            </form>
          </Card>
            </div>
    </div>
    </div>
  );
}