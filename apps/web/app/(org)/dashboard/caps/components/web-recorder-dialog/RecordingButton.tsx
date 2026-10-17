"use client";

import { Button } from "@cap/ui";

interface RecordingButtonProps {
	isRecording: boolean;
	disabled?: boolean;
	onStart: () => void;
	onStop: () => void;
}

export const RecordingButton = ({
	isRecording,
	disabled = false,
	onStart,
	onStop,
}: RecordingButtonProps) => {
	return (
		<div className="flex items-center space-x-1 w-full">
			<Button
				variant="blue"
				size="md"
				disabled={disabled}
				onClick={isRecording ? onStop : onStart}
				className="flex flex-grow justify-center items-center rounded-full"
			>
				{isRecording ? (
					"Stop recording"
				) : (
					<>
						<span
							aria-hidden="true"
							className="mr-1.5 size-2.5 rounded-full bg-current"
						/>
						Start recording
					</>
				)}
			</Button>
		</div>
	);
};
