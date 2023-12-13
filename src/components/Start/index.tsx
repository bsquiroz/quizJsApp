import { useState } from "react";

import {
	Button,
	Stack,
	FormControl,
	FormLabel,
	FormControlLabel,
	RadioGroup,
	Radio,
} from "@mui/material";
import { useQuestionStore } from "../../store/questions";

const initialState = {
	countQuestions: 10,
	secondsQuestion: 30,
};

export const Start = () => {
	const [values, setvalues] = useState(initialState);

	const fetchQuestions = useQuestionStore((state) => state.fetchQuestions);
	const handleShowHistory = useQuestionStore(
		(state) => state.handleShowHistory
	);

	const handleValues = (key: string, value: string) => {
		setvalues({
			...values,
			[key]: parseInt(value),
		});
	};

	const handleClick = async (values: {
		countQuestions: number;
		secondsQuestion: number;
	}) => {
		await fetchQuestions(values.countQuestions, values.secondsQuestion);
	};

	return (
		<Stack gap={2}>
			<Stack direction={"row"} gap={5}>
				<FormControl>
					<FormLabel id="demo-radio-buttons-group-label">
						Cantidad de preguntas
					</FormLabel>
					<RadioGroup
						aria-labelledby="demo-radio-buttons-group-label"
						defaultValue={values.countQuestions}
						value={values.countQuestions}
						name="radio-buttons-group"
						onChange={(e) =>
							handleValues("countQuestions", e.target.value)
						}
					>
						<FormControlLabel
							value="10"
							control={<Radio />}
							label="10 preguntas"
						/>
						<FormControlLabel
							value="15"
							control={<Radio />}
							label="15 preguntas"
						/>
						<FormControlLabel
							value="20"
							control={<Radio />}
							label="20 preguntas"
						/>
					</RadioGroup>
				</FormControl>
				<FormControl>
					<FormLabel id="demo-radio-buttons-group-label">
						Segundos por pregunta
					</FormLabel>
					<RadioGroup
						aria-labelledby="demo-radio-buttons-group-label"
						defaultValue={values.secondsQuestion}
						value={values.secondsQuestion}
						name="radio-buttons-group"
						onChange={(e) =>
							handleValues("secondsQuestion", e.target.value)
						}
					>
						<FormControlLabel
							value="30"
							control={<Radio />}
							label="30 segundos"
						/>
						<FormControlLabel
							value="20"
							control={<Radio />}
							label="20 segundos"
						/>
						<FormControlLabel
							value="10"
							control={<Radio />}
							label="10 segundos"
						/>
					</RadioGroup>
				</FormControl>
			</Stack>
			<Button onClick={() => handleClick(values)} variant="contained">
				Empezar!
			</Button>

			<Button onClick={() => handleShowHistory(true)} variant="outlined">
				Ver historial
			</Button>
		</Stack>
	);
};
