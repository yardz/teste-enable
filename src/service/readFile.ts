import csv from 'csv-parser';
import fs from 'fs';

export const readFile = async <T>(path: string): Promise<T[]> => {
	return new Promise((resolve, reject) => {
		const results: T[] = [];
		fs.createReadStream(path)
			.on('error', error => reject(error))
			.pipe(csv())
			.on('data', data => results.push(data))
			.on('end', () => {
				resolve(results);
			});
	});
};
