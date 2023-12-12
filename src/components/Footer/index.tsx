import { useQuestionData } from "../../hooks/useQuestionData";
import { Button, Stack } from "@mui/material";
import { useQuestionStore } from "../../store/questions";

export const Footer = () => {
	const { correct, incorrect, unanswered, questionResponse } =
		useQuestionData();
	const reset = useQuestionStore((state) => state.reset);
	const handleHistoryQuiz = useQuestionStore(
		(state) => state.handleHistoryQuiz
	);

	const handleClick = (correct: number, incorrect: number) => {
		handleHistoryQuiz(correct, incorrect);
		reset();
	};

	return (
		<footer style={{ padding: "1rem", textAlign: "center" }}>
			<Stack gap={3}>
				<p>
					<span> Correctas : {correct} ✅</span> |
					<span> Incorrectas : {incorrect} ❌</span> |
					<span> Sin responder : {unanswered} ❔</span>
				</p>

				{questionResponse === 10 && (
					<Button
						variant="outlined"
						onClick={() => handleClick(correct, incorrect)}
					>
						Resetear y guardar el juego
					</Button>
				)}
			</Stack>
		</footer>
	);
};
