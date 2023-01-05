import React from 'react';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
import { Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import * as Constants from '../../Constants';

const DesignActions = ({state, onDesignLoad}) => {

    const [file, setFile] = React.useState('');

    const [schema,setSchema] = React.useState({});

    React.useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/data/wled-design.json`)
            .then((res) => res.json())
            .then((data) => { 
                setSchema(data); 
            });
    },[]);

    function exportDesign() {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(state))}`;

        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "data.json";
    
        link.click();
    }

    async function onFileChange(e) {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            let contents = JSON.parse(e.target.result);

            const Ajv = require('ajv');
            const ajv = new Ajv();
            const validate = ajv.compile(schema);
            const valid = validate(contents);

            if (valid) {
                onDesignLoad(contents);
            }
        };
    }

    return (
        <Row>
            <Col className="col-md-12 d-flex justify-content-evenly">
                <Form.Control className="w-25" type="file" onChange={onFileChange}></Form.Control>
                <Button onClick={exportDesign}>Export</Button>
            </Col>
        </Row>
    );
}

export default DesignActions;