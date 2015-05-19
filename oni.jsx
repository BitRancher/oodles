import React from 'react';


export default class Oni extends React.Component {

  static defaultProps = {
    oniE: 'div',
    oniTW: 1,
    oniTH: 1,
    oniW: 1,
    oniH: 1
  };

  state = { rootW: 1, rootH: 1 };

  render(){
    var {
      oniE, oniTW, oniTH, oniW, oniH,
      oniX, oniY,
      oniCol, oniRoot,
      _isOniKid, _oniXUnit, _oniYUnit,
      style, children,
      ...otherProps
    } = this.props;

    console.log('oni', this.props, this.state);

    var newStyle = {
      position: 'absolute'
    };

    if (oniRoot){
      _oniXUnit = this.state.rootW;
      _oniYUnit = this.state.rootH;
    }

    var wP = _oniXUnit * oniW;
    var hP = _oniYUnit * oniH;
    console.log('w h', wP, hP, _oniXUnit, _oniYUnit, oniW, oniH);

    if (typeof oniX !== 'undefined'){
      newStyle.left = _oniXUnit * oniX;
    } else {
      if (oniCol){

      } else {

      }
    }

    if (typeof oniY !== 'undefined'){
      newStyle.top = _oniYUnit * oniY;
    } else {
      if (oniCol){

      } else {

      }
    }

    var newKids = React.Children.map(children, (c, i) => {
      console.log('kid', c);
      if (!c.props) {
        return c;
      }

      return React.cloneElement(c, {
        _oniXUnit: wP / oniTW,
        _oniYUnit: hP / oniTH,
        _oniI: i
      });
    });

    newStyle.width = wP;
    newStyle.height = hP;

    for (var key in style){
      newStyle[key] = style[key];
    }

    return React.createElement(
      oniE,
      { style: newStyle, ...otherProps },
      newKids
    );
  }

  componentDidMount(){
    var { oniRoot, oniW, oniH, oniRootHMod, oniRootWMod } = this.props;

    this.rescale = () => {
      if (oniRoot){
        this.setState({
          rootW: window.innerWidth * (oniW || 1) + (oniRootWMod || -14),
          rootH: window.innerHeight * (oniH || 1) + (oniRootHMod || -14)
        });

        if (oniW <= 1){
          document.body.style.overflowX = 'hidden';
        }
        if (oniH <= 1){
          document.body.style.overflowY = 'hidden';
        }
      }
    };

    this.rescale();

    window.addEventListener('resize', this.rescale);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.rescale);
  }

}
