import React from 'react'
import { Tabs, Tab } from 'react-bootstrap';

const WledCommands = ({nodes}) => {

    let payload = { seg: {
        i: nodes.map(n => n.hex.replace('#',''))
    } };

    return (<>
        <Tabs variant="pills" id="code-samples">
            <Tab eventKey="json" title="json">
                <pre className="rest-payload">{JSON.stringify(payload)}</pre>
            </Tab>
            <Tab eventKey="curl" title="curl">
                <pre className="rest-payload">
                curl --location --request POST 'http://IP_ADDRESS/json' --header 'Content-Type: application/json' --data-raw '{JSON.stringify(payload)}'
                </pre>
            </Tab>
        </Tabs>
        </>);
}

export default WledCommands;