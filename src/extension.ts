// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

var markdownIt = require('markdown-it');
var htmlToRtf = require('html-to-rtf');
const clipboardy = require('clipboardy');

interface ISettings {
	html: 			boolean		| null 	| undefined;
	xhtmlOut: 		boolean		| null 	| undefined;
	breaks: 		boolean		| null 	| undefined;
	langPrefix: 	string		| null 	| undefined;
	linkify: 		boolean		| null 	| undefined;
	typographer: 	boolean		| null 	| undefined;
	quotes: 		string		| null 	| undefined;
}


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "copy-markdown-as-rtf" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	//let disposable = vscode.commands.registerCommand('copy-markdown-as-rtf.copy', () => {
	
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World from Copy Markdown as RTF!');

		// direct copy from copy-markdown-as-html: github.com/mrgnw/copy-markdown-as-html/blob/master/src/extension.ts
		    // The command has been defined in the package.json file
    	// Now provide the implementation of the command with  registerCommand
    
		// The commandId parameter must match the command field in package.json
    var disposable = vscode.commands.registerCommand('extension.copyMarkdownAsRtf', function () {
        // The code you place here will be executed every time your command is executed

        var configurations = vscode.workspace.getConfiguration("copyMarkdownAsRtf");

        var editor = vscode.window.activeTextEditor;
		if (editor === undefined) {
			vscode.window.showErrorMessage("No active editor found. Please open a file first.");
			return;
		}
        var selection = editor.selection;

        var text = '';

        if (selection.isEmpty)
            text = editor.document.getText();
        else
            text = editor.document.getText(selection);

        var settings = {} as ISettings;
        if (configurations.has('html')) { 			settings.html = 		configurations.get('html'); }
        if (configurations.has('xhtmlOut')) { 		settings.xhtmlOut = 	configurations.get('xhtmlOut'); }
        if (configurations.has('breaks')) { 		settings.breaks = 		configurations.get('breaks'); }
        if (configurations.has('langPrefix')) { 	settings.langPrefix = 	configurations.get('langPrefix'); }
        if (configurations.has('linkify')) { 		settings.linkify = 		configurations.get('linkify'); }
        if (configurations.has('typographer')) { 	settings.typographer = 	configurations.get('typographer'); }
        if (configurations.has('quotes')) { 		settings.quotes = 		configurations.get('quotes'); }

        if (settings.quotes === '') { settings.quotes = '“”‘’'; }

        var md = new markdownIt(settings);
        var htmlResult = md.render(text);

        //clipboardy.writeSync(result);


		// convert html to rtf
		var rtfResult = htmlToRtf.convertHtmlToRtf(htmlResult);
		clipboardy.writeSync(rtfResult);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
