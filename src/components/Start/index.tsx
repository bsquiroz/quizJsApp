import { Button, Stack } from "@mui/material";
import { useQuestionStore } from "../../store/questions";

const LIMIT_QUESTIONS = 10;

export const Start = () => {
	const fetchQuestions = useQuestionStore((state) => state.fetchQuestions);
	const handleShowHistory = useQuestionStore(
		(state) => state.handleShowHistory
	);

	return (
		<Stack gap={2}>
			<Button
				onClick={() => fetchQuestions(LIMIT_QUESTIONS)}
				variant="contained"
			>
				Empezar!
			</Button>

			<Button onClick={() => handleShowHistory(true)} variant="outlined">
				Ver historial
			</Button>
		</Stack>
	);
};
