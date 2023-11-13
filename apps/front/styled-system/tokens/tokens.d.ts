/* eslint-disable */
export type Token = "colors.purple" | "colors.blue" | "colors.cyan" | "colors.green" | "colors.yellow" | "colors.red" | "colors.darkred" | "colors.gray" | "colors.lightgray" | "fonts.body" | "breakpoints.sm" | "breakpoints.md" | "breakpoints.lg" | "breakpoints.xl" | "breakpoints.2xl" | "sizes.breakpoint-sm" | "sizes.breakpoint-md" | "sizes.breakpoint-lg" | "sizes.breakpoint-xl" | "sizes.breakpoint-2xl" | "colors.danger" | "colors.warning" | "colors.success" | "colors.disabled" | "colors.background"

export type ColorToken = "purple" | "blue" | "cyan" | "green" | "yellow" | "red" | "darkred" | "gray" | "lightgray" | "danger" | "warning" | "success" | "disabled" | "background"

export type FontToken = "body"

export type BreakpointToken = "sm" | "md" | "lg" | "xl" | "2xl"

export type SizeToken = "breakpoint-sm" | "breakpoint-md" | "breakpoint-lg" | "breakpoint-xl" | "breakpoint-2xl"

export type AnimationName = "spin" | "ping" | "pulse" | "bounce"

export type Tokens = {
		colors: ColorToken
		fonts: FontToken
		breakpoints: BreakpointToken
		sizes: SizeToken
		animationName: AnimationName
} & { [token: string]: never }

export type TokenCategory = "zIndex" | "opacity" | "colors" | "fonts" | "fontSizes" | "fontWeights" | "lineHeights" | "letterSpacings" | "sizes" | "shadows" | "spacing" | "radii" | "borders" | "durations" | "easings" | "animations" | "blurs" | "gradients" | "breakpoints" | "assets"