const template = document.createElement('template');
template.innerHTML = `
<style>
    div{
        display:flex;
        justify-content:center;
        padding:10px;
    }
    custom-form{
        width:350px;
    }
</style>
<div>
    <custom-form></custom-form>
</div>
`;

export default class AppComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}