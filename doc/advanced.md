# Table of Contents

* [Bash Completion](#bash-completion)
* [Caching](#caching)
* [Colorful Output](#colorful-output)
* [Configuration](#configuration)
* [Daemon Mode](#daemon-mode)

## Bash Completion

Copy `.c3-completion.bash` to your home directory, and source it in .bashrc (Linux) or .bash_profile (MacOS).

	$ cp .c3-completion.bash ~
	$ echo "source ~/.c3-completion.bash" >> ~/.bashrc
	$ source ~/.bashrc

	$ c3 list --<tab><tab>
	--company  --help     --label    --tag

## Caching

Local database is at your home directory: `~/.c3/questions.nedb`

## Colorful Output

* `--color` to enable color.
* `--no-color` to disable it.

Or use configuration setting, see below.

## Configuration

Create a file named `.c3config` in your home directory.

*Example*

	{
		"QUESTIONS_WORKERS": 8,
		"USE_COLOR": true,
		"USE_DAEMON": true,
		"DAEMON_PORT": 12345
	}

## Daemon Mode

In backend we are using NeDB (https://github.com/louischatriot/nedb) to persist the questions data. NeDB is a fast lightweight database that offers the ability to persist the data on local disk, and also dump data to memory at runtime for performance boost.

However in the original cli mode as we did, everytime when we execute a single command, it will always dump db to the memory first, then do some queries, and finally exit. We don't enjoy the profit from this performance boost because we don't reuse the memory for futher queries. No boost at all!

That's why we introduce the daemon mode to use a long live process to enjoy the memory caching. Now when we exectue a single command, it will ask the server daemon to get the data, and yes this time, from the memory caching.

To taste it, add following to your `.c3config`:

	{
		"USE_DAEMON": true
	}

And start the daemon process by:

	$ c3 daemon start

Now run othe commands multiple times, you should observe the speed boost quite a bit, (depends on the db size and your laptop though...)
