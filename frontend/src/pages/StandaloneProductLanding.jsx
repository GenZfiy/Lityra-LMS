import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen, Code2, GraduationCap, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { Logo } from "../components/ui/Logo.jsx";
import { Button } from "../components/ui/primitives.jsx";

const CareerConstellation = lazy(() =>
  import("../components/ui/CareerConstellation.jsx").then((module) => ({ default: module.CareerConstellation })),
);

const learningStages = [
  [BookOpen, "Learn", "Courses, lessons and guided study"],
  [Code2, "Practice", "Coding challenges and adaptive drills"],
  [ShieldCheck, "Demonstrate", "Assessments and verified skills"],
  [Trophy, "Grow", "Progress, achievements and credentials"],
];

const capabilities = [
  [BookOpen, "Build foundations", "Follow a curriculum and learn through structured lessons."],
  [Code2, "Practice with purpose", "Strengthen skills through coding challenges and adaptive drills."],
  [Sparkles, "Get guided support", "Use AI-assisted explanations and focused micro-lessons."],
  [ShieldCheck, "Show your progress", "Track assessments, achievements and skill credentials."],
];

export default function Landing() {
  const reduceMotion = useReducedMotion();
  const staticScene = reduceMotion || window.matchMedia("(max-width: 700px)").matches
    || (navigator.deviceMemory && navigator.deviceMemory <= 2) || navigator.connection?.saveData;
  return (
    <div className="landing-page min-h-screen bg-surface">
      <header className="landing-nav">
        <div className="landing-nav-inner">
          <Link to="/" className="landing-brand" aria-label="Lityra Learn home">
            <Logo size={48} />
            <span><strong>Lityra Learn</strong><small>Write Your Future</small></span>
          </Link>
          <nav aria-label="Primary navigation">
            <Link to="/about">About</Link>
            <Link to="/learn/login">Learner login</Link>
            <Link to="/trainer/login">Trainer login</Link>
            <Button as={Link} to="/learn/register" size="sm">Get started <ArrowRight size={15} /></Button>
          </nav>
        </div>
      </header>

      <section className={`landing-hero ${staticScene ? "is-static" : ""}`} aria-labelledby="landing-title">
        <div className="landing-hero-grain" aria-hidden="true" />
        <div className="landing-scene-route" aria-hidden="true" />
        <Suspense fallback={null}>
          <CareerConstellation mode="journey" className="landing-journey-scene" />
        </Suspense>
        <div className="landing-hero-layout">
          <div className="landing-hero-copy">
            <p className="landing-overline"><span /> LEARN · PRACTICE · GROW</p>
          <h1 id="landing-title"><span>A future written</span><em>by you.</em></h1>
            <p className="landing-hero-description">Build strong foundations, practice real skills and see your progress take shape. Lityra Learn gives every learner a clear path to keep growing.</p>
            <div className="landing-hero-actions">
              <Button as={Link} to="/learn/register" size="lg">Start learning <ArrowRight size={17} /></Button>
              <Link className="landing-secondary-link" to="/learn/login">Learner sign in <ArrowRight size={16} /></Link>
            </div>
            <p className="landing-hero-note">A focused space for learning, practice and progress.</p>
          </div>

          <ol className="landing-scene-stations" aria-label="Lityra Learn journey">
            {learningStages.map(([Icon, title, detail], index) => (
              <li key={title} className={`station-${["learning", "practice", "evidence", "growth"][index]}`}>
                <span className="station-number">0{index + 1}</span><Icon aria-hidden="true" />
                <span><strong>{title}</strong><small>{detail}</small></span>
              </li>
            ))}
          </ol>

          <div className="landing-hero-index" aria-hidden="true"><span>01</span><i></i><span>04</span></div>
        </div>
        <a href="#journey" className="landing-scroll-cue"><span>Explore Learn</span><i aria-hidden="true" /></a>
      </section>

      <section id="journey" className="landing-loop-section relative overflow-hidden bg-invert-950">
        <div className="absolute inset-0 opacity-[0.12] bg-grid" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-amber-300">Your learning space</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-white leading-tight">Small steps. Lasting capability.</h2>
              <p className="mt-4 max-w-lg text-slate-300 leading-7">Learn at your pace, put new ideas into practice, and build a record of the skills you develop along the way.</p>
            </div>
            <div className="landing-loop" aria-label="Lityra Learn capabilities">
              {capabilities.map(([Icon, title, detail], index) => (
                <motion.article key={title} className="landing-loop-step" initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: reduceMotion ? 0 : .36, delay: reduceMotion ? 0 : index * .07 }}>
                  <span className="landing-loop-index">0{index + 1}</span><span className="landing-loop-icon"><Icon size={19} /></span>
                  <div><h3>{title}</h3><p>{detail}</p></div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="landing-learn-overview mx-auto max-w-6xl px-5 py-16">
        <div className="text-center mb-10">
          <p className="landing-overview-eyebrow">Lityra Learn</p>
          <h2 className="landing-overview-title">Make every learning hour count.</h2>
          <p className="landing-overview-description">One welcoming workspace for students, educators and institutions to teach, practice and measure growth.</p>
        </div>
        <motion.div initial={false} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true }} transition={reduceMotion ? { duration: 0 } : { duration: 0.5 }}
          className="landing-learn-card mx-auto max-w-3xl rounded-2xl p-7 sm:p-9">
          <div className="flex items-center gap-3">
            <span className="grid place-items-center h-12 w-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-sm"><GraduationCap size={24} /></span>
            <div><p className="font-display text-xl font-bold text-ink-900">Lityra Learn</p><p className="text-[12.5px] text-slate-500">Write Your Future</p></div>
          </div>
          <ul className="mt-5 grid sm:grid-cols-2 gap-3">
            {[[Code2, "Curriculum, coding challenges and adaptive drills"], [Sparkles, "AI tutor, skill map and micro-lessons"], [Trophy, "XP, badges and learning achievements"], [ShieldCheck, "Assessments, certificates and skill wallet"]].map(([Icon, text]) => (
              <li key={text} className="flex items-start gap-2.5 text-[13.5px] text-slate-600"><Icon size={16} className="text-brand-500 mt-0.5 shrink-0" />{text}</li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button as={Link} to="/learn/register" className="justify-center">Create your account <ArrowRight size={16} /></Button>
            <Button as={Link} to="/trainer/login" variant="secondary" className="justify-center">Trainer sign in</Button>
          </div>
        </motion.div>
      </section>

      <section className="relative overflow-hidden bg-invert-950">
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 h-64 w-[42rem] rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.10] bg-grid" />
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-[1.1]">Your next chapter<br /><span className="text-amber-400">starts with learning.</span></h2>
          <p className="mt-4 text-slate-300 max-w-xl mx-auto">Build knowledge, practice with confidence and keep moving toward your goals.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button as={Link} to="/learn/register" size="lg" variant="amber">Start learning <ArrowRight size={18} /></Button>
            <Link to="/about" className="inline-flex items-center gap-2 h-12 px-6 rounded-lg border border-white/25 text-white font-semibold hover:bg-white/10 transition-colors">About Lityra Learn</Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="project-learning-title" className="relative overflow-hidden bg-[#f7f5ef] px-5 py-16 sm:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#d9b66e]/15 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-[.18em] text-[#a8792d]">PROJECT-BASED LEARNING · BEYOND VIBE CODING</p>
            <h2 id="project-learning-title" className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-[#102541] sm:text-4xl lg:text-5xl">Don't Just Build Projects. Understand How They Work.</h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-[#40516a] sm:text-lg sm:leading-8">
              <p>AI can help you build applications faster. But do you understand the code it generates, how the frontend communicates with the backend, or what happens when something breaks?</p>
              <p>At Lityra, we help you go beyond writing code. Learn system design, frontend and backend development, API integration, databases, authentication, authorization, application security, debugging, testing, and deployment by building real projects.</p>
              <p>Strengthen your programming fundamentals, practice competitive coding, prepare for interviews, and build projects you can proudly showcase on your resume.</p>
            </div>
          </div>

          <blockquote className="mt-9 rounded-2xl border border-[#d9b66e]/45 bg-[#102541] px-6 py-6 text-lg font-semibold leading-8 text-white shadow-[0_18px_50px_rgba(16,37,65,.14)] sm:px-8 sm:py-7 sm:text-xl">
            <span className="mb-2 block text-xs font-bold tracking-[.16em] text-[#e4c47e]">BUILD WITH UNDERSTANDING</span>
            “Don't just say, 'I built this using AI.' Say, 'I built this, I understand how it works, and I know how to improve it.'”
          </blockquote>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-xl border border-[#d9d3c4] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,65,.05)]">
              <BookOpen aria-hidden="true" className="text-[#a8792d]" size={21} />
              <h3 className="mt-4 font-display text-lg font-bold text-[#102541]">Learn by Building</h3>
              <p className="mt-2 text-sm leading-6 text-[#526176]">Turn concepts into practical, working applications.</p>
            </article>
            <article className="rounded-xl border border-[#d9d3c4] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,65,.05)]">
              <Code2 aria-hidden="true" className="text-[#a8792d]" size={21} />
              <h3 className="mt-4 font-display text-lg font-bold text-[#102541]">Understand the Code</h3>
              <p className="mt-2 text-sm leading-6 text-[#526176]">Learn what your code does, why it works, and how its components communicate.</p>
            </article>
            <article className="rounded-xl border border-[#d9d3c4] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,65,.05)]">
              <ShieldCheck aria-hidden="true" className="text-[#a8792d]" size={21} />
              <h3 className="mt-4 font-display text-lg font-bold text-[#102541]">Build Securely</h3>
              <p className="mt-2 text-sm leading-6 text-[#526176]">Understand APIs, databases, authentication, authorization, and security fundamentals.</p>
            </article>
            <article className="rounded-xl border border-[#d9d3c4] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,65,.05)]">
              <Sparkles aria-hidden="true" className="text-[#a8792d]" size={21} />
              <h3 className="mt-4 font-display text-lg font-bold text-[#102541]">Think Like an Engineer</h3>
              <p className="mt-2 text-sm leading-6 text-[#526176]">Read code, debug errors, test functionality, and learn how to take prototypes toward production readiness.</p>
            </article>
          </div>

          <p className="mt-9 text-center font-display text-xl font-bold leading-relaxed text-[#102541] sm:text-2xl">Build with AI. Understand the Code. <span className="text-[#a8792d]">Engineer the Future.</span></p>
        </div>
      </section>

      <section aria-labelledby="home-learning-philosophy-title" className="relative overflow-hidden bg-[#0a1a30] px-5 py-16 text-white sm:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -left-28 top-12 h-80 w-80 rounded-full bg-[#1f6da5]/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-[.18em] text-[#e2bf71]">OUR LEARNING PHILOSOPHY</span>
            <h2 id="home-learning-philosophy-title" className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">From Vibe Coding to Engineering Confidence</h2>
            <p className="mt-4 font-display text-lg font-semibold leading-7 text-[#e2bf71] sm:text-xl">Build with AI. Understand Every Layer. Own the Result.</p>
            <div className="mt-6 space-y-4 text-base leading-7 text-[#d1dbe7] sm:text-lg sm:leading-8">
              <p>Software development is changing. AI-powered coding tools make it possible to turn ideas into working prototypes faster than ever. At Lityra, we embrace this progress while believing that the ability to generate code should go hand in hand with the ability to understand it.</p>
              <p>Our approach is built around project-based learning. Students learn by creating real applications, exploring their architecture, connecting their components, and understanding the decisions behind their implementation.</p>
              <p>We help learners understand the complete journey of an application:</p>
            </div>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <li className="rounded-xl border border-white/10 bg-white/[.06] p-5"><h3 className="font-semibold text-[#f0d28e]">System Design</h3><p className="mt-2 text-sm leading-6 text-[#d1dbe7]">Translate requirements into architecture, components, and data models.</p></li>
            <li className="rounded-xl border border-white/10 bg-white/[.06] p-5"><h3 className="font-semibold text-[#f0d28e]">Frontend Development</h3><p className="mt-2 text-sm leading-6 text-[#d1dbe7]">Understand pages, components, forms, buttons, events, and user interactions.</p></li>
            <li className="rounded-xl border border-white/10 bg-white/[.06] p-5"><h3 className="font-semibold text-[#f0d28e]">Backend Development</h3><p className="mt-2 text-sm leading-6 text-[#d1dbe7]">Learn server-side logic, business rules, request processing, and application behavior.</p></li>
            <li className="rounded-xl border border-white/10 bg-white/[.06] p-5"><h3 className="font-semibold text-[#f0d28e]">APIs and Integration</h3><p className="mt-2 text-sm leading-6 text-[#d1dbe7]">Follow how a frontend action triggers an API request, how the backend processes it, and how the response returns to the interface.</p></li>
            <li className="rounded-xl border border-white/10 bg-white/[.06] p-5"><h3 className="font-semibold text-[#f0d28e]">Databases</h3><p className="mt-2 text-sm leading-6 text-[#d1dbe7]">Understand data models, queries, relationships, and how applications store and retrieve information.</p></li>
            <li className="rounded-xl border border-white/10 bg-white/[.06] p-5"><h3 className="font-semibold text-[#f0d28e]">Authentication and Authorization</h3><p className="mt-2 text-sm leading-6 text-[#d1dbe7]">Learn how identity is verified and how roles and permissions control access.</p></li>
            <li className="rounded-xl border border-white/10 bg-white/[.06] p-5"><h3 className="font-semibold text-[#f0d28e]">Security and Testing</h3><p className="mt-2 text-sm leading-6 text-[#d1dbe7]">Understand validation, secure coding, error handling, and application testing.</p></li>
            <li className="rounded-xl border border-white/10 bg-white/[.06] p-5"><h3 className="font-semibold text-[#f0d28e]">Debugging and Deployment</h3><p className="mt-2 text-sm leading-6 text-[#d1dbe7]">Learn to trace failures, inspect logs, fix problems, and understand the process of preparing software for production.</p></li>
            <li className="rounded-xl border border-white/10 bg-white/[.06] p-5"><h3 className="font-semibold text-[#f0d28e]">AI-Assisted Development</h3><p className="mt-2 text-sm leading-6 text-[#d1dbe7]">Use AI to accelerate development while reviewing generated code, validating its behavior, and understanding its limitations.</p></li>
          </ul>

          <div className="mt-14 grid gap-8 border-t border-white/15 pt-10 lg:grid-cols-2 lg:gap-14">
            <article>
              <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">Projects You Can Explain with Confidence</h3>
              <p className="mt-4 leading-7 text-[#d1dbe7]">We want students to build more than prototypes they can demonstrate. We want them to understand the applications they create.</p>
              <p className="mt-4 leading-7 text-[#d1dbe7]">Through hands-on projects, learners develop the ability to explain their architecture, describe API communication, investigate errors, improve implementations, and discuss technical decisions.</p>
              <p className="mt-4 leading-7 text-[#d1dbe7]">The goal is to build a portfolio of meaningful projects that students can showcase on their resumes and confidently explain to recruiters and engineering teams.</p>
            </article>
            <article>
              <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">Beyond Interview Preparation</h3>
              <p className="mt-4 leading-7 text-[#d1dbe7]">Programming fundamentals, data structures and algorithms, star patterns, competitive coding, and interview preparation remain important parts of the learning journey.</p>
              <p className="mt-4 leading-7 text-[#d1dbe7]">Lityra brings these foundations together with practical software development so that students can solve problems, build applications, and understand the engineering principles behind them.</p>
            </article>
          </div>

          <article className="mt-10 rounded-2xl border border-[#e2bf71]/35 bg-gradient-to-br from-[#112a48] to-[#10203a] p-6 sm:p-8">
            <span className="text-xs font-bold tracking-[.18em] text-[#e2bf71]">OUR GOAL</span>
            <p className="mt-3 max-w-4xl text-lg leading-8 text-white">Help learners become developers who can use AI effectively without depending on it blindly — developers who can read code, understand systems, debug applications, improve security, and take ownership of the software they build.</p>
          </article>
          <p className="mx-auto mt-9 max-w-4xl text-center leading-7 text-[#d1dbe7]">At Lityra, learning does not stop when the code runs. It continues until you understand why it works, how to improve it, and how to make it more reliable.</p>
          <p className="mt-5 text-center font-display text-xl font-bold leading-relaxed text-[#f0d28e] sm:text-2xl">Lityra — Where learning becomes building, building becomes understanding, and understanding becomes engineering.</p>
        </div>
      </section>
      <footer className="border-t border-slate-100 bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-sm text-slate-400">
          <div className="flex items-center gap-3"><Logo size={72} /><div className="leading-tight"><p className="font-display font-semibold text-ink-900">Lityra Learn</p><p className="text-xs text-slate-500">Write Your Future</p><p className="text-xs text-slate-400">© {new Date().getFullYear()} · All rights reserved.</p></div></div>
          <div className="flex items-center gap-3 text-center sm:text-right"><img src="/brand/genzify-tech-light.png" alt="GenZify" className="h-16 w-16 object-contain rounded-lg" /><p className="text-sm leading-tight text-slate-300">A GenZify product<span className="block font-semibold text-ink-900">GenZify</span><span className="block max-w-xs text-xs">Engineering Human Potential Through Technology</span><a href="https://genzifytech.netlify.app/" target="_blank" rel="noreferrer" className="landing-company-link">Visit company website <ArrowRight size={13} /></a></p></div>
        </div>
      </footer>
    </div>
  );
}
