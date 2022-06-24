import Init from './Init';
export default class Exif extends Init {
    /**
     * Sets pack author
     * @param author
     */
    setAuthor(author: string): void;
    /**
     * Sets packname
     * @param pack
     */
    setPack(pack: string): void;
    /**
     * Adds metadata to the webp
     * @param filename
     */
    addMetadata(filename: string): Promise<void>;
    createExif: (pack: string, author: string, filename: string) => string;
}
//# sourceMappingURL=Exif.d.ts.map