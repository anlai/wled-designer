import React from 'react';

function About() {
    return (<div className="container">
            <h2 className="mt-4">About</h2>
            <p>Easily design a pattern for your WLED light strips and matrices, simply by clicking the desired color and updating a specific node.  Once you've got the design the way you like it, grab the payload or command to execute against your WLED controll via the REST API.  Note that this will help generate the commands to set a static image and doesn't have the ability to create videos or moving designs.</p>

            <h3>Example</h3>
            <img src={process.env.PUBLIC_URL+"/examples/red_ghost.jpg"} alt="red ghost grid example" style={{width: '25%', height: '25%'}}></img>

            <p>This example was buile for the BTF Lighting WS2812B-16x16ECO matrix.</p>
            <p>JSON file can be found <a href={process.env.PUBLIC_URL+'/examples/red_ghost.json'}>here</a></p>

            <h3>Resources</h3>
            <ul>
                <li><a href="https://kno.wled.ge/interfaces/http-api/">WLED REST Api</a></li>
                <li><a href="https://www.youtube.com/watch?v=WSex5f1qzH8">Creating PIXEL ART with WLED!! by Make It Work</a></li>
            </ul>
        </div>);
}

export default About;