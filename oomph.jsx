import React from 'react';

var FONT_HEIGHT_FACTOR = 0.8;
var FONT_WIDTH_FACTOR = 0.2;

// these are not static props to allow certain child style inheritance behaviors
var DEFAULT_STYLE = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  //alignItems: 'center',
  //alignSelf: 'center',
  alignContent: 'flex-start',
  //justifyContent: 'center',
  overflow: 'auto',
  //border: 'thin solid gray',
  boxSizing: 'border-box',
  margin: 0,
  padding: 0
};


export default class FlexO extends React.Component {

  static defaultProps = {
    ref: 'me',
    t: 'div',
    devBorders: false,
    tWF: 1/2,
    root: false,
    rootWidthCorrection: -14,
    rootHeightCorrection: -14
  };

  state = { rootHeight: 0, rootWidth: 0 };

  render(){
    let {
      o, e, t, wF, hF, cWF, cHF, s, cS, tWF, tHF, root,
      crossAlign, dirAlign, d, reverse,
      devBorders, __isFlexChild,
      children, style,
      ...otherProps
    } = this.props;

    var newStyle = {};

    if (crossAlign === 'start'){
      newStyle.alignItems = 'flex-start';
    } else if (crossAlign === 'end'){
      newStyle.alignItems = 'flex-end';
    } else if (crossAlign){
      newStyle.alignItems = crossAlign;
    }

    if (dirAlign === 'start'){
      newStyle.justifyContent = 'flex-start';
    } else if (dirAlign === 'end'){
      newStyle.justifyContent = 'flex-end';
    } else if (dirAlign){
      newStyle.justifyContent = dirAlign;
    }

    for (var styleKey in DEFAULT_STYLE){
      newStyle[styleKey] = DEFAULT_STYLE[styleKey];
    }

    if (root && !__isFlexChild){
      newStyle.position = 'relative';
      newStyle.height = this.state.rootHeight * (hF || 1);
      newStyle.width = this.state.rootWidth * (wF || 1);
    } else {
      if (wF){
        newStyle.width = `${wF * 100}%`;
      }
      if (hF){
        newStyle.height = `${hF * 100}%`;
      }
    }

    for (var styleKey in s){
      newStyle[styleKey] = s[styleKey];
    }
    for (var styleKey in style){
      newStyle[styleKey] = style[styleKey];
    }

    if (devBorders && !newStyle.border){
      if (typeof devBorders === 'string' || devBorders instanceof String){
        newStyle.border = devBorders;
      } else {
        newStyle.border = 'thin solid gray';
      }
    }

    var totalCWF = 0, totalCHF = 0;

    var flexKids = React.Children.map(children, child => {
      if (child.props){
        var newProps = {
          s: {},
          __isFlexChild: true
        };

        newProps.wF = child.props.wF || cWF || 1;
        newProps.hF = child.props.hF || cHF || 1;

        for (var styleKey in cS){
          newProps.s[styleKey] = cS[styleKey];
        }
        for (var styleKey in child.props.s){
          newProps.s[styleKey] = child.props.s[styleKey];
        }
        for (var styleKey in child.props.style){
          newProps.s[styleKey] = child.props.style[styleKey];
        }

        if (!child.props.devBorders){
          newProps.devBorders = devBorders;
        }

        totalCWF += newProps.wF;
        totalCHF += newProps.hF;

        return React.cloneElement(child, newProps);
      } else {
        return child;
      }
    });

    if (totalCWF <= 1){
      newStyle.overflowX = 'hidden';
    }
    if (totalCHF <= 1){
      newStyle.overflowY = 'hidden';
    }

    return React.createElement(
      o || e || t,
      { style: newStyle, ...otherProps },
      flexKids
    );
  }

  componentDidMount(){
    var me = this.refs[this.props.ref].getDOMNode();

    this.rescale = () => {
      if (this.props.root){
        this.setState({
          rootWidth: window.innerWidth * (this.props.wF || 1) + this.props.rootWidthCorrection,
          rootHeight: window.innerHeight * (this.props.hF || 1) + this.props.rootHeightCorrection
        });

        if (!this.props.wF || (this.props.wF <= 1)){
          document.body.style.overflowX = 'hidden';
        }
        if (!this.props.hF || (this.props.hF <= 1)){
          document.body.style.overflowY = 'hidden';
        }
      }

      return;

      if (this.props.tWF){
        me.style.fontSize
          = `${me.offsetWidth * this.props.tWF * FONT_WIDTH_FACTOR}px`;
      } else if (this.props.tHF){
        me.style.fontSize
          = `${me.offsetHeight * this.props.tHF * FONT_HEIGHT_FACTOR}px`;
      }
    };

    this.rescale();

    window.addEventListener('resize', this.rescale);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.rescale);
  }

  componentDidUpdate(){
    if (this.props.tWF && this.props.tHF){
      var message = 'Both tWF and tHF were set. Only tWF was used.';
      console.warn(message, this);
    }

    if (this.props.s && this.props.style){
      var message = 'Both s and style props were set. Properties in style will override properties in s.';
      console.warn(message, this);
    }

    if (this.props.root && this.props.__isFlexChild){
      var message = `This component's root prop = true, but it is the child of another root.`;
      console.warn(message, this);
    }
  }

}
