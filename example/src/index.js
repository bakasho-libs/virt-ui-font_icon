var virt = require("virt"),
    virtDOM = require("virt-dom"),
    FontIcon = require("../..");


var AppPrototype;


function App(props, children, context) {
    virt.Component.call(this, props, children, context);
}
virt.Component.extend(App, "App");
AppPrototype = App.prototype;

AppPrototype.getChildContext = function() {
    return {
        muiTheme: {
            styles: {
                fontIcon: {
                    color: "#000000",
                    hoverColor: "#ff0000"
                }
            },
            spacing: {
                iconSize: 16
            }
        }
    };
};

AppPrototype.render = function() {
    return (
        virt.createView("div", {
                className: "App"
            },
            virt.createView(FontIcon, {
                className: "material-icons"
            }, "face")
        )
    );
};

virtDOM.render(virt.createView(App), document.getElementById("app"));
