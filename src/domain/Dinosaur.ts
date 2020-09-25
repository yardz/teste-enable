export type STANCE = 'quadrupedal' | 'bipedal';
export type DIET = 'herbivore' | 'omnivore' | 'carnivore';

export interface Dinosaur {
	name: string;
	leg: number;
	stride: number;
	stance: STANCE;
	diet: DIET;
	speed: number;
}
