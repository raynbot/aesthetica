import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const vibes = [
  "You're radiating pure cottagecore energy 🌼",
  "Certified tech gremlin detected 💾✨",
  "✨ Main character energy ✨",
  "You are the vibe, no cap 💅",
  "Vibing like it's 2099 🚀"
];

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'vibecheck') {
    const vibe = vibes[Math.floor(Math.random() * vibes.length)];
    await interaction.reply(vibe);
  }
});

// Register slash command
const commands = [
  new SlashCommandBuilder()
    .setName('vibecheck')
    .setDescription('Check your vibe')
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
  .then(() => console.log('Slash command registered.'))
  .catch(console.error);

client.login(process.env.TOKEN);
