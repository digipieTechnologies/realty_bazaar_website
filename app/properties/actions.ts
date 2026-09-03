"use server";

import {
  getPublishedPropertiesWithCount,
  type GetPropertiesOptions,
  type GetPropertiesResult,
} from "@/lib/supabase/queries";

/**
 * Server action used by the infinite scroll client component to fetch the next
 * page of properties and total matching count without a full route navigation.
 */
export async function fetchPropertiesPage(
  options: GetPropertiesOptions
): Promise<GetPropertiesResult> {
  return getPublishedPropertiesWithCount(options);
}
