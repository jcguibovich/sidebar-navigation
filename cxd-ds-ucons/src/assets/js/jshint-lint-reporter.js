module.exports = {
  reporter: function (errors) {
    console.log(errors.length ? 'FAIL' : 'OK');
  }
};

/*
Each reporter file must expose one function, reporter, that accepts an array of errors. Each entry of this array has the following structure:

{
  file:        [string, filename]
  error: {
    id:        [string, usually '(error)'],
    code:      [string, error/warning code],
    reason:    [string, error/warning message],
    evidence:  [string, a piece of code that generated this error]
    line:      [number]
    character: [number]
    scope:     [string, message scope;
                usually '(main)' unless the code was eval'ed]

    [+ a few other legacy fields that you don't need to worry about.]
  }
}
And a real-world example:

[
  {
    file: 'demo.js',
    error:  {
      id: '(error)',
      code: 'W117',
      reason: '\'module\' is not defined.'
      evidence: 'module.exports = {',
      line: 3,
      character: 1,
      scope: '(main)',

      // [...]
    }
  },

  // [...]
]
*/
