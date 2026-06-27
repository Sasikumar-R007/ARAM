import { useState, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import realityImg from "@/assets/reality.jpg";
import hopeImg from "@/assets/hope.jpg";
import roadImg from "@/assets/road.jpg";
import aramLogoBg from "@/assets/ARAM Logo.png";
import aramLogoWhite from "@/assets/logo-white.png";
import { Reveal } from "@/components/Reveal";
import { ReportDialog, VolunteerDialog } from "@/components/ActionDialogs";
import { Eye, Smartphone, BellRing, HeartPulse } from "lucide-react";

const CHAPTER_IDS = [
  "top",
  "reality",
  "turning",
  "solution",
  "circulation",
  "impact",
  "manifesto",
  "scenarios",
  "act",
  "act-final",
] as const;

/** Sections on paper/cream backgrounds — floating nav uses ink tones */
const LIGHT_CHAPTERS = new Set<string>([
  "reality",
  "solution",
  "circulation",
  "manifesto",
  "scenarios",
]);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARAM — A Movement for Lives That Cannot Speak" },
      {
        name: "description",
        content:
          "ARAM turns empathy into action. Instantly report animals in distress and connect with volunteers, NGOs, and rescuers.",
      },
      { property: "og:title", content: "ARAM — A Movement for Lives That Cannot Speak" },
      {
        property: "og:description",
        content:
          "ARAM turns empathy into action. Instantly report animals in distress and connect with volunteers, NGOs, and rescuers.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Landing,
});

function Nav({ active }: { active: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ink/85 backdrop-blur-md border-b border-paper/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="group flex items-center gap-3">
          <img
            src={aramLogoBg}
            alt="ARAM"
            width={120}
            height={40}
            className="h-9 w-auto object-contain rounded-[4px] transition group-hover:opacity-90"
          />
          <span className="hidden font-serif text-sm italic text-paper/70 md:block">
            ARAM | அறம்
          </span>
        </a>
        <nav className="hidden items-center gap-10 md:flex">
          {[
            { l: "Reality", h: "#reality" },
            { l: "The Bridge", h: "#solution" },
            { l: "The Circle", h: "#circulation" },
            { l: "Impact", h: "#impact" },
            { l: "Manifesto", h: "#manifesto" },
          ].map((i) => (
            <a
              key={i.h}
              href={i.h}
              className={`text-[0.72rem] uppercase tracking-[0.22em] transition hover:text-gold ${
                active === i.h.slice(1) ? "text-gold font-semibold" : "text-paper/70"
              }`}
            >
              {i.l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <VolunteerDialog
            trigger={
              <button className="hidden md:inline-block rounded-sm border border-paper/30 px-4 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-paper transition hover:border-gold hover:text-gold">
                Volunteer
              </button>
            }
          />
          <ReportDialog
            trigger={
              <button className="btn-interaction rounded-sm bg-gold px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-ink transition hover:bg-gold-soft">
                Report
              </button>
            }
          />
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative isolate min-h-screen overflow-hidden bg-ink">
      <img
        src={heroImg}
        alt="A stray dog beneath a lone streetlamp at dusk on a rain-slick road"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div className="hero-vignette absolute inset-0" />
      <div className="film-grain absolute inset-0" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-6 pt-32 pb-16 md:px-10 md:pt-40 md:pb-20">
        <div className="max-w-3xl">
          <p className="hairline rise-in text-gold" style={{ animationDelay: "0.1s" }}>
            அறம் · A Movement, Not a Product
          </p>
          <h1
            className="rise-in mt-7 font-serif text-[2.1rem] font-light leading-[1.15] text-paper text-balance md:text-[3rem] lg:text-[4rem]"
            style={{ animationDelay: "0.25s" }}
          >
            Somewhere tonight,
            <br />
            <span className="italic text-gold-soft">a life is ending</span>
            <br />
            because no one stopped.
          </h1>
          <p
            className="rise-in mt-8 max-w-xl text-[0.95rem] leading-relaxed text-paper/70 md:text-base"
            style={{ animationDelay: "0.5s" }}
          >
            ARAM is the bridge between the empathy you feel and the action you didn’t know how to
            take. One report. One signal. One life, possibly saved.
          </p>
          <div
            className="rise-in mt-10 flex flex-wrap items-center gap-6"
            style={{ animationDelay: "0.7s" }}
          >
            <ReportDialog
              trigger={
                <button className="btn-interaction group relative inline-flex items-center gap-4 rounded-sm bg-gold px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-ink">
                  Report an Animal
                  <span className="inline-block transition group-hover:translate-x-1">→</span>
                </button>
              }
            />
            <a
              href="#reality"
              className="text-[0.72rem] uppercase tracking-[0.28em] text-paper/70 underline decoration-gold/50 underline-offset-8 transition hover:text-gold"
            >
              Or first, see why
            </a>
          </div>
        </div>

        <div className="rise-in mt-16 flex items-end justify-between gap-8" style={{ animationDelay: "1s" }}>
          <div className="flex items-center gap-3 text-paper/50">
            <span className="h-px w-10 bg-gold" />
            <span className="hairline">Scroll · The journey begins</span>
          </div>
          <div className="hidden font-serif text-sm italic text-paper/40 md:block">
            I
          </div>
        </div>
      </div>
    </section>
  );
}

function Chapter({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-10 flex items-center gap-4 md:mb-14">
      <span className="hairline text-gold">{n}</span>
      <span className="h-px flex-1 bg-foreground/15" />
      <span className="font-serif text-base md:text-lg italic text-foreground/50">{title}</span>
    </div>
  );
}

function Reality() {
  const questions = [
    "When you drove past, what did you tell yourself?",
    "How many minutes between seeing — and forgetting?",
    "If it had been someone you loved, would you have stopped?",
  ];
  return (
    <section id="reality" className="relative bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Chapter n="II" title="The Reality" />
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden shadow-elegant">
              <img
                src={realityImg}
                alt="A small animal lies beside a highway as traffic streaks past at night"
                width={1600}
                height={1100}
                loading="lazy"
                className="h-full w-full object-cover grayscale-[20%] transition duration-[1200ms] hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
              <div className="film-grain absolute inset-0" />
            </div>
            <p className="mt-5 font-serif text-base md:text-lg italic text-foreground/60">
              Most deaths happen quietly — between two passing headlights.
            </p>
          </Reveal>
          <Reveal className="md:col-span-7" delay={120}>
            <h2 className="font-serif text-3xl font-light leading-[1.12] text-ink text-balance md:text-[2.6rem] lg:text-5xl">
              Every day, on roads we drive, in streets we know — a quiet
              <span className="italic text-gold"> emergency </span>
              unfolds without witness.
            </h2>
            <div className="mt-10 space-y-6">
              {questions.map((q) => (
                <div key={q} className="border-l border-gold/60 pl-6">
                  <p className="font-serif text-xl leading-snug text-ink md:text-2xl">
                    {q}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-12 grid grid-cols-3 gap-px bg-foreground/15 shadow-elegant">
              {[
                { n: "5M+", l: "animals killed on Indian roads each year" },
                { n: "< 6%", l: "ever reported to a rescuer" },
                { n: "94%", l: "of bystanders feel helpless to act" },
              ].map((s) => (
                <div key={s.l} className="bg-paper p-5 transition hover:bg-cream">
                  <div className="font-serif text-2xl text-ink md:text-3xl">{s.n}</div>
                  <div className="mt-2 text-[0.72rem] leading-relaxed text-foreground/60">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Turning() {
  return (
    <section id="turning" className="relative overflow-hidden bg-ink py-24 md:py-32">
      <img
        src={roadImg}
        alt=""
        aria-hidden
        width={1920}
        height={1080}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/80 to-ink" />
      <div className="film-grain absolute inset-0 opacity-60" />
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="relative mx-auto max-w-5xl px-6 text-center md:px-10">
        <Reveal>
          <p className="hairline text-gold">Chapter III — The Turning Point</p>
          <h2 className="mt-8 font-serif text-3xl font-light leading-[1.12] text-paper text-balance md:text-5xl lg:text-[3.6rem]">
            <span className="block">You saw it.</span>
            <span className="mt-3 block">You felt it.</span>
            <span className="mt-3 block italic text-gold-soft">
              But you didn’t know what to do.
            </span>
          </h2>
          <p className="mx-auto mt-10 max-w-2xl text-[0.95rem] leading-relaxed text-paper/65 md:text-base">
            The distance between feeling and acting is where most lives are lost. It is not
            indifference — it is fear, uncertainty, and not knowing who to call. Especially
            around accident scenes or animals that seem dangerous, many of us want to help
            but hesitate to approach. ARAM meets you where you are. You do not have to be
            the one who touches the animal. A report from the safety of your car, your
            doorstep, or the sidewalk is still action.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Solution() {
  const steps = [
    { n: "01", t: "See", d: "Notice an animal — hurt, abandoned, hungry, or in danger. From the road, your window, or your daily route.", icon: Eye },
    { n: "02", t: "Report", d: "Open ARAM. Photo, location, and context — even a quick report from inside your car is enough.", icon: Smartphone },
    { n: "03", t: "Alert", d: "Nearby volunteers, NGOs, and caretakers in your area are notified.", icon: BellRing },
    { n: "04", t: "Respond", d: "Someone acts — rescue, feeding, adoption, or connecting the animal to care.", icon: HeartPulse },
  ];
  return (
    <section id="solution" className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Chapter n="IV" title="How ARAM Works" />
        <div className="grid gap-10 md:grid-cols-12 md:items-start md:gap-10">
          <Reveal className="md:col-span-5">
            <h2 className="font-serif text-3xl font-light leading-[1.15] text-ink text-balance md:text-[2.6rem] lg:text-4xl">
              What if empathy had
              <span className="italic text-gold"> infrastructure?</span>
            </h2>
            <p className="mt-4 text-[0.95rem] leading-[1.55] text-foreground/70 md:text-base">
              ARAM is the quiet network beneath the noise — connecting every witness with
              someone who can act. Not every report is an emergency. Not every volunteer
              handles accidents. Together, the circle grows.
            </p>
            <div className="relative mt-6 aspect-[3/2] overflow-hidden rounded-sm shadow-elegant">
              <img
                src={hopeImg}
                alt="A hand reaching toward a stray dog at golden hour — empathy becoming action"
                width={1600}
                height={1100}
                loading="lazy"
                className="h-full w-full object-cover object-[center_35%] transition duration-[1200ms] hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            </div>
          </Reveal>
          <Reveal className="md:col-span-7" delay={120}>
            <ol className="relative">
              {steps.map((s, i) => (
                <li
                  key={s.n}
                  className="group relative grid grid-cols-[auto_1fr] gap-4 border-t border-foreground/15 py-4 md:py-5 transition hover:bg-cream hover:pl-2"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 bg-paper text-gold shadow-sm transition group-hover:bg-gold/10">
                    <s.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <h3 className="flex items-center gap-2 font-serif text-xl text-ink md:text-2xl">
                      <span className="font-sans text-xs text-gold/60">{s.n}</span>
                      {s.t}
                    </h3>
                    <p className="text-sm leading-[1.5] text-foreground/65">{s.d}</p>
                  </div>
                  {i === steps.length - 1 && (
                    <div className="absolute inset-x-0 bottom-0 h-px bg-foreground/15" />
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Circulation() {
  const reportTypes = [
    "Injured or accidented animals",
    "Abandoned puppies on the roadside",
    "Strays that need regular feeding in an area",
    "Animals you notice from your car or daily route",
  ];

  const volunteerWays = [
    "Adopt or foster a puppy in need",
    "Feed animals daily or once a week nearby",
    "Spend a day with an organization like Blue Cross",
    "Arrange shelter, water bowls, or food stations",
    "Help wounded or disabled animals reach a vet",
    "Connect animals with caretakers and NGOs",
  ];

  return (
    <section id="circulation" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Chapter n="V" title="The Circle of Care" />
        <Reveal>
          <div className="grid items-center gap-8 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7">
              <h2 className="font-serif text-3xl font-light leading-[1.1] text-ink text-balance md:text-5xl">
                Not every act of care looks like
                <span className="italic text-gold"> a rescue at the scene.</span>
              </h2>
              <p className="mt-6 text-[0.95rem] leading-relaxed text-foreground/70 md:text-base">
                ARAM is built for people who are willing but afraid — who see suffering and
                freeze at accident sites, who pass dangerous situations and wish someone would
                help. You do not have to approach what frightens you. Your report is still
                courage. Your signal still moves the network.
              </p>
            </div>
            <div className="flex justify-center md:col-span-5 md:justify-start md:pl-2">
              <img
                src={aramLogoBg}
                alt="ARAM"
                width={320}
                height={320}
                loading="lazy"
                className="w-full max-w-[200px] rounded-sm object-contain opacity-90 md:max-w-[240px]"
              />
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px bg-foreground/15 shadow-elegant md:grid-cols-2">
          <Reveal>
            <article className="h-full bg-paper p-8 md:p-10">
              <p className="hairline text-gold">Reports are not only emergencies</p>
              <h3 className="mt-4 font-serif text-2xl font-light text-ink md:text-3xl">
                A sighting is enough to start something.
              </h3>
              <ul className="mt-6 space-y-3">
                {reportTypes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/70">
                    <span className="mt-2 h-px w-4 shrink-0 bg-gold/70" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-l border-gold/60 pl-5 font-serif text-base italic leading-relaxed text-ink/80 md:text-lg">
                You can report while sitting inside your car. A volunteer nearby reads it
                and thinks: &ldquo;There are dogs here that need food — I can feed them once a
                week.&rdquo; Five or six people from the same area may respond, each in their
                own way.
              </p>
            </article>
          </Reveal>
          <Reveal delay={120}>
            <article className="h-full bg-paper p-8 md:p-10">
              <p className="hairline text-gold">Volunteers contribute in many forms</p>
              <h3 className="mt-4 font-serif text-2xl font-light text-ink md:text-3xl">
                You don&apos;t have to handle accidents to belong here.
              </h3>
              <ul className="mt-6 space-y-3">
                {volunteerWays.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/70">
                    <span className="mt-2 h-px w-4 shrink-0 bg-gold/70" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-l border-gold/60 pl-5 font-serif text-base italic leading-relaxed text-ink/80 md:text-lg">
                This is how ARAM circulates — report by report, act by act — until care
                becomes normal in a place that once looked away.
              </p>
            </article>
          </Reveal>
        </div>

        <Reveal delay={180}>
          <div className="mt-14 border-t border-foreground/15 pt-12 text-center">
            <p className="hairline text-gold">The movement</p>
            <p className="mt-4 font-serif text-3xl font-light tracking-wide text-ink md:text-4xl">
              HELPING THE <span className="italic text-gold">VOICELESS</span>
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-foreground/65 md:text-base">
              One person reports. Neighbors respond. Food appears. Adoption happens. A
              wounded animal reaches a caretaker. Hope travels — quietly, steadily, through
              people who chose not to look away.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Impact() {
  const pillars = [
    {
      title: "One sighting",
      body: "A puppy on a road you pass every day. One report marks the spot — and neighbours you have never met begin to respond.",
    },
    {
      title: "One signal",
      body: "From inside your car, without approaching what frightens you. Volunteers who can handle the situation are alerted while you stay safe.",
    },
    {
      title: "One circle",
      body: "Feeding, adoption, shelter, vet care — each person giving what they can, until a place that looked away learns to care.",
    },
  ];

  return (
    <section id="impact" className="relative overflow-hidden bg-ink py-20 md:py-28">
      <div className="film-grain absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-10 flex items-center gap-4 md:mb-14">
          <span className="hairline text-gold">VI</span>
          <span className="h-px flex-1 bg-paper/20" />
          <span className="font-serif text-sm italic text-paper/50">The Living Proof</span>
        </div>
        <Reveal>
          <h2 className="max-w-4xl font-serif text-3xl font-light leading-[1.1] text-paper text-balance md:text-5xl">
            Proof does not always arrive as a number —
            <span className="italic text-gold-soft"> sometimes it is a chain that begins with you.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-paper/55 md:text-base">
            ARAM is in its early days. Before dashboards fill with data, this is what one
            act of conscience can set in motion.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-px bg-paper/15 md:mt-16 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="flex h-full flex-col bg-ink p-7 md:p-9 transition hover:bg-[oklch(0.22_0.008_70)]">
                <p className="font-serif text-2xl font-light italic text-gold-soft md:text-3xl">
                  {p.title}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-paper/65 md:text-base">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 md:gap-5">
            <ReportDialog
              trigger={
                <button className="btn-interaction inline-flex items-center gap-3 rounded-sm bg-gold px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-ink transition hover:bg-gold-soft">
                  Be among the first to report
                  <span>→</span>
                </button>
              }
            />
            <VolunteerDialog
              trigger={
                <button className="btn-interaction inline-flex items-center gap-3 rounded-sm border border-paper/30 px-6 py-3 text-[0.72rem] uppercase tracking-[0.26em] text-paper transition hover:border-gold hover:text-gold">
                  Pledge as a volunteer
                </button>
              }
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section id="manifesto" className="relative bg-paper py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-10">
        <Reveal className="md:col-span-5">
          <div className="sticky top-32">
            <div className="relative aspect-[4/5] overflow-hidden shadow-elegant">
              <img
                src={hopeImg}
                alt="A hand reaches toward a stray dog at golden hour"
                width={1600}
                height={1100}
                loading="lazy"
                className="h-full w-full object-cover transition duration-[1200ms] hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
            </div>
            <p className="mt-5 font-serif text-base md:text-lg italic text-foreground/60">
              The space between two beings — measured not in distance, but in choice.
            </p>
          </div>
        </Reveal>
        <Reveal className="md:col-span-7" delay={120}>
          <Chapter n="VII" title="Human Responsibility" />
          <h2 className="font-serif text-3xl font-light leading-[1.1] text-ink text-balance md:text-5xl">
            This is not about animals.
            <br />
            <span className="italic text-gold">
              It is about who we choose to be
            </span>
            <br />
            when no one is watching.
          </h2>
          <div className="mt-10 space-y-5 font-serif text-lg leading-relaxed text-ink/85 md:text-xl">
            <p>
              The Tamil word{" "}
              <span className="italic text-gold">அறம் — aram</span> — has no single
              translation. It means righteousness. Compassion. The quiet, unshakeable duty
              to do what is right, even when it costs you nothing to walk away.
            </p>
            <p>
              A society is not measured by the strength of its loudest. It is measured by
              the care it extends to the silent — the ones who cannot speak, cannot ask,
              cannot wait.
            </p>
            <p className="border-l border-gold pl-6 text-foreground/75">
              We built ARAM so that empathy never again has to die in traffic.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Scenarios() {
  const cards = [
    {
      n: "Scenario I",
      q: "You drive past abandoned puppies on the same road every day — you want to help but don't know how.",
      a: "One ARAM report marks the spot. Nearby volunteers see it — someone adopts, someone feeds weekly, someone connects with a shelter.",
    },
    {
      n: "Scenario II",
      q: "You see an injured animal by a busy road — your heart breaks, but you're afraid to approach.",
      a: "Report from inside your car. You stay safe. Trained volunteers and NGOs who can handle the situation are alerted.",
    },
    {
      n: "Scenario III",
      q: "You notice dogs in an area that always look hungry — you can't take them all home, but you care.",
      a: "A single report lets five or six neighbors respond: daily feeding, water bowls, pods, or reaching a caretaker.",
    },
  ];
  return (
    <section id="scenarios" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Chapter n="VIII" title="A Quiet Test" />
        <Reveal>
          <h2 className="max-w-3xl font-serif text-3xl font-light leading-[1.1] text-ink text-balance md:text-5xl">
            What would you do
            <span className="italic text-gold"> if you saw…</span>
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-foreground/65 md:text-base">
            Not every moment demands bravery at the scene. Sometimes the bravest thing is
            to report — and let the circle of care do the rest.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-px bg-foreground/15 shadow-elegant md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.n} delay={i * 100}>
              <article
                className="group flex h-full flex-col justify-between gap-8 bg-paper p-8 transition duration-500 hover:bg-ink md:p-9"
              >
                <div>
                  <p className="hairline text-gold">{c.n}</p>
                  <p className="mt-5 font-serif text-xl leading-snug text-ink transition group-hover:text-paper md:text-2xl">
                    {c.q}
                  </p>
                </div>
                <div className="border-t border-foreground/15 pt-5 transition group-hover:border-paper/20">
                  <p className="hairline text-foreground/50 transition group-hover:text-gold">
                    With ARAM
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70 transition group-hover:text-paper/80">
                    {c.a}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Act() {
  return (
    <section id="act" className="relative overflow-hidden bg-ink py-20 md:py-28">
      <div className="film-grain absolute inset-0 opacity-40" />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.74 0.135 78 / 0.12), transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-10 flex items-center gap-4 md:mb-14">
          <span className="hairline text-gold">IX</span>
          <span className="h-px flex-1 bg-paper/20" />
          <span className="font-serif text-sm italic text-paper/50">Take Action</span>
        </div>
        <Reveal>
          <h2 className="max-w-3xl font-serif text-3xl font-light leading-[1.1] text-paper text-balance md:text-5xl">
            Two ways to stand
            <span className="italic text-gold-soft"> for the voiceless.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-paper/60 md:text-base">
            Report what you see — even from a distance. Volunteer in the way that fits
            your life — rescue, feeding, adoption, or simply showing up.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-px md:bg-paper/10 md:shadow-elegant">
          <Reveal>
            <div className="group h-full bg-ink p-8 md:p-10 transition hover:bg-[oklch(0.22_0.008_70)]">
              <p className="hairline text-gold">Module A</p>
              <h3 className="mt-4 font-serif text-2xl font-light text-paper md:text-3xl">
                Report an Animal
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/65">
                Emergencies, abandonments, or animals that need ongoing care in an area —
                your sighting helps the network respond.
              </p>
              <ul className="mt-6 space-y-2 text-[0.78rem] text-paper/55">
                {[
                  "Injured · Abandoned · Needs feeding",
                  "Report from anywhere — even your car",
                  "Launches soon — register interest now",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="h-px w-4 bg-gold/70" />
                    {t}
                  </li>
                ))}
              </ul>
              <ReportDialog
                trigger={
                  <button className="btn-interaction mt-8 inline-flex items-center gap-3 bg-gold px-6 py-3 text-[0.72rem] uppercase tracking-[0.26em] text-ink transition hover:bg-gold-soft">
                    Open Report
                    <span>→</span>
                  </button>
                }
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="group h-full bg-ink p-8 md:p-10 transition hover:bg-[oklch(0.22_0.008_70)]">
              <p className="hairline text-gold">Module B</p>
              <h3 className="mt-4 font-serif text-2xl font-light text-paper md:text-3xl">
                Become a Volunteer
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/65">
                You don&apos;t have to handle accidents. Feed nearby strays, adopt, arrange
                water and shelter, or connect animals to caretakers — every act counts.
              </p>
              <ul className="mt-6 space-y-2 text-[0.78rem] text-paper/55">
                {[
                  "Feed daily or weekly in your area",
                  "Adopt, foster, or join NGOs like Blue Cross",
                  "Help wounded animals reach vets & caretakers",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="h-px w-4 bg-gold/70" />
                    {t}
                  </li>
                ))}
              </ul>
              <VolunteerDialog
                trigger={
                  <button className="btn-interaction mt-8 inline-flex items-center gap-3 border border-paper/30 px-6 py-3 text-[0.72rem] uppercase tracking-[0.26em] text-paper transition hover:border-gold hover:text-gold">
                    Join as Volunteer
                    <span>→</span>
                  </button>
                }
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="act-final" className="relative overflow-hidden bg-ink py-24 md:py-36">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] opacity-[0.08] blur-[40px] pointer-events-none select-none z-0 mix-blend-screen">
        <img src={aramLogoWhite} alt="" className="w-full h-auto" />
      </div>
      <div className="film-grain absolute inset-0 opacity-60 z-0" />
      <div
        className="pointer-events-none absolute inset-0 opacity-50 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.74 0.135 78 / 0.18), transparent 60%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center md:px-10">
        <Reveal>
          <p className="hairline text-gold">X — Your Move</p>
          <h2 className="mt-8 font-serif text-4xl font-light leading-[1.05] text-paper text-balance md:text-6xl lg:text-7xl">
            Be the reason
            <br />
            <span className="italic text-gold-soft">a life is saved.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-[0.95rem] leading-relaxed text-paper/70 md:text-base">
            You don&apos;t need to be fearless. You don&apos;t need to do everything alone.
            Report what you see — or volunteer in the way that fits you — and let ARAM
            circulate hope to the voiceless.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <ReportDialog
              trigger={
                <button className="btn-interaction inline-flex items-center gap-4 bg-gold px-9 py-4 text-[0.74rem] uppercase tracking-[0.28em] text-ink transition hover:bg-gold-soft">
                  Report an Animal Now
                  <span>→</span>
                </button>
              }
            />
            <VolunteerDialog
              trigger={
                <button className="btn-interaction border border-paper/30 px-9 py-4 text-[0.74rem] uppercase tracking-[0.28em] text-paper transition hover:border-gold hover:text-gold">
                  Become a Volunteer
                </button>
              }
            />
          </div>
          <p className="mt-14 font-serif text-base italic text-paper/45">
            “The measure of a civilization is how it treats its weakest members.” — Mahatma Gandhi
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <img
              src={aramLogoBg}
              alt="ARAM"
              width={120}
              height={40}
              loading="lazy"
              className="h-10 w-auto object-contain rounded-[4px]"
            />
            <div className="font-serif text-sm md:text-base italic text-paper/60">
              அறம் · righteousness in action
            </div>
          </div>
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-paper/55">
            © {new Date().getFullYear()} ARAM Movement · Built with conscience
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-6 border-t border-paper/10 pt-10 pb-4">
          <div className="font-serif text-[3rem] md:text-[4rem] tracking-widest text-paper/10 leading-none select-none pointer-events-none flex flex-col items-center">
            ARAM
            <span className="text-[0.6rem] md:text-[0.7rem] font-sans tracking-[0.4em] uppercase mt-1">For the Voiceless</span>
          </div>
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-paper/45 flex items-center gap-2 mt-4">
            A project by
            <a href="https://www.symphonixtech.in" target="_blank" rel="noopener noreferrer" className="text-paper/70 font-sans tracking-[0.15em] text-sm hover:text-gold transition-colors ml-1">
              SYMPHØNIX
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/** Which section sits behind a fixed screen point (used per nav bubble). */
function sectionBehindY(y: number): string | null {
  for (const id of CHAPTER_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (y >= rect.top && y <= rect.bottom) return id;
  }
  return null;
}

function FloatingNav({ active }: { active: string }) {
  const navRef = useRef<HTMLElement>(null);
  const [bubbleLight, setBubbleLight] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const syncBubbleThemes = () => {
      const nav = navRef.current;
      if (!nav) return;

      const next: Record<string, boolean> = {};
      nav.querySelectorAll<HTMLAnchorElement>("a[data-chapter]").forEach((link) => {
        const id = link.dataset.chapter;
        if (!id) return;
        const rect = link.getBoundingClientRect();
        const y = rect.top + rect.height / 2;
        const behind = sectionBehindY(y);
        next[id] = LIGHT_CHAPTERS.has(behind ?? id);
      });

      setBubbleLight(next);
    };

    window.addEventListener("scroll", syncBubbleThemes, { passive: true });
    window.addEventListener("resize", syncBubbleThemes);
    syncBubbleThemes();
    return () => {
      window.removeEventListener("scroll", syncBubbleThemes);
      window.removeEventListener("resize", syncBubbleThemes);
    };
  }, []);

  const chapters = CHAPTER_IDS.map((id, i) => ({
    id,
    roman: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][i],
  }));

  return (
    <nav
      ref={navRef}
      aria-label="Chapter navigation"
      className="fixed left-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-5 xl:flex md:left-12"
    >
      {chapters.map((c) => {
        const isActive = active === c.id;
        const onLight = bubbleLight[c.id] ?? LIGHT_CHAPTERS.has(c.id);
        const inactiveCls = onLight
          ? "border-foreground/25 text-foreground/45 hover:border-foreground/50 hover:text-foreground/75"
          : "border-paper/30 text-paper/50 hover:border-paper/60 hover:text-paper/80";

        return (
          <a
            key={c.id}
            href={`#${c.id}`}
            data-chapter={c.id}
            aria-current={isActive ? "true" : undefined}
            className={`flex h-8 w-8 items-center justify-center rounded-full border font-serif text-[0.6rem] transition-colors duration-300 ${
              isActive ? "border-gold bg-gold text-ink" : inactiveCls
            }`}
          >
            {c.roman}
          </a>
        );
      })}
    </nav>
  );
}

function Landing() {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const syncActiveChapter = () => {
      const viewportCenter = window.innerHeight * 0.42;
      let closestId: (typeof CHAPTER_IDS)[number] = "top";
      let closestDistance = Infinity;

      for (const id of CHAPTER_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = id;
        }
      }

      setActive(closestId);
    };

    window.addEventListener("scroll", syncActiveChapter, { passive: true });
    window.addEventListener("resize", syncActiveChapter);
    syncActiveChapter();
    return () => {
      window.removeEventListener("scroll", syncActiveChapter);
      window.removeEventListener("resize", syncActiveChapter);
    };
  }, []);

  return (
    <main className="bg-paper text-ink relative">
      <Nav active={active} />
      <FloatingNav active={active} />
      <Hero />
      <Reality />
      <Turning />
      <Solution />
      <Circulation />
      <Impact />
      <Manifesto />
      <Scenarios />
      <Act />
      <FinalCTA />
      <Footer />
    </main>
  );
}