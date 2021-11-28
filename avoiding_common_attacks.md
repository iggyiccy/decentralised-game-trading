# Avoid Common Attacks

In order to aviod some of the common smart contract attacks, we had tried to
identify and test against the below attacks/pitfalls. Details of the test can be
found in the [testing folder](./test/simplestorage.js).

## Solidity Pitfalls and Attacks

### Using Specific Compiler

It is tend to be more secure if deploy contract using a specific version of
solidity compiler pragma. We had choosen to use version 8.4.0 here.

### Using Require, Assert and Revert

When executing the function, ...

## Smart Contract Pitfalls and Attacks

### Use of Timestamp

There is a timestamp for the xxx function in order to prevent user from
withdrawing deposit before certain time period to game the smart contract.
