'use babel';

import extensionStatementMap from './extension-statement-map';
import extensionCommentoutMap from './extension-commentout-map';
import statementPathsMapFn from './regexp-paths-map';
import replace from './replace';

export async function deleteAllDebuggers() {
  const deletableStatementsForMessage = atom.config
    .get('atom-delete-debugger.debuggerStatements')
    .join(', ');
  const message = `This will delete ${deletableStatementsForMessage} from this project`;

  const buttonChosen = atom.confirm({
    message: 'Are you sure you want to delete all debugger statements?',
    detailedMessage: message,
    buttons: ['OK', 'Cancel'],
  });

  if (buttonChosen === 0) {
    const statementPathsMap = await statementPathsMapFn();
    await Promise.all(
      Object.keys(statementPathsMap).map(async (statement) => {
        const paths = statementPathsMap[statement];
        const s = `^\\s*${statement};?$`;
        const regexp = RegExp(s, 'g');
        await replace(regexp, '', paths);
      }),
    );
  }
}

export async function deleteFromCurrentPath() {
  const editor = atom.workspace.getActiveTextEditor();
  const currentBuffer = editor.buffer;
  const filePath = currentBuffer.file.path;
  const extname = path.extname(filePath);
  let statement = extensionStatementMap[extname];

  const message = `This will delete ${statement} from current path`;

  const buttonChosen = atom.confirm({
    message: `Are you sure you want to delete ${statement} in current file?`,
    detailedMessage: message,
    buttons: ['OK', 'Cancel'],
  });

  if (buttonChosen === 0) {
    statement = `^\\s*${statement};?$`;
    const regexp = RegExp(statement, 'g');
    console.log('regexp', regexp);
    await replace(regexp, '', [filePath]);
  }
}

export async function commentoutFromCurrentPath() {
  const editor = atom.workspace.getActiveTextEditor();
  const currentBuffer = editor.buffer;
  const filePath = currentBuffer.file.path;
  const extname = path.extname(filePath);
  const commentout = extensionCommentoutMap[extname];
  const statement = extensionStatementMap[extname];

  const message = `This will delete ${statement} from current path`;

  const buttonChosen = atom.confirm({
    message: `Are you sure you want to comment out ${statement} from current file?`,
    detailedMessage: message,
    buttons: ['OK', 'Cancel'],
  });

  if (buttonChosen === 0) {
    const statementReg = `^\\s*${statement};?$`;
    const regexp = RegExp(statementReg, 'g');
    console.log('regexp', regexp);
    await replace(regexp, `${commentout} ${statement}`, [filePath]);
  }
}
