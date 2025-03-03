// import Image from 'next/image';
//import { Geist, Geist_Mono } from 'next/font/google';
import { JSX } from 'react';
import Search from './product/search/index';

const Home = (): JSX.Element => {
	return (
		<div className='m-auto max-w-lg pt-10'>
			Please use the navigaion above to access the product options.
			<div className='text-center p-5'>- OR -</div>
			Search for a product with the form below.
			<br />
			<Search />
		</div>
	);
};

export default Home;
