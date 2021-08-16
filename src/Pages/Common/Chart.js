import React, { useRef, useEffect, useState } from 'react';
import {
    scaleLinear,
    axisBottom,
    axisLeft,
    select,
    min,
    max,
    line,
    curveCardinal
} from 'd3';
import { lineString, lineDistance } from '@turf/turf';
import up from './up.png';
import down from './down.png';

const useResizeObserver = ref => {
    const [dimension, setDimension] = useState(null);

    useEffect(() => {
        const observerTarget = ref.current;
        const resizeObserver = new ResizeObserver((entries) => {
            entries.map(entry => setDimension(entry.contentRect))
        });
        resizeObserver.observe(observerTarget);
        return () => {
            resizeObserver.unobserve(observerTarget);
        }
    }, [ref])

    return dimension;
}

export const Chart = ({ courseData, setDistance, terrain, setTerrain }) => {
    const svgRef = useRef();
    const divRef = useRef();
    
    const dimension = useResizeObserver(divRef);

    const courseLineString = lineString(courseData.features.map(d => d.geometry.coordinates));
    const courseDistance = lineDistance(courseLineString);

    const findIdx = dis => courseData.features.filter(pt => pt.properties.dis <= dis).length;

    useEffect(() => {
        const svg = select(svgRef.current);
        if (!dimension) return;
        const { width, height } = dimension;
        const xScale = scaleLinear()
            .domain([0, courseDistance])
            .range([0, width - 25]);
        const xAxis = axisBottom(xScale);
        const yScale = scaleLinear()
            .domain([min(courseData.features.map(d => Number(d.properties.ele))), max(courseData.features.map(d => Number(d.properties.ele)))])
            .range([height-10, 10]);
        const yAxis = axisLeft(yScale);

        svg
            .select(".x-axis")
            .style("transform", `translateY(${height}px)`)
            .call(xAxis)
        svg
            .select(".y-axis")
            .call(yAxis)

        const lineGenerator = line()
            .x((d, i) => xScale(courseData.features[i].properties.dis))
            .y(yScale)
            .curve(curveCardinal);

        const content = svg.select(".chart-content");
        content.selectAll("*").remove();

        content
            .selectAll(".link")
            .data([courseData.features.map(d => d.properties.ele)])
            .join("path")
            .attr("className", "link")
            .attr("d", lineGenerator)
            .attr("fill", "blue")
            .attr("stroke", "blue");
        
        svg.on('mousemove', (evt) => {
            if (evt.offsetX >= 0) {
                const dis = xScale.invert(evt.offsetX);
                setDistance(dis);
                const index = findIdx(dis);
                const pt = courseData.features[index];
                content
                    .selectAll(".dot")
                    .data([pt])
                    .join("circle")
                    .attr("class", "dot")
                    .attr("cx", xScale(pt?.properties.dis))
                    .attr("cy", yScale(pt?.properties.ele))
                    .attr("r", 3)
                    .attr("fill", "red");
            }
        })
    }, [dimension, courseData])

    return (
        <div className={terrain? "chart-container": "chart-container-hide"} ref={divRef}>
            <svg ref={svgRef}>
                <g className="chart-content"></g>
                <g className="x-axis"></g>
                <g className="y-axis"></g>
            </svg>
            <div className="chart-button" onClick={() => setTerrain(!terrain)}>
                <p>TERRAIN</p>
                <img src={terrain? up: down} />
            </div>
        </div>
    );
}