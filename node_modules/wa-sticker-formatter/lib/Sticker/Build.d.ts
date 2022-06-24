import { IProcessOptions } from '../typings';
import Exif from './Exif';
export default class Build extends Exif {
    /**
     * Builds sticker
     * @param processOptions
     */
    build(processOptions?: IProcessOptions): Promise<void>;
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
}
//# sourceMappingURL=Build.d.ts.map