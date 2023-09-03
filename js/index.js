let videoData = [];
const handleCategory = async () => {
    const response = await fetch(
        'https://openapi.programming-hero.com/api/videos/categories'
    );

    const data = await response.json();

    let categoryName = document.getElementById('category-name');
    const categorys = data.data;
    categorys.forEach((category, index) => {
        let div = document.createElement('div');
        div.innerHTML = `
                <button id="category-button-${category.category_id}" onclick="handleLoadVideos('${category.category_id}')" class="px-3 py-2 rounded-md bg-gray-200">${category.category}</button>
                `;
        categoryName.appendChild(div);

        // Check if it's the first button and click it
        if (index === 0) {
            const firstButton = document.getElementById(`category-button-${category.category_id}`);
            firstButton.click();
        }
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


    videoData = [...data.data];
    renderVideo();

    //if No data found
    const emptyData = () => {
        const cardsContainer = document.getElementById('empty-data');
        cardsContainer.innerHTML = '';
        const div = document.createElement('div');
        cardsContainer.appendChild(div);
        if (data.data.length === 0) {

            const div2 = document.createElement('div');
            div2.classList.add("flex", "text-center", "justify-center")
            div2.innerHTML = `
             <div class =" mt-20">
             <img src="./js/not-found.png" alt="" class = "w-16 h-16 ml-14 mb-3">
             <p>Oops!! Sorry, There is no <br> content here</p>
             </div>
             `
            div.appendChild(div2);
        }
    }

    emptyData();
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
                         <p class = "text-end relative mr-3 ml-auto -mt-7 "> <span id = "upload-time" class =" text-white w-auto px-1 ${uploadTime ? ' bg-black' : ''} rounded">${uploadTime ? uploadTime : ''}</span> </p>
                         </div>
                   
                               <div class="avater online flex gap-2 p-2">
                                   <div class="w-14">
                                       <img src=${videoData?.authors[0]?.profile_picture} alt="" class=" w-10 h-10 rounded-full ">
                                   </div>
                                   <div>
                                    <h4 class="font-bold ">${videoData?.title}<h4>
                                    <div class = "flex gap-1">
                                    <p>${videoData?.authors[0]?.profile_name}</p>
                                    ${videoData?.authors[0]?.verified ? `<img src="./js/verify.png" class = "w-6 h-6" alt="">` : ''}
                                    </div>
                                    <p>${videoData?.others?.views} views</p>
                                   </div>
                               </div>
            </div>
           `;
        cardContainer.appendChild(div);
        // find upload time
        function uploadDate() {
            const uploadTime = parseFloat(videoData?.others?.posted_date);
            const hours = Math.floor(uploadTime / 3600);
            const minutes = Math.floor((uploadTime % 3600) / 60);
            let time = hours + 'hrs ' + minutes + 'min ago';
            if (isNaN(uploadTime)) {
                return;
            }
            else {
                return time;
            }
        }
    });
};



handleCategory();

// blogs
const blogButton = document.getElementById('blog-button');

blogButton.addEventListener('click', function(){
    const blogPageURL  = './blog.html';

    window.open(blogPageURL);
})