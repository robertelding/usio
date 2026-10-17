import type { SVGProps } from "react";

export const CapBrand = (props: SVGProps<SVGSVGElement>) => (
	<svg
		className="brand-logo"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 103 40"
		aria-label="usio"
		{...props}
	>
		<title>usio</title>
		<rect x="0" y="0" width="40" height="40" rx="11.2" fill="#F2542D" />
		<circle
			cx="20"
			cy="20"
			r="10.8"
			fill="none"
			stroke="#fff"
			strokeWidth="3.4"
		/>
		<circle cx="20" cy="20" r="5" fill="#fff" />
		<text
			x="48"
			y="28.5"
			fontSize="25"
			fontWeight="600"
			letterSpacing="-0.5"
			fill="currentColor"
		>
			usio
		</text>
	</svg>
);

export const DoodleBoilFilter = ({ id = "boil" }: { id?: string }) => (
	<filter id={id} x="-15%" y="-15%" width="130%" height="130%">
		<feTurbulence
			type="fractalNoise"
			baseFrequency="0.05"
			numOctaves="2"
			seed="1"
			result="noise"
		>
			<animate
				attributeName="seed"
				values="1;3;5;7"
				dur="0.6s"
				repeatCount="indefinite"
				calcMode="discrete"
			/>
		</feTurbulence>
		<feDisplacementMap
			in="SourceGraphic"
			in2="noise"
			scale="3"
			xChannelSelector="R"
			yChannelSelector="G"
		/>
	</filter>
);
