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
        // inner HTML
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
    // inner HTML
    showDetails.innerHTML = `
            <div  class="card mx-auto mt-4 shadow-lg p-4 rounded-4">
            <div class="col-lg-6 mx-auto my-2 text-center"> 
            <img src="${phone.image}" class="card-img-top w-50">
            </div>
            <div class="card-body text-center">
                <h2> Brand: ${phone.brand} </h2>
                <h4> Model: ${phone.name}</h4>
                <p> Release Date: ${phone.releaseDate ? phone.releaseDate : 'Not found'}</p>

                <h5> Main Features</h5>
                <p>ChipSet: ${phone.mainFeatures.chipSet}</p>
                <p>Storage: ${phone.mainFeatures.storage}</p>
                <p>Display: ${phone.mainFeatures.displaySize}</p>
                <p>Sensors: ${phone.mainFeatures.sensors}</p>

                <h5> Others Features </h5>
                <p>Bluetooth: ${phone.others ? phone.others.Bluetooth : 'Information not available'}</p>
                <p>GPS: ${phone.others ? phone.others.GPS : 'Information not available'}</p>
                <p>WLAN: ${phone.others ? phone.others.WLAN : 'Information not available'}</p>
                <p>NFC: ${phone.others ? phone.others.NFC : 'Information not available'}</p>
                <p>Radio: ${phone.others ? phone.others.Radio : 'Information not available'}</p>
                <p>USB: ${phone.others ? phone.others.USB : 'Information not available'}</p>
            </div>
            </div>
    `

}