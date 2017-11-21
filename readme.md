# Chewie

[![Build Status](https://travis-ci.org/vanev/chewie.svg?branch=master)](https://travis-ci.org/vanev/chewie)
[![Maintainability](https://api.codeclimate.com/v1/badges/6187606a6b710dc6d4a2/maintainability)](https://codeclimate.com/github/vanev/chewie/maintainability)

`chewie` is your deploy co-pilot, here to make sure every deploy gets your cargo where it's going **safely** and **successfully**. Get some help from a pilot who's outrun Imperial Starships<sup>1</sup>.

## Features

- Prompts before `chewie` takes major actions, especially when dealing with production;
- Information about continuous integration builds as part of the deploy process;
- Warnings when deploying too recently after another deploy;

✨ **and more!** ✨

## Installation + Setup

```
yarn global add vanev/chewie
```

Ensure that you have a `CHEWIE_TRAVIS_GITHUB_TOKEN` in your environment set to a valid [Github Token](https://github.com/settings/tokens/new) with the following permissions: **admin:repo_hook**, **read:org**, **repo**, **user**.

## Usage

### `chewie deploy`

Deploys any git reference to any marketplace's environment.

- `-r, --reference` to deploy a specific branch, tag, sha or other git reference, defaults to the current branch.
- `-e <environment>` to deploy to a specific environment, defaults to "staging"
- `-m <marketplace>` to deploy to a specific marketplace, defaults to "grailed"; if "all", deploys to all marketplaces ("grailed", "heroine"), in parallel.

**NOTE:** Currently, `chewie deploy` assumes the remote name is `"${environment}-${marketplace}"`. I'm hoping to add a feature to allow this to be configurable.

### `chewie punchit`

Deploys local `master` branch to **production** environment for all marketplaces, in parallel. The same as running `chewie deploy -r master -e production -m all`.

---

<sup>1</sup> Not the local bulk cruisers mind you, I'm talking about the big Corellian ships now.
