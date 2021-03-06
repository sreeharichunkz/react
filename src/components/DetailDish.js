import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Col, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, Errors, LocalForm} from "react-redux-form";
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components' ;

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    handleSubmit(values) {
        this.toggleModal();
      this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);


    }


    render() {
        return (

            <div className={"CommentForm"}>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <Row className={"form-group"}>
                                <Label htmlFor={"rating"} xs={12}>
                                    Rating
                                </Label>
                                <Col xs={12} >
                                    <Control.select model=".rating" id="rating"
                                    className={"form-control"}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className={"form-group"}>
                                <Label htmlFor={"author"} xs={12}>
                                    Your Name
                                </Label>
                                <Col xs={12}>
                                    <Control.text model={".author"} id={"author"} className={"form-control"} name={"author"}
                                                  placeholder={"Your Name"}
                                                  validators={{required, minLength: minLength(3), maxLength:maxLength(15)}}/>
                                    <Errors model={".author"} className={"text-danger"}
                                            show={"touched"} messages={{
                                        required: 'Required ',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}/>
                                </Col>

                            </Row>
                            <Row className={"form-group"}>
                                <Label htmlFor={"comment"} xs={12}>
                                    Comment
                                </Label>
                                <Col xs={12}>
                                    <Control.textarea id={"comment"} className={"form-control"} name={"comment"}
                                    rows={6} model={".comment"}/>
                                </Col>
                            </Row>

                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"/> Submit Comment</Button>
            </div>
        );
    }

}



function RenderDish({dish}){
    if(dish != null)
        return (
          <FadeTransform in
              transformProps={{
                exitTransform:'scale(0.5) translateY(-50%)'
              }}>
            <Card>
               <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>
                        {dish.description}
                    </CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        );
    else
        return (
            <div></div>
        );
}

function RenderComments({comments, postComment,dishId}){
    return (
        <div className={"col-12 col-md-5 m-1"}>
            <div>
                <h4>Comments</h4>
            </div>
            <ul className="list-unstyled">
            <stagger in>
                {
                    comments.map((comment, i) =>{
                        return(
                          <Fade in>
                            <li key={comment.id}>
                                <p>
                                    {comment.comment}
                                </p>
                                <p>
                                    -- {comment.author}, {new Intl.DateTimeFormat('en-US',
                                    { year: 'numeric', month: 'short', day: '2-digit'})
                                    .format(new Date(Date.parse(comment.date)))}
                                </p>
                            </li>
                            </Fade>
                        );
                    })
                }
                </stagger>
            </ul>
            <CommentForm dishId={dishId} postComment={postComment}/>
        </div>
    );
}

function DishDetail(props){
  if(props.isLoading){
    return(
      <div className="container">
        <div className="row">
            <Loading />
        </div>
      </div>
    );
  }
  else if(props.errMess){
    return(
      <div className="container">
        <div className="row">
            <h4>{props.errMess}</h4>
        </div>
      </div>
    );

  }
  else if(props.dish != null){
        return(
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
                        <RenderDish dish={props.dish} />
                    </div>
                    <RenderComments comments={props.comments}
                      postComment={props.postComment}
                      dishId={props.dish.id} />
                </div>
            </div>
        )}
}

export default DishDetail;
