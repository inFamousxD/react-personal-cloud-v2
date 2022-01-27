// each folder refers one document.
const folders = [];

// contents of each document
const document = {
	name: 'Name of Folder',
	data: [ // each el in array is one section
		{
			sectionName: String,
			sectionData: [
				{
					taskName: String,
					taskData: [
						{
							subtaskName: String,
							checked: Boolean,
							createdAt: String
						},
						//...
					],
					createdAt: String
				},
			],
			createdAt: String
		},
	],
	createdAt: String
}

console.log(folders, document);