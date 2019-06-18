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
            <div className="keyDiv">
                {mapKey}
            </div>
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
            selectedId} = this.props;

        const {newKey, newValue} = this.state;

        return (
            <div className="editor">
                <div className="header">
                    {this.setKeyBox(selectedId,newKey,mapKey)}
                    {selectedId===null||<svg className="closeButton"
                         xmlns="http://www.w3.org/2000/svg"
                         width="18"
                         height="18"
                         viewBox="0 0 18 18"
                         onClick={this.handleButtonsClick(closeMapItem())}
                    >
                        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
                    </svg>}
                  {/*  <button className="closeButton" onClick={this.handleButtonsClick(closeMapItem())}>x</button>*/}
                </div>
                <div className="content">
                    <textarea className="value"
                              placeholder="Enter your web-page code..."
                              value={newValue==="" ? mapValue : newValue}
                              onChange={this.handleValueChange}
                    />
                    <div className="buttonBar">
                        {selectedId === null ?
                            <button className="newButton"
                                    onClick={this.handleButtonsClick(newMapItem(newKey, newValue))}>New</button>:
                            <button className="newButton"
                                    onClick={this.handleButtonsClick(editMapItem(mapKey,newValue))}>Edit</button>
                        }
                        <button className="deleteButton"
                                onClick={this.handleButtonsClick(deleteMapItem(mapKey))}>Delete</button>
                        <button className="timeButton" onClick={plusDayButtonClick(mapKey)}>Day++</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default MapEditor;

