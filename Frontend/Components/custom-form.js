const template = document.createElement('template');
template.innerHTML = `
<style>
    form{
        width:100%;
        padding:20px;
        padding-top:0;
        border-radius:5px;
        display:flex;
        justify-content:center;
        flex-direction:column;
        box-shadow:0px 0px 10px rgba(1,1,1,0.3);
    }
    input,button{
        margin-bottom:30px;
        margin-top:5px;
        border:1px solid rgba(0, 102, 255,0.5);
        border-radius:5px;
        padding:10px;
        box-shadow:0px 0px 10px rgba(0, 102, 255,0.5);
    }
    button{
        cursor:pointer;
        border:0;
        color:white;
        background-color:rgb(0, 102, 255);
    }
    button:hover{
        background-color:rgb(0, 68, 170);
    }
    h3{
        width:100%;
        text-align: center;
        border-bottom:1px solid rgba(1, 1, 1,0.3);
        padding-bottom:5px;
    }
</style>
<form>
    <h3>Login Form</h3>
    Email
    <input type="email" placeholder="Enter registered email.." required />
    Password
    <input type="password" placeholder="Enter password.." required />
    <button>Log In</button>
</form>
`;

export default class CustomForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.form = this.shadowRoot.querySelector('form');
        this.email = this.form.querySelector('input[type="email"]');
        this.password = this.form.querySelector('input[type="password"]');
    }
    connectedCallback() {
        customElements.whenDefined('custom-alert').then(() => {
            this.customAlert = document.querySelector('custom-alert');
        })
        this.form.addEventListener('submit', this.handleSubmit);
    }
    disconnectedCallback() {
        this.form.removeEventListener('submit', this.handleSubmit);
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:5000?email=${this.email.value}&password=${this.password.value}`);
        const data = await response.json();
        this.showCustomAlert({
            color: response.status === 200 ? 'success' : 'error',
            message: data.message,
            time: 3
        })
    }
    showCustomAlert({ color, message, time }) {
        this.customAlert.setAttribute('color', color);
        this.customAlert.setAttribute('message', message);
        this.customAlert.setAttribute('time', time)
        this.customAlert.setAttribute('show', true);
    }

}
