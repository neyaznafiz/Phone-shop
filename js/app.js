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
    
            <a href="#show-details" onclick="loadPhoneDetails('${phone.slug}')" class="bg-dark shadow  text-white m-1 p-2" style="border-radius: 10px; text-decoration: none;"> Explore Details </a>
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
            <div  class="card mx-auto mt-4 shadow-lg p-4 rounded-4" style="width: 100%;">
            <div class="col-lg-6 mx-auto my-2 text-center"> 
            <img src="${phone.image}" class="card-img-top w-50">
            </div>
            <div class="card-body text-center">
                <h2> Brand: ${phone.brand} </h2>
                <h5> Model: ${phone.name}</h5>
                <p> <span id="release-date">Release Date: ${phone.releaseDate ? phone.releaseDate : 'Not found'}</span> <br><br>
                ChipSet: ${phone.mainFeatures.chipSet}<br><br>
                Storage: ${phone.mainFeatures.storage}<br><br>
                Display: ${phone.mainFeatures.displaySize}<br><br>
                Sensors: ${phone.mainFeatures.sensors}<br><br>
                Bluetooth: ${phone.others ? phone.others.Bluetooth: 'Information not found'}<br><br>
                GPS: ${phone.others ? phone.others.GPS: 'Information not found'}<br><br>
                WLAN: ${phone.others ? phone.others.WLAN: 'Information not found'}<br><br>
                NFC: ${phone.others ? phone.others.NFC: 'Information not found'}<br><br>
                Radio: ${phone.others ? phone.others.Radio: 'Information not found'}<br><br>
                USB: ${phone.others ? phone.others.USB: 'Information not found'}<br><br>
                </p>
            </div>
            </div>
    `

}