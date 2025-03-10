import { JSX, useState, useEffect } from 'react';
import { get } from '@/pages/api/get';
import { GetProps } from '@/types';
import { confirmDelete } from '@/pages/api/delete';
import moment from 'moment';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import Search from '@/pages/product/search';

const List = (): JSX.Element => {
	const [listData, setListData] = useState<GetProps[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const router: NextRouter = useRouter();
	const qryName: string | undefined = router.query.name?.toString();

	useEffect(() => {
		const getList = async () => {
			setLoading(true);
			const data: GetProps[] = await get(0, qryName);
			setListData(data);
			setLoading(false);
		};
		getList();
	}, [qryName]);

	return (
		<div className='m-auto max-w-[90%] min-w-[50%] w-[70%]'>
			<Search name={qryName} />
			<h1 className='font-bold pb-5 text-center pt-5'>
				Product Listing(s)
			</h1>
			<>
				{loading ? (
					<>Loading product list...</>
				) : (
					<>
						<div className='pb-3'>
							{listData.length} product(s) found
						</div>
						{listData.length > 0 ? (
							<>
								<div className='flex font-bold bg-slate-300'>
									<div className='w-1/5 flex-1'>Name</div>
									<div className='w-1/5 flex-1'>
										Price (£)
									</div>
									<div className='w-1/5 flex-1'>Updated</div>
									<div className='w-2/5 flex-2 text-center'>
										Options
									</div>
								</div>
								<div className='overflow-auto h-[400px]'>
									{listData.map((row, idx) => {
										return (
											<div
												key={idx}
												className='flex even:bg-gray-100'
											>
												<div className='w-1/5 flex-1'>
													{row.name}
												</div>
												<div className='w-1/5 flex-1'>
													{row.price}
												</div>
												<div className='w-1/5 flex-1'>
													{moment(
														row.updated_at
													).format('D-MMM-YY H:m:ss')}
												</div>
												<div className='w-1/5 flex-1 text-blue-500 hover:text-blue-300 text-center'>
													<Link
														href={`/product/edit/${row.id}`}
													>
														[ View / Edit ]
													</Link>
												</div>
												<div className='w-1/5 flex-1 text-red-500 hover:text-red-300 text-center'>
													<Link
														href={'/'}
														onClick={(evt) => {
															evt.preventDefault();
															confirmDelete(
																row.id
															);
														}}
													>
														[ Delete ]
													</Link>
												</div>
											</div>
										);
									})}
								</div>
							</>
						) : (
							<>No products found.</>
						)}
					</>
				)}
			</>
		</div>
	);
};

export default List;
