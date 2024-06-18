import { useState, useEffect } from "react";

interface ILocation {
	latitude: number;
	longitude: number;
}

export const useGeoLocation = (options = {}) => {
	const [location, setLocation] = useState<ILocation>();
	const [error, setError] = useState("");

	const handleSuccess = (pos: GeolocationPosition) => {
		const { latitude, longitude } = pos.coords;

		setLocation({
			latitude,
			longitude,
		});
	};

	const handleError = (err: GeolocationPositionError) => {
		setError(err.message);
	};

	useEffect(() => {
		const { geolocation } = navigator;

		if (!geolocation) {
			setError("위치 정보를 확인할 수 없습니다.");
			return;
		}

		geolocation.getCurrentPosition(
			handleSuccess,
			handleError,
			options
		);
	}, [options]);

	return { location, error };
};