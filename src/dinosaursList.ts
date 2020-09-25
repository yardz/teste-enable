import { Dinosaur } from './domain/Dinosaur';
import { dinosaursProvider } from './provider/Dinosaur.provider';
import { saveResponse } from './service/saveResponse';
import { existsSync, mkdirSync } from 'fs';

export const dinosaursList = async () => {
	const dir = process.cwd() + '/response/';
	const path = dir + 'output.txt';
	if (!existsSync(dir)) {
		mkdirSync(dir);
	}

	const dinosaurs = await dinosaursProvider();
	const spped: Dinosaur[] = dinosaurs.filter(d => d.stance === 'bipedal' && d.speed > 0).sort((a, b) => b.speed - a.speed);
	await saveResponse(
		spped.map(d => d.name),
		path,
	);
};
