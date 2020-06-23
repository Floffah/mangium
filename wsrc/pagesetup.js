/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Drawer, Switch} from 'antd';
import {CheckOutlined, CloseOutlined} from '@ant-design/icons';

const changeAnims = (checked) => {
    localStorage.setItem('animations', checked);
}

const AnimDrawer = () => {
    const [visible, setVisible] = useState(true);

    return (
        <Drawer
            title="Web setup"
            placement="right"
            closable={true}
            onClose={() => {
                setVisible(false)
            }}
            visible={visible}
        >
            <p>Would you like to see better animations?</p>
            <p>This may impact performance</p>
            <Switch
                defaultChecked
                onChange={changeAnims}
                checkedChildren={<CheckOutlined/>}
                unCheckedChildren={<CloseOutlined/>}
            />
        </Drawer>
    )
}

if (localStorage.getItem('animations') === null || localStorage.getItem('animations') === undefined) {
    $("#overlay").append("<div id=\"animcontainer\"></div>");
    ReactDOM.render(<AnimDrawer/>, document.getElementById("animcontainer"));
}

export default AnimDrawer;
