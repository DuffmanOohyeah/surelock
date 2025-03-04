import { JSX, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';

const Search = (props: { name?: string }): JSX.Element => {
	const { name: qryName } = props;
	const [name, setName] = useState<string>(qryName || '');
	const router: NextRouter = useRouter();

	return (
		<div className='m-auto pt-3 w-full'>
			<form className='grid grid-cols-3 items-center p-3 bg-gray-200 rounded text-center'>
				<label htmlFor='name'>Product name:</label>
				<input
					type='text'
					id='name'
					defaultValue={name}
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-white'
					onChange={(evt) => {
						evt.preventDefault();
						setName(evt.target.value);
					}}
				/>
				<button
					type='button'
					className='m-auto bg-blue-400 hover:bg-blue-700 text-white py-1 px-2 rounded'
					onClick={(evt) => {
						evt.preventDefault();
						router.push(`/product/list?name=${name}`);
					}}
				>
					Search
				</button>
			</form>
		</div>
	);
};

export default Search;
