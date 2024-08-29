import { useState, useEffect, useRef } from "react";

const truncateText = (text, maxWidth, element) => {
  element.textContent = text;
  if (element.scrollWidth > maxWidth) {
    let truncatedText = text;
    while (element.scrollWidth > maxWidth && truncatedText.length > 0) {
      truncatedText = truncatedText.slice(0, -1);
      element.textContent = truncatedText + "...";
    }
    return truncatedText + "...";
  }
  return text;
};

export default truncateText;