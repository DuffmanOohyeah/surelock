import config from './config';

export interface GetProps {
	id: number;
	name: string;
	price: number;
	image_urls: string[];
	quantity: number;
	is_active: boolean;
	created_at: string;
	updated_at: string;
}

const get = async (
	id = 0,
	name = '',
	price = 0,
	quantity = 0,
	created_at = '',
	updated_at = '',
	is_active = true
): Promise<GetProps[]> => {
	let rtnData = [];
	const { apiKey, apiUrl } = config;

	/* start: setup/parse incoming vars */
	const _id = id;
	const _name = name.trim();
	const _price = price;
	const _quantity = quantity;
	const _created_at = created_at.trim();
	const _updated_at = updated_at.trim();

	/* end: setup/parse incoming vars */

	/* start: build & call API */
	let url = `${apiUrl}?`;
	if (_id && _id > 0) url += `id=${_id}&`;
	if (_name.length) url += `name=${_name}&`;
	if (_price) url += `price=${_price}&`;
	if (_quantity) url += `quantity=${_quantity}&`;
	if (_created_at.length) url += `created_at=${_created_at}&`;
	if (_updated_at.length) url += `updated_at=${_updated_at}&`;
	url += `is_active=${is_active}`;

	const response: Response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${apiKey}`,
		},
	});

	if (response.ok && response.status === 200) {
		const data = await response.json();
		if (data) rtnData = data;
	}
	/* end: build & call API */

	return rtnData;
};

export { get };
