var virt = require("virt"),
    propTypes = require("prop_types"),
    css = require("css"),
    extend = require("extend");


var FontIconPrototype;


module.exports = FontIcon;


function FontIcon(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.state = {
        hover: false
    };

    this.onMouseOver = function(e) {
        return _this.__onMouseOver(e);
    };
    this.onMouseOut = function(e) {
        return _this.__onMouseOut(e);
    };
}
virt.Component.extend(FontIcon, "virt-ui-FontIcon");

FontIcon.contextTypes = {
    muiTheme: propTypes.implement({
        palette: propTypes.implement({
            accentColor: propTypes.string.isRequired,
            primaryTextColor: propTypes.string.isRequired
        }).isRequired,
        spacing: propTypes.implement({
            iconSize: propTypes.number.isRequired
        }).isRequired
    }).isRequired
};

FontIcon.propTypes = {
    color: propTypes.string,
    hoverColor: propTypes.string,
    onMouseOut: propTypes.func,
    onMouseOver: propTypes.func
};

FontIconPrototype = FontIcon.prototype;

FontIconPrototype.__onMouseOver = function(e) {
    if (this.props.onMouseOver) {
        this.props.onMouseOver(e);
    }

    this.setState({
        hover: true
    });
};

FontIconPrototype.__onMouseOut = function(e) {
    if (this.props.onMouseOut) {
        this.props.onMouseOut(e);
    }

    this.setState({
        hover: false
    });
};

FontIconPrototype.getStyle = function() {
    var theme = this.context.muiTheme,
        palette = theme.palette,
        spacing = theme.spacing,
        props = this.props,
        style = extend({}, {
            position: "relative",
            fontSize: (props.size || spacing.iconSize) + "px",
            display: "inline-block",
            lineHeight: (props.size || spacing.iconSize) + "px",
            color: props.color || palette.primaryTextColor || "black",
            cursor: "pointer"
        }, props.style);

    if (this.state.hover) {
        style.color = props.hoverColor || palette.accentColor;
    }

    css.userSelect(style, "none");
    css.transition(style, "all 450ms cubic-bezier(0.23, 1, 0.32, 1)");

    return style;
};

FontIconPrototype.render = function() {
    var props = extend({}, this.props);

    props.className = "virt-ui-FontIcon" + (props.className ? " " + props.className : "");

    props.style = this.getStyle();

    props.onMouseOver = this.onMouseOver;
    props.onMouseOut = this.onMouseOut;

    return virt.createView("i", props, this.children);
};
