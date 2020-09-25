import { readFile } from './readFile';

describe('readFile', () => {
	it('Lendo arquivo corretamente', async () => {
		const result = await readFile(__dirname + '/readFile.spec.csv');
		expect(result).toEqual([
			{ NAME: 'linha 01', VALUE: '1' },
			{ NAME: 'linha 02', VALUE: '2' },
		]);
	});

	it('Erro quando arquivo não existe', async done => {
		readFile(__dirname + '/readFile-nao-existe.csv').catch(err => {
			expect(err).toBeTruthy();
			done();
		});
	});
});
