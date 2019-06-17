import React from 'react';
import './App.css';
import MapList from "../mapList/MapList";
import MapEditor from "../mapEditor/MapEditor";

const yesterdayMap = new Map([
    ['https://www.one.com/', 'one'],
    ['https://www.two.com/', 'two'],
    ['https://www.three.com/', 'three'],
]);
const todayMap = new Map([
    ['https://www.two.com/', 'two'],
    ['https://www.three.com/', 'modified_three'],
    ['https://www.four.com/', 'four'],
]);

class App extends React.Component {

    setContent = (yesterdayMap, todayMap) => {

        const yesterdayDeletedMap = new Map(yesterdayMap);

        let editedKeysList = [];

        let addedKeysList = [];

        todayMap.forEach((value,key) =>{
            if(yesterdayMap.has(key)){
                if(value!== yesterdayMap.get(key)){
                    editedKeysList.push(key);
                }
                yesterdayDeletedMap.delete(key);
            }
            else{
                addedKeysList.push(key);
            }
        });

        return [[...yesterdayDeletedMap.keys()], editedKeysList, addedKeysList];
    };

    render() {
        const [deletedKeysList,editedKeysList,addedKeysList] = this.setContent(yesterdayMap, todayMap);
        console.log(deletedKeysList, editedKeysList, addedKeysList);
        return (
            <div className="App">
                <MapList/>
                <MapEditor/>
            </div>
        );
    }
}

export default App;
