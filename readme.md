# Chewie

[![Build Status](https://travis-ci.org/vanev/chewie.svg?branch=master)](https://travis-ci.org/vanev/chewie)

`chewie` is your deploy co-pilot, here to make sure every deploy gets your cargo where it's going **safely** and **successfully**. Get some help from a pilot who's outrun Imperial Starships<sup>1</sup>.

## Features

- Prompts before `chewie` takes major actions, especially when dealing with production;
- Information about continuous integration builds as part of the deploy process;
- Warnings when deploying too recently after another deploy;

✨ **and more!** ✨

## Installation + Setup

```
yarn add -g chewie
```

## Usage

### `chewie deploy`

Deploys any git reference to any marketplace's environment.

- `-r, --reference` to deploy a specific branch, tag, sha or other git reference, defaults to the current branch.
- `-e <environment>` to deploy to a specific environment, defaults to "staging"
- `-m <marketplace>` to deploy to a specific marketplace, defaults to "grailed"

**NOTE:** Currently, `chewie deploy` assumes the remote name is `"${environment}-${marketplace}"`. I'm hoping to add a feature to allow this to be configurable.

---

<sup>1</sup> Not the local bulk cruisers mind you, I'm talking about the big Corellian ships now.
