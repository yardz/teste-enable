import { saveResponse } from './saveResponse';
import { writeFile } from 'fs';

jest.mock('fs', () => ({
	writeFile: jest.fn(),
}));

describe('saveResponse', () => {
	it('chamando corretamente o writeFile', async () => {
		((writeFile as unknown) as jest.Mock).mockImplementation((a, b, c) => {
			c();
		});
		await saveResponse(['linha 01', 'linha 02'], 'path');
		expect(writeFile).toBeCalledWith('path', 'linha 01\nlinha 02', expect.anything());
	});

	it('lançando erro correto', async done => {
		const error = { error: 'erro teste' };
		((writeFile as unknown) as jest.Mock).mockImplementation((a, b, c) => {
			c(error);
		});
		saveResponse(['linha 01', 'linha 02'], 'path').catch(catchError => {
			expect(catchError).toEqual(error);
			done();
		});
	});
});
