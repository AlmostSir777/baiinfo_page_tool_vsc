import * as vscode from 'vscode';
import * as util from './util';
const fs = require('fs');
import config from './config';

import { window } from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const subscribe = context.subscriptions.push.bind(
		context.subscriptions
	) as typeof context.subscriptions.push;
	const registerCommand = (command: string, callback: (...args: any[]) => any, thisArg?: any) =>
		subscribe(vscode.commands.registerCommand(command, callback, thisArg));

	// Generate Motk Template
	registerCommand('extension.baiinfopagetool', async uri => {
		try {
			await util.checkTemplatesFolder(context);
			let pathname = '';
			window
				.showInputBox({
					password: false,
					ignoreFocusOut: true,
					placeHolder: 'Please input module name',
					validateInput: async function (text) {
						uri = util.getCurrentPossibleUri(uri);
						if (!uri) {
							return 'Oops! Please open workspace folder';
						}
						pathname = await util.generateFolderPath(text, uri);
						return (await util.checkFolderIsExits(pathname)) ? 'Oops! Folder Already Exits' : null;
					},
				})
				.then(async function (text) {
					if (!text) {
						return;
					}
					util.copyFolder(config.templatesFolderPath, pathname, text);
				});
		} catch (error) {
			var err = error as Error;
			vscode.window.showErrorMessage(`baiinfo-Template: ${err.message}`);
		}
	});

}
