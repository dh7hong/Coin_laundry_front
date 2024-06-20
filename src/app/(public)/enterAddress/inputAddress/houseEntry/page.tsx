"use client"; // Tells the code to run on the client-side (in the browser).
import React, { FC, useState, useEffect, useRef } from "react"; // Import React and some of its functions for building the component.
import { useRouter } from "next/navigation"; // Import the useRouter function for navigation.
import TopNavigation from "@/app/(public)/enterAddress/components/TopNavigation/page"; // Import the TopNavigation component.
import ActionButton from "@/app/(public)/enterAddress/components/ActionButton/page"; // Import the ActionButton component.
import ResetButton from "@/app/(public)/enterAddress/components/ResetButton/page"; // Import the ResetButton component.
import ProgressBar from "@/app/(public)/enterAddress/components/ProgressBar/page"; // Import the ProgressBar component.
import EnterPlaceholderSmaller from "@/app/(public)/enterAddress/components/EnterPlaceHolderSmaller/page"; // Import the EnterPlaceholderSmaller component.
import InfoIcon from "@/assets/icons/others/information.svg"; // Import an information icon.
import CustomRadioButton from "@/app/(public)/enterAddress/components/CustomRadioButton/page"; // Import the CustomRadioButton component.
import SavedFieldsPage from "@/app/(public)/enterAddress/components/SavedFieldsPage/page";

const EntryMethod: React.FC = () => {
	const router = useRouter(); // Use the router for navigation.
	const [entryMethod, setEntryMethod] =
		useState<string>("공동현관 비밀번호"); // State for the selected entry method.
	const [entryInput, setEntryInput] = useState<string>(""); // State for the input value.
	const [keyboardHeight, setKeyboardHeight] = useState(0); // State for the height of the keyboard.
	const otherInputRef = useRef<HTMLInputElement>(null); // Reference to the input element.
	const containerRef = useRef<HTMLDivElement>(null); // Reference to the container element.
	const [scrollPosition, setScrollPosition] = useState(0); // State for the scroll position.

	useEffect(() => {
		const storedEntryMethod =
			localStorage.getItem("entryMethod") || "공동현관 비밀번호"; // Get the saved entry method from localStorage.
		const storedEntryInput =
			localStorage.getItem("entryInput") || ""; // Get the saved input value from localStorage.
		setEntryMethod(storedEntryMethod); // Set the entry method state.
		setEntryInput(storedEntryInput); // Set the input value state.

		const handleResize = () => {
			if (window.visualViewport) {
				// Check if the visual viewport is available.
				const height = window.visualViewport.height; // Get the height of the visual viewport.
				const viewportHeight =
					document.documentElement.clientHeight; // Get the height of the entire viewport.
				const calculatedKeyboardHeight = viewportHeight - height; // Calculate the height of the keyboard.

				setKeyboardHeight(
					calculatedKeyboardHeight > 0
						? calculatedKeyboardHeight
						: 0
				); // Set the keyboard height state.
			}
		};

		const handleScroll = () => {
			setScrollPosition(window.scrollY); // Update the scroll position state when the page is scrolled.
		};

		if (window.visualViewport) {
			window.visualViewport.addEventListener(
				"resize",
				handleResize
			); // Add an event listener for when the viewport is resized.
		}
		window.addEventListener("scroll", handleScroll); // Add an event listener for when the page is scrolled.

		handleResize(); // Call the handleResize function initially.
		handleScroll(); // Call the handleScroll function initially.

		return () => {
			if (window.visualViewport) {
				window.visualViewport.removeEventListener(
					"resize",
					handleResize
				); // Remove the resize event listener.
			}
			window.removeEventListener("scroll", handleScroll); // Remove the scroll event listener.
		};
	}, []);

	useEffect(() => {
		localStorage.setItem("entryMethod", entryMethod); // Save the entry method to localStorage.
		if (
			entryMethod !== "공동현관 비밀번호" &&
			entryMethod !== "기타"
		) {
			localStorage.setItem("entryInput", ""); // Clear the input value in localStorage if the entry method changes.
			setEntryInput(""); // Clear the input value state.
		}
	}, [entryMethod]);

	useEffect(() => {
		localStorage.setItem("entryInput", entryInput); // Save the input value to localStorage.
	}, [entryInput]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setEntryInput(e.target.value); // Update the input value state when the input changes.
	};

	const handleSave = () => {
		if (entryMethod && entryInput) {
			// Check if both the entry method and input value are set.
			localStorage.setItem("entryInput", entryInput); // Save the input value to localStorage.
			router.push("/enterAddress/inputAddress/entryMethod"); // Navigate to the next page.
		}
	};

	const handleBackNavigation = () => {
		router.push("/enterAddress/inputAddress/findAddress"); // Navigate to the previous page.
	};

	const handleReset = () => {
		setEntryMethod("공동현관 비밀번호"); // Reset the entry method state.
		setEntryInput(""); // Reset the input value state.
		localStorage.removeItem("entryMethod"); // Remove the entry method from localStorage.
		localStorage.removeItem("entryInput"); // Remove the input value from localStorage.
	};

	const handleFocus = () => {
		if (containerRef.current) {
			containerRef.current.scrollTop = 0; // Scroll the container to the top when the input is focused.
		}
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			otherInputRef.current &&
			!otherInputRef.current.contains(event.target as Node)
		) {
			// Check if the click is outside the input element.
			if (containerRef.current) {
				containerRef.current.scrollTop = 0; // Scroll the container to the top.
			}
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside); // Add an event listener for clicks outside the input.
		return () => {
			document.removeEventListener(
				"mousedown",
				handleClickOutside
			); // Remove the event listener when the component is unmounted.
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className="flex flex-col items-center bg-gray-50 min-h-screen"
		>
			{" "}
			{/* Container div for the entire component */}
			<div className="w-full max-w-[430px] bg-static-white flex flex-col pb-[16px] overflow-auto">
				{" "}
				{/* Container for the content */}
				<ProgressBar progress={62.5} /> {/* Progress bar */}
				<TopNavigation
					text="배송지 추가"
					onClick={handleBackNavigation}
				>
					<ResetButton label="초기화" onClick={handleReset} />{" "}
					{/* Reset button */}
				</TopNavigation>
				<div className="px-[24px] pt-[16px]">
					<div className="text-headline-1 font-semibold mb-[6px]">
						공동현관 출입 방법
					</div>
					<div className="text-label-1-reading font-normal text-label-alternative mb-[20px]">
						입력된 공동현관 비밀번호는 새벽 배송을 위해 필요한
						정보로, 서비스 이용 후 파기됨을 약속드립니다.
					</div>
				</div>
				<div className="text-body-1-normal mb-[12px] ml-[24px]">
					<CustomRadioButton
						id="password"
						name="entry-method"
						value="password"
						label="공동현관 비밀번호"
						checked={entryMethod === "공동현관 비밀번호"}
						onChange={() => setEntryMethod("공동현관 비밀번호")}
					/>
					{entryMethod === "공동현관 비밀번호" && (
						<div className="mt-2 ml-[28px] mr-[24px]">
							<EnterPlaceholderSmaller
								id="password-input"
								placeholder="예) 종 1234 열쇠"
								value={entryInput}
								onChange={handleInputChange}
								onFocus={handleFocus}
								ref={otherInputRef}
							/>
							<div className="flex items-center text-caption-2 font-medium mt-[8px]">
								<InfoIcon className="ml-[8px] mr-[4px]" />
								입력한 방법으로 출입이 불가능한 경우, 수거/배송이
								어렵습니다.
							</div>
						</div>
					)}
				</div>
				<div className="mb-[12px] ml-[24px]">
					<CustomRadioButton
						id="free-access"
						name="entry-method"
						value="free-access"
						label="자유출입 가능 (공동현관 없음)"
						checked={
							entryMethod === "자유출입 가능 (공동현관 없음)"
						}
						onChange={() =>
							setEntryMethod("자유출입 가능 (공동현관 없음)")
						}
					/>
				</div>
				<div className="mb-[12px] ml-[24px]">
					<CustomRadioButton
						id="guard-call"
						name="entry-method"
						value="guard-call"
						label="경비실 호출"
						checked={entryMethod === "경비실 호출"}
						onChange={() => setEntryMethod("경비실 호출")}
					/>
				</div>
				<div className="mb-[12px] ml-[24px]">
					<CustomRadioButton
						id="house-call"
						name="entry-method"
						value="house-call"
						label="세대 호출"
						checked={entryMethod === "세대 호출"}
						onChange={() => setEntryMethod("세대 호출")}
					/>
				</div>
				<div className="mb-[12px] ml-[24px]">
					<CustomRadioButton
						id="other"
						name="entry-method"
						value="other"
						label="기타"
						checked={entryMethod === "기타"}
						onChange={() => setEntryMethod("기타")}
					/>
					{entryMethod === "기타" && (
						<div className="mt-2 ml-[28px] mr-[24px]">
							<EnterPlaceholderSmaller
								id="other-input"
								placeholder="예) 뒤쪽 문은 항상 열려있습니다"
								value={entryInput}
								onChange={handleInputChange}
								onFocus={handleFocus}
								ref={otherInputRef}
							/>
							<div className="flex items-center text-caption-2 font-medium mt-[8px]">
								<InfoIcon className="ml-[8px] mr-[4px]" />
								입력한 방법으로 출입이 불가능한 경우, 수거/배송이
								어렵습니다.
							</div>
						</div>
					)}
				</div>
				<div className="mb-[100px]">
				<SavedFieldsPage/>

				</div>
				
				<div className="flex-grow w-full max-w-[430px] bg-static-white"></div>
				<div
					className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[430px] bg-white transition-transform duration-300"
					style={{
						height: "100px",
						transform: `translateY(-${Math.max(
							0,
							keyboardHeight - scrollPosition
						)}px)`,
					}}
				>
					<>
						<div className="w-full max-w-[430px] h-[100px] bg-line-normal border shadow-elevation-shadow-normal">
							<ActionButton
								label="다음"
								onClick={handleSave}
								className="w-full text-primary-normal"
							/>
						</div>
					</>
				</div>
			</div>
		</div>
	);
};

export default EntryMethod; // Export the component so it can be used in other parts of the app.
