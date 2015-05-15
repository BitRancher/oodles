import React from 'react/addons';


var FONT_HEIGHT_FACTOR = 0.8;
var FONT_WIDTH_FACTOR = 0.2;

// these are not static props to allow certain child style inheritance behaviors
var DEFAULT_STYLE = {
  display: 'flex',
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


export default class FlexboxHelper extends React.Component {

  static defaultProps = {
    ref: 'me',
    t: 'div',
    debugGrid: false,
    tWF: 1/2
  };

  state = { rootHeight: 0, rootWidth: 0 };

  render(){
    let {
      o, t, wF, hF, cWF, cHF, s, cS, tWF, tHF,
      children, style,
      ...otherProps
    } = this.props;

    var newStyle = {};
    for (var styleKey in DEFAULT_STYLE){
      newStyle[styleKey] = DEFAULT_STYLE[styleKey];
    }

    if (!otherProps.__isFlexChild){
      newStyle.position = 'relative';
      newStyle.top = this.state.topAdjust;
      newStyle.left = this.state.leftAdjust;
      newStyle.height = this.state.rootHeight * (hF || 1);
      newStyle.width = this.state.rootWidth * (wF || 1);
    } else {
      if (wF){
        newStyle.width = (100 * wF) + '%';
      }
      if (hF){
        newStyle.height = (100 * hF) + '%';
      }
    }

    for (var styleKey in s){
      newStyle[styleKey] = s[styleKey];
    }
    for (var styleKey in style){
      newStyle[styleKey] = style[styleKey];
    }
    if (this.props.debugGrid && !newStyle.border){
      newStyle.border = 'thin solid gray';
    }

    var totalCWF = 0, totalCHF = 0, testW = [], testH = [];
    var flexKids = React.Children.map(children, child => {
      if (child.props){
        var newProps = {
          key: child.key,
          ref: child.ref,
          s: {},
          __isFlexChild: true
        };
        if (!child.props.wF){
          newProps.wF = cWF || 1;
        }
        if (!child.props.hF){
          newProps.hF = cHF || 1;
        }
        for (var styleKey in cS){
          newProps.s[styleKey] = cS[styleKey];
        }
        for (var styleKey in child.props.s){
          newProps.s[styleKey] = child.props.s[styleKey];
        }
        for (var styleKey in child.props.style){
          newProps.s[styleKey] = child.props.style[styleKey];
        }
        if (this.props.debugGrid){
          newProps.debugGrid = true;
          if (!newProps.s.border){
            newProps.s.border = 'thin solid gray';
          }
        }
        totalCWF += child.props.wF || newProps.wF;
        totalCHF += child.props.hF || newProps.hF;
        testW.push(totalCWF);
        testH.push(totalCHF);
        return React.addons.cloneWithProps(child, newProps);
      } else {
        return child;
      }
    });
    //console.log(testW, testH);
    if (totalCWF <= 1){ //console.log('hiding x');
      newStyle.overflowX = 'hidden';
    }
    if (totalCHF <= 1){ //console.log('hiding y');
      newStyle.overflowY = 'hidden';
    }

    return React.createElement(
      o || t,
      { style: newStyle, ...otherProps },
      flexKids
    );
  }

  componentDidMount(){

    var me = this.refs[this.props.ref].getDOMNode();

    var rect = me.getBoundingClientRect();
    this.setState({ topAdjust: -rect.top, leftAdjust: -rect.left });

    this.rescale = () => {
      //console.log('rescaling');
      this.setState(
        { rootWidth: window.innerWidth, rootHeight: window.innerHeight },
        () => {
          if (this.props.tWF){
            me.style.fontSize
              = `${me.offsetWidth * this.props.tWF * FONT_WIDTH_FACTOR}px`;
          } else if (this.props.tHF){


            me.style.fontSize
              = `${me.offsetHeight * this.props.tHF * FONT_HEIGHT_FACTOR}px`;
          }
        }.bind(this)
      );
    }.bind(this);

    this.rescale();
    setTimeout(this.rescale, 1000);
    window.addEventListener('resize', this.rescale);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.rescale);
  }

  componentDidUpdate(){
    if (this.props.tWF && this.props.tHF){
      console.warn('Both tWF and tHF were set. Only tWF was used.');
    }

    if (this.props.__isFlexChild){
      return;
    }

    if (window.innerWidth >= document.body.scrollWidth){
      document.body.style.overflowX = 'hidden';
    } else {
      document.body.style.overflowX = 'auto';
    }
    if (window.innerHeight >= document.body.scrollHeight){
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }

}
