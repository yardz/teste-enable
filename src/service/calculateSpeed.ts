const G = 9.8;

export const calculateSpeed = (dinosaur: { leg: number; stride: number }): number => {
	const speed = (dinosaur.stride / dinosaur.leg - 1) * Math.sqrt(dinosaur.leg * G);
	if (isNaN(speed)) {
		return 0;
	}
	if (speed < 0) return 0;
	return speed;
};
