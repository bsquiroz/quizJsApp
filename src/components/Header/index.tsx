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
		>
			<div
				style={{
					padding: "0.5rem",
					borderRadius: "1rem",
					position: "relative",
					textAlign: "center",
					overflow: "hidden",
				}}
			>
				<div style={{ position: "relative", zIndex: 10 }}>
					<Time />
					<h1>Javascript quiz</h1>
				</div>
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
			</div>
			<figure>
				<img src="/images/javascript.png" alt="image js" />
			</figure>
		</Stack>
	);
};
