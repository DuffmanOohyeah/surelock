import config from '@/pages/api/config';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Verbs } from '@/types';

const confirmDelete = (id: number): void => {
	confirmAlert({
		title: `Confirm deletion (ID: ${id})`,
		message: 'Are you sure you want to delete this product?',
		buttons: [
			{
				label: 'Yes',
				onClick: () => {
					softDelete(id);
				},
			},
			{
				label: 'No',
				//onClick: () => alert('Click No')
			},
		],
	});
};

const softDelete = async (id: number): Promise<boolean> => {
	let rtnBln = false;
	const { apiKey, apiUrl } = config;

	/* start: prep api vars, path for deletion */
	const response: Response = await fetch(apiUrl, {
		method: Verbs.Delete,
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify([id]),
	});

	if (response.ok && response.status === 200) {
		rtnBln = response.ok;
		if (typeof window !== 'undefined')
			window.location.href = '/product/list';
	}
	/* end: prep api vars, path for deletion */

	return rtnBln;
};

export { confirmDelete };
