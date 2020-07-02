![Code Scanning](https://github.com/Floffah/mangium/workflows/Code%20Scanning/badge.svg)
![Test](https://github.com/Floffah/mangium/workflows/Test/badge.svg)

Came here for the installer? [Click here](https://github.com/Mangium/installer)<br/>
Came here for the subserver? [Click here](https://github.com/Mangium/subserver)

# Mangium
Open source service & project manager for developers or small teams.

When using Mangium, please remember that it was made to be free to use, just work, and no more than that. If you want a big feature that could quite easily be a plugin, it probably is a plugin and if not make one.
Collaborated should be minimal-ish

## Usage
See [the wiki](https://github.com/Floffah/mangium/wiki) to learn how to use and set up.

## Links
[Trello](https://trello.com/b/T0UsFc2D) <br/>
[Bug tracker](https://github.com/Floffah/mangium/projects/2) <br/>
[Discord](https://discord.gg/2Nrkvd5) <br/>

# Contributing/developers
There is kind of a lot of weird things I did to make me seem cool so please read [developers.md](developers.md)

When contributing just keep in mind that Mangium shouldn't be completely professional. Put some funny messages in it! Come on, we're developers. Can't we have some fun occasionally?

# FAQ
 - Why is Mangium named after at tree?
    - It kind of sounds like manager
    - Mangium can be extended (with plugins) like a tree on steroids can grow branches
 - I just want to try out Mangium. How do I do this?
    - Mangium leaves little to no footprint on your computer as it doesnt really install it, it just clones git repositories. Once you delete Mangium's instatllation folder, its gone. Just use the installer and you should be good to go.
 - Why should I use Mangium over something like Pterodactyl?
    - Mangium has a few big features that (as far as I am aware), pterodactyl doesn't have. Including:
        - Direct docker integration
        - Serving code-servers to write your code and commit it without using some crappy custom editor that just doesnt work.
        - As of writing this, only uses a max of 13mb and average of 11mb with everything turned on (even some plugins loaded).


# Help
 - I installed a plugin but its not there!
    - This is probably because you haven't approved it yet. Plugins have access to a lot of things so you have to approve what it does before it is enabled no matter how you install it.
    - It could also be caused by an error in the plugin.
 - For some reason the time at the end of the log is really big?
    - This is because currently, that time is the milliseconds since the last log. This will be changed in the future but it is like that so I can test timings.
 - I can't access the web panel!
    - Most likely this is because the hostname and port is probably not what you'd expect. You can change it in `data/config/web.json`
 - I'm seeing two different types of errors!
    - You are using an old version. All errors are logged and saved as error files.
    - If you are seeing an error which starts with "Error:" with a red background, that is an error in the code. Errors that follow the format of every other kind of log is a Mangium error.
