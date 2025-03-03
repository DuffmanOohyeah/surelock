import { JSX, useState } from 'react';
import { create, CreateProps } from '../../api/create';

const Create = (): JSX.Element => {
	const [name, setName] = useState<string>('');
	const [price, setPrice] = useState<number>(0.99);
	const [quantity, setQuantity] = useState<number>(1);
	const [apiObj, setApiObj] = useState<CreateProps>({});

	return (
		<div className='m-auto max-w-lg pt-10'>
			<h1 className='font-bold pb-5 text-center'>Create New Product</h1>
			<form className='grid grid-cols-2 items-center'>
				<label htmlFor='name'>Name:</label>
				<input
					id='name'
					type='text'
					defaultValue={name}
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
					onChange={(evt) => {
						evt.preventDefault();
						setName(evt.target.value);
					}}
				/>
				<label htmlFor='price'>Price (£):</label>
				<input
					id='price'
					type='number'
					defaultValue={price}
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
					onChange={(evt) => {
						evt.preventDefault();
						setPrice(parseFloat(evt.target.value));
					}}
				/>
				<label htmlFor='quantity'>Quantity:</label>
				<input
					id='quantity'
					type='number'
					defaultValue={quantity}
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
					onChange={(evt) => {
						evt.preventDefault();
						setQuantity(parseInt(evt.target.value));
					}}
				/>
				<div className='pt-3'>
					<button
						type='button'
						className='bg-blue-400 hover:bg-blue-700 text-white py-1 px-2 rounded mr-3'
						disabled={name.length > 0 && price > 0 ? false : true}
						onClick={async () => {
							setApiObj(await create(name, price, quantity));
						}}
					>
						Create
					</button>
					<button
						type='reset'
						className='bg-gray-400 hover:bg-gray-700 text-white py-1 px-2 rounded ml-3'
					>
						Clear
					</button>
				</div>
			</form>

			{apiObj.success && (
				<div
					className={`pt-5 text-center ${
						apiObj.success ? 'text-green-700' : 'text-red-700'
					}`}
				>
					{apiObj.message}
				</div>
			)}
		</div>
	);
};

export default Create;
