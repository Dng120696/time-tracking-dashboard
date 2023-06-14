"use strict";
const rearBox = document.querySelectorAll(".rear-box");
  
const dataFetch = (timeframe) => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item, i) => {
        const dataTitle = item.title;
        const dataCurrent = item.timeframes[timeframe].current;
        const dataPrevious = item.timeframes[timeframe].previous;

        const box = rearBox[i];
        console.log(box);
        const title = box.querySelector(".title");
        const current = box.querySelector(".current");
        const previous = box.querySelector(".previous");
        console.log(title,current,previous);
        title.textContent = `${dataTitle}`;
        current.textContent = `${dataCurrent}hrs`;
        previous.textContent = `Last ${
          timeframe === "daily"
            ? "Day"
            : timeframe === "weekly"
            ? "Week"
            : "Month"
        } - ${dataPrevious}hrs`;
      });
    })
    .catch((error) => {
      console.error("Error fetching JSON file:", error);
    });
};

const linkItem = document.querySelectorAll(".link");

linkItem.forEach((item, i) => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
    if (i === 0) {
      dataFetch("daily");
    } else if (i === 1) {
      dataFetch("weekly");
    } else if (i === 2) {
      dataFetch("monthly");
    }
    linkItem.forEach((otheritem) => {
      if (otheritem !== item) {
        otheritem.classList.remove("active");
      }
    });
  });
});
