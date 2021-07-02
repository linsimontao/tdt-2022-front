import { MAP, RIDER, TERRAIN, LIVE, INFO } from "../../constant/Constant";
import { InfoIcon, CameraIcon, RiderIcon, MapIcon, TerrainIcon } from "./CustomSVG";
import './ImageButton.css';
export const ImageButton = ({icon, text, active=false, onClick}) => {
    const getIcon = () => {
        switch(icon) {
            case MAP: 
                return <MapIcon fill={active? 'white': '#999999'}/>;
            case RIDER:
                return <RiderIcon fill={active? 'white': '#999999'} />;
            case TERRAIN:
                return <TerrainIcon fill={active? 'white': '#999999'} />;
            case LIVE:
                return <CameraIcon fill={active? 'white': '#999999'} />;
            case INFO:
                return <InfoIcon fill={active? 'white': '#999999'} />
        }
            
    };
    return (
        <div className={active? "image-button-active":  "image-button"} onClick={onClick}>
            {getIcon()}
            <p>{text}</p>
        </div>
    );
}