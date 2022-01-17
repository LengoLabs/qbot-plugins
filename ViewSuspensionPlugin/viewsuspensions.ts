import { discordClient, robloxClient, robloxGroup } from '../../main';
import { CommandContext } from '../../structures/addons/CommandAddons';
import { Command } from '../../structures/Command';
import {
    getInvalidRobloxUserEmbed,
    getRobloxUserIsNotMemberEmbed,
    getSuccessfulUnsuspendEmbed,
    getUnexpectedErrorEmbed,
    getVerificationChecksFailedEmbed,
    getRoleNotFoundEmbed,
    getNotSuspendedEmbed,
    getAlreadySuspendedEmbed,
    noSuspendedRankLog,
    mainColor,
} from '../../handlers/locale';
import { config } from '../../config';
import { provider } from '../../database/router';
import { MessageEmbed } from 'discord.js';


class ViewSuspensionsCommand extends Command {
    constructor() {
        super({
            trigger: 'viewsuspensions',
            description: 'Allows the viewing of all concurrent suspensions.',
            type: 'ChatInput',
            module: 'SUSPENSIONS',
            permissions: [
                {
                    type: 'role',
                    ids: config.permissions.ranking,
                    value: true,
                }
            ],
        });
    }

    async run(ctx: CommandContext) {
        if(!config.database.enabled) return ctx.reply({ embeds: [ getUnexpectedErrorEmbed() ] });
        let isThere;
        const suspensions = await provider.findSuspendedUsers();
        let mainEmbed = new MessageEmbed();
        mainEmbed.setTimestamp();
        mainEmbed.setColor(mainColor);
        mainEmbed.setTitle('Current Suspensions');
        for (var i in suspensions) {
            isThere = true;
            const user = await robloxClient.getUser(suspensions[i].robloxId);

            mainEmbed.addField(user.name,`Expires on ${suspensions[i].suspendedUntil.toDateString()}`);
        }
        if (isThere == false) mainEmbed.setDescription("**No Current Suspensions!**");
        return ctx.reply({embeds: [mainEmbed]});
    }
}

export default ViewSuspensionsCommand;
