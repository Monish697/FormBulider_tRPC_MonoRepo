import Link from "next/link";
import { ThemeToggle } from "../components/ThemeToggle";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get("authToken");
  const metrics = [
    { value: "2 min", label: "To publish" },
    { value: "120+", label: "Templates" },
    { value: "99.9%", label: "Uptime" },
  ];

  const useCases = [
    {
      title: "Sales intake",
      desc: "Route high-intent leads with calm, multi-step flows.",
    },
    {
      title: "Customer onboarding",
      desc: "Collect setup details with branded, guided forms.",
    },
    {
      title: "Support triage",
      desc: "Capture context fast and prioritize critical tickets.",
    },
    {
      title: "Research ops",
      desc: "Run interviews, studies, and feedback loops in one place.",
    },
  ];

  const workflow = [
    {
      title: "Compose",
      desc: "Start with a template or build from a blank canvas.",
    },
    {
      title: "Style",
      desc: "Apply typography, spacing, and motion to match your brand.",
    },
    {
      title: "Ship",
      desc: "Embed, share, or publish a dedicated Formcraft page.",
    },
  ];

  const highlightCards = [
    {
      title: "Adaptive layouts",
      desc: "Every screen feels tailored, from desktop to mobile.",
    },
    {
      title: "Smart routing",
      desc: "Auto-assign submissions based on answers and intent.",
    },
    {
      title: "Team-ready insights",
      desc: "See completion trends, drop-off, and handoff status.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f6f4f1] text-slate-900 dark:text-white dark:bg-black dark:text-white font-sans">
      <div className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-[#ffe9d6] blur-[140px] dark:hidden" />
      <div className="pointer-events-none absolute top-24 left-0 h-64 w-64 rounded-full bg-[#dfe8ff] blur-[150px] dark:hidden" />

      <header className="relative z-10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8">
          <Link className="flex items-center gap-3" href="/">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-[#6FC3DF] bg-white/70 dark:bg-black text-sm font-semibold">
              FC
            </span>
            <div>
              <p className="text-sm font-semibold tracking-tight">Formcraft</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-gray-300">Studio</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-slate-600 dark:text-gray-300 md:flex">
            <a className="transition hover:text-slate-900 dark:text-white" href="#product">
              Product
            </a>
            <a className="transition hover:text-slate-900 dark:text-white" href="#use-cases">
              Use cases
            </a>
            <a className="transition hover:text-slate-900 dark:text-white" href="#workflow">
              Workflow
            </a>
            <a className="transition hover:text-slate-900 dark:text-white" href="#security">
              Security
            </a>
            <Link className="transition hover:text-slate-900 dark:text-white" href="/pricing">
              Pricing
            </Link>
            <Link className="transition hover:text-slate-900 dark:text-white font-medium text-indigo-600 dark:text-indigo-400" href="/live">
              Live Pages
            </Link>
          </nav>
          <div className="flex items-center gap-3 text-sm">
            <ThemeToggle />
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="rounded-full bg-slate-900 dark:bg-white dark:text-black px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 inline-block"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden rounded-full border border-black/10 dark:border-[#6FC3DF] bg-white/70 dark:bg-black px-4 py-2 text-slate-700 dark:text-gray-200 transition hover:bg-white dark:bg-black md:inline-flex"
                >
                  Log in
                </Link>
                <Link
                  href="/login"
                  className="rounded-full bg-slate-900 dark:bg-white dark:text-black px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 inline-block"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="inline-flex items-center rounded-full border border-black/10 dark:border-[#6FC3DF] bg-white/70 dark:bg-black px-3 py-1 text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500 dark:text-gray-300">
                Formcraft studio
              </span>
              <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900 dark:text-white md:text-6xl">
                Design-first forms that feel like part of your product.
              </h1>
              <p className="mt-6 text-lg text-slate-600 dark:text-gray-300">
                Build calm, conversion-ready forms with premium typography, smart routing, and a
                writing-like experience that keeps every touchpoint on brand.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={isLoggedIn ? "/dashboard" : "/login"}
                  className="rounded-full bg-slate-900 dark:bg-white dark:text-black px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 text-center"
                >
                  {isLoggedIn ? "Go to Dashboard" : "Start building for free"}
                </Link>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-6 text-sm text-slate-600 dark:text-gray-300 sm:grid-cols-3">
                {metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="text-2xl font-semibold text-slate-900 dark:text-white">{metric.value}</p>
                    <p>{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-6 right-6 rounded-2xl border border-black/10 dark:border-[#6FC3DF] bg-white/80 dark:bg-black px-4 py-2 text-xs text-slate-600 dark:text-gray-300 shadow-lg">
                <p className="font-semibold text-slate-900 dark:text-white">Form scored: 92</p>
                <p className="text-slate-500 dark:text-gray-300">Routed to RevOps</p>
              </div>
              <div className="rounded-[32px] border border-black/10 dark:border-[#6FC3DF] bg-white/80 dark:bg-black p-6 shadow-2xl shadow-black/5 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Product demo
                    </p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">ABC.XYZ</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Live
                  </span>
                </div>
                <div className="mt-6 space-y-4">
                  {["Full name", "Work email", "Company size", "Use case"].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-black/10 dark:border-[#6FC3DF] bg-white dark:bg-black px-4 py-3 text-sm text-slate-500 dark:text-gray-300"
                    >
                      {item}
                    </div>
                  ))}
                  <button className="w-full rounded-2xl bg-slate-900 dark:bg-white dark:text-black py-3 text-sm font-semibold text-white">
                    Submit request
                  </button>
                </div>
              </div>
              <div className="absolute -bottom-8 left-4 rounded-2xl border border-black/10 dark:border-[#6FC3DF] bg-white/80 dark:bg-black px-4 py-2 text-xs text-slate-600 dark:text-gray-300 shadow-lg">
                <p className="font-semibold text-slate-900 dark:text-white">Slack update</p>
                <p className="text-slate-500 dark:text-gray-300">New demo request · 2m ago</p>
              </div>
            </div>
          </div>
        </section>

        <section id="product" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-slate-500 dark:text-gray-300">Product</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white md:text-4xl">
                A calm workspace for data capture.
              </h2>
              <p className="mt-4 text-slate-600 dark:text-gray-300">
                Formcraft blends crisp typography with thoughtful motion, so every form feels like
                it belongs on your website.
              </p>
              <div className="mt-8 space-y-4 text-sm text-slate-600 dark:text-gray-300">
                {[
                  "Reusable brand kits for every team.",
                  "Conditional logic that reads like a conversation.",
                  "Instant routing rules and ownership handoff.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-slate-900 dark:bg-white dark:text-black" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[32px] border border-black/10 dark:border-[#6FC3DF] bg-white/80 dark:bg-black p-6 shadow-2xl shadow-black/5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Submission overview</p>
                <span className="rounded-full border border-black/10 dark:border-[#6FC3DF] px-3 py-1 text-xs text-slate-500 dark:text-gray-300">
                  Live sync
                </span>
              </div>
              <div className="mt-6 grid gap-4 text-sm text-slate-600 dark:text-gray-300">
                {[
                  { label: "Completion rate", value: "91%" },
                  { label: "Median time", value: "01:42" },
                  {
                    label: "Top source",
                    value: "Product site",
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-2xl border border-black/10 dark:border-[#6FC3DF] bg-white dark:bg-black px-4 py-3"
                  >
                    <span>{row.label}</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="use-cases" className="mx-auto w-full max-w-6xl px-6 pb-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-slate-500 dark:text-gray-300">
                Use cases
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white md:text-4xl">
                Built for every team that collects data.
              </h2>
            </div>
            <button className="rounded-full border border-black/10 dark:border-[#6FC3DF] bg-white/70 dark:bg-black px-5 py-2 text-sm text-slate-700 dark:text-gray-200 transition hover:bg-white dark:bg-black">
              Explore templates
            </button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {useCases.map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-black/10 dark:border-[#6FC3DF] bg-white/80 dark:bg-black p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="workflow" className="mx-auto w-full max-w-6xl px-6 pb-20">
          <div className="rounded-[36px] border border-black/10 dark:border-[#6FC3DF] bg-white/80 dark:bg-black p-8 shadow-lg shadow-black/5">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-slate-500 dark:text-gray-300">
                  Workflow
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white md:text-4xl">
                  From draft to launch in a single afternoon.
                </h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-gray-300">
                No-code editor, saved components, and reusable brand kits.
              </p>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {workflow.map((step, idx) => (
                <div
                  key={step.title}
                  className="rounded-[28px] border border-black/10 dark:border-[#6FC3DF] bg-white dark:bg-black p-6"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{step.title}</h3>
                  <p className="mt-3 text-sm text-slate-600 dark:text-gray-300">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="security" className="mx-auto w-full max-w-6xl px-6 pb-20">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[32px] border border-black/10 dark:border-[#6FC3DF] bg-white/80 dark:bg-black p-8 shadow-sm">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-slate-500 dark:text-gray-300">
                Security
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">
                Privacy and compliance built in.
              </h2>
              <p className="mt-4 text-sm text-slate-600 dark:text-gray-300">
                SOC 2-ready infrastructure, regional data residency controls, and automated audit
                trails help you ship without legal delays.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-600 dark:text-gray-300">
                {["SOC 2 Type II", "GDPR", "HIPAA-ready", "SSO/SAML"].map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-black/10 dark:border-[#6FC3DF] bg-white dark:bg-black px-3 py-1"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-[32px] border border-black/10 dark:border-[#6FC3DF] bg-slate-900 dark:bg-black dark:text-white p-8 text-white shadow-lg">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-white/60">
                Reliability
              </p>
              <div className="mt-6 space-y-4 text-sm text-white/80">
                {[
                  { label: "Form uptime", value: "99.99%" },
                  { label: "Encryption", value: "AES-256" },
                  {
                    label: "Audit logs",
                    value: "Continuous",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3"
                  >
                    <span>{item.label}</span>
                    <span className="font-semibold text-white">{item.value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-white/60">
                Monitoring, alerting, and team escalation included.
              </p>
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto w-full max-w-6xl px-6 pb-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-slate-500 dark:text-gray-300">Pricing</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white md:text-4xl">
                Simple tiers that scale with your team.
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-gray-300">
                Fair pricing for focused teams. No hidden fees.
              </p>
            </div>
            <Link
              className="inline-flex items-center rounded-full border border-black/10 dark:border-[#6FC3DF] bg-white/70 dark:bg-black px-5 py-2 text-sm text-slate-700 dark:text-gray-200 transition hover:bg-white dark:bg-black"
              href="/pricing"
            >
              View pricing
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Starter",
                price: "$29",
                desc: "For small teams launching their first branded form.",
              },
              {
                title: "Studio",
                price: "$79",
                desc: "Routing, automations, and shared brand libraries.",
              },
              {
                title: "Enterprise",
                price: "Custom",
                desc: "Advanced security, dedicated support, and SLAs.",
              },
            ].map((plan) => (
              <div
                key={plan.title}
                className="rounded-[28px] border border-black/10 dark:border-[#6FC3DF] bg-white/80 dark:bg-black p-6 shadow-sm"
              >
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{plan.title}</p>
                <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">{plan.price}</p>
                <p className="mt-3 text-sm text-slate-600 dark:text-gray-300">{plan.desc}</p>
                <button className="mt-6 w-full rounded-full bg-slate-900 dark:bg-white dark:text-black px-4 py-2 text-sm font-semibold text-white">
                  Start with {plan.title}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <div className="grid gap-6 lg:grid-cols-3">
            {highlightCards.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[28px] border border-black/10 dark:border-[#6FC3DF] bg-white/80 dark:bg-black p-6 text-sm text-slate-600 dark:text-gray-300"
              >
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="mt-3">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 dark:border-[#6FC3DF] bg-white/40 dark:bg-black">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-slate-500 dark:text-gray-300 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-base font-semibold text-slate-900 dark:text-white">Formcraft</p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-gray-300">
              Calm forms for thoughtful teams
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <a className="transition hover:text-slate-900 dark:text-white" href="#product">
              Product
            </a>
            <a className="transition hover:text-slate-900 dark:text-white" href="#use-cases">
              Use cases
            </a>
            <Link className="transition hover:text-slate-900 dark:text-white" href="/pricing">
              Pricing
            </Link>
            <a className="transition hover:text-slate-900 dark:text-white" href="#security">
              Security
            </a>
          </div>
          <p className="text-xs text-slate-400">© 2026 Formcraft, Inc.</p>
        </div>
      </footer>
    </div>
  );
}
