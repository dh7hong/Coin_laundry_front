"use client";
import React, { FC, useState, useEffect, useRef } from "react";
import TopNavigation from "@/app/(public)/enterAddress/components/TopNavigation/page";
import { useRouter } from "next/navigation";
import InputStatic from "@/app/(public)/enterAddress/components/InputStatic/page";
import ActionButton from "@/app/(public)/enterAddress/components/ActionButton/page";
import ResetButton from "@/app/(public)/enterAddress/components/ResetButton/page";
import ProgressBar from "@/app/(public)/enterAddress/components/ProgressBar/page";
import "@/app/global.css";

const DetailedAddress: FC = () => {
	const router = useRouter();
	const [savedSelectedAddress, setSavedSelectedAddress] =
		useState<string>("");
	const [detailedAddress, setDetailedAddress] =
		useState<string>("");
	const [receiverName, setReceiverName] = useState<string>("");
	const [shippingName, setShippingName] = useState<string>("");
	const [keyboardHeight, setKeyboardHeight] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setSavedSelectedAddress(
				localStorage.getItem("selectedAddress") || ""
			);
			setDetailedAddress(
				localStorage.getItem("detailedAddress") || ""
			);
			setReceiverName(
				localStorage.getItem("receiverName") || ""
			);
			setShippingName(
				localStorage.getItem("shippingName") || ""
			);
		}

		const handleResize = () => {
			if (window.visualViewport) {
				const height = window.visualViewport.height;
				const viewportHeight =
					document.documentElement.clientHeight;
				const calculatedKeyboardHeight = viewportHeight - height;

				// Log the keyboard height to the console
				console.log(
					`Keyboard height: ${calculatedKeyboardHeight}px`
				);

				setKeyboardHeight(
					calculatedKeyboardHeight > 0
						? calculatedKeyboardHeight
						: 0
				);
			}
		};

		if (window.visualViewport) {
			window.visualViewport.addEventListener(
				"resize",
				handleResize
			);
		}

		return () => {
			if (window.visualViewport) {
				window.visualViewport.removeEventListener(
					"resize",
					handleResize
				);
			}
		};
	}, []);

	const handleBackNavigation = () => {
		if (typeof window !== "undefined") {
			localStorage.removeItem("detailedAddress");
		}
		router.push("/enterAddress/inputAddress/findAddress");
	};

	const handleDetailedAddressChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setDetailedAddress(e.target.value);
	};

	const handleNextNavigation = () => {
		if (typeof window !== "undefined") {
			if (detailedAddress) {
				localStorage.setItem("detailedAddress", detailedAddress);
			}
		}
		router.push("/enterAddress/inputAddress/houseEntry");
	};

	const handleReset = () => {
		if (typeof window !== "undefined") {
			localStorage.removeItem("selectedAddress");
			localStorage.removeItem("detailedAddress");
		}
		setDetailedAddress("");
		router.push("/enterAddress/inputAddress/findAddress");
	};

	return (
		<div className="flex flex-col justify-center items-center bg-gray-50 min-h-screen">
			<div className="w-full max-w-[430px] bg-static-white flex flex-col pb-[16px]">
				<ProgressBar progress={50} />
				<TopNavigation
					text="배송지 추가"
					onClick={handleBackNavigation}
				>
					<ResetButton label="초기화" onClick={handleReset} />
				</TopNavigation>
				<div className="self-start ml-[24px] mt-[16px] mb-[8px] text-label-1-normal font-semibold">
					배송 받으실 주소
				</div>
			</div>
			<div className="w-full mx-[24px] max-w-[430px] bg-white text-body-1-normal font-medium">
				<div className="mx-[24px]">
					<InputStatic value={savedSelectedAddress} />
				</div>
				<div className="flex items-center border rounded-md mx-[24px] max-w-[430px] h-[48px] mt-[8px] mb-[16px] px-[16px] py-[12px] bg-[#FFF] border-line-normal">
					<input
						type="text"
						placeholder="상세 주소 입력"
						className="input-common bg-static-white text-label-normal w-full outline-none"
						value={detailedAddress}
						onChange={handleDetailedAddressChange}
						ref={inputRef}
					/>
				</div>
			</div>
			<div className="w-full max-w-[430px] px-[24px] bg-static-white">
				<div className="mb-[8px] text-label-1-normal font-semibold text-label-normal text-left">
					받는 분
				</div>
				<InputStatic value={receiverName} />
			</div>
			<div className="w-full max-w-[430px] h-[16px] bg-static-white"></div>
			<div className="w-full max-w-[430px] px-[24px] bg-static-white">
				<div className="mb-[8px] text-label-1-normal font-semibold text-label-normal text-left">
					배송지 이름
				</div>
				<InputStatic value={shippingName} />
			</div>
			<div className="flex-grow w-full max-w-[430px] bg-static-white"></div>
			<div
				className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[430px] bg-white transition-transform duration-300"
				style={{
					height: "100px",
					transform: `translateY(-${keyboardHeight}px)`,
				}}
			>
				<>
					<div className="w-full max-w-[430px] h-[100px] bg-line-normal border shadow-elevation-shadow-normal">
						<ActionButton
							label="다음"
							onClick={handleNextNavigation}
							className="w-full text-primary-normal"
						/>
					</div>
				</>
			</div>
		</div>
	);
};

export default DetailedAddress;
