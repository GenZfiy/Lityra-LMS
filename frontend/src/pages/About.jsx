import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Eye, Heart, Lightbulb, Sparkles, Target, Users, Zap } from "lucide-react";
import { Logo } from "../components/ui/Logo.jsx";
const companyValues = [
  { icon: Zap, title: "Innovation first", body: "We build with new technology to solve meaningful problems and create lasting value." },
  { icon: Heart, title: "Human centred", body: "Learning and assessment should help people grow. People stay at the centre of our product decisions." },
  { icon: Users, title: "Global by design", body: "We aim to build useful technology for different languages, cultures and communities." },
  { icon: Target, title: "Outcomes over outputs", body: "We focus on skills people can demonstrate and decisions teams can make with confidence." },
  { icon: Eye, title: "Radical transparency", body: "We value clear, honest communication with the people and organizations we work with." },
  { icon: Lightbulb, title: "Long-term thinking", body: "We build toward durable human progress, not only short-term activity." },
];

const productAnswers = [
  { label: "Why", title: "Learning should lead to confident growth", body: "People deserve clear, engaging ways to build knowledge, practice new skills and understand their progress. Lityra Learn brings those parts of learning into one focused workspace." },
  { label: "What", title: "A workspace for learning and skill development", body: "Lityra Learn supports structured courses, coding practice, adaptive drills, assessments, AI-guided study and skill credentials." },
  { label: "When", title: "Whenever someone is ready to learn", body: "Use Lityra to build foundations, practice consistently, prepare for assessments and keep developing skills over time." },
  { label: "For whom", title: "Learners, educators and institutions", body: "Learners build skills and track progress. Educators organize curriculum and support classes. Institutions manage programs and understand learning outcomes." },
];

const leadership = [
  { initials: "SS", photo: "/team/sameer.webp", name: "Sameer Shaik", role: "Founder & CEO, CFO", background: "Founding Team", expertise: ["Product Strategy", "AI Platforms", "Finance"] },
  { initials: "SG", photo: "https://avatars.githubusercontent.com/u/174678147?v=4", name: "Sashipreetham G", role: "Co-founder & CTO, CIO", background: "Founding Team", expertise: ["Engineering", "AI Systems", "Cloud Architecture"] },
  { initials: "BK", photo: "https://avatars.githubusercontent.com/u/168163179?v=4", name: "Babu Kothacharuvu Shaik", role: "CSO, COO & CRO", background: "Founding Team", expertise: ["Sales Strategy", "Operations", "Revenue Growth"] },
];

const advisors = [
  { initials: "BK", photo: "/team/bharathi.webp", name: "Bharathi K", role: "Advisory Committee", background: "SDE 1, Pragma Edge Software Services", location: "Jubilee Hills, Hyderabad", expertise: ["Software Engineering", "Full Stack Development"] },
  { initials: "LP", photo: "/team/priya.webp", name: "Lakshmi Priya K", role: "Advisory Committee", background: "Research Scholar", location: "Cyber Security", expertise: ["Cyber Security", "Research"] },
  { initials: "HT", photo: "/team/haseen.webp", name: "Haseen Taj S", role: "Advisory Committee", background: "Research Scholar", location: "Artificial Intelligence & Machine Learning", expertise: ["AI / ML", "Research"] },
];

function PeopleGrid({ people }) {
  return <div className="about-people-grid">{people.map((person, index) => <motion.article key={person.name} className="about-person-card" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .4, delay: index * .06 }}>
    <div className="about-person-photo"><span className="about-person-monogram" aria-hidden="true">{person.initials}</span><img src={person.photo} alt={`${person.name} portrait`} loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></div>
    <h3>{person.name}</h3><span className="about-person-role">{person.role}</span>
    <p>{person.background}</p><p>{person.location}</p>
    <div className="about-person-expertise">{person.expertise.map((item) => <span key={item}>{item}</span>)}</div>
  </motion.article>)}</div>;
}

export default function About() {
  return (
    <main className="about-page min-h-screen">
      <header className="about-nav">
        <Link to="/" className="about-brand" aria-label="Lityra home"><Logo size={44} /><span><strong>Lityra</strong><small>Write Your Future</small></span></Link>
        <nav aria-label="About navigation">
          <Link to="/">Home</Link>
          <a href="https://genzifytech.netlify.app/" target="_blank" rel="noreferrer">GenZify website <ArrowRight size={15} /></a>
          <Link className="about-nav-cta" to="/learn/register">Get started</Link>
        </nav>
      </header>

      <section className="about-hero">
        <div className="about-hero-orbit" aria-hidden="true"><span /><i /><b /></div>
        <motion.div className="about-hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
          <span className="about-eyebrow"><Sparkles size={15} /> ABOUT LITYRA &amp; GENZIFY</span>
          <h1>Technology should help people <em>move forward.</em></h1>
          <p>Lityra Learn helps people build knowledge, practice useful skills and see their progress. It is a product by GenZify, built around a simple idea: engineering should expand human potential.</p>
          <div className="about-hero-actions"><Link to="/" className="about-back"><ArrowLeft size={16} /> Back to Lityra</Link><a className="about-company-link" href="https://genzifytech.netlify.app/" target="_blank" rel="noreferrer">Visit GenZify <ArrowRight size={16} /></a></div>
        </motion.div>
      </section>

      <section className="about-product-section">
        <div className="about-section-heading"><span className="about-eyebrow">THE PRODUCT</span><h2>A more engaging way to learn and grow.</h2><p>Four questions explain what Lityra Learn is for and who it serves.</p></div>
        <div className="about-answer-grid">{productAnswers.map((item, i) => <motion.article key={item.label} className="about-answer-card" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .4, delay: i * .06 }}><span className="about-answer-label">{item.label}</span><h3>{item.title}</h3><p>{item.body}</p></motion.article>)}</div>
        <div className="about-workspaces"><article><BookOpen size={21} /><div><h3>Lityra Learn</h3><p>Courses, lessons, coding practice, assessments and a record of demonstrated skills.</p></div></article></div>
      </section>

      <section className="about-company-section">
        <div className="about-company-intro"><span className="about-eyebrow">THE COMPANY BEHIND THE PRODUCT</span><h2>GenZify</h2><p className="about-company-tagline">Engineering Human Potential Through Technology</p><p>GenZify builds technology products to solve meaningful problems. Lityra Learn is part of that mission: a focused platform for learning, skill development and educational progress.</p><div className="about-origin-note"><span>OUR BEGINNING</span><p>GenZify began with a goal to build purposeful, AI-powered software for real problems. Lityra Learn carries that mission into classrooms and independent study, supporting learners and educators as they grow.</p></div><a href="https://genzifytech.netlify.app/" target="_blank" rel="noreferrer">Explore the GenZify website <ArrowRight size={16} /></a></div>
        <div className="about-mission-vision"><article><Target size={20} /><span>OUR MISSION</span><h3>Build technology that solves real problems</h3><p>We combine thoughtful engineering with applied AI to create products that are useful to the people and organizations who use them.</p></article><article><Eye size={20} /><span>OUR VISION</span><h3>Make useful technology work for more people</h3><p>We want capable, well-built tools to be within reach of the people who can benefit from them, and we build toward that future one product at a time.</p></article></div>
      </section>

      <section className="about-people-section">
        <div className="about-section-heading"><span className="about-eyebrow">THE PEOPLE</span><h2>Builders and advisors behind GenZify.</h2><p>A team bringing together product strategy, engineering, operations and research.</p></div>
        <h3 className="about-people-heading">Leadership</h3><PeopleGrid people={leadership} />
        <h3 className="about-people-heading about-advisors-heading">Advisory committee</h3><PeopleGrid people={advisors} />
      </section>

      <section className="about-values-section"><div className="about-section-heading"><span className="about-eyebrow">HOW WE BUILD</span><h2>Principles behind the product.</h2></div><div className="about-values-grid">{companyValues.map(({ icon: Icon, title, body }) => <article key={title}><Icon size={19} /><h3>{title}</h3><p>{body}</p></article>)}</div></section>


      <section aria-labelledby="learning-philosophy-title" className="relative overflow-hidden bg-[#0a1a30] px-5 py-16 text-white sm:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -left-28 top-12 h-80 w-80 rounded-full bg-[#1f6da5]/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-[.18em] text-[#e2bf71]">OUR LEARNING PHILOSOPHY</span>
            <h2 id="learning-philosophy-title" className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">From Vibe Coding to Engineering Confidence</h2>
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

      <section className="about-founder-note" aria-labelledby="founder-note-title">
        <div className="about-founder-note-inner">
          <span className="about-founder-kicker"><Heart size={14} fill="currentColor" /> A NOTE FROM THE FOUNDER</span>
          <h2 id="founder-note-title">She has been my home, my peace,<br className="hidden sm:block" /> my paradise, and my heaven.</h2>
          <p className="about-founder-lead">Behind every builder is someone who believed first — long before the world did.</p>
          <p>This platform, and everything that led to it, would not exist without the unwavering care, love, and constant support of my sister, <strong>Likhitha Rani P.</strong> Through every challenge, every sleepless night, and every moment of doubt, she stood beside me — not just as family, but as my anchor, my strength, and my greatest source of inspiration.</p>
          <p>Her presence alone has always been enough to keep going.</p>
          <svg className="about-founder-flourish" viewBox="0 0 220 28" role="img" aria-label="Decorative signature flourish"><path d="M4 19c28-1 32-12 47-12 15 0 14 17 29 17 12 0 12-18 27-18 9 0 10 9 19 9 10 0 14-10 22-10 8 0 9 10 19 10 9 0 16-7 28-7 7 0 13 3 21 3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="110" cy="6" r="2" fill="currentColor" /></svg>
          <span className="about-founder-signoff">With deepest gratitude,</span>
          <p className="about-founder-signature">Shaik Sameer</p>
          <p className="about-founder-nickname">— your lil one 👻</p>
          <p className="about-founder-role">Founder &amp; CEO · CFO, GenZify</p>
        </div>
      </section>
      <footer className="about-footer"><Link to="/" className="about-brand"><Logo size={38} /><span><strong>Lityra</strong><small>Write Your Future</small></span></Link><span>A GenZify product</span><a href="https://genzifytech.netlify.app/" target="_blank" rel="noreferrer">GenZify · Engineering Human Potential Through Technology <ArrowRight size={14} /></a></footer>
    </main>
  );
}
