export interface ApiReturnProps {
	success: boolean;
	message: string;
}

export interface ApiDataProps {
	name: string;
	price: number;
	image_urls: string | string[];
	quantity: number;
}

export interface UpdateDataProps extends ApiDataProps {
	id: number;
	is_active: boolean;
}

export interface GetProps extends UpdateDataProps {
	created_at: string;
	updated_at: string;
}

export interface ConfigProps {
	apiKey: string;
	apiUrl: string;
}

export interface GalleryProps {
	urls: string; // img1.jpg,img2.gif, etc.
}

export enum Verbs {
	Get = 'GET',
	Post = 'POST',
	Patch = 'PATCH',
	Delete = 'DELETE',
}
