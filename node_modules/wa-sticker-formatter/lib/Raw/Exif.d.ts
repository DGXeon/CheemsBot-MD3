/// <reference types="node" />
/**
 * Creates Exif Metadata File
 * @param pack
 * @param author
 */
export declare const createExif: (pack: string, author: string, filename: string) => string;
/**
 * Sets Exif metadata to WebP
 * @param pack
 * @param author
 * @param file
 */
export declare const setMetadata: (pack: string, author: string, file: string) => Promise<Buffer>;
/**
 * Adds metadata to the given webp buffer and returns the new buffer
 * @param buffer
 * @param pack
 * @param author
 * @returns webpbuffer
 */
export declare const addMetadataToWebpBuffer: (buffer: Buffer, pack: string, author: string) => Promise<Buffer>;
//# sourceMappingURL=Exif.d.ts.map