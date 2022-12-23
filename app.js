class Grid extends HTMLElement {
  constructor() {
    super();

    this._imageSize = this.getAttribute("image-size") || "200px";
    this._dataFile = this.getAttribute("data-file") || "";
    this._images = [];
    this._root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    fetch(this._dataFile)
      .then((response) => response.json())
      .then((data) => {
        this._images = data;
        this._render();
      });
  }

  _render() {
    this._root.innerHTML = `
        <style>
          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(${
              this._imageSize
            }, 1fr));
            place-items: stretch;
            grid-gap: 20px;
            margin: 0 auto;
          }
          
          .grid img {
            filter: grayscale(0.9) opacity(0.9);
            object-fit: cover;
          }
        </style>
        <div class="grid">
        ${this._images
          ?.map(
            (image) =>
              `<img src="${image.src}" ${image.alt && `alt="${image.alt}"`} ${
                image.title && `title="${image.title}"`
              } />`
          )
          .join("")}
        </div>
      `;
  }
}

customElements.define("grid-image", Grid);
