// DON'T CHANGE THIS LINE
const myBadAssGarage = window.myBadAssGarage;
// //////////////////////


// //////////////////////
// Pseudo-code
// //////////////////////

// ✅ 0. Add the data-controller in the HTML!

// ///
// Get all the cars
// ///
// how i get all the cars?

// use Yanns cool "thingy" sch
// define targets (CAR LIST!!)
// fetch cars (inside connect :)
 // display cars in car list

// ///
// Add a new car
// ///
// link targets (5 types - brand, model, plate, owner add car button)
// define the data action upon clicking the button
// fetch that stuff we need ^^^ (POST)
// display car list (get all cars again, like we did before...)

// ///////////////t///////
// Code
// //////////////////////
// Tips: use 'sch' shortcut to build the controller
import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = [ 'list', 'brand', 'model', 'owner', 'plate' ]
  
  connect() {
    console.log('Hello from garage_controller.js')
    // console.log(this.testTarget)
    this.getCars();
  }

  getCars() {
    const url = 'https://wagon-garage-api.herokuapp.com/krazy-858/cars'
    fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      this.displayCars(data)
    })
  }
  
  displayCars(cars) {
    this.listTarget.innerHTML = "";
    cars.forEach((car) => {
      this.listTarget.insertAdjacentHTML('beforeend', 
      `<div class="car">
      <div class="car-image">
      <img src="http://loremflickr.com/280/280/${car.brand} ${car.model}" />
      </div>
      <div class="car-info">
      <h4>${car.brand} ${car.model}</h4>
      <p><strong>Owner:</strong> ${car.owner}</p>
      <p><strong>Plate:</strong> ${car.plate}</p>
      </div>
      </div>`
      )
    })
  }

  submit(event) {
    event.preventDefault()
    const carData = {
      brand: this.brandTarget.value,
      model: this.modelTarget.value,
      owner: this.ownerTarget.value,
      plate: this.plateTarget.value
    }
    const url = "https://wagon-garage-api.herokuapp.com/krazy-858/cars"
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(carData)
    }
    fetch(url, options)
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        this.getCars();
      })
  }
}

