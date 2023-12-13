import { Stack } from "@mui/material";
import { Time } from "../Time";
import { useQuestionStore } from "../../store/questions";

export const Header = () => {
	const time = useQuestionStore((state) => state.time);
	const questions = useQuestionStore((state) => state.questions);
	const secondsforQuestion = useQuestionStore(
		(state) => state.secondsforQuestion
	);

	const value = (time * 100) / (questions.length * secondsforQuestion);

	return (
		<Stack
			direction={"row"}
			alignItems={"center"}
			justifyContent={"center"}
			gap={5}
			position={"relative"}
			borderRadius={"1rem"}
			overflow={"hidden"}
			padding={"0.5rem"}
		>
			<div
				style={{
					backgroundColor: questions.length
						? "#efda4d"
						: "transparent",
					content: "",
					position: "absolute",
					height: "100%",
					width: questions.length ? `${value}%` : "100%",
					left: 0,
					top: 0,
				}}
			></div>
			<div style={{ position: "relative", zIndex: 10 }}>
				<Time />
				<h1>Javascript quiz</h1>
			</div>
			<img
				style={{ position: "relative", zIndex: 10 }}
				src="/images/javascript.png"
				alt="image js"
			/>
		</Stack>
	);
};
