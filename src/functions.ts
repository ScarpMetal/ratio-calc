export function parseValues(values: {
  a: string
  b: string
  c: string
  d: string
}) {
  return {
    a: parseFloat(values.a) || NaN,
    b: parseFloat(values.b) || NaN,
    c: parseFloat(values.c) || NaN,
    d: parseFloat(values.d) || NaN,
  }
}

export function solveForA(b: number, c: number, d: number): number {
  return (c / d) * b
}

export function solveForB(a: number, c: number, d: number): number {
  return (d / c) * a
}

export function solveForC(a: number, b: number, d: number): number {
  return (a / b) * d
}

export function solveForD(a: number, b: number, c: number): number {
  return (b / a) * c
}

export function equationIsValid(a: number, b: number, c: number, d: number) {
  return a / b === c / d
}

export function combineClasses(...args: any[]) {
  return args.filter(Boolean).join(" ")
}
