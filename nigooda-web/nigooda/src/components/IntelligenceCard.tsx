type Props = {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  buttonText: string;
  color: "emerald" | "indigo" | "rose";
  onClick: () => void;
};

const colorMap = {
  emerald: {
    bg: "bg-emerald-50/60",
    border: "border-emerald-100/80",
    iconBg: "bg-emerald-100/80",
    tag: "bg-emerald-100/70 text-emerald-700",
    glow: "from-emerald-100/50",
  },
  indigo: {
    bg: "bg-indigo-50/60",
    border: "border-indigo-100/80",
    iconBg: "bg-indigo-100/80",
    tag: "bg-indigo-100/70 text-indigo-700",
    glow: "from-indigo-100/50",
  },
  rose: {
    bg: "bg-rose-50/60",
    border: "border-rose-100/80",
    iconBg: "bg-rose-100/80",
    tag: "bg-rose-100/70 text-rose-700",
    glow: "from-rose-100/50",
  },
};

const IntelligenceCard = ({ icon, title, description, tags, buttonText, color, onClick }: Props) => {
  const c = colorMap[color];

  return (
    <div
      className={`relative group rounded-3xl border ${c.border} ${c.bg} backdrop-blur-sm p-5 md:p-6 flex flex-col gap-3.5 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/8 transition-all duration-300 overflow-hidden`}
    >
      {/* Subtle top glow */}
      <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-radial ${c.glow} to-transparent blur-2xl pointer-events-none`} />

      {/* ICON */}
      <div className={`w-11 h-11 rounded-2xl ${c.iconBg} flex items-center justify-center text-xl`}>
        {icon}
      </div>

      {/* CONTENT */}
      <div className="flex-1">
        <h3 className="text-base font-semibold text-slate-900 leading-snug mb-1.5">
          {title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          {description}
        </p>
      </div>

      {/* TAGS */}
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${c.tag}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* BUTTON */}
      <button
        onClick={onClick}
        className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-700 text-white text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default IntelligenceCard;