'use babel';

import statementPathsMap from './statementPathsMap';
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
    Object.keys(statementPathsMap).forEach(statement => {
      const paths = statementPathsMap[statement];
      replace(regex, '', paths);
    });
  }
}
