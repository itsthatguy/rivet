# api-contracts

## Table of contents
- [Introduction](#introduction)
  - [The Problem](#the-problem)
  - [How it Works](#how-it-works)
  - [For example](#for-example)
- [Getting Started](#getting-started)
  - [Writing a Contract](#introduction)
  - [Writing Tests](#writing-tests)
  - [Publishing Contracts](publishing-contracts)
  - [Importing Contracts](importing-contracts)

## Introduction

We'd like to introduce a strategy for keeping your applications [communication layer, apis, etc..] in sync. The pattern we'll be talking about is based on [Consumer Driven Contracts](https://thoughtworks.github.io/pacto/patterns/cdc/).

The primary actors involved are the consumer and the producer:

* _Consumer_  — defines and publishes a contract using
[JSON Schema](http://json-schema.org/)
* _Producer_ — imports and satisfies a contract

## The Problem

Everyone today has responsibility over applications that consume multiple APIs. Trouble arises when you'd like to make a change to an API without breaking other consumers.

People use tools like API Blueprint or slacker or tests within the API's code itself to specify the requirements for an API. However, these tools and strategies do not account for the consuming applications that may break. You can change a test with the APIs codebase and not know whether you've broken any given consumer.

Our strategy reverses this paradigm. When we allow the consumer to specify the requirements for an API (or *producer*), we can make changes to an producer and know immediately which consumers are compatible with that change. ~~Additionally, we know when a version of an API can be retired, because we know when there are no more consumers of that API.~~

## How it Works

The _consumer_ maintains the contract for a given _producer_.

1. The _producer_ requires the contract, at a very specific version, from the _consumer_ from an npm package.
2. The _producer_ tests its API against the contract from the _consumer_.
3. If the contract tests fail, it means the contracts and the _consumer_ application need to be updated to ensure that the _consumer_ continues to work as expected.

![](https://cdn-images-1.medium.com/max/1600/1*EW21Eo9rnrHmOOBOXIFjaQ.png)

### For example

Your client is a _consumer_ app that defines the contract for its _producer_ app: The API server.

#### The client consumes the API

Changes to server *(or producer)* responses can potentially break the client *(or consumer)* without API developers knowing about the breaking changes. To prevent this, the *consumer* publishes a contract that it expects the API to satisfy. When the *producer* runs tests it verifies its responses will satisfy the *consumer’s* needs. If the responses don’t satisfy the *consumer's* needs, we know that the *consumer* won’t work as expected, after the changes are published.

