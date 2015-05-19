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
      position: 'absolute',
      //overflow: 'auto',
      boxSizing: 'border-box'
    };

    if (oniRoot){
      _oniXUnit = this.state.rootW;
      _oniYUnit = this.state.rootH;
    }

    var wP = _oniXUnit * oniW;
    var hP = _oniYUnit * oniH;
    console.log('w h', wP, hP, _oniXUnit, _oniYUnit, oniW, oniH);

    /*if (typeof oniX === 'undefined'){
      if (oniCol){

      } else {
        var unitsLeft = _oniI;
        var y = 0;
        while (unitsLeft > 0){
          //if (unitsLeft - ){
          //}
        }
      }
    }

    if (typeof oniY === 'undefined'){
      if (oniCol){

      } else {

      }
    }*/

    var newKids = React.Children.map(children, (c, i) => {
      console.log('kid', c, i);
      if (!c.props) {
        return c;
      }

      var moreProps = {
        _oniXUnit: wP / oniTW,
        _oniYUnit: hP / oniTH
      };

      if (!c.props.oniX){
        var unitsLeft = i + 1;
        moreProps.oniY = 0;
        while (unitsLeft){
          if (unitsLeft - oniTW > 0){
            unitsLeft -= oniTW;
            moreProps.oniY++;
          } else {
            moreProps.oniX = unitsLeft - 1;
            unitsLeft = 0;
          }
        }
      }

      /*if (!c.props.oniY){

      }*/

      return React.cloneElement(c, moreProps);
    });

    newStyle.width = wP;
    newStyle.height = hP;
    newStyle.left = oniX * _oniXUnit;
    newStyle.top = oniY * _oniYUnit;

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
          rootW: (window.innerWidth * oniW) + (oniRootWMod || -14),
          rootH: (window.innerHeight * oniH) + (oniRootHMod || -14)
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
