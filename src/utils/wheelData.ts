
export interface WheelItem {
  text: string;
  fullscreenText: string;
  explanation: string;
}

export const wheelItems: WheelItem[] = Array(41).fill(null).map((_, index) => {
  // Add "AGAIN" at positions 0, 10, 20, 30
  if (index === 0 || index === 10 || index === 20 || index === 30) {
    return {
      text: "A",
      fullscreenText: "AGAIN",
      explanation: "You get to spin AGAIN! This is an opportunity for another chance."
    };
  } else {
    // For all other positions, use the corresponding number (1-40)
    // We need to adjust the index because position 0 is "AGAIN"
    let numberToShow = index;
    if (index > 30) numberToShow -= 3;
    else if (index > 20) numberToShow -= 2;
    else if (index > 10) numberToShow -= 1;
    
    return {
      text: `${numberToShow}`,
      fullscreenText: `${numberToShow}`,
      explanation: `You landed on number ${numberToShow}. This result may affect your game outcome.`
    };
  }
});
