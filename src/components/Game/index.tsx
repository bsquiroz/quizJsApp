import { useQuestionStore } from "../../store/questions";
import { QuestionIndicator } from "../QuestionIndicator";
import { Footer } from "../Footer";
import { Question } from "../Question";

export const Game = () => {
	const questions = useQuestionStore((state) => state.questions);
	const currentQuestion = useQuestionStore((state) => state.currentQuestion);

	const questionInfo = questions[currentQuestion];

	return (
		<>
			<QuestionIndicator />
			<Question info={questionInfo} />
			<Footer />
		</>
	);
};
