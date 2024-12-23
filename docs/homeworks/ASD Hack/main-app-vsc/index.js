// src/extension.ts
import * as vscode from 'vscode';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

function activate(context) {
  let panel = undefined;

  let disposable = vscode.commands.registerCommand('experiments_editor.showFileLength', () => {
    if (!panel) {
      panel = vscode.window.createWebviewPanel(
        'fileLength',
        'File Length',  
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
        }
      );

      panel.onDidDispose(
        () => {
          panel = undefined;
        },
        null,
        context.subscriptions
      );

        // Handle messages from the webview
        panel.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'alert':
                        vscode.window.showErrorMessage(message.text);
                        return;
                }
            },
            undefined,
            context.subscriptions
        );

    }

    updateWebviewContent(panel, vscode.window.activeTextEditor);


        vscode.window.onDidChangeActiveTextEditor(editor => {
            updateWebviewContent(panel, editor);
        });

        vscode.workspace.onDidChangeTextDocument(event => {
            if (vscode.window.activeTextEditor && event.document === vscode.window.activeTextEditor.document) {
                updateWebviewContent(panel, vscode.window.activeTextEditor);
            }
        });

  });

  context.subscriptions.push(disposable);
}

function updateWebviewContent(panel, editor) {
    if (!panel) {
        return;
    }

    let length = 0;
    if (editor && editor.document) {
        length = editor.document.getText().length;
    }

  panel.webview.html = getWebviewContent(length);
}

function getWebviewContent(length) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Length</title>
</head>
<body>
    <div id="root"></div>
    <script>
      (function() {
        const vscode = acquireVsCodeApi();

        function render() {
          const element = React.createElement('div', null, 'File Length: ${length}');
          ReactDOM.render(element, document.getElementById('root'));
        }

        render();

      }())
    </script>
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
</body>
</html>`;
}

export function deactivate() {}

export { activate };