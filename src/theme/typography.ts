/**
 * Optical tracking for the DISPLAY face.
 *
 * A typeface is drawn with one set of sidebearings, struck as a compromise at a reading size. Set the
 * same face at 46px and those gaps scale up with everything else, so a heading stops reading as a word
 * and starts reading as a row of letters. Every serious type system corrects for it — Apple ships
 * per-size tracking tables for SF, Inter ships a dynamic metric — and the correction is always
 * negative and always grows with size.
 *
 * The ratio steps rather than staying flat, because the defect is not linear: one flat value leaves a
 * 46px display heading loose while already pinching a 16px one. Barely there at reading sizes,
 * decisive at display sizes.
 *
 * | size    | ratio   | example        |
 * | ------- | ------- | -------------- |
 * | ≥ 44    | -0.030  | h1 46          |
 * | 32–43   | -0.025  | h2 34          |
 * | 24–31   | -0.020  | h3 28, h4 24   |
 * | 18–23   | -0.015  | h5 20          |
 * | < 18    | -0.010  | h6 16          |
 *
 * **Returned in `em`, deliberately.** `em` is relative to the element's own computed font size, so the
 * value stays correct if a variant is later resized or a caller scales it — the size argument only
 * picks the band. This is the one real advantage the web has over the React Native copy of this
 * table, where `letterSpacing` is absolute and the ratio has to be multiplied out.
 *
 * Scope is the display face only. The `wide` variant is excluded: it is a WIDE cut chosen where
 * openness is the point, and tightening it works against the reason it was picked. The body face
 * (`fonts.regular`, which backs body1/body2/subtitle and the custom size variants) is set at reading
 * sizes where its own sidebearings are already right.
 *
 * **This file is duplicated verbatim in `ui/`, `auth/` and `kyc/` and the three copies must stay in
 * step.** That is not an oversight: `src/theme/material.ts` is itself an independent physical copy in
 * each of the three (their typography blocks are byte-identical today), `kyc/` may not depend on
 * `@wallet/provider` at all under the Parse-boundary carve-out, and a shared theme package does not
 * exist. Extracting one is the right fix; until it does, change all three together.
 */
const TRACKING_RATIO_BANDS: readonly { minSize: number; ratio: number }[] = [
	{ minSize: 44, ratio: -0.03 },
	{ minSize: 32, ratio: -0.025 },
	{ minSize: 24, ratio: -0.02 },
	{ minSize: 18, ratio: -0.015 },
	{ minSize: 0, ratio: -0.01 },
]

/** Negative tracking for the display face set at `fontSize` px, as an `em` string for `sx`/theme use. */
export const displayLetterSpacing = (fontSize: number): string => {
	if (!Number.isFinite(fontSize) || fontSize <= 0) {
		return `0`
	}
	const band = TRACKING_RATIO_BANDS.find((entry) => fontSize >= entry.minSize)
	return `${band?.ratio ?? 0}em`
}
