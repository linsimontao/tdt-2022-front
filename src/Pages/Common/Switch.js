import './Switch.css';
import img2D from './2d.png';
import img3D from './3d.png';

export const Switch = ({ style2D, setStyle2D }) => {
    return (
        <div 
            className={style2D? "style-switch-3D": "style-switch-2D"}
            onClick={() => setStyle2D(!style2D)}
        >
            <img className="switch-image" src={style2D? img3D: img2D}></img>
        </div>
    );
}