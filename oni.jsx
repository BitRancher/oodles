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
      oniCol, oniRoot, oniDev,
      _isOniKid, _oniXUnit, _oniYUnit,
      style, children,
      ...otherProps
    } = this.props;

    if (oniRoot){
      _oniXUnit = this.state.rootW;
      _oniYUnit = this.state.rootH;
    }

    var wP = _oniXUnit * oniW;
    var hP = _oniYUnit * oniH;

    //console.log('w h', wP, hP, _oniXUnit, _oniYUnit, oniW, oniH);

    var slotsNeeded = React.Children.count(children);
    var finalTW = oniTW;
    var finalTH = oniTH;

    if (oniCol){
      while (finalTH * oniTW < slotsNeeded){
        finalTH++;
      }
    } else {
      while (finalTW * oniTH < slotsNeeded){
        finalTW++;
      }
    }

    var newKids = React.Children.map(children, (c, i) => {
      if (!c.props) {
        return c;
      }

      var moreProps = {
        _oniXUnit: wP / oniTW,
        _oniYUnit: hP / oniTH,
        oniDev
      };

      if (!c.props.oniX || !c.props.oniY){
        if (oniCol){
          var unitsLeft = i + 1;
          moreProps.oniX = 0;
          while (unitsLeft){
            if (unitsLeft - finalTH > 0){
              unitsLeft -= finalTH;
              moreProps.oniX++;
            } else {
              moreProps.oniY = unitsLeft - 1;
              unitsLeft = 0;
            }
          }
        } else {
          var unitsLeft = i + 1;
          moreProps.oniY = 0;
          while (unitsLeft){
            if (unitsLeft - finalTW > 0){
              unitsLeft -= finalTW;
              moreProps.oniY++;
            } else {
              moreProps.oniX = unitsLeft - 1;
              unitsLeft = 0;
            }
          }
        }
      }

      if (c.props.oniX){
        moreProps.oniX = c.props.oniX;
      }
      if (c.props.oniY){
        moreProps.oniY = c.props.oniY;
      }


      return React.cloneElement(c, moreProps);
    });

    var newStyle = {
      position: 'absolute',
      boxSizing: 'border-box'
    };

    if (oniDev){
      newStyle.border = 'thin solid hsl(120,50%,80%)';
    }

    newStyle.width = wP;
    newStyle.height = hP;
    newStyle.left = oniX * _oniXUnit;
    newStyle.top = oniY * _oniYUnit;

    if (finalTW > oniTW){
      newStyle.overflowX = 'auto';
    } else {
      newStyle.overflowX = 'hidden';
    }

    if (finalTH > oniTH){
      newStyle.overflowY = 'auto';
    } else {
      newStyle.overflowY = 'hidden';
    }

    for (var key in style){
      newStyle[key] = style[key];
    }

    //console.log('oni', this.props, finalTW, oniTW, newStyle.overflowX, this.state);

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
