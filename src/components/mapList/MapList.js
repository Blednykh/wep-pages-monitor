import React from "react";
import "./MapList.css";

class MapList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedList: [],
            a: 12
        };
    }

    selectChange = (e) =>{

        const {deletedKeysList,editedKeysList,addedKeysList} = this.props;

        switch (e.target.value) {
            case "All": {
                this.setState({displayedList: []});
                break;
            }
            case "New": {
                this.setState({displayedList: addedKeysList});
                break;
            }
            case "Edited": {
                this.setState({displayedList: editedKeysList});
                break;
            }
            case "Deleted": {
                this.setState({displayedList: deletedKeysList});
                break;
            }
        }
    };


    render() {

        const {deletedKeysList,editedKeysList,addedKeysList,selectKey} = this.props;

        return (
            <div className="mapList">
                <div className="select-box">
                    <select id="menu1" onChange={this.selectChange}>
                        <option value="All">All</option>
                        <option value="New">New</option>
                        <option value="Edited">Edited</option>
                        <option value="Deleted">Deleted</option>
                    </select>
                </div>
                <div className="itemList">
                    {this.state.displayedList.map((item,id) =>{
                        return <div onClick={selectKey(id)}>{item}</div>
                    })}
                </div>
            </div>
        )
    }
}


export default MapList;

