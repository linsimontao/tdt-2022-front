export const POIList = ({ data, activeCourseId, activeIdx = 0 }) => {
    const courseName = ["065km", "100km"];
    data = data.filter(poi => poi.properties[courseName[activeCourseId]] == "1");
    console.log(data);

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