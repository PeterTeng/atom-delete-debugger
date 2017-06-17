'use babel';

import extnameStatementMap from './extension-statement-map'

function extnameRegexpMapFn(extnameStatementMap) {
  const map = {};
  Object.keys(extnameStatementMap).forEach(ext => {
    const statement = extnameStatementMap[ext];
    const regexp = RegExp(statement, 'g');
    map[ext] = regexp;
  });
  return map;
}

async function regexpPathsMapFn() {
  const extnameRegexpMap = extnameRegexpMapFn(extnameStatementMap);

  const map = {};
  const promises = await Promise.all(
    Object.keys(extnameRegexpMap).map(async ext => {
      const regexp = extnameRegexpMap[ext];
      const filePath = await atom.workspace.scan(regexp, ({ filePath, matches }) => {
        const scanedExtname = path.extname(filePath);
        if (ext === scanedExtname) {
          if (map[regexp]) {
            map[regexp].push(filePath);
          } else {
            map[regexp] = [filePath];
          }
        }
      });
    })
  );
  return map;
}

export default regexpPathsMapFn;
