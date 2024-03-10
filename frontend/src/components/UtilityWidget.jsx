/* eslint-disable react/prop-types */
import { SubtitleText, Widget } from "./CommonStyles";

const UtilButton = ({icon, children}) => {
    return (
        <div style={{ 
            display: "flex", 
            justifyContent: "flex-start", 
            alignItems: "center",
            padding: "20px",
        }}> 
            <img src={icon} alt={children} />
            <SubtitleText style={{paddingLeft: "25px"}}> {children} </SubtitleText>
        </div>
    );

}

const UtilityWidget = () => {
    return (
        <Widget style={{ display: "flex", flexDirection:"column", justifyContent: "center"}}>
            <UtilButton icon="../../img/home.svg">Home</UtilButton>
            <UtilButton icon="../../img/search.svg">Search</UtilButton>
        </Widget>
    );
};

export default UtilityWidget;