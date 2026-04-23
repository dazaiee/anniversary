export const BALLOONS_PER_PAGE = 24;
export const TOTAL_BALLOONS = 366; // 365 normal reasons + 1 giant balloon
/** Normal balloons on the very last page (before the giant one) */
export const LAST_PAGE_NORMAL = 5;

/**
 * We reserve 6 balloons for the final page (5 normal + 1 giant).
 * The remaining 360 fill regular pages of 24 each exactly.
 * 360 = 15 × 24, giving us 15 regular pages + 1 final = 16 total.
 */
const REGULAR_BALLOONS = TOTAL_BALLOONS - LAST_PAGE_NORMAL - 1; // 360
export const REGULAR_PAGES = Math.ceil(REGULAR_BALLOONS / BALLOONS_PER_PAGE); // 15
export const TOTAL_PAGES = REGULAR_PAGES + 1; // 16

/**
 * Returns the balloon IDs (0-indexed) for a given page (0-indexed).
 * Pages 0..14 hold regular balloons (up to 24 each).
 * Page 15 (final) holds 5 normal balloons — the giant is handled separately.
 */
export function getBalloonsForPage(page: number): number[] {
  if (page < REGULAR_PAGES) {
    const start = page * BALLOONS_PER_PAGE;
    const count = Math.min(BALLOONS_PER_PAGE, REGULAR_BALLOONS - start);
    return Array.from({ length: count }, (_, i) => start + i);
  }
  // Final page: IDs 359..363 (5 normal balloons)
  const start = REGULAR_BALLOONS;
  return Array.from({ length: LAST_PAGE_NORMAL }, (_, i) => start + i);
}

/** The ID reserved for the giant celebration balloon (364) */
export const GIANT_BALLOON_ID = TOTAL_BALLOONS - 1;

/** Check if every balloon on the given page has been popped */
export function isPageComplete(
  page: number,
  popped: Set<number>
): boolean {
  const ids = getBalloonsForPage(page);
  return ids.every((id) => popped.has(id));
}

/** Whether the current page is the last page */
export function isLastPage(page: number): boolean {
  return page === TOTAL_PAGES - 1;
}
