const changelog = require('conventional-changelog');
const parseUrl = require('github-url-from-git');
const commitStream = require('github-commit-stream');
const stream = require('stream');

const yamiToAngular = stream.Transform( { objectMode: true } );
yamiToAngular._transform = function(chunk, encoding, done) {
  const message = chunk.commit.message;
  
  //Replace uppercase
  message.replace(/$Chore/, 'chore');
  message.replace(/$Fix/, 'fix');
  message.replace(/$Docs/, 'docs');
  message.replace(/$Style/, 'style');
  message.replace(/$Refactor/, 'refactor');
  message.replace(/$Test/, 'test');
  
  //Abbreviate actual goddamn words
  message.replace(/$Feature/, 'feat');
  message.replace(/$Performance/, 'perf');
  
  done();
}

module.exports = function (pluginConfig, {pkg}, cb) {
  const repository = pkg.repository ? parseUrl(pkg.repository.url) : null;
  if (repository) {
    //Format: https://github.com/yamikuronue/release-notes-generator.git
    const re = /github.com\/([-\w]+)\/([-\w]+).git/;
    const matches = re.exec(repository);
    const commitStreamOpts = {
        token: process.env.GITHUB_TOKEN
      , user: matches[1]
      , repo: matches[2]
    };
    
    
  }
  
  const stream = commitStream(commitStreamOpts).pipe(yamiToAngular).pipe(changelog());
  stream.on('end', cb);
}
