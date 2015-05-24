//import React from 'react';
import React from './react';


export default class Oni extends React.Component {

  static defaultProps = {
    oniE: 'div',
    oniTW: 1,
    oniTH: 1,
    oniW: 1,
    oniH: 1,
    oniXOffset: 0,
    oniYOffset: 0,
    _isOni: true
  };


  render(){
    if (this.context){
      console.log('context', this.context);
    }

    var {
      oniE, oniTW, oniTH, oniW, oniH,
      oniX, oniY, oniXOffset, oniYOffset,
      oniXAlign, oniYAlign,
      oniCol, oniRoot, oniDev, oniCS,
      _isOniKid, _oniXUnit, _oniYUnit,
      style, children,
      ...otherProps
    } = this.props;

    if (!_isOniKid){
      _oniXUnit = 100;
      _oniYUnit = 100;
    }

    var wP = _oniXUnit * oniW;
    var hP = _oniYUnit * oniH;

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

    var setSize = oniCol? oniTH: oniTW;
    var rightSizeFound = false;
    var coordArray;

    while (!rightSizeFound) {
      var setCount = 1;
      var currentSetTotal = 0;

      coordArray = {};
      React.Children.forEach(children, (c, i) => {
        if (!c || !c.props || !c.props._isOni){
          return;
        }

        var itemPos, setPos;

        var itemUnits = oniCol? c.props.oniH: c.props.oniW;

        if ((currentSetTotal + itemUnits) > setSize){
          itemPos = 0;
          setPos = setCount;

          setCount++;
          currentSetTotal = 0;
        } else {
          itemPos = currentSetTotal;
          setPos = setCount - 1;
        }

        currentSetTotal += itemUnits;

        coordArray[i] = {
          oniX: oniCol? setPos: itemPos,
          oniY: oniCol? itemPos: setPos
        };
      });

      if (setCount <= (oniCol? oniTW: oniTH)){
        rightSizeFound = true;
      } else {
        setSize++;
      }
    }

    var newKids = React.Children.map(children, (c, i) => {
      if (!c || !c.props || !c.props._isOni) {
        return c;
      }

      var moreProps = {
        _oniXUnit: 100 / oniTW,
        _oniYUnit: 100 / oniTH,
        _isOniKid: true,
        oniDev
      };

      if (typeof c.props.oniX !== 'undefined'){
        moreProps.oniX = c.props.oniX;
      } else {
        moreProps.oniX = coordArray[i].oniX;
      }

      if (typeof c.props.oniY !== 'undefined'){
        moreProps.oniY = c.props.oniY;
      } else {
        moreProps.oniY = coordArray[i].oniY;
      }

      if (oniCS){
        moreProps.style = {};
        for (var key in oniCS){
          moreProps.style[key] = oniCS[key];
        }
        for (var key in c.props.style){
          moreProps.style[key] = c.props.style[key];
        }
      }

      return React.cloneElement(c, moreProps);
    });

    var newStyle = {
      position: oniRoot? 'fixed': 'absolute',
      boxSizing: 'border-box',
      overflow: 'auto',
      //display: 'table',
      textAlign: 'start'
    };

    if (oniXAlign){
      newStyle.textAlign = oniXAlign;
    }

    if (oniDev){
      newStyle.border = 'thin solid hsl(120,50%,80%)';
    }

    newStyle.width = `${wP}%`;
    newStyle.height = `${hP}%`;
    newStyle.left = `${((oniX || 0) + oniXOffset) * _oniXUnit}%`;
    newStyle.top = `${((oniY || 0) + oniYOffset) * _oniYUnit}%`;

    for (var key in style){
      newStyle[key] = style[key];
    }

    var OniE = oniE;

    return <OniE style={newStyle} {...otherProps}>
      {newKids}
    </OniE>;
  }

}
