export async function sleep(delay = 500) {
	const promise = new Promise<void>((resolve) =>
		setTimeout(() => {
			resolve();
		}, delay),
	);

	return promise;
}
