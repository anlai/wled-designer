import React from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import { Row, Col, Button, Form } from 'react-bootstrap';

const WledCommands = ({nodes,wledAddress,wledBrightness,updateState}) => {

    let payload = { 
        on: true,
        bri: wledBrightness,
        seg: {
            i: nodes.map(n => n.hex.replace('#',''))
        } 
    };

    function onAddressChange(e) {
        updateState({wledAddress: e.target.value});
    }

    function onBrightnessChange(e) {
        updateState({wledBrightness: e.target.value});
    }

    async function sendCommand() {
        if (wledAddress) {
            fetch(`http://${wledAddress}/json`, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(payload),
                headers:  { 'Content-Type': 'application/json; charset=UTF-8' }
            }).then(res => {
                res.json().then(body => {
                    if (body.success) {
                        alert('successfully sent to wled');
                    } else {
                        alert('request failed');
                    }
                });
            });            
        }
        else {
            alert('WLED address is required');
        }
    }

    return (<>
        <Row className="mb-3">
            <Form.Group className="col-sm-4">
                <Form.Label>WLED Address</Form.Label>
                <Form.Control type="string" name="wledAddress" value={wledAddress} onChange={onAddressChange}></Form.Control>
            </Form.Group>
            <Form.Group className="col-sm-4">
                <Form.Label>Brightness ({wledBrightness})</Form.Label>
                <Form.Range min="0" max="255" value={wledBrightness} onChange={onBrightnessChange}></Form.Range>
            </Form.Group>
        </Row>
        <Tabs variant="pills" id="code-samples">
            <Tab eventKey="json" title="json">

                <Button onClick={sendCommand} className="mt-3">Send to WLED</Button>

                <pre className="rest-payload">{JSON.stringify(payload)}</pre>
            </Tab>
            <Tab eventKey="curl" title="curl">
                <pre className="rest-payload">
                curl --location --request POST 'http://{wledAddress ? wledAddress : 'IP_ADDRESS'}/json' --header 'Content-Type: application/json' --data-raw '{JSON.stringify(payload)}'
                </pre>
            </Tab>
        </Tabs>
        </>);
}

export default WledCommands;