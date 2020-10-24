import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Col, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, Errors, LocalForm} from "react-redux-form";


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
    handleSubmit(event) {
        this.toggleModal();
        alert("Submitted.");
        event.preventDefault();

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
                                <Label htmlFor={"name"} xs={12}>
                                    Your Name
                                </Label>
                                <Col xs={12}>
                                    <Control.text model={".name"} id={"name"} className={"form-control"} name={"name"}
                                                  placeholder={"Your Name"}
                                                  validators={{required, minLength: minLength(3), maxLength:maxLength(15)}}/>
                                    <Errors model={".name"} className={"text-danger"}
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
            <Card>
                <CardImg top src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>
                        {dish.description}
                    </CardText>
                </CardBody>
            </Card>
        );
    else
        return (
            <div></div>
        );
}

function RenderComments({comments}){
    return (
        <div className={"col-12 col-md-5 m-1"}>
            <div>
                <h4>Comments</h4>
            </div>
            <ul className="list-unstyled">
                {
                    comments.map((comment, i) =>{
                        return(
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
                        )
                    })
                }
            </ul>
            <CommentForm/>
        </div>
    );
}

function DishDetail(props){
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
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        )
}

export default DishDetail;
