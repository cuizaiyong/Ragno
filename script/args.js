function extractArgv(p) {
  const argv = p && p.argv;
  return argv.slice(2).map(option => {
    return replace(/-/g, '', option);
  })
}

function replace(reg, replaceContent, content) {
  return content.replace(reg, replaceContent);
}

exports.extractArgv = extractArgv;