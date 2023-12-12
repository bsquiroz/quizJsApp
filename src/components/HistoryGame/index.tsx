import {
	Stack,
	Button,
	Alert,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";
import { useQuestionStore } from "../../store/questions";
import { formatTime } from "../../helper/formatTime";

export const HistoryGame = () => {
	const handleShowHistory = useQuestionStore(
		(state) => state.handleShowHistory
	);

	const secondsforQuestion = useQuestionStore(
		(state) => state.secondsforQuestion
	);

	const history = useQuestionStore((state) => state.history);

	console.log(history);

	return (
		<Stack gap={5}>
			<Button variant="text" onClick={() => handleShowHistory(false)}>
				Volver al inicio
			</Button>

			<div>
				{history.length ? (
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 350 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Intento #</TableCell>
									<TableCell align="right">
										Correctas ✅
									</TableCell>
									<TableCell align="right">
										Incorrectas ❌
									</TableCell>
									<TableCell align="right">
										Tiempo total ⌚
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{history.map(
									(
										{ corrects, incorrects, timeTotal },
										index
									) => (
										<TableRow
											key={index}
											sx={{
												"&:last-child td, &:last-child th":
													{
														border: 0,
													},
											}}
										>
											<TableCell align="right">
												{index + 1}
											</TableCell>
											<TableCell align="right">
												{corrects}
											</TableCell>
											<TableCell align="right">
												{incorrects}
											</TableCell>
											<TableCell align="right">
												{formatTime(
													timeTotal,
													secondsforQuestion
												)}
											</TableCell>
										</TableRow>
									)
								)}
							</TableBody>
						</Table>
					</TableContainer>
				) : (
					<Alert variant="filled" severity="info">
						Juega al menos una partida para ver el historial
					</Alert>
				)}
			</div>
		</Stack>
	);
};
