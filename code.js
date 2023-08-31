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
  let slicedData = [];
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
  loadAiData(false, showAll);
};

const handleArrow = async (modalId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${modalId}`
  );
  const data = await res.json();
  const modalInfo = data.data;

  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = "";
  const modalDiv = document.createElement("div");
  modalDiv.innerHTML = `
    <dialog id="my_modal" class="modal  modal-bottom sm:modal-middle ">
    
  <form method="dialog" class="bg-base-100  p-4 w-11/12 lg:w-3/4 mx-auto rounded-3xl">
   <button class="btn btn-sm btn-circle btn-error absolute right-2 top-2 z-[999]">✕</button>
    <div class="grid grid-cols-2 gap-4  ">  
  <div class="rounded-3xl space-y-4 border border-[#EB5757] border-solid p-4 bg-[#EB57570D]">
    <h2 class="font-semibold text-lg">${modalInfo.description}</h2>
    <div class="flex items-center justify-center lg:justify-evenly md:gap-2   font-medium">
    <div class="text-center bg-white text-[#03A30A] rounded-2xl p-2">${
      modalInfo.pricing[0].plan
    }</br> ${modalInfo.pricing[0].price}</div>
    <div class="text-center bg-base-100 text-[#F28927] rounded-2xl p-2">${
      modalInfo.pricing[1].plan
    }</br>  ${modalInfo.pricing[1].price}</div>
    <div class="text-center bg-base-100 text-[#EB5757] rounded-2xl p-2">${
      modalInfo.pricing[2].plan
    }</br>  ${modalInfo.pricing[2].price.slice(0, 10)}</div>
    
    </div>
    
  </div>
  <div class="w-full bg-base-100 rounded-3xl border border-[#E7E7E7] border-solid">
  <figure class="p-4"><img class="rounded-2xl" src=${
    modalInfo.image_link[0]
  } /></figure>
  <div class=" text-center space-y-3 p-4">
    <h2 class="font-semibold text-xl">${
      modalInfo.input_output_examples[0].input
    }</h2>
    <p>${modalInfo.input_output_examples[0].output}</p>
    <p> </p>
  </div>
</div>
</div>
    
  </form>
</dialog>`;
  modalContainer.appendChild(modalDiv);
  console.log();
  const modal = document.getElementById("my_modal");
  modal.showModal();
};

const handleSort = (isSorted) => {
  loadAiData(isSorted, false);
};
loadAiData();
