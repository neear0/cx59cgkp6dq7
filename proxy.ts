import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, isLocale, type Locale } from "@/lib/i18n";

/**
 * Locale detection: a manually chosen locale (cookie, set by the footer
 * switcher) always wins; otherwise the browser's Accept-Language decides —
 * sk → Slovak, cs → Czech, de (DE/AT/CH) → German, anything else → English.
 */
function detectLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get("locale")?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const header = request.headers.get("accept-language") ?? "";
  for (const part of header.split(",")) {
    const lang = part.split(";")[0].trim().toLowerCase();
    if (lang.startsWith("sk")) return "sk";
    if (lang.startsWith("cs")) return "cs";
    if (lang.startsWith("de")) return "de";
    if (lang.startsWith("en")) return "en";
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${detectLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // skip static assets and API routes
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
