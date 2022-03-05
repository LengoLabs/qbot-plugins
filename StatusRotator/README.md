# Status Rotator
This plugin will allow you to set several different statuses, and rotate through them in a timed interval.

# Setup
To set this plugin up, copy the contents of the `types.d.ts` file into the file with the same name found in `src/structures`.

Next, copy the contents of the `config.ts` file and replace the setting known as `activity` with the contents of the file. This should leave antiAbuse above and `status` below. See screenshot for what it should look like.

![image](https://cdn.upload.systems/uploads/F4jSt919.png)

I have left two sample activity options to rotate through. Please edit and remove these as you place. Otherwise, you can similarly add activities as before, just copy the format. Remember your commas!

Finally, go into `src/structures/QbotClient.ts` and copy the contents in the file known as `QbotClient.ts` into this file.

Tada, every 60 seconds your status will rotate randomly.