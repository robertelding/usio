import { BRAND } from "@cap/utils";

export const UsioMark = ({ inset = 2 }: { inset?: number }) => {
	const size = 40 - inset * 2;
	const ring = size * 0.27;
	return (
		<>
			<rect
				x={inset}
				y={inset}
				width={size}
				height={size}
				rx={size * 0.28}
				fill={BRAND.color}
			/>
			<circle
				cx="20"
				cy="20"
				r={ring}
				fill="none"
				stroke="#fff"
				strokeWidth={size * 0.085}
			/>
			<circle cx="20" cy="20" r={size * 0.125} fill="#fff" />
		</>
	);
};

export const Logo = ({
	className,
	showVersion,
	showBeta,
	white,
	hideLogoName,
	squaredMark,
	viewBoxDimensions = "0 0 120 40",
	style,
}: {
	className?: string;
	showVersion?: boolean;
	showBeta?: boolean;
	white?: boolean;
	hideLogoName?: boolean;
	squaredMark?: boolean;
	style?: React.CSSProperties;
	viewBoxDimensions?: `${string} ${string} ${string} ${string}`;
}) => {
	return (
		<div className="flex items-center">
			<svg
				viewBox={viewBoxDimensions}
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="xMidYMid meet"
				fill="none"
				style={style}
				role="img"
				aria-label={`${BRAND.name} logo`}
				className={className}
			>
				{squaredMark && (
					<>
						<rect
							width="39.5"
							height="39.5"
							x="0.25"
							y="0.25"
							fill="#fff"
							rx="7.75"
						/>
						<rect
							width="39.5"
							height="39.5"
							x="0.25"
							y="0.25"
							stroke="#E7EAF0"
							strokeWidth="0.5"
							rx="7.75"
						/>
					</>
				)}
				<UsioMark inset={squaredMark ? 6 : 2} />
				{!hideLogoName && (
					<text
						x="48"
						y="28.5"
						fontSize="25"
						fontWeight="600"
						letterSpacing="-0.5"
						className={white ? "fill-white" : "fill-gray-12"}
						fill={white ? "#ffffff" : "#12161F"}
					>
						{BRAND.name}
					</text>
				)}
			</svg>
			{showVersion && (
				<span
					className={`text-[10px] font-medium ${
						white ? "text-white" : "text-gray-1"
					}`}
				>
					v{process.env.appVersion}
				</span>
			)}
			{showBeta && (
				<span
					className={`text-[10px] font-medium min-w-[52px] ${
						white ? "text-white" : "text-gray-1"
					}`}
				>
					Beta v{process.env.appVersion}
				</span>
			)}
		</div>
	);
};
