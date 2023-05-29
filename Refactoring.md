# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

I used ES6 compliant code structure to refactor the deterministicPartitionKey function. The ES6 version is very much more concise and readable, and I ensured proper formatting of the code so as to make it easy on the eyes.

Below are the details of the refactoring I did.

#### Original Code

```javascript
const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};


```

1. ##### Chains of If statements:
    The original code I was given had chains(nested) of ifs which can be difficult to read/understand

2. ##### Repeated code:
    The call to the createHash method of the crypto module was repeated, this is a redundant code that can be extracted into a helper function

3. ##### Variable declaration:
    The variable name candidate does not explicitly explain what or how it is used in code

#### Refactored Code

```javascript

import crypto from "crypto";

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

export const createSha3Hash = (data = "") => crypto.createHash("sha3-512").update(data).digest("hex");

export const deterministicPartitionKey = (event) => {

  let partitionKeyCandidate = !event ? TRIVIAL_PARTITION_KEY : (event.partitionKey || createSha3Hash(JSON.stringify(event)));

  partitionKeyCandidate = typeof partitionKeyCandidate === "string" ? partitionKeyCandidate : JSON.stringify(partitionKeyCandidate);

  partitionKeyCandidate = partitionKeyCandidate.length <= MAX_PARTITION_KEY_LENGTH ? partitionKeyCandidate : createSha3Hash(partitionKeyCandidate);

  return partitionKeyCandidate;
};


```

The refactored code is the ES6+ version of the original code. 

###NB:
It is important to underscore the fact that while the refactored code is more modern and concise, the original code can be considered to more explicit and might be easier to understand for less experienced developers or in a codebase that uses older conventions.

Here are the feature of the new code


1. ##### Es6 export and import:
    The refactored code is in ES6. The Es6 import/export syntax is used to replace the require syntax. This provides a more standardized and readable code

2. ##### Use of ES6 ternary operators:
    The chains(nested) of if statements in the orginal code was replaced by es6 ternary operators making the code much more brief and readable and easier to understand

3. ##### Use of a helper function:
    The call to the createHash method of the crypto module was abstracted in the new refactored code as a helper function. This conforms to the DO NOT REPEAT (D.R.Y) standards and engenders code reusabilty. It also reduces redundancy, makes the code more modular and readable

4. ##### Variable declaration:
    The let variable candidate was renamed to partitionKeyCandidate for better clarity

5. ##### Use of comments:
    I leveraged the use of comments to further enhance the readability of the code. I explained each line of code as clearly as possible. I also leveraged jsdoc which can be very useful for documentation purposes

 These improvements makes the code cleaner, more efficient, easier to understand, more maintainable.

## Other comments


1. #####  package.json file:
    I updated the test scripts and also added "type": "module" so that node.js interprets my files using the ES module syntax. I add --coverage to test script in order to measure the spread of the unit test I wrote

2. ##### File names:
    I renamed the files ```dpk.js``` and ```dpk.test.js``` to ```partitionKeyGenerator.js``` and ```partitionKeyGenerato.test.js``` respectively to reflect the funtionality of the code found within the file

3. ##### unit tests:
    I wrote unit tests for the helper function as well as the main functions. I made sure to cover 100% of the functions and the tests case also catered for edge cases within the confides of the original code

