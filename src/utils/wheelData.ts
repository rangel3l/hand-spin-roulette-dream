
export interface WheelItem {
  text: string;
  fullscreenText: string;
  explanation: string;
}

export const wheelItems: WheelItem[] = Array(41).fill(null).map((_, index) => {
  if (index === 0 || index % 10 === 0) {
    return {
      text: "A",
      fullscreenText: "AGAIN",
      explanation: "You get to spin AGAIN! This is an opportunity for another chance."
    };
  } else if (index % 2 === 0) {
    return {
      text: `T${index}`,
      fullscreenText: `TEXT-${index}`,
      explanation: `This is explanation for even number text ${index}. It provides detailed information about this particular result.`
    };
  } else {
    return {
      text: `T${index}`,
      fullscreenText: `TEXT-${index}`,
      explanation: `This is explanation for odd number text ${index}. It contains important details you should know about this result.`
    };
  }
});
