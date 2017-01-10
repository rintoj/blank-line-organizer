'use strict';

// import vscode
import * as vscode from 'vscode';

// constance
const NAME = 'blankLine';
const COMMAND = 'process';
const CONTEXT_SAVE = 'save';
const CONTEXT_COMMAND = 'command';

// configuration definition
interface ExtensionConfig {
    keepOneEmptyLine?: boolean;
    triggerOnSave?: boolean;
    insertLineAfterBlock?: boolean;
    languageIds?: string[];
}

// default configuration
let config: ExtensionConfig = {
    keepOneEmptyLine: true,
    triggerOnSave: true,
    insertLineAfterBlock: true,
    languageIds: ['javascript', 'typescript', 'json']
};

// read extension configuration
function setDefaultConfig() {
    // vscode.workspace.getConfiguration('editor').
}

// read extension configuration
function readConfig() {
    let settings = vscode.workspace.getConfiguration(NAME);
    config = Object.assign({}, config, settings);
}

// check for language validity
function isValidLanguage(languageId) {
    if (config == undefined || !(config.languageIds instanceof Array) || config.languageIds.length === 0) return true;
    return config.languageIds.find(id => id.toLowerCase() === languageId.toLowerCase()) != undefined;
}

// remove empty lines
function processLines(content) {
    if (config.insertLineAfterBlock) {
        content = (content || '').replace(/\}[\s\t]*\n+/gm, '}\n\n');
        content = (content).replace(/\}[\s\t]*;[\s\t]*\n+/gm, '};\n\n');
    }
    return (content || '').replace(/\n[\s\t]*\n+/gm, (config.keepOneEmptyLine !== true) ? '\n' : '\n\n');
}

function doAction(event) {

    console.log('doAction', event);

    // get active text editor
    var editor = vscode.window.activeTextEditor;

    // do nothing if 'doAction' was triggered by save and 'removeOnSave' is set to false
    if (event === CONTEXT_SAVE && config.triggerOnSave !== true) return;

    // do nothing if no open text editor
    if (!editor) return;

    // do nothing if not valid language
    if (event !== CONTEXT_COMMAND && !isValidLanguage(editor.document.languageId)) return;

    // identify selection
    let selection: any = editor.selection;
    if (selection.start.line === selection.end.line &&
        selection.start.character === selection.end.character) {
        selection = new vscode.Range(1, 1, editor.document.lineCount, 1);
    }

    // select text
    var text = editor.document.getText(selection);
    var processedLines = processLines(text);

    // do nothing if no change
    if (processedLines === text) return;

    // format text
    editor.edit((edit) => {
        edit.replace(selection, processedLines);
    });
}

// when extension is activated
export function activate(context: vscode.ExtensionContext) {

    // initialize configuration
    readConfig();

    // reload configuration on change
    vscode.workspace.onDidChangeConfiguration(readConfig);

    // register 'emptyLine.remove' command
    context.subscriptions.push(vscode.commands.registerCommand(`${NAME}.${COMMAND}`, () => doAction(CONTEXT_COMMAND)));

    // listen for save event
    context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(() => doAction(CONTEXT_SAVE)));
}

// when extension is deactivated
export function deactivate() { }