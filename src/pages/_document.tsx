import { JSX } from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import Navigation from '@/components/navigation';

const Document = (): JSX.Element => {
	return (
		<Html lang='en'>
			<Head />
			<body className='antialiased'>
				<Navigation />
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
