'use strict';

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const multipleEmptyLines = true;

function removeEmptyLines(content) {
    return (content || '').replace(/\n\n+/g, multipleEmptyLines ? '\n\n' : '\n');
}

function getSelection(selection, document) {
    if (selection.start.line !== selection.end.line ||
        selection.start.character !== selection.end.character) return selection;

    return new vscode.Range(1, 1, document.lineCount, 1);
}

function doAction() {

    var editor = vscode.window.activeTextEditor;
    if (!editor) {
        return; // No open text editor
    }

    let selection: any = editor.selection;
    if (selection.start.line === selection.end.line &&
        selection.start.character === selection.end.character) {
        selection = new vscode.Range(1, 1, editor.document.lineCount, 1);
    }
    var text = editor.document.getText(selection);

    editor.edit((edit) => {
        edit.replace(selection, removeEmptyLines(text));
    });
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.remove-empty-lines', doAction));
    context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(doAction));
}

// this method is called when your extension is deactivated
export function deactivate() {
}