/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import {post} from "../../lib/comms";
import {showError} from "../../lib/overlay";
import {Button, Input} from "antd";
import {CloseOutlined} from '@ant-design/icons'

export default function UnplashE(p) {
    let splash;
    let el = React.createRef();
    let [imglist, setImglist] = useState(<div>loading</div>);

    useEffect(() => {
        search("dogs");
    }, []);

    function changeb(i) {
        setImglist(i);
    }

    const search = (v) => {
        post("/unsplash", {search: v})
            .then(json => {
                if (json.data.error) {
                    showError(json.data.error);
                } else {
                    let toRender = [];
                    let made = 0;
                    json.data.data.results.forEach(result => {
                        toRender.push(<UnsplashImageSelect smgl={setImglist} key={made} url={result.urls.thumb}
                                                           regular={result.urls.regular}
                                                           author={`${result.user.first_name} ${result.user.last_name}`}/>)
                        made++
                    });
                    setImglist(toRender);
                }
            });
    }

    return (
        <div className="unsplash-container" style={{overflowY: "auto"}}>
            <Input.Search placeholder="Search"
                          onSearch={(v) => search(v)}
                          style={{width: 200}}/>
            <p style={{position: "absolute", right: 20, top: 10, margin: 0}}>Powered by <a
                href="https://unsplash.com/">Unsplash</a>&nbsp;&nbsp;<CloseOutlined onClick={() => ReactDOM.unmountComponentAtNode(document.getElementById(p.overlayid))}/></p>
            <div ref={el} className="imagelist">
                {imglist}
            </div>
        </div>
    )
}

function UnsplashImageSelect(p) {
    function usebg() {
        localStorage.setItem("bgurl", p.regular);
    }

    function click() {
        console.log(p);
        p.smgl([
            <div key={0} className="image-full-select" style={{
                backgroundImage: `url(${p.regular})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: 300,
            }}>
                <Button onClick={usebg} style={{position: "absolute", bottom: 60, right: 20}}>Use as background</Button>
            </div>,
            <p key={1}>By {p.author}</p>,
        ])
    }

    return (
        <div className="unsplash-image-select" style={{
            backgroundImage: `url(${p.url})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            cursor: "pointer"
        }} onClick={click}>

        </div>
    )
}
