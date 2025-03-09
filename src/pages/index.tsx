import { JSX } from 'react';
import Search from '@/pages/product/search';

const Home = (): JSX.Element => {
	return (
		<div className='m-auto min-w-[50%] max-w-[90%] w-fit pt-10'>
			Please use the navigaion above to access the product options.
			<div className='text-center py-5'>- OR -</div>
			Search for a product with the form below.
			<br />
			<Search />
		</div>
	);
};

export default Home;
