let videoData = [];
const handleCategory = async () => {
    const response = await fetch(
        'https://openapi.programming-hero.com/api/videos/categories'
    );

    const data = await response.json();

    let categoryName = document.getElementById('category-name');
    const categorys = data.data;
    categorys.forEach((category) => {
        let div = document.createElement('div');
        div.innerHTML = `
        <button onclick = "handleLoadVideos('${category.category_id}')" class="px-3 py-2 rounded-md bg-gray-200">${category.category}</button>
        `;
        categoryName.appendChild(div);
    });
};

document.getElementById('sort-by-view').addEventListener('click', () => {
    videoData.sort((a, b) => {
        const viewsA = parseFloat(a.others.views.replace('K', '')) * 1000; // Convert 'K' views to actual numbers
        const viewsB = parseFloat(b.others.views.replace('K', '')) * 1000; // Convert 'K' views to actual numbers

        return viewsB - viewsA;
    });
    renderVideo();
});

const handleLoadVideos = async (categoryId) => {
    const response = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );
    const data = await response.json();
    console.log(data.data);

    videoData = [...data.data];
    renderVideo();
};

const renderVideo = () => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    videoData?.forEach((videoData) => {
        const uploadTime = uploadDate();
        const div = document.createElement('div');
        div.innerHTML = `
           <div class=" w-[310px] bg-base-100  relative overflow-hidden">
                        
                         <div class = "relative ">
                         <figure class =" ">
                           <img src=${videoData?.thumbnail} alt="" class = "w-[394px] h-[190px] rounded-lg ">
                          </figure>
                         <p class = "text-end relative mr-3 ml-auto -mt-7 "> <span id = "upload-time" class =" text-white w-auto px-1 bg-black rounded">${uploadTime}</span> </p>
                         </div>
                   
                               <div class="avater online flex gap-2 p-2">
                                   <div class="w-14">
                                       <img src=${videoData?.authors[0]?.profile_picture} alt="" class=" w-10 h-10 rounded-full ">
                                   </div>
                                   <div>
                                    <h4 class="font-bold ">${videoData?.title}<h4>
                                    <p>${videoData?.authors[0]?.profile_name}</p>
                                    <p>${videoData?.others?.views} views</p>
                                   </div>
                               </div>
            </div>
           `;
        cardContainer.appendChild(div);
        console.log(videoData)
        // find upload time
        function uploadDate() {
            const uploadTime = parseFloat(videoData?.others?.posted_date);
            const hours = Math.floor(uploadTime / 3600);
            const minutes = Math.floor((uploadTime % 3600) / 60);
            let time = hours + 'hrs ' + minutes + 'min ago';

            console.log(hours);
            if (isNaN(uploadTime)) {
                return;
            }
            else {
                return time;
            }
        }
        console.log(uploadTime);
    });
};

handleCategory();
