import { Alert, AlertTitle, Button } from "@mui/material";
import { useQuestionStore } from "../../store/questions";

export const EndGame = () => {
	const reset = useQuestionStore((state) => state.reset);
	return (
		<Alert severity="error">
			<AlertTitle>Fin del test</AlertTitle>
			<p>Lastimosamente se te acabo el tiempo. </p>
			<Button variant="contained" onClick={reset}>
				Volver a inicio
			</Button>
		</Alert>
	);
};
