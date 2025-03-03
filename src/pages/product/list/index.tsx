import { JSX, useState, useEffect } from 'react';
import { GetProps, get } from '../../api/get';
import { confirmDelete } from '../../api/delete';
import moment from 'moment';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import Search from '../search';

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
		<div className='m-auto w-[50%]'>
			<Search name={qryName} />
			<h1 className='font-bold pb-5 text-center pt-5'>
				Product Listing(s)
			</h1>
			<>
				{loading ? (
					<>Loading product list...</>
				) : (
					<>
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
														[ Edit ]
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
