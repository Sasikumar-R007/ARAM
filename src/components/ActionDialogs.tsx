import { useState, type ReactNode, type FormEvent } from "react";
import { MapPin, Loader2, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { submitNotifySignup, submitVolunteer } from "@/lib/api";
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
      <span className="mb-1.5 block text-[0.68rem] uppercase tracking-[0.22em] text-paper/60">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full cursor-text bg-paper/5 border border-paper/20 px-4 py-2.5 text-sm text-paper placeholder:text-paper/35 focus:border-gold focus:outline-none transition rounded-sm";

const selectCls =
  "modal-select w-full cursor-pointer appearance-none bg-paper/5 border border-paper/20 px-4 py-3 pr-10 text-sm text-paper focus:border-gold focus:outline-none transition rounded-sm";

const modalShellCls =
  "border-paper/15 bg-ink text-paper p-0 overflow-hidden shadow-elegant max-sm:!w-[calc(100%-1.5rem)] max-sm:max-h-[min(88vh,720px)] max-sm:overflow-y-auto max-sm:rounded-xl";

const reportModalShellCls =
  `${modalShellCls} !max-w-[min(42rem,94vw)] sm:!max-w-2xl`;

const volunteerModalShellCls = `${modalShellCls} !max-w-lg`;

const modalBodyCls = "relative p-7 md:p-9 max-sm:p-6 max-sm:pt-10";

const volunteerModalBodyCls = "relative p-6 md:p-7 max-sm:p-6 max-sm:pt-10";

const btnPrimaryCls =
  "btn-modal flex min-h-[3.25rem] cursor-pointer items-center justify-center gap-2 rounded-sm bg-gold px-3 py-3 text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-ink transition hover:bg-gold-soft sm:px-4 sm:text-[0.62rem] sm:tracking-[0.1em] md:text-[0.65rem] md:tracking-[0.12em]";

const btnOutlineCls =
  "btn-modal flex min-h-[3.25rem] cursor-pointer items-center justify-center gap-2 rounded-sm border border-paper/30 bg-transparent px-3 py-3 text-[0.58rem] uppercase tracking-[0.08em] text-paper transition hover:border-gold hover:text-gold sm:px-4 sm:text-[0.62rem] sm:tracking-[0.1em] md:text-[0.65rem] md:tracking-[0.12em]";

function ModalGrain() {
  return <div className="film-grain pointer-events-none absolute inset-0 opacity-40" aria-hidden />;
}

type DialogControlProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
};

function useDialogControl({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  trigger,
}: DialogControlProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const onOpenChange = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    controlledOnOpenChange?.(next);
  };

  return { open, onOpenChange, trigger, isControlled };
}

export function ReportDialog({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);

  const openVolunteer = () => {
    setOpen(false);
    window.setTimeout(() => setVolunteerOpen(true), 200);
  };

  const openNotify = () => {
    setOpen(false);
    window.setTimeout(() => setNotifyOpen(true), 200);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className={reportModalShellCls}>
          <ModalGrain />
          <div className={modalBodyCls}>
            <DialogHeader className="space-y-3 text-left">
              <DialogTitle className="font-serif text-2xl font-light leading-tight text-paper md:text-3xl">
                🐾 Report Animal
              </DialogTitle>
              <DialogDescription asChild>
                <div className="space-y-3 text-sm leading-relaxed text-paper/70 md:text-[0.95rem]">
                  <p>The ARAM reporting system is currently under development.</p>
                  <p>
                    We are building a fast, reliable way to connect people, volunteers and
                    organizations to help animals in need.
                  </p>
                  <p>Be among the first to experience ARAM when it launches.</p>
                </div>
              </DialogDescription>
            </DialogHeader>

            <div className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-2">
              <button type="button" onClick={openVolunteer} className={`${btnPrimaryCls} w-full text-center`}>
                Become a Founding Volunteer
              </button>
              <button type="button" onClick={openNotify} className={`${btnOutlineCls} w-full text-center`}>
                Notify Me
              </button>
            </div>

            <p className="mt-7 border-t border-paper/10 pt-5 text-center font-serif text-sm italic text-paper/45">
              Launching soon. Every report will matter.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <VolunteerDialog open={volunteerOpen} onOpenChange={setVolunteerOpen} founding />
      <NotifyMeDialog open={notifyOpen} onOpenChange={setNotifyOpen} />
    </>
  );
}

export function NotifyMeDialog({
  trigger,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: DialogControlProps) {
  const { open, onOpenChange, trigger: dialogTrigger, isControlled } = useDialogControl({
    open: controlledOpen,
    onOpenChange: controlledOnOpenChange,
    trigger,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setSubmitted(false);
    setIsSubmitting(false);
  };

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next) window.setTimeout(resetForm, 300);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Please enter your name and email");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitNotifySignup({ data: { name: name.trim(), email: email.trim() } });
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {dialogTrigger && !isControlled ? <DialogTrigger asChild>{dialogTrigger}</DialogTrigger> : null}
      <DialogContent className={modalShellCls}>
        <ModalGrain />
        <div className={modalBodyCls}>
          {submitted ? (
            <div className="py-4 text-center">
              <p className="font-serif text-2xl font-light text-paper md:text-3xl">
                Thank you ❤️
              </p>
              <p className="mt-4 text-sm leading-relaxed text-paper/70 md:text-base">
                We&apos;ll let you know as soon as ARAM is ready.
              </p>
              <button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="btn-interaction mt-8 cursor-pointer rounded-sm border border-paper/30 px-8 py-3 text-[0.72rem] uppercase tracking-[0.24em] text-paper transition hover:border-gold hover:text-gold"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <DialogHeader className="text-left">
                <p className="hairline text-gold">Stay in the loop</p>
                <DialogTitle className="font-serif text-2xl font-light text-paper md:text-3xl">
                  Notify Me
                </DialogTitle>
                <DialogDescription className="text-paper/60 text-sm">
                  Leave your details and we&apos;ll reach out when ARAM launches.
                </DialogDescription>
              </DialogHeader>

              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <Field label="Name">
                  <input
                    className={inputCls}
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    className={inputCls}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </Field>

                <DialogFooter className="!justify-stretch pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-interaction flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-gold px-6 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.26em] text-ink disabled:opacity-70 disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Notify Me"
                    )}
                  </button>
                </DialogFooter>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function VolunteerDialog({
  trigger,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  founding = false,
}: DialogControlProps & { founding?: boolean }) {
  const { open, onOpenChange, trigger: dialogTrigger, isControlled } = useDialogControl({
    open: controlledOpen,
    onOpenChange: controlledOnOpenChange,
    trigger,
  });

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState<"weekdays" | "weekends" | "anytime" | "">("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next) {
      window.setTimeout(() => {
        setName("");
        setContact("");
        setLocation("");
        setAvailability("");
        setReason("");
      }, 300);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || !location.trim() || !availability) {
      toast.error("Please fill in all required fields");
      return;
    }
    setIsSubmitting(true);
    try {
      await submitVolunteer({
        data: {
          name,
          contact,
          location,
          availability: availability as "weekdays" | "weekends" | "anytime",
          reason,
        },
      });
      toast.success(
        founding
          ? "Welcome, founding volunteer! We'll be in touch before launch."
          : "Thank you for joining the movement!",
      );
      handleOpenChange(false);
    } catch {
      toast.error("Failed to submit registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {dialogTrigger && !isControlled ? <DialogTrigger asChild>{dialogTrigger}</DialogTrigger> : null}
      <DialogContent className={volunteerModalShellCls}>
        <ModalGrain />
        <div className={volunteerModalBodyCls}>
          <DialogHeader className="space-y-2 text-left">
            <p className="hairline text-gold">
              {founding ? "Founding Volunteer" : "Become a Volunteer"}
            </p>
            <DialogTitle className="font-serif text-xl font-light leading-snug text-paper md:text-2xl">
              {founding ? "Help us build ARAM from day one." : "Stand for the silent."}
            </DialogTitle>
            <DialogDescription className="text-[0.72rem] leading-relaxed text-paper/50 md:text-xs">
              {founding
                ? "Register your interest now. When ARAM launches, founding volunteers will be the first to respond."
                : "Join the quiet network of people who respond when no one else does."}
            </DialogDescription>
          </DialogHeader>

          <form className="mt-4 space-y-3.5" onSubmit={handleSubmit}>
            <Field label="Full Name">
              <input
                className={inputCls}
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </Field>
            <Field label="Contact">
              <input
                className={inputCls}
                placeholder="Phone or email"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                autoComplete="tel email"
              />
            </Field>
            <Field label="Location">
              <div className="relative">
                <input
                  className={inputCls + " pr-12"}
                  placeholder="City, area"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  autoComplete="address-level2"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-paper/40 transition hover:text-gold"
                  title="Auto-detect location"
                  tabIndex={-1}
                >
                  <MapPin className="h-5 w-5" />
                </button>
              </div>
            </Field>
            <Field label="Availability">
              <div className="relative">
                <select
                  className={selectCls}
                  value={availability}
                  onChange={(e) =>
                    setAvailability(e.target.value as "weekdays" | "weekends" | "anytime" | "")
                  }
                  required
                >
                  <option value="" disabled>
                    Select availability
                  </option>
                  <option value="weekdays">Weekdays</option>
                  <option value="weekends">Weekends</option>
                  <option value="anytime">Anytime / Emergency</option>
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70"
                  aria-hidden
                />
              </div>
            </Field>
            <Field label="Why you want to help (optional)">
              <textarea
                rows={2}
                className={inputCls + " resize-none"}
                placeholder="A line about you"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </Field>

            <DialogFooter className="!justify-stretch pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${btnPrimaryCls} w-full disabled:opacity-70`}
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : founding ? (
                  "Join as Founding Volunteer"
                ) : (
                  "Join the Movement"
                )}
              </button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
