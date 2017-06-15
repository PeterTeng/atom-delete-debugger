'use babel';

import extnameStatementsMap from './extension-statement-map';

async function statementPathsMap() {
  const regex = statementToRegex();
  const filePaths = await scanFilePaths(regex);
  const _extnamePathsMap = extnamePathsMap(filePaths);
  console.log('_extnamePathsMap', _extnamePathsMap);

  let map = {};
  getTargetExtensions().forEach(ext => {
    _extnamePathsMap[ext].forEach(path => {
      if (map[ext]) {
        map[ext].push(path);
      } else {
        map[ext] = [path];
      }
    });
  });
  return map;
}

function extnamePathsMap(filePaths) {
  console.log('filePaths', filePaths);
  const ret = filePaths.reduce((_path, _hash) => {
    let extname = path.extname(_path);
    if (_hash[extname]) {
      _hash[extname].push(_path);
    } else {
      _hash[extname] = [_path];
    }
    return _hash;
  }, {});
  console.log('ret', ret);
  return ret;
}

async function scanFilePaths(regex) {
  const filePaths = [];
  const promise = await atom.workspace.scan(regex, ({ filePath, matches }) => {
    filePaths.push(filePath);
  });
  return filePaths;
}

function statementToRegex() {
  let statementSet = new Set();
  Object.keys(extnameStatementsMap).forEach((key) => {
    statementSet.add(extnameStatementsMap[key]);
  });
  let regexString = Array.from(statementSet).join('|');
  return RegExp(regexString, 'g');
}

function getTargetExtensions() {
  return ['.jsx', '.js', '.rb'];
}

export default statementPathsMap();