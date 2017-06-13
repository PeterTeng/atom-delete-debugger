'use babel';

import extnameStatementMap from './extension-statement-map';
import replace from './replace';

function getTargetExtensions() {
  return ['.jsx', '.js', '.rb'];
}

function extnamePathsMap(filePaths) {
  return filePaths.reduce((path, hash) => {
    let extname = path.extname(path);
    if (hash[extname]) {
      hash[extname].push(path);
    } else {
      hash[extname] = [path];
    }
    return hash;
  }, {})
}

function statementToRegex() {
  let statementSet = new Set();
  Object.keys(extnameStatementMap).forEach((key) => {
    statementSet.add(extnameStatementMap[key]);
  });
  let regexString = Array.from(statementSet).join('|');
  return RegExp(regexString, 'g');
}

async function scanFilePaths(regex) {
  const filePaths = [];
  const promise = await atom.workspace.scan(regex, ({ filePath, matches }) => {
    filePaths.push(filePath);
  });
  return filePaths;
}

function statementPathsMap(extnamePathsMap) {
  let map = {};
  getTargetExtensions().forEach(ext => {
    extnamePathsMap[ext].forEach(path => {
      if (map[ext]) {
        map[ext].push(path);
      } else {
        map[ext] = [path];
      }
    });
  });
  return map;
}

export default async function deleteAllDebuggers() {
  const regex = statementToRegex();
  const filePaths = scanFilePaths(regex);
  const _extnamePathsMap = extnamePathsMap(filePaths);
  const statementPathsMap = statementPathsMap(_extnamePathsMap);

  const deletableStatements = atom.config.get('atom-delete-debugger.debuggerStatements').join(', ');
  const message = `This will delete ${deletableStatements} from this project`;

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
