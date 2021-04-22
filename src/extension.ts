'use strict';

import * as vscode from 'vscode';

const NAME = 'blankLinePlus';
const COMMAND = 'process';
const CONTEXT_SAVE = 'save';
const CONTEXT_COMMAND = 'command';

// Configuration definition
interface ExtensionConfig {
    keepOneEmptyLine?: boolean;
    triggerOnSave?: boolean;
    insertLineAfterBlock?: boolean;
    removeBlockPadding?: boolean;
    languageIds?: string[];
}

// Default configuration
let config: ExtensionConfig = {
    keepOneEmptyLine: true,
    triggerOnSave: true,
    insertLineAfterBlock: true,
    removeBlockPadding: true,
    languageIds: ['javascript', 'typescript', 'json']
};

// Read extension configuration
function readConfig() {
    let settings = vscode.workspace.getConfiguration(NAME);
    config = Object.assign({}, config, settings);
}

// Check for language validity
function isValidLanguage(languageId: string) {
    if (config === undefined || !(config.languageIds instanceof Array) || config.languageIds.length === 0) { return true; }
    return config.languageIds.find(id => id.toLowerCase() === languageId.toLowerCase()) !== undefined;
}

// Remove empty lines
function processLines(lines: vscode.TextLine[]): string[] {
    return (lines || [])
        .reduce((a: any[], line) => {
            let prevLine: vscode.TextLine = a.slice(-1)[0];
            if (prevLine) {
                if (prevLine.isEmptyOrWhitespace && line.isEmptyOrWhitespace) { return a; }

                if (config.removeBlockPadding) {
                    if (line.isEmptyOrWhitespace && prevLine.text.trim()[prevLine.text.trim().length - 1] === '{') { return a; }
                    if (prevLine.isEmptyOrWhitespace && line.text.trim() === '}') { a.pop(); }
                }

                if (config.insertLineAfterBlock && prevLine.text.trim() === '}' && !line.isEmptyOrWhitespace && line.text.trim()[0] !== '}') { a.push(null); }
            }

            if (config.keepOneEmptyLine !== true && line.isEmptyOrWhitespace) { return a; }

            return a.concat([line]);
        }, []).map(line => line ? line.text : '');
}

function selectLines(editor: vscode.TextEditor, start: number, end: number) {
    var lines = [];
    for (let lineIndex = start; lineIndex < end; lineIndex++) {
        lines.push(editor.document.lineAt(lineIndex));
    }
    return lines;
}

function doAction(event: string) {
    // Get active text editor
    var editor = vscode.window.activeTextEditor;

    // Do nothing if 'doAction' was triggered by save and 'removeOnSave' is set to false
    if (event === CONTEXT_SAVE && config.triggerOnSave !== true) { return; }

    // Do nothing if no open text editor
    if (!editor) { return; }

    // Do nothing if not valid language
    if (event !== CONTEXT_COMMAND && !isValidLanguage(editor.document.languageId)) { return; }

    // Select start and end lines
    var selection = editor.selection;
    var start = 1;
    var end = editor.document.lineCount;
    if (selection.start.line !== selection.end.line) {
        start = selection.start.line;
        end = selection.end.line;
    }

    // Select text
    var lines = selectLines(editor, start, end);

    // This where magic happens
    var processedLines = processLines(lines);

    // Do nothing if there is no change
    if (lines.map((line: vscode.TextLine) => line.text).join('\n') === processedLines.join('\n')) { return; }

    if (end !== editor.document.lineCount) {
        processedLines.push('');
    }

    // Format text
    editor.edit((edit) => {
        edit.replace(new vscode.Range(start, 0, end, 0), processedLines.join('\n'));
    });
}

export function activate(context: vscode.ExtensionContext) {
    // Initialize configuration
    readConfig();

    // Reload configuration on change
    vscode.workspace.onDidChangeConfiguration(readConfig);

    // Register command
    context.subscriptions.push(vscode.commands.registerCommand(`${NAME}.${COMMAND}`, () => doAction(CONTEXT_COMMAND)));

    // Listen for save event
    context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(() => doAction(CONTEXT_SAVE)));
}

export function deactivate() { }