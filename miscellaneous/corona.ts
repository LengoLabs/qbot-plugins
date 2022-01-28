import { discordClient, robloxClient, robloxGroup } from '../../main';
import { TextChannel } from 'discord.js';
import { GetGroupRoles } from 'bloxy/src/client/apis/GroupsAPI';
import { CommandContext } from '../../structures/addons/CommandAddons';
import { Command } from '../../structures/Command';
import { MessageEmbed } from 'discord.js';
import {
    getInvalidRobloxUserEmbed,
    getRobloxUserIsNotMemberEmbed,
    getSuccessfulPromotionEmbed,
    getUnexpectedErrorEmbed,
    getNoRankAboveEmbed,
    getRoleNotFoundEmbed,
    getVerificationChecksFailedEmbed,
    getUserSuspendedEmbed,
} from '../../handlers/locale';
import { checkActionEligibility } from '../../handlers/verificationChecks';
import { config } from '../../config';
import { User, PartialUser, GroupMember } from 'bloxy/dist/structures';
import { logAction } from '../../handlers/handleLogging';
import { getLinkedRobloxUser } from '../../handlers/accountLinks';
import { provider } from '../../database/router';
import axios from 'axios';
 
class CoronaCommand extends Command {
    constructor() {
        super({
            trigger: 'corona',
            description: '',
            type: 'ChatInput',
            module: 'miscellaneous',
            args: []
        });
    }
 
    async run(ctx: CommandContext) {
      const baseUrl = 'https://corona.lmao.ninja/v2';

		let url; let response; let
			corona;

		try {
			url = `${baseUrl}/all`;
			response = await axios.get(url);
			corona = response.data;
		} catch (error) {
			return ctx.reply(`Error with fetching the api website.`);
		}

		const embed = new MessageEmbed()
			.setTitle('Total Corona Cases World Wide')
      .setThumbnail('https://i.giphy.com/YPbrUhP9Ryhgi2psz3.gif')
			.setColor('GREEN')
			.addFields(
				{
					name: 'Total Cases:',
					value: corona.cases.toLocaleString(),
					inline: true,
				},
				{
					name: 'Total Deaths:',
					value: corona.deaths.toLocaleString(),
					inline: true,
				},
				{
					name: 'Total Recovered:',
					value: corona.recovered.toLocaleString(),
					inline: true,
				},
				{
					name: 'Active Cases:',
					value: corona.active.toLocaleString(),
					inline: true,
				},
				{
					name: '\u200b',
					value: '\u200b',
					inline: true,
				},
				{
					name: 'Critical Cases:',
					value: corona.critical.toLocaleString(),
					inline: true,
				},
				{
					name: 'Today Recoveries:',
					value: corona.todayRecovered.toLocaleString().replace('-', ''),
					inline: true,
				},
				{
					name: 'Todays Deaths:',
					value: corona.todayDeaths.toLocaleString(),
					inline: true,
				},
			);

		return ctx.reply({ embeds: [embed] });
  }
}
 
export default CoronaCommand;