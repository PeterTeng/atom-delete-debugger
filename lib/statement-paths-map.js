// 1. Get extnameRegexpMap
// 2. extnameRegexpMapのregexごとにPathsを取得する。 ==> regexpPathsがつくれる
// last. regexpPathMapを作成
'use babel';

import extnameStatementsMap from './extension-statement-map';

async function regexpPathsMap() {
  const _extnameRegexpMap = extnameStatementsMap(extnameStatementsMap);
}

async function __regexpPathsMap() {
  const regex = statementToRegex();
  const filePaths = await scanFilePaths(regex);
  const _extnamePathsMap = extnamePathsMap(filePaths);

  let map = {};
  getTargetExtensions().forEach(ext => {
    const paths = _extnamePathsMap[ext];
    if (!paths) { return; }

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
  const ret = filePaths.reduce((_hash, _path) => {
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

function _statementToRegex() {
  let statementSet = new Set();
  Object.keys(extnameStatementsMap).forEach((key) => {
    statementSet.add(extnameStatementsMap[key]);
  });
  let regexString = Array.from(statementSet).join('|');
  return RegExp(regexString, 'g');
}

function extnameRegexpMap(extnameStatementsMap) {
  let map = {};
  Object.keys(extnameStatementsMap).forEach(extname => {
    const statements = extnameStatementsMap[extname];
    const regexString = statements.join('|');
    map[extname] = RegExp(regexString, 'g');
  });
  return map;
}

function getTargetExtensions() {
  return ['.jsx', '.js', '.rb'];
}

export default regexpPathsMap;
