import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function  RenderDish({dish})  {
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

    function RenderComments({comments}){
        if(comments==null)
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

    const DishDetail =(props) =>{

        if(this.props.dish!=null){

          return (
                  <div className="container">
                  <div className="row">
                      <Breadcrumb>

                          <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                      </Breadcrumb>
                      <div className="col-12">
                          <h3>{props.dish.name}</h3>
                          <hr />
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-12 col-md-5 m-1">
                          <RenderDish dis={props.dish} />
                      </div>
                      <div className="col-12 col-md-5 m-1">
                          <RenderComments comments={props.comments} />
                      </div>
                  </div>
                  </div>
              );
        }
        else
            return(<div></div>);

    }



export default DishDetail;
