export interface ISanitizer<I = any, O = any> {
  sanitize(value: I): O;
}