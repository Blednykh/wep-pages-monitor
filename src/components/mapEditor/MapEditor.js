import React from "react";
import "./MapEditor.css";

class MapEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newKey: "",
            newValue: ""
        };
    }


    handleKeyChange = (e) => {
        this.setState({newKey: e.target.value})
    };

    handleValueChange = (e) => {
        this.setState({newValue: e.target.value})
    };


    render() {

        const {mapValue, mapKey, newButtonClick, editButtonClick, deleteButtonClick, plusDayButtonClick} = this.props;

        const {newKey, newValue} = this.state;

        return (
            <div className="editor">
                <input className="key"
                       placeholder="Enter new URL..."
                       value={newKey==="" ? mapKey : newKey}
                       onChange={this.handleKeyChange}
                />
                <button className="closeButton">x</button>
                <div className="content">
                    <textarea className="value"
                              placeholder="Enter your web-page code..."
                              value={newValue==="" ? mapValue : newValue}
                              onChange={this.handleValueChange}
                    />
                    <div className="buttonBar">
                        <button onClick={newButtonClick(newKey,newValue)}>New</button>
                        <button onClick={editButtonClick(mapKey,newValue)}>Edit</button>
                        <button onClick={deleteButtonClick(mapKey)}>Delete</button>
                        <button onClick={plusDayButtonClick(mapKey)}>time++</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default MapEditor;

