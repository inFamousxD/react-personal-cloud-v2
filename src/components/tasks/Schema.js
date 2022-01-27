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

// Schema v2

const fetchAllFolders = `c: users, d: userid, c: tasks`;
const fetchAllSectionsInFolder = `c: users, d: userid, c: tasks, d: folderName, c: sections`;
const fetchAllTasksInSection = `c: users, d: userid, c: tasks, d: folderName, c: sections, d: sectionName, c: tasks`;
const fetchAllSubtasksInTasks = `c: users, d: userid, c: tasks, d: folderName, c: sections, d: sectionId, c: tasks, d: taskId, c:subtasks`;
