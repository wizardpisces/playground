/* eslint-disable */

export class ExternalObject<T> {
  readonly '': {
    readonly '': unique symbol
    [K: symbol]: T
  }
}
export function escapeHTML(input: string): string
export function escapeHTMLBuf(input: Buffer): string
export function asyncEscapeHTMLBuf(input: Buffer, signal?: AbortSignal | undefined | null): Promise<string>
