import React from 'react';


const wrapMarkup = html => ({
    __html: html,
});

const Markdown = ({ content }) => (
    <div className="markdown" dangerouslySetInnerHTML={wrapMarkup(content)} />
);

export default Markdown;
