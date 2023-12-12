import { Container } from "@mui/material";
import { Start } from "./components/Start";
import { useQuestionStore } from "./store/questions";
import { Game } from "./components/Game";
import { Header } from "./components/Header";
import { EndGame } from "./components/EndGame";
import { HistoryGame } from "./components/HistoryGame";

export const App = () => {
	const questions = useQuestionStore((state) => state.questions);
	const gameLost = useQuestionStore((state) => state.gameLost);
	const showHistory = useQuestionStore((state) => state.showHistory);

	return (
		<main>
			<Container maxWidth={"sm"} sx={{ padding: "1rem" }}>
				{gameLost ? (
					<EndGame />
				) : (
					<>
						<Header />
						{questions.length ? (
							<Game />
						) : showHistory ? (
							<HistoryGame />
						) : (
							<Start />
						)}
					</>
				)}
			</Container>
		</main>
	);
};
