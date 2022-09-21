declare module 'color-scheme' {
  class ColorScheme {
    scheme(value: string): ColorScheme;
    variation(value: string): ColorScheme;
    colors(): string[];
  }

  export default ColorScheme;
}