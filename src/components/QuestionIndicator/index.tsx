import { useQuestionStore } from "../../store/questions";
import { Stack, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

export const QuestionIndicator = () => {
	const questions = useQuestionStore((state) => state.questions);
	const currentQuestion = useQuestionStore((state) => state.currentQuestion);
	const goNextQuestion = useQuestionStore((state) => state.goNextQuestion);
	const goPreviousQuestion = useQuestionStore(
		(state) => state.goPreviousQuestion
	);

	return (
		<Stack
			direction={"row"}
			gap={2}
			alignItems={"center"}
			justifyContent={"center"}
		>
			<IconButton
				onClick={goPreviousQuestion}
				disabled={currentQuestion === 0}
			>
				<ArrowBack />
			</IconButton>
			{currentQuestion + 1} / {questions.length}
			<IconButton
				onClick={goNextQuestion}
				disabled={currentQuestion === questions.length - 1}
			>
				<ArrowForward />
			</IconButton>
		</Stack>
	);
};
