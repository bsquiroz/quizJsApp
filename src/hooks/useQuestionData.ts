import { useQuestionStore } from "../store/questions";

export const useQuestionData = () => {
	const questions = useQuestionStore((state) => state.questions);

	const response = questions.reduce(
		(acum, curr) => {
			if (curr.isCorrectUserAnswer === undefined) {
				acum["unanswered"]++;
			} else if (curr.isCorrectUserAnswer) {
				acum["correct"]++;
			} else {
				acum["incorrect"]++;
			}

			return acum;
		},
		{ correct: 0, incorrect: 0, unanswered: 0 }
	);

	return {
		...response,
		questionResponse: response.correct + response.incorrect,
	};
};
