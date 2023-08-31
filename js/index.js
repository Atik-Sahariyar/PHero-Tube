const handleCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await response.json();

    let categoryName = document.getElementById('category-name');
    const categorys = data.data;
    categorys.forEach(category => {
        let div = document.createElement('div');
        div.innerHTML = `
        <button onclick = "handleLoadVideos('${category.category_id}')" class="px-3 py-2 rounded-md bg-gray-200">${category.category}</button>
        `
        categoryName.appendChild(div);

    });

}

handleCategory();

const handleLoadVideos = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await response.json();
    console.log(data.data)
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    data.data?.forEach(video => {
        console.log(video)
        const div = document.createElement('div');
        div.innerHTML = `
       <div class=" w-[310px] bg-base-100  relative overflow-hidden">
                    
                     <figure class =" ">
                       <img src=${video?.thumbnail} alt="" class = "w-[394px] h-[190px] rounded-lg ">
                      </figure>
               
                           <div class="avater online flex gap-2 p-2">
                               <div class="w-14">
                                   <img src=${video?.authors[0]?.profile_picture} alt="" class=" w-10 h-10 rounded-full ">
                               </div>
                               <div>
                                <h4 class="font-bold ">${video?.title}<h4>
                                <p>${video?.authors[0]?.profile_name}</p>
                                <p>${video?.others?.views} views</p>
                               </div>
                           </div>
        </div>
       `;
        console.log(video)
        cardContainer.appendChild(div)
    })
    console.log(data.data);

}
