import { calculateSpeed } from './calculateSpeed';

describe('calculateSpeed', () => {
	it('Calculando a velocidade correta, 0', () => {
		expect(calculateSpeed({ leg: 1, stride: 1 })).toBe(0);
		expect(calculateSpeed({ leg: 2, stride: 2 })).toBe(0);
		expect(calculateSpeed({ leg: 3, stride: 3 })).toBe(0);
	});

	it('Calculando sinal correto', () => {
		expect(calculateSpeed({ leg: 2, stride: 1 }) === 0).toBe(true);
		expect(calculateSpeed({ leg: 1, stride: 2 }) > 0).toBe(true);
	});

	it('Quando NaN retorna 0', () => {
		expect(calculateSpeed({ leg: 0, stride: 0 })).toBe(0);
	});

	it('Calculando valor correto', () => {
		expect(calculateSpeed({ leg: 2.5, stride: 5.76 })).toBe(6.454470698670805);
	});
});
