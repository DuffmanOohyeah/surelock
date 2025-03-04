import config from './config';

export interface UpdateProps {
	success: boolean;
	message: string;
}

interface DataProps {
	id: number;
	name: string;
	price: number;
	quantity: number;
	image_urls: string[];
	is_active: boolean;
}

const update = async (
	id = 0,
	name = '',
	price = 0,
	quantity = 0,
	is_active = true,
	image_urls: string
): Promise<UpdateProps> => {
	let rtnObj = {
		success: false,
		message: 'Product update was unsuccessful.',
	};
	const { apiKey, apiUrl } = config;

	const imgArr: string[] = image_urls.replace(/[\r\n]+/gm, '').split(','); // replace cr/lf and convert to array

	/* start: prep vars for api call */
	const _name = name.trim();
	const _price = price;
	const _quantity = quantity;
	const _is_active = is_active;

	const data: DataProps = {
		id: id,
		name: _name,
		price: _price,
		quantity: _quantity,
		image_urls: imgArr,
		is_active: _is_active,
	};

	const response = await fetch(apiUrl, {
		method: 'PATCH',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify(data),
	});

	if (response.ok && response.status === 200) {
		rtnObj = {
			success: response.ok,
			message: 'Product update was successful.',
		};
	}
	/* end: prep vars for api call */

	return rtnObj;
};

export { update };
