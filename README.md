# Root Insurance Coding Problem

## Problem Statement

Can be found [here][1].

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

Concerning OOP vs. JS:
 - OOP is **NOT** idiomatic to JavaScript ( save prototypal inheritance )
 - Functional programming will be used as much as possible for this project, meaning:
   - as much encapsulation as possible
   

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
 1. Create a new branch with the above structure
 2. Create tests
 3. Dev.
 4. Run local tests
 5. locally `merge` into `master`

## Testing

To comply with my previous experience and Root Insurance's current practice of TDD, I will stray away from testing
practices I have come across when working with Universal ( Frontend and Backend ) JavaScript: which is regression
testing.

The testing done here will be integration testing only: as the constraints listed in the problem statement steer me away
from building out microservices ( a `gateway` for ingress and egress, `driver-service` & `trip-service` and a `broker`
for testing & pub./sub. ).  JS testing on a REST-API made with `bluebird` is usually done with `mocha` and `chai`.  I
have also used Selenium and `webdriver` for behavior based regression testing.

## Side Notes:

 - "JavaScript," or, "JS," are both used to refer to ECMAscript 6 and 7 in this doc.
 - The `"engines"` obj. in `package.json` specifies latest Carbon ( currently `8.15.1` ) or Dubnium ( currently
 `10.15.3` ) only because professional development should **ONLY** be done using active LTS versions of Node ( failing
 to do this in the past presented problems when microservices were built and shipped to dev. clusters )
 - variable and function names were kept as short but as readable as possible

[1]: https://gist.github.com/dan-manges/1e1854d0704cb9132b74
