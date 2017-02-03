# careercup-cli

[![npm version](https://img.shields.io/npm/v/careercup-cli.svg?style=flat)](https://www.npmjs.com/package/careercup-cli)
[![license](https://img.shields.io/npm/l/careercup-cli.svg?style=flat)](https://github.com/skygragon/careercup-cli/blob/master/LICENSE)
[![Build](https://img.shields.io/travis/skygragon/careercup-cli.svg?style=flat)](https://travis-ci.org/skygragon/careercup-cli)

A cli tool to enjoy careercup questions!

Inspired by [leetcode-cli](https://github.com/skygragon/leetcode-cli)

## Why you need it?

* Questions are saved [**offline**](https://github.com/skygragon/careercup-cli/blob/master/doc/advanced.md#caching).
* Easely [**browsing**](https://github.com/skygragon/careercup-cli/blob/master/doc/commands.md#show) and [**searching**](https://github.com/skygragon/careercup-cli/blob/master/doc/commands.md#list) questions, by different criteria.
* You can [**mark**](https://github.com/skygragon/careercup-cli/blob/master/doc/commands.md#mark) questions with different labels, build up your own categoies and groups.
* [**Statistics**](https://github.com/skygragon/careercup-cli/blob/master/doc/commands.md#stat) support, to help trace your personal progress.
* One-click [**update**](https://github.com/skygragon/careercup-cli/blob/master/doc/commands.md#update) with the latest questions.

## Install

From npm repo:

    $ sudo npm install -g careercup-cli

From source code:

    $ git clone http://github.com/skygragon/careercup-cli
    $ cd careercup-cli && npm install && sudo nom install -g .

## Best Practice

By the way, `c3` = `C`areer`C`up-`C`li

	Read help first                    $ c3 help
	Update all questions               $ c3 update
	Browse questions                   $ c3 list
	Select one question                $ c3 show <id>
	Or, select random question         $ c3 show
	Or, select Google question         $ c3 show -c google
	Resovle it!
	Mark question as done!             $ c3 mark <id>

Feel free to customize your own labels to manage different questions.

	To those working on questions		$ c3 mark <id> thinking
	To those unimportant questions		$ c3 mark <id> easy
	Show questions with given label		$ c3 list -l thinking

## There is More...

* [Commands Tutorial](https://github.com/skygragon/careercup-cli/blob/master/doc/commands.md)
* [Advanced Tips](https://github.com/skygragon/careercup-cli/blob/master/doc/advanced.md)
