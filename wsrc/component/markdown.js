import React from 'react';
import marked from 'marked'

class Markdown extends React.Component {
    render() {
        return (
            <div dangerouslySetInnerHTML={{__html: marked(this.props.content)}}></div>
        )
    }
}

export default Markdown;
