/*
 *     Copyright (C) 2020   Floffah
 *     All rights reserved
 *
 *     See GNU GPL v3 license
 *
 *     See file copyright for individual contributors information
 *
 *     @author Floffah
 *     @link https://github.com/floffah/
 */
import React, {useState} from 'react';
import {Button, Collapse, InputNumber, Select} from "antd";

export default function Memory() {
    let [amountpp, setAmountPerPage] = useState(10);
    let [sort, sortBy] = useState(10);
    let [memList, setMem] = useState(<p style={{color: "grey"}}>Please choose a filter</p>);

    function onSortChange(v) {
        if (v === "1m") {
            sortBy(1)
        } else if (v === "5m") {
            sortBy(5)
        } else if (v === "10m") {
            sortBy(10)
        } else if (v === "30m") {
            sortBy(30);
        }
    }

    function onFilter() {
        setMem(<MemList entries={amountpp} sort={sort}/>)
    }

    return (
        <div className="memory-body" style={{padding: 5}}>
            <div className="memory-filter-bar"
                 style={{
                     margin: 5,
                     borderRadius: 5,
                     width: "100%",
                     backgroundColor: "white",
                     height: 42,
                 }}>
                <div style={{
                    padding: 5,
                    display: "inline-block"
                }}><span>Show</span>&nbsp;&nbsp;<InputNumber max={100} min={10} value={amountpp}
                                                             onChange={(v) => setAmountPerPage(v)}/>&nbsp;&nbsp;entries
                    in&nbsp;&nbsp;
                    <Select style={{width: 58}} defaultValue="10m" onChange={onSortChange}>
                        <Select.Option value="1m">1</Select.Option>
                        <Select.Option value="5m">5</Select.Option>
                        <Select.Option value="10m">10</Select.Option>
                        <Select.Option value="30m">30</Select.Option>
                    </Select>
                    &nbsp;&nbsp;minute groups&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <Button style={{display: "inline-block"}} type="primary" onClick={onFilter}>Filter</Button>
            </div>
            <div className="memory-container" style={{
                backgroundColor: 'white',
                padding: 5,
                width: "100%",
                margin: 5,
                borderRadius: 5,
            }}>
                {memList}
            </div>
        </div>
    )
}

function MemList(p) {
    let toReturn = [];
    let created = 0;

    toReturn.push(<Collapse.Panel header={`2200`} key={created}>
        <p>Average: 150mb</p>
    </Collapse.Panel>)

    return <div className="memory-memlist">
        <p>Showing {p.entries} entries in {p.sort} minute groups</p>
        <Collapse>{toReturn}</Collapse>
    </div>
}
