import { dinosaursList } from './dinosaursList';
import { existsSync, mkdirSync } from 'fs';
import { dinosaursProvider } from './provider/Dinosaur.provider';
import { saveResponse } from './service/saveResponse';

jest.mock('fs', () => ({
	existsSync: jest.fn(),
	mkdirSync: jest.fn(),
}));

jest.mock('./provider/Dinosaur.provider');
jest.mock('./service/saveResponse');

const dinosaurs = [
	{
		name: 'Hadrosaurus',
		diet: 'herbivore',
		leg: 1.2,
		stride: 1.4,
		stance: 'bipedal',
		speed: 0.5715476066494085,
	},
	{
		name: 'Struthiomimus',
		diet: 'omnivore',
		leg: 0.92,
		stride: 1.34,
		stance: 'bipedal',
		speed: 1.3707820681132614,
	},
	{
		name: 'Velociraptor',
		diet: 'carnivore',
		leg: 1,
		stride: 2.72,
		stance: 'bipedal',
		speed: 5.384451689819494,
	},
	{
		name: 'Euoplocephalus',
		diet: 'herbivore',
		leg: 1.6,
		stride: 1.87,
		stance: 'quadrupedal',
		speed: 0.6682159082212873,
	},
	{
		name: 'Stegosaurus',
		diet: 'herbivore',
		leg: 1.4,
		stride: 1.9,
		stance: 'quadrupedal',
		speed: 1.3228756555322956,
	},
	{
		name: 'Tyrannosaurus Rex',
		diet: 'carnivore',
		leg: 2.5,
		stride: 5.76,
		stance: 'bipedal',
		speed: 6.454470698670805,
	},
];

describe('dinosaursList', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		(dinosaursProvider as jest.Mock).mockResolvedValue([]);
	});

	it('Criando diretorio quando não existe', async () => {
		((existsSync as unknown) as jest.Mock).mockReturnValue(false);
		await dinosaursList();
		expect(mkdirSync).toHaveBeenCalledTimes(1);
	});

	it('Não cria diretorio quando existe', async () => {
		((existsSync as unknown) as jest.Mock).mockReturnValue(true);
		await dinosaursList();
		expect(mkdirSync).toHaveBeenCalledTimes(0);
	});

	it('Não considerar dinossauros quadrupedes', async () => {
		(dinosaursProvider as jest.Mock).mockResolvedValue([
			{
				name: 'Bipedal',
				stance: 'bipedal',
				speed: 2,
			},
			{
				name: 'Quadrupedal',
				stance: 'quadrupedal',
				speed: 100,
			},
		]);
		await dinosaursList();
		expect(saveResponse).toHaveBeenCalledWith(['Bipedal'], process.cwd() + '/response/output.txt');
	});

	it('Não considerar dinossauros com velocidade 0', async () => {
		(dinosaursProvider as jest.Mock).mockResolvedValue([
			{
				name: 'Bipedal',
				stance: 'bipedal',
				speed: 0,
			},
		]);
		await dinosaursList();
		expect(saveResponse).toHaveBeenCalledWith([], process.cwd() + '/response/output.txt');
	});

	it('Salvando os nomes na ordem correta ', async () => {
		(dinosaursProvider as jest.Mock).mockResolvedValue(dinosaurs);
		await dinosaursList();
		expect(saveResponse).toHaveBeenCalledWith(
			['Tyrannosaurus Rex', 'Velociraptor', 'Struthiomimus', 'Hadrosaurus'],
			process.cwd() + '/response/output.txt',
		);
	});
});
