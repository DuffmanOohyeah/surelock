import config from './config';

export interface CreateProps {
	success?: boolean;
	message?: string;
}

interface DataProps {
	name: string;
	price: number;
	//image_urls: string[];
	image_urls: string | string[];
	quantity: number;
}

const create = async (
	name: string,
	price: number,
	quantity: number,
	image_urls: string
): Promise<CreateProps> => {
	let rtnObj: CreateProps = {
		success: false,
		message: 'There was an error creating a new product.',
	};
	const { apiKey, apiUrl } = config;

	const imgArr: string[] = image_urls.replace(/[\r\n]+/gm, '').split(','); // replace cr/lf and convert to array

	/* start: build & call API */
	const data: DataProps = {
		name: name,
		price: price,
		image_urls: imgArr,
		quantity: quantity,
	};

	const response = await fetch(apiUrl, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify(data),
	});

	if (response.ok) {
		rtnObj = {
			success: response.ok,
			message: 'Product created successfully.',
		};
	}
	/* end: build & call API */

	return rtnObj;
};

export { create };
