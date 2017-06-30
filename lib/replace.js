"use babel";

export default async function replace(regex, replacePattern, replacementPaths) {
  const promise = await atom.workspace.replace(
    regex,
    replacePattern,
    replacementPaths,
    (result, error) => {
      if (result) {
        console.log("result", result);
      } else {
        console.log("error", error);
      }
    }
  );
  return promise;
}
