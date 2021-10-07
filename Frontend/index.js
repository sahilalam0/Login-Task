(
    function () {
        Promise.all([import("/Components/app-component.js"), import("/Components/custom-form.js"), import("/Components/custom-alert.js")]).then((values) => {
            const components = [
                {
                    element: 'app-component',
                    component: values[0].default
                },
                {
                    element: 'custom-form',
                    component: values[1].default
                },
                {
                    element: 'custom-alert',
                    component: values[2].default
                }
            ];
            components.forEach((component) => {
                window.customElements.define(component.element, component.component);
            });

        });

    }
)();