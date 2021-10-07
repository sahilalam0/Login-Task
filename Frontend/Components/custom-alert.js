const template = document.createElement('template');
template.innerHTML = `
<style>
    div{
        position:fixed;
        bottom:10px;
        right:10px;
        z-index:1;
        min-width:200px;
        padding:10px;
        border-radius:5px;
        background-color:green;
        color:white;
        display:none;
        justify-content:space-between;
    }
    button{
        cursor:pointer;
        padding:0;
        border:0;
        color:rgba(1,1,1,0.5);
        background-color:transparent;
        margin:0;
        margin-right:5px;
    }
    button:hover{
        color:white;
    }
</style>
<div>
    <span></span>
    <button>X</button>
</div>
`;

const colors = {
    'success': 'rgba(0, 184, 0, 0.747)',
    'error': 'rgba(255, 0, 0, 0.8)'
}

export default class CustomAlert extends HTMLElement {
    static get observedAttributes() {
        return ['show'];
    }
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.div = this.shadowRoot.querySelector('div');
        this.message = this.div.querySelector('span');
        this.closeButton = this.div.querySelector('button');
    }
    connectedCallback() {
        this.closeButton.addEventListener('click', this.handleCloseButton);
    }
    disconnectedCallback() {
        this.closeButton.removeEventListener('click', this.handleCloseButton);
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }
    attributeChangedCallback(...args) {
        if (args[0] === 'show') {
            if (args[2]) {

                if (this.timeout) {
                    clearTimeout(this.timeout);
                }
                this.message.innerHTML = this.getAttribute('message');
                this.div.style.backgroundColor = colors[this.getAttribute('color')];
                this.div.style.display = 'flex';
                const time = +this.getAttribute('time');

                if (!isNaN(time) && typeof time === 'number') {
                    this.timeout = setTimeout(() => {
                        this.removeAttribute('show');
                    }, time * 1000);
                }
            }
            else {
                this.div.style.display = 'none';
            }
        }
    }
    handleCloseButton = () => {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.removeAttribute('show');
    }
}