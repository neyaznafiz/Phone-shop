// load results onclick search button function starts
const loadSearchResult = () => {
    const searchValue = document.getElementById('search-field').value
    // checking input value if its no empty
    if (searchValue.length != 0) {
        const caseSensitiveValue = searchValue.toLowerCase()
        const url = `https://openapi.programming-hero.com/api/phones?search=${caseSensitiveValue}`
        fetch(url)
            .then(res => res.json())
            // calling displayresylt function with the peremeter of fetched data
            .then(data => displayResult(data))
        // clearing input
        document.getElementById('search-field').value = ''
    }
    // if its empty than clearing all textcontent and calling errordisplay function
    else {
        document.getElementById('search-results').textContent = ''
        document.getElementById('display-details').textContent = ''
        document.getElementById('see-more').style.display = 'none'
        errorDisplay('block')
    }
}
// load results onclick search button function end
// common function for a error message
const errorDisplay = currentStatus => {
    document.getElementById('error-msg').style.display = currentStatus
}
// display result after fetch start here
const displayResult = (result) => {
    // removing error message if its showen
    errorDisplay('none')
    // checking if input keywords match any items in api
    if (result.status == false) {
        // showing error msg if not matched
        errorDisplay('block')
    }
    let sliced = result.data
    //see more button hiding if its visible
    document.getElementById('see-more').style.display = 'none'
    //checking the length of searched items
    if (result.data.length > 20) {
        // slicing the items into 20
        sliced = result.data.slice(0, 20)
        document.getElementById('see-more').style.display = 'block'
    }
    const seeMore = document.getElementById('see-more')
    // seemore button function starts here
    seeMore.onclick = () => {
        //sliced variable will change into full array if see more clicked
        sliced = result.data
        // clearing contents of textcontents if its avaliable
        document.getElementById('search-results').textContent = ''
        document.getElementById('display-details').textContent = ''
        // showing each card by foreach loop
        sliced.forEach(item => {
            const sectionContainer = document.getElementById('search-results')
            const div = document.createElement('div')
            div.classList.add('col')
            div.innerHTML = `
                        <div class="card h-100 bg-white">
                            <img src="${item.image}" class="card-img-top" alt="...">
                            <div class="card-body d-flex flex-column justify-content-between">
                                <h4 class="card-title fw-bold">Name: ${item.phone_name}</h4>
                                <h5 class="card-title fw-bold">Brand: ${item.brand}</h5>
                                <div class="d-flex justify-content-center">
                                    <button class="btn btn-primary w-75" onclick="loadDetails('${item.slug}')">See Details</button>
                                </div>
                            </div>
                        </div>
    `
            // appending template div to container
            sectionContainer.appendChild(div)
            // show more button hiding
            document.getElementById('see-more').style.display = 'none'
        })
    }
    // seemore button function ends here
    // clearing contents of textcontents if its avaliable
    document.getElementById('search-results').textContent = ''
    document.getElementById('display-details').textContent = ''
    // showing each card by foreach loop
    sliced.forEach(item => {
        const sectionContainer = document.getElementById('search-results')
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
                    <div class="card h-100 bg-white">
                        <img src="${item.image}" class="card-img-top" alt="...">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <h4 class="card-title fw-bold">Name: ${item.phone_name}</h4>
                            <h5 class="card-title fw-bold">Brand: ${item.brand}</h5>
                            <div class="d-flex justify-content-center">
                                <button class="btn btn-primary w-75" onclick="loadDetails('${item.slug}')">See Details</button>
                            </div>
                        </div>
                    </div>
`
        // appending template div to container
        sectionContainer.appendChild(div)
    })
}
// display result after fetch ends here
// load single item details starts here
const loadDetails = data => {
    const url = `https://openapi.programming-hero.com/api/phone/${data}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}
// load single item details ends here
// display single item detalis starts here
const displayDetails = details => {
    // clearing single details div if its available
    document.getElementById('display-details').textContent = ''
    const detailsDiv = document.getElementById('display-details')
    const div = document.createElement('div')
    div.innerHTML = `
     <div class="card w-100 mx-auto my-3">
     <img src="${details.image}" class="card-img-top w-75 mx-auto pt-2" alt="...">
     <div class="card-body">
     <h3 class="card-title fw-bolder">${details.name}</h3>
     <h4 class="card-title">${details.releaseDate ? details.releaseDate : 'No release date found'}</h4>
     <h4 class="card-title">${details.brand}</h4>
     <h4 class="card-title fw-bold my-4">Main-Features:</h4>
     <h5 class="card-title">
     <span class="fw-bold">Chipset:</span> ${details.mainFeatures.chipSet ? details.mainFeatures.chipSet : 'Not Available'},<br>
     <span class="fw-bold">Storage:</span> ${details.mainFeatures.memory ? details.mainFeatures.memory : 'Not Available'},<br>
     <span class="fw-bold">Display:</span> ${details.mainFeatures.displaySize ? details.mainFeatures.displaySize : 'Not Available'},<br>
     <span class="fw-bold">Sensors: </span>${details.mainFeatures.sensors ? details.mainFeatures.sensors.join(',') : 'Not Available'}</h5>
     <h4 class="card-title fw-bold my-4">Others:</h4>
     <h5>
     <span class="fw-bold">WLAN: </span>${details.others && details.others.WLAN ? details.others.WLAN : 'Not Available'}<br>
     <span class="fw-bold">Bluetooth: </span>${details.others && details.others.Bluetooth ? details.others.Bluetooth : 'Not Available'}<br>
     <span class="fw-bold">GPS: </span>${details.others && details.others.GPS ? details.others.GPS : 'Not Available'}<br>
     <span class="fw-bold">NFC: </span>${details.others && details.others.NFC ? details.others.NFC : 'Not Available'}<br>
     <span class="fw-bold">Radio: </span>${details.others && details.others.Radio ? details.others.Radio : 'Not Available'}<br>
     <span class="fw-bold">USB: </span>${details.others && details.others.USB ? details.others.USB : 'Not Available'}
     </h5>
 </div>
 </div>
    `
    // appending template div to conatiner
    detailsDiv.appendChild(div)
    // moving scroll bar to top 
    window.scrollTo(0, 130)
}
// display single item details ends here