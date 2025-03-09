import { JSX, useState } from 'react';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Modal, Button } from 'react-bootstrap';
import { GalleryProps } from '@/types';

/* start: dummy image array */
/*[
		{
			original: 'https://picsum.photos/id/1018/1000/600/',
			thumbnail: 'https://picsum.photos/id/1018/250/150/',
		},
		{
			original: 'https://picsum.photos/id/1015/1000/600/',
			thumbnail: 'https://picsum.photos/id/1015/250/150/',
		},
		{
			original: 'https://picsum.photos/id/1019/1000/600/',
			thumbnail: 'https://picsum.photos/id/1019/250/150/',
		},
		{original: 'https://cdn.shopify.com/s/files/1/1004/2564/products/coachzinc_ac04f347-c62e-49e0-bd67-2bc0d4dff3d7_1024x1024.jpg'}}
	]*/
/* end: dummy image array */

const ImgGallery = ({ urls }: GalleryProps): JSX.Element => {
	const imgArr: string[] = urls.replace(/[\r\n]+/gm, '').split(','); // replace cr/lf and convert to array
	const _imgArr: ReactImageGalleryItem[] = [];

	const [show, setShow] = useState<boolean>(false);
	const handleClose = (): void => setShow(false);
	const handleShow = (): void => setShow(true);

	imgArr.map((url) => {
		const _url: string = url.trim();
		if (
			_url.match(/^(https?):\/\/[^\s$.?#].[^\s]*$/gim) &&
			_url.length > 11 // e.g. http://[...]img1.jpg
		)
			_imgArr.push({ original: _url });
	});

	return (
		<div className='pt-5'>
			{_imgArr.length > 0 ? (
				<>
					<Button onClick={handleShow} className='text-blue-700'>
						[ Click to view image gallery ]
					</Button>
					<Modal show={show} onHide={handleClose} className='modal'>
						<Modal.Header closeButton>
							<Modal.Title>Image Gallery</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<div className='p-3 border rounded w-auto'>
								<ImageGallery items={_imgArr} />
							</div>
						</Modal.Body>
					</Modal>
				</>
			) : (
				<>Sorry, no image gallery to view. :-(</>
			)}
		</div>
	);
};

export default ImgGallery;
