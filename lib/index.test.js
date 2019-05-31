const {
  existsSync, readdirSync, readFileSync, statSync,
} = require('fs');
const { join } = require('path');

const Metalsmith = require('metalsmith');
const assertDir = require('assert-dir-equal');

const htaccess = require('./index');

const test = (dir, options) => {
  it(`should build the directory "${dir}"`, (done) => {
    Metalsmith(`${dir}`)
      .use(htaccess(options))
      .build((err) => {
        if (err) {
          done(err);
        }

        assertDir(`${dir}/expected`, `${dir}/build`, { filter: () => true });
        done();
      });
  });
};

describe('metalsmith-html-glob', () => {
  const dirs = p => readdirSync(p)
    .map(f => join(p, f))
    .filter(f => statSync(f).isDirectory());
  dirs('lib/fixtures').forEach((dir) => {
    const options = existsSync(`${dir}/options.json`) ? JSON.parse(readFileSync(`${dir}/options.json`).toString()) : null;
    test(dir, options);
  });
});
