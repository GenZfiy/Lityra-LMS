import "../../styles/institution-operations-pages.css";
import { useEffect, useState } from "react";
import { CheckCircle2, Upload, Plus, ShieldCheck, GitBranch, KeyRound } from "lucide-react";
import { Card, Badge, Button, Field, Input } from "../../components/ui/primitives.jsx";
import { PageHeader, Loading, DataSource, EmptyState } from "../../components/ui/states.jsx";
import { useAsync } from "../../hooks/useAsync.js";
import { api, withFallback } from "../../lib/api.js";
import { demoColleges, demoLearners, demoAdminDash } from "../../lib/demo.js";

// Super Admin / College Admin / TPO console: colleges, learner roster,
// bulk import, and verification.
export default function AdminConsole() {
  const colleges = useAsync(() => withFallback(api.colleges(), demoColleges), []);
  // Real institution figures (learners, verified, at-risk per college) come from
  // the roster rollup, not the legacy demo dashboard.
  const roll = useAsync(() => api.rosterRollup("platform").catch(() => null), []);
  const [tab, setTab] = useState("overview");

  if (colleges.loading) return <Loading />;

  const r = roll.data;
  const counts = {};
  (r?.children || []).forEach((c) => { counts[c.id] = c; });
  const totalLearners = r ? r.learners : null;
  const totalVerified = r ? r.verified : null;

  return (
    <div className="page-composition page-composition-institution institution-ops institution-ops-overview"><div>
      <PageHeader
        title="Institution Console"
        subtitle="Manage colleges, onboard learners, and track readiness"
        right={<DataSource live={colleges.live} />}
      />

      <section className="institution-brief" aria-label="Institution overview">
        <div className="institution-brief-copy"><span>THE LEARNING NETWORK</span><h2>Institution overview</h2><p>Manage the learning network, roster and verified records in your access scope.</p></div>
        <dl className="institution-brief-metrics">
          <div><dt>Colleges</dt><dd>{(colleges.data || []).length || "—"}</dd></div>
          <div><dt>Learners</dt><dd>{totalLearners != null ? totalLearners.toLocaleString() : "—"}</dd></div>
          <div><dt>Verified</dt><dd>{totalVerified != null && totalLearners ? `${Math.round((totalVerified / totalLearners) * 100)}%` : "—"}</dd></div>
        </dl>
      </section>

      <div className="institution-console-tabs flex gap-2 mb-5" role="tablist" aria-label="Institution views">
        {["overview", "structure", "learners"].map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`h-9 px-4 rounded-md text-sm font-medium capitalize transition-colors ${
              tab === t ? "bg-invert-900 text-white" : "bg-surface border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" ? (
        <div role="tabpanel" tabIndex={0}><Colleges list={colleges.data || []} counts={counts} /></div>
      ) : tab === "structure" ? (
        <div role="tabpanel" tabIndex={0}><InstitutionStructure colleges={colleges.data || []} /></div>
      ) : (
        <div role="tabpanel" tabIndex={0}><LearnerRoster /></div>
      )}
    </div></div>
  );
}

function InstitutionStructure({ colleges }) {
  const [collegeId, setCollegeId] = useState(colleges[0]?.id || "");
  const [branches, setBranches] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [branchForm, setBranchForm] = useState({ name: "", code: "", category: "cse_allied" });
  const [cohortForm, setCohortForm] = useState({ branch_id: "", year_no: 1, section: "", size: 0 });
  const [accessForm, setAccessForm] = useState({ cohort_id: "", label: "" });
  const [createdCode, setCreatedCode] = useState(null);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!collegeId && colleges[0]?.id) setCollegeId(colleges[0].id);
  }, [collegeId, colleges]);

  useEffect(() => {
    let cancelled = false;
    if (!collegeId) { setBranches([]); setCohorts([]); return undefined; }
    Promise.all([api.collegeBranches(collegeId), api.collegeCohorts(collegeId)])
      .then(([branchRows, cohortRows]) => {
        if (cancelled) return;
        setBranches(Array.isArray(branchRows) ? branchRows : []);
        setCohorts(Array.isArray(cohortRows) ? cohortRows : []);
      })
      .catch((e) => { if (!cancelled) setError(e?.message || "Could not load college structure."); });
    return () => { cancelled = true; };
  }, [collegeId]);

  async function submitBranch(e) {
    e.preventDefault(); setError(""); setBusy("branch");
    try {
      const branch = await api.createBranch(collegeId, branchForm);
      setBranches((rows) => [branch, ...rows]);
      setCohortForm((form) => ({ ...form, branch_id: form.branch_id || branch.id }));
      setBranchForm({ name: "", code: "", category: "cse_allied" });
    } catch (e) { setError(e?.message || "Could not create branch. Check your College Admin access."); }
    finally { setBusy(""); }
  }

  async function submitCohort(e) {
    e.preventDefault(); setError(""); setBusy("cohort");
    try {
      const cohort = await api.createCohort(collegeId, {
        ...cohortForm, year_no: Number(cohortForm.year_no), size: Number(cohortForm.size),
        section: cohortForm.section.trim() || null,
      });
      setCohorts((rows) => [cohort, ...rows]);
      setAccessForm((form) => ({ ...form, cohort_id: cohort.id }));
    } catch (e) { setError(e?.message || "Could not create cohort."); }
    finally { setBusy(""); }
  }

  async function submitAccessCode(e) {
    e.preventDefault(); setError(""); setCreatedCode(null); setBusy("access");
    try {
      const code = await api.createAccessCode({ cohort_id: accessForm.cohort_id, label: accessForm.label.trim() || null });
      setCreatedCode(code);
      setAccessForm((form) => ({ ...form, label: "" }));
    } catch (e) { setError(e?.message || "Could not create Access ID."); }
    finally { setBusy(""); }
  }

  const branchName = (id) => branches.find((b) => b.id === id)?.name || id;
  return (
    <div className="space-y-5">
      <Card className="p-5">
        <Field label="College"><select className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-ink-900" value={collegeId} onChange={(e) => { setCollegeId(e.target.value); setCreatedCode(null); }} required>
          <option value="">Select a college</option>{colleges.map((college) => <option key={college.id} value={college.id}>{college.name}</option>)}
        </select></Field>
        {!colleges.length && <p className="mt-3 text-sm text-amber-700">Create or select a college in Overview first.</p>}
      </Card>

      {error && <div role="alert" className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

      <div className="grid xl:grid-cols-3 gap-5">
        <Card className="p-5 h-fit">
          <h2 className="mb-4 flex items-center gap-2 font-display font-semibold text-ink-900"><GitBranch size={17} /> 1. Create branch</h2>
          <form onSubmit={submitBranch} className="space-y-3">
            <Field label="Branch name"><Input required disabled={!collegeId} value={branchForm.name} onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })} placeholder="Computer Science" /></Field>
            <Field label="Branch code"><Input required disabled={!collegeId} value={branchForm.code} onChange={(e) => setBranchForm({ ...branchForm, code: e.target.value.toUpperCase() })} placeholder="CSE" /></Field>
            <Field label="Category"><select className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 text-sm" value={branchForm.category} onChange={(e) => setBranchForm({ ...branchForm, category: e.target.value })}><option value="cse_allied">Computing and allied</option><option value="core">Core engineering</option></select></Field>
            <Button type="submit" className="w-full" disabled={!collegeId || !!busy}><Plus size={15} /> {busy === "branch" ? "Creating…" : "Create branch"}</Button>
          </form>
          <div className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">{branches.length ? branches.map((b) => `${b.name} (${b.code})`).join(" · ") : "No branches yet."}</div>
        </Card>

        <Card className="p-5 h-fit">
          <h2 className="mb-4 flex items-center gap-2 font-display font-semibold text-ink-900"><Plus size={17} /> 2. Create cohort</h2>
          <form onSubmit={submitCohort} className="space-y-3">
            <Field label="Branch"><select required className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 text-sm" value={cohortForm.branch_id} onChange={(e) => setCohortForm({ ...cohortForm, branch_id: e.target.value })}><option value="">Select branch</option>{branches.map((b) => <option key={b.id} value={b.id}>{b.name} ({b.code})</option>)}</select></Field>
            <div className="grid grid-cols-2 gap-3"><Field label="Year"><select className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 text-sm" value={cohortForm.year_no} onChange={(e) => setCohortForm({ ...cohortForm, year_no: e.target.value })}>{[1, 2, 3, 4].map((n) => <option key={n} value={n}>Year {n}</option>)}</select></Field><Field label="Section"><Input value={cohortForm.section} onChange={(e) => setCohortForm({ ...cohortForm, section: e.target.value })} placeholder="A" /></Field></div>
            <Field label="Expected learners"><Input type="number" min="0" value={cohortForm.size} onChange={(e) => setCohortForm({ ...cohortForm, size: e.target.value })} /></Field>
            <Button type="submit" className="w-full" disabled={!cohortForm.branch_id || !!busy}><Plus size={15} /> {busy === "cohort" ? "Creating…" : "Create cohort"}</Button>
          </form>
          <div className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">{cohorts.length ? cohorts.map((c) => `${branchName(c.branch_id)} · Year ${c.year_no}${c.section ? ` ${c.section}` : ""}`).join(" | ") : "No cohorts yet."}</div>
        </Card>

        <Card className="p-5 h-fit">
          <h2 className="mb-4 flex items-center gap-2 font-display font-semibold text-ink-900"><KeyRound size={17} /> 3. Generate Access ID</h2>
          <form onSubmit={submitAccessCode} className="space-y-3">
            <Field label="Cohort"><select required className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 text-sm" value={accessForm.cohort_id} onChange={(e) => { setAccessForm({ ...accessForm, cohort_id: e.target.value }); setCreatedCode(null); }}><option value="">Select cohort</option>{cohorts.map((c) => <option key={c.id} value={c.id}>{branchName(c.branch_id)} · Year {c.year_no}{c.section ? ` ${c.section}` : ""}</option>)}</select></Field>
            <Field label="Label (optional)"><Input value={accessForm.label} onChange={(e) => setAccessForm({ ...accessForm, label: e.target.value })} placeholder="Noor's class" /></Field>
            <Button type="submit" className="w-full" disabled={!accessForm.cohort_id || !!busy}><KeyRound size={15} /> {busy === "access" ? "Generating…" : "Generate Access ID"}</Button>
          </form>
          {createdCode?.code && <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 p-3"><p className="text-xs font-medium text-emerald-800">Share this class Access ID with students</p><p className="mt-1 select-all font-mono text-lg font-bold tracking-wider text-emerald-950">{createdCode.code}</p></div>}
        </Card>
      </div>
      <p className="text-xs text-slate-500">Students enter the Access ID after signing in. Creating a cohort and code does not enroll a student in the roster; add the student to this college’s learner roster separately.</p>
    </div>
  );
}

function Colleges({ list, counts = {} }) {
  const [rows, setRows] = useState(list);
  const [form, setForm] = useState({ name: "", code: "", city: "" });

  async function add(e) {
    e.preventDefault();
    let created;
    try {
      created = await api.createCollege(form);
    } catch {
      created = { id: `c-${Date.now()}`, ...form, learners: 0, verified: false };
    }
    setRows([created, ...rows]);
    setForm({ name: "", code: "", city: "" });
  }

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-6">
      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="font-display font-semibold text-ink-900">Colleges ({rows.length})</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {rows.map((c) => {
            const stat = counts[c.id];
            const learners = stat ? stat.learners : (c.learners ?? 0);
            const verifiedPct = stat && stat.learners ? Math.round((stat.verified / stat.learners) * 100) : null;
            return (
              <div key={c.id} className="p-4 flex items-center gap-3">
                <span className="grid place-items-center h-10 w-10 rounded-md bg-brand-500/10 text-brand-600 font-semibold">
                  {c.code || c.name?.[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink-900 truncate">{c.name}</p>
                  <p className="text-xs text-slate-400">
                    {c.city ? `${c.city} · ` : ""}{learners.toLocaleString()} learners
                    {stat && stat.at_risk ? ` · ${stat.at_risk} at risk` : ""}
                  </p>
                </div>
                {verifiedPct != null ? (
                  <Badge tone={verifiedPct >= 60 ? "teal" : "amber"}><ShieldCheck size={13} /> {verifiedPct}% verified</Badge>
                ) : c.verified ? (
                  <Badge tone="teal"><ShieldCheck size={13} /> verified</Badge>
                ) : (
                  <Badge tone="slate">—</Badge>
                )}
              </div>
            );
          })}
          {rows.length === 0 && <EmptyState title="No colleges yet" hint="Add your first college on the right." />}
        </div>
      </Card>

      <Card className="p-6 h-fit">
        <h2 className="font-display font-semibold text-ink-900 mb-4 flex items-center gap-2">
          <Plus size={18} className="text-brand-500" /> Add college
        </h2>
        <form onSubmit={add} className="space-y-3">
          <Field label="Name"><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
          <Field label="Code"><Input required value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="ACE" /></Field>
          <Field label="City"><Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></Field>
          <Button type="submit" className="w-full"><Plus size={16} /> Create college</Button>
        </form>
      </Card>
    </div>
  );
}

function LearnerRoster() {
  const loaded = useAsync(() => withFallback(api.learners(), demoLearners), []);
  const [rows, setRows] = useState(null);
  const [csv, setCsv] = useState("");
  const list = rows ?? loaded.data ?? [];

  if (loaded.loading) return <Loading />;

  async function verify(id) {
    try { await api.verifyLearner(id); } catch { /* demo */ }
    setRows(list.map((l) => (l.id === id ? { ...l, verified: true, status: "active" } : l)));
  }

  async function bulkImport() {
    const learners = csv.split("\n").map((line) => line.trim()).filter(Boolean).map((line) => {
      const [roll_no, full_name, branch_id, cgpa] = line.split(",").map((x) => x.trim());
      return { roll_no, full_name, branch_id, cgpa: Number(cgpa) || null };
    });
    if (!learners.length) return;
    let added = learners.map((l, i) => ({ id: `n${i}-${Date.now()}`, ...l, year_no: 1, verified: false, status: "pending" }));
    try {
      const res = await api.bulkImportLearners({ learners });
      if (Array.isArray(res?.imported)) added = res.imported;
    } catch { /* demo */ }
    setRows([...added, ...list]);
    setCsv("");
  }

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-6">
      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-display font-semibold text-ink-900">Learner roster ({list.length})</h2>
          <DataSource live={loaded.live} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-400 border-b border-slate-100">
              <tr>
                <th className="py-2.5 px-4 font-medium">Roll no</th>
                <th className="py-2.5 px-4 font-medium">Name</th>
                <th className="py-2.5 px-4 font-medium">Branch</th>
                <th className="py-2.5 px-4 font-medium">Yr</th>
                <th className="py-2.5 px-4 font-medium">CGPA</th>
                <th className="py-2.5 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {list.map((l) => (
                <tr key={l.id}>
                  <td className="py-2.5 px-4 font-mono text-xs text-slate-600">{l.roll_no}</td>
                  <td className="py-2.5 px-4 font-medium text-ink-900">{l.full_name}</td>
                  <td className="py-2.5 px-4 text-slate-500">{l.branch_id}</td>
                  <td className="py-2.5 px-4 tabular-nums">{l.year_no}</td>
                  <td className="py-2.5 px-4 tabular-nums">{l.cgpa ?? "—"}</td>
                  <td className="py-2.5 px-4">
                    {l.verified ? (
                      <Badge tone="teal"><CheckCircle2 size={12} /> verified</Badge>
                    ) : (
                      <Button size="sm" variant="secondary" onClick={() => verify(l.id)}>Verify</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {list.length === 0 && <EmptyState title="No learners" hint="Bulk-import a roster on the right." />}
        </div>
      </Card>

      <Card className="p-6 h-fit">
        <h2 className="font-display font-semibold text-ink-900 mb-1 flex items-center gap-2">
          <Upload size={18} className="text-brand-500" /> Bulk import
        </h2>
        <p className="text-xs text-slate-400 mb-3">One learner per line: <code>roll_no, name, branch, cgpa</code></p>
        <textarea
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          className="w-full min-h-[160px] p-3 rounded-md border border-slate-200 text-ink-900 text-sm font-mono"
          placeholder={"21CSE050, Neha S., CSE, 8.1\n21ECE012, Kiran V., ECE, 7.4"}
        />
        <Button className="w-full mt-3" onClick={bulkImport}><Upload size={16} /> Import {csv.split("\n").filter((l) => l.trim()).length || ""}</Button>
      </Card>
    </div>
  );
}
