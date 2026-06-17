import { jsxs as r, jsx as e, Fragment as ee } from "react/jsx-runtime";
import ae, { useState as S, useEffect as D, createContext as Ye, useContext as Ze, useCallback as ce, useRef as oe, useMemo as re } from "react";
import { useSearchParams as Qe, Link as pe, useParams as et, useNavigate as tt } from "react-router-dom";
const Ja = [
  {
    path: "/tgim/briefing",
    component: () => Promise.resolve().then(() => gt).then((t) => ({ default: t.default }))
  },
  {
    path: "/tgim/dashboard",
    component: () => Promise.resolve().then(() => Tt).then((t) => ({ default: t.default }))
  },
  {
    path: "/tgim/tasks",
    component: () => Promise.resolve().then(() => Rt).then((t) => ({ default: t.default }))
  },
  {
    path: "/tgim/tasks/:taskId",
    component: () => Promise.resolve().then(() => jt).then((t) => ({ default: t.default }))
  },
  {
    path: "/tgim/kanban",
    component: () => Promise.resolve().then(() => zt).then((t) => ({ default: t.default }))
  },
  {
    path: "/tgim/timeline",
    component: () => Promise.resolve().then(() => Ut).then((t) => ({ default: t.default }))
  },
  {
    path: "/tgim/workload",
    component: () => Promise.resolve().then(() => Xt).then((t) => ({ default: t.default }))
  },
  {
    path: "/tgim/brain-stream",
    component: () => Promise.resolve().then(() => ta).then((t) => ({ default: t.default }))
  },
  {
    path: "/tgim/org",
    component: () => Promise.resolve().then(() => ra).then((t) => ({ default: t.default }))
  },
  {
    path: "/tgim/audit",
    component: () => Promise.resolve().then(() => ca).then((t) => ({ default: t.default }))
  },
  {
    path: "/tgim/settings",
    component: () => Promise.resolve().then(() => Ga).then((t) => ({ default: t.default }))
  }
], Ka = [
  {
    to: "/tgim/briefing",
    icon: "◈",
    label: "Morning Briefing",
    tgimOnly: !0
  },
  {
    to: "/tgim/dashboard",
    icon: "📊",
    label: "Dashboard",
    tgimOnly: !0
  },
  {
    to: "/tgim/tasks",
    icon: "✓",
    label: "Tasks",
    tgimOnly: !0
  },
  {
    to: "/tgim/kanban",
    icon: "🗂",
    label: "Kanban",
    tgimOnly: !0
  },
  {
    to: "/tgim/timeline",
    icon: "📅",
    label: "Timeline",
    tgimOnly: !0
  },
  {
    to: "/tgim/workload",
    icon: "⚖",
    label: "Workload",
    tgimOnly: !0
  },
  {
    to: "/tgim/brain-stream",
    icon: "🧠",
    label: "Brain Stream",
    tgimOnly: !0
  },
  {
    to: "/tgim/org",
    icon: "🏢",
    label: "Org Chart",
    tgimOnly: !0
  },
  {
    to: "/tgim/audit",
    icon: "📋",
    label: "Audit Log",
    tgimOnly: !0
  },
  {
    to: "/tgim/settings",
    icon: "⚙",
    label: "Settings",
    tgimOnly: !0
  }
], Xa = "0.3.0-phase1-full-registry", Ya = 1, le = "[TGIM bundle] @supabase/supabase-js is stubbed in the portal-embed build. All data must route through the portal proxy via src/lib/api.js (fetch /api/tgim/*). If you see this error, a bundled page is calling Supabase directly — refactor it to use api.js.";
function q() {
  throw new Error(le);
}
const at = () => ({
  then(t, s) {
    const a = new Error(le);
    return s ? Promise.resolve(s(a)) : Promise.reject(a);
  },
  catch(t) {
    return Promise.resolve(t(new Error(le)));
  },
  finally(t) {
    return t && t(), Promise.reject(new Error(le));
  }
}), ye = new Proxy(at(), {
  get(t, s) {
    if (s === "then" || s === "catch" || s === "finally") return t[s];
    if (typeof s != "symbol")
      return () => ye;
  }
}), Ve = {
  from: () => ye,
  rpc: () => ye,
  schema: () => Ve,
  // Realtime channels — subscribe throws, on/unsubscribe are no-ops so
  // cleanup code doesn't crash at unmount time.
  channel: () => {
    const t = {
      on: () => t,
      subscribe: q,
      unsubscribe: () => Promise.resolve("ok")
    };
    return t;
  },
  removeChannel: () => Promise.resolve("ok"),
  removeAllChannels: () => Promise.resolve([]),
  // Auth — cold getters return null session so cold-load checks don't crash,
  // but any write operation throws.
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signInWithPassword: q,
    signInWithOtp: q,
    signInWithOAuth: q,
    signUp: q,
    signOut: () => Promise.resolve({ error: null }),
    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe: () => {
      } } }
    }),
    refreshSession: () => Promise.resolve({ data: { session: null }, error: null })
  },
  // Storage — all operations throw.
  storage: {
    from: () => ({
      upload: q,
      download: q,
      remove: q,
      list: q,
      getPublicUrl: () => ({ data: { publicUrl: "" } }),
      createSignedUrl: q
    })
  },
  // Functions (edge functions) — all invocations throw.
  functions: {
    invoke: q
  }
};
function rt(t, s, a) {
  return Ve;
}
const W = rt(), Be = "/api/tgim";
async function P(t, s = {}) {
  const a = await fetch(`${Be}${t}`, {
    headers: { "Content-Type": "application/json", ...s.headers },
    ...s
  });
  if (!a.ok) {
    const n = await a.json().catch(() => ({ error: a.statusText }));
    throw new Error(n.error || a.statusText);
  }
  return a.json();
}
class z extends Error {
  constructor({ error_code: s, error_message: a, conflict_data: n, validation_errors: l, security_level: c, http_status: i }) {
    super(a || s || "OACS error"), this.name = "OacsError", this.error_code = s, this.error_message = a, this.conflict_data = n, this.validation_errors = l, this.security_level = c, this.http_status = i;
  }
}
async function F(t, s = {}) {
  const { timeoutMs: a, ...n } = s, l = !!(n.method && n.method.toUpperCase() !== "GET"), c = a ?? (l ? 15e3 : 1e4), { data: { session: i } } = await W.auth.getSession(), y = i != null && i.access_token ? { Authorization: `Bearer ${i.access_token}` } : {}, h = new AbortController(), p = setTimeout(() => h.abort(), c);
  let d;
  try {
    d = await fetch(`${Be}${t}`, {
      headers: { "Content-Type": "application/json", ...y, ...n.headers },
      ...n,
      signal: h.signal
    });
  } catch (o) {
    throw (o == null ? void 0 : o.name) === "AbortError" ? new z({
      error_code: "TIMEOUT",
      error_message: `Request timed out after ${c}ms`,
      http_status: 0
    }) : new z({
      error_code: "NETWORK_ERROR",
      error_message: (o == null ? void 0 : o.message) || "Network request failed",
      http_status: 0
    });
  } finally {
    clearTimeout(p);
  }
  if (d.ok)
    try {
      return await d.json();
    } catch {
      throw new z({
        error_code: "SERVER_ERROR",
        error_message: "Response was not valid JSON",
        http_status: d.status
      });
    }
  let m = null;
  try {
    m = await d.json();
  } catch {
    m = null;
  }
  const b = d.status === 401 || d.status === 403 ? "PERMISSION_DENIED" : d.status === 404 ? "SERVER_ERROR" : d.status === 409 ? "CONFLICT" : d.status === 400 ? "VALIDATION_FAILED" : (d.status >= 500, "SERVER_ERROR");
  throw new z({
    error_code: (m == null ? void 0 : m.error_code) || b,
    error_message: (m == null ? void 0 : m.error_message) || d.statusText || `HTTP ${d.status}`,
    conflict_data: m == null ? void 0 : m.conflict_data,
    validation_errors: m == null ? void 0 : m.validation_errors,
    security_level: m == null ? void 0 : m.security_level,
    http_status: d.status
  });
}
const $ = {
  // Timeline
  getGantt: (t) => P(`/timeline/gantt${t ? `?project_id=${t}` : ""}`),
  getSummary: (t) => P(`/timeline/summary${t ? `?project_id=${t}` : ""}`),
  getMilestones: (t) => P(`/timeline/milestones${t ? `?project_id=${t}` : ""}`),
  // Workload
  getWorkload: () => P("/workload"),
  getEntityWorkload: (t) => P(`/workload/${t}`),
  getRebalance: () => P("/workload/rebalance"),
  getHeatmap: () => P("/workload/heatmap"),
  // Briefing
  getBriefing: (t, s = "json") => P(`/briefing/${t}?format=${s}`),
  getBriefingSchedule: () => P("/briefing/schedule"),
  // Brain Stream
  getBrainStream: (t = "") => P(`/brain-stream/events${t ? `?${t}` : ""}`),
  // Missions
  getMissions: () => P("/missions"),
  getMission: (t) => P(`/missions/${t}`),
  getMissionTasks: (t) => P(`/tasks?mission_id=${t}`),
  // Tasks
  getTask: (t) => P(`/tasks/${t}`),
  getTasks: (t = {}) => {
    const s = new URLSearchParams(t).toString();
    return P(`/timeline/gantt${s ? `?${s}` : ""}`);
  },
  // Handoffs
  getHandoffs: (t = "") => P(`/handoffs${t ? `?${t}` : ""}`),
  getHandoffStats: () => P("/handoffs/stats"),
  // Comments
  getComments: (t) => P(`/comments?task_id=${t}`),
  addComment: (t) => P("/comments", { method: "POST", body: JSON.stringify(t) }),
  // Activity
  getActivity: (t = "") => P(`/activity${t ? `?${t}` : ""}`),
  // Departments
  getDepartments: () => P("/departments"),
  getOrgChart: () => P("/org-chart"),
  getDeptWorkload: (t) => P(`/departments/${t}/workload`),
  // Notifications
  getNotificationStatus: () => P("/notifications/status"),
  // Automation
  getRules: () => P("/automation/rules"),
  // Custom Fields
  getCustomFields: (t) => P(`/custom-fields?project_id=${t}`),
  createCustomField: (t) => P("/custom-fields", { method: "POST", body: JSON.stringify(t) }),
  updateCustomField: (t, s) => P(`/custom-fields/${t}`, { method: "PATCH", body: JSON.stringify(s) }),
  deleteCustomField: (t) => P(`/custom-fields/${t}`, { method: "DELETE" }),
  getCustomValues: (t) => P(`/tasks/${t}/custom-values`),
  setCustomValues: (t, s) => P(`/tasks/${t}/custom-values`, { method: "PUT", body: JSON.stringify({ values: s }) }),
  // OACS v4.1 — Organizational Access Control System
  // Read endpoints (Day 1) + matrix commit (Day 2 Tranche 2).
  // Other write endpoints (import/*, templates/{id}/apply, assignments) are
  // deferred to later tranches.
  // Spec: /tmp/v41_unified_build_ready.md Sections 3.1 (read endpoints),
  //       3.2 (matrix commit), 6.3 (error envelope)
  oacs: {
    getMatrix: () => F("/oacs/matrix"),
    getRoleAssignments: () => F("/oacs/role-assignments"),
    getAgentAssignments: () => F("/oacs/agent-assignments"),
    getTemplates: () => F("/oacs/templates"),
    getUserSettingsMe: () => F("/oacs/user-settings/me"),
    // Day 2 Tranche 2 — POST commit for matrix edits
    // Body: { changes: [{role, module, field, new_value}, ...],
    //         version_at_load: <int>,
    //         reason: <string> }
    // Errors: 409 CONFLICT (version drift), 400 VALIDATION_FAILED,
    //         422 SELF_LOCKOUT_BLOCKED, 403 PERMISSION_DENIED
    commitMatrix: (t) => F("/oacs/matrix/commit", {
      method: "POST",
      body: JSON.stringify(t)
    }),
    // Day 2 Tranche 2 — CSV/JSON bulk import wizard (dry-run then commit)
    // Dry-run body: { rows: [{role, module, can_view, can_create, can_edit,
    //                          can_execute, can_resolve, can_admin}, ...] }
    // Dry-run 200:  { ok, data: { planned_changes, conflicts, summary, matrix_version } }
    // Dry-run 400:  VALIDATION_FAILED with row_index-indexed validation_errors
    importDryRun: (t) => F("/oacs/import/dry-run", {
      method: "POST",
      body: JSON.stringify(t)
    }),
    // Commit body: { rows: [...same rows], matrix_version: <from dry-run>, reason }
    // Commit 200:  { ok, data: { applied_count, row_count, new_matrix_version } }
    // Commit 409:  CONFLICT envelope with conflict_data.db_matrix (same as /matrix/commit)
    // Commit 400:  VALIDATION_FAILED with row_index-indexed validation_errors
    importCommit: (t) => F("/oacs/import/commit", {
      method: "POST",
      body: JSON.stringify(t)
    }),
    // Day 2 Tranche 2 item #4 — Role template apply (bulk apply a template
    //   to a list of entities, optionally with parameter overrides).
    // Body: { entity_ids: [...], parameter_overrides?: {...}, reason?: string }
    // 200:  { ok, data: { applied, count } }
    // 400:  VALIDATION_FAILED with validation_errors (parameter or entity-existence)
    // 500:  OACS_TEMPLATE_APPLY_ERROR (mid-batch failure, server-side rollback)
    // All non-2xx throw OacsError via oacsRequest.
    applyTemplate: (t, s) => F(
      `/oacs/templates/${t}/apply`,
      { method: "POST", body: JSON.stringify(s) }
    ),
    // Day 2 Tranche 2 item #4 — Entity directory lookup for the template apply
    //   modal's entity selector. Typical query: {role_level_not: 'super_user',
    //   is_active: true} to exclude super-users from bulk template application.
    // 200:  { ok, data: { entities: [{entity_id, name, email, role_level, department}...] } }
    // Endpoint may not be live yet — caller should fall back to deriving entities
    // from canonical.roleAssignments on failure.
    getEntities: (t = {}) => {
      const s = new URLSearchParams(t).toString();
      return F(`/oacs/entities${s ? "?" + s : ""}`);
    },
    // Day 2 Tranche 3 items #2/#3 — Role & agent assignment CRUD.
    //
    // Role assignments (human operators):
    //   POST   /oacs/role-assignments            body: {entity_id, role_level, scope, reason?}
    //   PATCH  /oacs/role-assignments/{id}       body: {role_level?, scope?, is_active?, reason?}
    //   DELETE /oacs/role-assignments/{id}       body: {reason?}
    //
    // Agent assignments (API callers / service accounts):
    //   POST   /oacs/agent-assignments           body: {entity_id, api_role, scope, reason?}
    //   PATCH  /oacs/agent-assignments/{id}      body: {api_role?, scope?, is_active?, reason?}
    //   DELETE /oacs/agent-assignments/{id}      body: {reason?}
    //
    // All responses: { ok, data: { assignment | assignments | deleted }, timestamp }
    // Errors via OacsError: 403 PERMISSION_DENIED, 403 SELF_LOCKOUT_BLOCKED (on any
    //   mutation that would strip the caller's own access), 400 VALIDATION_FAILED.
    //
    // Note: DELETE carries a JSON body (the reason string). This is legal per
    //   RFC 9110 but some HTTP clients refuse — fetch() allows it, oacsRequest
    //   passes it through untouched. If the backend ever switches to a query
    //   param for the reason, only these two methods need to change.
    createRoleAssignment: (t) => F("/oacs/role-assignments", { method: "POST", body: JSON.stringify(t) }),
    updateRoleAssignment: (t, s) => F(`/oacs/role-assignments/${t}`, { method: "PATCH", body: JSON.stringify(s) }),
    deleteRoleAssignment: (t, s = {}) => F(`/oacs/role-assignments/${t}`, { method: "DELETE", body: JSON.stringify(s) }),
    createAgentAssignment: (t) => F("/oacs/agent-assignments", { method: "POST", body: JSON.stringify(t) }),
    updateAgentAssignment: (t, s) => F(`/oacs/agent-assignments/${t}`, { method: "PATCH", body: JSON.stringify(s) }),
    deleteAgentAssignment: (t, s = {}) => F(`/oacs/agent-assignments/${t}`, { method: "DELETE", body: JSON.stringify(s) }),
    // Day 2 Tranche 3 item #4 — First-login walkthrough dismissal.
    // Marks the current user's has_seen_access_control_walkthrough flag to
    // true so the FirstLoginWalkthrough overlay stops rendering on subsequent
    // loads. Auth: any authed user (not super_user required — every user
    // gets their own walkthrough dismissal and nobody can dismiss on behalf
    // of another user because the endpoint scopes to /me).
    //
    // Body: {has_seen_access_control_walkthrough: true}
    // 200:  { ok, data: { entity_id, role, is_super_user,
    //                     has_seen_access_control_walkthrough: true }, timestamp }
    // 400:  VALIDATION_FAILED — no patchable fields, or wrong type
    // 404:  NOT_FOUND — entity not found (fail-closed catch, should not
    //        happen for authed users but the backend guards anyway)
    //
    // The store's dismissWalkthrough action writes the returned data into
    // canonical.userSettings so the overlay disappears immediately on success.
    dismissWalkthrough: () => F("/oacs/user-settings/me", {
      method: "PATCH",
      body: JSON.stringify({ has_seen_access_control_walkthrough: !0 })
    }),
    // Day 2 Tranche 3 item #1 — Audit log viewer read endpoint.
    // Query params (all optional):
    //   actor_id, actor_type ('human'|'agent'), action, target_table
    //   ('module_permissions'|'role_assignments'|'agent_assignments'|'role_templates'),
    //   since (ISO8601 >=), until (ISO8601 <), limit (default 50, max 500),
    //   offset (default 0).
    // 200:  { ok, data: { entries: [...], count, total_matching, limit, offset }, timestamp }
    // Each entry: { id, actor_id, actor_type, actor_role, action, target_table,
    //               target_id, before_state, after_state, diff, status, reason,
    //               security_level, error_message, created_at }
    // Empty-string and null filter values are stripped by the caller before
    // URLSearchParams encoding so they don't show up as "actor_id=" noise.
    getAuditLog: (t = {}) => {
      const s = new URLSearchParams(
        Object.fromEntries(Object.entries(t).filter(([, a]) => a !== "" && a != null))
      ).toString();
      return F(`/oacs/audit-log${s ? "?" + s : ""}`);
    }
  }
}, st = ["russell", "keel", "parallax", "aether", "jared", "corey"];
function nt(t) {
  if (!t) return "";
  try {
    return new Date(t).toLocaleString(void 0, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  } catch {
    return t;
  }
}
function we(t) {
  if (!t) return "";
  const s = Date.now() - new Date(t).getTime(), a = Math.floor(s / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function lt(t) {
  if (!t) return "";
  if (typeof t == "string" && /^\d{1,2}:\d{2}/.test(t)) return t.slice(0, 5);
  try {
    const s = new Date(t);
    if (!isNaN(s.getTime()))
      return s.toLocaleTimeString(void 0, { hour: "numeric", minute: "2-digit" });
  } catch {
  }
  return String(t);
}
function it() {
  const [t, s] = S("russell"), [a, n] = S(null), [l, c] = S(null), [i, y] = S(!0);
  return D(() => {
    y(!0), Promise.all([
      $.getBriefing(t).catch(() => null),
      $.getBriefingSchedule().catch(() => null)
    ]).then(([h, p]) => {
      n(h), c(p);
    }).finally(() => y(!1));
  }, [t]), // .tgim-scope wrapper per Flux Q3 option (a): confines Tailwind utilities
  // (tailwind.bundle.config.js uses important: '.tgim-scope' + preflight:false)
  // to TGIM pages so portal styles are never clobbered.
  /* @__PURE__ */ r("div", { className: "tgim-scope space-y-6", children: [
    /* @__PURE__ */ r("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3", children: [
      /* @__PURE__ */ r("div", { children: [
        /* @__PURE__ */ e("h2", { className: "text-2xl font-bold", children: "Morning Briefing" }),
        (a == null ? void 0 : a.generated_at) && /* @__PURE__ */ r("p", { className: "text-xs text-gray-500 mt-1", children: [
          "Generated ",
          nt(a.generated_at)
        ] })
      ] }),
      /* @__PURE__ */ e(
        "select",
        {
          value: t,
          onChange: (h) => s(h.target.value),
          className: "bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-blue-500",
          children: st.map((h) => /* @__PURE__ */ e("option", { value: h, children: h }, h))
        }
      )
    ] }),
    i ? /* @__PURE__ */ e("div", { className: "text-gray-500", children: "Loading briefing..." }) : a ? /* @__PURE__ */ e(ot, { briefing: a, entityId: t }) : /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl p-8 border border-gray-800 text-center", children: [
      /* @__PURE__ */ e("div", { className: "text-3xl mb-2 text-gray-700", children: "◈" }),
      /* @__PURE__ */ e("div", { className: "text-gray-300 font-medium mb-1", children: "No briefing available yet" }),
      /* @__PURE__ */ r("div", { className: "text-sm text-gray-500", children: [
        "No briefing has been generated for ",
        t,
        ". Check the schedule below."
      ] })
    ] }),
    /* @__PURE__ */ e(dt, { schedule: l })
  ] });
}
function ot({ briefing: t, entityId: s }) {
  const a = Array.isArray(t.active_tasks) ? t.active_tasks : [], n = Array.isArray(t.pending_handoffs) ? t.pending_handoffs : [], l = Array.isArray(t.overnight_events) ? t.overnight_events : [], c = Array.isArray(t.recently_completed) ? t.recently_completed : [], y = (Array.isArray(t.team_workload) ? t.team_workload : []).filter((d) => (d.active_task_count || 0) > 0), h = y.reduce((d, m) => d + (m.active_task_count || 0), 0);
  return !a.length && !n.length && !l.length && !c.length && !y.length ? /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl p-8 border border-gray-800 text-center", children: [
    /* @__PURE__ */ e("div", { className: "text-3xl mb-3 text-blue-400", children: "◇" }),
    /* @__PURE__ */ r("div", { className: "text-gray-200 font-medium mb-1", children: [
      "All quiet for ",
      s
    ] }),
    /* @__PURE__ */ e("div", { className: "text-sm text-gray-500", children: "No active tasks, handoffs, or overnight activity. A clean slate." })
  ] }) : /* @__PURE__ */ r("div", { className: "space-y-4", children: [
    /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl border border-gray-800 overflow-hidden", children: [
      /* @__PURE__ */ e("div", { className: "bg-gradient-to-r from-blue-600/10 via-teal-500/5 to-transparent border-b border-gray-800 px-5 py-3", children: /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-blue-400 uppercase tracking-wide", children: "Today's Focus" }) }),
      /* @__PURE__ */ r("div", { className: "px-5 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ e(se, { label: "Active Tasks", value: a.length, accent: "text-blue-400" }),
        /* @__PURE__ */ e(se, { label: "Pending Handoffs", value: n.length, accent: "text-amber-400" }),
        /* @__PURE__ */ e(se, { label: "Overnight Events", value: l.length, accent: "text-teal-400" }),
        /* @__PURE__ */ e(se, { label: "Recently Done", value: c.length, accent: "text-green-400" })
      ] })
    ] }),
    a.length > 0 && /* @__PURE__ */ e(Z, { title: "Active Tasks", accent: "text-blue-400", count: a.length, children: /* @__PURE__ */ e("div", { className: "space-y-2", children: a.map((d, m) => /* @__PURE__ */ e(mt, { task: d, index: m }, d.task_id || d.id || m)) }) }),
    n.length > 0 && /* @__PURE__ */ e(Z, { title: "Pending Handoffs", accent: "text-amber-400", count: n.length, children: /* @__PURE__ */ e("div", { className: "space-y-2", children: n.map((d, m) => /* @__PURE__ */ r("div", { className: "flex items-center gap-3 bg-gray-800/50 rounded-lg px-3 py-2 text-sm border border-gray-800", children: [
      /* @__PURE__ */ e("span", { className: "text-amber-400", children: "⇄" }),
      /* @__PURE__ */ e("span", { className: "text-gray-300 font-medium", children: d.from_entity || d.from || "—" }),
      /* @__PURE__ */ e("span", { className: "text-gray-600", children: "→" }),
      /* @__PURE__ */ e("span", { className: "text-gray-300 font-medium", children: d.to_entity || d.to || "—" }),
      /* @__PURE__ */ e("span", { className: "text-gray-500 flex-1 text-right text-xs truncate", children: d.reason || d.note || d.title || "" })
    ] }, d.handoff_id || m)) }) }),
    l.length > 0 && /* @__PURE__ */ e(Z, { title: "Overnight Activity", accent: "text-teal-400", count: l.length, children: /* @__PURE__ */ e("div", { className: "space-y-2", children: l.map((d, m) => /* @__PURE__ */ r("div", { className: "flex items-start gap-3 bg-gray-800/50 rounded-lg px-3 py-2 text-sm border border-gray-800", children: [
      d.entity_id && /* @__PURE__ */ e("span", { className: "text-xs px-1.5 py-0.5 rounded bg-teal-400/10 text-teal-400 shrink-0", children: d.entity_id.replace(/^ent_/, "") }),
      /* @__PURE__ */ e("span", { className: "text-gray-300 flex-1 min-w-0 truncate", children: d.title || d.event_type || "event" }),
      d.created_at && /* @__PURE__ */ e("span", { className: "text-xs text-gray-600 shrink-0", children: we(d.created_at) })
    ] }, d.event_id || m)) }) }),
    c.length > 0 && /* @__PURE__ */ e(Z, { title: "Recently Completed", accent: "text-green-400", count: c.length, children: /* @__PURE__ */ e("div", { className: "space-y-2", children: c.slice(0, 8).map((d, m) => /* @__PURE__ */ r("div", { className: "flex items-center gap-3 bg-gray-800/50 rounded-lg px-3 py-2 text-sm border border-gray-800", children: [
      /* @__PURE__ */ e("span", { className: "text-green-400 text-xs", children: "✓" }),
      /* @__PURE__ */ e("span", { className: "text-gray-300 flex-1 min-w-0 truncate", children: d.title || d.name || "(untitled)" }),
      d.completed_at && /* @__PURE__ */ e("span", { className: "text-xs text-gray-600 shrink-0", children: we(d.completed_at) })
    ] }, d.task_id || m)) }) }),
    y.length > 0 && /* @__PURE__ */ e(Z, { title: "Team Workload", accent: "text-blue-400", count: `${h} active`, children: /* @__PURE__ */ e("div", { className: "space-y-1.5", children: y.sort((d, m) => (m.utilization_pct || 0) - (d.utilization_pct || 0)).map((d) => /* @__PURE__ */ e(ut, { entity: d }, d.entity_id)) }) })
  ] });
}
function ct(t) {
  return typeof t != "string" || t.length === 0 ? "" : t.includes("/") ? t.split("/").pop() : t;
}
function Se(t, s) {
  if (s && typeof s == "object" && typeof s.hour == "number") {
    const a = String(s.hour).padStart(2, "0"), n = typeof s.minute == "number" ? String(s.minute).padStart(2, "0") : "00";
    return {
      entity_id: t,
      time: `${a}:${n}`,
      timezone: ct(s.timezone)
    };
  }
  return { entity_id: t, time: s };
}
function dt({ schedule: t }) {
  if (!t) return null;
  let s = [];
  return Array.isArray(t.entries) ? s = t.entries : t.schedule && typeof t.schedule == "object" ? s = Object.entries(t.schedule).map(
    ([a, n]) => Se(a, n)
  ) : typeof t == "object" && !t.entries && (s = Object.entries(t).filter(([a, n]) => typeof n == "string" || typeof n == "number" || n && typeof n == "object" && typeof n.hour == "number").map(([a, n]) => Se(a, n))), s.length === 0 ? null : /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl border border-gray-800 overflow-hidden", children: [
    /* @__PURE__ */ e("div", { className: "bg-gradient-to-r from-teal-500/10 via-blue-500/5 to-transparent border-b border-gray-800 px-5 py-3", children: /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-teal-400 uppercase tracking-wide", children: "Briefing Schedule" }) }),
    /* @__PURE__ */ e("div", { className: "px-5 py-4", children: /* @__PURE__ */ e("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2", children: s.map((a, n) => {
      const l = a.entity_id || a.entity || `entry ${n + 1}`, c = typeof l == "string" ? l.replace(/^ent_/, "") : l, i = lt(a.time || a.scheduled_at || a.cron);
      return /* @__PURE__ */ r("div", { className: "flex items-center justify-between bg-gray-800/50 rounded-lg px-3 py-2 border border-gray-800", children: [
        /* @__PURE__ */ e("span", { className: "text-sm text-gray-300 truncate", children: c }),
        /* @__PURE__ */ r("span", { className: "text-xs font-mono text-teal-400 flex items-baseline gap-1.5 shrink-0", children: [
          /* @__PURE__ */ e("span", { children: i }),
          a.timezone && /* @__PURE__ */ e("span", { className: "text-gray-500", children: a.timezone })
        ] })
      ] }, a.entity_id || n);
    }) }) })
  ] });
}
function Z({ title: t, accent: s, count: a, children: n }) {
  return /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl border border-gray-800 overflow-hidden", children: [
    /* @__PURE__ */ r("div", { className: "px-5 py-3 border-b border-gray-800 flex items-center justify-between", children: [
      /* @__PURE__ */ e("h3", { className: `text-sm font-semibold uppercase tracking-wide ${s}`, children: t }),
      a != null && /* @__PURE__ */ e("span", { className: "text-xs text-gray-500 bg-gray-800 rounded-full px-2 py-0.5", children: a })
    ] }),
    /* @__PURE__ */ e("div", { className: "px-5 py-4", children: n })
  ] });
}
function se({ label: t, value: s, accent: a = "text-white" }) {
  return /* @__PURE__ */ r("div", { children: [
    /* @__PURE__ */ e("div", { className: `text-2xl font-bold ${a}`, children: s }),
    /* @__PURE__ */ e("div", { className: "text-xs text-gray-500 mt-1", children: t })
  ] });
}
function mt({ task: t, index: s }) {
  const a = t.priority || t.urgency, n = a === "critical" ? "bg-red-500/20 text-red-400" : a === "high" ? "bg-amber-500/20 text-amber-400" : a === "medium" ? "bg-blue-500/20 text-blue-400" : a === "low" ? "bg-gray-700 text-gray-400" : null;
  return /* @__PURE__ */ r("div", { className: "flex items-center gap-3 bg-gray-800/50 rounded-lg px-3 py-2 border border-gray-800", children: [
    /* @__PURE__ */ e("span", { className: "text-xs font-mono text-gray-600 w-5 text-right shrink-0", children: s + 1 }),
    /* @__PURE__ */ e("span", { className: "text-sm text-gray-200 flex-1 min-w-0 truncate", children: t.title || t.name || "(untitled task)" }),
    t.assigned_agent_id && /* @__PURE__ */ e("span", { className: "text-xs text-gray-500 shrink-0 hidden sm:inline", children: t.assigned_agent_id.replace(/^ent_/, "") }),
    a && n && /* @__PURE__ */ e("span", { className: `text-xs px-2 py-0.5 rounded font-medium ${n} shrink-0`, children: a })
  ] });
}
function ut({ entity: t }) {
  const s = t.utilization_pct || 0, a = s > 90 ? "bg-red-500" : s > 60 ? "bg-amber-500" : "bg-blue-500";
  return /* @__PURE__ */ r("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ e("span", { className: "w-24 text-sm text-gray-300 truncate", children: t.name || t.entity_id }),
    /* @__PURE__ */ e("div", { className: "flex-1 bg-gray-800 rounded-full h-2 overflow-hidden", children: /* @__PURE__ */ e("div", { className: `h-full rounded-full ${a}`, style: { width: `${Math.min(s, 100)}%` } }) }),
    /* @__PURE__ */ r("span", { className: "text-xs text-gray-500 w-20 text-right shrink-0", children: [
      t.active_task_count || 0,
      "/",
      t.capacity || 0,
      " (",
      s,
      "%)"
    ] })
  ] });
}
const gt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: it
}, Symbol.toStringTag, { value: "Module" })), Ee = ["organization", "department", "team", "project", "self"], ht = ["admin", "dept_head", "team_lead", "member"], pt = {
  admin: {
    dashboard: { can_view: !0, can_execute: !0, can_admin: !0 },
    missions: { can_view: !0, can_execute: !0, can_admin: !0 },
    tasks: { can_view: !0, can_execute: !0, can_admin: !0 },
    escalations: { can_view: !0, can_execute: !0, can_admin: !0 },
    org_chart: { can_view: !0, can_execute: !0, can_admin: !0 },
    audit_log: { can_view: !0, can_execute: !0, can_admin: !0 },
    settings: { can_view: !0, can_execute: !0, can_admin: !0 }
  },
  dept_head: {
    dashboard: { can_view: !0, can_execute: !0, can_admin: !1 },
    missions: { can_view: !0, can_execute: !0, can_admin: !1 },
    tasks: { can_view: !0, can_execute: !0, can_admin: !1 },
    escalations: { can_view: !0, can_execute: !0, can_admin: !1 },
    org_chart: { can_view: !0, can_execute: !0, can_admin: !1 },
    audit_log: { can_view: !0, can_execute: !1, can_admin: !1 },
    settings: { can_view: !0, can_execute: !1, can_admin: !1 }
  },
  team_lead: {
    dashboard: { can_view: !0, can_execute: !0, can_admin: !1 },
    missions: { can_view: !0, can_execute: !0, can_admin: !1 },
    tasks: { can_view: !0, can_execute: !0, can_admin: !1 },
    escalations: { can_view: !0, can_execute: !0, can_admin: !1 },
    org_chart: { can_view: !0, can_execute: !0, can_admin: !1 },
    audit_log: { can_view: !0, can_execute: !1, can_admin: !1 }
    // settings:  DENY (no row)
  },
  member: {
    dashboard: { can_view: !0, can_execute: !1, can_admin: !1 },
    missions: { can_view: !0, can_execute: !1, can_admin: !1 },
    tasks: { can_view: !0, can_execute: !0, can_admin: !1 },
    escalations: { can_view: !0, can_execute: !0, can_admin: !1 },
    org_chart: { can_view: !0, can_execute: !1, can_admin: !1 }
    // audit_log: DENY (no row)
    // settings:  DENY (no row)
  }
}, G = ["view", "execute", "administer"], J = ["view"], ne = [], Q = {
  admin: {
    organization: G,
    department: G,
    team: G,
    project: G,
    self: G
  },
  dept_head: {
    organization: J,
    department: G,
    team: G,
    project: G,
    self: G
  },
  team_lead: {
    organization: J,
    department: J,
    team: G,
    project: G,
    self: G
  },
  member: {
    organization: J,
    department: J,
    team: J,
    project: J,
    self: G
  },
  default: {
    organization: ne,
    department: ne,
    team: ne,
    project: ne,
    self: J
  }
}, yt = {
  // Canonical tiers map to themselves
  admin: "admin",
  dept_head: "dept_head",
  team_lead: "team_lead",
  member: "member",
  // Legacy labels → canonical tier
  CEO: "admin",
  "C-Suite": "admin",
  EVP: "dept_head",
  SVP: "dept_head",
  VP: "dept_head",
  Director: "dept_head",
  Manager: "team_lead",
  "Team Lead": "team_lead",
  "Individual Contributor": "member"
};
function bt(t) {
  if (Q[t]) return Q[t];
  const s = yt[t];
  return s && Q[s] ? Q[s] : Q.default;
}
function ft() {
  return [...ht];
}
const H = {
  view: { label: "View", short: "V", color: "text-blue-400", bg: "bg-blue-400/20" },
  execute: { label: "Execute", short: "X", color: "text-green-400", bg: "bg-green-400/20" },
  administer: { label: "Admin", short: "A", color: "text-red-400", bg: "bg-red-400/20" }
}, xt = Ye(null);
function te() {
  const t = Ze(xt);
  if (!t) throw new Error("useAuth must be used within AuthProvider");
  return t;
}
const xe = {
  Russell: ["Russell", "Parallax", "Keel"],
  Corey: ["Corey", "Witness", "ACGee"],
  Jared: ["Jared", "Aether"],
  Melanie: ["Melanie", "Tether"],
  Nathan: ["Nathan", "Lyra"],
  Phil: ["Phil", "Clarity"],
  "Mike D.": ["Mike D.", "Meridian"],
  John: ["John", "Anchor"]
}, vt = Object.keys(xe).sort((t, s) => t.localeCompare(s)), Nt = (() => {
  const t = {};
  for (const [s, a] of Object.entries(xe))
    for (const n of a) t[n] = s;
  return t;
})();
function _t(t) {
  return Nt[t] || "Other";
}
function wt(t, s) {
  return (t.type === "human" ? 0 : 1) - (s.type === "human" ? 0 : 1);
}
function St(t) {
  var l;
  const s = {};
  for (const c of t) {
    const i = _t(c.name);
    s[i] || (s[i] = []), s[i].push(c);
  }
  for (const c of Object.keys(s))
    s[c].sort(wt);
  const n = vt.filter((c) => {
    var i;
    return ((i = s[c]) == null ? void 0 : i.length) > 0;
  }).map((c) => [c, s[c]]);
  return ((l = s.Other) == null ? void 0 : l.length) > 0 && n.push(["Other", s.Other]), n;
}
const ze = "tgim.dashboard.missionFilter", ie = [
  { id: "all", label: "All Missions", projectId: null },
  { id: "tgim-v3", label: "TGIM v3 + v4", projectId: "proj_tgim-v3" }
];
function Et() {
  if (typeof window > "u") return "all";
  try {
    const t = window.sessionStorage.getItem(ze);
    return t && ie.find((s) => s.id === t) ? t : "all";
  } catch {
    return "all";
  }
}
const Y = {
  ent_keel: { name: "Keel", color: "text-blue-400", bg: "bg-blue-400/10" },
  ent_parallax: { name: "Parallax", color: "text-purple-400", bg: "bg-purple-400/10" },
  ent_aether: { name: "Aether", color: "text-amber-400", bg: "bg-amber-400/10" },
  ent_witness: { name: "Witness", color: "text-green-400", bg: "bg-green-400/10" },
  ent_russell: { name: "Russell", color: "text-cyan-400", bg: "bg-cyan-400/10" },
  default: { name: "System", color: "text-gray-400", bg: "bg-gray-400/10" }
};
function ke(t) {
  if (!t) return "";
  const s = Date.now() - new Date(t).getTime(), a = Math.floor(s / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function kt() {
  const { entity: t, entityRole: s } = te(), [a, n] = S(null), [l, c] = S(null), [i, y] = S([]), [h, p] = S(!0), [d, m] = S("team"), [b, o] = S("all"), [g, N] = S("full"), [f, w] = S(Et), T = ie.find((x) => x.id === f) || ie[0];
  function O(x) {
    w(x);
    try {
      window.sessionStorage.setItem(ze, x);
    } catch {
    }
  }
  const u = ce(async () => {
    try {
      const { data: x } = await W.from("brain_stream_events").select("event_id,entity_id,event_type,title,created_at").order("created_at", { ascending: !1 }).limit(8);
      x && y(x);
    } catch {
    }
  }, []);
  return D(() => {
    p(!0), Promise.all([
      $.getSummary(T.projectId).catch(() => null),
      $.getWorkload().catch(() => null)
    ]).then(([x, E]) => {
      n(x), c(E);
    }).finally(() => p(!1)), u();
  }, [u, T.projectId]), h ? /* @__PURE__ */ e("div", { className: "text-gray-500", children: "Loading..." }) : g === "windshield" ? /* @__PURE__ */ r("div", { className: "space-y-6", children: [
    /* @__PURE__ */ r("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ e("h2", { className: "text-2xl font-bold", children: "Executive View" }),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => N("full"),
          className: "text-xs text-gray-500 hover:text-gray-300 px-3 py-1.5 border border-gray-700 rounded-lg",
          children: "Full Dashboard"
        }
      )
    ] }),
    /* @__PURE__ */ r("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ e(K, { label: "Total Tasks", value: (a == null ? void 0 : a.total_tasks) || "—" }),
      /* @__PURE__ */ e(K, { label: "Completed", value: a ? `${a.completion_pct}%` : "—", color: "text-blue-400" }),
      /* @__PURE__ */ e(K, { label: "In Progress", value: (a == null ? void 0 : a.in_progress) || "—", color: "text-green-400" }),
      /* @__PURE__ */ e(K, { label: "Blocked", value: (a == null ? void 0 : a.blocked) || 0, color: "text-red-400" })
    ] }),
    /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl p-4 border border-gray-800", children: [
      /* @__PURE__ */ e("h3", { className: "text-sm font-medium text-gray-400 mb-3", children: "Latest Activity" }),
      /* @__PURE__ */ e("div", { className: "space-y-2", children: i.slice(0, 3).map((x) => {
        const E = Y[x.entity_id] || Y.default;
        return /* @__PURE__ */ r("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ e("span", { className: `text-xs px-1.5 py-0.5 rounded ${E.bg} ${E.color}`, children: E.name }),
          /* @__PURE__ */ e("span", { className: "text-gray-300 truncate", children: x.title }),
          /* @__PURE__ */ e("span", { className: "text-xs text-gray-600 ml-auto shrink-0", children: ke(x.created_at) })
        ] }, x.event_id);
      }) })
    ] })
  ] }) : /* @__PURE__ */ r("div", { className: "tgim-scope space-y-6", children: [
    /* @__PURE__ */ r("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3", children: [
      /* @__PURE__ */ e("h2", { className: "text-2xl font-bold", children: "Dashboard" }),
      /* @__PURE__ */ r("div", { className: "flex items-center gap-2 flex-wrap", children: [
        t && /* @__PURE__ */ r("span", { className: "text-xs text-gray-500 hidden sm:inline", children: [
          t.name,
          " · ",
          s
        ] }),
        /* @__PURE__ */ e("div", { className: "flex gap-1 bg-gray-900 rounded-lg p-0.5 border border-gray-800", children: [
          { id: "all", label: "All" },
          { id: "department", label: "Dept" },
          { id: "my", label: "My Work" }
        ].map((x) => /* @__PURE__ */ e(
          "button",
          {
            onClick: () => o(x.id),
            className: `px-2.5 py-1 rounded text-xs transition-colors ${b === x.id ? "bg-blue-600/20 text-blue-400" : "text-gray-500 hover:text-gray-300"}`,
            children: x.label
          },
          x.id
        )) }),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => N("windshield"),
            className: "text-xs text-gray-500 hover:text-gray-300 px-2 py-1 border border-gray-700 rounded",
            title: "Windshield mode — executive summary",
            children: "◇"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e(
      At,
      {
        filters: ie,
        active: f,
        onChange: O,
        activeLabel: T.label
      }
    ),
    a && /* @__PURE__ */ r("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ e(K, { label: "Total Tasks", value: a.total_tasks }),
      /* @__PURE__ */ e(K, { label: "Completed", value: `${a.completion_pct}%`, color: "text-blue-400" }),
      /* @__PURE__ */ e(K, { label: "In Progress", value: a.in_progress, color: "text-green-400" }),
      /* @__PURE__ */ e(K, { label: "Blocked", value: a.blocked, color: "text-red-400" })
    ] }),
    i.length > 0 && /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl p-4 border border-gray-800", children: [
      /* @__PURE__ */ e("h3", { className: "text-sm font-medium text-gray-400 mb-3", children: "Cross-CIV Activity" }),
      /* @__PURE__ */ e("div", { className: "space-y-2", children: i.map((x) => {
        const E = Y[x.entity_id] || Y.default;
        return /* @__PURE__ */ r("div", { className: "flex items-center gap-2 text-sm overflow-hidden", children: [
          /* @__PURE__ */ e("span", { className: `text-xs px-1.5 py-0.5 rounded shrink-0 ${E.bg} ${E.color}`, children: E.name }),
          /* @__PURE__ */ e("span", { className: "text-gray-300 truncate", children: x.title }),
          /* @__PURE__ */ e("span", { className: "text-xs text-gray-600 ml-auto shrink-0", children: ke(x.created_at) })
        ] }, x.event_id);
      }) })
    ] }),
    (a == null ? void 0 : a.by_status) && /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl p-4 border border-gray-800", children: [
      /* @__PURE__ */ e("h3", { className: "text-sm font-medium text-gray-400 mb-3", children: "Task Status" }),
      /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-2", children: Object.entries(a.by_status).map(([x, E]) => /* @__PURE__ */ r("div", { className: "flex-1 min-w-[80px] bg-gray-800 rounded-lg p-3 text-center", children: [
        /* @__PURE__ */ e("div", { className: "text-lg font-bold", children: E }),
        /* @__PURE__ */ e("div", { className: "text-xs text-gray-500 capitalize", children: x.replace("_", " ") })
      ] }, x)) })
    ] }),
    /* @__PURE__ */ e(Ct, {}),
    (l == null ? void 0 : l.entities) && /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl p-4 border border-gray-800", children: [
      /* @__PURE__ */ r("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ r("h3", { className: "text-sm font-medium text-gray-400", children: [
          "Team Workload (",
          l.summary.overall_utilization_pct,
          "% overall)"
        ] }),
        /* @__PURE__ */ r("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => m("team"),
              className: `text-xs px-2 py-1 rounded ${d === "team" ? "bg-blue-600/30 text-blue-400" : "text-gray-500 hover:text-gray-300"}`,
              children: "By Team"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => m("alpha"),
              className: `text-xs px-2 py-1 rounded ${d === "alpha" ? "bg-blue-600/30 text-blue-400" : "text-gray-500 hover:text-gray-300"}`,
              children: "A-Z"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "space-y-2", children: d === "alpha" ? [...l.entities].sort((x, E) => x.name.localeCompare(E.name)).map((x) => /* @__PURE__ */ e(Ce, { entity: x }, x.entity_id)) : Object.entries(xe).sort(([x], [E]) => x.localeCompare(E)).map(([x, E]) => {
        const L = E.map((k) => l.entities.find((R) => R.name === k)).filter(Boolean);
        return L.length === 0 ? null : /* @__PURE__ */ e("div", { className: "mb-4", children: L.map((k) => /* @__PURE__ */ e(Ce, { entity: k }, k.entity_id)) }, x);
      }) })
    ] })
  ] });
}
function Ct() {
  const [t, s] = S([]);
  return D(() => {
    W.from("entities").select("entity_id,name,entity_type,role,status,active_task_count,capacity,skills,civ_id").eq("entity_type", "ai").order("name").then(({ data: a }) => {
      a && s(a);
    });
  }, []), t.length === 0 ? null : /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl p-4 border border-gray-800", children: [
    /* @__PURE__ */ e("h3", { className: "text-sm font-medium text-gray-400 mb-3", children: "AI Entities" }),
    /* @__PURE__ */ e("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: t.map((a) => {
      var c;
      const n = Y[a.entity_id] || Y.default, l = a.capacity > 0 ? Math.round(a.active_task_count / a.capacity * 100) : 0;
      return /* @__PURE__ */ r("div", { className: "bg-gray-800/50 rounded-lg p-3", children: [
        /* @__PURE__ */ r("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ e("span", { className: `w-2 h-2 rounded-full ${a.status === "active" ? "bg-green-500" : "bg-gray-600"}` }),
          /* @__PURE__ */ e("span", { className: `text-sm font-medium ${n.color}`, children: a.name }),
          a.civ_id && /* @__PURE__ */ e("span", { className: "text-xs text-gray-600 ml-auto", children: a.civ_id })
        ] }),
        /* @__PURE__ */ r("div", { className: "flex items-center gap-2 mb-1.5", children: [
          /* @__PURE__ */ e("div", { className: "flex-1 bg-gray-700 rounded-full h-1.5 overflow-hidden", children: /* @__PURE__ */ e(
            "div",
            {
              className: `h-full rounded-full ${l > 80 ? "bg-red-500" : l > 50 ? "bg-yellow-500" : "bg-blue-500"}`,
              style: { width: `${Math.min(l, 100)}%` }
            }
          ) }),
          /* @__PURE__ */ r("span", { className: "text-xs text-gray-500", children: [
            a.active_task_count,
            "/",
            a.capacity
          ] })
        ] }),
        ((c = a.skills) == null ? void 0 : c.length) > 0 && /* @__PURE__ */ r("div", { className: "flex flex-wrap gap-1", children: [
          a.skills.slice(0, 3).map((i) => /* @__PURE__ */ e("span", { className: "text-xs bg-gray-700/50 text-gray-500 rounded px-1.5 py-0.5", children: i }, i)),
          a.skills.length > 3 && /* @__PURE__ */ r("span", { className: "text-xs text-gray-600", children: [
            "+",
            a.skills.length - 3
          ] })
        ] })
      ] }, a.entity_id);
    }) })
  ] });
}
function Ce({ entity: t }) {
  return /* @__PURE__ */ r("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ e("span", { className: "w-28 text-sm truncate", children: t.name }),
    /* @__PURE__ */ e("div", { className: "flex-1 bg-gray-800 rounded-full h-4 overflow-hidden", children: /* @__PURE__ */ e(
      "div",
      {
        className: `h-full rounded-full transition-all ${t.utilization_pct > 90 ? "bg-red-500" : t.utilization_pct > 60 ? "bg-yellow-500" : t.utilization_pct > 0 ? "bg-blue-500" : "bg-gray-700"}`,
        style: { width: `${Math.min(t.utilization_pct, 100)}%` }
      }
    ) }),
    /* @__PURE__ */ r("span", { className: "text-xs text-gray-500 w-20 text-right", children: [
      t.active_tasks,
      "/",
      t.capacity,
      " (",
      t.utilization_pct,
      "%)"
    ] })
  ] });
}
function K({ label: t, value: s, color: a = "text-white" }) {
  return /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl p-4 border border-gray-800", children: [
    /* @__PURE__ */ e("div", { className: `text-2xl font-bold ${a}`, children: s }),
    /* @__PURE__ */ e("div", { className: "text-xs text-gray-500 mt-1", children: t })
  ] });
}
function At({ filters: t, active: s, onChange: a, activeLabel: n }) {
  return /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl border border-gray-800 px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3", children: [
    /* @__PURE__ */ r("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ e("span", { className: "text-xs uppercase tracking-wide text-gray-500 font-semibold", children: "Mission Scope" }),
      /* @__PURE__ */ e("span", { className: "text-xs text-blue-400 font-medium", children: n })
    ] }),
    /* @__PURE__ */ e("div", { className: "flex gap-2 flex-wrap sm:ml-auto", children: t.map((l) => /* @__PURE__ */ e(
      "button",
      {
        onClick: () => a(l.id),
        className: `px-3 py-1 rounded-full text-xs font-medium transition-colors border ${s === l.id ? "bg-blue-600/20 text-blue-400 border-blue-500/40" : "text-gray-400 border-gray-700 hover:text-gray-200 hover:border-gray-600"}`,
        children: l.label
      },
      l.id
    )) })
  ] });
}
const Tt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: kt
}, Symbol.toStringTag, { value: "Module" })), Ae = ["in_progress", "planned", "blocked", "created", "stalled"], We = "tgim.missionControl.showAll";
function Ot() {
  if (typeof window > "u") return !0;
  try {
    const t = window.sessionStorage.getItem(We);
    return t === null ? !0 : t === "true";
  } catch {
    return !0;
  }
}
function Lt() {
  const [t] = Qe(), [s, a] = S([]), [n, l] = S(!0), [c, i] = S({}), [y, h] = S({}), [p, d] = S({}), [m, b] = S({}), [o, g] = S(Ot);
  function N() {
    g((_) => {
      const M = !_;
      try {
        window.sessionStorage.setItem(We, String(M));
      } catch {
      }
      return M;
    });
  }
  if (D(() => {
    $.getMissions().then((_) => {
      const M = _.data || [];
      a(M);
      const I = t.get("phase");
      if (I) {
        const V = M.find((v) => v.mission_id === I);
        V != null && V.parent_mission_id && (i((v) => ({ ...v, [V.parent_mission_id]: !0 })), h((v) => ({ ...v, [I]: !0 })), b((v) => ({ ...v, [I]: !0 })), $.getMissionTasks(I).then((v) => d((j) => ({ ...j, [I]: v.data || [] }))).catch(() => d((v) => ({ ...v, [I]: [] }))).finally(() => b((v) => ({ ...v, [I]: !1 }))));
      }
    }).catch(() => a([])).finally(() => l(!1));
  }, [t]), n) return /* @__PURE__ */ e("div", { className: "text-gray-500", children: "Loading..." });
  const f = s.filter((_) => !_.parent_mission_id), w = s.filter((_) => _.parent_mission_id), T = o ? f : f.filter((_) => Ae.includes(_.status)), O = f.length - f.filter((_) => Ae.includes(_.status)).length;
  function u(_) {
    return w.filter((M) => M.parent_mission_id === _).sort((M, I) => (M.sequence_order ?? 999) - (I.sequence_order ?? 999));
  }
  function x(_) {
    i((M) => ({ ...M, [_]: !M[_] }));
  }
  async function E(_) {
    const M = y[_];
    if (h((I) => ({ ...I, [_]: !M })), !M && !p[_]) {
      b((I) => ({ ...I, [_]: !0 }));
      try {
        const I = await $.getMissionTasks(_);
        d((V) => ({ ...V, [_]: I.data || [] }));
      } catch {
        d((I) => ({ ...I, [_]: [] }));
      } finally {
        b((I) => ({ ...I, [_]: !1 }));
      }
    }
  }
  const L = T.reduce((_, M) => _ + (M.total_tasks || 0), 0), k = T.reduce((_, M) => _ + (M.completed_tasks || 0), 0), R = L > 0 ? Math.round(k / L * 100) : 0;
  return /* @__PURE__ */ r("div", { className: "tgim-scope space-y-6", children: [
    /* @__PURE__ */ r("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2", children: [
      /* @__PURE__ */ e("h2", { className: "text-2xl font-bold", children: "Mission Control" }),
      /* @__PURE__ */ r("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ r("span", { className: "text-sm text-gray-500", children: [
          L,
          " tasks, ",
          R,
          "% complete"
        ] }),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: N,
            className: `text-sm px-3 py-1 rounded-lg transition-colors ${o ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" : "text-gray-500 hover:text-gray-300 border border-gray-700"}`,
            children: o ? "All Missions" : `Active Only${O > 0 ? ` (${O} hidden)` : ""}`
          }
        ),
        /* @__PURE__ */ e(pe, { to: "/kanban", className: "text-sm text-blue-400 hover:text-blue-300 transition-colors", children: "Switch to Kanban" })
      ] })
    ] }),
    T.length === 0 && (f.length > 0 && !o ? /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl border border-gray-800 p-6 text-center", children: [
      /* @__PURE__ */ e("div", { className: "text-2xl mb-2 text-blue-400", children: "◉" }),
      /* @__PURE__ */ e("div", { className: "text-gray-200 font-medium mb-1", children: "No active missions right now" }),
      /* @__PURE__ */ e("div", { className: "text-sm text-gray-500 mb-4", children: "All work is complete or in another state. View All to see history, or create a new mission." }),
      /* @__PURE__ */ r(
        "button",
        {
          onClick: N,
          className: "text-sm px-4 py-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 transition-colors",
          children: [
            "View All Missions (",
            f.length,
            ")"
          ]
        }
      )
    ] }) : /* @__PURE__ */ e("div", { className: "text-gray-500 text-sm", children: "No missions found." })),
    /* @__PURE__ */ e("div", { className: "space-y-3", children: T.map((_) => {
      const M = c[_.mission_id], I = u(_.mission_id), V = _.total_tasks > 0 ? Math.round(_.completed_tasks / _.total_tasks * 100) : 0;
      return /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl border border-gray-800 overflow-hidden", children: [
        /* @__PURE__ */ r(
          "button",
          {
            onClick: () => x(_.mission_id),
            className: "w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-800/50 transition-colors text-left",
            children: [
              /* @__PURE__ */ e("span", { className: "text-gray-500 text-xs w-4", children: M ? "▼" : "▶" }),
              /* @__PURE__ */ e(de, { status: _.status }),
              /* @__PURE__ */ e("span", { className: "font-medium flex-1 min-w-0 truncate", children: _.title }),
              /* @__PURE__ */ r("div", { className: "hidden sm:flex items-center gap-3 shrink-0", children: [
                /* @__PURE__ */ e(me, { pct: V }),
                /* @__PURE__ */ r("span", { className: "text-xs text-gray-500 whitespace-nowrap", children: [
                  _.completed_tasks,
                  "/",
                  _.total_tasks,
                  " tasks"
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ r("div", { className: "sm:hidden px-4 pb-2 -mt-1 flex items-center gap-3", children: [
          /* @__PURE__ */ e(me, { pct: V }),
          /* @__PURE__ */ r("span", { className: "text-xs text-gray-500 whitespace-nowrap", children: [
            _.completed_tasks,
            "/",
            _.total_tasks
          ] })
        ] }),
        M && /* @__PURE__ */ r("div", { className: "border-t border-gray-800", children: [
          I.length === 0 && /* @__PURE__ */ e("div", { className: "px-6 py-3 text-sm text-gray-500", children: "No phases found." }),
          I.map((v) => {
            const j = y[v.mission_id], B = p[v.mission_id] || [], U = m[v.mission_id], X = v.total_tasks > 0 ? Math.round(v.completed_tasks / v.total_tasks * 100) : 0;
            return /* @__PURE__ */ r("div", { children: [
              /* @__PURE__ */ r(
                "button",
                {
                  onClick: () => E(v.mission_id),
                  className: "w-full px-4 pl-8 py-2.5 flex items-center gap-3 hover:bg-gray-800/30 transition-colors text-left border-b border-gray-800/50",
                  children: [
                    /* @__PURE__ */ e("span", { className: "text-gray-500 text-xs w-4", children: j ? "▼" : "▶" }),
                    /* @__PURE__ */ e(de, { status: v.status }),
                    /* @__PURE__ */ e("span", { className: "flex-1 text-sm min-w-0 truncate", children: v.title }),
                    /* @__PURE__ */ r("div", { className: "hidden sm:flex items-center gap-3 shrink-0", children: [
                      /* @__PURE__ */ e(me, { pct: X, small: !0 }),
                      /* @__PURE__ */ r("span", { className: "text-xs text-gray-500 whitespace-nowrap", children: [
                        v.completed_tasks,
                        "/",
                        v.total_tasks
                      ] })
                    ] })
                  ]
                }
              ),
              j && /* @__PURE__ */ r("div", { className: "bg-gray-950/50", children: [
                U && /* @__PURE__ */ e("div", { className: "px-12 py-2 text-xs text-gray-500", children: "Loading tasks..." }),
                !U && B.length === 0 && /* @__PURE__ */ e("div", { className: "px-12 py-2 text-xs text-gray-500", children: "No tasks." }),
                B.map((A) => /* @__PURE__ */ r(
                  pe,
                  {
                    to: `/tasks/${A.task_id}`,
                    className: "px-4 pl-14 py-2 flex items-center gap-3 hover:bg-gray-800/50 transition-colors border-b border-gray-800/30",
                    children: [
                      /* @__PURE__ */ e(de, { status: A.status }),
                      /* @__PURE__ */ e("span", { className: "flex-1 text-sm min-w-0 truncate", children: A.title }),
                      /* @__PURE__ */ e("span", { className: "text-xs text-gray-500 shrink-0", children: A.assigned_agent_id || "—" })
                    ]
                  },
                  A.task_id
                ))
              ] })
            ] }, v.mission_id);
          })
        ] })
      ] }, _.mission_id);
    }) })
  ] });
}
function de({ status: t }) {
  const s = {
    completed: { background: "#2563eb", color: "#fff" },
    in_progress: { background: "#16a34a", color: "#fff" },
    created: { background: "#4b5563", color: "#e5e7eb" },
    blocked: { background: "#dc2626", color: "#fff" },
    planned: { background: "#4b5563", color: "#e5e7eb" },
    stalled: { background: "#ca8a04", color: "#fff" },
    archived: { background: "#374151", color: "#9ca3af" }
  };
  if (!t) return null;
  const a = s[t] || s.created;
  return /* @__PURE__ */ e(
    "span",
    {
      style: {
        background: a.background,
        color: a.color,
        padding: "2px 8px",
        borderRadius: "4px",
        fontSize: "11px",
        fontWeight: 600,
        whiteSpace: "nowrap"
      },
      children: t.replace(/_/g, " ")
    }
  );
}
function me({ pct: t, small: s }) {
  const a = s ? "h-1.5" : "h-2";
  return /* @__PURE__ */ e("div", { className: `${s ? "w-16" : "w-24"} ${a} bg-gray-700 rounded-full overflow-hidden`, children: /* @__PURE__ */ e(
    "div",
    {
      className: `${a} rounded-full transition-all`,
      style: {
        width: `${t}%`,
        background: t === 100 ? "#2563eb" : t > 50 ? "#16a34a" : "#ca8a04"
      }
    }
  ) });
}
const Rt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Lt
}, Symbol.toStringTag, { value: "Module" }));
function Mt({ taskId: t, projectId: s }) {
  const [a, n] = S([]), [l, c] = S({}), [i, y] = S(!0), [h, p] = S(!1), [d, m] = S(!1), [b, o] = S({}), g = ce(async () => {
    try {
      const [O, u] = await Promise.all([
        $.getCustomFields(s).catch(() => ({ data: [] })),
        $.getCustomValues(t).catch(() => ({ data: [] }))
      ]), x = (O == null ? void 0 : O.data) || [], E = (u == null ? void 0 : u.data) || [];
      n(x);
      const L = {};
      for (const k of E)
        L[k.field_id] = k.value || "";
      c(L), o({});
    } catch (O) {
      console.error("Failed to load custom fields:", O);
    } finally {
      y(!1);
    }
  }, [t, s]);
  D(() => {
    g();
  }, [g]);
  function N(O, u) {
    c((x) => ({ ...x, [O]: u })), o((x) => ({ ...x, [O]: !0 }));
  }
  async function f() {
    const O = {};
    for (const [u, x] of Object.entries(b))
      x && (O[u] = l[u] || "");
    if (Object.keys(O).length !== 0) {
      p(!0);
      try {
        await $.setCustomValues(t, O), o({});
      } catch (u) {
        console.error("Failed to save custom values:", u);
      } finally {
        p(!1);
      }
    }
  }
  async function w(O) {
    try {
      await $.deleteCustomField(O), await g();
    } catch (u) {
      console.error("Failed to delete field:", u);
    }
  }
  const T = Object.values(b).some(Boolean);
  return i ? null : a.length === 0 && !d ? /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl p-4 border border-gray-800", children: [
    /* @__PURE__ */ r("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ e("h3", { className: "text-sm font-medium text-gray-400", children: "Custom Fields" }),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => m(!0),
          className: "text-xs text-blue-400 hover:text-blue-300",
          children: "+ Add Field"
        }
      )
    ] }),
    /* @__PURE__ */ e("p", { className: "text-xs text-gray-600 mt-2", children: "No custom fields defined for this project." })
  ] }) : /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl p-4 border border-gray-800", children: [
    /* @__PURE__ */ r("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ e("h3", { className: "text-sm font-medium text-gray-400", children: "Custom Fields" }),
      /* @__PURE__ */ r("div", { className: "flex items-center gap-2", children: [
        T && /* @__PURE__ */ e(
          "button",
          {
            onClick: f,
            disabled: h,
            className: "px-3 py-1 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 rounded text-xs text-white transition-colors",
            children: h ? "Saving..." : "Save"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => m(!d),
            className: "text-xs text-blue-400 hover:text-blue-300",
            children: "+ Add Field"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "space-y-3", children: a.map((O) => /* @__PURE__ */ e(
      $t,
      {
        definition: O,
        value: l[O.id] || "",
        onChange: (u) => N(O.id, u),
        onDelete: () => w(O.id)
      },
      O.id
    )) }),
    d && /* @__PURE__ */ e(
      Pt,
      {
        projectId: s,
        onCreated: () => {
          m(!1), g();
        },
        onCancel: () => m(!1)
      }
    )
  ] });
}
function $t({ definition: t, value: s, onChange: a, onDelete: n }) {
  const { field_name: l, field_type: c, options: i } = t;
  let y = [];
  if (c === "select")
    try {
      y = typeof i == "string" ? JSON.parse(i) : i || [];
    } catch {
      y = [];
    }
  return /* @__PURE__ */ r("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ e("label", { className: "text-xs text-gray-500 w-28 shrink-0 truncate", title: l, children: l }),
    /* @__PURE__ */ e("div", { className: "flex-1", children: c === "select" ? /* @__PURE__ */ r(
      "select",
      {
        value: s,
        onChange: (h) => a(h.target.value),
        className: "w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-blue-500",
        children: [
          /* @__PURE__ */ e("option", { value: "", children: "--" }),
          y.map((h) => /* @__PURE__ */ e("option", { value: h, children: h }, h))
        ]
      }
    ) : c === "date" ? /* @__PURE__ */ e(
      "input",
      {
        type: "date",
        value: s,
        onChange: (h) => a(h.target.value),
        className: "w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-blue-500"
      }
    ) : c === "number" ? /* @__PURE__ */ e(
      "input",
      {
        type: "number",
        value: s,
        onChange: (h) => a(h.target.value),
        className: "w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-blue-500"
      }
    ) : /* @__PURE__ */ e(
      "input",
      {
        type: "text",
        value: s,
        onChange: (h) => a(h.target.value),
        placeholder: "Enter value...",
        className: "w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500"
      }
    ) }),
    /* @__PURE__ */ e(
      "button",
      {
        onClick: n,
        className: "text-xs text-gray-600 hover:text-red-400 transition-colors",
        title: "Delete field",
        children: "x"
      }
    )
  ] });
}
function Pt({ projectId: t, onCreated: s, onCancel: a }) {
  const [n, l] = S(""), [c, i] = S("text"), [y, h] = S(""), [p, d] = S(!1);
  async function m(b) {
    if (b.preventDefault(), !!n.trim()) {
      d(!0);
      try {
        const o = {
          project_id: t,
          field_name: n.trim(),
          field_type: c
        };
        c === "select" && (o.options = y.split(",").map((g) => g.trim()).filter(Boolean)), await $.createCustomField(o), s();
      } catch (o) {
        console.error("Failed to create field:", o);
      } finally {
        d(!1);
      }
    }
  }
  return /* @__PURE__ */ r("form", { onSubmit: m, className: "mt-4 p-3 bg-gray-800 rounded-lg space-y-3", children: [
    /* @__PURE__ */ e("div", { className: "text-xs font-medium text-gray-400 mb-1", children: "New Custom Field" }),
    /* @__PURE__ */ r("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ e(
        "input",
        {
          type: "text",
          value: n,
          onChange: (b) => l(b.target.value),
          placeholder: "Field name",
          className: "flex-1 bg-gray-900 border border-gray-700 rounded px-2 py-1.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500"
        }
      ),
      /* @__PURE__ */ r(
        "select",
        {
          value: c,
          onChange: (b) => i(b.target.value),
          className: "bg-gray-900 border border-gray-700 rounded px-2 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-blue-500",
          children: [
            /* @__PURE__ */ e("option", { value: "text", children: "Text" }),
            /* @__PURE__ */ e("option", { value: "number", children: "Number" }),
            /* @__PURE__ */ e("option", { value: "date", children: "Date" }),
            /* @__PURE__ */ e("option", { value: "select", children: "Select" })
          ]
        }
      )
    ] }),
    c === "select" && /* @__PURE__ */ e(
      "input",
      {
        type: "text",
        value: y,
        onChange: (b) => h(b.target.value),
        placeholder: "Options (comma-separated): Low, Medium, High",
        className: "w-full bg-gray-900 border border-gray-700 rounded px-2 py-1.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500"
      }
    ),
    /* @__PURE__ */ r("div", { className: "flex gap-2 justify-end", children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: a,
          className: "px-3 py-1 text-xs text-gray-400 hover:text-gray-200 transition-colors",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          type: "submit",
          disabled: p || !n.trim(),
          className: "px-3 py-1 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 rounded text-xs text-white transition-colors",
          children: p ? "Creating..." : "Create Field"
        }
      )
    ] })
  ] });
}
const Te = {
  completed: "bg-blue-500/20 text-blue-400",
  in_progress: "bg-green-500/20 text-green-400",
  created: "bg-gray-500/20 text-gray-400",
  blocked: "bg-red-500/20 text-red-400"
}, It = {
  critical: "text-red-400",
  high: "text-yellow-400",
  medium: "text-blue-400",
  low: "text-gray-400"
};
function Dt() {
  var f;
  const { taskId: t } = et(), s = tt(), { entityId: a } = te(), [n, l] = S(null), [c, i] = S([]), [y, h] = S([]), [p, d] = S(!0), [m, b] = S(""), [o, g] = S(!1);
  D(() => {
    Promise.all([
      $.getTask(t).catch(() => null),
      $.getComments(t).catch(() => ({ data: [] })),
      $.getHandoffs(`?task_id=${t}`).catch(() => ({ data: [] }))
    ]).then(([w, T, O]) => {
      var u;
      l(((u = w == null ? void 0 : w.data) == null ? void 0 : u.task) || null), i((T == null ? void 0 : T.data) || T || []), h((O == null ? void 0 : O.data) || O || []);
    }).finally(() => d(!1));
  }, [t]);
  async function N(w) {
    if (w.preventDefault(), !!m.trim()) {
      g(!0);
      try {
        await $.addComment({
          task_id: t,
          author_entity_id: a || "ent_russell",
          content: m.trim()
        }), b("");
        const T = await $.getComments(t).catch(() => ({ data: [] }));
        i((T == null ? void 0 : T.data) || T || []);
      } catch (T) {
        console.error("Comment failed:", T);
      } finally {
        g(!1);
      }
    }
  }
  return p ? /* @__PURE__ */ e("div", { className: "text-gray-500", children: "Loading..." }) : n ? /* @__PURE__ */ r("div", { className: "tgim-scope space-y-6", children: [
    /* @__PURE__ */ e("div", { className: "flex items-start justify-between", children: /* @__PURE__ */ r("div", { children: [
      /* @__PURE__ */ e("button", { onClick: () => s(`/tasks${n.mission_id ? `?phase=${n.mission_id}` : ""}`), className: "text-sm text-gray-500 hover:text-gray-300 mb-2 block", children: "← Back to Mission Control" }),
      /* @__PURE__ */ e("h2", { className: "text-2xl font-bold", children: n.title }),
      /* @__PURE__ */ r("div", { className: "flex flex-wrap items-center gap-2 mt-2", children: [
        /* @__PURE__ */ e("span", { className: `px-2 py-0.5 rounded text-xs font-medium ${Te[n.status] || Te.created}`, children: (f = n.status) == null ? void 0 : f.replace("_", " ") }),
        /* @__PURE__ */ r("span", { className: `text-xs ${It[n.priority] || "text-gray-400"}`, children: [
          n.priority,
          " priority"
        ] }),
        /* @__PURE__ */ e("span", { className: "text-xs text-gray-600 font-mono break-all", children: n.task_id })
      ] })
    ] }) }),
    /* @__PURE__ */ r("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ r("div", { className: "lg:col-span-2 space-y-4", children: [
        n.description && /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl p-4 border border-gray-800", children: [
          /* @__PURE__ */ e("h3", { className: "text-sm font-medium text-gray-400 mb-2", children: "Description" }),
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-300 whitespace-pre-wrap", children: n.description })
        ] }),
        n.success_criteria && /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl p-4 border border-gray-800", children: [
          /* @__PURE__ */ e("h3", { className: "text-sm font-medium text-gray-400 mb-2", children: "Success Criteria" }),
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-300 whitespace-pre-wrap", children: n.success_criteria })
        ] }),
        n.outcome && /* @__PURE__ */ r("div", { className: "bg-green-900/20 rounded-xl p-4 border border-green-800", children: [
          /* @__PURE__ */ e("h3", { className: "text-sm font-medium text-green-400 mb-2", children: "Outcome" }),
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-300 whitespace-pre-wrap", children: n.outcome })
        ] }),
        /* @__PURE__ */ e(
          Mt,
          {
            taskId: t,
            projectId: n.mission_id || n.project_id || "proj_tgim-v3"
          }
        ),
        /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl p-4 border border-gray-800", children: [
          /* @__PURE__ */ r("h3", { className: "text-sm font-medium text-gray-400 mb-3", children: [
            "Comments ",
            Array.isArray(c) && c.length > 0 && `(${c.length})`
          ] }),
          /* @__PURE__ */ e("div", { className: "space-y-3 mb-4", children: Array.isArray(c) && c.length > 0 ? c.map((w, T) => /* @__PURE__ */ r("div", { className: "bg-gray-800 rounded-lg px-3 py-2", children: [
            /* @__PURE__ */ r("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ e("span", { className: "text-xs font-medium text-gray-300", children: w.author_entity_id }),
              /* @__PURE__ */ e("span", { className: "text-xs text-gray-600", children: new Date(w.created_at).toLocaleString() })
            ] }),
            /* @__PURE__ */ e("p", { className: "text-sm text-gray-400", children: w.content })
          ] }, w.comment_id || T)) : /* @__PURE__ */ e("p", { className: "text-xs text-gray-600", children: "No comments yet" }) }),
          /* @__PURE__ */ r("form", { onSubmit: N, className: "flex gap-2", children: [
            /* @__PURE__ */ e(
              "input",
              {
                type: "text",
                value: m,
                onChange: (w) => b(w.target.value),
                placeholder: "Add a comment...",
                className: "flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500"
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                type: "submit",
                disabled: o || !m.trim(),
                className: "px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 rounded-lg text-sm text-white transition-colors",
                children: "Post"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ r("div", { className: "space-y-4", children: [
        /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl p-4 border border-gray-800", children: [
          /* @__PURE__ */ e("h3", { className: "text-sm font-medium text-gray-400 mb-3", children: "Assignment" }),
          /* @__PURE__ */ r("div", { className: "space-y-2", children: [
            /* @__PURE__ */ r("div", { children: [
              /* @__PURE__ */ e("span", { className: "text-xs text-gray-500", children: "Assigned to" }),
              /* @__PURE__ */ e("div", { className: "text-sm text-gray-200 mt-0.5", children: n.assignee_entity_id || n.assigned_agent_id || "Unassigned" })
            ] }),
            n.delegated_by && /* @__PURE__ */ r("div", { children: [
              /* @__PURE__ */ e("span", { className: "text-xs text-gray-500", children: "Delegated by" }),
              /* @__PURE__ */ e("div", { className: "text-sm text-gray-200 mt-0.5", children: n.delegated_by })
            ] }),
            n.creator_entity_id && /* @__PURE__ */ r("div", { children: [
              /* @__PURE__ */ e("span", { className: "text-xs text-gray-500", children: "Created by" }),
              /* @__PURE__ */ e("div", { className: "text-sm text-gray-200 mt-0.5", children: n.creator_entity_id })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl p-4 border border-gray-800", children: [
          /* @__PURE__ */ e("h3", { className: "text-sm font-medium text-gray-400 mb-3", children: "Details" }),
          /* @__PURE__ */ r("div", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ r("div", { className: "flex justify-between gap-2", children: [
              /* @__PURE__ */ e("span", { className: "text-gray-500 shrink-0", children: "Mission" }),
              /* @__PURE__ */ e("span", { className: "text-gray-300 text-right break-all", children: n.mission_id || "—" })
            ] }),
            /* @__PURE__ */ r("div", { className: "flex justify-between gap-2", children: [
              /* @__PURE__ */ e("span", { className: "text-gray-500 shrink-0", children: "Source" }),
              /* @__PURE__ */ e("span", { className: "text-gray-300 text-right", children: n.source_civ || "—" })
            ] }),
            n.estimated_hours && /* @__PURE__ */ r("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e("span", { className: "text-gray-500", children: "Estimated" }),
              /* @__PURE__ */ r("span", { className: "text-gray-300", children: [
                n.estimated_hours,
                "h"
              ] })
            ] }),
            n.actual_hours && /* @__PURE__ */ r("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e("span", { className: "text-gray-500", children: "Actual" }),
              /* @__PURE__ */ r("span", { className: "text-gray-300", children: [
                n.actual_hours,
                "h"
              ] })
            ] }),
            /* @__PURE__ */ r("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e("span", { className: "text-gray-500", children: "Created" }),
              /* @__PURE__ */ e("span", { className: "text-gray-300", children: new Date(n.created_at).toLocaleDateString() })
            ] }),
            n.completed_at && /* @__PURE__ */ r("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e("span", { className: "text-gray-500", children: "Completed" }),
              /* @__PURE__ */ e("span", { className: "text-gray-300", children: new Date(n.completed_at).toLocaleDateString() })
            ] })
          ] })
        ] }),
        Array.isArray(y) && y.length > 0 && /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl p-4 border border-gray-800", children: [
          /* @__PURE__ */ r("h3", { className: "text-sm font-medium text-gray-400 mb-3", children: [
            "Handoffs (",
            y.length,
            ")"
          ] }),
          /* @__PURE__ */ e("div", { className: "space-y-2", children: y.map((w, T) => /* @__PURE__ */ r("div", { className: "bg-gray-800 rounded-lg px-3 py-2 text-xs", children: [
            /* @__PURE__ */ r("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ e("span", { className: "text-gray-400", children: w.from_entity_id }),
              /* @__PURE__ */ e("span", { className: "text-gray-600", children: "→" }),
              /* @__PURE__ */ e("span", { className: "text-gray-300", children: w.to_entity_id })
            ] }),
            /* @__PURE__ */ r("div", { className: "text-gray-500 mt-0.5", children: [
              w.status,
              " — ",
              w.reason
            ] })
          ] }, w.handoff_id || T)) })
        ] })
      ] })
    ] })
  ] }) : /* @__PURE__ */ e("div", { className: "text-gray-500", children: "Task not found" });
}
const jt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dt
}, Symbol.toStringTag, { value: "Module" })), Oe = [
  { key: "created", label: "To Do", color: "border-gray-500" },
  { key: "in_progress", label: "In Progress", color: "border-green-500" },
  { key: "in_review", label: "In Review", color: "border-yellow-500" },
  { key: "completed", label: "Done", color: "border-blue-500" }
], Le = {
  critical: "bg-red-500/20 text-red-400",
  high: "bg-yellow-500/20 text-yellow-400",
  medium: "bg-blue-500/20 text-blue-400",
  low: "bg-gray-500/20 text-gray-400"
};
function Ft(t) {
  return t === "completed" ? "completed" : t === "in_progress" ? "in_progress" : t === "in_review" ? "in_review" : t === "blocked" ? "in_progress" : "created";
}
function Vt() {
  const [t, s] = S([]), [a, n] = S(null), [l, c] = S(null), [i, y] = S({}), [h, p] = S(!0);
  if (D(() => {
    $.getMissions().then((g) => {
      const N = g.data || [];
      s(N);
      const f = N.filter((T) => !T.parent_mission_id), w = f.find((T) => T.status === "in_progress") || f[0];
      w && n(w.mission_id);
    }).catch(() => s([])).finally(() => p(!1));
  }, []), D(() => {
    if (!a) return;
    t.filter((N) => N.parent_mission_id === a).forEach((N) => {
      i[N.mission_id] || $.getMissionTasks(N.mission_id).then((f) => y((w) => ({ ...w, [N.mission_id]: f.data || [] }))).catch(() => y((f) => ({ ...f, [N.mission_id]: [] })));
    });
  }, [a, t]), h) return /* @__PURE__ */ e("div", { className: "text-gray-500", children: "Loading..." });
  const d = t.filter((g) => !g.parent_mission_id), m = a ? t.filter((g) => g.parent_mission_id === a).sort((g, N) => (g.sequence_order ?? 999) - (N.sequence_order ?? 999)) : [];
  let b = [];
  if (l)
    b = i[l] || [];
  else
    for (const g of m)
      b = b.concat(i[g.mission_id] || []);
  const o = {};
  for (const g of Oe) o[g.key] = [];
  for (const g of b) {
    const N = Ft(g.status);
    (o[N] || o.created).push(g);
  }
  return /* @__PURE__ */ r("div", { className: "tgim-scope space-y-4", children: [
    /* @__PURE__ */ r("div", { className: "flex justify-between items-center flex-wrap gap-2", children: [
      /* @__PURE__ */ e("h2", { className: "text-2xl font-bold", children: "Kanban Board" }),
      /* @__PURE__ */ r("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ r("span", { className: "text-sm text-gray-500", children: [
          b.length,
          " tasks"
        ] }),
        /* @__PURE__ */ e(pe, { to: "/tasks", className: "text-sm text-blue-400 hover:text-blue-300 transition-colors", children: "Switch to Mission Control" })
      ] })
    ] }),
    d.length > 0 && /* @__PURE__ */ e("div", { className: "flex items-center gap-2 flex-wrap", children: d.map((g) => /* @__PURE__ */ e(
      "button",
      {
        onClick: () => {
          n(g.mission_id), c(null);
        },
        className: `px-3 py-1 rounded-lg text-sm transition-colors ${a === g.mission_id ? "bg-blue-600/30 text-blue-400 border border-blue-600/50" : "bg-gray-800 text-gray-400 border border-gray-700 hover:text-gray-200"}`,
        children: g.title
      },
      g.mission_id
    )) }),
    m.length > 0 && /* @__PURE__ */ r("div", { className: "flex items-center gap-2 flex-wrap", children: [
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => c(null),
          className: `px-2 py-0.5 rounded text-xs transition-colors ${l ? "bg-gray-800 text-gray-500 hover:text-gray-300" : "bg-gray-600 text-white"}`,
          children: "All Phases"
        }
      ),
      m.map((g) => /* @__PURE__ */ e(
        "button",
        {
          onClick: () => c(g.mission_id),
          className: `px-2 py-0.5 rounded text-xs transition-colors ${l === g.mission_id ? "bg-gray-600 text-white" : "bg-gray-800 text-gray-500 hover:text-gray-300"}`,
          children: g.title
        },
        g.mission_id
      ))
    ] }),
    /* @__PURE__ */ e("div", { className: "flex gap-4 overflow-x-auto pb-4 min-h-[500px]", style: { scrollSnapType: "x mandatory" }, children: Oe.map((g) => /* @__PURE__ */ r("div", { className: "flex flex-col min-w-[250px] flex-1", style: { scrollSnapAlign: "start" }, children: [
      /* @__PURE__ */ r("div", { className: `border-t-2 ${g.color} bg-gray-900 rounded-t-lg px-3 py-2 flex justify-between items-center`, children: [
        /* @__PURE__ */ e("span", { className: "text-sm font-medium text-gray-300", children: g.label }),
        /* @__PURE__ */ e("span", { className: "text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full", children: o[g.key].length })
      ] }),
      /* @__PURE__ */ e("div", { className: "flex-1 bg-gray-900/50 rounded-b-lg p-2 space-y-2 overflow-y-auto", children: o[g.key].length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-gray-600 text-center py-8", children: "No tasks" }) : o[g.key].map((N) => /* @__PURE__ */ e(Bt, { task: N }, N.task_id || N.id)) })
    ] }, g.key)) })
  ] });
}
function Bt({ task: t }) {
  const s = t.task_id || t.id;
  return /* @__PURE__ */ r(
    "div",
    {
      onClick: () => window.location.href = `/tasks/${s}`,
      draggable: !1,
      className: "bg-gray-900 border border-gray-800 rounded-lg p-3 hover:border-blue-500/40 transition-colors cursor-pointer select-none",
      style: { cursor: "pointer" },
      children: [
        /* @__PURE__ */ e("div", { className: "text-sm text-gray-200 font-medium mb-2 line-clamp-2", children: t.title || t.name }),
        /* @__PURE__ */ r("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ r("div", { className: "flex items-center gap-2", children: [
            t.priority && /* @__PURE__ */ e("span", { className: `px-1.5 py-0.5 rounded text-xs font-medium ${Le[t.priority] || Le.low}`, children: t.priority }),
            t.status === "blocked" && /* @__PURE__ */ e("span", { className: "px-1.5 py-0.5 rounded text-xs font-medium bg-red-500/20 text-red-400", children: "blocked" })
          ] }),
          (t.assigned_agent_id || t.assignee) && /* @__PURE__ */ e("span", { className: "text-xs text-gray-500 truncate max-w-[80px]", children: t.assigned_agent_id || t.assignee })
        ] })
      ]
    }
  );
}
const zt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Vt
}, Symbol.toStringTag, { value: "Module" })), Re = {
  "mission-tgim-v4-phaseA": "#3b82f6",
  "mission-tgim-v4-phaseB": "#8b5cf6",
  "mission-tgim-v4-phaseC": "#f59e0b",
  "mission-tgim-v4-phaseD": "#10b981",
  "mission-tgim-v3-phase0": "#6366f1",
  "mission-tgim-v3-phase1": "#06b6d4",
  "mission-tgim-v3-phase2": "#ec4899",
  "mission-tgim-v3-phase3": "#14b8a6",
  "mission-tgim-v3-phase4": "#f97316",
  "mission-tgim-v3-phase5": "#a855f7",
  default: "#6b7280"
}, Wt = {
  completed: "bg-blue-500",
  in_progress: "bg-green-500",
  created: "bg-gray-600",
  blocked: "bg-red-500",
  pending: "bg-gray-600"
};
function Gt() {
  const [t, s] = S([]), [a, n] = S([]), [l, c] = S(!0), [i, y] = S(null), [h, p] = S("v4");
  D(() => {
    d();
  }, [h]);
  async function d() {
    var g;
    c(!0);
    try {
      const N = await $.getGantt("proj_tgim-v3"), f = ((g = N == null ? void 0 : N.rows) == null ? void 0 : g.filter((w) => w.type === "group")) || [];
      if (f.length > 0) {
        s(f.map((w) => ({
          id: w.id,
          name: w.name,
          progress: w.progress,
          color: w.color,
          completedCount: w.completed_count,
          totalCount: w.children_count,
          tasks: []
        }))), c(!1);
        return;
      }
    } catch {
    }
    try {
      const N = h === "v4" ? "mission-tgim-v4" : "mission-tgim-v3", { data: f } = await W.from("tasks").select("task_id, title, status, mission_id, source_civ, assigned_agent_id, updated_at, created_at").like("mission_id", `${N}%`).order("task_id");
      if (f) {
        n(f);
        const w = {};
        f.forEach((O) => {
          const u = O.mission_id || "unknown";
          w[u] || (w[u] = []), w[u].push(O);
        });
        const T = Object.entries(w).sort(([O], [u]) => O.localeCompare(u)).map(([O, u]) => {
          var R;
          const x = u.filter((_) => _.status === "completed").length, E = u.length, L = E > 0 ? Math.round(x / E * 100) : 0, k = ((R = O.match(/phase([A-Z0-9]+)/)) == null ? void 0 : R[1]) || O;
          return {
            id: O,
            name: `Phase ${k}`,
            progress: L,
            color: Re[O] || Re.default,
            completedCount: x,
            totalCount: E,
            inProgress: u.filter((_) => _.status === "in_progress").length,
            blocked: u.filter((_) => _.status === "blocked").length,
            tasks: u
          };
        });
        s(T);
      }
    } catch (N) {
      console.error("Timeline load failed:", N);
    } finally {
      c(!1);
    }
  }
  if (l) return /* @__PURE__ */ e("div", { className: "text-gray-500", children: "Loading..." });
  const m = t.reduce((g, N) => g + N.totalCount, 0), b = t.reduce((g, N) => g + N.completedCount, 0), o = m > 0 ? Math.round(b / m * 100) : 0;
  return /* @__PURE__ */ r("div", { className: "tgim-scope space-y-6", children: [
    /* @__PURE__ */ r("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3", children: [
      /* @__PURE__ */ r("div", { children: [
        /* @__PURE__ */ e("h2", { className: "text-2xl font-bold", children: "Timeline" }),
        /* @__PURE__ */ r("p", { className: "text-sm text-gray-500 mt-1", children: [
          b,
          "/",
          m,
          " tasks complete — ",
          o,
          "% overall"
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "flex gap-1 bg-gray-900 rounded-lg p-0.5 border border-gray-800", children: ["v4", "v3"].map((g) => /* @__PURE__ */ r(
        "button",
        {
          onClick: () => p(g),
          className: `px-3 py-1 rounded text-xs transition-colors ${h === g ? "bg-blue-600/20 text-blue-400" : "text-gray-500 hover:text-gray-300"}`,
          children: [
            "TGIM ",
            g
          ]
        },
        g
      )) })
    ] }),
    /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl p-4 border border-gray-800", children: [
      /* @__PURE__ */ r("div", { className: "flex justify-between items-center mb-2", children: [
        /* @__PURE__ */ e("span", { className: "text-sm font-medium text-gray-300", children: "Overall Progress" }),
        /* @__PURE__ */ r("span", { className: "text-sm text-blue-400 font-bold", children: [
          o,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "w-full bg-gray-800 rounded-full h-4 overflow-hidden", children: /* @__PURE__ */ e(
        "div",
        {
          className: "h-full rounded-full bg-blue-500 transition-all",
          style: { width: `${o}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ e("div", { className: "space-y-3", children: t.map((g) => {
      var f;
      const N = i === g.id;
      return /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl border border-gray-800 overflow-hidden", children: [
        /* @__PURE__ */ r(
          "div",
          {
            className: "p-4 cursor-pointer hover:bg-gray-800/30 transition-colors",
            onClick: () => y(N ? null : g.id),
            children: [
              /* @__PURE__ */ r("div", { className: "flex justify-between items-center mb-2", children: [
                /* @__PURE__ */ r("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ e("span", { className: "text-xs text-gray-600", children: N ? "▼" : "▶" }),
                  /* @__PURE__ */ e("span", { className: "font-medium", children: g.name }),
                  /* @__PURE__ */ e("span", { className: "text-xs text-gray-600 font-mono", children: g.id })
                ] }),
                /* @__PURE__ */ r("div", { className: "flex items-center gap-3", children: [
                  g.inProgress > 0 && /* @__PURE__ */ r("span", { className: "text-xs text-green-400", children: [
                    g.inProgress,
                    " active"
                  ] }),
                  g.blocked > 0 && /* @__PURE__ */ r("span", { className: "text-xs text-red-400", children: [
                    g.blocked,
                    " blocked"
                  ] }),
                  /* @__PURE__ */ r("span", { className: "text-sm text-gray-400", children: [
                    g.progress,
                    "%"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ e("div", { className: "w-full bg-gray-800 rounded-full h-3 overflow-hidden", children: /* @__PURE__ */ e(
                "div",
                {
                  className: "h-full rounded-full transition-all",
                  style: { width: `${g.progress}%`, backgroundColor: g.color }
                }
              ) }),
              /* @__PURE__ */ r("div", { className: "mt-1 text-xs text-gray-500", children: [
                g.completedCount,
                "/",
                g.totalCount,
                " tasks complete"
              ] })
            ]
          }
        ),
        N && ((f = g.tasks) == null ? void 0 : f.length) > 0 && /* @__PURE__ */ e("div", { className: "border-t border-gray-800 px-4 py-2", children: g.tasks.map((w) => {
          var T;
          return /* @__PURE__ */ r("div", { className: "flex items-center gap-2 py-1.5 text-sm", children: [
            /* @__PURE__ */ e("span", { className: `w-2 h-2 rounded-full shrink-0 ${Wt[w.status] || "bg-gray-600"}` }),
            /* @__PURE__ */ e("span", { className: "text-gray-400 font-mono text-xs shrink-0 w-24 truncate", children: w.task_id }),
            /* @__PURE__ */ e("span", { className: `flex-1 truncate ${w.status === "completed" ? "text-gray-500" : "text-gray-200"}`, children: w.title }),
            /* @__PURE__ */ e("span", { className: "text-xs text-gray-600 shrink-0", children: w.source_civ || "" }),
            /* @__PURE__ */ e("span", { className: `text-xs px-1.5 py-0.5 rounded shrink-0 ${w.status === "completed" ? "text-blue-400 bg-blue-400/10" : w.status === "in_progress" ? "text-green-400 bg-green-400/10" : w.status === "blocked" ? "text-red-400 bg-red-400/10" : "text-gray-500 bg-gray-500/10"}`, children: (T = w.status) == null ? void 0 : T.replace("_", " ") })
          ] }, w.task_id);
        }) })
      ] }, g.id);
    }) })
  ] });
}
const Ut = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gt
}, Symbol.toStringTag, { value: "Module" })), Ge = "tgim.workload.sortMode", qt = ["team", "alpha"];
function Ht() {
  if (typeof window > "u") return "team";
  try {
    const t = window.sessionStorage.getItem(Ge);
    return qt.includes(t) ? t : "team";
  } catch {
    return "team";
  }
}
function Jt() {
  var p;
  const [t, s] = S(null), [a, n] = S(null), [l, c] = S(!0), [i, y] = S(Ht);
  function h(d) {
    y(d);
    try {
      window.sessionStorage.setItem(Ge, d);
    } catch {
    }
  }
  return D(() => {
    Promise.all([$.getWorkload(), $.getRebalance()]).then(([d, m]) => {
      s(d), n(m);
    }).finally(() => c(!1));
  }, []), l ? /* @__PURE__ */ e("div", { className: "text-gray-500", children: "Loading..." }) : /* @__PURE__ */ r("div", { className: "tgim-scope space-y-6", children: [
    /* @__PURE__ */ r("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
      /* @__PURE__ */ e("h2", { className: "text-2xl font-bold", children: "Workload" }),
      (t == null ? void 0 : t.entities) && t.entities.length > 0 && /* @__PURE__ */ r("div", { className: "flex gap-1 bg-gray-900 rounded-lg p-0.5 border border-gray-800 self-start sm:self-auto", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => h("team"),
            className: `text-xs px-2.5 py-1 rounded transition-colors ${i === "team" ? "bg-blue-600/30 text-blue-400" : "text-gray-500 hover:text-gray-300"}`,
            children: "By Team"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => h("alpha"),
            className: `text-xs px-2.5 py-1 rounded transition-colors ${i === "alpha" ? "bg-blue-600/30 text-blue-400" : "text-gray-500 hover:text-gray-300"}`,
            children: "A-Z"
          }
        )
      ] })
    ] }),
    (t == null ? void 0 : t.entities) && (i === "alpha" ? /* @__PURE__ */ e(Ue, { entities: [...t.entities].sort((d, m) => d.name.localeCompare(m.name)) }) : /* @__PURE__ */ e(Kt, { entities: t.entities })),
    ((p = a == null ? void 0 : a.suggestions) == null ? void 0 : p.length) > 0 && /* @__PURE__ */ r("div", { className: "bg-yellow-900/20 rounded-xl p-4 border border-yellow-800", children: [
      /* @__PURE__ */ e("h3", { className: "text-sm font-medium text-yellow-400 mb-2", children: "Rebalancing Suggestions" }),
      a.suggestions.map((d, m) => /* @__PURE__ */ e("p", { className: "text-sm text-gray-300", children: d.reason }, m))
    ] })
  ] });
}
function Kt({ entities: t }) {
  const s = St(t);
  return s.length === 0 ? /* @__PURE__ */ e("div", { className: "text-sm text-gray-500", children: "No workload data." }) : /* @__PURE__ */ e("div", { className: "space-y-6", children: s.map(([a, n]) => /* @__PURE__ */ r("div", { children: [
    /* @__PURE__ */ r("div", { className: "flex items-center gap-2 mb-2", children: [
      /* @__PURE__ */ e("h3", { className: "text-xs uppercase tracking-wide text-gray-500 font-semibold", children: a === "Other" ? "Other" : `${a} Team` }),
      /* @__PURE__ */ r("span", { className: "text-xs text-gray-600", children: [
        n.length,
        " ",
        n.length === 1 ? "member" : "members"
      ] })
    ] }),
    /* @__PURE__ */ e(Ue, { entities: n })
  ] }, a)) });
}
function Ue({ entities: t }) {
  return /* @__PURE__ */ e("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: t.map((s) => /* @__PURE__ */ r("div", { className: `bg-gray-900 rounded-xl p-4 border ${s.status === "overloaded" ? "border-red-600" : s.status === "idle" ? "border-gray-700" : "border-gray-800"}`, children: [
    /* @__PURE__ */ r("div", { className: "flex justify-between items-start", children: [
      /* @__PURE__ */ r("div", { children: [
        /* @__PURE__ */ e("div", { className: "font-medium", children: s.name }),
        /* @__PURE__ */ e("div", { className: "text-xs text-gray-500 capitalize", children: s.type })
      ] }),
      /* @__PURE__ */ r("span", { className: `text-2xl font-bold ${s.utilization_pct > 90 ? "text-red-400" : s.utilization_pct > 60 ? "text-yellow-400" : s.utilization_pct > 0 ? "text-blue-400" : "text-gray-600"}`, children: [
        s.utilization_pct,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "mt-2 text-sm text-gray-400", children: [
      s.active_tasks,
      "/",
      s.capacity,
      " tasks (",
      s.available,
      " available)"
    ] })
  ] }, s.entity_id)) });
}
const Xt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Jt
}, Symbol.toStringTag, { value: "Module" })), Me = {
  task_completed: "text-blue-400",
  task_started: "text-green-400",
  task_created: "text-gray-400",
  handoff_state_change: "text-yellow-400",
  escalation: "text-red-400",
  brain_stream: "text-purple-400",
  milestone: "text-amber-400",
  comment: "text-cyan-400",
  blocked: "text-red-400",
  deployment: "text-emerald-400",
  bugfix: "text-orange-400",
  default: "text-gray-400"
}, $e = {
  task_completed: "✓",
  task_started: "▶",
  task_created: "+",
  handoff_state_change: "⇄",
  escalation: "!",
  brain_stream: "◎",
  milestone: "★",
  comment: "💬",
  blocked: "⊘",
  deployment: "🚀",
  bugfix: "🔧",
  default: "•"
};
function Yt(t) {
  if (!t) return "";
  const s = Date.now() - new Date(t).getTime(), a = Math.floor(s / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function Zt(t) {
  return t ? new Date(t).toLocaleString() : "";
}
function Qt({ evt: t }) {
  const [s, a] = S(!1), n = t.event_type || "default", l = Me[n] || Me.default, c = $e[n] || $e.default, i = t.body || t.metadata || t.task_id || t.mission_id || t.project_id || t.event_category;
  return /* @__PURE__ */ r(
    "div",
    {
      className: `bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors overflow-hidden ${i ? "cursor-pointer" : ""}`,
      onClick: () => i && a(!s),
      children: [
        /* @__PURE__ */ r("div", { className: "flex items-center gap-2 min-w-0 px-3 py-3", children: [
          /* @__PURE__ */ e("span", { className: `text-base shrink-0 ${l}`, children: c }),
          /* @__PURE__ */ e("span", { className: "text-sm font-medium text-gray-200 truncate", children: t.entity_id || t.agent_id || "system" }),
          /* @__PURE__ */ e("span", { className: `text-xs px-1.5 py-0.5 rounded shrink-0 whitespace-nowrap ${l} bg-white/5`, children: n.replace(/_/g, " ") }),
          /* @__PURE__ */ e("span", { className: "text-xs text-gray-600 shrink-0 ml-auto", children: Yt(t.created_at) }),
          i && /* @__PURE__ */ e("span", { className: "text-xs text-gray-600 shrink-0", children: s ? "▼" : "▶" })
        ] }),
        t.title && /* @__PURE__ */ e("p", { className: `text-xs text-gray-400 px-3 pb-2 pl-9 ${s ? "" : "line-clamp-2"}`, children: t.title }),
        s && /* @__PURE__ */ r("div", { className: "border-t border-gray-800 px-3 py-3 pl-9 space-y-2 text-xs", children: [
          t.body && /* @__PURE__ */ r("div", { children: [
            /* @__PURE__ */ e("span", { className: "text-gray-500", children: "Details: " }),
            /* @__PURE__ */ e("span", { className: "text-gray-300", children: t.body })
          ] }),
          t.event_category && /* @__PURE__ */ r("div", { children: [
            /* @__PURE__ */ e("span", { className: "text-gray-500", children: "Category: " }),
            /* @__PURE__ */ e("span", { className: "text-gray-300", children: t.event_category })
          ] }),
          t.task_id && /* @__PURE__ */ r("div", { children: [
            /* @__PURE__ */ e("span", { className: "text-gray-500", children: "Task: " }),
            /* @__PURE__ */ e("span", { className: "text-blue-400 font-mono", children: t.task_id })
          ] }),
          t.mission_id && /* @__PURE__ */ r("div", { children: [
            /* @__PURE__ */ e("span", { className: "text-gray-500", children: "Mission: " }),
            /* @__PURE__ */ e("span", { className: "text-purple-400 font-mono", children: t.mission_id })
          ] }),
          t.project_id && /* @__PURE__ */ r("div", { children: [
            /* @__PURE__ */ e("span", { className: "text-gray-500", children: "Project: " }),
            /* @__PURE__ */ e("span", { className: "text-gray-300 font-mono", children: t.project_id })
          ] }),
          t.metadata && Object.keys(t.metadata).length > 0 && /* @__PURE__ */ r("div", { children: [
            /* @__PURE__ */ e("span", { className: "text-gray-500", children: "Metadata: " }),
            /* @__PURE__ */ e("pre", { className: "text-gray-400 mt-1 bg-gray-800/50 rounded p-2 overflow-x-auto", children: JSON.stringify(t.metadata, null, 2) })
          ] }),
          /* @__PURE__ */ e("div", { className: "text-gray-600 pt-1", children: Zt(t.created_at) })
        ] })
      ]
    }
  );
}
function ea() {
  const [t, s] = S([]), [a, n] = S(!0), [l, c] = S(""), [i, y] = S(""), h = ce(async () => {
    try {
      const m = l ? `entity_id=${l}` : "", b = await $.getBrainStream(m), o = (b == null ? void 0 : b.data) || (b == null ? void 0 : b.events) || (Array.isArray(b) ? b : []);
      if (o.length > 0) {
        s(o), n(!1);
        return;
      }
    } catch {
    }
    try {
      let m = W.from("brain_stream_events").select("*").order("created_at", { ascending: !1 }).limit(100);
      l && (m = m.or(`entity_id.ilike.%${l}%,title.ilike.%${l}%`));
      const { data: b, error: o } = await m;
      !o && b && s(b);
    } catch (m) {
      console.error("Brain stream fetch failed:", m);
    } finally {
      n(!1);
    }
  }, [l]);
  D(() => {
    h();
    const m = setInterval(h, 3e4), b = W.channel("brain-stream-live").on("postgres_changes", {
      event: "INSERT",
      schema: "public",
      table: "brain_stream_events"
    }, (o) => {
      s((g) => [o.new, ...g]);
    }).subscribe();
    return () => {
      clearInterval(m), b.unsubscribe();
    };
  }, [h]);
  const p = i ? t.filter((m) => m.event_type === i) : t, d = [...new Set(t.map((m) => m.event_type).filter(Boolean))].sort();
  return /* @__PURE__ */ r("div", { className: "tgim-scope space-y-6", children: [
    /* @__PURE__ */ r("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3", children: [
      /* @__PURE__ */ e("h2", { className: "text-2xl font-bold", children: "Brain Stream" }),
      /* @__PURE__ */ r("div", { className: "flex items-center gap-2 w-full sm:w-auto flex-wrap", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            placeholder: "Filter by entity or keyword...",
            value: l,
            onChange: (m) => c(m.target.value),
            className: "flex-1 sm:w-48 bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500"
          }
        ),
        d.length > 0 && /* @__PURE__ */ r(
          "select",
          {
            value: i,
            onChange: (m) => y(m.target.value),
            className: "bg-gray-900 border border-gray-800 rounded-lg px-2 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-blue-500",
            children: [
              /* @__PURE__ */ e("option", { value: "", children: "All types" }),
              d.map((m) => /* @__PURE__ */ e("option", { value: m, children: m.replace(/_/g, " ") }, m))
            ]
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: h,
            className: "px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 transition-colors shrink-0",
            children: "Refresh"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "text-xs text-gray-500", children: [
      p.length,
      " events ",
      i && `(${i.replace(/_/g, " ")})`,
      " — click to expand"
    ] }),
    a ? /* @__PURE__ */ e("div", { className: "text-gray-500", children: "Loading..." }) : p.length === 0 ? /* @__PURE__ */ e("div", { className: "bg-gray-900 rounded-xl p-8 border border-gray-800 text-center text-gray-500", children: "No brain stream events found" }) : /* @__PURE__ */ e("div", { className: "space-y-1", children: p.map((m, b) => /* @__PURE__ */ e(Qt, { evt: m }, m.event_id || b)) })
  ] });
}
const ta = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ea
}, Symbol.toStringTag, { value: "Module" })), be = {
  CEO: "#dc2626",
  "C-Suite": "#f59e0b",
  EVP: "#8b5cf6",
  SVP: "#3b82f6",
  VP: "#06b6d4",
  Director: "#10b981",
  Manager: "#6366f1",
  "AI Agent": "#14b8a6",
  default: "#6b7280"
};
function fe(t) {
  return be[t] || be.default;
}
function aa() {
  var u;
  const [t, s] = S(null), [a, n] = S(!0), [l, c] = S(null), [i, y] = S(""), [h, p] = S({}), [d, m] = S(null);
  D(() => {
    b();
  }, []);
  async function b() {
    try {
      const { data: x, error: E } = await W.from("org_hierarchy").select("id, name, email, department, team, manager_email, manager_id, role_level, scope").eq("is_active", !0).order("name");
      if (E) throw E;
      if ((x == null ? void 0 : x.length) > 0)
        s(g(x));
      else {
        const L = await fetch("/data/PT_Org_Structure_OACS.csv");
        if (L.ok) {
          const k = await L.text();
          s(o(k));
        } else
          c("No org data found.");
      }
    } catch (x) {
      c(x.message);
    } finally {
      n(!1);
    }
  }
  function o(x) {
    const E = x.trim().split(`
`);
    E[0].split(",");
    const L = E.slice(1).map((_) => {
      const M = _.split(",");
      return {
        name: M[0],
        email: M[1],
        department: M[2],
        team: M[3],
        managerName: M[4],
        managerEmail: M[5],
        role: M[6]
      };
    }), k = {};
    L.forEach((_) => {
      k[_.name] = { ..._, children: [] };
    });
    let R = null;
    return L.forEach((_) => {
      _.managerName ? k[_.managerName] && k[_.managerName].children.push(k[_.name]) : R = k[_.name];
    }), R || { name: "No root found", children: [] };
  }
  function g(x) {
    const E = {};
    x.forEach((k) => {
      E[k.id] = { ...k, role: k.role_level, managerName: "", children: [] };
    });
    let L = null;
    return x.forEach((k) => {
      const R = E[k.id];
      k.manager_id ? E[k.manager_id] && (R.managerName = E[k.manager_id].name, E[k.manager_id].children.push(R)) : L = R;
    }), L || { name: "No root found", role: "", children: [] };
  }
  function N(x) {
    p((E) => ({ ...E, [x]: !E[x] }));
  }
  function f() {
    if (!t) return;
    const x = {};
    function E(L) {
      var k;
      ((k = L.children) == null ? void 0 : k.length) > 0 && (x[L.name] = !0, L.children.forEach(E));
    }
    E(t), p(x);
  }
  function w() {
    p({});
  }
  function T(x) {
    var L, k, R, _;
    if (!i) return !0;
    const E = i.toLowerCase();
    return ((L = x.name) == null ? void 0 : L.toLowerCase().includes(E)) || ((k = x.department) == null ? void 0 : k.toLowerCase().includes(E)) || ((R = x.team) == null ? void 0 : R.toLowerCase().includes(E)) || ((_ = x.role) == null ? void 0 : _.toLowerCase().includes(E));
  }
  function O(x) {
    var E;
    return T(x) ? !0 : ((E = x.children) == null ? void 0 : E.some((L) => O(L))) || !1;
  }
  return a ? /* @__PURE__ */ e("div", { className: "text-gray-500", children: "Loading org chart..." }) : l ? /* @__PURE__ */ e("div", { className: "text-red-400", children: l }) : t ? /* @__PURE__ */ r("div", { className: "tgim-scope space-y-4", children: [
    /* @__PURE__ */ r("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3", children: [
      /* @__PURE__ */ e("h2", { className: "text-2xl font-bold", children: "Organization" }),
      /* @__PURE__ */ r("div", { className: "flex items-center gap-2 w-full sm:w-auto", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            value: i,
            onChange: (x) => y(x.target.value),
            placeholder: "Search people, departments...",
            className: "flex-1 sm:w-64 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500"
          }
        ),
        /* @__PURE__ */ e("button", { onClick: w, className: "text-xs text-gray-500 hover:text-gray-300 px-2 py-1.5 border border-gray-700 rounded-lg", children: "Expand" }),
        /* @__PURE__ */ e("button", { onClick: f, className: "text-xs text-gray-500 hover:text-gray-300 px-2 py-1.5 border border-gray-700 rounded-lg", children: "Collapse" })
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-3 text-xs", children: Object.entries(be).filter(([x]) => x !== "default").map(([x, E]) => /* @__PURE__ */ r("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ e("span", { className: "w-2.5 h-2.5 rounded-full", style: { background: E } }),
      /* @__PURE__ */ e("span", { className: "text-gray-500", children: x })
    ] }, x)) }),
    /* @__PURE__ */ e("div", { className: "bg-gray-900 rounded-xl border border-gray-800 p-4 overflow-x-auto", children: /* @__PURE__ */ e(
      qe,
      {
        node: t,
        depth: 0,
        collapsed: h,
        onToggle: N,
        onSelect: m,
        selected: d,
        searchTerm: i,
        isMatch: T,
        hasMatchingDescendant: O
      }
    ) }),
    d && /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl border border-gray-800 p-4", children: [
      /* @__PURE__ */ r("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("h3", { className: "text-lg font-medium", children: d.name }),
          /* @__PURE__ */ e("div", { className: "flex items-center gap-2 mt-1", children: /* @__PURE__ */ e("span", { className: "px-2 py-0.5 rounded text-xs font-medium", style: { background: fe(d.role) + "30", color: fe(d.role) }, children: d.role }) })
        ] }),
        /* @__PURE__ */ e("button", { onClick: () => m(null), className: "text-gray-500 hover:text-gray-300", children: "✕" })
      ] }),
      /* @__PURE__ */ r("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-sm", children: [
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("span", { className: "text-gray-500", children: "Email" }),
          /* @__PURE__ */ e("div", { className: "text-gray-300 break-all", children: d.email || "—" })
        ] }),
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("span", { className: "text-gray-500", children: "Department" }),
          /* @__PURE__ */ e("div", { className: "text-gray-300", children: d.department || "—" })
        ] }),
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("span", { className: "text-gray-500", children: "Team" }),
          /* @__PURE__ */ e("div", { className: "text-gray-300", children: d.team || "—" })
        ] }),
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("span", { className: "text-gray-500", children: "Reports to" }),
          /* @__PURE__ */ e("div", { className: "text-gray-300", children: d.managerName || "None (CEO)" })
        ] }),
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("span", { className: "text-gray-500", children: "Direct Reports" }),
          /* @__PURE__ */ e("div", { className: "text-gray-300", children: ((u = d.children) == null ? void 0 : u.length) || 0 })
        ] })
      ] })
    ] })
  ] }) : /* @__PURE__ */ e("div", { className: "text-gray-500", children: "No org data available." });
}
function qe({ node: t, depth: s, collapsed: a, onToggle: n, onSelect: l, selected: c, searchTerm: i, isMatch: y, hasMatchingDescendant: h }) {
  var o;
  if (i && !h(t)) return null;
  const p = a[t.name], d = ((o = t.children) == null ? void 0 : o.length) > 0, m = (c == null ? void 0 : c.name) === t.name, b = i && y(t);
  return /* @__PURE__ */ r("div", { style: { marginLeft: s > 0 ? 16 : 0 }, children: [
    /* @__PURE__ */ r(
      "div",
      {
        className: `flex items-center gap-2 py-1 px-2 rounded-lg cursor-pointer transition-colors ${m ? "bg-blue-600/20" : "hover:bg-gray-800/50"} ${b ? "ring-1 ring-blue-500/50" : ""}`,
        onClick: () => l(t),
        children: [
          d ? /* @__PURE__ */ e(
            "button",
            {
              onClick: (g) => {
                g.stopPropagation(), n(t.name);
              },
              className: "text-gray-500 text-xs w-4 text-center shrink-0",
              children: p ? "▶" : "▼"
            }
          ) : /* @__PURE__ */ e("span", { className: "w-4 text-center text-gray-700 text-xs shrink-0", children: "•" }),
          /* @__PURE__ */ e(
            "span",
            {
              className: "w-2 h-2 rounded-full shrink-0",
              style: { background: fe(t.role) }
            }
          ),
          /* @__PURE__ */ e("span", { className: "text-sm text-gray-200 truncate", children: t.name }),
          t.role && /* @__PURE__ */ e("span", { className: "text-xs text-gray-600 shrink-0 hidden sm:inline", children: t.role }),
          d && /* @__PURE__ */ r("span", { className: "text-xs text-gray-600 shrink-0", children: [
            "(",
            t.children.length,
            ")"
          ] })
        ]
      }
    ),
    d && !p && /* @__PURE__ */ e("div", { className: "border-l border-gray-800 ml-3.5", children: t.children.map((g) => /* @__PURE__ */ e(
      qe,
      {
        node: g,
        depth: s + 1,
        collapsed: a,
        onToggle: n,
        onSelect: l,
        selected: c,
        searchTerm: i,
        isMatch: y,
        hasMatchingDescendant: h
      },
      g.name
    )) })
  ] });
}
const ra = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: aa
}, Symbol.toStringTag, { value: "Module" })), He = ["all", "24h", "7d", "30d", "custom"], Je = {
  all: "All time",
  "24h": "Last 24 hours",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  custom: "Custom..."
};
function sa() {
  try {
    const t = sessionStorage.getItem("tgim.auditlog.dateRange");
    return He.includes(t) ? t : "all";
  } catch {
    return "all";
  }
}
function Pe(t) {
  try {
    return sessionStorage.getItem(t) || "";
  } catch {
    return "";
  }
}
function na(t) {
  return t === "24h" ? new Date(Date.now() - 1440 * 60 * 1e3).toISOString() : t === "7d" ? new Date(Date.now() - 10080 * 60 * 1e3).toISOString() : t === "30d" ? new Date(Date.now() - 720 * 60 * 60 * 1e3).toISOString() : null;
}
function la(t) {
  if (!t) return "";
  const s = Date.now() - new Date(t).getTime(), a = Math.floor(s / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function ia(t, s, a) {
  var n;
  return t === "all" ? "all time" : t === "custom" ? s && a ? `${s} → ${a}` : s ? `since ${s}` : a ? `until ${a}` : "custom (no dates set)" : ((n = Je[t]) == null ? void 0 : n.toLowerCase()) || t;
}
function oa() {
  const [t, s] = S([]), [a, n] = S(!0), [l, c] = S(""), [i, y] = S(""), [h, p] = S(sa), [d, m] = S(() => Pe("tgim.auditlog.customFrom")), [b, o] = S(() => Pe("tgim.auditlog.customTo"));
  function g(u) {
    p(u);
    try {
      sessionStorage.setItem("tgim.auditlog.dateRange", u);
    } catch {
    }
  }
  function N(u) {
    m(u);
    try {
      sessionStorage.setItem("tgim.auditlog.customFrom", u);
    } catch {
    }
  }
  function f(u) {
    o(u);
    try {
      sessionStorage.setItem("tgim.auditlog.customTo", u);
    } catch {
    }
  }
  const w = ce(async () => {
    try {
      let u = W.from("brain_stream_events").select("*").order("created_at", { ascending: !1 }).limit(100);
      if (l && (u = u.eq("event_type", l)), i && (u = u.or(`entity_id.ilike.%${i}%`)), h === "custom")
        d && (u = u.gte("created_at", (/* @__PURE__ */ new Date(d + "T00:00:00.000Z")).toISOString())), b && (u = u.lte("created_at", (/* @__PURE__ */ new Date(b + "T23:59:59.999Z")).toISOString()));
      else {
        const E = na(h);
        E && (u = u.gte("created_at", E));
      }
      const { data: x } = await u;
      x && s(x);
    } catch (u) {
      console.error("Audit log fetch failed:", u);
    } finally {
      n(!1);
    }
  }, [l, i, h, d, b]);
  D(() => {
    w();
  }, [w]);
  const T = [...new Set(t.map((u) => u.event_type))].sort(), O = ia(h, d, b);
  return /* @__PURE__ */ r("div", { className: "tgim-scope space-y-4", children: [
    /* @__PURE__ */ r("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3", children: [
      /* @__PURE__ */ e("h2", { className: "text-2xl font-bold", children: "Audit Trail" }),
      /* @__PURE__ */ r("div", { className: "flex items-center gap-2 flex-wrap w-full sm:w-auto", children: [
        /* @__PURE__ */ e(
          "select",
          {
            value: h,
            onChange: (u) => g(u.target.value),
            className: "bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-blue-500",
            children: He.map((u) => /* @__PURE__ */ e("option", { value: u, children: Je[u] }, u))
          }
        ),
        h === "custom" && /* @__PURE__ */ r(ee, { children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "date",
              value: d,
              onChange: (u) => N(u.target.value),
              className: "bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-blue-500",
              "aria-label": "From date"
            }
          ),
          /* @__PURE__ */ e(
            "input",
            {
              type: "date",
              value: b,
              onChange: (u) => f(u.target.value),
              className: "bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-blue-500",
              "aria-label": "To date"
            }
          )
        ] }),
        /* @__PURE__ */ r(
          "select",
          {
            value: l,
            onChange: (u) => c(u.target.value),
            className: "bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-blue-500",
            children: [
              /* @__PURE__ */ e("option", { value: "", children: "All Types" }),
              T.map((u) => /* @__PURE__ */ e("option", { value: u, children: u.replace(/_/g, " ") }, u))
            ]
          }
        ),
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            placeholder: "Filter by entity...",
            value: i,
            onChange: (u) => y(u.target.value),
            className: "flex-1 sm:w-40 bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500"
          }
        )
      ] })
    ] }),
    a ? /* @__PURE__ */ e("div", { className: "text-gray-500", children: "Loading..." }) : t.length === 0 ? /* @__PURE__ */ e("div", { className: "bg-gray-900 rounded-xl p-8 border border-gray-800 text-center text-gray-500", children: "No audit events found" }) : /* @__PURE__ */ e("div", { className: "bg-gray-900 rounded-xl border border-gray-800 overflow-hidden", children: /* @__PURE__ */ e("div", { className: "overflow-x-auto", children: /* @__PURE__ */ r("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ r("tr", { className: "border-b border-gray-800 text-gray-500 text-xs", children: [
        /* @__PURE__ */ e("th", { className: "text-left py-2 px-3 font-normal", children: "Time" }),
        /* @__PURE__ */ e("th", { className: "text-left py-2 px-3 font-normal", children: "Entity" }),
        /* @__PURE__ */ e("th", { className: "text-left py-2 px-3 font-normal", children: "Type" }),
        /* @__PURE__ */ e("th", { className: "text-left py-2 px-3 font-normal", children: "Title" }),
        /* @__PURE__ */ e("th", { className: "text-left py-2 px-3 font-normal hidden lg:table-cell", children: "Details" })
      ] }) }),
      /* @__PURE__ */ e("tbody", { children: t.map((u) => {
        var x;
        return /* @__PURE__ */ r("tr", { className: "border-b border-gray-800/50 hover:bg-gray-800/30", children: [
          /* @__PURE__ */ e("td", { className: "py-2 px-3 text-xs text-gray-500 whitespace-nowrap", children: la(u.created_at) }),
          /* @__PURE__ */ e("td", { className: "py-2 px-3 text-xs text-gray-400 whitespace-nowrap", children: u.entity_id || "—" }),
          /* @__PURE__ */ e("td", { className: "py-2 px-3", children: /* @__PURE__ */ e("span", { className: "text-xs px-1.5 py-0.5 rounded bg-gray-800 text-gray-400", children: (x = u.event_type) == null ? void 0 : x.replace(/_/g, " ") }) }),
          /* @__PURE__ */ e("td", { className: "py-2 px-3 text-gray-300 truncate max-w-[200px] lg:max-w-[300px]", children: u.title || "—" }),
          /* @__PURE__ */ e("td", { className: "py-2 px-3 text-xs text-gray-500 truncate max-w-[200px] hidden lg:table-cell", children: u.body || (u.data ? JSON.stringify(u.data).slice(0, 100) : "—") })
        ] }, u.event_id);
      }) })
    ] }) }) }),
    /* @__PURE__ */ r("div", { className: "text-xs text-gray-600", children: [
      "Showing ",
      t.length,
      " events · ",
      O,
      " · Data from brain_stream_events"
    ] })
  ] });
}
const ca = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: oa
}, Symbol.toStringTag, { value: "Module" })), Ie = (t) => {
  let s;
  const a = /* @__PURE__ */ new Set(), n = (p, d) => {
    const m = typeof p == "function" ? p(s) : p;
    if (!Object.is(m, s)) {
      const b = s;
      s = d ?? (typeof m != "object" || m === null) ? m : Object.assign({}, s, m), a.forEach((o) => o(s, b));
    }
  }, l = () => s, y = { setState: n, getState: l, getInitialState: () => h, subscribe: (p) => (a.add(p), () => a.delete(p)) }, h = s = t(n, l, y);
  return y;
}, da = ((t) => t ? Ie(t) : Ie), ma = (t) => t;
function ua(t, s = ma) {
  const a = ae.useSyncExternalStore(
    t.subscribe,
    ae.useCallback(() => s(t.getState()), [t, s]),
    ae.useCallback(() => s(t.getInitialState()), [t, s])
  );
  return ae.useDebugValue(a), a;
}
const De = (t) => {
  const s = da(t), a = (n) => ua(s, n);
  return Object.assign(a, s), a;
}, ga = ((t) => t ? De(t) : De);
function ha(t) {
  const s = {};
  for (const [a, n] of Object.entries(t)) {
    s[a] = {};
    for (const [l, c] of Object.entries(n))
      s[a][l] = {
        can_view: !!c.can_view,
        can_create: !!c.can_execute,
        can_edit: !!c.can_execute,
        can_execute: !!c.can_execute,
        can_resolve: !!c.can_execute,
        can_admin: !!c.can_admin
      };
  }
  return s;
}
const pa = ha(pt), ya = "soft_fail_closed", ue = ["can_view", "can_create", "can_edit", "can_execute", "can_resolve", "can_admin"];
function ge() {
  return {
    // K6 — Monotonic request id for hydrate() to guard against StrictMode
    // double-invoke races. Every hydrate() call increments this at entry,
    // captures its own reqId, and refuses to write canonical if the current
    // store reqId has moved on (meaning a newer hydrate() is in flight and
    // its result is authoritative). Lives at the top level, NOT inside
    // canonical or uiState, because it's a control-plane counter — not
    // server state and not UI surface.
    __hydrateReqId: 0,
    canonical: {
      matrix: null,
      matrix_version: null,
      roleAssignments: [],
      agentAssignments: [],
      templates: [],
      userSettings: null,
      lastFetchedAt: null,
      source: "cold",
      // Day-2: add `permissionModelVersion` here if backend starts returning it
      //        alongside /oacs/matrix; for now the constant is the single source.
      //
      // Tranche 3 item #1 — audit log viewer slice.
      // Unlike the other canonical slices, this is NOT populated by hydrate()
      // (the audit endpoint is filter-driven and paged). It's populated by the
      // loadAuditLog() action on demand from AuditLogViewer.jsx.
      auditLog: {
        entries: [],
        count: 0,
        totalMatching: 0,
        limit: 50,
        offset: 0
      }
    },
    draft: {
      matrix: null
      // Day-2: add roleAssignments, agentAssignments, templates draft layers
      //        here. Shape should mirror canonical for each slice that becomes
      //        editable. Keep null/[]/{} empty sentinel until a user edit lands.
    },
    pendingOperations: [],
    // Day-2: populate via diffMatrix(get().canonical, get().draft) on every
    //        draft mutation. Shape per spec Section 7.4: array of operation
    //        descriptors — do not freelance the format, read the spec.
    uiState: {
      activeSubTab: "matrix",
      selectedRowIds: [],
      modalOpen: null,
      toasts: [],
      lastError: null,
      isLoading: !1,
      // Tranche 2: matrix-editor commit flow
      isCommitting: !1,
      lastCommitToast: null,
      conflictData: null,
      coldLoadMode: ya,
      // Tranche 2: CSV/JSON import wizard flow
      // step = 'idle' (no file loaded) | 'reviewing' (dry-run returned) |
      //        'committing' (POST in flight) | 'done' (success)
      // rows          — parsed rows from the uploaded CSV/JSON
      // dryRunResult  — backend response data (planned_changes, conflicts, summary, matrix_version)
      // error         — any transport/validation error from dry-run or commit
      importWizard: {
        step: "idle",
        rows: null,
        dryRunResult: null,
        error: null
      },
      // Tranche 2 item #4: Role template apply editor
      //
      // Drives TemplateEditor.jsx. Lifecycle:
      //   openTemplateModal(tmpl)  → selectedTemplate, modalOpen=true
      //   loadEntityList()         → entityList populated (from /oacs/entities
      //                              or fallback from canonical.roleAssignments)
      //   user picks entities/params → selectedEntityIds, paramOverrides
      //   applyTemplate()          → isSubmitting → submitSuccess or submitError
      //   closeTemplateModal()     → modalOpen=false (keeps entityList cached)
      //
      // submitError.type discriminator:
      //   'param'  — backend validation_errors target parameter_overrides.*
      //   'entity' — backend validation_errors target entity_ids (index-scoped)
      //   'server' — OACS_TEMPLATE_APPLY_ERROR or network/unknown failure
      templateEditor: {
        selectedTemplate: null,
        modalOpen: !1,
        selectedEntityIds: [],
        paramOverrides: {},
        reason: "",
        isSubmitting: !1,
        submitError: null,
        submitSuccess: null,
        entityList: [],
        entityListLoading: !1
      },
      // Tranche 3 item #1 — Audit log viewer
      //
      // Drives AuditLogViewer.jsx. Lifecycle:
      //   (mount) loadAuditLog(filters) → canonical.auditLog populated
      //   user types in filter inputs → setAuditLogFilter(key, value)
      //   user clicks Filter button → loadAuditLog({...filters, offset: 0})
      //   user clicks Prev/Next      → loadAuditLogPage(offset)
      //   user clicks a row         → setAuditLogSelectedEntry(entry)
      //   user closes modal         → setAuditLogSelectedEntry(null)
      //
      // Filter values are always strings in uiState (even limit — the select
      // onChange coerces to Number before writing, so `limit: 50` here stays
      // numeric). Empty strings mean "no filter" and are stripped by
      // loadAuditLog() before the request hits the wire.
      auditLogViewer: {
        filters: {
          actor_id: "",
          actor_type: "",
          action: "",
          target_table: "",
          since: "",
          until: "",
          limit: 50
        },
        isLoading: !1,
        lastError: null,
        // Entry object for detail modal, or null. Selecting a row sets this
        // to the full entry (so the modal doesn't need a separate fetch).
        selectedEntry: null
      },
      // Tranche 3 items #2/#3 — Role & agent assignment editor
      //
      // Drives RolesTab.jsx and AgentsTab.jsx. Both tabs share a single
      // slice because they use a unified add/delete/toggle flow — the
      // `addModalType` and `confirmDeleteType` discriminators select which
      // API method fires. Lifecycle:
      //
      //   openAddModal('role' | 'agent')  → addModalOpen=true, form reset
      //   setAddFormField(k, v)           → ui form updates (no network)
      //   submitAddAssignment()           → POST, then hydrate() on success,
      //                                     set addError on SELF_LOCKOUT_BLOCKED
      //                                     or VALIDATION_FAILED
      //   closeAddModal()                 → addModalOpen=false, preserves form
      //   confirmDelete(id, type)         → show inline "Yes/No" confirm
      //   cancelDelete()                  → clear confirm state
      //   executeDelete()                 → DELETE + hydrate, silent on
      //                                     SELF_LOCKOUT_BLOCKED (user sees
      //                                     the row still active = signal)
      //   toggleAssignmentActive(id, type, currentValue)
      //                                   → PATCH {is_active: !currentValue},
      //                                     then hydrate()
      //
      // Form shape carries BOTH role_level (for role type) and api_role (for
      // agent type). The unused field is simply empty-string when submitting.
      // submitAddAssignment() strips empty fields before the POST body.
      assignmentEditor: {
        addModalOpen: !1,
        // Discriminator — 'role' | 'agent' | null (when modal closed)
        addModalType: null,
        addForm: {
          entity_id: "",
          role_level: "",
          api_role: "",
          scope: "self",
          reason: ""
        },
        // addError.message is the human-readable failure string, surfaced in
        // the modal banner. Type 'self_lockout' | 'validation' | 'server' for
        // styling decisions (same pattern as templateEditor.submitError).
        addError: null,
        isSubmitting: !1,
        // Inline delete confirmation state — set on the 1st click of the
        // Delete button, checked on the 2nd click (Yes). id + type together
        // uniquely identify a row so the Yes button only targets one row.
        confirmDeleteId: null,
        confirmDeleteType: null
      },
      // Tranche 3 item #4 — FirstLoginWalkthrough overlay
      //
      // Drives FirstLoginWalkthrough.jsx. The overlay auto-renders when
      // canonical.userSettings.has_seen_access_control_walkthrough === false
      // (populated by hydrate() on every panel mount), and dismisses by
      // PATCHing /oacs/user-settings/me. On successful PATCH the returned
      // user-settings payload is written straight back into canonical.userSettings,
      // which flips the render gate off without requiring a full hydrate().
      //
      // isDismissing — true while the PATCH is in flight (drives the button
      //                disabled state + "Saving…" label in the overlay footer)
      // dismissError — human-readable failure string for the inline banner;
      //                null on success or initial mount. The overlay does NOT
      //                auto-retry; the user must click the button again.
      walkthrough: {
        isDismissing: !1,
        dismissError: null
      }
    }
  };
}
function ba(t, s) {
  var n, l;
  if (!s || !t) return [];
  const a = [];
  for (const [c, i] of Object.entries(s))
    for (const [y, h] of Object.entries(i))
      for (const [p, d] of Object.entries(h)) {
        const m = (l = (n = t == null ? void 0 : t[c]) == null ? void 0 : n[y]) == null ? void 0 : l[p];
        m !== d && a.push({ role: c, module: y, field: p, old_value: m, new_value: d });
      }
  return a;
}
function je(t) {
  return JSON.parse(JSON.stringify(t));
}
const C = ga((t, s) => ({
  ...ge(),
  /**
   * hydrate — fetch all 5 OACS read endpoints in parallel and populate canonical.
   *
   * Invariants:
   *   - Never throws (soft_fail_closed)
   *   - Matrix endpoint failure → rehydrate from AHSEN_MATRIX, set source to 'cold' or 'partial'
   *   - Non-matrix failures → leave that canonical field at its initial value,
   *     capture the first error into uiState.lastError
   *   - Always flips uiState.isLoading to false on completion
   *
   * Day-2: add an optional { quiet } flag to suppress the console.warn so
   *        background refreshes don't spam the console.
   */
  hydrate: async () => {
    var f, w, T, O, u, x, E, L, k, R, _, M, I, V, v, j, B, U, X;
    const a = (s().__hydrateReqId ?? 0) + 1;
    t({ __hydrateReqId: a }), t((A) => ({
      uiState: { ...A.uiState, isLoading: !0, lastError: null }
    }));
    const n = await Promise.allSettled([
      $.oacs.getMatrix(),
      $.oacs.getRoleAssignments(),
      $.oacs.getAgentAssignments(),
      $.oacs.getTemplates(),
      $.oacs.getUserSettingsMe()
    ]), [l, c, i, y, h] = n, d = { ...ge().canonical };
    let m = null, b = !1, o = !1;
    if (l.status === "fulfilled")
      d.matrix = ((w = (f = l.value) == null ? void 0 : f.data) == null ? void 0 : w.matrix) ?? l.value, d.permissionModelVersion = (O = (T = l.value) == null ? void 0 : T.data) == null ? void 0 : O.version, d.matrix_version = ((x = (u = l.value) == null ? void 0 : u.data) == null ? void 0 : x.matrix_version) ?? null;
    else {
      b = !0;
      const A = l.reason;
      console.warn(
        "[OACS] /oacs/matrix unavailable, using AHSEN_MATRIX cold-load fallback:",
        (A == null ? void 0 : A.error_code) || (A == null ? void 0 : A.message) || A
      ), d.matrix = pa;
    }
    if (c.status === "fulfilled") {
      const A = c.value;
      d.roleAssignments = Array.isArray(A) ? A : Array.isArray((E = A == null ? void 0 : A.data) == null ? void 0 : E.assignments) ? A.data.assignments : Array.isArray(A == null ? void 0 : A.data) ? A.data : (A == null ? void 0 : A.role_assignments) ?? [];
    } else
      o = !0, m || (m = c.reason), console.warn(
        "[OACS] /oacs/role-assignments unavailable:",
        ((L = c.reason) == null ? void 0 : L.error_code) || ((k = c.reason) == null ? void 0 : k.message) || c.reason
      );
    if (i.status === "fulfilled") {
      const A = i.value;
      d.agentAssignments = Array.isArray(A) ? A : Array.isArray((R = A == null ? void 0 : A.data) == null ? void 0 : R.assignments) ? A.data.assignments : Array.isArray(A == null ? void 0 : A.data) ? A.data : (A == null ? void 0 : A.agent_assignments) ?? [];
    } else
      o = !0, m || (m = i.reason), console.warn(
        "[OACS] /oacs/agent-assignments unavailable:",
        ((_ = i.reason) == null ? void 0 : _.error_code) || ((M = i.reason) == null ? void 0 : M.message) || i.reason
      );
    if (y.status === "fulfilled") {
      const A = y.value;
      d.templates = Array.isArray(A) ? A : Array.isArray((I = A == null ? void 0 : A.data) == null ? void 0 : I.templates) ? A.data.templates : Array.isArray(A == null ? void 0 : A.data) ? A.data : (A == null ? void 0 : A.templates) ?? [];
    } else
      o = !0, m || (m = y.reason), console.warn(
        "[OACS] /oacs/templates unavailable:",
        ((V = y.reason) == null ? void 0 : V.error_code) || ((v = y.reason) == null ? void 0 : v.message) || y.reason
      );
    h.status === "fulfilled" ? d.userSettings = ((j = h.value) == null ? void 0 : j.data) ?? h.value : (o = !0, m || (m = h.reason), console.warn(
      "[OACS] /oacs/user-settings/me unavailable:",
      ((B = h.reason) == null ? void 0 : B.error_code) || ((U = h.reason) == null ? void 0 : U.message) || h.reason
    ));
    let g;
    !b && !o ? g = "live" : b ? g = "cold" : g = "partial", d.source = g, d.lastFetchedAt = (/* @__PURE__ */ new Date()).toISOString();
    let N = m;
    !N && b && (N = l.reason instanceof z ? l.reason : new z({
      error_code: "NETWORK_ERROR",
      error_message: ((X = l.reason) == null ? void 0 : X.message) || "Matrix endpoint unreachable",
      http_status: 0
    })), s().__hydrateReqId === a && t((A) => ({
      canonical: d,
      uiState: {
        ...A.uiState,
        isLoading: !1,
        lastError: N || null
      }
    }));
  },
  /**
   * reset — restore initial state. Used for sign-out and by tests.
   * Day-2: call this from the auth sign-out listener so stale canonical
   * state doesn't leak across user sessions.
   */
  reset: () => {
    t(() => ge());
  },
  /**
   * setActiveSubTab — switch the active sub-tab in the Access Control panel.
   * Valid values: 'matrix' | 'roles' | 'agents' | 'templates' | 'audit'
   * Day-2: add validation if invalid tab ids start appearing in telemetry.
   */
  setActiveSubTab: (a) => {
    t((n) => ({
      uiState: { ...n.uiState, activeSubTab: a }
    }));
  },
  /**
   * clearError — dismiss the current error banner. Day-1 only hydrate()
   * writes uiState.lastError; Day-2 write actions will also write to it.
   */
  clearError: () => {
    t((a) => ({
      uiState: { ...a.uiState, lastError: null }
    }));
  },
  /**
   * toggleCell — flip one permission bool in draft.matrix.
   *
   * On first call (draft.matrix === null) it initializes draft.matrix with a
   * deep copy of canonical.matrix, so the user's edits start from the exact
   * server truth rather than from AHSEN_MATRIX or stale cached state.
   *
   * After mutating the target cell, pendingOperations is recomputed from scratch
   * via diffMatrix(canonical, draft). This is O(roles × modules × fields) ≈
   * 4 × 7 × 6 = 168 ops per toggle, trivial — well under 1ms for the v4.1 matrix.
   *
   * Fields are validated against PERMISSION_KEYS via the caller (the UI only
   * renders the 6 known bools); an unknown field name is a no-op because the
   * diff will surface it as an unexpected change but canonical lookup resolves
   * to undefined, so toggling ends up writing into a fresh cell — acceptable.
   */
  toggleCell: (a, n, l) => {
    t((c) => {
      var d;
      const i = c.canonical.matrix;
      if (!i) return c;
      const y = c.draft.matrix ?? je(i), h = je(y);
      h[a] || (h[a] = {}), h[a][n] || (h[a][n] = (d = i == null ? void 0 : i[a]) != null && d[n] ? { ...i[a][n] } : { can_view: !1, can_create: !1, can_edit: !1, can_execute: !1, can_resolve: !1, can_admin: !1 }), h[a][n][l] = !h[a][n][l];
      const p = ba(i, h);
      return {
        draft: { ...c.draft, matrix: h },
        pendingOperations: p
      };
    });
  },
  /**
   * revert — discard the draft layer and any pending operations.
   *
   * Used by the Revert button, by the 409 CONFLICT handler in commit(), and
   * by any future "cancel edits" affordance. Leaves canonical, uiState, and
   * all non-matrix draft slices untouched (future draft.roleAssignments etc.
   * should have their own revert paths).
   */
  revert: () => {
    t((a) => ({
      draft: { ...a.draft, matrix: null },
      pendingOperations: []
    }));
  },
  /**
   * commit — POST the current pendingOperations to /oacs/matrix/commit.
   *
   * Request body (per finalized backend contract):
   *   {
   *     changes: [{ role, module, field, new_value }, ...],
   *     matrix_version: <canonical.matrix_version>,
   *     reason: <string>
   *   }
   *
   * Responses:
   *   - 200 OK → call hydrate() to refresh canonical, clear draft + pending,
   *              surface "Committed" toast via uiState.lastCommitToast
   *   - 409 CONFLICT → matrix was updated by another admin; set lastError and
   *                    call revert() (spec: operator must reload before retry)
   *   - any other OacsError → set uiState.lastError, keep draft intact
   *
   * The commit flag (uiState.isCommitting) gates the UI's button disabled
   * state so double-clicks can't fire a second POST mid-flight.
   */
  commit: async (a) => {
    const n = s(), l = n.pendingOperations.map(({ role: c, module: i, field: y, new_value: h }) => ({
      role: c,
      module: i,
      field: y,
      new_value: h
    }));
    t((c) => ({
      uiState: { ...c.uiState, isCommitting: !0, lastError: null, lastCommitToast: null }
    }));
    try {
      await $.oacs.commitMatrix({
        changes: l,
        matrix_version: n.canonical.matrix_version,
        reason: a
      }), await s().hydrate(), t((c) => ({
        draft: { ...c.draft, matrix: null },
        pendingOperations: [],
        uiState: {
          ...c.uiState,
          isCommitting: !1,
          lastError: null,
          lastCommitToast: { message: "Committed", timestamp: Date.now() }
        }
      }));
    } catch (c) {
      const i = c instanceof z ? c : new z({
        error_code: "UNKNOWN",
        error_message: (c == null ? void 0 : c.message) || "Commit failed",
        http_status: 0
      });
      i.error_code === "CONFLICT" ? t((y) => ({
        draft: { ...y.draft, matrix: null },
        pendingOperations: [],
        uiState: {
          ...y.uiState,
          isCommitting: !1,
          lastError: i,
          conflictData: i.conflict_data ?? null
        }
      })) : i.http_status === 409 ? (await s().hydrate(), t((y) => ({
        draft: { ...y.draft, matrix: null },
        pendingOperations: [],
        uiState: {
          ...y.uiState,
          isCommitting: !1,
          lastError: null,
          lastCommitToast: { message: "Committed", timestamp: Date.now() }
        }
      }))) : t((y) => ({
        uiState: {
          ...y.uiState,
          isCommitting: !1,
          lastError: i
        }
      }));
    }
  },
  /**
   * clearCommitToast — dismiss the success toast after the UI has shown it.
   * Toasts are transient; the UI can auto-dismiss via setTimeout or by click.
   */
  clearCommitToast: () => {
    t((a) => ({
      uiState: { ...a.uiState, lastCommitToast: null }
    }));
  },
  /**
   * clearConflict — dismiss the matrix-conflict modal state.
   * Called by the conflict modal's Cancel/Discard/Re-apply handlers after
   * the user has chosen how to proceed with a 409 CONFLICT response.
   */
  clearConflict: () => {
    t((a) => ({ uiState: { ...a.uiState, conflictData: null, lastError: null } }));
  },
  // ─── Tranche 2: Import wizard actions ───
  //
  // Three-phase state machine driven by ImportWizard.jsx:
  //   1. setImportRows(rows)        — transition idle → reviewing, store parsed rows
  //   2. setImportDryRunResult(res) — store backend dry-run response (planned_changes etc.)
  //   3. resetImport()              — back to idle (on cancel, success, or conflict-discard)
  //
  // We keep the wizard state entirely inside uiState.importWizard so canonical,
  // draft, and pendingOperations remain untouched — the import flow does NOT
  // write through the matrix editor's draft layer. On commit success the wizard
  // triggers hydrate() to refresh canonical from the server.
  setImportRows: (a) => t((n) => ({
    uiState: {
      ...n.uiState,
      importWizard: { step: "reviewing", rows: a, dryRunResult: null, error: null }
    }
  })),
  setImportDryRunResult: (a) => t((n) => ({
    uiState: {
      ...n.uiState,
      importWizard: { ...n.uiState.importWizard, dryRunResult: a }
    }
  })),
  resetImport: () => t((a) => ({
    uiState: {
      ...a.uiState,
      importWizard: { step: "idle", rows: null, dryRunResult: null, error: null }
    }
  })),
  // ─── Tranche 2 item #4: Role template editor actions ───
  //
  // All seven actions are pure uiState patches except loadEntityList() and
  // applyTemplate() which are async and call api.oacs.*. The async actions
  // catch OacsError (not flat envelopes) because oacsRequest throws on
  // non-2xx — unlike the task-spec draft which checked `res?.ok`.
  //
  // On apply success we call hydrate() to refresh canonical.roleAssignments
  // so the matrix and roles tabs reflect the new assignments without a
  // page reload.
  openTemplateModal: (a) => t((n) => ({
    uiState: {
      ...n.uiState,
      templateEditor: {
        ...n.uiState.templateEditor,
        selectedTemplate: a,
        modalOpen: !0,
        selectedEntityIds: [],
        paramOverrides: {},
        reason: "",
        isSubmitting: !1,
        submitError: null,
        submitSuccess: null
      }
    }
  })),
  closeTemplateModal: () => t((a) => ({
    uiState: {
      ...a.uiState,
      templateEditor: {
        ...a.uiState.templateEditor,
        modalOpen: !1,
        selectedTemplate: null
      }
    }
  })),
  setTemplateEntityIds: (a) => t((n) => ({
    uiState: {
      ...n.uiState,
      templateEditor: { ...n.uiState.templateEditor, selectedEntityIds: a }
    }
  })),
  setTemplateParamOverride: (a, n) => t((l) => ({
    uiState: {
      ...l.uiState,
      templateEditor: {
        ...l.uiState.templateEditor,
        paramOverrides: { ...l.uiState.templateEditor.paramOverrides, [a]: n }
      }
    }
  })),
  setTemplateReason: (a) => t((n) => ({
    uiState: {
      ...n.uiState,
      templateEditor: { ...n.uiState.templateEditor, reason: a }
    }
  })),
  loadEntityList: async () => {
    var a;
    t((n) => ({
      uiState: {
        ...n.uiState,
        templateEditor: { ...n.uiState.templateEditor, entityListLoading: !0 }
      }
    }));
    try {
      const n = await $.oacs.getEntities({ role_level_not: "super_user", is_active: !0, actor_type: "human" }), l = ((a = n == null ? void 0 : n.data) == null ? void 0 : a.entities) ?? (n == null ? void 0 : n.entities) ?? [];
      t((c) => ({
        uiState: {
          ...c.uiState,
          templateEditor: {
            ...c.uiState.templateEditor,
            entityList: l,
            entityListLoading: !1
          }
        }
      }));
    } catch {
      const n = s().canonical.roleAssignments ?? [], l = /* @__PURE__ */ new Set(), c = [];
      for (const i of n)
        l.has(i.entity_id) || (l.add(i.entity_id), c.push({
          entity_id: i.entity_id,
          name: i.entity_name ?? i.entity_id,
          email: i.email ?? "",
          role_level: i.role_level
        }));
      t((i) => ({
        uiState: {
          ...i.uiState,
          templateEditor: {
            ...i.uiState.templateEditor,
            entityList: c,
            entityListLoading: !1
          }
        }
      }));
    }
  },
  applyTemplate: async () => {
    var h;
    const { templateEditor: a } = s().uiState, { selectedTemplate: n, selectedEntityIds: l, paramOverrides: c, reason: i } = a;
    if (!n || l.length === 0) return;
    t((p) => ({
      uiState: {
        ...p.uiState,
        templateEditor: {
          ...p.uiState.templateEditor,
          isSubmitting: !0,
          submitError: null,
          submitSuccess: null
        }
      }
    }));
    const y = {
      entity_ids: l,
      ...n.parameters_schema ? { parameter_overrides: c } : {},
      ...i ? { reason: i } : {}
    };
    try {
      const p = await $.oacs.applyTemplate(n.id, y), d = ((h = p == null ? void 0 : p.data) == null ? void 0 : h.count) ?? (p == null ? void 0 : p.count) ?? l.length;
      t((m) => ({
        uiState: {
          ...m.uiState,
          templateEditor: {
            ...m.uiState.templateEditor,
            isSubmitting: !1,
            submitSuccess: {
              count: d,
              message: `Applied to ${d} entity${d !== 1 ? "ies" : ""}`
            },
            selectedEntityIds: [],
            reason: "",
            paramOverrides: {}
          }
        }
      })), await s().hydrate();
    } catch (p) {
      const d = p instanceof z ? p : new z({
        error_code: "UNKNOWN",
        error_message: (p == null ? void 0 : p.message) || "Network error",
        http_status: 0
      }), m = d.validation_errors ?? [];
      let b;
      d.error_code === "OACS_TEMPLATE_APPLY_ERROR" || d.error_code === "NETWORK_ERROR" || d.error_code === "UNKNOWN" ? b = "server" : m.some((o) => {
        var g;
        return (g = o.field) == null ? void 0 : g.startsWith("parameter_overrides");
      }) ? b = "param" : b = "entity", t((o) => ({
        uiState: {
          ...o.uiState,
          templateEditor: {
            ...o.uiState.templateEditor,
            isSubmitting: !1,
            submitError: {
              type: b,
              validationErrors: m,
              message: d.error_message || "Apply failed"
            }
          }
        }
      }));
    }
  },
  // ─── Tranche 3 item #1: Audit log viewer actions ───
  //
  // Flat pattern — actions live directly on the store root (not inside
  // `s.actions`), same as every other action above. AuditLogViewer.jsx
  // selects them individually via `useAccessControlStore(s => s.loadAuditLog)`.
  //
  // loadAuditLog() is soft-fail: on error it records lastError in uiState
  // but does NOT throw, so the UI can stay rendered. The canonical slice is
  // left untouched on failure — the viewer will keep showing the previous
  // result set (if any) with an error banner on top.
  loadAuditLog: async (a = {}) => {
    t((l) => ({
      uiState: {
        ...l.uiState,
        auditLogViewer: {
          ...l.uiState.auditLogViewer,
          isLoading: !0,
          lastError: null
        }
      }
    }));
    const n = { limit: 50, offset: 0, ...a };
    Object.keys(n).forEach((l) => {
      (n[l] === "" || n[l] == null) && delete n[l];
    });
    try {
      const l = await $.oacs.getAuditLog(n), c = (l == null ? void 0 : l.data) ?? l;
      t((i) => ({
        canonical: {
          ...i.canonical,
          auditLog: {
            entries: (c == null ? void 0 : c.entries) ?? [],
            count: (c == null ? void 0 : c.count) ?? 0,
            totalMatching: (c == null ? void 0 : c.total_matching) ?? 0,
            limit: (c == null ? void 0 : c.limit) ?? n.limit ?? 50,
            offset: (c == null ? void 0 : c.offset) ?? n.offset ?? 0
          }
        },
        uiState: {
          ...i.uiState,
          auditLogViewer: {
            ...i.uiState.auditLogViewer,
            isLoading: !1
          }
        }
      }));
    } catch (l) {
      const c = (l == null ? void 0 : l.error_message) || (l == null ? void 0 : l.message) || "Failed to load audit log";
      t((i) => ({
        uiState: {
          ...i.uiState,
          auditLogViewer: {
            ...i.uiState.auditLogViewer,
            isLoading: !1,
            lastError: c
          }
        }
      }));
    }
  },
  setAuditLogFilter: (a, n) => t((l) => ({
    uiState: {
      ...l.uiState,
      auditLogViewer: {
        ...l.uiState.auditLogViewer,
        filters: { ...l.uiState.auditLogViewer.filters, [a]: n }
      }
    }
  })),
  setAuditLogSelectedEntry: (a) => t((n) => ({
    uiState: {
      ...n.uiState,
      auditLogViewer: { ...n.uiState.auditLogViewer, selectedEntry: a }
    }
  })),
  // Pagination helper — reads current filters from the store and dispatches
  // loadAuditLog with a new offset. Keeps the callsite in the component
  // trivial: `loadAuditLogPage(newOffset)`.
  loadAuditLogPage: async (a) => {
    const { filters: n } = s().uiState.auditLogViewer;
    await s().loadAuditLog({ ...n, offset: a });
  },
  // ─── Tranche 3 items #2/#3: Role & agent assignment actions ───
  //
  // All 8 actions live at the store root (flat pattern). Both RolesTab
  // and AgentsTab select them via `useAccessControlStore(s => s.openAddModal)`
  // rather than the nonexistent `s.actions.openAddModal`.
  //
  // The add/delete/toggle write actions share a single SELF_LOCKOUT_BLOCKED
  // handling convention:
  //   - Add    → surface as addError (visible modal banner, user can edit + retry)
  //   - Delete → silent (row stays rendered, user sees it's still there = feedback)
  //   - Toggle → silent revert (hydrate() refresh pulls the unchanged row back)
  // This matches the spec's "silently handles SELF_LOCKOUT_BLOCKED" for delete.
  openAddModal: (a) => t((n) => ({
    uiState: {
      ...n.uiState,
      assignmentEditor: {
        ...n.uiState.assignmentEditor,
        addModalOpen: !0,
        addModalType: a,
        addForm: {
          entity_id: "",
          role_level: "",
          api_role: "",
          scope: "self",
          reason: ""
        },
        addError: null,
        isSubmitting: !1
      }
    }
  })),
  closeAddModal: () => t((a) => ({
    uiState: {
      ...a.uiState,
      assignmentEditor: {
        ...a.uiState.assignmentEditor,
        addModalOpen: !1
        // Intentionally do NOT clear addModalType here — the modal unmount
        // effect reads it during close transition. Next open() resets it.
      }
    }
  })),
  setAddFormField: (a, n) => t((l) => ({
    uiState: {
      ...l.uiState,
      assignmentEditor: {
        ...l.uiState.assignmentEditor,
        addForm: { ...l.uiState.assignmentEditor.addForm, [a]: n }
      }
    }
  })),
  submitAddAssignment: async () => {
    const { assignmentEditor: a } = s().uiState, { addModalType: n, addForm: l } = a;
    if (!n) return;
    const c = n === "role" ? {
      entity_id: l.entity_id,
      role_level: l.role_level,
      scope: l.scope,
      ...l.reason ? { reason: l.reason } : {}
    } : {
      entity_id: l.entity_id,
      api_role: l.api_role,
      scope: l.scope,
      ...l.reason ? { reason: l.reason } : {}
    };
    t((i) => ({
      uiState: {
        ...i.uiState,
        assignmentEditor: {
          ...i.uiState.assignmentEditor,
          isSubmitting: !0,
          addError: null
        }
      }
    }));
    try {
      n === "role" ? await $.oacs.createRoleAssignment(c) : await $.oacs.createAgentAssignment(c), await s().hydrate(), t((i) => ({
        uiState: {
          ...i.uiState,
          assignmentEditor: {
            ...i.uiState.assignmentEditor,
            isSubmitting: !1,
            addModalOpen: !1,
            addError: null
          }
        }
      }));
    } catch (i) {
      const y = i instanceof z ? i : new z({
        error_code: "UNKNOWN",
        error_message: (i == null ? void 0 : i.message) || "Failed to create assignment",
        http_status: 0
      }), h = y.error_code === "SELF_LOCKOUT_BLOCKED" ? "self_lockout" : y.error_code === "VALIDATION_FAILED" ? "validation" : "server";
      t((p) => ({
        uiState: {
          ...p.uiState,
          assignmentEditor: {
            ...p.uiState.assignmentEditor,
            isSubmitting: !1,
            addError: {
              type: h,
              message: y.error_message || y.error_code || "Failed"
            }
          }
        }
      }));
    }
  },
  confirmDelete: (a, n) => t((l) => ({
    uiState: {
      ...l.uiState,
      assignmentEditor: {
        ...l.uiState.assignmentEditor,
        confirmDeleteId: a,
        confirmDeleteType: n
      }
    }
  })),
  cancelDelete: () => t((a) => ({
    uiState: {
      ...a.uiState,
      assignmentEditor: {
        ...a.uiState.assignmentEditor,
        confirmDeleteId: null,
        confirmDeleteType: null
      }
    }
  })),
  executeDelete: async () => {
    const { confirmDeleteId: a, confirmDeleteType: n } = s().uiState.assignmentEditor;
    if (!(!a || !n)) {
      t((l) => ({
        uiState: {
          ...l.uiState,
          assignmentEditor: {
            ...l.uiState.assignmentEditor,
            confirmDeleteId: null,
            confirmDeleteType: null
          }
        }
      }));
      try {
        n === "role" ? await $.oacs.deleteRoleAssignment(a) : await $.oacs.deleteAgentAssignment(a), await s().hydrate();
      } catch (l) {
        l instanceof z || console.warn("[OACS] deleteAssignment failed:", (l == null ? void 0 : l.message) || l);
      }
    }
  },
  toggleAssignmentActive: async (a, n, l) => {
    try {
      n === "role" ? await $.oacs.updateRoleAssignment(a, { is_active: !l }) : await $.oacs.updateAgentAssignment(a, { is_active: !l }), await s().hydrate();
    } catch (c) {
      c instanceof z || console.warn("[OACS] toggleAssignmentActive failed:", (c == null ? void 0 : c.message) || c);
    }
  },
  /**
   * dismissWalkthrough — mark the current user's first-login walkthrough as seen.
   *
   * Tranche 3 item #4 (T3-4). PATCHes /oacs/user-settings/me with
   * { has_seen_access_control_walkthrough: true } and writes the returned
   * user-settings payload straight into canonical.userSettings on success.
   * The overlay's render gate reads canonical.userSettings.has_seen_* and
   * flips off immediately once that boolean becomes true — no full hydrate()
   * needed (saves ~5 parallel GETs vs calling get().hydrate() after the PATCH).
   *
   * Error handling mirrors submitAddAssignment: extract error_message from
   * OacsError preferentially, fall back to .message, then a static string.
   * On error, isDismissing flips back to false and dismissError renders in
   * the overlay's inline banner; the user can click the button again to retry.
   *
   * Defensive unwrap `res?.data ?? res` covers both pre-reshape (flat) and
   * post-reshape (nested under .data) envelopes — same pattern as hydrate()'s
   * user-settings slot.
   */
  dismissWalkthrough: async () => {
    t((a) => ({
      uiState: {
        ...a.uiState,
        walkthrough: { isDismissing: !0, dismissError: null }
      }
    }));
    try {
      const a = await $.oacs.dismissWalkthrough(), n = (a == null ? void 0 : a.data) ?? a;
      t((l) => ({
        canonical: {
          ...l.canonical,
          userSettings: n
        },
        uiState: {
          ...l.uiState,
          walkthrough: { isDismissing: !1, dismissError: null }
        }
      }));
    } catch (a) {
      if ((a == null ? void 0 : a.http_status) === 409 || (a == null ? void 0 : a.status) === 409) {
        t((l) => ({
          canonical: {
            ...l.canonical,
            userSettings: {
              ...l.canonical.userSettings ?? {},
              has_seen_access_control_walkthrough: !0
            }
          },
          uiState: {
            ...l.uiState,
            walkthrough: { isDismissing: !1, dismissError: null }
          }
        }));
        return;
      }
      t((l) => ({
        uiState: {
          ...l.uiState,
          walkthrough: {
            isDismissing: !1,
            dismissError: (a == null ? void 0 : a.error_message) || (a == null ? void 0 : a.message) || "Failed to dismiss walkthrough"
          }
        }
      }));
    }
  }
  // ─── DAY-2+ RESERVED ACTIONS — not in this tranche ───
  //
  //   (assignRole / assignAgent implemented in Tranche 3 items #2/#3 above)
  //   setSelectedRowIds(ids)  — uiState selection updater
  //   openModal(name)         — uiState.modalOpen setter
  //   pushToast(toast)        — append to uiState.toasts with id + timestamp
  //   dismissToast(id)        — filter uiState.toasts
  //
  // When later tranches add these, keep this store minimal — no middleware
  // until a concrete reason (e.g., persist uiState.activeSubTab to localStorage,
  // or wire devtools for commit flow debugging).
}));
function fa(t) {
  const s = t.trim().split(`
`), a = s[0].split(",").map((n) => n.trim());
  return s.slice(1).map((n) => {
    const l = n.split(",").map((i) => i.trim()), c = {};
    return a.forEach((i, y) => {
      const h = l[y];
      c[i] = h === "true" || h === "1" ? !0 : h === "false" || h === "0" ? !1 : h;
    }), c;
  });
}
function xa() {
  const t = C((E) => E.uiState.importWizard), s = C((E) => E.setImportRows), a = C((E) => E.setImportDryRunResult), n = C((E) => E.resetImport), l = C((E) => E.hydrate), c = oe(null), [i, y] = S(!1), [h, p] = S(null), [d, m] = S(""), [b, o] = S(null), [g, N] = S(null);
  async function f(E) {
    var k;
    const L = (k = E.target.files) == null ? void 0 : k[0];
    if (L) {
      p(null), y(!0);
      try {
        const R = await L.text();
        let _;
        L.name.endsWith(".json") ? _ = JSON.parse(R) : _ = fa(R), s(_);
        const M = await $.oacs.importDryRun({ rows: _ });
        a((M == null ? void 0 : M.data) ?? M);
      } catch (R) {
        p((R == null ? void 0 : R.error_message) || (R == null ? void 0 : R.message) || "Parse or dry-run failed");
      } finally {
        y(!1);
      }
    }
  }
  async function w() {
    const { rows: E, dryRunResult: L } = t;
    o(null), N(null);
    try {
      await $.oacs.importCommit({
        rows: E,
        matrix_version: L.matrix_version,
        reason: d
      }), await l(), n(), m("");
    } catch (k) {
      (k == null ? void 0 : k.error_code) === "CONFLICT" || (k == null ? void 0 : k.http_status) === 409 ? N((k == null ? void 0 : k.conflict_data) ?? null) : o((k == null ? void 0 : k.error_message) || (k == null ? void 0 : k.message) || "Commit failed");
    }
  }
  function T() {
    N(null), n(), m("");
  }
  function O() {
    N(null);
  }
  const { step: u, dryRunResult: x } = t;
  if (g)
    return /* @__PURE__ */ e("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40", children: /* @__PURE__ */ r("div", { className: "bg-white rounded-lg shadow-xl p-6 max-w-md w-full", children: [
      /* @__PURE__ */ e("h3", { className: "text-lg font-semibold mb-2", children: "Import conflict detected" }),
      /* @__PURE__ */ e("p", { className: "text-sm text-gray-600 mb-4", children: "The matrix changed since your dry-run. Discard and re-upload, or cancel to keep your current import state." }),
      /* @__PURE__ */ r("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: T,
            className: "px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700",
            children: "Discard and reset"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: O,
            className: "px-4 py-2 border rounded hover:bg-gray-50",
            children: "Cancel"
          }
        )
      ] })
    ] }) });
  if (u === "idle")
    return /* @__PURE__ */ r("div", { className: "p-4 space-y-4", children: [
      /* @__PURE__ */ r("p", { className: "text-sm text-gray-600", children: [
        "Upload a CSV or JSON file to import permissions. CSV format:",
        " ",
        /* @__PURE__ */ e("code", { children: "role,module,can_view,can_create,can_edit,can_execute,can_resolve,can_admin" })
      ] }),
      h && /* @__PURE__ */ e("div", { className: "text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2", children: h }),
      i ? /* @__PURE__ */ e("p", { className: "text-sm text-gray-500", children: "Running dry-run…" }) : /* @__PURE__ */ e(
        "input",
        {
          ref: c,
          type: "file",
          accept: ".csv,.json",
          onChange: f,
          className: "block text-sm"
        }
      )
    ] });
  if (u === "reviewing" && x) {
    const { planned_changes: E = [], conflicts: L = [], summary: k = {} } = x, R = L.length > 0;
    return /* @__PURE__ */ r("div", { className: "p-4 space-y-4", children: [
      /* @__PURE__ */ r("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ e("h3", { className: "font-medium", children: "Dry-run results" }),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => {
              n(), m("");
            },
            className: "text-xs text-gray-500 hover:text-gray-700",
            children: "← Upload different file"
          }
        )
      ] }),
      /* @__PURE__ */ r("p", { className: "text-sm text-gray-600", children: [
        k.updates ?? E.length,
        " updates ·",
        " ",
        k.conflicts ?? L.length,
        " conflicts"
      ] }),
      E.length > 0 && /* @__PURE__ */ e("div", { className: "overflow-x-auto", children: /* @__PURE__ */ r("table", { className: "text-xs w-full border-collapse", children: [
        /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ e("tr", { className: "bg-gray-50", children: ["Op", "Role", "Module", "From", "To"].map((_) => /* @__PURE__ */ e(
          "th",
          {
            className: "px-2 py-1 text-left border border-gray-200",
            children: _
          },
          _
        )) }) }),
        /* @__PURE__ */ e("tbody", { children: E.map((_, M) => /* @__PURE__ */ r("tr", { className: "border-b border-gray-100", children: [
          /* @__PURE__ */ e("td", { className: "px-2 py-1 border border-gray-200", children: _.op_type }),
          /* @__PURE__ */ e("td", { className: "px-2 py-1 border border-gray-200", children: _.role }),
          /* @__PURE__ */ e("td", { className: "px-2 py-1 border border-gray-200", children: _.module }),
          /* @__PURE__ */ e("td", { className: "px-2 py-1 border border-gray-200", children: String(_.current_value) }),
          /* @__PURE__ */ e("td", { className: "px-2 py-1 border border-gray-200", children: String(_.new_value) })
        ] }, M)) })
      ] }) }),
      R && /* @__PURE__ */ r("div", { className: "bg-amber-50 border border-amber-200 rounded p-3", children: [
        /* @__PURE__ */ e("p", { className: "text-xs font-medium text-amber-800 mb-1", children: "Conflicts — resolve before importing" }),
        L.map((_, M) => /* @__PURE__ */ r("p", { className: "text-xs text-amber-700", children: [
          "Row ",
          _.row_index,
          ": ",
          _.reason
        ] }, M))
      ] }),
      b && /* @__PURE__ */ e("div", { className: "text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2", children: b }),
      /* @__PURE__ */ r("div", { className: "space-y-2", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            placeholder: "Reason for import (required)",
            value: d,
            onChange: (_) => m(_.target.value),
            className: "w-full border rounded px-3 py-1.5 text-sm"
          }
        ),
        /* @__PURE__ */ r("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ e(
            "button",
            {
              onClick: w,
              disabled: R || !d.trim(),
              className: "px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed",
              children: R ? "Resolve conflicts first" : "Confirm import"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => {
                n(), m("");
              },
              className: "px-4 py-2 border text-sm rounded hover:bg-gray-50",
              children: "Cancel"
            }
          )
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ e("div", { className: "p-4 text-sm text-gray-500", children: "Loading…" });
}
function va() {
  var f, w, T, O;
  const t = C((u) => u.canonical.templates ?? []), s = C((u) => u.canonical.roleAssignments ?? []), a = C((u) => u.uiState.templateEditor), n = C((u) => u.openTemplateModal), l = C((u) => u.closeTemplateModal), c = C((u) => u.setTemplateEntityIds), i = C((u) => u.setTemplateParamOverride), y = C((u) => u.setTemplateReason), h = C((u) => u.loadEntityList), p = C((u) => u.applyTemplate);
  D(() => {
    a.modalOpen && h();
  }, [a.modalOpen, h]);
  const d = new Set(s.map((u) => u.entity_id)), m = ((f = a.selectedTemplate) == null ? void 0 : f.parameters_schema) ?? null, o = (m ? Object.entries(m).filter(([, u]) => u.required).map(([u]) => u) : []).every((u) => a.paramOverrides[u]), g = a.selectedEntityIds.length > 0 && o && !a.isSubmitting, N = {};
  if (((w = a.submitError) == null ? void 0 : w.type) === "entity")
    for (const u of a.submitError.validationErrors)
      u.index != null && a.selectedEntityIds[u.index] && (N[a.selectedEntityIds[u.index]] = u.reason);
  return /* @__PURE__ */ r("div", { className: "template-editor", children: [
    /* @__PURE__ */ r("div", { className: "template-cards", children: [
      t.length === 0 && /* @__PURE__ */ e("p", { className: "empty-state", children: "No templates available." }),
      t.map((u) => /* @__PURE__ */ r(
        "div",
        {
          className: "template-card",
          onClick: () => n(u),
          children: [
            /* @__PURE__ */ e("div", { className: "template-card__name", children: u.name }),
            u.description && /* @__PURE__ */ e("div", { className: "template-card__desc", children: u.description }),
            u.parameters_schema && /* @__PURE__ */ e("div", { className: "template-card__badge", children: "Requires parameters" }),
            /* @__PURE__ */ e("button", { className: "btn btn--primary btn--sm", children: "Apply →" })
          ]
        },
        u.id
      ))
    ] }),
    a.modalOpen && a.selectedTemplate && /* @__PURE__ */ e("div", { className: "modal-overlay", onClick: l, children: /* @__PURE__ */ r("div", { className: "modal", onClick: (u) => u.stopPropagation(), children: [
      /* @__PURE__ */ r("div", { className: "modal__header", children: [
        /* @__PURE__ */ r("h2", { children: [
          "Apply Template: ",
          a.selectedTemplate.name
        ] }),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "modal__close",
            onClick: l,
            "aria-label": "Close",
            children: "×"
          }
        )
      ] }),
      /* @__PURE__ */ r("div", { className: "modal__body", children: [
        /* @__PURE__ */ r("section", { children: [
          /* @__PURE__ */ r("label", { className: "field-label", children: [
            "Select Entities",
            a.entityListLoading && /* @__PURE__ */ e("span", { className: "loading-hint", children: " (loading…)" })
          ] }),
          a.entityList.length === 0 && !a.entityListLoading && /* @__PURE__ */ e("p", { className: "empty-state", children: "No entities available." }),
          /* @__PURE__ */ e("div", { className: "entity-chips", children: a.entityList.map((u) => {
            const x = a.selectedEntityIds.includes(u.entity_id), E = d.has(u.entity_id), L = N[u.entity_id];
            return /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                className: [
                  "entity-chip",
                  x ? "entity-chip--selected" : "",
                  L ? "entity-chip--error" : ""
                ].filter(Boolean).join(" "),
                onClick: () => {
                  const k = x ? a.selectedEntityIds.filter((R) => R !== u.entity_id) : [...a.selectedEntityIds, u.entity_id];
                  c(k);
                },
                title: L || (E ? "Already has an active assignment" : void 0),
                children: [
                  u.name || u.entity_id,
                  E && /* @__PURE__ */ e("span", { className: "chip-warn", title: "Already has an active assignment", children: "⚠" }),
                  L && /* @__PURE__ */ e("span", { className: "chip-err", title: L, children: "×" })
                ]
              },
              u.entity_id
            );
          }) }),
          ((T = a.submitError) == null ? void 0 : T.type) === "entity" && /* @__PURE__ */ e("p", { className: "field-error", children: a.submitError.message })
        ] }),
        m && Object.entries(m).map(([u, x]) => {
          var k;
          const E = ((k = a.submitError) == null ? void 0 : k.type) === "param" ? a.submitError.validationErrors.filter((R) => {
            var _;
            return (_ = R.field) == null ? void 0 : _.includes(u);
          }) : [], L = E.length > 0;
          return /* @__PURE__ */ r("section", { children: [
            /* @__PURE__ */ r("label", { className: "field-label", children: [
              u.replace(/_/g, " "),
              x.required && /* @__PURE__ */ e("span", { className: "required-mark", children: " *" })
            ] }),
            /* @__PURE__ */ r(
              "select",
              {
                className: [
                  "param-select",
                  L ? "param-select--error" : ""
                ].filter(Boolean).join(" "),
                value: a.paramOverrides[u] ?? "",
                onChange: (R) => i(u, R.target.value),
                children: [
                  /* @__PURE__ */ e("option", { value: "", children: "— select —" }),
                  (x.allowed_values ?? []).map((R) => /* @__PURE__ */ e("option", { value: R, children: R }, R))
                ]
              }
            ),
            E.map((R, _) => /* @__PURE__ */ e("p", { className: "field-error", children: R.reason }, _))
          ] }, u);
        }),
        /* @__PURE__ */ r("section", { children: [
          /* @__PURE__ */ e("label", { className: "field-label", children: "Reason (optional)" }),
          /* @__PURE__ */ e(
            "textarea",
            {
              className: "reason-textarea",
              rows: 2,
              placeholder: "e.g. April onboarding batch — Standard Hire",
              value: a.reason,
              onChange: (u) => y(u.target.value)
            }
          )
        ] }),
        ((O = a.submitError) == null ? void 0 : O.type) === "server" && /* @__PURE__ */ r("div", { className: "error-banner", children: [
          a.submitError.message,
          " — rolled back. Please retry."
        ] }),
        a.submitSuccess && /* @__PURE__ */ r("div", { className: "success-banner", children: [
          "✓ ",
          a.submitSuccess.message
        ] })
      ] }),
      /* @__PURE__ */ r("div", { className: "modal__footer", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "btn btn--ghost",
            onClick: l,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "btn btn--primary",
            disabled: !g,
            onClick: p,
            children: a.isSubmitting ? "Applying…" : `Apply to ${a.selectedEntityIds.length} entit${a.selectedEntityIds.length !== 1 ? "ies" : "y"}`
          }
        )
      ] })
    ] }) })
  ] });
}
const Na = [
  "PATCH_MATRIX",
  "COMMIT_MATRIX",
  "APPLY_TEMPLATE",
  "DISMISS_WALKTHROUGH",
  "CREATE_ROLE_ASSIGNMENT",
  "UPDATE_ROLE_ASSIGNMENT",
  "DELETE_ROLE_ASSIGNMENT",
  "CREATE_AGENT_ASSIGNMENT",
  "UPDATE_AGENT_ASSIGNMENT",
  "DELETE_AGENT_ASSIGNMENT"
], _a = [
  "module_permissions",
  "role_assignments",
  "agent_assignments",
  "role_templates"
];
function wa() {
  const t = C((f) => {
    var w;
    return ((w = f.canonical.auditLog) == null ? void 0 : w.entries) ?? [];
  }), s = C((f) => f.canonical.auditLog), a = C((f) => f.uiState.auditLogViewer), n = C((f) => {
    var w;
    return ((w = f.uiState.templateEditor) == null ? void 0 : w.entityList) ?? [];
  }), l = C((f) => f.loadAuditLog), c = C((f) => f.setAuditLogFilter), i = C((f) => f.setAuditLogSelectedEntry), y = C((f) => f.loadEntityList);
  D(() => {
    l(a.filters), n.length === 0 && y();
  }, []);
  function h() {
    l({ ...a.filters, offset: 0 });
  }
  function p() {
    Object.entries({
      actor_id: "",
      actor_type: "",
      action: "",
      target_table: "",
      since: "",
      until: "",
      limit: 50
    }).forEach(([w, T]) => c(w, T)), l({ limit: 50, offset: 0 });
  }
  const d = (s == null ? void 0 : s.totalMatching) ?? 0, m = (s == null ? void 0 : s.limit) ?? 50, b = (s == null ? void 0 : s.offset) ?? 0, o = Math.max(1, Math.ceil(d / m)), g = Math.floor(b / m) + 1;
  function N(f) {
    const w = (f - 1) * m;
    l({ ...a.filters, offset: w, limit: m });
  }
  return /* @__PURE__ */ r("div", { className: "audit-log-viewer", children: [
    /* @__PURE__ */ r("div", { className: "audit-filters", children: [
      /* @__PURE__ */ r(
        "select",
        {
          className: "audit-filter-select",
          value: a.filters.actor_id,
          onChange: (f) => c("actor_id", f.target.value),
          "aria-label": "Filter by actor",
          children: [
            /* @__PURE__ */ e("option", { value: "", children: "All actors" }),
            n.map((f) => /* @__PURE__ */ e("option", { value: f.entity_id, children: f.name || f.entity_id }, f.entity_id))
          ]
        }
      ),
      /* @__PURE__ */ r(
        "select",
        {
          className: "audit-filter-select",
          value: a.filters.actor_type,
          onChange: (f) => c("actor_type", f.target.value),
          "aria-label": "Filter by actor type",
          children: [
            /* @__PURE__ */ e("option", { value: "", children: "All types" }),
            /* @__PURE__ */ e("option", { value: "human", children: "Human" }),
            /* @__PURE__ */ e("option", { value: "agent", children: "Agent" })
          ]
        }
      ),
      /* @__PURE__ */ r(
        "select",
        {
          className: "audit-filter-select",
          value: a.filters.action,
          onChange: (f) => c("action", f.target.value),
          "aria-label": "Filter by action",
          children: [
            /* @__PURE__ */ e("option", { value: "", children: "All actions" }),
            Na.map((f) => /* @__PURE__ */ e("option", { value: f, children: f }, f))
          ]
        }
      ),
      /* @__PURE__ */ r(
        "select",
        {
          className: "audit-filter-select",
          value: a.filters.target_table,
          onChange: (f) => c("target_table", f.target.value),
          "aria-label": "Filter by target table",
          children: [
            /* @__PURE__ */ e("option", { value: "", children: "All tables" }),
            _a.map((f) => /* @__PURE__ */ e("option", { value: f, children: f }, f))
          ]
        }
      ),
      /* @__PURE__ */ e(
        "input",
        {
          className: "audit-filter-input",
          type: "text",
          placeholder: "Since (2026-04-01T00:00:00Z)",
          value: a.filters.since,
          onChange: (f) => c("since", f.target.value),
          "aria-label": "Filter by start date (ISO8601)"
        }
      ),
      /* @__PURE__ */ e(
        "input",
        {
          className: "audit-filter-input",
          type: "text",
          placeholder: "Until (2026-04-09T23:59:59Z)",
          value: a.filters.until,
          onChange: (f) => c("until", f.target.value),
          "aria-label": "Filter by end date (ISO8601)"
        }
      ),
      /* @__PURE__ */ r(
        "select",
        {
          className: "audit-filter-select audit-filter-select--sm",
          value: a.filters.limit,
          onChange: (f) => c("limit", Number(f.target.value)),
          "aria-label": "Rows per page",
          children: [
            /* @__PURE__ */ e("option", { value: 25, children: "25/page" }),
            /* @__PURE__ */ e("option", { value: 50, children: "50/page" }),
            /* @__PURE__ */ e("option", { value: 100, children: "100/page" }),
            /* @__PURE__ */ e("option", { value: 500, children: "500/page" })
          ]
        }
      ),
      /* @__PURE__ */ e("button", { type: "button", className: "btn btn--primary btn--sm", onClick: h, children: "Filter" }),
      /* @__PURE__ */ e("button", { type: "button", className: "btn btn--ghost btn--sm", onClick: p, children: "Clear" })
    ] }),
    /* @__PURE__ */ r("div", { className: "audit-status-bar", children: [
      a.isLoading && /* @__PURE__ */ e("span", { className: "loading-hint", children: "Loading…" }),
      !a.isLoading && /* @__PURE__ */ r("span", { className: "audit-count", children: [
        d,
        " ",
        d === 1 ? "entry" : "entries",
        d > m && t.length > 0 && /* @__PURE__ */ r(ee, { children: [
          " (showing ",
          b + 1,
          "–",
          Math.min(b + t.length, d),
          ")"
        ] })
      ] }),
      a.lastError && /* @__PURE__ */ e("span", { className: "field-error", children: a.lastError })
    ] }),
    /* @__PURE__ */ e("div", { className: "audit-table-wrap", children: /* @__PURE__ */ r("table", { className: "audit-table", children: [
      /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ r("tr", { children: [
        /* @__PURE__ */ e("th", { children: "Timestamp" }),
        /* @__PURE__ */ e("th", { children: "Actor" }),
        /* @__PURE__ */ e("th", { children: "Action" }),
        /* @__PURE__ */ e("th", { children: "Target" }),
        /* @__PURE__ */ e("th", { children: "Reason" }),
        /* @__PURE__ */ e("th", { children: "Status" })
      ] }) }),
      /* @__PURE__ */ r("tbody", { children: [
        t.length === 0 && !a.isLoading && /* @__PURE__ */ e("tr", { children: /* @__PURE__ */ e("td", { colSpan: 6, className: "empty-state", children: "No audit entries matching filters." }) }),
        t.map((f) => /* @__PURE__ */ r(
          "tr",
          {
            className: `audit-row audit-row--${f.status}`,
            onClick: () => i(f),
            style: { cursor: "pointer" },
            children: [
              /* @__PURE__ */ e("td", { className: "audit-cell audit-cell--ts", children: new Date(f.created_at).toLocaleString() }),
              /* @__PURE__ */ r("td", { className: "audit-cell", children: [
                /* @__PURE__ */ e("span", { className: "actor-name", children: f.actor_id }),
                /* @__PURE__ */ e("span", { className: "actor-type-badge", children: f.actor_type })
              ] }),
              /* @__PURE__ */ e("td", { className: "audit-cell audit-cell--action", children: f.action }),
              /* @__PURE__ */ e("td", { className: "audit-cell audit-cell--target", children: f.target_table }),
              /* @__PURE__ */ e("td", { className: "audit-cell audit-cell--reason", children: f.reason || "—" }),
              /* @__PURE__ */ e("td", { className: "audit-cell", children: /* @__PURE__ */ e("span", { className: `status-badge status-badge--${f.status}`, children: f.status }) })
            ]
          },
          f.id
        ))
      ] })
    ] }) }),
    o > 1 && /* @__PURE__ */ r("div", { className: "audit-pagination", children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "btn btn--ghost btn--sm",
          disabled: g <= 1,
          onClick: () => N(g - 1),
          children: "← Prev"
        }
      ),
      /* @__PURE__ */ r("span", { className: "page-indicator", children: [
        "Page ",
        g,
        " of ",
        o
      ] }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: "btn btn--ghost btn--sm",
          disabled: g >= o,
          onClick: () => N(g + 1),
          children: "Next →"
        }
      )
    ] }),
    a.selectedEntry && /* @__PURE__ */ e(
      "div",
      {
        className: "modal-overlay",
        onClick: () => i(null),
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "audit-detail-heading",
        children: /* @__PURE__ */ r("div", { className: "modal modal--wide", onClick: (f) => f.stopPropagation(), children: [
          /* @__PURE__ */ r("div", { className: "modal__header", children: [
            /* @__PURE__ */ r("h2", { id: "audit-detail-heading", children: [
              a.selectedEntry.action,
              " —",
              " ",
              new Date(a.selectedEntry.created_at).toLocaleString()
            ] }),
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: "modal__close",
                onClick: () => i(null),
                "aria-label": "Close detail modal",
                children: "✕"
              }
            )
          ] }),
          /* @__PURE__ */ r("div", { className: "modal__body", children: [
            /* @__PURE__ */ r("div", { className: "audit-detail-grid", children: [
              /* @__PURE__ */ r("div", { className: "audit-detail-row", children: [
                /* @__PURE__ */ e("span", { className: "detail-label", children: "Actor" }),
                /* @__PURE__ */ r("span", { children: [
                  a.selectedEntry.actor_id,
                  " (",
                  a.selectedEntry.actor_type,
                  a.selectedEntry.actor_role ? ` / ${a.selectedEntry.actor_role}` : "",
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ r("div", { className: "audit-detail-row", children: [
                /* @__PURE__ */ e("span", { className: "detail-label", children: "Target" }),
                /* @__PURE__ */ r("span", { children: [
                  a.selectedEntry.target_table,
                  a.selectedEntry.target_id ? ` / ${a.selectedEntry.target_id}` : ""
                ] })
              ] }),
              /* @__PURE__ */ r("div", { className: "audit-detail-row", children: [
                /* @__PURE__ */ e("span", { className: "detail-label", children: "Status" }),
                /* @__PURE__ */ e("span", { className: `status-badge status-badge--${a.selectedEntry.status}`, children: a.selectedEntry.status })
              ] }),
              a.selectedEntry.security_level && /* @__PURE__ */ r("div", { className: "audit-detail-row", children: [
                /* @__PURE__ */ e("span", { className: "detail-label", children: "Security" }),
                /* @__PURE__ */ e("span", { children: a.selectedEntry.security_level })
              ] }),
              a.selectedEntry.reason && /* @__PURE__ */ r("div", { className: "audit-detail-row", children: [
                /* @__PURE__ */ e("span", { className: "detail-label", children: "Reason" }),
                /* @__PURE__ */ e("span", { children: a.selectedEntry.reason })
              ] }),
              a.selectedEntry.error_message && /* @__PURE__ */ r("div", { className: "audit-detail-row", children: [
                /* @__PURE__ */ e("span", { className: "detail-label", children: "Error" }),
                /* @__PURE__ */ e("span", { className: "field-error", children: a.selectedEntry.error_message })
              ] })
            ] }),
            a.selectedEntry.diff && /* @__PURE__ */ r("div", { className: "audit-json-block", children: [
              /* @__PURE__ */ e("div", { className: "audit-json-label", children: "Diff" }),
              /* @__PURE__ */ e("pre", { className: "audit-json", children: JSON.stringify(a.selectedEntry.diff, null, 2) })
            ] }),
            a.selectedEntry.before_state && /* @__PURE__ */ r("div", { className: "audit-json-block", children: [
              /* @__PURE__ */ e("div", { className: "audit-json-label", children: "Before" }),
              /* @__PURE__ */ e("pre", { className: "audit-json", children: JSON.stringify(a.selectedEntry.before_state, null, 2) })
            ] }),
            a.selectedEntry.after_state && /* @__PURE__ */ r("div", { className: "audit-json-block", children: [
              /* @__PURE__ */ e("div", { className: "audit-json-label", children: "After" }),
              /* @__PURE__ */ e("pre", { className: "audit-json", children: JSON.stringify(a.selectedEntry.after_state, null, 2) })
            ] })
          ] })
        ] })
      }
    )
  ] });
}
function Ke({ type: t, assignments: s, columns: a, idKey: n, onAdd: l }) {
  const c = C((o) => {
    var g;
    return (g = o.uiState.assignmentEditor) == null ? void 0 : g.confirmDeleteId;
  }), i = C((o) => {
    var g;
    return (g = o.uiState.assignmentEditor) == null ? void 0 : g.confirmDeleteType;
  }), y = C((o) => o.confirmDelete), h = C((o) => o.cancelDelete), p = C((o) => o.executeDelete), d = C((o) => o.toggleAssignmentActive), m = t === "role" ? "Role Assignments" : "Agent Assignments", b = t === "role" ? "+ Add Role Assignment" : "+ Add Agent Assignment";
  return /* @__PURE__ */ r("div", { className: "assignment-table-wrap", children: [
    /* @__PURE__ */ e("div", { className: "assignment-table-header", children: /* @__PURE__ */ r("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
      /* @__PURE__ */ r("h3", { style: { margin: 0, fontSize: "1rem", fontWeight: 600 }, children: [
        m,
        /* @__PURE__ */ r("span", { style: { marginLeft: ".5rem", fontSize: ".75rem", opacity: 0.6, fontWeight: 400 }, children: [
          "(",
          s.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "btn btn--primary btn--sm", onClick: l, children: b })
    ] }) }),
    /* @__PURE__ */ e("div", { className: "audit-table-wrap", children: /* @__PURE__ */ r("table", { className: "assignment-table", children: [
      /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ r("tr", { children: [
        a.map((o) => /* @__PURE__ */ e("th", { children: o.label }, o.key)),
        /* @__PURE__ */ e("th", { children: "Active" }),
        /* @__PURE__ */ e("th", { style: { textAlign: "right" }, children: "Actions" })
      ] }) }),
      /* @__PURE__ */ r("tbody", { children: [
        s.length === 0 && /* @__PURE__ */ e("tr", { children: /* @__PURE__ */ r("td", { colSpan: a.length + 2, className: "empty-state", children: [
          "No ",
          t,
          ' assignments yet. Click "',
          b,
          '" to create one.'
        ] }) }),
        s.map((o) => {
          const g = o[n], N = o.is_active !== !1, f = c === g && i === t;
          return /* @__PURE__ */ r(
            "tr",
            {
              className: `assignment-row ${N ? "" : "assignment-row--inactive"}`,
              children: [
                a.map((w) => /* @__PURE__ */ e("td", { className: "assignment-cell", children: w.render ? w.render(o) : o[w.key] ?? "—" }, w.key)),
                /* @__PURE__ */ e("td", { className: "assignment-cell", children: /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    className: `toggle-btn ${N ? "toggle-btn--on" : "toggle-btn--off"}`,
                    onClick: () => d(g, t, N),
                    "aria-label": `Toggle active state for ${g}`,
                    children: N ? "ON" : "OFF"
                  }
                ) }),
                /* @__PURE__ */ e("td", { className: "assignment-cell assignment-cell--actions", style: { justifyContent: "flex-end" }, children: f ? /* @__PURE__ */ r(ee, { children: [
                  /* @__PURE__ */ e("span", { className: "delete-confirm-text", children: "Delete?" }),
                  /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      className: "btn btn--danger btn--xs",
                      onClick: p,
                      children: "Yes"
                    }
                  ),
                  /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      className: "btn btn--ghost btn--xs",
                      onClick: h,
                      children: "No"
                    }
                  )
                ] }) : /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    className: "btn btn--ghost btn--xs",
                    onClick: () => y(g, t),
                    children: "Delete"
                  }
                ) })
              ]
            },
            g ?? JSON.stringify(o)
          );
        })
      ] })
    ] }) })
  ] });
}
const Sa = [
  { value: "admin", label: "Admin" },
  { value: "dept_head", label: "Department Head" },
  { value: "team_lead", label: "Team Lead" },
  { value: "member", label: "Member" }
], Ea = [
  { value: "self", label: "Self" },
  { value: "team", label: "Team" },
  { value: "department", label: "Department" },
  { value: "organization", label: "Organization" }
];
function ka(t) {
  if (!t) return "—";
  try {
    const s = new Date(t);
    return Number.isNaN(s.getTime()) ? t : s.toLocaleDateString();
  } catch {
    return t;
  }
}
function Ca() {
  var m, b;
  const t = C((o) => o.canonical.roleAssignments ?? []), s = C((o) => o.uiState.assignmentEditor), a = C((o) => {
    var g;
    return ((g = o.uiState.templateEditor) == null ? void 0 : g.entityList) ?? [];
  }), n = C((o) => o.openAddModal), l = C((o) => o.closeAddModal), c = C((o) => o.setAddFormField), i = C((o) => o.submitAddAssignment), y = C((o) => o.loadEntityList);
  D(() => {
    a.length === 0 && y();
  }, []);
  const h = [
    { key: "entity_name", label: "Entity" },
    { key: "role_level", label: "Role" },
    { key: "scope", label: "Scope" },
    { key: "department", label: "Department" },
    { key: "granted_by", label: "Granted By" },
    { key: "granted_at", label: "Granted At", render: (o) => ka(o.granted_at) }
  ], p = (s == null ? void 0 : s.addModalOpen) && (s == null ? void 0 : s.addModalType) === "role", d = !!((m = s == null ? void 0 : s.addForm) != null && m.entity_id && ((b = s == null ? void 0 : s.addForm) != null && b.role_level) && !(s != null && s.isSubmitting));
  return /* @__PURE__ */ r(ee, { children: [
    /* @__PURE__ */ e(
      Ke,
      {
        type: "role",
        assignments: t,
        columns: h,
        idKey: "role_assignment_id",
        onAdd: () => n("role")
      }
    ),
    p && /* @__PURE__ */ e(
      "div",
      {
        className: "modal-overlay",
        onClick: l,
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "add-role-heading",
        children: /* @__PURE__ */ r("div", { className: "modal", onClick: (o) => o.stopPropagation(), children: [
          /* @__PURE__ */ r("div", { className: "modal__header", children: [
            /* @__PURE__ */ e("h2", { id: "add-role-heading", children: "Add Role Assignment" }),
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: "modal__close",
                onClick: l,
                "aria-label": "Close",
                children: "✕"
              }
            )
          ] }),
          /* @__PURE__ */ r("div", { className: "modal__body", children: [
            /* @__PURE__ */ e("div", { className: "field-label", children: "Entity" }),
            /* @__PURE__ */ r(
              "select",
              {
                className: "audit-filter-select",
                style: { width: "100%" },
                value: s.addForm.entity_id,
                onChange: (o) => c("entity_id", o.target.value),
                children: [
                  /* @__PURE__ */ e("option", { value: "", children: "— Select an entity —" }),
                  a.map((o) => /* @__PURE__ */ e("option", { value: o.entity_id, children: o.name || o.entity_id }, o.entity_id))
                ]
              }
            ),
            /* @__PURE__ */ e("div", { className: "field-label", style: { marginTop: ".75rem" }, children: "Role Level" }),
            /* @__PURE__ */ r(
              "select",
              {
                className: "audit-filter-select",
                style: { width: "100%" },
                value: s.addForm.role_level,
                onChange: (o) => c("role_level", o.target.value),
                children: [
                  /* @__PURE__ */ e("option", { value: "", children: "— Select a role level —" }),
                  Sa.map((o) => /* @__PURE__ */ e("option", { value: o.value, children: o.label }, o.value))
                ]
              }
            ),
            /* @__PURE__ */ e("div", { className: "field-label", style: { marginTop: ".75rem" }, children: "Scope" }),
            /* @__PURE__ */ e(
              "select",
              {
                className: "audit-filter-select",
                style: { width: "100%" },
                value: s.addForm.scope,
                onChange: (o) => c("scope", o.target.value),
                children: Ea.map((o) => /* @__PURE__ */ e("option", { value: o.value, children: o.label }, o.value))
              }
            ),
            /* @__PURE__ */ e("div", { className: "field-label", style: { marginTop: ".75rem" }, children: "Reason (optional)" }),
            /* @__PURE__ */ e(
              "textarea",
              {
                className: "audit-filter-input",
                style: { width: "100%", minHeight: "3rem" },
                value: s.addForm.reason,
                onChange: (o) => c("reason", o.target.value),
                placeholder: "Audit trail — why is this role being granted?"
              }
            ),
            s.addError && /* @__PURE__ */ r("div", { className: "field-error", style: { marginTop: ".75rem" }, children: [
              s.addError.type === "self_lockout" && "Self-lockout blocked: ",
              s.addError.type === "validation" && "Validation failed: ",
              s.addError.message
            ] })
          ] }),
          /* @__PURE__ */ r("div", { className: "modal__footer", children: [
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: "btn btn--ghost btn--sm",
                onClick: l,
                disabled: s.isSubmitting,
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: "btn btn--primary btn--sm",
                onClick: i,
                disabled: !d,
                children: s.isSubmitting ? "Creating…" : "Create"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
const Aa = [
  { value: "api_admin", label: "API Admin" },
  { value: "api_system", label: "API System" },
  { value: "api_readonly", label: "API Read-only" }
], Ta = [
  { value: "self", label: "Self" },
  { value: "team", label: "Team" },
  { value: "department", label: "Department" },
  { value: "organization", label: "Organization" }
];
function Oa(t) {
  if (!t) return "—";
  try {
    const s = new Date(t);
    return Number.isNaN(s.getTime()) ? t : s.toLocaleDateString();
  } catch {
    return t;
  }
}
function La() {
  var m, b;
  const t = C((o) => o.canonical.agentAssignments ?? []), s = C((o) => o.uiState.assignmentEditor), a = C((o) => {
    var g;
    return ((g = o.uiState.templateEditor) == null ? void 0 : g.entityList) ?? [];
  }), n = C((o) => o.openAddModal), l = C((o) => o.closeAddModal), c = C((o) => o.setAddFormField), i = C((o) => o.submitAddAssignment), y = C((o) => o.loadEntityList);
  D(() => {
    a.length === 0 && y();
  }, []);
  const h = [
    { key: "entity_name", label: "Entity" },
    { key: "api_role", label: "API Role" },
    { key: "scope", label: "Scope" },
    { key: "granted_by", label: "Granted By" },
    { key: "granted_at", label: "Granted At", render: (o) => Oa(o.granted_at) }
  ], p = (s == null ? void 0 : s.addModalOpen) && (s == null ? void 0 : s.addModalType) === "agent", d = !!((m = s == null ? void 0 : s.addForm) != null && m.entity_id && ((b = s == null ? void 0 : s.addForm) != null && b.api_role) && !(s != null && s.isSubmitting));
  return /* @__PURE__ */ r(ee, { children: [
    /* @__PURE__ */ e(
      Ke,
      {
        type: "agent",
        assignments: t,
        columns: h,
        idKey: "agent_assignment_id",
        onAdd: () => n("agent")
      }
    ),
    p && /* @__PURE__ */ e(
      "div",
      {
        className: "modal-overlay",
        onClick: l,
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "add-agent-heading",
        children: /* @__PURE__ */ r("div", { className: "modal", onClick: (o) => o.stopPropagation(), children: [
          /* @__PURE__ */ r("div", { className: "modal__header", children: [
            /* @__PURE__ */ e("h2", { id: "add-agent-heading", children: "Add Agent Assignment" }),
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: "modal__close",
                onClick: l,
                "aria-label": "Close",
                children: "✕"
              }
            )
          ] }),
          /* @__PURE__ */ r("div", { className: "modal__body", children: [
            /* @__PURE__ */ e("div", { className: "field-label", children: "Entity" }),
            /* @__PURE__ */ r(
              "select",
              {
                className: "audit-filter-select",
                style: { width: "100%" },
                value: s.addForm.entity_id,
                onChange: (o) => c("entity_id", o.target.value),
                children: [
                  /* @__PURE__ */ e("option", { value: "", children: "— Select an entity —" }),
                  a.map((o) => /* @__PURE__ */ e("option", { value: o.entity_id, children: o.name || o.entity_id }, o.entity_id))
                ]
              }
            ),
            /* @__PURE__ */ e("div", { className: "field-label", style: { marginTop: ".75rem" }, children: "API Role" }),
            /* @__PURE__ */ r(
              "select",
              {
                className: "audit-filter-select",
                style: { width: "100%" },
                value: s.addForm.api_role,
                onChange: (o) => c("api_role", o.target.value),
                children: [
                  /* @__PURE__ */ e("option", { value: "", children: "— Select an API role —" }),
                  Aa.map((o) => /* @__PURE__ */ e("option", { value: o.value, children: o.label }, o.value))
                ]
              }
            ),
            /* @__PURE__ */ e("div", { className: "field-label", style: { marginTop: ".75rem" }, children: "Scope" }),
            /* @__PURE__ */ e(
              "select",
              {
                className: "audit-filter-select",
                style: { width: "100%" },
                value: s.addForm.scope,
                onChange: (o) => c("scope", o.target.value),
                children: Ta.map((o) => /* @__PURE__ */ e("option", { value: o.value, children: o.label }, o.value))
              }
            ),
            /* @__PURE__ */ e("div", { className: "field-label", style: { marginTop: ".75rem" }, children: "Reason (optional)" }),
            /* @__PURE__ */ e(
              "textarea",
              {
                className: "audit-filter-input",
                style: { width: "100%", minHeight: "3rem" },
                value: s.addForm.reason,
                onChange: (o) => c("reason", o.target.value),
                placeholder: "Audit trail — why is this API access being granted?"
              }
            ),
            s.addError && /* @__PURE__ */ r("div", { className: "field-error", style: { marginTop: ".75rem" }, children: [
              s.addError.type === "self_lockout" && "Self-lockout blocked: ",
              s.addError.type === "validation" && "Validation failed: ",
              s.addError.message
            ] })
          ] }),
          /* @__PURE__ */ r("div", { className: "modal__footer", children: [
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: "btn btn--ghost btn--sm",
                onClick: l,
                disabled: s.isSubmitting,
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: "btn btn--primary btn--sm",
                onClick: i,
                disabled: !d,
                children: s.isSubmitting ? "Creating…" : "Create"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
const he = [
  {
    title: "Access Control Center",
    icon: "🔐",
    body: "You're the first one here. This panel gives you full control over who can see and do what across the entire TGIM platform."
  },
  {
    title: "Permission Matrix",
    icon: "⚙️",
    body: "The Matrix tab shows a 4-role × 7-module grid. Toggle cells to grant or revoke permissions. Commit with a reason — conflicts are auto-detected using a version fingerprint."
  },
  {
    title: "Bulk Operations",
    icon: "📋",
    body: "Import tab: upload CSV or JSON to apply permissions in bulk. Templates tab: apply Standard Hire, New Manager, or Contractor templates to onboard people fast."
  },
  {
    title: "Assignments & Audit",
    icon: "📜",
    body: "Roles and Agents tabs: manage individual assignments, toggle active/inactive, add or remove. Audit Log: every action is recorded with before/after state — nothing is invisible."
  }
];
function Ra() {
  const t = C((y) => y.canonical.userSettings), s = C((y) => y.uiState.walkthrough), a = C((y) => y.dismissWalkthrough), [n, l] = S(0);
  if (!t || t.has_seen_access_control_walkthrough !== !1)
    return null;
  const c = n === he.length - 1, i = he[n];
  return /* @__PURE__ */ e("div", { className: "walkthrough-overlay", children: /* @__PURE__ */ r("div", { className: "walkthrough-card", children: [
    /* @__PURE__ */ e("div", { className: "walkthrough-dots", children: he.map((y, h) => /* @__PURE__ */ e(
      "span",
      {
        className: `walkthrough-dot${h === n ? " walkthrough-dot--active" : ""}`
      },
      h
    )) }),
    /* @__PURE__ */ e("div", { className: "walkthrough-icon", children: i.icon }),
    /* @__PURE__ */ e("h2", { className: "walkthrough-title", children: i.title }),
    /* @__PURE__ */ e("p", { className: "walkthrough-body", children: i.body }),
    (s == null ? void 0 : s.dismissError) && /* @__PURE__ */ e("p", { className: "field-error walkthrough-error", children: s.dismissError }),
    /* @__PURE__ */ r("div", { className: "walkthrough-footer", children: [
      n > 0 && /* @__PURE__ */ e(
        "button",
        {
          className: "btn btn--ghost",
          type: "button",
          onClick: () => l((y) => y - 1),
          disabled: s == null ? void 0 : s.isDismissing,
          children: "← Back"
        }
      ),
      /* @__PURE__ */ e("div", { style: { flex: 1 } }),
      c ? /* @__PURE__ */ e(
        "button",
        {
          className: "btn btn--primary",
          type: "button",
          disabled: s == null ? void 0 : s.isDismissing,
          onClick: a,
          children: s != null && s.isDismissing ? "Saving…" : "Got it, let's go →"
        }
      ) : /* @__PURE__ */ e(
        "button",
        {
          className: "btn btn--primary",
          type: "button",
          onClick: () => l((y) => y + 1),
          children: "Next →"
        }
      )
    ] })
  ] }) });
}
const Ma = 4, $a = 7, Pa = [
  { id: "matrix", label: "Matrix" },
  { id: "import", label: "Import" },
  { id: "roles", label: "Roles" },
  { id: "agents", label: "Agents" },
  { id: "templates", label: "Templates" },
  { id: "audit", label: "Audit" }
], Ia = {
  can_view: "V",
  can_create: "C",
  can_edit: "E",
  can_execute: "X",
  can_resolve: "R",
  can_admin: "A"
}, Da = {
  can_view: "Can view",
  can_create: "Can create",
  can_edit: "Can edit",
  can_execute: "Can execute",
  can_resolve: "Can resolve",
  can_admin: "Can admin"
};
function ja() {
  const t = C((v) => v.canonical.matrix), s = C((v) => v.canonical.source), a = C((v) => v.uiState.isLoading), n = C((v) => v.uiState.lastError), l = C((v) => v.hydrate), c = C((v) => v.clearError), i = C((v) => v.uiState.activeSubTab), y = C((v) => v.setActiveSubTab), h = C((v) => v.draft.matrix), p = C((v) => v.pendingOperations), d = C((v) => v.toggleCell), m = C((v) => v.revert), b = C((v) => v.commit), o = C((v) => v.uiState.isCommitting), g = C((v) => v.uiState.lastCommitToast), N = C((v) => v.clearCommitToast), f = C((v) => v.uiState.conflictData), w = C((v) => v.clearConflict), [T, O] = S("");
  D(() => {
    l();
  }, [l]), D(() => {
    if (!g) return;
    const v = setTimeout(() => N(), 3e3);
    return () => clearTimeout(v);
  }, [g, N]), D(() => {
    p.length === 0 && O("");
  }, [p.length]);
  const u = re(() => h ?? t, [h, t]), x = re(() => t ? Object.keys(t) : [], [t]), E = re(() => {
    if (!t) return [];
    const v = /* @__PURE__ */ new Set();
    for (const j of Object.keys(t))
      for (const B of Object.keys(t[j] || {}))
        v.add(B);
    return Array.from(v);
  }, [t]), L = re(() => {
    const v = /* @__PURE__ */ new Set();
    for (const j of p)
      v.add(`${j.role}|${j.module}|${j.field}`);
    return v;
  }, [p]), k = a && t === null, R = p.length > 0, _ = async () => {
    const v = T.trim();
    v && await b(v);
  }, M = () => {
    m(), w();
  }, I = () => {
    m(), w(), C.setState((v) => ({
      uiState: {
        ...v.uiState,
        lastCommitToast: {
          message: "Server state loaded — re-apply your changes manually",
          timestamp: Date.now()
        }
      }
    }));
  }, V = () => {
    w();
  };
  return /* @__PURE__ */ r("div", { className: "space-y-4", children: [
    /* @__PURE__ */ r("div", { className: "relative bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-800 overflow-hidden", children: [
      /* @__PURE__ */ e(Ra, {}),
      /* @__PURE__ */ e("h3", { className: "text-lg font-medium text-gray-100", children: "Access Control" }),
      /* @__PURE__ */ e("p", { className: "text-xs text-gray-500 mt-1", children: "OACS Admin Panel — v4.1" }),
      /* @__PURE__ */ e("div", { className: "mt-4 overflow-x-auto border-b border-gray-800", children: /* @__PURE__ */ e("div", { className: "flex gap-1 min-w-max pb-px", children: Pa.map((v) => {
        const j = i === v.id;
        return /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: () => !v.disabled && y(v.id),
            disabled: v.disabled,
            className: "px-3 py-1.5 text-xs font-medium border-b-2 -mb-px transition-colors " + (j ? "border-amber-500 text-amber-300" : v.disabled ? "border-transparent text-gray-600 cursor-not-allowed" : "border-transparent text-gray-400 hover:text-gray-200"),
            children: v.label
          },
          v.id
        );
      }) }) }),
      n && !f && /* @__PURE__ */ r("div", { className: "mt-3 inline-flex items-center gap-2 rounded-md bg-red-500/10 border border-red-800/60 px-2.5 py-1", children: [
        /* @__PURE__ */ e("span", { className: "text-xs text-red-300 font-mono", children: n.error_code || "UNKNOWN_ERROR" }),
        n.error_message && /* @__PURE__ */ e("span", { className: "text-xs text-red-200/80", children: n.error_message }),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: c,
            className: "text-red-400/80 hover:text-red-200 text-sm leading-none",
            "aria-label": "Dismiss error",
            children: "×"
          }
        )
      ] }),
      g && /* @__PURE__ */ e("div", { className: "mt-3 inline-flex items-center gap-2 rounded-md bg-emerald-500/10 border border-emerald-800/60 px-2.5 py-1", children: /* @__PURE__ */ e("span", { className: "text-xs text-emerald-300 font-mono", children: g.message }) }),
      i === "matrix" && s === "cold" && /* @__PURE__ */ r("div", { className: "mt-4 rounded-lg bg-amber-500/10 border border-amber-800 px-4 py-3", children: [
        /* @__PURE__ */ e("div", { className: "text-sm text-amber-300", children: "Using cached policy — live data unavailable" }),
        /* @__PURE__ */ e("div", { className: "text-xs text-amber-400/70 mt-1", children: "Backend `/oacs/matrix` not reachable. Rendering seeded AHSEN_MATRIX. Writes are disabled until canonical state loads." })
      ] }),
      i === "matrix" && s === "partial" && /* @__PURE__ */ r("div", { className: "mt-4 rounded-lg bg-amber-500/10 border border-amber-800/70 px-4 py-3", children: [
        /* @__PURE__ */ e("div", { className: "text-sm text-amber-300", children: "Partial load — some endpoints unreachable" }),
        /* @__PURE__ */ e("div", { className: "text-xs text-amber-400/70 mt-1", children: "Matrix is live but other data may be stale." })
      ] }),
      i === "matrix" && k && /* @__PURE__ */ r("div", { className: "mt-6 rounded-lg bg-gray-800/40 border border-gray-700 px-4 py-12 text-center", children: [
        /* @__PURE__ */ e("div", { className: "text-sm text-gray-400", children: "Loading access control state…" }),
        /* @__PURE__ */ e("div", { className: "text-xs text-gray-600 mt-1", children: "Hydrating canonical state from backend…" })
      ] }),
      i === "matrix" && !k && u && /* @__PURE__ */ r("div", { className: "mt-6", children: [
        R && /* @__PURE__ */ r("div", { className: "mb-3 text-xs text-amber-300", children: [
          p.length,
          " pending ",
          p.length === 1 ? "change" : "changes"
        ] }),
        /* @__PURE__ */ e("div", { className: "overflow-x-auto rounded-lg border border-gray-800", children: /* @__PURE__ */ r("table", { className: "w-full text-xs text-gray-300 border-collapse", children: [
          /* @__PURE__ */ r("thead", { className: "bg-gray-900/60", children: [
            /* @__PURE__ */ r("tr", { children: [
              /* @__PURE__ */ e(
                "th",
                {
                  scope: "col",
                  rowSpan: 2,
                  className: "sticky left-0 z-10 bg-gray-900/60 text-left px-3 py-2 font-medium text-gray-400 border-b border-gray-800",
                  children: "Module"
                }
              ),
              x.map((v) => /* @__PURE__ */ e(
                "th",
                {
                  scope: "colgroup",
                  colSpan: ue.length,
                  className: "text-center px-3 py-2 font-medium text-gray-200 border-b border-gray-800 border-l border-gray-800/80",
                  children: v
                },
                v
              ))
            ] }),
            /* @__PURE__ */ e("tr", { children: x.map(
              (v) => ue.map((j) => /* @__PURE__ */ e(
                "th",
                {
                  scope: "col",
                  title: Da[j],
                  className: "text-center px-1.5 py-1 font-mono text-[10px] text-gray-500 border-b border-gray-800",
                  children: Ia[j]
                },
                `${v}-${j}`
              ))
            ) })
          ] }),
          /* @__PURE__ */ e("tbody", { children: E.map((v, j) => /* @__PURE__ */ r("tr", { className: j % 2 === 0 ? "bg-gray-900/30" : "bg-gray-900/10", children: [
            /* @__PURE__ */ e(
              "th",
              {
                scope: "row",
                className: "sticky left-0 z-10 bg-inherit text-left px-3 py-1.5 font-medium text-gray-300 whitespace-nowrap",
                children: v
              }
            ),
            x.map(
              (B) => ue.map((U) => {
                var ve, Ne, _e;
                const X = !!((ve = u == null ? void 0 : u[B]) != null && ve[v]), A = !!((_e = (Ne = u == null ? void 0 : u[B]) == null ? void 0 : Ne[v]) != null && _e[U]), Xe = L.has(`${B}|${v}|${U}`);
                return /* @__PURE__ */ e(
                  "td",
                  {
                    className: `text-center px-1 py-1 border-l border-gray-800/60 ${Xe ? "cell--dirty" : ""}`,
                    children: /* @__PURE__ */ e(
                      "input",
                      {
                        type: "checkbox",
                        checked: A,
                        disabled: !X || o || s === "cold",
                        onChange: () => d(B, v, U),
                        "aria-label": `${B} / ${v} / ${U}`,
                        className: "h-3.5 w-3.5 rounded-sm accent-amber-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
                      }
                    )
                  },
                  `${B}-${v}-${U}`
                );
              })
            )
          ] }, v)) })
        ] }) }),
        R && /* @__PURE__ */ e("div", { className: "mt-4 rounded-lg bg-gray-800/40 border border-gray-700 px-4 py-3", children: /* @__PURE__ */ r("div", { className: "flex items-center gap-3 flex-wrap", children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              value: T,
              onChange: (v) => O(v.target.value),
              placeholder: "Reason for change (required)",
              disabled: o,
              className: "flex-1 min-w-[200px] bg-gray-900 border border-gray-700 rounded px-3 py-1.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-600 disabled:opacity-50"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: _,
              disabled: o || !T.trim(),
              className: "px-3 py-1.5 rounded bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed",
              children: o ? "Committing…" : "Commit changes"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: m,
              disabled: o,
              className: "px-3 py-1.5 rounded bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed",
              children: "Revert"
            }
          )
        ] }) }),
        !R && /* @__PURE__ */ r("div", { className: "mt-3 text-xs text-gray-600", children: [
          "Loaded ",
          Ma,
          " role(s) × ",
          $a,
          " module(s)"
        ] })
      ] }),
      i === "import" && /* @__PURE__ */ e("div", { className: "mt-4 rounded-lg bg-white text-gray-900", children: /* @__PURE__ */ e(xa, {}) }),
      i === "roles" && /* @__PURE__ */ e("div", { className: "mt-4 rounded-lg bg-white text-gray-900 p-4", children: /* @__PURE__ */ e(Ca, {}) }),
      i === "agents" && /* @__PURE__ */ e("div", { className: "mt-4 rounded-lg bg-white text-gray-900 p-4", children: /* @__PURE__ */ e(La, {}) }),
      i === "templates" && /* @__PURE__ */ e("div", { className: "mt-4 rounded-lg bg-white text-gray-900 p-4", children: /* @__PURE__ */ e(va, {}) }),
      i === "audit" && /* @__PURE__ */ e("div", { className: "mt-4 rounded-lg bg-white text-gray-900 p-4", children: /* @__PURE__ */ e(wa, {}) })
    ] }),
    /* @__PURE__ */ e("div", { className: "bg-gray-900/50 rounded-xl p-4 border border-gray-800/50", children: /* @__PURE__ */ r("p", { className: "text-xs text-gray-500", children: [
      "Day 2 Tranche 2 — matrix editor. Break-glass recovery: ",
      /* @__PURE__ */ e("span", { className: "text-gray-400 font-mono", children: "parallax@agentmail.to" })
    ] }) }),
    f && /* @__PURE__ */ e(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "matrix-conflict-heading",
        children: /* @__PURE__ */ r("div", { className: "w-full max-w-md bg-gray-900 border border-amber-800/70 rounded-xl p-6 shadow-xl", children: [
          /* @__PURE__ */ e(
            "h4",
            {
              id: "matrix-conflict-heading",
              className: "text-lg font-medium text-amber-300",
              children: "Matrix conflict detected"
            }
          ),
          /* @__PURE__ */ e("p", { className: "mt-2 text-sm text-gray-300", children: "Another admin changed the matrix since you loaded it. Choose how to proceed:" }),
          (f.db_version != null || f.client_version != null) && /* @__PURE__ */ r("div", { className: "mt-3 text-xs text-gray-500 font-mono", children: [
            f.client_version != null && /* @__PURE__ */ r("div", { children: [
              "your version: ",
              String(f.client_version)
            ] }),
            f.db_version != null && /* @__PURE__ */ r("div", { children: [
              "server version: ",
              String(f.db_version)
            ] })
          ] }),
          /* @__PURE__ */ r("div", { className: "mt-5 flex flex-col gap-2", children: [
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: M,
                className: "w-full px-3 py-2 rounded bg-red-600 hover:bg-red-500 text-white text-sm font-medium",
                children: "Discard my changes"
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: I,
                className: "w-full px-3 py-2 rounded bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium",
                children: "Re-apply on server state"
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: V,
                className: "w-full px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-medium",
                children: "Cancel"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
function Fa() {
  const t = ft(), s = ["view", "execute", "administer"], [a, n] = S(null), [l, c] = S("scope");
  return D(() => {
    W.from("module_permissions").select("role, module, can_view, can_execute, can_admin").order("role").then(({ data: i }) => {
      if ((i == null ? void 0 : i.length) > 0) {
        const y = {}, h = /* @__PURE__ */ new Set();
        i.forEach((p) => {
          y[p.role] || (y[p.role] = {}), y[p.role][p.module] = p, h.add(p.module);
        }), n({ grouped: y, modules: [...h].sort(), roles: [...new Set(i.map((p) => p.role))].sort() });
      }
    });
  }, []), /* @__PURE__ */ r("div", { className: "space-y-4", children: [
    /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl p-6 border border-gray-800", children: [
      /* @__PURE__ */ r("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4", children: [
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("h3", { className: "text-lg font-medium", children: "OACS Permission Matrix" }),
          /* @__PURE__ */ e("p", { className: "text-xs text-gray-500 mt-1", children: l === "scope" ? "Scope-based permissions by org role" : "Module-based permissions from database" })
        ] }),
        /* @__PURE__ */ r("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ r("div", { className: "flex gap-1 bg-gray-800 rounded-lg p-0.5", children: [
            /* @__PURE__ */ e(
              "button",
              {
                onClick: () => c("scope"),
                className: `px-2.5 py-1 rounded text-xs ${l === "scope" ? "bg-blue-600/20 text-blue-400" : "text-gray-500"}`,
                children: "By Scope"
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: () => c("module"),
                className: `px-2.5 py-1 rounded text-xs ${l === "module" ? "bg-blue-600/20 text-blue-400" : "text-gray-500"}`,
                children: "By Module"
              }
            )
          ] }),
          /* @__PURE__ */ e("div", { className: "flex gap-3", children: s.map((i) => /* @__PURE__ */ r("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ e("span", { className: `w-2 h-2 rounded-full ${H[i].bg} ${H[i].color}`, children: /* @__PURE__ */ e("span", { className: "sr-only", children: i }) }),
            /* @__PURE__ */ r("span", { className: `text-xs ${H[i].color}`, children: [
              H[i].short,
              " = ",
              H[i].label
            ] })
          ] }, i)) })
        ] })
      ] }),
      l === "scope" && /* @__PURE__ */ e("div", { className: "overflow-x-auto", children: /* @__PURE__ */ r("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ r("tr", { className: "border-b border-gray-800", children: [
          /* @__PURE__ */ e("th", { className: "text-left py-2 pr-4 text-gray-500 font-normal text-xs", children: "Role" }),
          Ee.map((i) => /* @__PURE__ */ e("th", { className: "text-center py-2 px-2 text-gray-500 font-normal text-xs capitalize", children: i }, i))
        ] }) }),
        /* @__PURE__ */ e("tbody", { children: t.map((i) => {
          const y = bt(i);
          return /* @__PURE__ */ r("tr", { className: "border-b border-gray-800/50 hover:bg-gray-800/30", children: [
            /* @__PURE__ */ e("td", { className: "py-2.5 pr-4 text-gray-200 font-medium whitespace-nowrap", children: i }),
            Ee.map((h) => {
              const p = y[h] || [];
              return /* @__PURE__ */ e("td", { className: "text-center py-2.5 px-2", children: /* @__PURE__ */ e("div", { className: "flex justify-center gap-1", children: s.map((d) => {
                const m = p.includes(d);
                return /* @__PURE__ */ e(
                  "span",
                  {
                    className: `w-6 h-6 rounded text-xs font-bold flex items-center justify-center ${m ? `${H[d].bg} ${H[d].color}` : "bg-gray-800/50 text-gray-700"}`,
                    title: `${i}: ${d} at ${h}`,
                    children: H[d].short
                  },
                  d
                );
              }) }) }, h);
            })
          ] }, i);
        }) })
      ] }) }),
      l === "module" && a && /* @__PURE__ */ e("div", { className: "overflow-x-auto", children: /* @__PURE__ */ r("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ r("tr", { className: "border-b border-gray-800", children: [
          /* @__PURE__ */ e("th", { className: "text-left py-2 pr-4 text-gray-500 font-normal text-xs", children: "Role" }),
          a.modules.map((i) => /* @__PURE__ */ e("th", { className: "text-center py-2 px-2 text-gray-500 font-normal text-xs capitalize", children: i.replace("_", " ") }, i))
        ] }) }),
        /* @__PURE__ */ e("tbody", { children: a.roles.map((i) => /* @__PURE__ */ r("tr", { className: "border-b border-gray-800/50 hover:bg-gray-800/30", children: [
          /* @__PURE__ */ e("td", { className: "py-2.5 pr-4 text-gray-200 font-medium whitespace-nowrap capitalize", children: i.replace("_", " ") }),
          a.modules.map((y) => {
            var p;
            const h = (p = a.grouped[i]) == null ? void 0 : p[y];
            return /* @__PURE__ */ e("td", { className: "text-center py-2.5 px-2", children: /* @__PURE__ */ e("div", { className: "flex justify-center gap-1", children: [
              { key: "view", has: h == null ? void 0 : h.can_view },
              { key: "execute", has: h == null ? void 0 : h.can_execute },
              { key: "administer", has: h == null ? void 0 : h.can_admin }
            ].map(({ key: d, has: m }) => /* @__PURE__ */ e(
              "span",
              {
                className: `w-6 h-6 rounded text-xs font-bold flex items-center justify-center ${m ? `${H[d].bg} ${H[d].color}` : "bg-gray-800/50 text-gray-700"}`,
                title: `${i}: ${d} on ${y}`,
                children: H[d].short
              },
              d
            )) }) }, y);
          })
        ] }, i)) })
      ] }) }),
      l === "module" && !a && /* @__PURE__ */ e("div", { className: "text-sm text-gray-500 py-4 text-center", children: "Loading module permissions..." })
    ] }),
    /* @__PURE__ */ e("div", { className: "bg-gray-900/50 rounded-xl p-4 border border-gray-800/50", children: /* @__PURE__ */ e("p", { className: "text-xs text-gray-500", children: l === "scope" ? "Scope-based permissions derived from org role level. Controls data visibility at organization, department, team, and project levels." : "Module-based permissions from the database (module_permissions table). Controls access to dashboard modules per role." }) })
  ] });
}
function Va() {
  const t = oe(null), [s, a] = S(null), [n, l] = S(!1), [c, i] = S(null);
  function y(p) {
    var b;
    const d = (b = p.target.files) == null ? void 0 : b[0];
    if (!d) return;
    i(null);
    const m = new FileReader();
    m.onload = (o) => {
      const N = o.target.result.trim().split(`
`), f = N[0].split(",").map((T) => T.trim()), w = N.slice(1).map((T) => {
        const O = T.split(",").map((x) => x.trim()), u = {};
        return f.forEach((x, E) => {
          u[x] = O[E] || "";
        }), u;
      });
      a({ headers: f, rows: w, fileName: d.name });
    }, m.readAsText(d);
  }
  async function h() {
    if (s) {
      l(!0), i(null);
      try {
        const p = s.rows.map((b) => ({
          name: b.Name || b.name || "",
          email: b.Email || b.email || "",
          department: b.Department || b.department || "",
          team: b.Team || b.team || "",
          manager_email: b["Manager Email"] || b.manager_email || null,
          role_level: b["Role Level"] || b.Role || b.role || "Individual Contributor",
          scope: ["CEO", "C-Suite"].includes(b["Role Level"]) ? "organization" : ["EVP", "SVP", "VP", "Director"].includes(b["Role Level"]) ? "department" : ["Manager", "Team Lead"].includes(b["Role Level"]) ? "team" : "self"
        })), { data: d, error: m } = await W.from("org_hierarchy").upsert(p, { onConflict: "email" }).select();
        if (m)
          i({ success: !1, message: `Import failed: ${m.message}` });
        else {
          const { data: b } = await W.from("org_hierarchy").select("id, email"), o = {};
          b == null || b.forEach((N) => {
            o[N.email] = N.id;
          });
          let g = 0;
          for (const N of p)
            N.manager_email && o[N.manager_email] && (await W.from("org_hierarchy").update({ manager_id: o[N.manager_email] }).eq("email", N.email), g++);
          i({ success: !0, message: `Imported ${d.length} people, ${g} manager links resolved.` });
        }
      } catch (p) {
        i({ success: !1, message: `Error: ${p.message}` });
      } finally {
        l(!1);
      }
    }
  }
  return /* @__PURE__ */ r("div", { className: "space-y-4", children: [
    /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl p-6 border border-gray-800", children: [
      /* @__PURE__ */ e("h3", { className: "text-lg font-medium mb-1", children: "Import Organization Structure" }),
      /* @__PURE__ */ e("p", { className: "text-xs text-gray-500 mb-4", children: "Upload a CSV with columns: Name, Email, Department, Team, Manager Name, Manager Email, Role Level" }),
      /* @__PURE__ */ r("div", { className: "space-y-4", children: [
        /* @__PURE__ */ r(
          "div",
          {
            onClick: () => {
              var p;
              return (p = t.current) == null ? void 0 : p.click();
            },
            className: "border-2 border-dashed border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:border-gray-600 transition-colors",
            children: [
              /* @__PURE__ */ e("div", { className: "text-2xl text-gray-600 mb-2", children: "+" }),
              /* @__PURE__ */ e("div", { className: "text-sm text-gray-400", children: "Click to select CSV file" }),
              /* @__PURE__ */ e("div", { className: "text-xs text-gray-600 mt-1", children: "or drag and drop" })
            ]
          }
        ),
        /* @__PURE__ */ e(
          "input",
          {
            ref: t,
            type: "file",
            accept: ".csv",
            onChange: y,
            className: "hidden"
          }
        ),
        s && /* @__PURE__ */ r("div", { className: "space-y-3", children: [
          /* @__PURE__ */ r("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ r("div", { children: [
              /* @__PURE__ */ e("span", { className: "text-sm text-gray-200", children: s.fileName }),
              /* @__PURE__ */ r("span", { className: "text-xs text-gray-500 ml-2", children: [
                s.rows.length,
                " rows"
              ] })
            ] }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: () => {
                  a(null), i(null), t.current && (t.current.value = "");
                },
                className: "text-xs text-gray-500 hover:text-gray-300",
                children: "Clear"
              }
            )
          ] }),
          /* @__PURE__ */ r("div", { className: "text-xs text-gray-500", children: [
            "Columns detected: ",
            s.headers.map((p, d) => /* @__PURE__ */ e("span", { className: "inline-block bg-gray-800 rounded px-1.5 py-0.5 mr-1 mb-1 text-gray-400", children: p }, d))
          ] }),
          /* @__PURE__ */ r("div", { className: "overflow-x-auto", children: [
            /* @__PURE__ */ r("table", { className: "w-full text-xs", children: [
              /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ e("tr", { className: "border-b border-gray-800", children: s.headers.slice(0, 5).map((p) => /* @__PURE__ */ e("th", { className: "text-left py-1.5 pr-3 text-gray-500 font-normal", children: p }, p)) }) }),
              /* @__PURE__ */ e("tbody", { children: s.rows.slice(0, 5).map((p, d) => /* @__PURE__ */ e("tr", { className: "border-b border-gray-800/50", children: s.headers.slice(0, 5).map((m) => /* @__PURE__ */ e("td", { className: "py-1.5 pr-3 text-gray-400 truncate max-w-[150px]", children: p[m] }, m)) }, d)) })
            ] }),
            s.rows.length > 5 && /* @__PURE__ */ r("div", { className: "text-xs text-gray-600 mt-1", children: [
              "...and ",
              s.rows.length - 5,
              " more rows"
            ] })
          ] }),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: h,
              disabled: n,
              className: "px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm rounded-lg transition-colors",
              children: n ? "Importing..." : `Import ${s.rows.length} Entities`
            }
          )
        ] }),
        c && /* @__PURE__ */ e("div", { className: `rounded-lg px-4 py-3 text-sm ${c.success ? "bg-green-500/10 border border-green-800 text-green-400" : "bg-red-500/10 border border-red-800 text-red-400"}`, children: c.message })
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "bg-gray-900/50 rounded-xl p-4 border border-gray-800/50", children: /* @__PURE__ */ e("p", { className: "text-xs text-gray-500", children: "CSV import creates or updates the org hierarchy in Supabase. Existing entries with matching emails are updated. Manager relationships are automatically resolved from Manager Email column." }) })
  ] });
}
function Ba() {
  const { entity: t, refreshEntity: s } = te(), [a, n] = S({ name: "", entity_type: "human" }), [l, c] = S(!1), [i, y] = S(0), [h, p] = S(null);
  D(() => {
    t && n({
      name: t.name || "",
      entity_type: t.entity_type || "human"
    });
  }, [t == null ? void 0 : t.entity_id, t == null ? void 0 : t.name, t == null ? void 0 : t.entity_type]);
  const d = !!t && (a.name !== (t.name || "") || a.entity_type !== (t.entity_type || "human")), m = i > 0 && Date.now() - i < 1500, b = !t;
  async function o() {
    if (!(!t || !d)) {
      c(!0), p(null);
      try {
        const { error: g } = await W.from("entities").update({ name: a.name, entity_type: a.entity_type }).eq("entity_id", t.entity_id);
        g ? p(g.message) : (y(Date.now()), s && await s(), setTimeout(() => y((N) => Date.now() - N >= 1500 ? 0 : N), 1600));
      } catch (g) {
        p(g.message || "Save failed");
      } finally {
        c(!1);
      }
    }
  }
  return /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl p-6 border border-gray-800 space-y-4", children: [
    /* @__PURE__ */ r("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ e("h3", { className: "text-lg font-medium", children: "Entity Profile" }),
      m && !h && /* @__PURE__ */ e("span", { className: "text-xs text-green-400", children: "Saved" }),
      h && /* @__PURE__ */ r("span", { className: "text-xs text-red-400", children: [
        "Save failed: ",
        h
      ] })
    ] }),
    !t && /* @__PURE__ */ e("div", { className: "text-xs text-gray-500", children: "Sign in to edit" }),
    /* @__PURE__ */ r("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ r("div", { children: [
        /* @__PURE__ */ e("label", { className: "block text-xs text-gray-500 mb-1", children: "Entity ID" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            value: (t == null ? void 0 : t.entity_id) || "",
            readOnly: !0,
            className: "w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-500 font-mono"
          }
        )
      ] }),
      /* @__PURE__ */ r("div", { children: [
        /* @__PURE__ */ e("label", { className: "block text-xs text-gray-500 mb-1", children: "Display Name" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            value: a.name,
            disabled: b,
            onChange: (g) => n((N) => ({ ...N, name: g.target.value })),
            className: "w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500 disabled:opacity-50"
          }
        )
      ] }),
      /* @__PURE__ */ r("div", { children: [
        /* @__PURE__ */ e("label", { className: "block text-xs text-gray-500 mb-1", children: "Entity Type" }),
        /* @__PURE__ */ r(
          "select",
          {
            value: a.entity_type,
            disabled: b,
            onChange: (g) => n((N) => ({ ...N, entity_type: g.target.value })),
            className: "w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500 disabled:opacity-50",
            children: [
              /* @__PURE__ */ e("option", { value: "human", children: "Human" }),
              /* @__PURE__ */ e("option", { value: "ai", children: "AI Agent" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ r("div", { children: [
        /* @__PURE__ */ e("label", { className: "block text-xs text-gray-500 mb-1", children: "Role" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            value: (t == null ? void 0 : t.role) || "",
            readOnly: !0,
            className: "w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-500 font-mono"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ e(
      "button",
      {
        onClick: o,
        disabled: !d || l || b,
        className: "px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm rounded-lg transition-colors",
        children: l ? "Saving..." : m ? "Saved" : "Save Changes"
      }
    ) })
  ] });
}
const Fe = [
  { key: "in_app", label: "In-app notifications", desc: "Show notifications in the bell icon", default: !0 },
  { key: "email", label: "Email notifications", desc: "Send email for high-priority items", default: !0 },
  { key: "telegram", label: "Telegram notifications", desc: "Push to Telegram for critical alerts", default: !1 },
  { key: "handoff_alerts", label: "Handoff alerts", desc: "Notify when a task is handed to you", default: !0 },
  { key: "morning_briefing", label: "Morning briefing", desc: "Daily summary at start of day", default: !0 }
];
function za() {
  const { entity: t, refreshEntity: s } = te(), [a, n] = S(null), [l, c] = S(0), [i, y] = S(null), h = oe(null), p = oe(null);
  D(() => {
    if (t) {
      const o = t.notification_preferences || {}, g = {};
      for (const N of Fe)
        g[N.key] = typeof o[N.key] == "boolean" ? o[N.key] : N.default;
      n(g), p.current = g;
    }
  }, [t == null ? void 0 : t.entity_id]);
  function d(o) {
    h.current && clearTimeout(h.current), h.current = setTimeout(async () => {
      try {
        const { error: g } = await W.from("entities").update({ notification_preferences: o }).eq("entity_id", t.entity_id);
        g ? (y("Save failed"), p.current && n(p.current), setTimeout(() => y(null), 1500)) : (p.current = o, c(Date.now()), y(null), s && await s(), setTimeout(() => c((N) => Date.now() - N >= 1500 ? 0 : N), 1600));
      } catch {
        y("Save failed"), p.current && n(p.current), setTimeout(() => y(null), 1500);
      }
    }, 300);
  }
  function m(o) {
    if (!a || !t) return;
    const g = { ...a, [o]: !a[o] };
    n(g), d(g);
  }
  if (!t)
    return /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl p-6 border border-gray-800", children: [
      /* @__PURE__ */ e("h3", { className: "text-lg font-medium mb-2", children: "Notification Preferences" }),
      /* @__PURE__ */ e("div", { className: "text-sm text-gray-500", children: "Sign in to edit notification preferences" })
    ] });
  if (!a)
    return /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl p-6 border border-gray-800", children: [
      /* @__PURE__ */ e("h3", { className: "text-lg font-medium mb-2", children: "Notification Preferences" }),
      /* @__PURE__ */ e("div", { className: "text-sm text-gray-500", children: "Loading..." })
    ] });
  const b = l > 0 && Date.now() - l < 1500;
  return /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl p-6 border border-gray-800 space-y-4", children: [
    /* @__PURE__ */ r("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ e("h3", { className: "text-lg font-medium", children: "Notification Preferences" }),
      b && !i && /* @__PURE__ */ e("span", { className: "text-xs text-green-400", children: "Saved" }),
      i && /* @__PURE__ */ e("span", { className: "text-xs text-red-400", children: i })
    ] }),
    /* @__PURE__ */ e("div", { className: "space-y-3", children: Fe.map((o) => {
      const g = !!a[o.key];
      return /* @__PURE__ */ r("div", { className: "flex items-center justify-between py-2", children: [
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-sm text-gray-200", children: o.label }),
          /* @__PURE__ */ e("div", { className: "text-xs text-gray-500", children: o.desc })
        ] }),
        /* @__PURE__ */ r("label", { className: "relative inline-flex items-center cursor-pointer shrink-0 ml-4", children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "checkbox",
              checked: g,
              onChange: () => m(o.key),
              className: "sr-only peer"
            }
          ),
          /* @__PURE__ */ e("div", { className: "w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white" })
        ] })
      ] }, o.key);
    }) })
  ] });
}
function Wa() {
  const [t, s] = S("general"), { isSuperUser: a } = te(), l = [
    { id: "general", label: "General" },
    { id: "permissions", label: "Permissions" },
    { id: "org-import", label: "Org Import" },
    { id: "access-control", label: "Access Control", requiresSuperUser: !0 },
    { id: "notifications", label: "Notifications" },
    { id: "api", label: "API" }
  ].filter((c) => !c.requiresSuperUser || a);
  return D(() => {
    t === "access-control" && !a && s("general");
  }, [a, t]), /* @__PURE__ */ r("div", { className: "tgim-scope space-y-6", children: [
    /* @__PURE__ */ e("h2", { className: "text-2xl font-bold", children: "Settings" }),
    /* @__PURE__ */ e("div", { className: "flex gap-1 bg-gray-900 rounded-lg p-1 border border-gray-800 w-fit flex-wrap", children: l.map((c) => /* @__PURE__ */ e(
      "button",
      {
        onClick: () => s(c.id),
        className: `px-4 py-1.5 rounded-md text-sm transition-colors ${t === c.id ? "bg-blue-600/20 text-blue-400 font-medium" : "text-gray-400 hover:text-gray-200"}`,
        children: c.label
      },
      c.id
    )) }),
    t === "general" && /* @__PURE__ */ e(Ba, {}),
    t === "permissions" && /* @__PURE__ */ e(Fa, {}),
    t === "org-import" && /* @__PURE__ */ e(Va, {}),
    t === "access-control" && a && /* @__PURE__ */ e(ja, {}),
    t === "notifications" && /* @__PURE__ */ e(za, {}),
    t === "api" && /* @__PURE__ */ r("div", { className: "bg-gray-900 rounded-xl p-6 border border-gray-800 space-y-4", children: [
      /* @__PURE__ */ e("h3", { className: "text-lg font-medium", children: "API Configuration" }),
      /* @__PURE__ */ r("div", { className: "space-y-4", children: [
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("label", { className: "block text-xs text-gray-500 mb-1", children: "API Base URL" }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              defaultValue: "http://157.230.191.4:8089",
              readOnly: !0,
              className: "w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-500 font-mono"
            }
          )
        ] }),
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("label", { className: "block text-xs text-gray-500 mb-1", children: "Supabase Project" }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              defaultValue: "qzhdnpcgodqduirqrocn",
              readOnly: !0,
              className: "w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-500 font-mono"
            }
          )
        ] }),
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ e("label", { className: "block text-xs text-gray-500 mb-1", children: "API Status" }),
          /* @__PURE__ */ r("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e("span", { className: "w-2 h-2 bg-green-500 rounded-full" }),
            /* @__PURE__ */ e("span", { className: "text-sm text-green-400", children: "Connected" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "text-xs text-gray-600", children: "TGIM v4.0 — Parallax + Keel" })
  ] });
}
const Ga = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Wa
}, Symbol.toStringTag, { value: "Module" }));
export {
  oa as AuditLog,
  ea as BrainStream,
  it as Briefing,
  kt as Dashboard,
  Vt as Kanban,
  aa as OrgChart,
  Wa as Settings,
  Ya as TGIM_BUNDLE_PHASE,
  Xa as TGIM_BUNDLE_VERSION,
  Ka as TGIM_NAV_ITEMS,
  Ja as TGIM_ROUTES,
  Dt as TaskDetail,
  Lt as Tasks,
  Gt as Timeline,
  Jt as Workload
};
//# sourceMappingURL=tgim.js.map
