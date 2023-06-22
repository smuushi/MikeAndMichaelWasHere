const { SlashCommandBuilder } = require('discord.js');
const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');

const client = new S3Client({});

// needs to have aws configured on dev env to work
module.exports = {
	data: new SlashCommandBuilder()
		.setName('pets')
		.setDescription('Gives a random pet photo'),
	async execute(interaction) {
		const command = new ListObjectsV2Command({
			Bucket: 'michaelspets',
			// The default and maximum number of keys returned is 1000. This limits it to
			// one for demonstration purposes.
			MaxKeys: 1000,
		});

		try {
			let isTruncated = true;

			console.log('Your bucket contains the following objects:\n')
			let contents = '';

			while (isTruncated) {
				const { Contents, IsTruncated, NextContinuationToken } = await client.send(command);
				const contentsList = Contents.map((c) => ` • ${c.Key}`).join('\n');
				contents += contentsList + '\n';
				isTruncated = IsTruncated;
				command.input.ContinuationToken = NextContinuationToken;
			}
			console.log(contents);
			await interaction.reply(contents);

		}
		catch (err) {
			console.error(err);
		}

	},
};