export function formatTime(seconds: number, secondsforQuestion: number) {
	const minutes = Math.floor(seconds / secondsforQuestion);
	const remainingSeconds = seconds % secondsforQuestion;
	return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}
