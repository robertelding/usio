import { Button } from "../ui/button";

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
				className="flex flex-grow justify-center items-center"
			>
				{isRecording ? (
					"Stop recording"
				) : (
					<>
						<span
							className="size-2.5 mr-1.5 rounded-full bg-on-signal"
							aria-hidden
						/>
						Start recording
					</>
				)}
			</Button>
		</div>
	);
};
