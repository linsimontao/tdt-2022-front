export const POIList = ({ data, activeIdx = 0 }) => {
    return (
        <div className="poi-list">
            <ul>
                {
                    data.map((poi, i) => (
                        <li key={`poi-${i}`}>
                            <div className="poi-location">
                                {
                                    (i === activeIdx)?
                                    <div className="circle-active" />:
                                    <div className="circle-inactive" />
                                }
                                <div className="poi-text-main">{poi.properties.label}</div>
                            </div>
                            {
                                (i < data.length - 1) ?
                                    <div className="vl"></div> :
                                    <></>
                            }

                        </li>
                    ))
                }
            </ul>
        </div>
    );
}