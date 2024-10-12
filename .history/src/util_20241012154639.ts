import * as path from 'path';
import * as fs from 'mz/fs';
import * as vscode from 'vscode';
import config from './config';
import { PathLike } from 'mz/fs';
import { log } from 'console';

const inflect = require('i')(true);

export function copyFile(src: PathLike, dst: PathLike) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(src)
      .pipe(fs.createWriteStream(dst))
      .on('close', (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(null);
        }
      });
  });
}

export function relaceContent(target: string, path: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', function (err, data) {
      if (err) {
        reject(err);
      } else {
        let content = data.toString().replace(/\$name/g, inflect.camelize(target));
        content = content.replace(/\$prefix/g, inflect.underscore(target));
        fs.writeFile(path, content, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(null);
          }
        });
      }
    });
  });
}

export async function copyFolder(src: string, dst: string, name: string) {
  let stats = await fs.stat(dst).catch(e => undefined);
  if (stats && !stats.isDirectory()) {
    throw Error('not folder');
  }

  await fs.mkdir(dst);
  await Promise.all(
    (await fs.readdir(src)).map(async file => {
      let source = path.join(src, file);
      let target = path.join(dst, file);
      let stats = await fs.stat(source);
      if (stats.isDirectory()) {
        await copyFolder(source, target, name);
      } else if (stats.isFile()) {
        let fileTarget = name.length > 0 && file!=='route.dart'  ? path.join(dst, `${inflect.underscore(name)}_${file}`) : target;
        console.log(file);
        if (path.extname(fileTarget) === '.dart') {
          await copyFile(source, fileTarget);
          if (name.length > 0) {
            await relaceContent(name, fileTarget);
          }
        }
      }
    })
  );
}

export async function checkTemplatesFolder(context: any) {
  if (!(await fs.exists(config.templatesFolderPath))) {
    await copyFolder(path.join(context.extensionPath, 'templates'), config.templatesFolderPath, '');
  }
  return await fs.exists(config.templatesFolderPath);
}

export async function checkFolderIsExits(name: string) {
  return await fs.exists(name);
}

export async function generateFolderPath(name: string, uri: any) {
  let foldername = inflect.underscore(name);
  let pathname = '';
  let stat = await fs.stat(uri.fsPath);
  if (stat.isDirectory()) {
    pathname = `${uri.fsPath}${path.sep}${foldername}`;
  } else {
    pathname = `${path.dirname(uri.fsPath)}${path.sep}${foldername}`;
  }
  return pathname;
}

export function getCurrentPossibleUri(uri: vscode.Uri) {
  if (!uri) {
    if (vscode.window.activeTextEditor) {
      uri = vscode.window.activeTextEditor!.document.uri;
    } else {
      if (vscode.workspace.workspaceFolders) {
        uri = vscode.workspace.workspaceFolders[0].uri;
      }
    }
  }
  return uri;
}
