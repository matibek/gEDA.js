
/*
 * Battery power source
 * 
 * two poles: plus, minus
 * two ends
 * two terminals
 */

Battery = function(parentSchematic, debug, randomXY) {
    
    this.parentSchematic = parentSchematic;
    this.parentSchematic.append(this);
    this.debug = debug ? debug : (this.parentSchematic.debug ? this.parentSchematic.debug : false);
    randomXY = randomXY ? randomXY : true;
    
    this.voltage = 0;
    
    this.path = this.parentSchematic.newPathElement();
    this.circlePlus = this.parentSchematic.newCircleTerminal();
    this.circleMinus = this.parentSchematic.newCircleTerminal();
    
    var x = 50;
    var y = 50;
    if (randomXY) {
        x = Math.random()*(parseInt($('#svg').css('width'))-80)+40;
        y = (Math.random()*(parseInt($('#svg').css('height'))-80))+40;
    }
    this.setXY(x,y);
    
    this.terminals = [];
    this.terminals.push( new Terminal(this) );
    this.terminals.push( new Terminal(this) );
    this.terminals[0].hookSVG(this.circlePlus);
    this.terminals[1].hookSVG(this.circleMinus);
};

Battery.prototype.setXY = function(x, y) {
    this.x = x;
    this.y = y;
    this.refresh();
    return this;
};

Battery.prototype.setVoltage = function(V) {
    this.voltage = V;
    this.terminals[0].setVoltage(V/2);
    this.terminals[1].setVoltage(-V/2);
};

Battery.prototype.refresh = function() {
    
    var a = {x:this.x-30, y:this.y};
    var b = {x:this.x-3, y:this.y};
    var m = {x:this.x-3, y:this.y-20};
    var n = {x:this.x-3, y:this.y+20};
    var v = {x:this.x+3, y:this.y-10};
    var w = {x:this.x+3, y:this.y+10};
    var c = {x:this.x+3, y:this.y};
    var d = {x:this.x+30, y:this.y};
    this.path.attr('d','M'+coord(a)+' L'+coord(b)+' M'+coord(m)+' L'+coord(n)+' M'+coord(v)+' L'+coord(w)+' M'+coord(c)+' L'+coord(d));
    
    this.circlePlus.attr('cx',a.x);
    this.circlePlus.attr('cy',a.y);
    this.circleMinus.attr('cx',d.x);
    this.circleMinus.attr('cy',d.y);
};