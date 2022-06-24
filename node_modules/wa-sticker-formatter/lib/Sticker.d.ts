/// <reference types="node" />
export declare class Sticker {
    /**
     * Supported MimeTypes
    */
    supportedTypes: string[];
    /**
     * Buffer of the image/video provided
    */
    private data;
    /**
     * Sticker Config
     */
    config: {
        animated: boolean;
        crop: boolean;
        pack: string;
        author: string;
    };
    /**
     * path of the file
    */
    private path;
    /**
     * Processoptions to pass to ffmpeg
    */
    processOptions: processOptions;
    private final;
    /**
     * MimeType of the buffer provided
    */
    private mime;
    /**
     * Creates a new instance of the "Sticker Class"
     * @param data
     * @param param1
     */
    constructor(data: Buffer | string, { animated, crop, author, pack }: {
        animated?: boolean | undefined;
        crop?: boolean | undefined;
        author?: string | undefined;
        pack?: string | undefined;
    });
    /**
     * Builds the sticker
     * @param processOptions
     */
    build(processOptions?: processOptions): Promise<void>;
    /**
     * @returns {Buffer} Returns the build result
     */
    get(): Promise<Buffer>;
    /**
     * @returns {string} Filename
     */
    animated(): Promise<string>;
    /**
     * Creates animated sticker without with transparant borders
     * @returns {string} Filename
     */
    animatedNoCrop(): Promise<string>;
    /**
     * Creates Static sticker
     * @returns {string} Filename
     */
    static(): Promise<string>;
    /**
     * Creates static sticker with transparent borders
     * @returns {string} Filename
     */
    staticNoCrop(): Promise<string>;
    /**
     * Adds the pack and author titles to the EXIF metadata of the webp
     * @param filename
     */
    addMetadata(filename: string): Promise<void>;
    /**
     * Creates the EXIF file withe the given Metadata
     * @param packname
     * @param author
     */
    createExif(packname?: string, author?: string): string;
    /**
     * Output options for FFMpeg
     */
    outputOptions: string[];
}
/**
 * Interface for the FFMpeg Process options
 */
interface processOptions {
    fps: number;
    startTime: string;
    endTime: string;
    loop: number;
}
export {};
//# sourceMappingURL=Sticker.d.ts.map