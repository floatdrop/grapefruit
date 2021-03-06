gf.input.GamepadButtons = function(man, game) {
    gf.input.Input.call(this, man, game);

    /**
     * The threshold at which we consider a button "pressed"
     *
     * @property threshold
     * @type Number
     * @default 0.4
     */
    this.threshold = 0.4;

    //track the status of each button
    this.buttons = {};
};

gf.inherits(gf.input.GamepadButtons, gf.input.Input, {
    pollStatus: function(pad) {
        //I would like to be able to emit events when something updates, but for now
        //just update the status of bound keys in controls; controls only has 1 "gamepad"
        //so this loop will blow away the changes each iteration (only the "last" gamepad is supported)
        for(var b = 0, bl = pad.buttons.length; b < bl; ++b) {
            if(!this.binds[b]) continue;

            var pressed = (pad.buttons[b] > this.threshold);

            if(!this.buttons[b])
                this.buttons[b] = { pressed: false, code: b };

            this.buttons[b].val = pad.buttons[b];

            //state changed
            if(this.buttons[b].pressed !== pressed) {
                this.buttons[b].pressed = pressed;
                this.status[this.binds[b]] = pressed;
                this.runCallbacks(b, [pressed]);
            }
        }
    }
});