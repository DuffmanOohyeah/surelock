import { JSX, useEffect, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { update } from '@/pages/api/update';
import { get } from '@/pages/api/get';
import { GetProps, ApiReturnProps } from '@/types';
import moment from 'moment';
import ImgGallery from '@/components/imgGallery';

const Edit = (): JSX.Element => {
	const router: NextRouter = useRouter();
	const _id: number = Number(router.query.id);
	const [name, setName] = useState<string>('');
	const [price, setPrice] = useState<number>(0);
	const [quantity, setQuantity] = useState<number>(0);
	const [isActive, setIsActive] = useState<boolean>(true);
	const [dateCreated, setDateCreated] = useState<string>('');
	const [dateUpdated, setDateUpdated] = useState<string>('');
	const [imageUrls, setImageUrls] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);
	const [apiObj, setApiObj] = useState<ApiReturnProps>({
		success: false,
		message: '',
	});

	useEffect(() => {
		const getProduct = async () => {
			const gp: GetProps[] = await get(_id);
			if (gp && gp.length) {
				const {
					name: _name,
					price: _price,
					quantity: _quantity,
					is_active: _is_active,
					created_at: _created_at,
					updated_at: _updated_at,
					image_urls: _imageUrls,
				} = gp[0];
				setName(_name);
				setPrice(_price);
				setQuantity(_quantity);
				setIsActive(_is_active);
				setDateCreated(_created_at);
				setDateUpdated(_updated_at);
				setImageUrls(_imageUrls.toString());
				setLoading(false);
			}
		};
		if (_id > 0) getProduct();
	}, [_id]);

	return (
		<div className='m-auto max-w-[90%] min-w-[50%] w-[70%] pt-10'>
			<h1 className='font-bold pb-5 text-center'>
				Edit Product (ID: {_id})
			</h1>

			{apiObj.success && (
				<div
					className={`pb-5 text-center ${
						apiObj.success ? 'text-green-700' : 'text-red-700'
					}`}
				>
					{apiObj.message}
				</div>
			)}

			{loading ? (
				<>Loading product ...</>
			) : (
				<>
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
						<label htmlFor='isActive'>Is active?</label>
						{/* NB: This has been tested & the update API seems to ignore the 'is_active' field, but will leave in for proof of concept */}
						<select
							id='isActive'
							defaultValue={isActive.toString()}
							className='border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						>
							<option value={'true'}>True</option>
							<option value={'false'}>False</option>
						</select>
						<label
							htmlFor='image_urls'
							className='align-top h-full'
						>
							Image Urls:
							<br />
							(strings; comma separated)
							<br />
							{imageUrls.length > 0 && (
								<ImgGallery {...{ urls: imageUrls }} />
							)}
						</label>
						<textarea
							id='image_urls'
							rows={5}
							cols={200}
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
							defaultValue={imageUrls}
							onChange={(evt) => {
								evt.preventDefault();
								setImageUrls(evt.target.value);
							}}
						/>
						<span>Date created:</span>
						<span className='py-2 px-3'>
							{dateCreated &&
								moment(dateCreated).format('D-MMM-YY H:m:ss')}
						</span>
						<span>Date updated:</span>
						<span className='py-2 px-3'>
							{dateUpdated &&
								moment(dateUpdated).format('D-MMM-YY H:m:ss')}
						</span>
						<div className='pt-3'>
							<button
								type='button'
								className='bg-blue-400 hover:bg-blue-700 text-white py-1 px-2 rounded mr-3'
								disabled={
									name.length > 0 && price > 0 ? false : true
								}
								onClick={async () => {
									const data = await update(
										_id,
										name,
										price,
										quantity,
										isActive,
										imageUrls
									);
									setApiObj(data);
								}}
							>
								Edit
							</button>
							<button
								type='reset'
								className='bg-gray-400 hover:bg-gray-700 text-white py-1 px-2 rounded ml-3'
							>
								Clear
							</button>
						</div>
					</form>
				</>
			)}
		</div>
	);
};

export default Edit;
