import React, { Component } from 'react'

class TicketBooking extends Component {
  constructor(props) {
    super(props)

    this.state = {
      country: [
        { "id": "1", "country": "Cambodia" },
        { "id": "2", "country": "Australia" },
        { "id": "3", "country": "US" },
        { "id": "4", "country": "China" },
        { "id": "5", "country": "China" },
        { "id": "6", "country": "Cambodia" },
        { "id": "7", "country": "China" },
        { "id": "8", "country": "Australia" },
        { "id": "9", "country": "US" },
        { "id": "10", "country": "New Zealand" }
      ],
      value: 'sonal'
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  submitData = () => {

  }
  render() {
    // const data = require("./countries.json")

    const data = this.state.country
    // console.log(data)
    return (
      <div>
        <form onSubmit="this.submitData">
          <label>
            Looping through json file

                        <select value={this.state.value} name='list' onChange={this.handleChange}>

              {
              data.map(item=><option key={item.id} value={item.country}> {item.country}</option>)
              }
            </select>
          </label>

          <input type='submit' value='submit'/> 
       
        </form>
      </div>
    )
  }
}

export default TicketBooking
