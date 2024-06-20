"use client";
import React, { FC, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import TopNavigation from "@/app/(public)/enterAddress/components/TopNavigation/page";
import ActionButton from "@/app/(public)/enterAddress/components/ActionButton/page";
import ResetButton from "@/app/(public)/enterAddress/components/ResetButton/page";
import ProgressBar from "@/app/(public)/enterAddress/components/ProgressBar/page";
import EnterPlaceholderSmaller from "@/app/(public)/enterAddress/components/EnterPlaceHolderSmaller/page";
import InfoIcon from "@/assets/icons/others/information.svg";
import CustomRadioButton from "@/app/(public)/enterAddress/components/CustomRadioButton/page";
import SavedFieldsPage from "../../components/SavedFieldsPage/page";

const EntryMethod: React.FC = () => {
	const router = useRouter();
	const [entryMethod, setEntryMethod] =
		useState<string>("공동현관 비밀번호");
	const [entryInput, setEntryInput] = useState<string>("");
	const otherInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const storedEntryMethod =
			localStorage.getItem("entryMethod") || "공동현관 비밀번호";
		const storedEntryInput =
			localStorage.getItem("entryInput") || "";
		setEntryMethod(storedEntryMethod);
		setEntryInput(storedEntryInput);
	}, []);

	useEffect(() => {
		localStorage.setItem("entryMethod", entryMethod);
		if (
			entryMethod !== "공동현관 비밀번호" &&
			entryMethod !== "기타"
		) {
			localStorage.setItem("entryInput", "");
			setEntryInput("");
		}
	}, [entryMethod]);

	useEffect(() => {
		localStorage.setItem("entryInput", entryInput);
	}, [entryInput]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setEntryInput(e.target.value);
	};

	const handleSave = () => {
		if (entryMethod && entryInput) {
			localStorage.setItem("entryInput", entryInput);
			router.push("/enterAddress/inputAddress/entryMethod"); // Adjust the path to your next page
		}
	};

	const handleBackNavigation = () => {
		router.push("/enterAddress/inputAddress/findAddress"); // Adjust the path to your previous page
	};

	const handleReset = () => {
		setEntryMethod("공동현관 비밀번호");
		setEntryInput("");
		localStorage.removeItem("entryMethod");
		localStorage.removeItem("entryInput");
	};

	const handleFocus = () => {
		if (otherInputRef.current) {
			otherInputRef.current.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	};

	return (
		<div className="flex flex-col justify-center items-center bg-gray-50 min-h-screen">
			<div className="w-full max-w-[430px] bg-static-white flex flex-col pb-[16px]">
				<ProgressBar progress={75} />
				<TopNavigation
					text="배송지 추가"
					onClick={handleBackNavigation}
				>
					<ResetButton label="초기화" onClick={handleReset} />
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
				<SavedFieldsPage />
			</div>
			<div className="flex-grow w-full max-w-[430px] bg-static-white"></div>
			<div className="relative bottom-0 left-0 right-0 mx-auto w-full max-w-[430px] bg-white">
				<div className="w-full max-w-[430px] h-[100px] bg-line-normal border shadow-elevation-shadow-normal">
				<ActionButton
					label="다음"
					onClick={handleSave}
					className="w-full text-primary-normal"
				/>
				</div>
			</div>
		</div>
	);
};

export default EntryMethod;
