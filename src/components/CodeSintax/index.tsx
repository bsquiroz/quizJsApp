import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const CodeSintax = ({ code }: { code: string }) => {
	return (
		<div>
			<SyntaxHighlighter language="javascript" style={dracula}>
				{code}
			</SyntaxHighlighter>
		</div>
	);
};
