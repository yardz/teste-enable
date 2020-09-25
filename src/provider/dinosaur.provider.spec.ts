import { dinosaursProvider } from './dinosaur.provider';

import { readFile } from '../service/readFile';

jest.mock('../service/readFile');
jest.mock('../service/calculateSpeed', () => ({
	calculateSpeed: () => 0,
}));

const dataset1 = [
	{ NAME: 'Tyrannosaurus Rex', LEG_LENGTH: '2.5', DIET: 'carnivore' },
	{ NAME: 'Stegosaurus', LEG_LENGTH: '1.40', DIET: 'herbivore' },
];
const dataset2 = [
	{ NAME: 'Tyrannosaurus Rex', STRIDE_LENGTH: '5.76', STANCE: 'bipedal' },
	{ NAME: 'Euoplocephalus', STRIDE_LENGTH: '1.87', STANCE: 'quadrupedal' },
];

describe('dinosaursProvider', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('Lendo os arquivos corretos', async () => {
		const file01 = __dirname + '/dataset1.csv';
		const file02 = __dirname + '/dataset2.csv';

		(readFile as jest.Mock).mockResolvedValue([]);
		const dinosauros = await dinosaursProvider();
		expect(readFile).toHaveBeenCalledTimes(2);
		expect(readFile).toHaveBeenNthCalledWith(1, file01);
		expect(readFile).toHaveBeenNthCalledWith(2, file02);
	});

	it('Fazendo merge quando existe match do dinossauro', async () => {
		(readFile as jest.Mock).mockResolvedValueOnce([dataset1[0]]).mockResolvedValueOnce([dataset2[0]]);
		const dinosauros = await dinosaursProvider();
		expect(dinosauros).toEqual([{ diet: 'carnivore', leg: 2.5, name: 'Tyrannosaurus Rex', speed: 0, stance: 'bipedal', stride: 5.76 }]);
	});

	it('Não retorna dinossauro quando não existe match entre primeiro e segundo', async () => {
		(readFile as jest.Mock).mockResolvedValueOnce(dataset1).mockResolvedValueOnce([dataset2[1]]);
		const dinosauros = await dinosaursProvider();
		expect(dinosauros).toEqual([]);
	});

	it('Não retorna dinossauro quando não existe match no segundo arquivo', async () => {
		(readFile as jest.Mock).mockResolvedValueOnce([]).mockResolvedValueOnce(dataset2);
		const dinosauros = await dinosaursProvider();
		expect(dinosauros).toEqual([]);
	});

	it('Retorna somente os dinossauros que deram match em ambos arquivos', async () => {
		(readFile as jest.Mock).mockResolvedValueOnce(dataset1).mockResolvedValueOnce(dataset2);
		const dinosauros = await dinosaursProvider();
		expect(dinosauros).toEqual([{ diet: 'carnivore', leg: 2.5, name: 'Tyrannosaurus Rex', speed: 0, stance: 'bipedal', stride: 5.76 }]);
	});
});
