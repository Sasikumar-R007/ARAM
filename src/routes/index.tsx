import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import realityImg from "@/assets/reality.jpg";
import hopeImg from "@/assets/hope.jpg";
import careImg from "@/assets/care.jpg";
import roadImg from "@/assets/road.jpg";
import aramLogo from "@/assets/aram-logo.png.asset.json";
import symphonixLogo from "@/assets/symphonix-logo.jpg.asset.json";
import { Reveal } from "@/components/Reveal";
import { ReportDialog, VolunteerDialog } from "@/components/ActionDialogs";

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

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 md:py-5 backdrop-blur-sm">
        <a href="#top" className="group flex items-center gap-3">
          <img
            src={aramLogo.url}
            alt="ARAM"
            width={40}
            height={40}
            className="h-9 w-9 object-contain invert brightness-0 contrast-100"
            style={{ filter: "invert(1) brightness(1.6)" }}
          />
          <span className="font-serif text-xl tracking-[0.22em] text-paper">
            ARAM
          </span>
          <span className="hidden h-4 w-px bg-paper/25 md:block" />
          <span className="hidden font-serif text-xs italic text-paper/55 md:block">
            அறம்
          </span>
        </a>
        <nav className="hidden items-center gap-10 md:flex">
          {[
            { l: "Reality", h: "#reality" },
            { l: "The Bridge", h: "#solution" },
            { l: "Impact", h: "#impact" },
            { l: "Manifesto", h: "#manifesto" },
          ].map((i) => (
            <a
              key={i.h}
              href={i.h}
              className="text-[0.72rem] uppercase tracking-[0.22em] text-paper/70 transition hover:text-gold"
            >
              {i.l}
            </a>
          ))}
        </nav>
        <ReportDialog
          trigger={
            <button className="rounded-none border border-gold/70 px-4 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-gold transition hover:bg-gold hover:text-ink">
              Report
            </button>
          }
        />
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
            className="rise-in mt-7 font-serif text-[2.1rem] font-light leading-[1.08] text-paper text-balance md:text-[3.6rem] lg:text-[4.6rem]"
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
                <button className="glow-pulse group relative inline-flex items-center gap-4 bg-gold px-7 py-3.5 text-[0.72rem] uppercase tracking-[0.28em] text-ink transition hover:bg-gold-soft hover:-translate-y-0.5">
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
            Chapter I — Awareness
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
      <span className="font-serif text-sm italic text-foreground/50">{title}</span>
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
            <p className="mt-4 font-serif text-sm italic text-foreground/55">
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
    <section className="relative overflow-hidden bg-ink py-24 md:py-32">
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
            indifference. It is the absence of a hand to reach for. ARAM is that hand.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Solution() {
  const steps = [
    { n: "01", t: "See", d: "Notice an animal hurt, lost, or in danger — anywhere." },
    { n: "02", t: "Report", d: "Open ARAM. One tap. Photo, location, condition." },
    { n: "03", t: "Alert", d: "Nearby volunteers, NGOs, and vets are notified instantly." },
    { n: "04", t: "Rescue", d: "Someone responds. The chain of empathy completes." },
  ];
  return (
    <section id="solution" className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Chapter n="IV" title="The Bridge" />
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <h2 className="font-serif text-3xl font-light leading-[1.1] text-ink text-balance md:text-[2.6rem] lg:text-5xl">
              What if empathy had
              <span className="italic text-gold"> infrastructure?</span>
            </h2>
            <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-foreground/70 md:text-base">
              ARAM is the quiet network beneath the noise — connecting every witness with
              someone who can act. No paperwork. No phone trees. Just signal, then response.
            </p>
            <div className="mt-8 hidden md:block relative aspect-[4/3] overflow-hidden shadow-elegant">
              <img
                src={careImg}
                alt="A pair of hands cradling an injured puppy in warm lamplight"
                width={1280}
                height={960}
                loading="lazy"
                className="h-full w-full object-cover transition duration-[1200ms] hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            </div>
          </Reveal>
          <Reveal className="md:col-span-7" delay={120}>
            <ol className="relative">
              {steps.map((s, i) => (
                <li
                  key={s.n}
                  className="group relative grid grid-cols-[auto_1fr] gap-8 border-t border-foreground/15 py-6 md:py-7 transition hover:bg-cream hover:pl-3"
                >
                  <div className="font-serif text-lg text-gold">{s.n}</div>
                  <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-12">
                    <h3 className="font-serif text-2xl text-ink md:text-3xl">{s.t}</h3>
                    <p className="max-w-md text-sm leading-relaxed text-foreground/65">
                      {s.d}
                    </p>
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

function Impact() {
  const stats = [
    { n: "12,480", l: "Reports raised" },
    { n: "8,921", l: "Lives reached in time" },
    { n: "2,340", l: "Volunteers on the ground" },
    { n: "187", l: "Partner NGOs & vets" },
  ];
  return (
    <section id="impact" className="relative overflow-hidden bg-ink py-20 md:py-28">
      <div className="film-grain absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-10 flex items-center gap-4 md:mb-14">
          <span className="hairline text-gold">V</span>
          <span className="h-px flex-1 bg-paper/20" />
          <span className="font-serif text-sm italic text-paper/50">The Living Proof</span>
        </div>
        <Reveal>
          <h2 className="max-w-4xl font-serif text-3xl font-light leading-[1.1] text-paper text-balance md:text-5xl">
            Numbers, but each one was once a heartbeat —
            <span className="italic text-gold-soft"> someone’s reason to keep going.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-px bg-paper/15 md:mt-16 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 80}>
              <div className="bg-ink p-7 md:p-9 transition hover:bg-[oklch(0.22_0.008_70)]">
                <div className="font-serif text-4xl font-light text-paper md:text-5xl">
                  {s.n}
                </div>
                <div className="mt-3 text-[0.7rem] uppercase tracking-[0.22em] text-paper/55">
                  {s.l}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
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
            <p className="mt-4 font-serif text-sm italic text-foreground/55">
              The space between two beings — measured not in distance, but in choice.
            </p>
          </div>
        </Reveal>
        <Reveal className="md:col-span-7" delay={120}>
          <Chapter n="VI" title="Human Responsibility" />
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
      q: "You see a puppy by a busy road, limping, unable to move further.",
      a: "Open ARAM. One report sends location to the nearest volunteer within minutes.",
    },
    {
      n: "Scenario II",
      q: "A bird is tangled in kite string on the terrace next door.",
      a: "Tag the rescue type — a trained handler is dispatched, not just anyone.",
    },
    {
      n: "Scenario III",
      q: "A cow lies near a highway median. Cars swerve. No one stops.",
      a: "Your single report becomes a coordinated response — police, NGO, vet.",
    },
  ];
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Chapter n="VII" title="A Quiet Test" />
        <Reveal>
          <h2 className="max-w-3xl font-serif text-3xl font-light leading-[1.1] text-ink text-balance md:text-5xl">
            What would you do
            <span className="italic text-gold"> if you saw…</span>
          </h2>
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
          <span className="hairline text-gold">VIII</span>
          <span className="h-px flex-1 bg-paper/20" />
          <span className="font-serif text-sm italic text-paper/50">Take Action</span>
        </div>
        <Reveal>
          <h2 className="max-w-3xl font-serif text-3xl font-light leading-[1.1] text-paper text-balance md:text-5xl">
            Two ways to stand
            <span className="italic text-gold-soft"> for the voiceless.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-px md:bg-paper/10 md:shadow-elegant">
          <Reveal>
            <div className="group h-full bg-ink p-8 md:p-10 transition hover:bg-[oklch(0.22_0.008_70)]">
              <p className="hairline text-gold">Module A</p>
              <h3 className="mt-4 font-serif text-2xl font-light text-paper md:text-3xl">
                Report an Animal
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/65">
                Photo, location, condition — and the nearest rescuer is alerted.
              </p>
              <ul className="mt-6 space-y-2 text-[0.78rem] text-paper/55">
                {["Image upload", "Pin or describe location", "Injured · Dead · In danger"].map(
                  (t) => (
                    <li key={t} className="flex items-center gap-3">
                      <span className="h-px w-4 bg-gold/70" />
                      {t}
                    </li>
                  ),
                )}
              </ul>
              <ReportDialog
                trigger={
                  <button className="mt-8 inline-flex items-center gap-3 bg-gold px-6 py-3 text-[0.72rem] uppercase tracking-[0.26em] text-ink transition hover:bg-gold-soft group-hover:-translate-y-0.5">
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
                Join the quiet network that turns alerts into action.
              </p>
              <ul className="mt-6 space-y-2 text-[0.78rem] text-paper/55">
                {["Name & contact", "Your city or area", "A line about why you'll show up"].map(
                  (t) => (
                    <li key={t} className="flex items-center gap-3">
                      <span className="h-px w-4 bg-gold/70" />
                      {t}
                    </li>
                  ),
                )}
              </ul>
              <VolunteerDialog
                trigger={
                  <button className="mt-8 inline-flex items-center gap-3 border border-paper/30 px-6 py-3 text-[0.72rem] uppercase tracking-[0.26em] text-paper transition hover:border-gold hover:text-gold group-hover:-translate-y-0.5">
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
    <section className="relative overflow-hidden bg-ink py-24 md:py-36">
      <div className="film-grain absolute inset-0 opacity-60" />
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.74 0.135 78 / 0.18), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-6 text-center md:px-10">
        <Reveal>
          <p className="hairline text-gold">Chapter IX — Your Move</p>
          <h2 className="mt-8 font-serif text-4xl font-light leading-[1.05] text-paper text-balance md:text-6xl lg:text-7xl">
            Be the reason
            <br />
            <span className="italic text-gold-soft">a life is saved.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-[0.95rem] leading-relaxed text-paper/70 md:text-base">
            You don’t need to be a rescuer. You don’t need to be brave. You only need to not
            look away — for the seven seconds it takes to report.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <ReportDialog
              trigger={
                <button className="glow-pulse inline-flex items-center gap-4 bg-gold px-9 py-4 text-[0.74rem] uppercase tracking-[0.28em] text-ink transition hover:bg-gold-soft hover:-translate-y-0.5">
                  Report an Animal Now
                  <span>→</span>
                </button>
              }
            />
            <VolunteerDialog
              trigger={
                <button className="border border-paper/30 px-9 py-4 text-[0.74rem] uppercase tracking-[0.28em] text-paper transition hover:border-gold hover:text-gold hover:-translate-y-0.5">
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
          <div className="flex items-center gap-3">
            <img
              src={aramLogo.url}
              alt="ARAM"
              width={36}
              height={36}
              loading="lazy"
              className="h-9 w-9 object-contain"
              style={{ filter: "invert(1) brightness(1.6)" }}
            />
            <div>
              <div className="font-serif text-lg tracking-[0.22em] text-paper">ARAM</div>
              <div className="font-serif text-[0.72rem] italic text-paper/50">
                அறம் · righteousness in action
              </div>
            </div>
          </div>
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-paper/55">
            © {new Date().getFullYear()} ARAM Movement · Built with conscience
          </p>
        </div>

        <div className="mt-8 flex flex-col items-start gap-3 border-t border-paper/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-paper/45">
            A project by
          </p>
          <a
            href="#"
            className="group flex items-center gap-3 text-paper/65 transition hover:text-paper"
          >
            <img
              src={symphonixLogo.url}
              alt="Symphonix"
              width={28}
              height={28}
              loading="lazy"
              className="h-7 w-7 rounded-sm object-cover grayscale transition group-hover:grayscale-0"
            />
            <span className="font-serif text-sm tracking-[0.22em]">SYMPHONIX</span>
            <span className="hidden font-serif text-[0.7rem] italic text-paper/40 md:inline">
              Your Vision, Our Expertise
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <main className="bg-paper text-ink">
      <Nav />
      <Hero />
      <Reality />
      <Turning />
      <Solution />
      <Impact />
      <Manifesto />
      <Scenarios />
      <Act />
      <FinalCTA />
      <Footer />
    </main>
  );
}