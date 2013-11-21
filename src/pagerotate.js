/*!
 * Page Rotate Chrome Extension v0.1
 * https://github.com/jesseskinner/pagerotate
 *
 * Copyright 2013 Jesse Skinner (@JesseSkinner)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Date: 2013-11-21
 */
function PageRotate(body){
	var frame, rotate;

	// default to the body of the top frame
	body = body || window.top.document.body;

	// is the frame already there?
	if (body.children.length === 1 && body.children[0].nodeName === 'IFRAME') {
	    frame = body.children[0],

		// figure out the existing rotation and add 90
	    rotate = 90 + parseInt(frame.style.webkitTransform.replace(/[^0-9]+/, ''));

	} else {
		// frame not there yet, add it
	    body.innerHTML = '<iframe></iframe>';

	    // fetch it
	    frame = body.children[0];
	    
	    // load the current page inside the frame
	    frame.src = location.href;

	    // start off with a 90 degree rotation
	    rotate = 90;
	}

	// set base styles
    frame.style.position = 'absolute';

    // make the body and frame both 100% width/height
    frame.style.width = frame.style.height =
    	body.style.width = body.style.height = '100%';

    // set a bunch of CSS properties to zero
    frame.style.top = frame.style.left = frame.style.border =
    	frame.style.margin = frame.style.padding =
    	body.style.padding = body.style.margin = 0;

    // reset any rotation, so we can re-measure
    frame.style.webkitTransform = 'none';

    // hide scrollbars on the body
    body.style.overflow = 'hidden';

    // if rotated 90 or 270 degrees, switch the width & height and reposition
    if ((rotate % 180) !== 0) {
        // measure the frame (ie. measure the whole visible area)
        var width = frame.offsetWidth,
            height = frame.offsetHeight;

        // switch the height and width
        frame.style.width = height + 'px';
        frame.style.height = width + 'px';

        // position the frame to be visible after rotating
        frame.style.marginTop = -(width / 2) + 'px';
        frame.style.marginLeft = -(height / 2) + 'px';
        frame.style.top = frame.style.left = '50%';
    }

    // rotate using CSS
    frame.style.webkitTransform = "rotate(" + rotate + "deg)";
}