import './Switch.css';
export const Switch = ({ style2D, setStyle2D }) => {
    return (
        <div 
            className={style2D? "style-switch-3D": "style-switch-2D"}
            onClick={() => setStyle2D(!style2D)}
        >
            
        </div>
    );
}