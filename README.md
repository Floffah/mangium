![Code Scanning](https://github.com/Floffah/mangium/workflows/Code%20Scanning/badge.svg)

# Mangium
Open source service & project manager for developers or small teams which can probably be upscaled because of its extendability.

When using Mangium, please remember that it was made to be free to use, just work, and no more than that. If you want a big feature that could quite easily be a plugin, it probably is a plugin and if not make one.
Collaborated should be minimal-ish

# Contributing/developers
There is kind of a lot of weird things I did to make me seem cool so please read [developers.md](developers.md)

When contributing just keep in mind that Mangium shouldn't be completely professional. Put some funny messages in it! Come on, we're developers. Can't we have some fun occasionally?

# Help
 - For some reason the time at the end of the log is really big?
    - This is because currently, that time is the milliseconds since the last log. This will be changed in the future but it is like that so I can test timings.
 - I can't access the web panel!
    - Most likely this is because the hostname and port is probably not what you'd expect. You can change it in `data/config/web.json`
 - I'm seeing two different types of errors!
    - You are using an old version. All errors are logged and saved as error files.
    - If you are seeing an error which starts with "Error:" with a red background, that is an error in the code. Errors that follow the format of every other kind of log is a Mangium error.
