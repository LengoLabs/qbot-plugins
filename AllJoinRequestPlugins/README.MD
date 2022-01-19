# Accept/Deny all Join Requests Plugins  


Allows the user to accept/deny all join requests.  

How to set up:
In your qbot repl/vps, go to src/commands/join-requests/ and create 2 new files. Name these files accept-all-requests.ts and deny-all-requests.ts. Copy the contents of the corresponding files from this folder and paste it in. Reboot your bot, and tada! You installed this plugin! You can change how many requests are denied everytime the command is run by going to line 37
        const joinRequests = await robloxGroup.getJoinRequests({limit: 100}); (change the number to 10, 25, 50 or leave it at 100.)

--brandonn#2968
