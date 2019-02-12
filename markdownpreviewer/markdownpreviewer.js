// Handle return as newline
marked.setOptions({
  breaks: true,
});

class MarkdownPreviewer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      input: placeholder
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  render () {
    // Create special object for setting innerHTML in React
    const inner = {__html: marked(this.state.input)};
    return (<div>
        <h1>Editor</h1>
        <textarea id="editor" class="editor" value={this.state.input} onChange={this.handleChange} />
        <h1>Preview</h1>
        <div id="preview" class="preview" dangerouslySetInnerHTML={inner}></div>
      </div>
    );
  } // end render
} // end class

const placeholder =
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

ReactDOM.render(<MarkdownPreviewer />,
                document.getElementById('markdown'));
