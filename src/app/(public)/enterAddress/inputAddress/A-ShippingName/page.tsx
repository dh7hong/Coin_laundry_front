"use client";
import React, { FC, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import TopNavigation from "@/app/(public)/enterAddress/components/TopNavigation/page";
import EnterPlaceholder from "@/app/(public)/enterAddress/components/EnterPlaceholder/page";
import ActionButtonGray from "@/app/(public)/enterAddress/components/ActionButtonGray/page";
import ActionButton from "@/app/(public)/enterAddress/components/ActionButton/page";
import InputStatic from "@/app/(public)/enterAddress/components/InputStatic/page";
import ResetButton from "@/app/(public)/enterAddress/components/ResetButton/page";
import ProgressBar from "@/app/(public)/enterAddress/components/ProgressBar/page";

const ShippingName: FC = () => {
  const router = useRouter();
  const [isButtonGray, setIsButtonGray] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedInput = localStorage.getItem("shippingName");
    if (savedInput) {
      setInputValue(savedInput);
      setIsButtonGray(false);
    }

    const handleResize = () => {
      const height = window.visualViewport.height;
      const viewportHeight = document.documentElement.clientHeight;
      const calculatedKeyboardHeight = viewportHeight - height;
      
      // Log the keyboard height to the console
      console.log(`Keyboard height: ${calculatedKeyboardHeight}px`);

      setKeyboardHeight(calculatedKeyboardHeight > 0 ? calculatedKeyboardHeight : 0);
    };

    window.visualViewport.addEventListener("resize", handleResize);

    return () => {
      window.visualViewport.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleBackNavigation = () => {
    router.push("/");
  };

  const handleSave = () => {
    if (inputRef.current) {
      const input = inputRef.current.value;
      localStorage.setItem("shippingName", input);
      setInputValue(input);
      setIsButtonGray(false);
      inputRef.current.blur();
    }
  };

  const handleReset = () => {
    localStorage.removeItem("shippingName");
    setInputValue("");
    setIsButtonGray(true);
  };

  const handleNextNavigation = () => {
    router.push("/enterAddress/inputAddress/B-ReceiverName");
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-[430px] bg-white flex flex-col">
        <ProgressBar progress={12.5} />
        <TopNavigation text="배송지 추가" onClick={handleBackNavigation}>
          <ResetButton label="초기화" onClick={handleReset} />
        </TopNavigation>
        <div className="ml-[24px] my-[30px] text-headline-1 font-semibold">
          세탁물을 받으실 주소를 입력해주세요!
        </div>
        <div className="w-full max-w-[430px] px-[24px]">
          <div className="mb-[8px] text-label-1-normal font-semibold text-label-normal text-left">
            배송지 이름
          </div>
          {isButtonGray ? (
            <EnterPlaceholder
              id="enterShippingNameInput"
              placeholder="배송지 이름을 입력해주세요"
              ref={inputRef}
            />
          ) : (
            <InputStatic value={inputValue} />
          )}
        </div>
      </div>
      <div className="flex-grow w-full max-w-[430px] bg-white"></div>
      <div
        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[430px] bg-white transition-transform duration-300"
        style={{
          height: "100px",
          marginBottom: keyboardHeight,
        }}
      >
        {isButtonGray ? (
          <ActionButtonGray
            label="다음"
            onClick={handleSave}
            className="w-full"
          />
        ) : (
          <ActionButton
            label="다음"
            onClick={handleNextNavigation}
            className="w-full text-primary-normal"
          />
        )}
      </div>
    </div>
  );
};

export default ShippingName;
