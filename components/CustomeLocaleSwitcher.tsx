"use client";
import { useLingoLocale, setLingoLocale } from "lingo.dev/react/client";

export function CustomLocaleSwitcher() {
  const currentLocale = useLingoLocale() || "en";

  return (
    <div className="locale-switcher">
      <select
        value={currentLocale}
        onChange={(e) => setLingoLocale(e.target.value)}
        className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-lg rounded-2xl p-2"
      >
        <option className="bg-gray-100 text-black" value="en">English</option>
        <option className="bg-gray-100 text-black" value="es">Spanish</option>
        <option className="bg-gray-100 text-black" value="de">German</option>
        <option className="bg-gray-100 text-black" value="fr">French</option>
      </select>
    </div>
  );
}