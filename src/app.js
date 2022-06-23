// DON'T CHANGE THIS LINE
window.myBadAssGarage = "krazy-858";
if (myBadAssGarage) document.querySelector("#garage-name").innerText = myBadAssGarage.replace(/-/g, " ");
// //////////////////////

// Tips: use 'sih' shortcut to build the stimulus setup
import { Application } from '@hotwired/stimulus'
import { definitionsFromContext } from '@hotwired/stimulus-webpack-helpers'

// initialize StimulusJS
window.Stimulus = Application.start()
const context = require.context('./controllers', true, /\.js$/)
Stimulus.load(definitionsFromContext(context))