'use babel';

import extnameStatementsMap from './extension-statement-map';

async function regexpPathsMap() {
  const _extnameRegexpMap = extnameRegexpMap(extnameStatementsMap);
  let _regexpPathsMap = {};
  const promises = Promise.all(
    Object.keys(_extnameRegexpMap).map(ext => {
      const regexp = _extnameRegexpMap[ext];
      _regexpPathsMap[regexp] = await scanFilePaths(regexp);
    });
  );
  console.log('_regexpPathsMap', _regexpPathsMap);
  return _regexpPathsMap;
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
