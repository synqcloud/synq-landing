export default function SynqLogo({
  className = "h-7",
  invert = true,
}: {
  className?: string;
  invert?: boolean;
}) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`flex h-full aspect-square items-center justify-center rounded-lg p-1 backdrop-blur-md ${
          invert ? "bg-white/15" : "bg-[#1a1818]"
        }`}
      >
        <img
          src="/synq-icon.png"
          width={64}
          height={64}
          alt=""
          className="h-full w-full object-contain"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </span>
      <span className="text-[18px] font-semibold tracking-tight leading-none">
        Synq
      </span>
    </div>
  );
}
