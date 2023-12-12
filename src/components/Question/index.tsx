import {
	Card,
	Typography,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from "@mui/material";

import { Question as IQuestion } from "../../interfaces";
import { useQuestionStore } from "../../store/questions";
import { CodeSintax } from "../CodeSintax";

function bgAnswer(index: number, info: IQuestion) {
	const { userSelectedAnswer, correctAnswer } = info;

	if (userSelectedAnswer === undefined) return "transparent";
	if (index !== correctAnswer && index !== userSelectedAnswer)
		return "transparent";
	if (index === correctAnswer) return "green";
	if (index === userSelectedAnswer) return "red";
}

export const Question = ({ info }: { info: IQuestion }) => {
	const selectAnswer = useQuestionStore((state) => state.selectAnswer);

	return (
		<Card
			variant="outlined"
			sx={{
				p: 3,
			}}
		>
			<Typography variant="h5">{info.question}</Typography>
			<CodeSintax code={info.code} />
			<List>
				{info.answers.map((answer, i) => (
					<ListItem key={i} divider>
						<ListItemButton
							disabled={info.userSelectedAnswer !== undefined}
							sx={{ bgcolor: bgAnswer(i, info) }}
							onClick={() => selectAnswer(info.id, i)}
						>
							<ListItemText
								primary={answer}
								sx={{ textAlign: "center" }}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Card>
	);
};
