import React  from 'react';
import ZipForm from './ZipForm';
import { get } from 'axios';
import WeatherList from './WeatherList';

class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      zipcode:'',
      city: {},
      dates: [],
      selectedDate: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);

  }
  onFormSubmit(zipcode){
    get('http://localhost:3000/weather/${zipcode}')
    .then(({ data }) => {
      const { city, list: dates } = data;

      this.setState({ zipcode, city, dates, selectedDate: null });
    });
  }
  render(){
    const { dates } = this.state;
    return( <div className="app">
      <ZipForm onSubmit={this.onFormSubmit} />
      <WeatherList days={dates} />
    </div>
  );
  }
}

export default App;
