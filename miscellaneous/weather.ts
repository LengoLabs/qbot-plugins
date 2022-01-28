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
} from '../../handlers/locale';

class WeatherCommand extends Command {
    constructor() {
        super({
            trigger: 'weather',
            description: 'Gets the current weather from the state.',
            type: 'ChatInput',
            module: 'miscellaneous',
            args: [
              {
                    trigger: 'state',
                    description: 'The state that you want to get the current weather from.',
                    isLegacyFlag: false,
                    required: true,
                    type: 'String',
              }
            ]
        });
    }

    async run(ctx: CommandContext) {

    
        if(ctx.args.length === 0){
            let errorembed = new MessageEmbed()
            .setTitle("Error:")
            .setDescription("❌ Please enter a location!")
            .setColor('#de554e')
            .setTimestamp();
                return ctx.reply({ embeds: [errorembed] });
        }
        
        weather.find({ search: ctx.args['state'], degreeType: 'C'}, function(err, result, lenght) {
          
        if(result.length === 0){
            let errorembed = new MessageEmbed()
            .setTitle("Error:")
            .setDescription("❌ Please enter a vaild location!")
            .setColor('#de554e')
            .setTimestamp();
                return ctx.reply({ embeds: [errorembed] });
        }
        
          var current = result[0].current;
          var location = result[0].location;
            if (err) {
            let errorembed = new MessageEmbed()
            .setTitle("Error:")
            .setDescription("❌ Please enter a vaild location!")
            .setColor('#de554e')
            .setTimestamp();
                return ctx.reply({ embeds: [errorembed] });
            }
        
            
            let embed = new MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Weather for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor('#43d177')
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