'use babel';

import regexpPathsMapFn from './regexp-paths-map';
import replace from './replace';

export default async function deleteAllDebuggers() {
  const deletableStatementsForMessage = atom.config.get('atom-delete-debugger.debuggerStatements').join(', ');
  const message = `This will delete ${deletableStatementsForMessage} from this project`;

  const buttonChosen = atom.confirm({
    message: 'Are you sure you want to delete all debugger statements?',
    detailedMessage: message,
    buttons: ['OK', 'Cancel']
  });

  if (buttonChosen === 0) {
    const _regexpPathsMap = await regexpPathsMapFn();
    console.log('_regexpPathsMap', _regexpPathsMap);

    const promises = await Promise.all(
      Object.keys(_regexpPathsMap).map(async regexp => {
        const paths = _regexpPathsMap[regexp];
        await replace(regexp, '', paths);
      })
    )
  }
}
