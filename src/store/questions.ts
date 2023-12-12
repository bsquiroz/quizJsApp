import { create } from "zustand";
import { HistoryQuiz, Question } from "../interfaces";
import { devtools, persist } from "zustand/middleware";
import { getQuestions } from "../services/getQuestions";

import confetti from "canvas-confetti";

interface State {
	questions: Question[];
	currentQuestion: number;
	gameLost: boolean;
	time: number;
	history: HistoryQuiz[];
	showHistory: boolean;
	secondsforQuestion: number;
	fetchQuestions: (limit: number) => Promise<void>;
	selectAnswer: (questionId: number, answerIndex: number) => void;
	goNextQuestion: () => void;
	goPreviousQuestion: () => void;
	reset: () => void;
	handleGameLost: () => void;
	handleTime: () => void;
	handleHistoryQuiz: (corrects: number, incorrects: number) => void;
	handleShowHistory: (valie: boolean) => void;
}

export const useQuestionStore = create<State>()(
	devtools(
		persist(
			(set, get) => {
				return {
					secondsforQuestion: 60,
					questions: [],
					currentQuestion: 0,
					time: 0,
					gameLost: false,
					showHistory: false,
					history: [],
					handleShowHistory: (value: boolean) => {
						set(
							{
								showHistory: value,
							},
							false,
							"HANDLE_SHOW_HISTORY"
						);
					},
					handleTime: () => {
						const state = get();

						set(
							{
								time: state.time - 1,
							},
							false,
							"HANDLE_TIME"
						);
					},
					fetchQuestions: async (limit: number) => {
						const data: Question[] = await getQuestions();
						const state = get();

						const questions = data
							.sort(() => Math.random() - 0.5)
							.slice(0, limit);

						set(
							{
								questions,
								time:
									questions.length * state.secondsforQuestion,
							},
							false,
							"FETCH_QUESTIONS"
						);
					},
					selectAnswer: (questionId: number, answerIndex: number) => {
						const state = get();

						if (
							state.questions.find(
								(question) => question.id === questionId
							)?.correctAnswer === answerIndex
						) {
							confetti();
						}

						const newQuestions = structuredClone(
							state.questions
						).map((question) =>
							question.id === questionId
								? {
										...question,
										userSelectedAnswer: answerIndex,
										isCorrectUserAnswer:
											question.correctAnswer ===
											answerIndex,
								  }
								: question
						);

						set(
							{
								questions: newQuestions,
							},
							false,
							"SELECT_ANSWER"
						);
					},
					goNextQuestion: () => {
						const { questions, currentQuestion } = get();

						if (currentQuestion < questions.length) {
							set(
								{ currentQuestion: currentQuestion + 1 },
								false,
								"NEXT_QUESTION"
							);
						}
					},
					goPreviousQuestion: () => {
						const { currentQuestion } = get();

						if (currentQuestion > 0) {
							set(
								{ currentQuestion: currentQuestion - 1 },
								false,
								"PREVIOUS_QUESTIONS"
							);
						}
					},
					reset: () => {
						set(
							{
								questions: [],
								currentQuestion: 0,
								time: 0,
								gameLost: false,
							},
							false,
							"RESET_APP"
						);
					},
					handleGameLost: () => {
						set({ gameLost: true }, false, "HANDLE_GAME_LOST");
					},
					handleHistoryQuiz: (
						corrects: number,
						incorrects: number
					) => {
						const state = get();

						set(
							{
								history: [
									...state.history,
									{
										corrects,
										incorrects,
										timeTotal:
											state.questions.length *
												state.secondsforQuestion -
											state.time,
									},
								],
							},
							false,
							"HANDLE_HISTORY_QUIZ"
						);
					},
				};
			},
			{ name: "quizJs" }
		)
	)
);
