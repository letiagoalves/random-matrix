# random-matrix
Pseudo random number generator for matrix coordinates


This package allows an easy way to create PRNG (pseudo random number generators) to work with matrixes.
For example, in game development context there is the case where we need to generate random items in map positions.
These map positions are defined by a pair of coordinates and should generate always the same value when using the same seed.
See usage examples below:

#### Usage

```
npm install random-matrix
```

```javascript
var randomMatrix = require('random-matrix');
var seed1 = 123;
var seed2 = 456;

var generator1 = randomMatrix(seed1);
var generator2 = randomMatrix(seed2);

generator1.rand(0, 0) === generator1.rand(0, 0);
generator1.rand(0, 0) !== generator2.rand(0, 0);
generator2.rand(0, 0) === generator2.rand(0, 0);

generator1.rand(1, 2) !== generator1.rand(2, 1);
generator1.rand(1, 2) === generator2.rand(1, 2);
```

#### License
Released under the MIT License.
