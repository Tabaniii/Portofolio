import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "../lib/utils";

const BentoGrid = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  eyebrow,
  note,
  cardHref,
  cardTarget,
  cardRel,
  cardDownload,
  ...props
}) => {
  const interactiveProps = cardHref
    ? {
        role: "link",
        tabIndex: 0,
        onClick: () => {
          if (cardTarget === "_blank") {
            window.open(cardHref, cardTarget, "noopener,noreferrer");
            return;
          }

          if (cardDownload) {
            const link = document.createElement("a");
            link.href = cardHref;
            link.download =
              typeof cardDownload === "string" ? cardDownload : "";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return;
          }

          window.location.href = cardHref;
        },
        onKeyDown: (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            event.currentTarget.click();
          }
        },
      }
    : {};

  return (
    <div
      key={name}
      className={cn(
        "group relative col-span-3 overflow-hidden rounded-[22px] border border-white/10 bg-black text-white transition-transform duration-300",
        "shadow-[0_18px_50px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.03)] hover:-translate-y-1.5 hover:border-[rgba(120,6,6,0.35)]",
        cardHref ? "cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red" : "",
        className
      )}
      {...interactiveProps}
      {...props}
    >
      <div className="absolute inset-0">{background}</div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_24%,transparent_72%,rgba(120,6,6,0.12))] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col justify-between p-5 lg:p-6">
        <div className="flex max-w-[85%] flex-col gap-3">
          {eyebrow ? (
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-brand-red">
              {eyebrow}
            </span>
          ) : null}

          <Icon className="h-10 w-10 origin-left text-zinc-200 transition-transform duration-300 ease-out group-hover:scale-90 group-hover:text-white" />

          <div className="space-y-1.5">
            <h3 className="text-[clamp(24px,2.4vw,32px)] font-black leading-none text-white">
              {name}
            </h3>
            <p className="max-w-lg text-[14px] leading-[1.55] text-zinc-400">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="min-h-[18px]">
            {note ? (
              <p className="m-0 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                {note}
              </p>
            ) : null}
          </div>

          <a
            href={href}
            target={cardTarget}
            rel={cardRel}
            download={cardDownload}
            onClick={(event) => event.stopPropagation()}
            className="pointer-events-none inline-flex translate-y-2 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-white no-underline opacity-0 transition-all duration-300 hover:border-[rgba(120,6,6,0.45)] hover:text-brand-red group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100"
          >
            {cta}
            <ArrowRightIcon className="h-4 w-4 rtl:rotate-180" />
          </a>
        </div>
      </div>
    </div>
  );
};

export { BentoCard, BentoGrid };
