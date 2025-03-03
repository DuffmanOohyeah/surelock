import { JSX } from 'react';
import Link from 'next/link';

const Navigation = (): JSX.Element => {
	return (
		<nav>
			<ul className='flex m-auto max-w-lg text-blue-700'>
				<li className='flex-1 p-3 hover:text-blue-300'>
					<Link href={'/'}>Home</Link>
				</li>
				<li className='flex-1 p-3'>|</li>
				<li className='flex-1 p-3 hover:text-blue-300'>
					<Link href={'/product/create'}>Create</Link>
				</li>
				<li className='flex-1 p-3'>|</li>
				<li className='flex-1 p-3 hover:text-blue-300'>
					<Link href={'/product/list'}>List</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
