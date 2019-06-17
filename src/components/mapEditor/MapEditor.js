import React from "react";
import "./MapEditor.css";

class MapEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {

        return (
            <div className="editor">
                <input className="key" onChange={"..."} value="123"/>
                <div className="content">
                    <textarea className="value" onChange={"..."} />
                    <div className="buttonBar">
                        <button onClick={"..."}>New</button>
                        <button onClick={"..."}>Edit</button>
                        <button onClick={"..."}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default MapEditor;

