import React, { useContext, useState, useRef } from "react";
// import { exportComponentAsPNG } from "react-component-export-image";
import "./CoverImage.css";
import { ImgContext } from "../utils/ImgContext";
import unsplash from "../utils/unsplashConfig";
import { toPng, toBlob } from "html-to-image";

const ComponentToImg = (props) => {

	const [loading, setLoading] = useState(false)
	const [copying, setCopying] = useState(false)
	const [copied, setCopied] = useState(false)
	const [copyError, setCopyError] = useState(false)
	const copySupported = typeof navigator !== 'undefined' && navigator.clipboard && typeof window !== 'undefined' && window.ClipboardItem

	const { unsplashImage } = useContext(ImgContext);
	const componentRef = useRef(null);




	async function saveImage(data) {
		const a = document.createElement("a");
		a.href = data;
		a.download = `cover.png`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}

	const getImageOptions = (element) => ({
		height: element.offsetHeight * 2,
		width: element.offsetWidth * 2,
		style: {
			transform: "scale(" + 2 + ")",
			transformOrigin: "top left",
			width: element.offsetWidth + "px",
			height: element.offsetHeight + "px",
		},
		cacheBust: true
	});

	const downloadImage = async () => {
		try {
			setLoading(true)

			const element = componentRef.current;
			const data = await toPng(componentRef.current, getImageOptions(element))

			await saveImage(data);

			if (unsplashImage) {
				unsplash.photos.trackDownload({ downloadLocation: unsplashImage.downloadLink, });
			}
		} catch (err) {
			console.error("Failed to download:", err)
		} finally {
			setLoading(false)
		}
	}

	const copyToClipboard = async () => {
		try {
			setCopying(true)
			setCopied(false)
			setCopyError(false)

			const element = componentRef.current;
			const blob = await toBlob(element, getImageOptions(element))

			if (!blob) throw new Error("Failed to generate image")

			await navigator.clipboard.write([
				new window.ClipboardItem({ 'image/png': blob })
			]);

			setCopied(true)
			setTimeout(() => setCopied(false), 2000);

			if (unsplashImage) {
				unsplash.photos.trackDownload({ downloadLocation: unsplashImage.downloadLink, });
			}
		} catch (err) {
			console.error("Failed to copy:", err)
			setCopyError(true)
			setTimeout(() => setCopyError(false), 2000);
		} finally {
			setCopying(false)
		}
	}


	return (
		<React.Fragment>
			<div ref={componentRef}>{props.children}</div>
			<div className="flex gap-2 m-4">
				<button
					className="border p-2 bg-gray-700 hover:bg-gray-800 flex items-center text-white text-xl rounded-lg px-4"
					onClick={() => downloadImage()}>
					<span>
						{
							loading ?
								<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white animate animate-spin" fill="currentColor" width="24" height="24" viewBox="0 0 24 24" ><path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"></path></svg>
								:
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
						}
					</span>
					<span className="mx-2">Download</span>
				</button>

				{copySupported && (
					<button
						className={`border p-2 flex items-center text-white text-xl rounded-lg px-4 ${copied ? 'bg-green-600 hover:bg-green-700' : copyError ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-800'}`}
						onClick={() => copyToClipboard()}>
						<span>
							{
								copying ?
									<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white animate animate-spin" fill="currentColor" width="24" height="24" viewBox="0 0 24 24" ><path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"></path></svg>
									: copied ?
										<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
										: copyError ?
											<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
											:
											<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
							}
						</span>
						<span className="mx-2">{copied ? 'Copied!' : copyError ? 'Failed' : 'Copy'}</span>
					</button>
				)}
			</div>
		</React.Fragment>
	);

}

export default ComponentToImg;
