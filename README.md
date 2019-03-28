# Root Insurance Coding Problem

## Problem Statement

Can be found [here][1].

## Prerequisites

Install either latest Node.js [Dubnium][2] or [Carbon][3] ( both are active [Node.js LTS][4] ).

That's it!  No `npm install` required ( optional for ESLint ).

## Usage

### Run main:

```
npm start ./test/input.txt
```

or 

```
cat ./test/input.txt | npm start
```

### Run tests:

```
npm test
```

## Architecture

Following the guidelines from the problem statement, my solution should not:
 - persist any data
 - YAGNI: **Y**ou **A**ren't **G**oing to **N**eed **I**t
 - Handle anything unmentioned from the problem statement
 
Which, through the lens of idiomatic JavaScript, means:
 - absence of NoSQL for event-based data ( trips )
 - absence of SQL for relational data ( drivers )
 - minimal use of NPM packages: anti-pattern for most JS developers
 - no CI/CD
 - no building ( i.e. Docker images ) or external run tools
 
However, I chose to add `standard` as a dev. dependency to be as idiomatic to JavaScript as possible.  We currently use
a custom `.eslint` with rules we all agreed upon, so taking this step should be a positive learning experience for me.

## Concerning OOP vs. JS
 - OOP is **NOT** idiomatic to JavaScript ( save prototypal inheritance )
 - Functional programming will be used as much as possible for this project, meaning:
   - as much encapsulation as possible
   - `.map().reduce()` and `.forEach()` instead of a `for. .of` loop
   - terenary operators ( `? :` ) can provide clean `return` values for func.
   
**Note**: I attempted to make use of newer ES6 features in this repo., such as:
 - ES6 destructuring ( for objects and arrays )
 - spread syntax: `...`

The initial commit for this repository shows the idiomatic scaffolding for JS-based backend applications:

```
src/
test/
server.js
package.json
package-lock.json
```

Providing a streamlined build procress ( `docker build .` with a properly organized `Dockerfile` ).
Scaffolding for `src/` and `test/` to be revealed later.

Plans, in order, from this commit onward:
 1. Traditional `"Hello world!"` output
 2. Build out test runner
 3. Accept input from either a command line arg. or `stdin`
 4. Accept correct `"Driver"` command
 5. Handle incorrect `"Driver"` commands
 6. Accept correct `"Trip"` command
 7. Handle incorrect `"Trip"` commands
 8. Output correct report
 9. Handle incorrect commands ( anything other than `"Driver"` or `"Trip"` )

### Why native `Promise` wrappers?

 - Using `bluebird`'s `Promise` constructor has been idiomatic since ES5
 - I don't have to import `bluebird` if I'm only using native promises

The use of Promises and `async`/`await` is core to backend JS dev. and the core API functions ( pre 1.0.0 ) _are_
 async. in nature, but **don't** return a `Promise <pending>`.  Say newer developers were brought on to work with me on
 this project: they would expect the: 
 
```
const someFunc = () => promisifiedFunc().then(result => something(result).catch(err => err) )
```

or

```
const someFunc = async () => {
  let result

  result = await promisifiedFunc()
    .then(result => { if someCompare(result) return err })

  return something(result)
}
```

patterns.  Simple, functional JS doesn't need to fall back on an `async`/`await` patten; yet, more complex functions
would require it for readability.

### Accepting Input

The app. will be able to accept input via:
 - command line arg. ( e.g. `npm start ./test/input.txt` )
   - "promisified," reading files with `util`
   - the file will be read when the `Promise` is called to be will `resolve`d
   - the file reading happens all at once
 - `stdin`
   - truly async
   - works with each line asynchronously ( using a listener for each `` `line` `` event )
   - on a `` `close` `` event, can call another func. ( returns input text for now )
 
This was done to show how I work with core API functions.  While `await`ing a `Promise` ( which is done when an
enumerable `.then(() => {})` is called on a, "promisified," func. ) is blocking, most of the reading, writing, logic and
report ( or final result ) creation will happen within that `Promise`.  This makes a majority of the app. non-blocking:
something I am using to dealing with when building out backend microservies.

**Note**: that passing the entire `process.stdin` is essential:
the state of `process.stdin` or `process.stdout` can change during the handoff from calling `utils.acceptInput()` to
calling either `acceptCommandLineArg()` or `acceptStdIn()`

### Drivers

Because data shouldn't be persisted to disk for this exercise, I initially wanted to model data storage after Mongo
`collections`.  However, the `driverStore` would only have keys without values; i.e. only a driver's name; `Set`s are
much faster and require less memory than generating an `Array` of `Object` literals: [shown here][6].

**Note**: keeping a reference to a `Set` with drivers in `./src/utils`, calling referenced func. asynchronously and then
passing a result back to `server.js` is in-line with the `{ req, res, next }` that are all passed from authentication to
authorization to middleware checks to a function found in `./src/routes`. 

### Versioning

Found in `./package.json`.

If α.β.ω denotes a version:
 - α being the major version ( will only go from `0` to `1` in our case )
 - β being the minor version
 - ω being the patch version
 
then each branch off `master` will increment β by `1` and each `commit` will increment ω by `1`.

**Note**: In practice, each `commit` _wouldn't_ justify incrementing ω by `1`, I felt that this was good practice.

## Branching

Branching and merging is an essential part of any team's workflow ( Agile or Kanban; I have experience with both ) when
building out new features, fixing bugs that somehow made it into the dev. cluster, or hotfixes that need to be pushed up
to QA or production clusters.
Steps, in order:
 1. Before any development starts, requirements must be gathered for the developer
 2. Once req. are agreed upon, developer pulls latest `master` for each repo.
 3. Branch using the following structure: `{ feature|defect|hotfix }/{ issue or feature number }/{
 issue or feature description }`
 4. Creation of tests
 5. Development
 6. Passing local testing
 7. Creation of a MR/PR
 8. After review by peers ( and testing by CI/CD ), merge into `master`
 
For this project, I am only able to:
 1. Create a new branch as: `feature/{ feature name }`
 2. Create tests
 3. `commit`
 4. Dev.
 5. Run local tests
 6. `commit` again
 7. locally `merge` into `master`

## Testing

To comply with my previous experience and Root Insurance's current practice of TDD, I will stray away from testing
practices I have come across when working with Universal ( Frontend and Backend ) JavaScript: which is regression
testing.

The testing done here will be integration testing only: as the constraints listed in the problem statement steer me away
from building out microservices ( a `gateway` for ingress and egress, `driver-service` & `trip-service` and a `broker`
for testing & pub./sub. ).  JS testing on a REST-API made with `bluebird` is usually done with `mocha` and `chai`.  I
have also used Selenium and `webdriver` for behavior based regression testing.

### Test Architecture

The main runner `test.runner()` is implemented in `./test/test.js` with it and all other helpers defined in
`./test/utils/*` and expected results from `./test/data.js`.  This scaffolding matches idiomatic `mocha` and `chai`
testing.  It takes in an array of objects with the following key/value pair:

```
{
  "command": string
  "expected": {
    "data": string,
    "pass": boolean
  }
}
```

If the main test runner is expecting `Error`s from the main app ( e.g. if some `./test/input.txt` contains an improper
`"Driver""` command ) then it needs to format the output and remove the stack ( which isn't needed for automated
testing, but might be useful later or during manual testing ).

A `spawn` subprocess is superior to an `exec`-based one, because of the 200KB buffer limit on the latter ( _yes_, I
_**have**_ learned this the hard way ).

`compare()` uses a direct string comparison ( `stringOne === stringTwo` ) instead of `.localCompare()`.  [Here's why]
[6].

## Error Handling

Errors based on user error ( `400`s when dealing with a REST API ) should _not_ be fatal or unrecoverable.  For the
purposes of this app., errors should be given during output ( `"Error": { message, stack }` ) and _not_ halt or block
any other async. calls made.  Errors on behalf of the program ( `500`s if dealing with a REST API ) either return an
`Error` obj. or are caught during an async `await`/`Promise.resolve()` call should halt all proceeding async. calls.

**Note**: `error.promise()` was introduced as a bugfix in order to prevent stalling on `stdin` if no input is given; i.e.
IFF:

```
npm start
``` 

or

```
node server.js
``` 

The error handler here ( `./src/lib/error.js` ) is placed idiomatically, but should be more complex if this was built
out as a REST API ( e.g. return `error.type` and other properties in JSON res. ). 

In order to aid in debugging, the main log func. ( `log()` ) was given a helper ( `logHelper()` ) to deal with test
failures: by logging each line of `expected` alongside each line of `actual`.  `mocha`/`chai` do this natively with HTTP
codes ( e.g. receiving a `404` instead of a `200` or `204` during testing ).

## Side Notes:

 - "JavaScript," or, "JS," are both used to refer to either  ECMAscript 6 and 7 in this doc.
 - The `"engines"` obj. in `package.json` specifies latest Carbon ( currently `8.15.1` ) or Dubnium ( currently
 `10.15.3` ) only because professional development should **ONLY** be done using active LTS versions of Node ( failing
 to do this in the past presented problems when microservices were built and shipped to dev. clusters )
 - variable and function names were kept as short but as readable as possible
 - The test runner ( `test.runner()` ) could execute any command in a shell of your choosing ( change in
 `./src/configuration/config.js` )
 - Took the use of "✓" from `mocha` 
 - In this `README.md` and throughout the codebase, you may notice the 120 char. max line width I code by
 - I am aware of all of the dependencies of `standard`: however, you _should_ be able to run the main `server.js` file and the
 test runner without an `npm install`
 - Because `process.stdin` is fed into our main func. ( `utils.acceptInput()` ), we can analyze it at any time without a
 change of state; in other words, and because either `stdin` or a command line arg. can be given, using a terenary
 operator I can easily decipher blank `stdin` without scanning `/dev/null` using the `process.stdin.isTTY` property (
 `stdin` is of type `Pipe` when piping a command through, and type `TTY` when run with a command line arg. )
 - Func. are sorted in a file first in alphabetical order, then the order in which they are referenced by above func.
 for readability

[1]: gist.github.com/dan-manges/1e1854d0704cb9132b74
[2]: nodejs.org/dist/v10.15.3/
[3]: nodejs.org/dist/v8.15.1/
[4]: nodejs.org/en/about/releases/
[5]: stackoverflow.com/a/46190569/5963316
[6]: jsperf.com/localecompare/2
