// laoding event
const loading = displayStyle => {
    document.getElementById('loading').style.display = displayStyle
}

// get input value
const loadSearchPhone = () => {
    const searchValue = document.getElementById('search-input')
    // loading spinner
    loading('block')

    const searchText = searchValue.value

    // empty string error handle  
    if (searchText == '') {
        document.getElementById('error').style.display = 'block'
    }
    else {
        document.getElementById('error').style.display = 'none'
    }

    //  clear search value
    searchValue.value = ''
    // details section clear
    const detailsSection = document.getElementById('show-details')

    detailsSection.textContent = ''

    //  fetch url
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data.slice(0, 20)))
}
// loadSearchPhone()

// display phone
const displaySearchResult = phones => {
    // console.log(phones)
    const searchResult = document.getElementById('search-result')

    // show more button
    if (phones.length == 20) {
        document.getElementById('show-more').style.display = 'block'
    }
    else {
        document.getElementById('show-more').style.display = 'none'
    }

    // clear previous section
    searchResult.textContent = ''
    // show result

    phones.forEach(phone => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
            <div  class="card shadow-lg p-2">
            <div class="col-lg-6 mx-auto my-2"> 
            <img src="${phone.image}" class="card-img-top">
            </div>
    
            <div class="m-3 text-center">
            <h2> Brand:${phone.brand} </h2>
            <p>Model: ${phone.phone_name} </p>
            <p>ID: ${phone.slug} </p>
    
            <button onclick="loadPhoneDetails('${phone.slug}')" class="bg-dark border-0 shadow rounded text-white m-1 p-2"> Explore Details </button>
            </div>
            </div>
            `
        searchResult.appendChild(div)
    })
    // loading spinner
    loading('none')

}


// show phone details
const loadPhoneDetails = phoneId => {

    const phoneIdUrl = `https://openapi.programming-hero.com/api/phone/${phoneId}`

    fetch(phoneIdUrl)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = phone => {
    console.log(phone)
    const showDetails = document.getElementById('show-details')
    showDetails.innerHTML = `
            <div  class="card mx-auto mt-4 shadow-lg p-2 rounded-4" style="width: 75%;">
            <div class="col-lg-6 mx-auto my-2"> 
            <img src="${phone.image}" class="card-img-top">
            </div>
            <div class="card-body text-center">
                <h2> Brand: ${phone.brand} </h2>
                <h5> Model: ${phone.name}</h5>
                <p> <span id="release-date">Release Date: ${phone.releaseDate ? phone.releaseDate : 'Not found'}</span> <br><br>
                ChipSet: ${phone.mainFeatures.chipSet}<br><br>
                Storage: ${phone.mainFeatures.storage}<br><br>
                Display: ${phone.mainFeatures.displaySize}<br><br>
                Sensors: ${phone.mainFeatures.sensors}<br><br>
                Bluetooth: ${phone.others.Bluetooth}<br><br>
                GPS: ${phone.others.GPS}<br><br>
                </p>
            </div>
            </div>
    `

}

