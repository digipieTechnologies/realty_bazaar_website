"use server";

import { getPublishedProperties, type GetPropertiesOptions } from "@/lib/supabase/queries";
import type { Property } from "@/types";

/**
 * Server action used by the infinite scroll client component to fetch the next
 * page of properties without a full route navigation.
 */
export async function fetchPropertiesPage(
  options: GetPropertiesOptions
): Promise<Property[]> {
  return getPublishedProperties(options);
}
