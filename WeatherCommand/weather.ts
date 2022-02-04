import { discordClient } from '../../main';
import weather from 'weather-js';
import { MessageEmbed } from 'discord.js';
import { CommandContext } from '../../structures/addons/CommandAddons';
import { Command } from '../../structures/Command';
import { groupBy } from 'lodash';
import {
    getCommandInfoEmbed,
    getCommandListEmbed,
    getCommandNotFoundEmbed,
    mainColor,
} from '../../handlers/locale';
import { xmarkIconUrl } from '../../handlers/locale';
import { greenColor } from '../../handlers/locale';
import { redColor } from '../../handlers/locale';
import { infoIconUrl } from '../../handlers/locale';

class WeatherCommand extends Command {
    constructor() {
        super({
            trigger: 'weather',
            description: 'Gets the current weather from the location.',
            type: 'ChatInput',
            module: 'information',
            args: [
              {
                    trigger: 'location',
                    description: 'The location that you want to get the current weather from.',
                    isLegacyFlag: false,
                    required: true,
                    type: 'String',
              }
            ]
        });
    }

    async run(ctx: CommandContext) {
        
        weather.find({ search: ctx.args['location'], degreeType: 'C'}, function(err, result, lenght) {
          
        if(result.length === 0){
            let noresultsEmbed = new MessageEmbed()
            .setAuthor(`Invalid Location`, xmarkIconUrl)
            .setDescription(`Please enter a vaild location!`)
            .setColor(redColor)
            .setTimestamp();
                return ctx.reply({ embeds: [noresultsEmbed] });
        }
        
          var current = result[0].current;
          var location = result[0].location;
            if (err) {
            let errorembed = new MessageEmbed()
            .setAuthor(`Error`, xmarkIconUrl)
            .setDescription(`An error has occurred!`)
            .setColor(redColor)
            .setTimestamp();
                return ctx.reply({ embeds: [errorembed] });
            }
        
            
            let embed = new MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Weather for ${current.observationpoint}`, infoIconUrl)
            .setThumbnail(current.imageUrl)
            .setColor(mainColor)
            .addField('Timezone', `UTC${location.timezone}`, true)
            .addField('Degree Type', location.degreetype, true)
            .addField('Temperature', `${current.temperature} Degrees`, true)
            .addField('Feels Like', `${current.feelslike} Degrees`, true)
            .addField('Winds', current.winddisplay, true)
            .addField('Humidity', `${current.humidity}%`, true)
            .setTimestamp();
                ctx.reply({ embeds: [embed] });
        });
    }
}

export default WeatherCommand;
