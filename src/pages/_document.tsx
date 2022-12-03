import Document, {Head, Html, Main, NextScript} from 'next/document';

export default class SuluhDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta charSet="utf-8" />
					<link
						rel="icon"
						type="image/png"
						href="https://avatars3.githubusercontent.com/u/20874779?s=460&v=4"
					/>
					<meta name="theme-color" content="#ffffff" />
					<meta
						name="description"
						content="Suluh Sulistiawan, Full–stack developer from Indonesia"
					/>
					<link rel="preconnect" href="https://fontbit.io" />
					<link
						href="https://fontbit.io/css2?family=JetBrains+Mono:wght@400&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
					<script async src="/theme.js" />
				</body>
			</Html>
		);
	}
}
