const Mocha = require('mocha');
const { EVENT_TEST_BEGIN, EVENT_TEST_END, EVENT_SUITE_BEGIN, EVENT_SUITE_END } = Mocha.Runner.constants;
const Mochawesome = require('mochawesome');
const _ = require('lodash');

class CustomMochawesome extends Mochawesome {
  constructor(runner, options) {
    super(runner, options);

    const suiteType = options.reporterOptions.suiteType;

    runner
      .once(EVENT_SUITE_BEGIN, () => {
        this.rootSuite = runner.suite;
      })
      .on(EVENT_SUITE_BEGIN, (suite) => {
        suite = _.cloneDeep(suite);
        suite.suites = [];
        suite.tests = [];
        suite.hooks = [];
        suite.suiteType = suiteType;
      })
      .on(EVENT_SUITE_END, (suite) => {
        if (!suite.root) {
          suite = _.cloneDeep(suite);
          suite.parent.suites.push(suite);
        }
      })
      .on(EVENT_TEST_BEGIN, (test) => {
        test = _.cloneDeep(test);
        test.parent.tests.push(test);
      })
      .on(EVENT_TEST_END, (test) => {
        test = _.cloneDeep(test);
        test.parent.tests.push(test);
        if (test.ctx && test.ctx.grepTags) {
          test.grepTags = test.ctx.grepTags;
        }
      });
  }
}

module.exports = CustomMochawesome;
