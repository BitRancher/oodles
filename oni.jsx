import React from 'react';


export default class Oni extends React.Component {

  static defaultProps = {
    oniE: 'div',
    oniTW: 1,
    oniTH: 1,
    oniW: 1,
    oniH: 1,
    oniXOffset: 0,
    oniYOffset: 0
  };

  render(){
    var {
      oniE, oniTW, oniTH, oniW, oniH,
      oniX, oniY, oniXOffset, oniYOffset,
      oniCol, oniRoot, oniDev, oniCS,
      _isOniKid, _oniXUnit, _oniYUnit,
      style, children,
      ...otherProps
    } = this.props;

    if (oniRoot){
      _oniXUnit = 100;//this.state.rootW;
      _oniYUnit = 100;//this.state.rootH;
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

    var setSize = oniCol? oniTH: oniTW;
    var rightSizeFound = false;
    var coordArray;

    while (!rightSizeFound) {
      var setCount = 1;
      var currentSetTotal = 0;

      coordArray = [];
      React.Children.forEach(children, c => {
        if (!c.props){
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

        coordArray.push({
          oniX: oniCol? setPos: itemPos,
          oniY: oniCol? itemPos: setPos
        });
      });

      if (setCount <= (oniCol? oniTW: oniTH)){
        rightSizeFound = true;
      } else {
        setSize++;
      }
    }

    if (coordArray.length){
      console.log(JSON.stringify(coordArray.map(({ oniX, oniY }) => [oniX,oniY])),
         setSize, setCount, this.props);
    }

    var newKids = React.Children.map(children, (c, i) => {
      if (!c.props) {
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
      overflow: 'auto'
      //display: 'table',
      //textAlign: 'start'
    };

    if (oniDev){
      newStyle.border = 'thin solid hsl(120,50%,80%)';
    }

    newStyle.width = `${wP}%`;
    newStyle.height = `${hP}%`;
    newStyle.left = `${((oniX || 0) + oniXOffset) * _oniXUnit}%`;
    newStyle.top = `${((oniY || 0) + oniYOffset) * _oniYUnit}%`;
/*
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
*/
    for (var key in style){
      newStyle[key] = style[key];
    }

    //console.log('oni', this.props, finalTW, oniTW, newStyle.overflowX, this.state);

    var OniE = oniE;

    return <OniE style={newStyle} {...otherProps}>
      {newKids}
    </OniE>;
  }

}
