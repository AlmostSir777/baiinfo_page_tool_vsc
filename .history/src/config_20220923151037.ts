import * as path from 'path';
import * as os from 'os';
const json = require('../package.json');

export class Config {
    public get templatesFolderPath(): string {
        var rootPath = path.join(os.homedir(), `.vscode${path.sep}datarepo_${json.version}`);
        return rootPath;
    }
}

export default new Config();