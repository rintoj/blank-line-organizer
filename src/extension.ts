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
function processLines(lines: vscode.TextLine[]): string[] {
  return (lines || [])
    .reduce((a, line) => {
      let prevLine: vscode.TextLine = a.slice(-1)[0]
      if (prevLine && prevLine.isEmptyOrWhitespace && line.isEmptyOrWhitespace) return a
      if (config.keepOneEmptyLine !== true && line.isEmptyOrWhitespace) return a
      return a.concat([line])
    }, [])
    .map((line: vscode.TextLine) => line.text)
}

function selectLines(editor: vscode.TextEditor, start, end) {
  var lines = []
  for (let lineIndex = start; lineIndex < end; lineIndex++) {
    lines.push(editor.document.lineAt(lineIndex));
  }
  return lines;
}

function doAction(event) {

  // get active text editor
  var editor = vscode.window.activeTextEditor;

  // do nothing if 'doAction' was triggered by save and 'removeOnSave' is set to false
  if (event === CONTEXT_SAVE && config.triggerOnSave !== true) return;

  // do nothing if no open text editor
  if (!editor) return;

  // do nothing if not valid language
  if (event !== CONTEXT_COMMAND && !isValidLanguage(editor.document.languageId)) return;

  // select start and end lines
  var selection = editor.selection;
  var start = 1
  var end = editor.document.lineCount
  if (selection.start.line !== selection.end.line) {
    start = selection.start.line
    end = selection.end.line
  }

  // select text
  var lines = selectLines(editor, start, end)

  // this where magic happens
  var processedLines = processLines(lines);

  if (end != editor.document.lineCount) {
    processedLines.push('')
  }

  // format text
  editor.edit((edit) => {
    edit.replace(new vscode.Range(start, 0, end, 0), processedLines.join('\n'));
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