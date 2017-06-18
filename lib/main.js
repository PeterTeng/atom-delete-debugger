'use babel';

import statementPathsMapFn from './regexp-paths-map';
import replace from './replace';

export async function deleteAllDebuggers() {
  const deletableStatementsForMessage = atom.config.get('atom-delete-debugger.debuggerStatements').join(', ');
  const message = `This will delete ${deletableStatementsForMessage} from this project`;

  const buttonChosen = atom.confirm({
    message: 'Are you sure you want to delete all debugger statements?',
    detailedMessage: message,
    buttons: ['OK', 'Cancel']
  });

  if (buttonChosen === 0) {
    const _statementPathsMap = await statementPathsMapFn();
    console.log('_statementPathsMap', _statementPathsMap);

    const promises = await Promise.all(
      Object.keys(_statementPathsMap).map(async statement => {
        const paths = _statementPathsMap[statement];
        statement = '^' + statement + ';?$';
        const regexp = RegExp(statement, 'g');
        await replace(regexp, '', paths);
      })
    )
  }
  }
