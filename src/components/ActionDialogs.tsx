import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.22em] text-paper/60">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full bg-transparent border border-paper/20 px-4 py-3 text-sm text-paper placeholder:text-paper/35 focus:border-gold focus:outline-none transition";

export function ReportDialog({ trigger }: { trigger: ReactNode }) {
  const [type, setType] = useState<"injured" | "dead" | "danger">("injured");
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg border-paper/15 bg-ink text-paper p-0 overflow-hidden">
        <div className="film-grain absolute inset-0 opacity-40 pointer-events-none" />
        <div className="relative p-8">
          <DialogHeader className="text-left">
            <p className="hairline text-gold">Report an Animal</p>
            <DialogTitle className="font-serif text-2xl font-light text-paper md:text-3xl">
              Seven seconds. One life.
            </DialogTitle>
            <DialogDescription className="text-paper/60 text-sm">
              Share what you saw. Nearby rescuers will be alerted instantly.
            </DialogDescription>
          </DialogHeader>

          <form
            className="mt-6 space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <Field label="Photo">
              <div className="flex items-center justify-center border border-dashed border-paper/20 px-4 py-8 text-center transition hover:border-gold/60">
                <div>
                  <div className="mx-auto mb-2 h-10 w-10 rounded-full border border-paper/20 flex items-center justify-center text-gold">
                    ↑
                  </div>
                  <p className="text-xs text-paper/55">Tap to upload an image</p>
                </div>
                <input type="file" accept="image/*" className="hidden" />
              </div>
            </Field>

            <Field label="Location">
              <input
                className={inputCls}
                placeholder="Street, landmark, or pin location"
              />
            </Field>

            <Field label="Condition">
              <div className="grid grid-cols-3 gap-2">
                {(["injured", "dead", "danger"] as const).map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setType(t)}
                    className={`border px-2 py-3 text-[0.68rem] uppercase tracking-[0.18em] transition ${
                      type === t
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-paper/20 text-paper/60 hover:border-paper/40"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Notes (optional)">
              <textarea
                rows={3}
                className={inputCls + " resize-none"}
                placeholder="Anything a rescuer should know"
              />
            </Field>

            <DialogFooter className="!justify-stretch">
              <button
                type="submit"
                className="w-full bg-gold px-6 py-3 text-[0.74rem] uppercase tracking-[0.26em] text-ink transition hover:bg-gold-soft"
              >
                Send Alert
              </button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function VolunteerDialog({ trigger }: { trigger: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg border-paper/15 bg-ink text-paper p-0 overflow-hidden">
        <div className="film-grain absolute inset-0 opacity-40 pointer-events-none" />
        <div className="relative p-8">
          <DialogHeader className="text-left">
            <p className="hairline text-gold">Become a Volunteer</p>
            <DialogTitle className="font-serif text-2xl font-light text-paper md:text-3xl">
              Stand for the silent.
            </DialogTitle>
            <DialogDescription className="text-paper/60 text-sm">
              Join the quiet network of people who respond when no one else does.
            </DialogDescription>
          </DialogHeader>

          <form
            className="mt-6 space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <Field label="Full Name">
              <input className={inputCls} placeholder="Your name" />
            </Field>
            <Field label="Contact">
              <input className={inputCls} placeholder="Phone or email" />
            </Field>
            <Field label="Location">
              <input className={inputCls} placeholder="City, area" />
            </Field>
            <Field label="Why you want to help">
              <textarea
                rows={3}
                className={inputCls + " resize-none"}
                placeholder="A line about you"
              />
            </Field>

            <DialogFooter className="!justify-stretch">
              <button
                type="submit"
                className="w-full bg-gold px-6 py-3 text-[0.74rem] uppercase tracking-[0.26em] text-ink transition hover:bg-gold-soft"
              >
                Join the Movement
              </button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}