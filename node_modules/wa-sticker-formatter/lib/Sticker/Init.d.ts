/// <reference types="node" />
import { IConfig } from '../typings';
import Base from './Base';
import { exec } from 'child_process';
export default class Init extends Base {
    /**
     * Creates a new instance of the this Class
     * @param data
     * @param param1
     */
    constructor(image: string | Buffer, config?: IConfig);
    exec: typeof exec.__promisify__;
}
//# sourceMappingURL=Init.d.ts.map