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
    .then(data => console.log(data.data))
}
loadSearchPhone()