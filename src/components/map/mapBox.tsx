"use client";

import React, { useCallback, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Layer, Map, Source, Marker } from "react-map-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import MyLocationMarkerImg from "@/assets/MyLocationMarker";
import LaundryRoomMarkerImg from "@/assets/LaundryRoomMarker";
import SelectMarkerImg from "@/assets/SelectMarker";
import { useGeoLocation } from "@/app/hooks/useGeoLocation";
import { GeoJsonProperties } from "geojson";
import * as turf from "@turf/turf";

const geolocationOptions = {
	enableHighAccuracy: true,
	timeout: 1000 * 10,
	maximumAge: 1000 * 3600 * 24,
};

const MAP_TOKEN =
	"pk.eyJ1IjoibGF1bmRyeS1mcm9udGVuZCIsImEiOiJjbHgyNDF4MmkwZml3MmtzNG91MHBpZ3Z2In0.UOaMbpvUJ3k1UrU8UUTOXQ";

const storeList = [
	{ name: "매장1", location: [37.472734, 126.969105] },
	{ name: "매장2", location: [37.473236, 126.97035] },
	{ name: "매장3", location: [37.472936, 126.968432] },
	{ name: "매장4", location: [37.472986, 126.9736] },
	{ name: "매장5", location: [37.474115, 126.97247] },
];

const Mapbox = () => {
	const [initialViewState, setInitialViewState] =
		useState<any>(null);
	const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<
		number | null
	>(null);
	const { location, error } = useGeoLocation(geolocationOptions);

	const onRender = useCallback((e: any) => {
		e.target.addControl(
			new MapboxLanguage({ defaultLanguage: "ko" })
		);
	}, []);

	useEffect(() => {
		if (location) {
			setInitialViewState({
				latitude: location.latitude,
				longitude: location.longitude,
				zoom: 13,
				maxZoom: 17,
				minZoom: 11.5,
			});
		} else if (error) {
			console.error(error);
		}
	}, [location, error]);

	const radius = 3;
	const options: {
		steps?: number | undefined;
		units?: turf.Units | undefined;
		properties?: GeoJsonProperties | undefined;
	} = { steps: 64, units: "kilometers" };
	const circle = location
		? turf.circle(
				[location.longitude, location.latitude],
				radius,
				options
		  )
		: null;

	return (
		<>
			{initialViewState && (
				<Map
					initialViewState={initialViewState}
					onRender={onRender}
					mapboxAccessToken={MAP_TOKEN}
					mapStyle="mapbox://styles/mapbox/streets-v12"
				>
					{storeList.map((store, idx) => (
						<Marker
							key={idx}
							latitude={store.location[0]}
							longitude={store.location[1]}
							onClick={() => setSelectedMarkerIndex(idx)}
						>
							{selectedMarkerIndex === idx ? (
								<SelectMarkerImg />
							) : (
								<LaundryRoomMarkerImg />
							)}
						</Marker>
					))}
					{location && (
						<Marker
							latitude={location.latitude}
							longitude={location.longitude}
						>
							<MyLocationMarkerImg />
						</Marker>
					)}
					{circle && (
						<Source id="circle" type="geojson" data={circle}>
							<Layer
								id="circle-layer"
								type="fill"
								paint={{
									"fill-color": "#00B4B2",
									"fill-opacity": 0.2,
								}}
							/>
							<Layer
								id="circle-outline"
								type="line"
								paint={{
									"line-color": "#00B4B2",
								}}
							/>
						</Source>
					)}
				</Map>
			)}
		</>
	);
};

export default Mapbox;
