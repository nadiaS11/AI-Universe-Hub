const loadAiData = async (isSorted, showAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
  const data = await res.json();
  const getAllAi = data.data.tools;
  displayAi(getAllAi, isSorted, showAll);
};
//display ai div
const displayAi = (getAllAi, isSorted, showAll) => {
  const aiContainer = document.getElementById("ai-container");
  aiContainer.innerHTML = "";
  let slicedData = "";
  if (!showAll) {
    slicedData = getAllAi.slice(0, 6);
    if (isSorted) {
      slicedData = getAllAi.sort((a, b) => {
        const date1 = new Date(a.published_in);
        const date2 = new Date(b.published_in);
        if (date1 > date2) return 1;
        else if (date1 < date2) return -1;
        return 0;
      });
    }
  } else {
    slicedData = getAllAi;
    if (isSorted) {
      slicedData = getAllAi.sort((a, b) => {
        const date1 = new Date(a.published_in);
        const date2 = new Date(b.published_in);
        if (date1 > date2) return 1;
        else if (date1 < date2) return -1;
        return 0;
      });
    }
  }

  // let slicedData = getAllAi.slice(0, showAll ? getAllAi.length : 6);

  // if (isSorted) {
  //   slicedData.sort((a, b) => {
  //     const date1 = new Date(a.published_in);
  //     const date2 = new Date(b.published_in);
  //     if (date1 > date2) return 1;
  //     else if (date1 < date2) return -1;
  //     return 0;
  //   });
  // } else {
  //   slicedData = slicedData;
  // }
  // console.log(slicedData);
  slicedData.forEach((ai) => {
    const aiCard = document.createElement("div");
    aiCard.classList = `card bg-base-100 shadow-xl`;

    aiCard.innerHTML = `
    <figure class="px-10 pt-10">
            <img onerror="replaceImage(this)"
              src="${ai.image}"
              class="rounded-xl"
            />
          </figure>
          <div class="card-body ">
          <p class="card-text font-semibold">Features</p>
          <p class="text-xs text-gray-600">${ai.features[0]}</p>
          <p class="text-xs text-gray-600">${ai.features[1]}</p>
          <p class="text-xs text-gray-600">${
            ai?.features[2] ? ai.features[2] : " "
          }</p>
          
          <hr>
               <div class="flex items-center justify-between ">
               <div><h2 class="card-title">${ai.name}</h2>
            <p>${ai.published_in}</p></div>
              <button onclick="handleArrow('${
                ai.id
              }')" class="btn btn-sm btn-circle btn-error btn-outline">></button> 
               </div>        
          </div>
    `;
    aiContainer.appendChild(aiCard);
  });
};
const replaceImage = (e) => {
  e.src = `https://www.proremodeler.com/sites/default/files/Jasper%20copy.jpg`;
};
const handleShowAll = (showAll) => {
  loadAiData(showAll);
};

const handleArrow = async (modalId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${modalId}`
  );
  const data = await res.json();
  const modalInfo = data.data;
  console.log(modalInfo);
  const modalContainer = document.getElementById("modal-container");
  const modalDiv = document.createElement("div");
  modalDiv.innerHTML = `
    <dialog id="my_modal" class="modal modal-bottom sm:modal-middle">
  <form method="dialog" class="modal-box">
    <h3 class="font-bold text-lg">Hello! ${modalId}</h3>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>`;
  modalContainer.appendChild(modalDiv);

  const modal = document.getElementById("my_modal");
  modal.showModal();
};

const handleSort = (isSorted) => {
  // const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
  // const data = await res.json();
  // const getAllAi = data.data.tools;
  // getAllAi.sort((a, b) => {
  //   const date1 = new Date(a.published_in);
  //   const date2 = new Date(b.published_in);
  //   if (date1 > date2) return 1;
  //   else if (date1 < date2) return -1;
  //   return 0;
  // });
  loadAiData(isSorted);
};
loadAiData();
