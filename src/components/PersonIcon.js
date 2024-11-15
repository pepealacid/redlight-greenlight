class PersonIcon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // Observe the `isgreen` attribute to handle dynamic changes
  static get observedAttributes() {
    return ["isgreen"];
  }

  // Render the component when it's connected to the DOM
  connectedCallback() {
    this.render();
  }

  // Render method to update the icon based on the `isgreen` attribute
  render() {
    const isGreen = this.getAttribute("isgreen") === "true";
    const imgSrc = isGreen
      ? "../../assets/img/boy-back.png" // Display back view if green
      : "../../assets/img/boy-front.png"; // Display front view if not green
    const altText = isGreen ? "Go!" : "Stop!";

    this.shadowRoot.innerHTML = `
      <style>
        .person {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
        img {
          width: 80px;
          height: auto;
        }
      </style>
      <div class="person">
        <img src="${imgSrc}" alt="${altText}" />
      </div>
    `;
  }
}

// Define the new custom element
customElements.define("person-icon", PersonIcon);
