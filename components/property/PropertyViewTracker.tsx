"use client";

import { useEffect, useRef } from "react";
import { trackPropertyView } from "@/lib/analytics/clarity";
import type { Property } from "@/types";

export default function PropertyViewTracker({ property }: { property: Property }) {
  const tracked = useRef(false);

  useEffect(() => {
    if (!tracked.current && property) {
      trackPropertyView(property);
      tracked.current = true;
    }
  }, [property]);

  return null;
}
