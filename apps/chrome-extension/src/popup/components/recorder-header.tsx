import clsx from "clsx";
import { X } from "lucide-react";

interface RecorderHeaderProps {
	isBusy: boolean;
	isPro: boolean;
	showPlan: boolean;
	/** Hide the logo row; the sign-in screen renders its own centered brand. */
	minimal?: boolean;
	onClose: () => void;
	onUpgradeClick: () => void;
}

export const RecorderHeader = ({
	isBusy,
	isPro,
	showPlan,
	minimal = false,
	onClose,
	onUpgradeClick,
}: RecorderHeaderProps) => {
	const planLabel = isPro ? "Pro" : "Free";
	const planClassName = clsx(
		"ml-2 inline-flex items-center rounded-full px-2 text-[0.7rem] font-medium transition-colors",
		isPro
			? "bg-blue-9 text-gray-1"
			: "cursor-pointer bg-gray-3 text-gray-12 hover:bg-gray-4",
	);

	return (
		<>
			<div className="absolute left-3.5 top-4 flex gap-2 items-center">
				<button
					type="button"
					onClick={onClose}
					disabled={isBusy}
					title="Close usio"
					className={clsx(
						"flex size-4 items-center justify-center rounded-full bg-[#FF5F57] border border-[#E0443E]/60 p-0",
						isBusy
							? "opacity-50 cursor-not-allowed"
							: "cursor-pointer transition-transform hover:scale-110",
					)}
					aria-label="Close usio and hide all recorder UI"
				>
					<X
						size={10}
						strokeWidth={3.5}
						className="text-[#741b15]"
						aria-hidden
					/>
				</button>
				<div className="size-3 rounded-full bg-gray-8 opacity-50"></div>
				<div className="size-3 rounded-full bg-gray-8 opacity-50"></div>
			</div>
			{minimal ? null : (
				<div className="flex items-center justify-between pb-[0.25rem]">
					<div className="flex items-center space-x-1">
						<svg
							className="w-[92px] h-auto block"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 103 40"
							aria-label="usio logo"
						>
							<title>usio logo</title>
							<rect
								width="39.5"
								height="39.5"
								x="0.25"
								y="0.25"
								fill="#fff"
								rx="7.75"
							></rect>
							<rect
								width="39.5"
								height="39.5"
								x="0.25"
								y="0.25"
								stroke="#E7EAF0"
								strokeWidth="0.5"
								rx="7.75"
							></rect>
							<rect
								x="0"
								y="0"
								width="40"
								height="40"
								rx="11.2"
								fill="#F2542D"
							/>
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
								fill="#12161F"
							>
								usio
							</text>
						</svg>
						{showPlan &&
							(isPro ? (
								<span className={planClassName}>{planLabel}</span>
							) : (
								<button
									type="button"
									onClick={onUpgradeClick}
									className={planClassName}
								>
									{planLabel}
								</button>
							))}
					</div>
				</div>
			)}
		</>
	);
};
