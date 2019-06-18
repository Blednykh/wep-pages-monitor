import React from "react";
import "./MapList.css";

class MapList extends React.Component {

    render() {

        const {displayedList,selectKey,setDisplayedList} = this.props;

        return (
            <div className="mapList">
                <div className="select-box">
                    <select id="menu1" onChange={setDisplayedList}>
                        <option value="All">All</option>
                        <option value="New">New</option>
                        <option value="Edited">Edited</option>
                        <option value="Deleted">Deleted</option>
                    </select>
                </div>
                <div className="itemList">
                    {displayedList.map((item,id) =>{
                        return <div onClick={selectKey(id)}>{item}</div>
                    })}
                </div>
            </div>
        )
    }
}


export default MapList;

