import { robloxClient, robloxGroup } from '../../main';
import { CommandContext } from '../../structures/addons/CommandAddons';
import { Command } from '../../structures/Command';
import { getJoinRequestsEmbed, getUnexpectedErrorEmbed, greenColor, mainColor } from '../../handlers/locale';
import { config } from '../../config';
import { MessageEmbed } from 'discord.js';
import { join } from 'path/posix';
import { logAction } from '../../handlers/handleLogging';

class DenyAllJoinRequestsCommand extends Command {
    constructor() {
        super({
            trigger: 'deny-all-requests',
            description: 'Denys every join request.',
            type: 'ChatInput',
            module: 'join-requests',
            permissions: [
                {
                    type: 'role',
                    id: config.permissions.join,
                    value: true,
                }
            ],
            args: [
                {
                    trigger: 'reason',
                    description: 'If you would like a reason to be supplied in the logs, put it here.',
                    isLegacyFlag: true,
                    required: false,
                    type: 'String',
                },
            ],
        });
    }

    async run(ctx: CommandContext) {
        const joinRequests = await robloxGroup.getJoinRequests({});
        
        let mainEmbed = new MessageEmbed();
        mainEmbed.setColor(greenColor);
        mainEmbed.setTitle('Success!');
        mainEmbed.setTimestamp();
        mainEmbed.setDescription(`Successfully declined **${joinRequests.data.length}** join requests!`);

        joinRequests.data.forEach(async (request) => {
            console.log(request['requester'].userId)
            try {
                  setTimeout(function(){
                await robloxGroup.declineJoinRequest(request['requester'].userId);
                  }, 1000);
            } catch (e) {
                return ctx.reply({ embeds: [await getUnexpectedErrorEmbed()]});
            }
        })

        logAction('Deny All Join Requests', ctx.user, ctx.args['reason']);
        return ctx.reply({ embeds: [mainEmbed]});
    }
}

export default DenyAllJoinRequestsCommand;
