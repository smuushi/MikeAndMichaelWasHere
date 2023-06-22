/* eslint-disable brace-style */
const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { S3Client, ListObjectsV2Command, GetObjectCommand } = require('@aws-sdk/client-s3');

const { writeFile } = require('fs/promises');
const client = new S3Client({});

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * max);
}

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

			const contents = [];

			while (isTruncated) {
				const { Contents, IsTruncated, NextContinuationToken } = await client.send(command);
				const contentsList = Contents.map((c) => c.Key);
				contents.push(...contentsList);
				isTruncated = IsTruncated;
				command.input.ContinuationToken = NextContinuationToken;
			}

			const GetImgCommand = new GetObjectCommand({
				Bucket: 'michaelspets',
				Key: contents[getRandomInt(0, contents.length)],
			});

			const response = await client.send(GetImgCommand);
            // console.log(response.data);
			const arr = await response.Body.transformToByteArray();
			await writeFile('hi.jpg', arr);
            // const rbody = await response.Body;
            // const img = await Buffer.from(response.Body.transformToByteArray());
			//   console.log(response);
			const attachment = new AttachmentBuilder('hi.jpg', { name: 'profile-image.png' });

			interaction.reply({ files: [attachment] });

		} catch (err) {
			console.error(err);
		}
	},
};