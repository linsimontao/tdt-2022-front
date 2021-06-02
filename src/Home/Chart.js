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

export const Chart = ({ data, setPointData }) => {
    const svgRef = useRef();
    const divRef = useRef();
    const brushRef = useRef();

    const dimension = useResizeObserver(divRef);

    useEffect(() => {
        const svg = select(svgRef.current);
        if (!dimension) return;
        const { width, height } = dimension;

        const xScale = scaleLinear()
            .domain([0, data.length])
            .range([0, width]);
        const xAxis = axisBottom(xScale);
        const yScale = scaleLinear()
            .domain([min(data.map(d => d.elevation)), max(data.map(d => d.elevation))])
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
            .x((d, i) => xScale(i))
            .y(yScale)
            .curve(curveCardinal);

        const content = svg.select(".content");

        content
            .selectAll(".link")
            .data([data.map(d => d.elevation)])
            .join("path")
            .attr("class", "link")
            .attr("d", lineGenerator)
            .attr("fill", "none")
            .attr("stroke", "blue");

        svg.on('mousemove', (evt) => {
            if (evt.offsetX >= 0) {
                const index = Math.floor(xScale.invert(evt.offsetX));
                const temp = data[index];
                content
                    .selectAll(".dot")
                    .data([temp])
                    .join("circle")
                    .attr("class", "dot")
                    .attr("cx", xScale(index))
                    .attr("cy", yScale(temp.elevation))
                    .attr("r", 3)
                    .attr("fill", "red");
                setPointData(temp);
            }

        })
    }, [data, dimension])

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