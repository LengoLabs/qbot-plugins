import { CommandContext } from '../../structures/addons/CommandAddons';
import { Command } from '../../structures/Command';
import { checkIconUrl, getRoleListEmbed, greenColor, mainColor, quoteIconUrl } from '../../handlers/locale';
import { config } from '../../config';
import { TextChannel } from 'discord.js';
import { getLinkedRobloxUser } from '../../handlers/accountLinks';
import {
    getInvalidRobloxUserEmbed,
} from '../../handlers/locale';
import { discordClient, robloxClient, robloxGroup } from '../../main';
import { PartialUser, User, GroupMember } from 'bloxy/dist/structures';

class PagerCommand extends Command {
    constructor() {
        super({
            trigger: 'page',
            description: 'Pages a role and sends a paging message',
            type: 'ChatInput',
            module: 'admin',
            permissions: [
                {
                    type: 'role',
                    ids: config.permissions.admin,
                    value: true,
                }
            ]
        });
    }
     async run(ctx: CommandContext) {    
          const channel = await discordClient.channels.fetch('Channel ID') as TextChannel;
        channel.send({ 
          content: '<@&8ROLEID>',
            embeds: [
                {
                    author: {
                        name: 'Page',
                        iconURL: quoteIconUrl,
                    },
                    description:'',
                    color: greenColor,
                }
            ]
        });

        return ctx.reply({
            embeds: [
                {
                    author: {
                        name: 'Successfull Page!',
                        iconURL: checkIconUrl,
                    },
                    description: 'Page message has been sent!',
                    color: greenColor,
                }
            ]
        });
    }
}

export default PagerCommand;
