const tokens = {
  "colors.purple": {
    "value": "#D6ACFF",
    "variable": "var(--colors-purple)"
  },
  "colors.blue": {
    "value": "#778DFF",
    "variable": "var(--colors-blue)"
  },
  "colors.cyan": {
    "value": "#ACD7FF",
    "variable": "var(--colors-cyan)"
  },
  "colors.green": {
    "value": "#AFFFC1",
    "variable": "var(--colors-green)"
  },
  "colors.yellow": {
    "value": "#FEFFAB",
    "variable": "var(--colors-yellow)"
  },
  "colors.red": {
    "value": "#FFB0B9",
    "variable": "var(--colors-red)"
  },
  "colors.darkred": {
    "value": "#e09da5",
    "variable": "var(--colors-darkred)"
  },
  "fonts.body": {
    "value": "system-ui, sans-serif",
    "variable": "var(--fonts-body)"
  },
  "breakpoints.sm": {
    "value": "640px",
    "variable": "var(--breakpoints-sm)"
  },
  "breakpoints.md": {
    "value": "768px",
    "variable": "var(--breakpoints-md)"
  },
  "breakpoints.lg": {
    "value": "1024px",
    "variable": "var(--breakpoints-lg)"
  },
  "breakpoints.xl": {
    "value": "1280px",
    "variable": "var(--breakpoints-xl)"
  },
  "breakpoints.2xl": {
    "value": "1536px",
    "variable": "var(--breakpoints-2xl)"
  },
  "sizes.breakpoint-sm": {
    "value": "640px",
    "variable": "var(--sizes-breakpoint-sm)"
  },
  "sizes.breakpoint-md": {
    "value": "768px",
    "variable": "var(--sizes-breakpoint-md)"
  },
  "sizes.breakpoint-lg": {
    "value": "1024px",
    "variable": "var(--sizes-breakpoint-lg)"
  },
  "sizes.breakpoint-xl": {
    "value": "1280px",
    "variable": "var(--sizes-breakpoint-xl)"
  },
  "sizes.breakpoint-2xl": {
    "value": "1536px",
    "variable": "var(--sizes-breakpoint-2xl)"
  },
  "colors.danger": {
    "value": "var(--colors-danger)",
    "variable": "var(--colors-danger)"
  },
  "colors.warning": {
    "value": "var(--colors-warning)",
    "variable": "var(--colors-warning)"
  },
  "colors.success": {
    "value": "var(--colors-success)",
    "variable": "var(--colors-success)"
  }
}

export function token(path, fallback) {
  return tokens[path]?.value || fallback
}

function tokenVar(path, fallback) {
  return tokens[path]?.variable || fallback
}

token.var = tokenVar