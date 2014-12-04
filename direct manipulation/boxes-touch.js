var BoxesTouch = {
    /**
     * Sets up the given jQuery collection as the drawing area(s).
     */
    setDrawingArea: function (jQueryElements) {
        // Set up any pre-existing box elements for touch behavior.
        jQueryElements
            .addClass("drawing-area")
            
            // Event handler setup must be low-level because jQuery
            // doesn't relay touch-specific event properties.
            .each(function (index, element) {
                element.addEventListener("touchstart",BoxesTouch.startDraw,false);
                element.addEventListener("touchmove", BoxesTouch.trackDrag, false);
                element.addEventListener("touchend", BoxesTouch.endDrag, false);
            })

            .find("div.box").each(function (index, element) {
                element.addEventListener("touchstart", BoxesTouch.startMove, false);
                element.addEventListener("touchend", BoxesTouch.unhighlight, false);
            });
    },


    //starts creation process of boxes if there is a touch in empty spot of draw space
    startDraw: function (event){
        $.each(event.changedTouches, function(index,touch){
            touch.anchorX =touch.pageX 
            touch.anchorY = touch.pageY
            this.newBox=$("<div></div>")
                .appendTo("#drawing-area")
                .addClass("box")
                .width(10+"px")
                .height(10+"px")
                .css({left: touch.pageX+"px",top: touch.pageY+"px"})
                
            

            $("#drawing-area").find("div.box").each(function (index, element) {
                element.addEventListener("touchstart", BoxesTouch.startMove, false);
                element.addEventListener("touchend", BoxesTouch.unhighlight, false);
                });
        });
        event.stopPropagation();
    },

    /**
     * Tracks a box as it is rubberbanded or moved across the drawing area.
     */
    trackDrag: function (event) {
        $.each(event.changedTouches, function (index, touch) {
            // Don't bother if we aren't tracking anything.
            if (touch.target.movingBox) {
                // Reposition the object.
                touch.target.movingBox.offset({
                    left: touch.pageX - touch.target.deltaX,
                    top: touch.pageY - touch.target.deltaY
                });
            }
            //creates the new box with proper dimensions
            else if(touch.target=$("drawing-area")){
                var changedWidth=Math.abs(touch.pageX - touch.anchorX)+"px";
                var changedHeight=Math.abs(touch.pageY - touch.anchorY)+"px";
                var changedLeft=((touch.anchorX < touch.pageX) ? touch.anchorX : touch.pageX)+"px";
                var changedTop=((touch.anchorY < touch.pageY) ? touch.anchorY : touch.pageY)+"px";
                this.newBox.width(changedWidth).height(changedHeight).css({left:changedLeft,top:changedTop});
            }
               //add deletion border to box if it is outside for draw area
                if(touch.pageX>=$("#drawing-area").width()|| touch.pageY>=$("#drawing-area").height()){
                    touch.target.movingBox.addClass("box-deletion-color");
                }
                //removes deletion border from box if it re-enters draw area
                if(touch.pageX<$("#drawing-area").width()&& touch.pageY<$("#drawing-area").height()){
                    touch.target.movingBox.removeClass("box-deletion-color");
                }
            })
        
        // Don't do any touch scrolling.
        event.preventDefault();
    },

    /**
     * Concludes a drawing or moving sequence.
     */
    endDrag: function (event) {
        $.each(event.changedTouches, function (index, touch) {
            if (touch.target.movingBox) {
                //deletes box if not in draw area
                if(touch.pageX>=$("#drawing-area").width()|| touch.pageY>=$("#drawing-area").height()){
                    $(touch.target.movingBox).remove();}
                else{
                    touch.target.movingBox = null;
                }
            }
        });
    },

    /**
     * Indicates that an element is unhighlighted.
     */
    unhighlight: function () {
        $(this).removeClass("box-highlight");
    },

    /**
     * Begins a box move sequence.
     */
    startMove: function (event) {
        $.each(event.changedTouches, function (index, touch) {
            // Highlight the element.
            $(touch.target).addClass("box-highlight");

            // Take note of the box's current (global) location.
            var jThis = $(touch.target),
                startOffset = jThis.offset();

            // Set the drawing area's state to indicate that it is
            // in the middle of a move.
            touch.target.movingBox = jThis;
            touch.target.deltaX = touch.pageX - startOffset.left;
            touch.target.deltaY = touch.pageY - startOffset.top;
        });

        // Eat up the event so that the drawing area does not
        // deal with it.
        event.stopPropagation();
    }

};
