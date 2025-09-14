import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Clock,
  GraduationCap,
  Layers,
  Laptop,
  Users2,
  Target,
  Sparkles,
  BookOpen,
  Building2,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Code,
} from "lucide-react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function DevKoderSite() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

 const handleSubmit = async (
   e: React.FormEvent<HTMLFormElement>
 ): Promise<void> => {
   e.preventDefault();
   if (!form.name || !form.email) {
     setError("Please fill your name & email");
     return;
   }

   setLoading(true);
   setError(null);
   setSubmitted(false);

   try {
     const res = await fetch(`${API_URL}/applications`, {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(form),
     });

     if (!res.ok) {
       let message = "Submit failed";
       let isDuplicate = false;
       try {
         const data = (await res.json()) as { message?: string };
         if (data?.message) message = data.message;
         if (res.status === 409 || /duplicate|E11000/i.test(message)) {
           isDuplicate = true;
         }
       } catch {
         /* ignore JSON parse errors */
       }

       setError(
         isDuplicate
           ? "You’ve already submitted an application with this email or phone."
           : message
       );
       return;
     }

     // success
     setSubmitted(true);
     setForm({ name: "", email: "", phone: "", message: "" });
     setTimeout(() => setSubmitted(false), 4000);
   } catch (err: unknown) {
     const message =
       err instanceof Error ? err.message : "Something went wrong";
     setError(message);
   } finally {
     setLoading(false);
   }
 };




  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  } as const;
  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 },
  } as const;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200/60">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <a href="#" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-slate-900 grid place-items-center text-white shadow-sm">
              <Code size={18} />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Dev<span className="text-slate-500">Koder</span>
            </span>
          </a>
          <ul className="hidden md:flex items-center gap-6 text-sm">
            <li>
              <a href="#program" className="hover:text-slate-600">
                Program
              </a>
            </li>
            <li>
              <a href="#curriculum" className="hover:text-slate-600">
                Curriculum
              </a>
            </li>
            <li>
              <a href="#internship" className="hover:text-slate-600">
                Internship
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-slate-600">
                FAQ
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-slate-600">
                Contact
              </a>
            </li>
          </ul>
          <div className=" md:block">
            <Button asChild className="rounded-xl">
              <a href="#apply">Apply Now</a>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[80%] rounded-full bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 blur-3xl opacity-60" />
        </div>
        <div className="mx-auto max-w-7xl px-4 pt-8 pb-8 md:pt-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge
              className="mb-4 rounded-full px-4 py-1 text-xs"
              variant="secondary"
            >
              New Cohort Starts Monthly
            </Badge>
            <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
              Become a{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Web Developer
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600 md:text-lg">
              2-month intensive Web Dev program + 1-month industry internship at
              DevKoder. Build projects, master modern tools, and launch your
              career.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild className="rounded-xl px-6">
                <a href="#apply" className="flex items-center gap-2">
                  Apply Now <ArrowRight size={16} />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="rounded-xl"
              >
                <a href="#curriculum">View Curriculum</a>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  icon: <Clock className="h-5 w-5" />,
                  label: "2 Months Training",
                },
                {
                  icon: <Building2 className="h-5 w-5" />,
                  label: "1 Month Internship",
                },
                {
                  icon: <Laptop className="h-5 w-5" />,
                  label: "Project-Based",
                },
                {
                  icon: <ShieldCheck className="h-5 w-5" />,
                  label: "Job-Prep Support",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center gap-2 rounded-xl border bg-white p-3 text-sm shadow-sm"
                >
                  <span className="text-slate-700">{f.icon}</span>
                  <span className="font-medium text-slate-700">{f.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why DevKoder */}
      <section id="program" className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Why choose DevKoder?
          </h2>
          <p className="mt-3 text-slate-600">
            Learn by building — with mentorship, reviews, and modern tooling
            that mirrors real teams.
          </p>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[
            {
              icon: <Layers />,
              title: "Modern Stack",
              desc: "HTML5, CSS3, JavaScript, BootStrap, Git,and React basics.",
            },
            {
              icon: <Users2 />,
              title: "Mentor Support",
              desc: "Weekly code reviews, pair-programming, and Discord support.",
            },
            {
              icon: <Target />,
              title: "Career Prep",
              desc: "Interview practice, portfolios, and guidance to land your first role.",
            },
          ].map((c, i) => (
            <motion.div variants={item} key={i}>
              <Card className="rounded-2xl border-slate-200/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <span className="rounded-xl bg-slate-900/90 p-2 text-white shadow-sm">
                      {c.icon}
                    </span>
                    {c.title}
                  </CardTitle>
                  <CardDescription className="pt-1 text-slate-600">
                    {c.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Program Structure */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold md:text-3xl">
              Program Structure
            </h3>
            <p className="mt-3 text-slate-600">
              An end-to-end journey from zero to shipping production-grade apps.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-600" />
                <div>
                  <p className="font-semibold">2-Month Intensive Web Dev</p>
                  <p className="text-sm text-slate-600">
                    Hands-on modules, challenges, and capstone projects with
                    code reviews.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-600" />
                <div>
                  <p className="font-semibold">1-Month On-site Internship</p>
                  <p className="text-sm text-slate-600">
                    Join DevKoder squads, contribute to real features, and
                    follow agile rituals.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-600" />
                <div>
                  <p className="font-semibold">Career Services</p>
                  <p className="text-sm text-slate-600">
                    Portfolio review, resume polish, mock interviews, and job
                    referrals.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <Card
            id="curriculum"
            className="rounded-2xl border-slate-200/60 shadow-sm"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" /> 8-Week Curriculum
              </CardTitle>
              <CardDescription>
                Compact, rigorous, and practical.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                {
                  w: "Week 1",
                  t: "HTML Foundations",
                  d: "Clean semantics, solid structure, accessible content.",
                },
                {
                  w: "Week 2",
                  t: "Core CSS",
                  d: "Master selectors & the box model.",
                },
                {
                  w: "Week 3",
                  t: "Layouts & Responsive CSS",
                  d: "Modern layouts + media queries.",
                },
                {
                  w: "Week 4",
                  t: "Bootstrap 5 Deep Dive",
                  d: "Ship fast with components & utilities.",
                },
                {
                  w: "Week 5",
                  t: "JavaScript Core",
                  d: "Fundamentals that power the UI.",
                },
                {
                  w: "Week 6",
                  t: "DOM, Events, and Forms",
                  d: "Manipulate the page confidently.",
                },
                {
                  w: "Week 7",
                  t: "Async JS & Bootstrap Integration",
                  d: "Fetch data and build dynamic UIs.",
                },
                {
                  w: "Week 8",
                  t: "Project + React fundamentals",
                  d: "Create project & react fundamentals.",
                },
              ].map((w, i) => (
                <div key={i} className="rounded-xl border bg-white p-4">
                  <p className="text-xs font-medium text-slate-500">{w.w}</p>
                  <p className="mt-1 font-semibold">{w.t}</p>
                  <p className="text-sm text-slate-600">{w.d}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Internship */}
      <section
        id="internship"
        className="mx-auto max-w-7xl px-4 py-12 md:py-16"
      >
        <div className="grid items-stretch gap-8 md:grid-cols-2">
          <Card className="rounded-2xl border-slate-200/60 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" /> 1-Month Internship
              </CardTitle>
              <CardDescription>
                Real team. Real code. Real impact.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    t: "Onboarding & UI Foundations",
                    d: "join the workflow, ship small UI changes safely.",
                  },
                  {
                    t: "Feature Sprint (Frontend + Bootstrap)",
                    d: "deliver a user-visible feature end-to-end.",
                  },
                  {
                    t: "Hardening: Performance, A11y, QA",
                    d: "make your feature robust and fast.",
                  },
                  {
                    t: "Integration, Release & Handoff",
                    d: "integrate, document, and ship.",
                  },
                ].map((b, i) => (
                  <div key={i} className="rounded-xl border bg-white p-4">
                    <p className="font-semibold">{b.t}</p>
                    <p className="text-sm text-slate-600">{b.d}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold md:text-3xl">
              Graduate with confidence
            </h3>
            <p className="mt-3 text-slate-600">
              You’ll exit with a shipped capstone, live internship experience,
              and a portfolio that proves practical ability.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge variant="secondary" className="rounded-full">
                Certificate of Completion
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                Letter of Internship
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                Placement Support
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Callouts */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: <GraduationCap />,
              h: "Beginner-Friendly",
              p: "No CS degree required — just grit and curiosity.",
            },
            {
              icon: <Sparkles />,
              h: "Build a Portfolio",
              p: "Three projects + a capstone you can showcase.",
            },
            {
              icon: <Mail />,
              h: "Mentor Feedback",
              p: "Get actionable reviews on your code and UI/UX.",
            },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="mb-3 inline-flex rounded-xl bg-slate-900/90 p-2 text-white shadow-sm">
                {s.icon}
              </div>
              <h4 className="text-lg font-semibold">{s.h}</h4>
              <p className="text-sm text-slate-600">{s.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold md:text-3xl">
              Apply for the next cohort
            </h3>
            <p className="mt-3 text-slate-600">
              Seats are limited. We review applications on a rolling basis.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-1 h-4 w-4" /> Weekly evening and
                weekend options available.
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-1 h-4 w-4" /> OnSite learning — attend
                on-site in Rahimyarkhan.
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-1 h-4 w-4" /> Scholarships available
                for dedicated learners.
              </li>
            </ul>
          </div>

          <Card className="rounded-2xl border-slate-200/60 shadow-sm">
            <CardHeader>
              <CardTitle>Quick Application</CardTitle>
              <CardDescription>
                We’ll get back within 24–48 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Full Name
                  </label>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Phone
                  </label>
                  <Input
                    name="phone"
                    placeholder="03xx-xxxxxxx"
                    value={form.phone}
                    onChange={handleChange}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Message (optional)
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your goals"
                    value={form.message}
                    onChange={handleChange}
                    className="rounded-xl"
                    rows={3}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-xl"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting…
                    </span>
                  ) : (
                    "Submit Application"
                  )}
                </Button>

                {error && (
                  <p className="text-center text-sm text-rose-600">{error}</p>
                )}
                {submitted && !error && (
                  <p className="text-center text-sm text-emerald-600">
                    Thanks! Your application has been received.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h3 className="text-2xl font-bold md:text-3xl">
            Frequently Asked Questions
          </h3>
          <div className="mt-6 divide-y rounded-2xl border bg-white">
            {[
              {
                q: "Do I need prior coding experience?",
                a: "No. We start from fundamentals and move quickly into projects. Basic computer literacy helps.",
              },
              {
                q: "Is the internship guaranteed?",
                a: "Yes — the 1-month internship is part of the program at DevKoder. Performance may extend your internship or convert it to a junior role.",
              },
              {
                q: "What is the weekly time commitment?",
                a: "Plan 12–15 hours weekly: sessions, self-study, and project work.",
              },
              {
                q: "How are classes delivered?",
                a: "on-site 2 hours Session.",
              },
            ].map((f, i) => (
              <details key={i} className="group p-5">
                <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-medium">
                  {f.q}
                  <span className="ml-4 text-slate-400 transition-transform group-open:rotate-180">
                    ▾
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-4 pb-16">
        <Card className="rounded-2xl border-slate-200/60 shadow-sm">
          <CardContent className="grid gap-6 p-6 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-slate-900/90 p-2 text-white">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <a href="mailto:hello@devkoder.com" className="font-medium">
                  hello@devkoder.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-slate-900/90 p-2 text-white">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <a href="tel:+923001234567" className="font-medium">
                  +92 370 4250008
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-slate-900/90 p-2 text-white">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Location</p>
                <p className="font-medium">
                  St#3, Muslim Bazar, RahimYarKhan, Pakistan
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 md:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} DevKoder — All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <a href="#program" className="hover:text-slate-700">
              Program
            </a>
            <a href="#apply" className="hover:text-slate-700">
              Apply
            </a>
            <a href="#contact" className="hover:text-slate-700">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
