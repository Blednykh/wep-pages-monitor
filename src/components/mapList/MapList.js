import React from "react";
import "./MapList.css";

class MapList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        let displayedList = [];
        return (
            <div className="mapList">
                <div className="select-box">
                    <select id="menu1" onChange="...">
                        <option value="All">All</option>
                        <option value="New">New</option>
                        <option value="Edited">Edited</option>
                        <option value="Deleted">Deleted</option>
                    </select>
                </div>
                <div className="itemList">
                    {displayedList.map(item=>{
                        return <div>{item}</div>
                    })}
                </div>
            </div>
        )
    }
}


export default MapList;

