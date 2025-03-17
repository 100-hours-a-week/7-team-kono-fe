interface StylesConstants {
  // 레이아웃 관련
  flexCenter: string;
  flexBetween: string;
  flexStart: string;
  flexEnd: string;
  flexCol: string;
  
  // 반응형 관련
  responsive: string;
  paddingX: string;
  paddingY: string;
  
  // 섹션 및 컨테이너 관련
  sectionLayout: string;
  container: string;
  cardStyle: string;
  
  // 버튼 스타일
  buttonPrimary: string;
  buttonSecondary: string;
  buttonOutline: string;
  
  // 텍스트 스타일
  heading1: string;
  heading2: string;
  heading3: string;
  paragraph: string;
  caption: string;
  
  // 효과 및 애니메이션
  hoverEffect: string;
  transition: string;
}

const styles: StylesConstants = {
  // 레이아웃 관련
  flexCenter: "flex justify-center items-center",
  flexBetween: "flex justify-between items-center",
  flexStart: "flex justify-start items-center",
  flexEnd: "flex justify-end items-center",
  flexCol: "flex flex-col",
  
  // 반응형 관련
  responsive: "w-full xs:w-[360px] sm:w-[540px] md:w-[720px] lg:w-[960px]",
  paddingX: "px-4 sm:px-6 md:px-8 lg:px-10",
  paddingY: "py-4 sm:py-6 md:py-8",
  
  // 섹션 및 컨테이너 관련
  sectionLayout: "w-full md:w-[85%] mx-auto py-8 md:py-12 bg-white",
  container: "container mx-auto px-4",
  cardStyle: "bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow",
  
  // 버튼 스타일
  buttonPrimary: "px-6 py-3 bg-primary text-white font-pretendardBold rounded-lg hover:opacity-90 transition-all",
  buttonSecondary: "px-6 py-3 bg-secondary text-white font-pretendardBold rounded-lg hover:opacity-90 transition-all",
  buttonOutline: "px-6 py-3 border-2 border-primary text-primary font-pretendardMedium rounded-lg hover:bg-primary hover:text-white transition-all",
  
  // 텍스트 스타일
  heading1: "font-pretendardBold text-3xl md:text-4xl lg:text-5xl text-mainText",
  heading2: "font-pretendardBold text-2xl md:text-3xl text-mainText",
  heading3: "font-pretendardBold text-xl md:text-2xl text-mainText",
  paragraph: "font-pretendard text-base text-subText",
  caption: "font-pretendard text-sm text-subText",
  
  // 효과 및 애니메이션
  hoverEffect: "transform hover:scale-105 transition duration-300",
  transition: "transition-all duration-300 ease-in-out",
};

export default styles;