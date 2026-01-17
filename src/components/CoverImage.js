import React from "react";
import "./CoverImage.css";
import "../assets/css/patterns.css";
import ModernTheme from "./Themes/ModernTheme";
import BasicTheme from "./Themes/BasicTheme";
import OutlineTheme from "./Themes/OutlineTheme";
import PreviewTheme from "./Themes/PreviewTheme";
import StylishTheme from "./Themes/StylishTheme";
import MobileMockupTheme from "./Themes/MobileMockupTheme";
import BackgroundTheme from "./Themes/BackgroundTheme";

const CoverImage = (props) => {
	// hexToRgbA(hex, opacity) {
	// 	var c;
	// 	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
	// 		c = hex.substring(1).split("");
	// 		if (c.length === 3) {
	// 			c = [c[0], c[0], c[1], c[1], c[2], c[2]];
	// 		}
	// 		c = "0x" + c.join("");
	// 		return "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + `,${opacity})`;
	// 	}
	// 	throw new Error("Bad Hex");
	// }

	const { theme, platform, customWidth, customHeight } = props;

	const selectTheme = (theme) => {
		switch (theme) {
			case 'basic': return <BasicTheme config={props} />
			case 'modern': return <ModernTheme config={props} />
			case 'outline': return <OutlineTheme config={props} />
			case 'preview': return <PreviewTheme config={props} />
			case 'stylish': return <StylishTheme config={props} />
			case 'mobile': return <MobileMockupTheme config={props} />
			case 'background': return <BackgroundTheme config={props} />

			default: return <BasicTheme config={props} />
		}
	}

	// Get dimensions based on platform
	const getDimensions = () => {
		if (platform === 'custom') {
			// Scale down for preview (similar ratio as other platforms)
			const scaleFactor = 0.625; // roughly matches hashnode's 800/1600 ratio
			return {
				width: Math.round((customWidth || 1200) * scaleFactor),
				height: Math.round((customHeight || 630) * scaleFactor)
			};
		}
		return null; // Use CSS class dimensions
	};

	const customDimensions = getDimensions();
	const customStyle = customDimensions ? {
		width: `${customDimensions.width}px`,
		height: `${customDimensions.height}px`
	} : {};


	return (
		<div 
			className={`border-2 border-gray-50 lg:scale-100 md:scale-[0.55] scale-50 ${platform}`}
			style={customStyle}
		>
			{selectTheme(theme)}
		</div>
	);

}

export default CoverImage;
