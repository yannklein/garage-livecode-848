// DON'T CHANGE THIS LINE
const myBadAssGarage = window.myBadAssGarage;
// //////////////////////


// //////////////////////
// Pseudo-code
// //////////////////////

// ✅ 0. Add the data-controller attribute in the HTML file

// ///
// Get all the cars
// ///

// ✅ Define target: car-list
// ✅ There is no event to wait for! code inside the connect()
// ✅ Fetch cars from the API
// ✅ Display them in the cars-list

// ///
// Add a new car
// ///

// Define target: form button
// Define action: when click on button call postCar()
// Post request with car data to the API
// Get all the cars

// //////////////////////
// Code
// //////////////////////
// Tips: use 'sch' shortcut to build the controller
import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = [ 'list', 'brand', 'plate', 'owner', 'model' ]

  connect() {
    console.log('Hello from garage_controller.js')
    console.log(this.listTarget)
    this.getCars()
  }

  getCars() {
    const url = `https://wagon-garage-api.herokuapp.com/${myBadAssGarage}/cars`
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        this.displayCars(data)
      })
  }

  displayCars(cars) {
    this.listTarget.innerHTML = ""
    cars.forEach((car) => {
      this.listTarget.insertAdjacentHTML(
        "beforeend",
        `<div class="car">
          <div class="car-image">
            <img src="http://loremflickr.com/280/280/${car.brand} ${car.model}" />
          </div>
          <div class="car-info">
            <h4>${car.brand} ${car.model}</h4>
            <p><strong>Owner:</strong> ${car.owner}</p>
            <p><strong>Plate:</strong> ${car.plate}</p>
          </div>
        </div>`)
    })
  }

  addCar(event) {
    event.preventDefault();
    console.log("add car", this.brandTarget.value)
    const url = `https://wagon-garage-api.herokuapp.com/${myBadAssGarage}/cars`
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:
        JSON.stringify({
          brand: this.brandTarget.value,
          model: this.modelTarget.value,
          owner: this.ownerTarget.value,
          plate: this.plateTarget.value
        })
    }
    console.log(options)
    fetch(url, options)
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        this.getCars()
      })
  }
}