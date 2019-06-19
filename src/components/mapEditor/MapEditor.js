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

    setKeyBox = (selectedId, newKey, mapKey) => {
        return (
            selectedId === null ?
                <input className="key"
                       placeholder="Enter new URL..."
                       value={newKey === "" ? mapKey : newKey}
                       onChange={this.handleKeyChange}
                /> :
                <div className="keyDiv">
                    {mapKey}
                </div>
        )
    };

    handleKeyChange = e => {
        this.setState({newKey: e.target.value})
    };

    handleValueChange = e => {
        this.setState({newValue: e.target.value})
    };

    handleButtonsClick = fn => ()=> {
        this.setState({newKey: "", newValue: ""});
        fn();
    };


    render() {

        const {
            mapValue,
            mapKey,
            closeMapItem,
            newMapItem,
            editMapItem,
            deleteMapItem,
            plusDayButtonClick,
            selectedId
        } = this.props;

        const {newKey, newValue} = this.state;

        return (
            <div className="editor">
                <div className="header">
                    {this.setKeyBox(selectedId, newKey, mapKey)}
                    {selectedId === null ||
                    <button className="closeButton"
                            onClick={this.handleButtonsClick(closeMapItem())}>
                        <i className="fas fa-times"/>
                    </button>
                    }
                </div>
                <div className="content">
                    <textarea className="value"
                              placeholder="Enter your web-page code..."
                              value={newValue === "" ? mapValue : newValue}
                              onChange={this.handleValueChange}
                    />
                    <div className="buttonBar">
                        {selectedId === null ?
                            <button className="newButton"
                                    onClick={this.handleButtonsClick(newMapItem(newKey, newValue))}>New</button> :
                            <button className="newButton"
                                    onClick={this.handleButtonsClick(editMapItem(mapKey, newValue))}>Edit</button>
                        }
                        <button className="deleteButton"
                                onClick={this.handleButtonsClick(deleteMapItem(mapKey))}>Delete
                        </button>
                        <button className="timeButton" onClick={plusDayButtonClick(mapKey)}>Day++</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default MapEditor;

