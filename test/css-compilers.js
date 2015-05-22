require('./support.js');

import path from 'path';

const toTest = [
  { require: '../lib/css/less', extension: 'less' },
  { require: '../lib/css/scss', extension: 'scss' },
  { require: '../lib/css/scss', extension: 'sass' },
];

for (let compiler of toTest) {
  const Klass = require(compiler.require);

  describe(`The ${compiler.require} compiler`, function() {
    it(`should compile valid.${compiler.extension}`, function() {
      let fixture = new Klass();

      let input = path.join(__dirname, '..', 'test', 'fixtures', `valid.${compiler.extension}`);
      fixture.getCachedJavaScript = () => null;
      fixture.saveCachedJavaScript = () => {};
      fixture.getCachePath = () => 'cache.txt';

      let result = fixture.loadFile(null, input, true);
      expect(result.length > 0).to.be.ok;
    });

    it(`should fail on invalid.${compiler.extension}`, function() {
      let fixture = new Klass();

      let input = path.join(__dirname, '..', 'test', 'fixtures', `invalid.${compiler.extension}`);
      fixture.getCachedJavaScript = () => null;
      fixture.saveCachedJavaScript = () => {};
      fixture.getCachePath = () => 'cache.txt';

      let shouldDie = true;
      try {
        let result = fixture.loadFile(null, input, true);
        console.log(result);
      } catch (e) {
        shouldDie = false;
      }

      expect(shouldDie).not.to.be.ok;
    });
  });
}