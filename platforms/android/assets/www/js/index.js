/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        console.log("Hey, I am here with jquery mobile. ");
    }
};

function my_dump (var_value, var_name)
{
    // Check for a third argument and if one exists, capture it's value, else
    // default to TRUE.  When the third argument is true, this function
    // publishes the result to the document body, else, it outputs a string.
    // The third argument is intend for use by recursive calls within this
    // function, but there is no reason why it couldn't be used in other ways.
    var is_publish_to_body = typeof arguments[2] === 'undefined' ? true:arguments[2];

    // Check for a fourth argument and if one exists, add three to it and
    // use it to indent the out block by that many characters.  This argument is
    // not intended to be used by any other than the recursive call.
    var indent_by = typeof arguments[3] === 'undefined' ? 0:arguments[3]+3;

    var do_boolean = function (v)
    {
        return 'Boolean(1) '+(v?'TRUE':'FALSE');
    };

    var do_number = function(v)
    {
        var num_digits = (''+v).length;
        return 'Number('+num_digits+') '+v;
    };

    var do_string = function(v)
    {
        var num_chars = v.length;
        return 'String('+num_chars+') "'+v+'"';
    };

    var do_object = function(v)
    {
        if (v === null)
        {
            return "NULL(0)";
        }

        var out = '';
        var num_elem = 0;
        var indent = '';

        if (v instanceof Array)
        {
            num_elem = v.length;
            for (var d=0; d<indent_by; ++d)
            {
                indent += ' ';
            }
            out = "Array("+num_elem+") \n"+(indent.length === 0?'':'|'+indent+'')+"(";
            for (var i=0; i<num_elem; ++i)
            {
                //if (indent_by <= 1)
                    out += "\n"+(indent.length === 0?'':'|'+indent)+"|   ["+i+"] = "+my_dump(v[i],'',false,indent_by);
            }
            out += "\n"+(indent.length === 0?'':'|'+indent+'')+")";
            return out;
        }
        else if (v instanceof Object)
        {
            for (var d=0; d<indent_by; ++d)
            {
                indent += ' ';
            }
            out = "Object \n"+(indent.length === 0?'':'|'+indent+'')+"(";
            for (var p in v)
            {
                //if (indent_by <= 1)
                  out += "\n"+(indent.length === 0?'':'|'+indent)+"|   ["+p+"] = "+my_dump(v[p],'',false,indent_by);
            }
            out += "\n"+(indent.length === 0?'':'|'+indent+'')+")";
            return out;
        }
        else
        {
            return 'Unknown Object Type!';
        }
    };

    // Makes it easier, later on, to switch behaviors based on existance or
    // absence of a var_name parameter.  By converting 'undefined' to 'empty 
    // string', the length greater than zero test can be applied in all cases.
    var_name = typeof var_name === 'undefined' ? '':var_name;
    var out = '';
    var v_name = '';
    switch (typeof var_value)
    {
        case "boolean":
            v_name = var_name.length > 0 ? var_name + ' = ':''; // Turns labeling on if var_name present, else no label
            out += v_name + do_boolean(var_value);
            break;
        case "number":
            v_name = var_name.length > 0 ? var_name + ' = ':'';
            out += v_name + do_number(var_value);
            break;
        case "string":
            v_name = var_name.length > 0 ? var_name + ' = ':'';
            out += v_name + do_string(var_value);
            break;
        case "object":
            v_name = var_name.length > 0 ? var_name + ' => ':'';
            out += v_name + do_object(var_value);
            break;
        case "function":
            v_name = var_name.length > 0 ? var_name + ' = ':'';
            out += v_name + "Function";
            break;
        case "undefined":
            v_name = var_name.length > 0 ? var_name + ' = ':'';
            out += v_name + "Undefined";
            break;
        default:
            out += v_name + ' is unknown type!';
    }

    // Using indent_by to filter out recursive calls, so this only happens on the 
    // primary call [i.e. at the end of the algorithm]
    if (is_publish_to_body  &&  indent_by === 0)
    {
        var div_dump = document.getElementById('div_dump');
        if (!div_dump)
        {
            div_dump = document.createElement('div');
            div_dump.id = 'div_dump';

            var style_dump = document.getElementsByTagName("style")[0];
            if (!style_dump)
            {
                var head = document.getElementsByTagName("head")[0];
                style_dump = document.createElement("style");
                head.appendChild(style_dump);
            }
            // Thank you Tim Down [http://stackoverflow.com/users/96100/tim-down] 
            // for the following addRule function
            var addRule;
            if (typeof document.styleSheets != "undefined" && document.styleSheets) {
                addRule = function(selector, rule) {
                    var styleSheets = document.styleSheets, styleSheet;
                    if (styleSheets && styleSheets.length) {
                        styleSheet = styleSheets[styleSheets.length - 1];
                        if (styleSheet.addRule) {
                            styleSheet.addRule(selector, rule)
                        } else if (typeof styleSheet.cssText == "string") {
                            styleSheet.cssText = selector + " {" + rule + "}";
                        } else if (styleSheet.insertRule && styleSheet.cssRules) {
                            styleSheet.insertRule(selector + " {" + rule + "}", styleSheet.cssRules.length);
                        }
                    }
                };
            } else {
                addRule = function(selector, rule, el, doc) {
                    el.appendChild(doc.createTextNode(selector + " {" + rule + "}"));
                };
            }

            // Ensure the dump text will be visible under all conditions [i.e. always
            // black text against a white background].
            addRule('#div_dump', 'background-color:white', style_dump, document);
            addRule('#div_dump', 'color:black', style_dump, document);
            addRule('#div_dump', 'padding:15px', style_dump, document);

            style_dump = null;
        }

        var pre_dump = document.getElementById('pre_dump');
        if (!pre_dump)
        {
            pre_dump = document.createElement('pre');
            pre_dump.id = 'pre_dump';
            pre_dump.innerHTML = out+"\n";
            div_dump.appendChild(pre_dump);
            document.body.appendChild(div_dump);
        }  
        else
        {
            pre_dump.innerHTML += out+"\n";
        }
    }
    else
    {
        return out;
    }
}

function addLog(str) {
    /*
    var log = document.getElementById('log');
    if (!log)
    {
        plog = document.createElement('p');
        plog.innerHTML = str; 
        log.appendChild(plog);
    }
    */
   var p = "<p>" + str + "</p>";
   $("#log").append(p);
 }