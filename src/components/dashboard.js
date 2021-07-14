import React, {useState, useEffect} from "react";
import API from '../api/api'
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';



function Dashboard(props){
    const utcList = [
        '-11',
        '-10',
        '-8',
        '-7',
        '-6',
        '-5',
        '-4',
        '-3',
        '-2.5',
        '-2',
        '-1',
        '+0',
        '+1',
        '+2',
        '+3',
        '+4',
        '+4.5',
        '+5',
        '+5.5',
        '+5.75',
        '+6',
        '+6.5',
        '+7',
        '+8',
        '+9',
        '+9.5',
        '+10',
        '+11',
        '+12',
        '+13',
    ]

        
    const utcListInt = [
        '-11',
        '-10',
        '-8',
        '-7',
        '-6',
        '-5',
        '-4',
        '-3',
        '-2.5',
        '-2',
        '-1',
        '+0',
        '+1',
        '+2',
        '+3',
        '+4',
        '+4.5',
        '+5',
        '+5.5',
        '+5.75',
        '+6',
        '+6.5',
        '+7',
        '+8',
        '+9',
        '+9.5',
        '+10',
        '+11',
        '+12',
        '+13',
    ]

    const [loading,setLoading] = useState(false);

    const [myState, setState] = useState({
        time: null,
        myUtc: null,
    });
    const [Resultado, setResultado] = useState({
        time:null,
        myUtc:null
    });
    const actualizaEstado = estado => {
        setState(Object.assign({}, myState, estado));
    };
    const actualizaResultado = estado => {
        setResultado(Object.assign({}, Resultado, estado));
    };
    
    const calcularUtc = () => {
            setLoading(true);
        
            API.post(`utc`, {
                dato1: myState.time,
                dato2: myState.myUtc
            }).then((response) => {
                console.log(response.data.response.timezone)
                console.log(response.data.response.time)

               actualizaResultado({
                time:response.data.response.timezone,
                myUtc:response.data.response.time
               })
            }).catch((error) => {
                //console.log(error);
                
            });
        
         
        
    }

    const handleInputChange = (e) => {

        let target = e.target
        let name = target.name;
        let value = target.value;
        console.log(name)
        console.log(value)
        actualizaEstado({
            [name]:value
        })
    }

    useEffect(() => {

      
    },[])
    return (
        
        <React.Fragment>
                    <Navbar expand="lg" variant="light" bg="light">
                        <Container>
                            <Navbar.Brand href="#">Tuten</Navbar.Brand>
                        </Container>
                    </Navbar>
                    <Row className="h-100 pt-5">
                   
                       <Col className="" xs={12} sm={4} md={4} lg={3} xl={3}>
                        <Form.Group className={` `} >
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="time"
                                    className="modalTextField"
                                    onChange={(event) => handleInputChange(event)}
                                    name="time"
                                    style={{ paddingRight: "6px" }}
                                />
            
                            </InputGroup>
                        </Form.Group>
                        </Col>
                        
                        <Col className="" xs={12} sm={4} md={4} lg={3} xl={3}>
                            <Form.Group className={` `} >
                                    <Form.Control
                                        required
                                        type="number"
                                        as="select"
                                        disabled={myState.time == null ? true : false}
                                        onChange={(event) => handleInputChange(event)}
                                        name="myUtc"
                                    >
                                        <option key={`key_}`} value={null}>
                                                    Seleccionar utc
                                        </option>
                                        {utcList.map((value,index) => {
                                                return(
                                                <option key={`key_${value}`} value={utcListInt[index]}>
                                                    {value}
                                                </option>
                                                )
                                                })}
                                
                                    </Form.Control>
                            </Form.Group>
                        </Col> 
                        <Col className="" xs={12} sm={4} md={4} lg={3} xl={3}>
                       
                        <Button type="submit" disabled={myState.myUtc == null ? true : false} onClick={(event) => {calcularUtc(event)}} className="text-uppercase" variant="link" href={void(0)} >
                            Buscar 
                           
                        </Button>
                        {/* 
                              
                        <Button type="submit" onClick={(event) => {calcularUtc(event)}} className="text-uppercase" variant="link" href={void(0)} >
                            Cargando.. 
                            <Spinner animation="border" role="status" style={{width:'1.2rem',height:'1.2rem'}}>
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </Button>
                        */}
                        </Col> 

                    </Row>
                 
                    {Resultado.time ? 
                    <React.Fragment>
                       <Row className="pt-3">
                            <Col xs={12} md={3}>
                                <h3>Resultado</h3>
                            </Col>
                            
                        </Row>
                     <Row className="pt-1">
                  
                        <Col xs={12} md={3}>
                            <p>{Resultado.myUtc}  {Resultado.time}</p>
                        </Col>
                    </Row>
                    </React.Fragment>
                    :null}
                   

        </React.Fragment>


    )
}
export default Dashboard;