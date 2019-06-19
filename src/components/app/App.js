import React from 'react';
import './App.css';
import MapList from "../mapList/MapList";
import MapEditor from "../mapEditor/MapEditor";


class App extends React.Component {

    state = {
        yesterdayMap: new Map(),
        todayMap: new Map(),
        yesterdayDate: null,
        todayDate: null,
        addedKeysList: [],
        editedKeysList: [],
        deletedKeysList: [],
        allKeysList: [],
        displayedList: [],
        selectedId: null,
        dayPlus: 1
    };

    componentDidMount() {

        const yesterdayMap = new Map(JSON.parse(localStorage.getItem("yesterdayMap"))) || new Map();

        const todayMap = new Map(JSON.parse(localStorage.getItem("todayMap"))) || new Map();

        const yesterdayDate = new Date(JSON.parse(localStorage.getItem("yesterdayDate")));

        const todayDate = new Date(JSON.parse(localStorage.getItem("todayDate")));

        this.setState({yesterdayMap, todayMap, yesterdayDate, todayDate});
        this.setContent(yesterdayMap, todayMap);
    }

    componentDidUpdate = () => {

        const {yesterdayMap, todayMap, yesterdayDate, todayDate} = this.state;

        localStorage.setItem('yesterdayMap', JSON.stringify(Array.from(yesterdayMap.entries())));
        localStorage.setItem('todayMap', JSON.stringify(Array.from(todayMap.entries())));
        localStorage.setItem('yesterdayDate', JSON.stringify(yesterdayDate));
        localStorage.setItem('todayDate', JSON.stringify(todayDate));
    };


    setContent = (yesterdayMap, todayMap) => {

        const yesterdayDeletedMap = new Map(yesterdayMap);

        let editedKeysList = [];

        let addedKeysList = [];

        todayMap.forEach((value, key) => {
            if (yesterdayMap.has(key)) {
                if (value !== yesterdayMap.get(key)) {
                    editedKeysList.push(key);
                }
                yesterdayDeletedMap.delete(key);
            } else {
                addedKeysList.push(key);
            }
        });
        this.setState({
            deletedKeysList: [...yesterdayDeletedMap.keys()],
            editedKeysList,
            addedKeysList,
            allKeysList: [...todayMap.keys()],
            displayedList: [...todayMap.keys()]
        })

    };

    selectKey = (selectedId) => () => {
        this.setState({selectedId})
    };

    setDisplayedList = (e) => {

        const {deletedKeysList, editedKeysList, addedKeysList, allKeysList} = this.state;

        switch (e.target.value) {
            case "All": {
                this.setState({displayedList: allKeysList});
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
            default: break;
        }
        this.setState({selectedId: null});
    };

    deleteMapItem = key => () => {

        const {todayMap, yesterdayMap} = this.state;

        todayMap.delete(key);
        this.setState({selectedId: null, todayMap});
        this.setContent(yesterdayMap, todayMap);
    };

    editMapItem = (key, value) => () => {

        const {todayMap, yesterdayMap} = this.state;

        todayMap.set(key, value);
        this.setState({selectedId: null, todayMap});
        this.setContent(yesterdayMap, todayMap);

    };

    closeMapItem = () => () => {
        this.setState({selectedId: null});
    };

    newMapItem = (key, value) => () => {

        let {yesterdayMap, todayMap, yesterdayDate, todayDate, dayPlus} = this.state;

        const nowDate = new Date();

        nowDate.setHours(0, 0, 0, 0);
        nowDate.setDate(nowDate.getDate() + dayPlus);

        if (yesterdayDate === null || yesterdayDate.getTime() >= nowDate.getTime()) {
            yesterdayDate = nowDate;
            yesterdayMap.set(key, value);
        } else {
            if (todayDate === null || todayDate.getTime() >= nowDate.getTime()) {
                if (todayDate === null) {
                    todayMap = new Map(yesterdayMap);
                }
                todayDate = nowDate;
                todayMap.set(key, value);
            } else {
                yesterdayDate = todayDate;
                todayDate = nowDate;
                yesterdayMap = new Map(todayMap);
                todayMap.set(key, value);
            }
        }
        this.setState({yesterdayMap, todayMap, yesterdayDate, todayDate});
        this.setContent(yesterdayMap, todayMap);
    };

    plusDayButtonClick = () => () => {

        let {dayPlus} = this.state;

        dayPlus++;
        this.setState({dayPlus: dayPlus})
    };

    setMapEditorItem = () => {

        const {displayedList, deletedKeysList, selectedId, todayMap} = this.state;

        let mapKey = "";

        let mapValue = "";

        if (selectedId !== null) {
            mapKey = displayedList[selectedId];
            mapValue = todayMap.get(mapKey);
        }
        if (displayedList !== deletedKeysList) {
            return <MapEditor
                mapKey={mapKey}
                mapValue={mapValue}
                selectedId={selectedId}
                deleteMapItem={this.deleteMapItem}
                editMapItem={this.editMapItem}
                closeMapItem={this.closeMapItem}
                newMapItem={this.newMapItem}
                plusDayButtonClick={this.plusDayButtonClick}
            />
        }
    };


    render() {

        const {displayedList} = this.state;

        return (
            <div className="App">
                <MapList
                    displayedList={displayedList}
                    selectKey={this.selectKey}
                    setDisplayedList={this.setDisplayedList}
                />
                {this.setMapEditorItem()}
            </div>
        );
    }
}

export default App;
