import { discordClient, robloxGroup } from '../../main';
import { CommandContext } from '../../structures/addons/CommandAddons';
import { Command } from '../../structures/Command';
import { checkIconUrl, getRoleListEmbed, greenColor, mainColor, quoteIconUrl } from '../../handlers/locale';
import { config } from '../../config';
import { TextChannel } from 'discord.js';

class SessionCommand extends Command {
    constructor() {
        super({
            trigger: 'session',
            description: 'Announces a session in both this server and the group.',
            type: 'ChatInput',
            module: 'information',
            permissions: [
                {
                    type: 'role',
                    ids: config.permissions.users,
                    value: true,
                }
            ]
        });
    }

    async run(ctx: CommandContext) {
        const channel = await discordClient.channels.fetch('ID GOES HERE') as TextChannel;
        channel.send({
            embeds: [
                {
                    author: {
                        name: 'Session Announcement',
                        iconURL: quoteIconUrl,
                    },
                    description: 'YOUR DISCORD MESSAGE GOES HERE',
                    color: mainColor,
                }
            ]
        });
        robloxGroup.updateShout('YOUR ROBLOX SHOUT GOES HERE');
        return ctx.reply({
            embeds: [
                {
                    author: {
                        name: 'Success!',
                        iconURL: checkIconUrl,
                    },
                    description: 'This has been posted as a group shout and a message in the session announcements channel.',
                    color: greenColor,
                }
            ]
        });
    }
}

export default SessionCommand;
