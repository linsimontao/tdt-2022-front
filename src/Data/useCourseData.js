import { useState, useEffect } from 'react';
import { csv } from 'd3';

export const useCourseData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        csv('/track_points.csv').then(res => {
            let temp = [];
            res.map((item) => {
                temp.push({
                    coordinates: [item.lon, item.lat],
                    elevation: Number(item.ele),
                    distance: Number(item.dis)
                });
            });
            setData(temp);
        });
    }, []);

    return data;
}