# Table of Contents

* [Bash Completion](#bash-completion)
* [Colorful Output](#colorful-output)
* [Configuration](#configuration)

## Bash Completion

Copy `.c3-completion.bash` to your home directory, and source it in .bashrc (Linux) or .bash_profile (MacOS).

	$ cp .c3-completion.bash ~
	$ echo "source ~/.c3-completion.bash" >> ~/.bashrc
	$ source ~/.bashrc

	$ c3 list --<tab><tab>
	--company  --help     --label    --tag

## Colorful Output

* `--color` to enable color.
* `--no-color` to disable it.

Or use configuration setting, see below.

## Configuration

Create a file named `.c3config` in your home directory.

*Example*

	{
		"QUESTIONS_WORKERS": 8,
		"USE_COLOR": true
	}
