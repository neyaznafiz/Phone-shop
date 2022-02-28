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
// loadSearchPhone()

// display phone
const displaySearchResult = phones => {
    // console.log(phones)
    const searchResult = document.getElementById('search-result')
    // clear previous section
    searchResult.textContent = ''
    
    for (const phone of phones) {
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
        <img src="${phone.image}" class="card-img-top">
        <h2>${phone.brand}</h2>
        `
        searchResult.appendChild(div)
    }

}