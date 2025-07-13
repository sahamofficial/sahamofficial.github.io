const html = `<div class="card">Click Me!</div>`;
const css = `.card {
  padding: 1rem;
  background: #4CAF50;
  color: white;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
}`;
const js = `document.querySelector('.card').onclick = () => {
  alert('Card clicked!');
};`;

const iframe = document.getElementById('preview');
iframe.srcdoc = `
  <html>
    <head>
      <style>${css}</style>
    </head>
    <body>
      ${html}
      <script>${js}<\/script>
    </body>
  </html>
`;
