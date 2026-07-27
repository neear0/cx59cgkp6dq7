"use client";

import { type ReactNode } from "react";

/**
 * Magnetic hover effect is disabled for now (felt buggy alongside the
 * custom cursor). The wrapper stays so it can be re-enabled in one place.
 */
export default function Magnetic({
  children,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
