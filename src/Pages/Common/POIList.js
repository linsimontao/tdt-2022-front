export const POIList = ({ data, activeCourseId, activeIdx, setActiveIdx }) => {
    const courseName = ["065km", "100km"];
    data = data.filter(poi => poi.properties[courseName[activeCourseId]] == "1");
    return (
        <div className="poi-list">
            <ul>
                {
                    data.map((poi, i) => (
                        <li key={`poi-${i}`}>
                            <div className="poi-location" onClick={() => setActiveIdx(i)}>
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