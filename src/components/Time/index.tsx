import { useEffect } from "react";
import { useQuestionStore } from "../../store/questions";
import { useQuestionData } from "../../hooks/useQuestionData";
import { formatTime } from "../../helper/formatTime";

export const Time = () => {
	const { questionResponse } = useQuestionData();
	const questions = useQuestionStore((state) => state.questions);
	const handleGameLost = useQuestionStore((state) => state.handleGameLost);
	const time = useQuestionStore((state) => state.time);
	const handleTime = useQuestionStore((state) => state.handleTime);
	const secondsforQuestion = useQuestionStore(
		(state) => state.secondsforQuestion
	);

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (questions.length === 0) return;

			if (questionResponse === 10) {
				clearInterval(intervalId);
				return;
			}

			if (time > 0) {
				handleTime();
			} else {
				handleGameLost();
				clearInterval(intervalId);
			}
		}, 1000);

		return () => clearInterval(intervalId);
	}, [time, questions]);

	return (
		questions.length > 0 && (
			<div style={{ fontSize: "1.5rem" }}>
				<h2>{formatTime(time, secondsforQuestion)}</h2>
			</div>
		)
	);
};
