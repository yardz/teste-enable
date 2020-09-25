import { writeFile } from 'fs';

export const saveResponse = async (response: string[], path: string) => {
	const save = new Promise<void>((resolve, reject) => {
		writeFile(path, response.join('\n'), function (err) {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
	return save;
};
