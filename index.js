const MERMAID = 'https://unpkg.com/mermaid@latest/dist/mermaid.min.js'

const loadResource = url => new Promise((resolve) => {
  const head = document.getElementsByTagName('head')[0];
  const theScript = document.createElement('script');
  theScript.src = url;
  theScript.onload = () => {
    resolve();
  };
  head.appendChild(theScript);
})

Promise.all([loadResource(MERMAID)])
  .then(() => {
    window.mermaidPlugin = {}
    window.mermaidPlugin.evaluateMermaid = (input) => {
      const elem = iodide.output.element('div');
      const id = "iodide-mermaidChart-" + Date.now();
      elem.setAttribute("class", "iodideMermaid");
      mermaid.mermaidAPI.render(id, input, (svgCode) => elem.innerHTML = svgCode);

      return elem
    }
    window.iodide.addOutputRenderer({
      shouldRender: val => { return val.getAttribute('class') === 'iodideMermaid'; },
      render: (val) => {
        return val.innerHTML;
      },
    });
  });
