## Qbot API In-Game-Ranking Commands.

Allows the user to promote, demote, setrank, fire, shout, suspend, unsuspend, addexp, removexp all from in game. 

How to setup:

1. Make sure QBOT is running and the port 3001 is forwarded.
2. Open the attached "roblox script.lua"
3. Configure the settings at the top
```lua
local requiredRank = 255 -- Minimum rank allowed to use commands
local groupId = 11717434 -- Set this as your group ID
local server = '' -- URL of your QBOT instance EG: http:<ip>:3001
local apiKey = '' -- Replace with your actual API key (The one set in the .env file)
local commandPrefix = "!" -- Set this to your desired command prefix
```

And voila, you now have ranking commands!

For additional support open a thread in qbot-help via the [discord server](https://discord.gg/ADQrmhVsPq).

Created by: zgr2575

Last Updated: 7/19/2024
Created: 7/19/2024
