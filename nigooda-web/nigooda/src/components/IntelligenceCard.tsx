type IntelligenceCardProps = {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  buttonText: string;
  color:
    | "emerald"
    | "indigo"
    | "rose";
  onClick: () => void;
};

const colorStyles = {
  emerald: {
    border: "border-emerald-100",
    glow: "bg-emerald-100",
    iconBg: "bg-emerald-100",
    tagBg: "bg-emerald-50",
    tagText: "text-emerald-700",
    button:
      "bg-emerald-600 hover:bg-emerald-500",
  },

  indigo: {
    border: "border-indigo-100",
    glow: "bg-indigo-100",
    iconBg: "bg-indigo-100",
    tagBg: "bg-indigo-50",
    tagText: "text-indigo-700",
    button:
      "bg-indigo-600 hover:bg-indigo-500",
  },

  rose: {
    border: "border-rose-100",
    glow: "bg-rose-100",
    iconBg: "bg-rose-100",
    tagBg: "bg-rose-50",
    tagText: "text-rose-700",
    button:
      "bg-rose-600 hover:bg-rose-500",
  },
};

const IntelligenceCard = ({
  icon,
  title,
  description,
  tags,
  buttonText,
  color,
  onClick,
}: IntelligenceCardProps) => {
  const styles = colorStyles[color];

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border ${styles.border} bg-white p-8 md:p-10 shadow-sm hover:shadow-2xl transition-all duration-300`}
    >

      {/* Glow */}
      <div
        className={`absolute top-0 right-0 w-40 h-40 ${styles.glow} rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition`}
      />

      <div className="relative z-10">

        {/* ICON */}
        <div
          className={`w-14 h-14 rounded-2xl ${styles.iconBg} flex items-center justify-center text-2xl mb-6`}
        >
          {icon}
        </div>

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          {title}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-slate-600 text-base leading-relaxed mb-8">
          {description}
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-3 mb-8">

          {tags.map((tag) => (
            <span
              key={tag}
              className={`px-4 py-2 rounded-full ${styles.tagBg} ${styles.tagText} text-sm font-medium`}
            >
              {tag}
            </span>
          ))}

        </div>

        {/* BUTTON */}
        <button
          onClick={onClick}
          className={`w-full py-4 rounded-2xl ${styles.button} text-white font-semibold transition-all duration-200`}
        >
          {buttonText}
        </button>

      </div>
    </div>
  );
};

export default IntelligenceCard;