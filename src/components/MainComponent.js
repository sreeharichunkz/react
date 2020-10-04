import React,{Component} from 'react';
//import logo from './logo.svg';
//import './App.css';
import Menu from './MenuComponents2';
import Header from './HeaderComponent';

import { DISHES } from '../shared/dishes';
import DishDetail from './DetailDish';
import Footer from './FooterComponent';

class Main extends Component  {
  constructor(props){
    super(props);

    this.state={
      dishes: DISHES,
      selectedDish: null
    };

  }
  onDishSelect(dishId){
      this.setState({selectedDish:dishId});
  }

  render(){
  return (
 <div>
      <Header/>
    <Menu dishes={this.state.dishes }
     onClick={(dishId)=>this.onDishSelect(dishId)}/>
    <DishDetail
            dish={this.state.dishes.filter((dish) => dish.Id === this.state.selectedDish )[0]} />
    <Footer />      
    </div>

  );
 }
}

export default Main;
