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

    setKeyBox = (selectedId,newKey,mapKey) =>{
        return selectedId === null ?
            <input className="key"
                   placeholder="Enter new URL..."
                   value={newKey==="" ? mapKey : newKey}
                   onChange={this.handleKeyChange}
            />:
            <div className="key">
                {mapKey}
            </div>
    };

    handleButtonsClick = fn => ()=> {
        this.setState({newKey: "", newValue: ""});
        fn();
    };


    render() {

        const {mapValue, mapKey, closeMapItem, newMapItem, editMapItem, deleteMapItem, plusDayButtonClick, selectedId} = this.props;
        console.log(selectedId);
        const {newKey, newValue} = this.state;

        return (
            <div className="editor">
                {this.setKeyBox(selectedId,newKey,mapKey)}
                <button className="closeButton" onClick={this.handleButtonsClick(closeMapItem())}>x</button>
                <div className="content">
                    <textarea className="value"
                              placeholder="Enter your web-page code..."
                              value={newValue==="" ? mapValue : newValue}
                              onChange={this.handleValueChange}
                    />
                    <div className="buttonBar">
                        <button onClick={this.handleButtonsClick(newMapItem(newKey, newValue))}>New</button>
                        <button onClick={this.handleButtonsClick(editMapItem(mapKey,newValue))}>Edit</button>
                        <button onClick={this.handleButtonsClick(deleteMapItem(mapKey))}>Delete</button>
                        <button onClick={plusDayButtonClick(mapKey)}>time++</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default MapEditor;

