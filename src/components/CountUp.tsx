type Props = {
  target: number | string;
  suffix?: string;
  duration?: number;
  pad?: number;
};

export default function CountUp({ target, suffix = "", pad = 0 }: Props) {
  const str =
    typeof target === "number" && pad > 0
      ? String(target).padStart(pad, "0")
      : String(target);
  return (
    <span className="countup">
      {str}
      {suffix}
    </span>
  );
}
