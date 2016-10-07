const changelog = require('conventional-changelog');
const fs = require('fs');

const yamiToAngular = function(commit, cb) {
  
  //Replace uppercase
  commit.type = commit.type.toLowerCase();
  
  //Abbreviate actual goddamn words
  if (commit.type === 'feature') {
    commit.type = 'feat';
  } else if (commit.type === 'performance') {
    commit.type = 'perf';
  }
  
  cb(null, commit);
}

module.exports = function (pluginConfig, pkg, cb) {
  const wstream = fs.createWriteStream('changelog.md');
  
  const stream = changelog({
    preset: 'angular',
    transform: yamiToAngular
  });
  
  stream.pipe(wstream);
  
  stream.on('end', cb);
}