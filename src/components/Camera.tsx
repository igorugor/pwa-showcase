import { useEffect, useRef } from 'react';

export const Camera = () => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const streamRef = useRef<MediaStream | null>(null);

	useEffect(() => {
		const enableCamera = async () => {
			try {
				const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
				if (videoRef.current) {
					videoRef.current.srcObject = mediaStream;
				}
				streamRef.current = mediaStream;
			} catch (err) {
				console.error('Error accessing camera:', err);
			}
		};

		enableCamera();

		return () => {
			// Stop the camera
			if (streamRef.current) {
				streamRef.current.getTracks().forEach((track) => track.stop());
			}
		};
	}, []);

	return (
		<div>
			<video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxHeight: 500 }} />
		</div>
	);
};
