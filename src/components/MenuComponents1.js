import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        }
    }
onDishSelect(dish){
  this.setState({ selectedDish: dish});
}
renderDish(dish){
  if (dish !=null){
     return(
  <Card>
      <CardImg width="100%" src={dish.image} alt={dish.name} />
     <CardBody>
     <CardTitle>{dish.name}</CardTitle>
     <CardText>{dish.description}</CardText>


     </CardBody>
     </Card>
);

}
else{
  return(
  <div></div>
);
}
}

//comments render
renderComments(dish){
  if (dish !=null){
       const menu1 = this.props.dishes.map((com) => {

                 return(
                        <div key={com.id} className="col-12 col-md-5 m-1">
                     <Card>

                       <CardTitle>{com.rating}</CardTitle>

                   </Card>


                 );
             })
             return(
                 <div className='col-12 col-md-5 m-1'>
                     <h4>Comments</h4>
                     <ul className='list-unstyled'>
                         {menu1};
                     </ul>
                 </div>
             );



       }



else{
  return(
  <div></div>
);
}
}
    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
              <div key={dish.id} className="col-12 col-md-5 m-1">

                  <Card  onClick={() => this.onDishSelect(dish)}>
                      <CardImg width="100%" src={dish.image} alt={dish.name} />


                  <CardImgOverlay >
                    <CardTitle>{dish.name}</CardTitle>


                  </CardImgOverlay>
                </Card>
              </div>
            );
        });

        return (
   <div className="container">
            <div className="row">

                  {menu}

            </div><div class="row">
            <div className="col-12 col-md-5 m-1">
            {this.renderDish(this.state.selectedDish)}
          </div>
          <div className="row">
          {this.renderComments(this.state.selectedDish)}
        </div></div></div>
      

        );
    }
}

export default Menu;
