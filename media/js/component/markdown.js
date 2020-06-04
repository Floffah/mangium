import React from 'react';

/*import './gruvbox-dark.css';
import './markdown.css';*/

const wrapMarkup = html => ({
    __html: html,
});

const Markdown = ({ content }) => (
    <div className="markdown" dangerouslySetInnerHTML={wrapMarkup(content)} />
);

export default Markdown;
