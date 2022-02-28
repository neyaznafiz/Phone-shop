// get input value
const loadSearchPhone = () => {
    const searchValue = document.getElementById('search-input')
    const searchText = searchValue.value
    //  clear search value
    searchValue.value = ''

    //  fetch url
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))
}
loadSearchPhone()

// display phone
const displaySearchResult = phones => {
    console.log(phones)
    const searchResult = document.getElementById('search-result')
    // clear previous section
    searchResult.textContent = ''

    for (const phone of phones) {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div  class="card">
        <div class="col-lg-6 mx-auto my-2"> 
        <img src="${phone.image}" class="card-img-top">
        </div>

        <div class="m-3 text-center">
        <h2> Brand:${phone.brand} </h2>
        <p>Model: ${phone.phone_name} </p>
        <p>ID: ${phone.slug} </p>
        <button class="bg-primary rounded text-white m-2"> Explore More Details </button>
        </div>
        </div>
        `
        searchResult.appendChild(div)
    }

}