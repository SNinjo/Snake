import Map from './class/Map';
import RowBlock from './RowBlock';


export default function MainScreen() {
    let arr2TagBlock = [];
    for (let intRowNumber = 0; intRowNumber < Map.getHeight(); intRowNumber++){
        arr2TagBlock.push(<RowBlock key={intRowNumber} intY={intRowNumber}></RowBlock>);
    }

    return (
        <div id="mainScreen">
            {arr2TagBlock}
        </div>
    );
}