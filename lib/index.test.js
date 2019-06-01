const {
  existsSync, mkdirSync, readdirSync, readFileSync, statSync,
} = require('fs');
const { join } = require('path');

const Metalsmith = require('metalsmith');
const assertDir = require('assert-dir-equal');

const htaccess = require('./index');

const test = (dir, options) => {
  it(`should build the directory "${dir}"`, (done) => {
    // Allow src directory to not exist / be empty and not committed
    if (!existsSync(`${dir}/src`)) {
      mkdirSync(`${dir}/src`);
    }

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

describe('metalsmith-htaccess', () => {
  const dirs = p => readdirSync(p)
    .map(f => join(p, f))
    .filter(f => statSync(f).isDirectory());
  dirs('lib/fixtures').forEach((dir) => {
    const options = existsSync(`${dir}/options.json`) ? JSON.parse(readFileSync(`${dir}/options.json`).toString()) : null;
    test(dir, options);
  });
});
