import { Link } from "react-router-dom";

export default function Button({
  children,
  to,
  isMainBtn = true,
  width = "fit-content",
  type = "button",
  disabled = false
}) {
  const base =
    "px-4 py-2 rounded-md text-sm transition inline-flex items-center justify-center";

  const variant = isMainBtn
    ? "bg-pink-600 text-white hover:bg-pink-700"
    : "bg-white text-pink-600 border border-pink-600 hover:bg-pink-50";

  const style = `${base} ${variant} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  if (to) {
    return (
      <Link to={to} className={style} style={{ width }}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={style} style={{ width }}>
      {children}
    </button>
  );
}
