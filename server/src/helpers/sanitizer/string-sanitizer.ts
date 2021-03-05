import sanitizeHtml from 'sanitize-html';
import { ISanitizer } from "../../interfaces/helpers/sanitizer-interface";

export class StringSanitizer implements ISanitizer<any, string> {
  sanitize(value: any): string {
    if (typeof value === 'undefined') {
      return '';
    }

    if (typeof value !== 'string') {
      throw new Error('Valor inválido');
    }

    return sanitizeHtml(value);
  }

}

export const stringSanitizer = new StringSanitizer();