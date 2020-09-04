module.exports.define = (module) =>
  require('amdefine')(module, (requirePath) => {
    let modifiedPath;

    if (requirePath.charAt(0) === '/') {
      const path = require('path');
      modifiedPath =
        './' + path.relative(__dirname, path.join('src', requirePath));
    } else {
      modifiedPath = requirePath;
    }

    return require(modifiedPath);
  });
