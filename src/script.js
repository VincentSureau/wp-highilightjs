import hljs from 'highlight.js';

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.code-snippet_content').forEach((el) => {
        hljs.highlightElement(el);
    });
});