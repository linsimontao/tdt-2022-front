import React, { useRef, useEffect, useState, useContext } from 'react';
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

export const Chart = ({ courseData, setDistance }) => {
    const svgRef = useRef();
    const divRef = useRef();
    const brushRef = useRef();

    const dimension = useResizeObserver(divRef);

    const courseLineString = lineString(courseData.map(d => d.coordinates));
    const courseDistance = lineDistance(courseLineString);

    const findIdx = dis => courseData.filter(pt => pt.distance <= dis).length;

    useEffect(() => {
        const svg = select(svgRef.current);
        if (!dimension) return;
        const { width, height } = dimension;
        const xScale = scaleLinear()
            .domain([0, courseDistance])
            .range([0, width]);
        const xAxis = axisBottom(xScale);
        const yScale = scaleLinear()
            .domain([min(courseData.map(d => d.elevation)), max(courseData.map(d => d.elevation))])
            .range([height, 0]);
        const yAxis = axisLeft(yScale);

        //svg.selectAll
        svg
            .select(".x-axis")
            .style("transform", `translateY(${height}px)`)
            .call(xAxis)
        svg
            .select(".y-axis")
            .call(yAxis)

        const lineGenerator = line()
            .x((d, i) => xScale(courseData[i].distance))
            .y(yScale)
            .curve(curveCardinal);

        const content = svg.select(".content");

        content
            .selectAll(".link")
            .data([courseData.map(d => d.elevation)])
            .join("path")
            .attr("className", "link")
            .attr("d", lineGenerator)
            .attr("fill", "none")
            .attr("stroke", "blue");
        
        svg.on('mousemove', (evt) => {
            if (evt.offsetX >= 0) {
                const dis = xScale.invert(evt.offsetX);
                setDistance(dis);
                const index = findIdx(dis);
                const pt = courseData[index];
                content
                    .selectAll(".dot")
                    .data([pt])
                    .join("circle")
                    .attr("class", "dot")
                    .attr("cx", xScale(pt.distance))
                    .attr("cy", yScale(pt.elevation))
                    .attr("r", 3)
                    .attr("fill", "red");
            }
        })
    }, [dimension])

    return (
        <div className="chartContainer" ref={divRef}>
            <svg ref={svgRef}>
                <g className="content"></g>
                <g className="x-axis"></g>
                <g className="y-axis"></g>
                <g ref={brushRef} />
            </svg>
        </div>
    );
}