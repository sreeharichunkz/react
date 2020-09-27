import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';



class DishDetail extends Component{


    renderDishCard(dish){
        if(dish==null)
            return(<div></div>);
        else{
            return(
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%"  object src = {this.props.dish.image} alt = {this.props.dish.name}/>
                        <CardBody>
                        <CardTitle heading>{this.props.dish.name}</CardTitle>
                        <CardText>{this.props.dish.description}</CardText>
                    </CardBody>
            </Card>
                </div>
            );
        }

    }

    renderComments(dish){
        if(dish==null)
            return (<div></div>);
        else{
            const commentdata = this.props.dish.comments.map((com)=>{
                return(
                    <li key = {com.id}>
                        <p>{com.comment} :- {com.author} </p>
                        <p>date :- {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(com.date)))} </p>
                    </li>
                );
            })

            return(
                <div className='col-12 col-md-5 m-1'>
                    <h4>Comments</h4>
                    <ul className='list-unstyled'>
                        {commentdata};
                    </ul>
                </div>
            );
        }

    }

    render(){

        if(this.props.dish!=null){

         return(
                <div className='row'>
                    {this.renderDishCard(this.props.dish)}

                    {this.renderComments(this.props.dish)}
                </div>
            );
        }
        else
            return(<div></div>);

    }

}

export default DishDetail;
