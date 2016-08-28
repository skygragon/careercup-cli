# careercup-cli

[![npm version](https://img.shields.io/npm/v/careercup-cli.svg?style=flat)](https://www.npmjs.com/package/careercup-cli)
[![license](https://img.shields.io/npm/l/careercup-cli.svg?style=flat)](https://github.com/skygragon/careercup-cli/blob/master/LICENSE)
[![Build](https://img.shields.io/travis/skygragon/careercup-cli.svg?style=flat)](https://travis-ci.org/skygragon/careercup-cli)

A cli tool to enjoy careercup questions!

Inspired by [leetcode-cli](https://github.com/skygragon/leetcode-cli)

## Table of Contents

* [Install](#install)
* [Best Practice](#best-practice)
* [Commands](#commands)
	* [help](#help)
	* [list](#list)
	* [mark](#mark)
	* [show](#show)
	* [stat](#stat)
	* [update](#update)
	* [version](#version)
* [Tips](#tips)
	* [Bash Completion](#bash-completion)
	* [Colorful Output](#colorful-output)
	* [Configuration](#configuration)

## Install

    $ sudo npm install -g careercup-cli

## Best Practice

By the way, c3 = **C**areer**C**up-**C**li

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

## Commands

### help

	$ c3 help

	list [keyword]     list questions
	mark <id> [label]  mark question with customized lavel (default: done)
	show [id]          show question by id
	stat               show question statistics
	update             update question list
	version            show version info

* `c3 help <command>` to see help on sub command.
* `c3 <command> --help` also works.

### list

Navigate all the questions. Each line shows the company where the question came from, the questions ID and a brief description.

    $ c3 list

	......
    Oracle 14141685 - Design/implement a Hashset class of your own.
	FlexTrade 1745702 - Have you used any object oriented features in it? What a ...
	Amazon 11983859 - Given the head of a Binary Search tree, trim the tree, so  ...
	Adobe 5119850590502912 - Find the unique number that is present only once in ...
	Facebook 5727804001878016 - Given an array of positive, unique, increasingly ...
	......

	Questions: 15631

* `-c` to filter by specific company.
* `-t` to filter by specific tags.
* `-l` to filter by specific labels.

*Example*

	$ c3 list -c google -t algorithm

	......
	Google 5685820162834432 - Does Google/Microsoft/Amazon/Facebook allow Golang ...
	Google 21326664 - Given a screen with all pixels having one of two colors. N ...
	Google 5631660689195008 - Given an array of elements, return an array of val ...
	Google 5709153519534080 - There are N lanes, and the speed of each lane is g ...

	Questions: 599

### mark

Mark question with your customized labels. You should always use different labels to manage the questions in your way. If not assigned expliclitly, the questions will be marked as 'done' by default.

	$ c3 mark 14945171
	OK

	$ c3 mark 14945171 easy
	OK

### show

Show question details. (*P.S. if you are using iterm2 on MAC, you can directly open the question link in the console.*)

    $ c3 show 6330205329162240
    ID: 6330205329162240

	https://careercup.com/question?id=6330205329162240

	* Google
	* 2013-10-24T02:06:46.647660Z
	* Google Software Engineer Intern Algorithm
	* done

	You have two integer arrays. Treat these arrays as if they were big numbers, with one digit in each slot. Perform addition on these two arrays and store the results in a new array.

If id is not given, it will randomly select a question for you. Of course you can use `-c` or `-t` to limit the scope of selection.

	$ c3 show -c facebook
	ID: 5188884744896512

	https://careercup.com/question?id=5188884744896512

	* Facebook
	* 2013-10-07T19:26:27.304530Z
	* Facebook Software Engineer / Developer Algorithm

	boolean isBST(const Node* node) {
	  // return true iff the tree with root 'node' is a binary search tree.
	  // 'node' is guaranteed to be a binary tree.
	}

	     n
	    / \
	   a   b
	    \
	     c

### stat

Show questions statistics (e.g. how many resolved so far).

* `-c` to group by company.
* `-t` to group by tags.
* `-n` to limit the output lines.

*Example*

	$ c3 stat -t

	[**]    24/15631 (0.15%)  Tags
	--------------------------------------------------------
	[1 ]    16/7876  (0.20%)  Software Engineer / Developer
	[2 ]     5/5388  (0.09%)  Algorithm
	[3 ]     8/4186  (0.19%)  Amazon
	[4 ]     3/1985  (0.15%)  Microsoft
	[5 ]     1/1200  (0.08%)  Google
	[6 ]     3/934   (0.32%)  Coding
	[7 ]     1/806   (0.12%)  Software Engineer in Test
	[8 ]     1/775   (0.13%)  Data Structures
	[9 ]     2/691   (0.29%)  Java
	[10]     1/651   (0.15%)  Bloomberg LP

### update

Update questions from carrercup.com. The 1st time will cost a while since it will download all questions from carrercup.com. The subsequent updates will be much faster since they only download those new questions by default.

	$ c3 update
	[ 7] Page: 8       Found: 30      Dedup: 30      New: 0
	[ 8] Page: 9       Found: 30      Dedup: 30      New: 0
	[ 5] Page: 6       Found: 30      Dedup: 30      New: 0
	[ 0] Page: 1       Found: 30      Dedup: 30      New: 0
	[ 2] Page: 3       Found: 30      Dedup: 30      New: 0
	[ 6] Page: 7       Found: 30      Dedup: 30      New: 0
	[ 4] Page: 5       Found: 30      Dedup: 30      New: 0
	[ 9] Page: 10      Found: 30      Dedup: 30      New: 0
	[ 1] Page: 2       Found: 30      Dedup: 30      New: 0
	[ 3] Page: 4       Found: 30      Dedup: 30      New: 0

	Last new page: 0
	New questions: 0
	All questions: 15631

* `-f` to force a full update.

### version

	$ c3 version
	1.0.0

* `-v` to show verbose info, e.g. config, cache dir.

*Example*

	$ c3 version -v
	careercup-cli 1.0.0

	Cache:    /Users/cheirxie/.c3/
	Config:   /Users/cheirxie/.c3config
	Database: /Users/cheirxie/.c3/questions.nedb

	BASE_URL = https://careercup.com
	QUESTIONS_URL = https://careercup.com/page?n=%d
	QUESTIONS_WORKERS = 10
	USE_COLOR = true

## Tips

### Bash Completion

Copy `.c3-completion.bash` to your home directory, and source it in .bashrc (Linux) or .bash_profile (MacOS).

	$ cp .c3-completion.bash ~
	$ echo "source ~/.c3-completion.bash" >> ~/.bashrc
	$ source ~/.bashrc

	$ c3 list --<tab><tab>
	--company  --help     --label    --tag

### Colorful Output

* `--color` to enable color.
* `--no-color` to disable it.

Or use configuration setting, see below.

### Configuration

Create a file named `.c3config` in your home directory.

*Example*

	{
		"QUESTIONS_WORKERS": 8,
		"USE_COLOR": true
	}
