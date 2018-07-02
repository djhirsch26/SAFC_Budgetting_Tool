import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import {  Grid, Row, Col,  Modal } from 'react-bootstrap';

class MyModal extends Component{
 constructor(props) {
        super(props);

        this.state = {
            show: false
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal() {
        this.setState({
            show: true
        });
    }
    hideModal(){
      this.setState({
        show: false
      })
    }


   render(){

     return(

       <div className="App">

       <Grid>
                       <Row>
                           <Col md={12}>
                               <Button bsStyle="success" className='btn-block' onClick={this.showModal}>Create</Button>

                               <Modal show={this.state.show} onHide={this.hideModal} aria-labelledby='ModalHeader'>
                                   <Modal.Header closeButton>
                                       <Modal.Title id='ModalHeader'>A Title Goes here</Modal.Title>
                                   </Modal.Header>
                                   <Modal.Body>
                                       <p>Some Content here</p>
                                   </Modal.Body>
                                   <Modal.Footer>

                                           <button className='btn btn-primary'>
                                               Save
                                           </button>

                                   </Modal.Footer>
                               </Modal>

                           </Col>
                       </Row>

                   </Grid>

       </div>  /* -----App div close-----*/

     )
   }
 }

export default MyModal;
