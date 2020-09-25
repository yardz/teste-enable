import { Dinosaur, DIET, STANCE } from '../domain/Dinosaur';

import { readFile } from '../service/readFile';
import { calculateSpeed } from '../service/calculateSpeed';

interface File1 {
	NAME: string;
	LEG_LENGTH: string;
	DIET: DIET;
}
interface File2 {
	NAME: string;
	STRIDE_LENGTH: string;
	STANCE: STANCE;
}

export const dinosaursProvider = async (): Promise<Dinosaur[]> => {
	const dataset1Path = __dirname + '/dataset1.csv';
	const dataset2Path = __dirname + '/dataset2.csv';

	const dataset1: File1[] = await readFile(dataset1Path);
	const dataset2: File2[] = await readFile(dataset2Path);

	const dinosaurs: Dinosaur[] = dataset1
		.map(dt1 => {
			const dt2 = dataset2.find(d => d.NAME === dt1.NAME);
			if (!dt2) {
				return null;
			}
			const dinosaur: Dinosaur = {
				name: dt1.NAME,
				diet: dt1.DIET,
				leg: Number(dt1.LEG_LENGTH),
				stride: Number(dt2.STRIDE_LENGTH),
				stance: dt2.STANCE,
				speed: calculateSpeed({ leg: Number(dt1.LEG_LENGTH), stride: Number(dt2.STRIDE_LENGTH) }),
			};
			return dinosaur;
		})
		.filter(d => !!d);

	return dinosaurs;
};
