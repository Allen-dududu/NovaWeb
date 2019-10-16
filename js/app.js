!function t(e, n, i) {
    function r(a, o) {
        if (!n[a]) {
            if (!e[a]) {
                var u = "function" == typeof require && require;
                if (!o && u) return u(a, !0);
                if (s) return s(a, !0);
                var l = new Error("Cannot find module '" + a + "'");
                throw l.code = "MODULE_NOT_FOUND", l
            }
            var c = n[a] = {exports: {}};
            e[a][0].call(c.exports, function (t) {
                var n = e[a][1][t];
                return r(n ? n : t)
            }, c, c.exports, t, e, n, i)
        }
        return n[a].exports
    }

    for (var s = "function" == typeof require && require, a = 0; a < i.length; a++) r(i[a]);
    return r
}({
    1: [function (t, e, n) {
        (function (t) {
            var i = this.createjs = this.createjs || {};
            this.createjs = this.createjs || {}, i.extend = function (t, e) {
                "use strict";

                function n() {
                    this.constructor = t
                }

                return n.prototype = e.prototype, t.prototype = new n
            }, this.createjs = this.createjs || {}, i.promote = function (t, e) {
                "use strict";
                var n = t.prototype, i = Object.getPrototypeOf && Object.getPrototypeOf(n) || n.__proto__;
                if (i) {
                    n[(e += "_") + "constructor"] = i.constructor;
                    for (var r in i) n.hasOwnProperty(r) && "function" == typeof i[r] && (n[e + r] = i[r])
                }
                return t
            }, this.createjs = this.createjs || {}, i.indexOf = function (t, e) {
                "use strict";
                for (var n = 0, i = t.length; n < i; n++) if (e === t[n]) return n;
                return -1
            }, this.createjs = this.createjs || {}, function () {
                "use strict";

                function t(t, e, n) {
                    this.type = t, this.target = null, this.currentTarget = null, this.eventPhase = 0, this.bubbles = !!e, this.cancelable = !!n, this.timeStamp = (new Date).getTime(), this.defaultPrevented = !1, this.propagationStopped = !1, this.immediatePropagationStopped = !1, this.removed = !1
                }

                var e = t.prototype;
                e.preventDefault = function () {
                    this.defaultPrevented = this.cancelable && !0
                }, e.stopPropagation = function () {
                    this.propagationStopped = !0
                }, e.stopImmediatePropagation = function () {
                    this.immediatePropagationStopped = this.propagationStopped = !0
                }, e.remove = function () {
                    this.removed = !0
                }, e.clone = function () {
                    return new t(this.type, this.bubbles, this.cancelable)
                }, e.set = function (t) {
                    for (var e in t) this[e] = t[e];
                    return this
                }, e.toString = function () {
                    return "[Event (type=" + this.type + ")]"
                }, i.Event = t
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t() {
                    this._listeners = null, this._captureListeners = null
                }

                var e = t.prototype;
                t.initialize = function (t) {
                    t.addEventListener = e.addEventListener, t.on = e.on, t.removeEventListener = t.off = e.removeEventListener, t.removeAllEventListeners = e.removeAllEventListeners, t.hasEventListener = e.hasEventListener, t.dispatchEvent = e.dispatchEvent, t._dispatchEvent = e._dispatchEvent, t.willTrigger = e.willTrigger
                }, e.addEventListener = function (t, e, n) {
                    var i;
                    i = n ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
                    var r = i[t];
                    return r && this.removeEventListener(t, e, n), r = i[t], r ? r.push(e) : i[t] = [e], e
                }, e.on = function (t, e, n, i, r, s) {
                    return e.handleEvent && (n = n || e, e = e.handleEvent), n = n || this, this.addEventListener(t, function (t) {
                        e.call(n, t, r), i && t.remove()
                    }, s)
                }, e.removeEventListener = function (t, e, n) {
                    var i = n ? this._captureListeners : this._listeners;
                    if (i) {
                        var r = i[t];
                        if (r) for (var s = 0, a = r.length; s < a; s++) if (r[s] == e) {
                            1 == a ? delete i[t] : r.splice(s, 1);
                            break
                        }
                    }
                }, e.off = e.removeEventListener, e.removeAllEventListeners = function (t) {
                    t ? (this._listeners && delete this._listeners[t], this._captureListeners && delete this._captureListeners[t]) : this._listeners = this._captureListeners = null
                }, e.dispatchEvent = function (t, e, n) {
                    if ("string" == typeof t) {
                        var r = this._listeners;
                        if (!(e || r && r[t])) return !0;
                        t = new i.Event(t, e, n)
                    } else t.target && t.clone && (t = t.clone());
                    try {
                        t.target = this
                    } catch (t) {
                    }
                    if (t.bubbles && this.parent) {
                        for (var s = this, a = [s]; s.parent;) a.push(s = s.parent);
                        var o, u = a.length;
                        for (o = u - 1; o >= 0 && !t.propagationStopped; o--) a[o]._dispatchEvent(t, 1 + (0 == o));
                        for (o = 1; o < u && !t.propagationStopped; o++) a[o]._dispatchEvent(t, 3)
                    } else this._dispatchEvent(t, 2);
                    return !t.defaultPrevented
                }, e.hasEventListener = function (t) {
                    var e = this._listeners, n = this._captureListeners;
                    return !!(e && e[t] || n && n[t])
                }, e.willTrigger = function (t) {
                    for (var e = this; e;) {
                        if (e.hasEventListener(t)) return !0;
                        e = e.parent
                    }
                    return !1
                }, e.toString = function () {
                    return "[EventDispatcher]"
                }, e._dispatchEvent = function (t, e) {
                    var n, i = 1 == e ? this._captureListeners : this._listeners;
                    if (t && i) {
                        var r = i[t.type];
                        if (!r || !(n = r.length)) return;
                        try {
                            t.currentTarget = this
                        } catch (t) {
                        }
                        try {
                            t.eventPhase = e
                        } catch (t) {
                        }
                        t.removed = !1, r = r.slice();
                        for (var s = 0; s < n && !t.immediatePropagationStopped; s++) {
                            var a = r[s];
                            a.handleEvent ? a.handleEvent(t) : a(t), t.removed && (this.off(t.type, a, 1 == e), t.removed = !1)
                        }
                    }
                }, i.EventDispatcher = t
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t() {
                    throw"Ticker cannot be instantiated."
                }

                t.RAF_SYNCHED = "synched", t.RAF = "raf", t.TIMEOUT = "timeout", t.useRAF = !1, t.timingMode = null, t.maxDelta = 0, t.paused = !1, t.removeEventListener = null, t.removeAllEventListeners = null, t.dispatchEvent = null, t.hasEventListener = null, t._listeners = null, i.EventDispatcher.initialize(t), t._addEventListener = t.addEventListener, t.addEventListener = function () {
                    return !t._inited && t.init(), t._addEventListener.apply(t, arguments)
                }, t._inited = !1, t._startTime = 0, t._pausedTime = 0, t._ticks = 0, t._pausedTicks = 0, t._interval = 50, t._lastTime = 0, t._times = null, t._tickTimes = null, t._timerId = null, t._raf = !0, t.setInterval = function (e) {
                    t._interval = e, t._inited && t._setupTick()
                }, t.getInterval = function () {
                    return t._interval
                }, t.setFPS = function (e) {
                    t.setInterval(1e3 / e)
                }, t.getFPS = function () {
                    return 1e3 / t._interval
                };
                try {
                    Object.defineProperties(t, {
                        interval: {get: t.getInterval, set: t.setInterval},
                        framerate: {get: t.getFPS, set: t.setFPS}
                    })
                } catch (t) {
                    console.log(t)
                }
                t.init = function () {
                    t._inited || (t._inited = !0, t._times = [], t._tickTimes = [], t._startTime = t._getTime(), t._times.push(t._lastTime = 0), t.interval = t._interval)
                }, t.reset = function () {
                    if (t._raf) {
                        var e = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
                        e && e(t._timerId)
                    } else clearTimeout(t._timerId);
                    t.removeAllEventListeners("tick"), t._timerId = t._times = t._tickTimes = null, t._startTime = t._lastTime = t._ticks = 0, t._inited = !1
                }, t.getMeasuredTickTime = function (e) {
                    var n = 0, i = t._tickTimes;
                    if (!i || i.length < 1) return -1;
                    e = Math.min(i.length, e || 0 | t.getFPS());
                    for (var r = 0; r < e; r++) n += i[r];
                    return n / e
                }, t.getMeasuredFPS = function (e) {
                    var n = t._times;
                    return !n || n.length < 2 ? -1 : (e = Math.min(n.length - 1, e || 0 | t.getFPS()), 1e3 / ((n[0] - n[e]) / e))
                }, t.setPaused = function (e) {
                    t.paused = e
                }, t.getPaused = function () {
                    return t.paused
                }, t.getTime = function (e) {
                    return t._startTime ? t._getTime() - (e ? t._pausedTime : 0) : -1
                }, t.getEventTime = function (e) {
                    return t._startTime ? (t._lastTime || t._startTime) - (e ? t._pausedTime : 0) : -1
                }, t.getTicks = function (e) {
                    return t._ticks - (e ? t._pausedTicks : 0)
                }, t._handleSynch = function () {
                    t._timerId = null, t._setupTick(), t._getTime() - t._lastTime >= .97 * (t._interval - 1) && t._tick()
                }, t._handleRAF = function () {
                    t._timerId = null, t._setupTick(), t._tick()
                }, t._handleTimeout = function () {
                    t._timerId = null, t._setupTick(), t._tick()
                }, t._setupTick = function () {
                    if (null == t._timerId) {
                        var e = t.timingMode || t.useRAF && t.RAF_SYNCHED;
                        if (e == t.RAF_SYNCHED || e == t.RAF) {
                            var n = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
                            if (n) return t._timerId = n(e == t.RAF ? t._handleRAF : t._handleSynch), void(t._raf = !0)
                        }
                        t._raf = !1, t._timerId = setTimeout(t._handleTimeout, t._interval)
                    }
                }, t._tick = function () {
                    var e = t.paused, n = t._getTime(), r = n - t._lastTime;
                    if (t._lastTime = n, t._ticks++, e && (t._pausedTicks++, t._pausedTime += r), t.hasEventListener("tick")) {
                        var s = new i.Event("tick"), a = t.maxDelta;
                        s.delta = a && r > a ? a : r, s.paused = e, s.time = n, s.runTime = n - t._pausedTime, t.dispatchEvent(s)
                    }
                    for (t._tickTimes.unshift(t._getTime() - n); t._tickTimes.length > 100;) t._tickTimes.pop();
                    for (t._times.unshift(n); t._times.length > 100;) t._times.pop()
                };
                var e = window.performance && (performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow);
                t._getTime = function () {
                    return (e && e.call(performance) || (new Date).getTime()) - t._startTime
                }, i.Ticker = t
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t() {
                    throw"UID cannot be instantiated"
                }

                t._nextID = 0, t.get = function () {
                    return t._nextID++
                }, i.UID = t
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t(t, e, n, i, r, s, a, o, u, l, c) {
                    this.Event_constructor(t, e, n), this.stageX = i, this.stageY = r, this.rawX = null == u ? i : u, this.rawY = null == l ? r : l, this.nativeEvent = s, this.pointerID = a, this.primary = !!o, this.relatedTarget = c
                }

                var e = i.extend(t, i.Event);
                e._get_localX = function () {
                    return this.currentTarget.globalToLocal(this.rawX, this.rawY).x
                }, e._get_localY = function () {
                    return this.currentTarget.globalToLocal(this.rawX, this.rawY).y
                }, e._get_isTouch = function () {
                    return this.pointerID !== -1
                };
                try {
                    Object.defineProperties(e, {
                        localX: {get: e._get_localX},
                        localY: {get: e._get_localY},
                        isTouch: {get: e._get_isTouch}
                    })
                } catch (t) {
                }
                e.clone = function () {
                    return new t(this.type, this.bubbles, this.cancelable, this.stageX, this.stageY, this.nativeEvent, this.pointerID, this.primary, this.rawX, this.rawY)
                }, e.toString = function () {
                    return "[MouseEvent (type=" + this.type + " stageX=" + this.stageX + " stageY=" + this.stageY + ")]"
                }, i.MouseEvent = i.promote(t, "Event")
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t(t, e, n, i, r, s) {
                    this.setValues(t, e, n, i, r, s)
                }

                var e = t.prototype;
                t.DEG_TO_RAD = Math.PI / 180, t.identity = null, e.setValues = function (t, e, n, i, r, s) {
                    return this.a = null == t ? 1 : t, this.b = e || 0, this.c = n || 0, this.d = null == i ? 1 : i, this.tx = r || 0, this.ty = s || 0, this
                }, e.append = function (t, e, n, i, r, s) {
                    var a = this.a, o = this.b, u = this.c, l = this.d;
                    return 1 == t && 0 == e && 0 == n && 1 == i || (this.a = a * t + u * e, this.b = o * t + l * e, this.c = a * n + u * i, this.d = o * n + l * i), this.tx = a * r + u * s + this.tx, this.ty = o * r + l * s + this.ty, this
                }, e.prepend = function (t, e, n, i, r, s) {
                    var a = this.a, o = this.c, u = this.tx;
                    return this.a = t * a + n * this.b, this.b = e * a + i * this.b, this.c = t * o + n * this.d, this.d = e * o + i * this.d, this.tx = t * u + n * this.ty + r, this.ty = e * u + i * this.ty + s, this
                }, e.appendMatrix = function (t) {
                    return this.append(t.a, t.b, t.c, t.d, t.tx, t.ty)
                }, e.prependMatrix = function (t) {
                    return this.prepend(t.a, t.b, t.c, t.d, t.tx, t.ty)
                }, e.appendTransform = function (e, n, i, r, s, a, o, u, l) {
                    if (s % 360) var c = s * t.DEG_TO_RAD, h = Math.cos(c), d = Math.sin(c); else h = 1, d = 0;
                    return a || o ? (a *= t.DEG_TO_RAD, o *= t.DEG_TO_RAD, this.append(Math.cos(o), Math.sin(o), -Math.sin(a), Math.cos(a), e, n), this.append(h * i, d * i, -d * r, h * r, 0, 0)) : this.append(h * i, d * i, -d * r, h * r, e, n), (u || l) && (this.tx -= u * this.a + l * this.c, this.ty -= u * this.b + l * this.d), this
                }, e.prependTransform = function (e, n, i, r, s, a, o, u, l) {
                    if (s % 360) var c = s * t.DEG_TO_RAD, h = Math.cos(c), d = Math.sin(c); else h = 1, d = 0;
                    return (u || l) && (this.tx -= u, this.ty -= l), a || o ? (a *= t.DEG_TO_RAD, o *= t.DEG_TO_RAD, this.prepend(h * i, d * i, -d * r, h * r, 0, 0), this.prepend(Math.cos(o), Math.sin(o), -Math.sin(a), Math.cos(a), e, n)) : this.prepend(h * i, d * i, -d * r, h * r, e, n), this
                }, e.rotate = function (e) {
                    e *= t.DEG_TO_RAD;
                    var n = Math.cos(e), i = Math.sin(e), r = this.a, s = this.b;
                    return this.a = r * n + this.c * i, this.b = s * n + this.d * i, this.c = -r * i + this.c * n, this.d = -s * i + this.d * n, this
                }, e.skew = function (e, n) {
                    return e *= t.DEG_TO_RAD, n *= t.DEG_TO_RAD, this.append(Math.cos(n), Math.sin(n), -Math.sin(e), Math.cos(e), 0, 0), this
                }, e.scale = function (t, e) {
                    return this.a *= t, this.b *= t, this.c *= e, this.d *= e, this
                }, e.translate = function (t, e) {
                    return this.tx += this.a * t + this.c * e, this.ty += this.b * t + this.d * e, this
                }, e.identity = function () {
                    return this.a = this.d = 1, this.b = this.c = this.tx = this.ty = 0, this
                }, e.invert = function () {
                    var t = this.a, e = this.b, n = this.c, i = this.d, r = this.tx, s = t * i - e * n;
                    return this.a = i / s, this.b = -e / s, this.c = -n / s, this.d = t / s, this.tx = (n * this.ty - i * r) / s, this.ty = -(t * this.ty - e * r) / s, this
                }, e.isIdentity = function () {
                    return 0 === this.tx && 0 === this.ty && 1 === this.a && 0 === this.b && 0 === this.c && 1 === this.d
                }, e.equals = function (t) {
                    return this.tx === t.tx && this.ty === t.ty && this.a === t.a && this.b === t.b && this.c === t.c && this.d === t.d
                }, e.transformPoint = function (t, e, n) {
                    return n = n || {}, n.x = t * this.a + e * this.c + this.tx, n.y = t * this.b + e * this.d + this.ty, n
                }, e.decompose = function (e) {
                    null == e && (e = {}), e.x = this.tx, e.y = this.ty, e.scaleX = Math.sqrt(this.a * this.a + this.b * this.b), e.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);
                    var n = Math.atan2(-this.c, this.d), i = Math.atan2(this.b, this.a), r = Math.abs(1 - n / i);
                    return r < 1e-5 ? (e.rotation = i / t.DEG_TO_RAD, this.a < 0 && this.d >= 0 && (e.rotation += e.rotation <= 0 ? 180 : -180), e.skewX = e.skewY = 0) : (e.skewX = n / t.DEG_TO_RAD, e.skewY = i / t.DEG_TO_RAD), e
                }, e.copy = function (t) {
                    return this.setValues(t.a, t.b, t.c, t.d, t.tx, t.ty)
                }, e.clone = function () {
                    return new t(this.a, this.b, this.c, this.d, this.tx, this.ty)
                }, e.toString = function () {
                    return "[Matrix2D (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")]"
                }, t.identity = new t, i.Matrix2D = t
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t(t, e, n, i, r) {
                    this.setValues(t, e, n, i, r)
                }

                var e = t.prototype;
                e.setValues = function (t, e, n, r, s) {
                    return this.visible = null == t || !!t, this.alpha = null == e ? 1 : e, this.shadow = n, this.compositeOperation = n, this.matrix = s || this.matrix && this.matrix.identity() || new i.Matrix2D, this
                }, e.append = function (t, e, n, i, r) {
                    return this.alpha *= e, this.shadow = n || this.shadow, this.compositeOperation = i || this.compositeOperation, this.visible = this.visible && t, r && this.matrix.appendMatrix(r), this
                }, e.prepend = function (t, e, n, i, r) {
                    return this.alpha *= e, this.shadow = this.shadow || n, this.compositeOperation = this.compositeOperation || i, this.visible = this.visible && t, r && this.matrix.prependMatrix(r), this
                }, e.identity = function () {
                    return this.visible = !0, this.alpha = 1, this.shadow = this.compositeOperation = null, this.matrix.identity(), this
                }, e.clone = function () {
                    return new t(this.alpha, this.shadow, this.compositeOperation, this.visible, this.matrix.clone())
                }, i.DisplayProps = t
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t(t, e) {
                    this.setValues(t, e)
                }

                var e = t.prototype;
                e.setValues = function (t, e) {
                    return this.x = t || 0, this.y = e || 0, this
                }, e.copy = function (t) {
                    return this.x = t.x, this.y = t.y, this
                }, e.clone = function () {
                    return new t(this.x, this.y)
                }, e.toString = function () {
                    return "[Point (x=" + this.x + " y=" + this.y + ")]"
                }, i.Point = t
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t(t, e, n, i) {
                    this.setValues(t, e, n, i)
                }

                var e = t.prototype;
                e.setValues = function (t, e, n, i) {
                    return this.x = t || 0, this.y = e || 0, this.width = n || 0, this.height = i || 0, this
                }, e.extend = function (t, e, n, i) {
                    return n = n || 0, i = i || 0, t + n > this.x + this.width && (this.width = t + n - this.x), e + i > this.y + this.height && (this.height = e + i - this.y), t < this.x && (this.width += this.x - t, this.x = t), e < this.y && (this.height += this.y - e, this.y = e), this
                }, e.pad = function (t, e, n, i) {
                    return this.x -= e, this.y -= t, this.width += e + i, this.height += t + n, this
                }, e.copy = function (t) {
                    return this.setValues(t.x, t.y, t.width, t.height)
                }, e.contains = function (t, e, n, i) {
                    return n = n || 0, i = i || 0, t >= this.x && t + n <= this.x + this.width && e >= this.y && e + i <= this.y + this.height
                }, e.union = function (t) {
                    return this.clone().extend(t.x, t.y, t.width, t.height)
                }, e.intersection = function (e) {
                    var n = e.x, i = e.y, r = n + e.width, s = i + e.height;
                    return this.x > n && (n = this.x), this.y > i && (i = this.y), this.x + this.width < r && (r = this.x + this.width), this.y + this.height < s && (s = this.y + this.height), r <= n || s <= i ? null : new t(n, i, r - n, s - i)
                }, e.intersects = function (t) {
                    return t.x <= this.x + this.width && this.x <= t.x + t.width && t.y <= this.y + this.height && this.y <= t.y + t.height
                }, e.isEmpty = function () {
                    return this.width <= 0 || this.height <= 0
                }, e.clone = function () {
                    return new t(this.x, this.y, this.width, this.height)
                }, e.toString = function () {
                    return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]"
                }, i.Rectangle = t
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t(t, e, n, i, r, s, a) {
                    t.addEventListener && (this.target = t, this.overLabel = null == n ? "over" : n, this.outLabel = null == e ? "out" : e, this.downLabel = null == i ? "down" : i, this.play = r, this._isPressed = !1, this._isOver = !1, this._enabled = !1, t.mouseChildren = !1, this.enabled = !0, this.handleEvent({}), s && (a && (s.actionsEnabled = !1, s.gotoAndStop && s.gotoAndStop(a)), t.hitArea = s))
                }

                var e = t.prototype;
                e.setEnabled = function (t) {
                    if (t != this._enabled) {
                        var e = this.target;
                        this._enabled = t, t ? (e.cursor = "pointer", e.addEventListener("rollover", this), e.addEventListener("rollout", this), e.addEventListener("mousedown", this), e.addEventListener("pressup", this), e._reset && (e.__reset = e._reset, e._reset = this._reset)) : (e.cursor = null, e.removeEventListener("rollover", this), e.removeEventListener("rollout", this), e.removeEventListener("mousedown", this), e.removeEventListener("pressup", this), e.__reset && (e._reset = e.__reset, delete e.__reset))
                    }
                }, e.getEnabled = function () {
                    return this._enabled
                };
                try {
                    Object.defineProperties(e, {enabled: {get: e.getEnabled, set: e.setEnabled}})
                } catch (t) {
                }
                e.toString = function () {
                    return "[ButtonHelper]"
                }, e.handleEvent = function (t) {
                    var e, n = this.target, i = t.type;
                    "mousedown" == i ? (this._isPressed = !0, e = this.downLabel) : "pressup" == i ? (this._isPressed = !1, e = this._isOver ? this.overLabel : this.outLabel) : "rollover" == i ? (this._isOver = !0, e = this._isPressed ? this.downLabel : this.overLabel) : (this._isOver = !1, e = this._isPressed ? this.overLabel : this.outLabel), this.play ? n.gotoAndPlay && n.gotoAndPlay(e) : n.gotoAndStop && n.gotoAndStop(e)
                }, e._reset = function () {
                    var t = this.paused;
                    this.__reset(), this.paused = t
                }, i.ButtonHelper = t
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t(t, e, n, i) {
                    this.color = t || "black", this.offsetX = e || 0, this.offsetY = n || 0, this.blur = i || 0
                }

                var e = t.prototype;
                t.identity = new t("transparent", 0, 0, 0), e.toString = function () {
                    return "[Shadow]"
                }, e.clone = function () {
                    return new t(this.color, this.offsetX, this.offsetY, this.blur)
                }, i.Shadow = t
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t(t) {
                    this.EventDispatcher_constructor(), this.complete = !0, this.framerate = 0, this._animations = null, this._frames = null, this._images = null, this._data = null, this._loadCount = 0, this._frameHeight = 0, this._frameWidth = 0, this._numFrames = 0, this._regX = 0, this._regY = 0, this._spacing = 0, this._margin = 0, this._parseData(t)
                }

                var e = i.extend(t, i.EventDispatcher);
                e.getAnimations = function () {
                    return this._animations.slice()
                };
                try {
                    Object.defineProperties(e, {animations: {get: e.getAnimations}})
                } catch (t) {
                }
                e.getNumFrames = function (t) {
                    if (null == t) return this._frames ? this._frames.length : this._numFrames || 0;
                    var e = this._data[t];
                    return null == e ? 0 : e.frames.length
                }, e.getAnimation = function (t) {
                    return this._data[t]
                }, e.getFrame = function (t) {
                    var e;
                    return this._frames && (e = this._frames[t]) ? e : null
                }, e.getFrameBounds = function (t, e) {
                    var n = this.getFrame(t);
                    return n ? (e || new i.Rectangle).setValues(-n.regX, -n.regY, n.rect.width, n.rect.height) : null
                }, e.toString = function () {
                    return "[SpriteSheet]"
                }, e.clone = function () {
                    throw"SpriteSheet cannot be cloned."
                }, e._parseData = function (t) {
                    var e, n, r, s;
                    if (null != t) {
                        if (this.framerate = t.framerate || 0, t.images && (n = t.images.length) > 0) for (s = this._images = [], e = 0; e < n; e++) {
                            var a = t.images[e];
                            if ("string" == typeof a) {
                                var o = a;
                                a = document.createElement("img"), a.src = o
                            }
                            s.push(a), a.getContext || a.naturalWidth || (this._loadCount++, this.complete = !1, function (t) {
                                a.onload = function () {
                                    t._handleImageLoad()
                                }
                            }(this))
                        }
                        if (null == t.frames) ; else if (t.frames instanceof Array) for (this._frames = [], s = t.frames, e = 0, n = s.length; e < n; e++) {
                            var u = s[e];
                            this._frames.push({
                                image: this._images[u[4] ? u[4] : 0],
                                rect: new i.Rectangle(u[0], u[1], u[2], u[3]),
                                regX: u[5] || 0,
                                regY: u[6] || 0
                            })
                        } else r = t.frames, this._frameWidth = r.width, this._frameHeight = r.height, this._regX = r.regX || 0, this._regY = r.regY || 0, this._spacing = r.spacing || 0, this._margin = r.margin || 0, this._numFrames = r.count, 0 == this._loadCount && this._calculateFrames();
                        if (this._animations = [], null != (r = t.animations)) {
                            this._data = {};
                            var l;
                            for (l in r) {
                                var c = {name: l}, h = r[l];
                                if ("number" == typeof h) s = c.frames = [h]; else if (h instanceof Array) if (1 == h.length) c.frames = [h[0]]; else for (c.speed = h[3], c.next = h[2], s = c.frames = [], e = h[0]; e <= h[1]; e++) s.push(e); else {
                                    c.speed = h.speed, c.next = h.next;
                                    var d = h.frames;
                                    s = c.frames = "number" == typeof d ? [d] : d.slice(0)
                                }
                                c.next !== !0 && void 0 !== c.next || (c.next = l), (c.next === !1 || s.length < 2 && c.next == l) && (c.next = null), c.speed || (c.speed = 1), this._animations.push(l), this._data[l] = c
                            }
                        }
                    }
                }, e._handleImageLoad = function () {
                    0 == --this._loadCount && (this._calculateFrames(), this.complete = !0, this.dispatchEvent("complete"))
                }, e._calculateFrames = function () {
                    if (!this._frames && 0 != this._frameWidth) {
                        this._frames = [];
                        var t = this._numFrames || 1e5, e = 0, n = this._frameWidth, r = this._frameHeight,
                            s = this._spacing, a = this._margin;
                        t:for (var o = 0, u = this._images; o < u.length; o++) for (var l = u[o], c = l.width, h = l.height, d = a; d <= h - a - r;) {
                            for (var f = a; f <= c - a - n;) {
                                if (e >= t) break t;
                                e++, this._frames.push({
                                    image: l,
                                    rect: new i.Rectangle(f, d, n, r),
                                    regX: this._regX,
                                    regY: this._regY
                                }), f += n + s
                            }
                            d += r + s
                        }
                        this._numFrames = e
                    }
                }, i.SpriteSheet = i.promote(t, "EventDispatcher")
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t() {
                    this.command = null, this._stroke = null, this._strokeStyle = null, this._oldStrokeStyle = null, this._strokeDash = null, this._oldStrokeDash = null, this._strokeIgnoreScale = !1, this._fill = null, this._instructions = [], this._commitIndex = 0, this._activeInstructions = [], this._dirty = !1, this._storeIndex = 0, this.clear()
                }

                var e = t.prototype, n = t;
                t.getRGB = function (t, e, n, i) {
                    return null != t && null == n && (i = e, n = 255 & t, e = t >> 8 & 255, t = t >> 16 & 255), null == i ? "rgb(" + t + "," + e + "," + n + ")" : "rgba(" + t + "," + e + "," + n + "," + i + ")"
                }, t.getHSL = function (t, e, n, i) {
                    return null == i ? "hsl(" + t % 360 + "," + e + "%," + n + "%)" : "hsla(" + t % 360 + "," + e + "%," + n + "%," + i + ")"
                }, t.BASE_64 = {
                    A: 0,
                    B: 1,
                    C: 2,
                    D: 3,
                    E: 4,
                    F: 5,
                    G: 6,
                    H: 7,
                    I: 8,
                    J: 9,
                    K: 10,
                    L: 11,
                    M: 12,
                    N: 13,
                    O: 14,
                    P: 15,
                    Q: 16,
                    R: 17,
                    S: 18,
                    T: 19,
                    U: 20,
                    V: 21,
                    W: 22,
                    X: 23,
                    Y: 24,
                    Z: 25,
                    a: 26,
                    b: 27,
                    c: 28,
                    d: 29,
                    e: 30,
                    f: 31,
                    g: 32,
                    h: 33,
                    i: 34,
                    j: 35,
                    k: 36,
                    l: 37,
                    m: 38,
                    n: 39,
                    o: 40,
                    p: 41,
                    q: 42,
                    r: 43,
                    s: 44,
                    t: 45,
                    u: 46,
                    v: 47,
                    w: 48,
                    x: 49,
                    y: 50,
                    z: 51,
                    0: 52,
                    1: 53,
                    2: 54,
                    3: 55,
                    4: 56,
                    5: 57,
                    6: 58,
                    7: 59,
                    8: 60,
                    9: 61,
                    "+": 62,
                    "/": 63
                }, t.STROKE_CAPS_MAP = ["butt", "round", "square"], t.STROKE_JOINTS_MAP = ["miter", "round", "bevel"];
                var r = i.createCanvas ? i.createCanvas() : document.createElement("canvas");
                r.getContext && (t._ctx = r.getContext("2d"), r.width = r.height = 1), e.getInstructions = function () {
                    return this._updateInstructions(), this._instructions
                };
                try {
                    Object.defineProperties(e, {instructions: {get: e.getInstructions}})
                } catch (t) {
                }
                e.isEmpty = function () {
                    return !(this._instructions.length || this._activeInstructions.length)
                }, e.draw = function (t, e) {
                    this._updateInstructions();
                    for (var n = this._instructions, i = this._storeIndex, r = n.length; i < r; i++) n[i].exec(t, e)
                }, e.drawAsPath = function (t) {
                    this._updateInstructions();
                    for (var e, n = this._instructions, i = this._storeIndex, r = n.length; i < r; i++) (e = n[i]).path !== !1 && e.exec(t)
                }, e.moveTo = function (t, e) {
                    return this.append(new n.MoveTo(t, e), !0)
                }, e.lineTo = function (t, e) {
                    return this.append(new n.LineTo(t, e))
                }, e.arcTo = function (t, e, i, r, s) {
                    return this.append(new n.ArcTo(t, e, i, r, s))
                }, e.arc = function (t, e, i, r, s, a) {
                    return this.append(new n.Arc(t, e, i, r, s, a))
                }, e.quadraticCurveTo = function (t, e, i, r) {
                    return this.append(new n.QuadraticCurveTo(t, e, i, r))
                }, e.bezierCurveTo = function (t, e, i, r, s, a) {
                    return this.append(new n.BezierCurveTo(t, e, i, r, s, a))
                }, e.rect = function (t, e, i, r) {
                    return this.append(new n.Rect(t, e, i, r))
                }, e.closePath = function () {
                    return this._activeInstructions.length ? this.append(new n.ClosePath) : this
                }, e.clear = function () {
                    return this._instructions.length = this._activeInstructions.length = this._commitIndex = 0, this._strokeStyle = this._oldStrokeStyle = this._stroke = this._fill = this._strokeDash = this._oldStrokeDash = null, this._dirty = this._strokeIgnoreScale = !1, this
                }, e.beginFill = function (t) {
                    return this._setFill(t ? new n.Fill(t) : null)
                }, e.beginLinearGradientFill = function (t, e, i, r, s, a) {
                    return this._setFill((new n.Fill).linearGradient(t, e, i, r, s, a))
                }, e.beginRadialGradientFill = function (t, e, i, r, s, a, o, u) {
                    return this._setFill((new n.Fill).radialGradient(t, e, i, r, s, a, o, u))
                }, e.beginBitmapFill = function (t, e, i) {
                    return this._setFill(new n.Fill(null, i).bitmap(t, e))
                }, e.endFill = function () {
                    return this.beginFill()
                }, e.setStrokeStyle = function (t, e, i, r, s) {
                    return this._updateInstructions(!0), this._strokeStyle = this.command = new n.StrokeStyle(t, e, i, r, s), this._stroke && (this._stroke.ignoreScale = s), this._strokeIgnoreScale = s, this
                }, e.setStrokeDash = function (t, e) {
                    return this._updateInstructions(!0), this._strokeDash = this.command = new n.StrokeDash(t, e), this
                }, e.beginStroke = function (t) {
                    return this._setStroke(t ? new n.Stroke(t) : null)
                }, e.beginLinearGradientStroke = function (t, e, i, r, s, a) {
                    return this._setStroke((new n.Stroke).linearGradient(t, e, i, r, s, a))
                }, e.beginRadialGradientStroke = function (t, e, i, r, s, a, o, u) {
                    return this._setStroke((new n.Stroke).radialGradient(t, e, i, r, s, a, o, u))
                }, e.beginBitmapStroke = function (t, e) {
                    return this._setStroke((new n.Stroke).bitmap(t, e))
                }, e.endStroke = function () {
                    return this.beginStroke()
                }, e.curveTo = e.quadraticCurveTo, e.drawRect = e.rect, e.drawRoundRect = function (t, e, n, i, r) {
                    return this.drawRoundRectComplex(t, e, n, i, r, r, r, r)
                }, e.drawRoundRectComplex = function (t, e, i, r, s, a, o, u) {
                    return this.append(new n.RoundRect(t, e, i, r, s, a, o, u))
                }, e.drawCircle = function (t, e, i) {
                    return this.append(new n.Circle(t, e, i))
                }, e.drawEllipse = function (t, e, i, r) {
                    return this.append(new n.Ellipse(t, e, i, r))
                }, e.drawPolyStar = function (t, e, i, r, s, a) {
                    return this.append(new n.PolyStar(t, e, i, r, s, a))
                }, e.append = function (t, e) {
                    return this._activeInstructions.push(t), this.command = t, e || (this._dirty = !0), this
                }, e.decodePath = function (e) {
                    for (var n = [this.moveTo, this.lineTo, this.quadraticCurveTo, this.bezierCurveTo, this.closePath], i = [2, 2, 4, 6, 0], r = 0, s = e.length, a = [], o = 0, u = 0, l = t.BASE_64; r < s;) {
                        var c = e.charAt(r), h = l[c], d = h >> 3, f = n[d];
                        if (!f || 3 & h) throw"bad path data (@" + r + "): " + c;
                        var p = i[d];
                        d || (o = u = 0), a.length = 0, r++;
                        for (var g = (h >> 2 & 1) + 2, v = 0; v < p; v++) {
                            var m = l[e.charAt(r)], _ = m >> 5 ? -1 : 1;
                            m = (31 & m) << 6 | l[e.charAt(r + 1)], 3 == g && (m = m << 6 | l[e.charAt(r + 2)]), m = _ * m / 10, v % 2 ? o = m += o : u = m += u, a[v] = m, r += g
                        }
                        f.apply(this, a)
                    }
                    return this
                }, e.store = function () {
                    return this._updateInstructions(!0), this._storeIndex = this._instructions.length, this
                }, e.unstore = function () {
                    return this._storeIndex = 0, this
                }, e.clone = function () {
                    var e = new t;
                    return e.command = this.command, e._stroke = this._stroke, e._strokeStyle = this._strokeStyle, e._strokeDash = this._strokeDash, e._strokeIgnoreScale = this._strokeIgnoreScale, e._fill = this._fill, e._instructions = this._instructions.slice(), e._commitIndex = this._commitIndex, e._activeInstructions = this._activeInstructions.slice(), e._dirty = this._dirty, e._storeIndex = this._storeIndex, e
                }, e.toString = function () {
                    return "[Graphics]"
                }, e.mt = e.moveTo, e.lt = e.lineTo, e.at = e.arcTo, e.bt = e.bezierCurveTo, e.qt = e.quadraticCurveTo, e.a = e.arc, e.r = e.rect, e.cp = e.closePath, e.c = e.clear, e.f = e.beginFill, e.lf = e.beginLinearGradientFill, e.rf = e.beginRadialGradientFill, e.bf = e.beginBitmapFill, e.ef = e.endFill, e.ss = e.setStrokeStyle, e.sd = e.setStrokeDash, e.s = e.beginStroke, e.ls = e.beginLinearGradientStroke, e.rs = e.beginRadialGradientStroke, e.bs = e.beginBitmapStroke, e.es = e.endStroke, e.dr = e.drawRect, e.rr = e.drawRoundRect, e.rc = e.drawRoundRectComplex, e.dc = e.drawCircle, e.de = e.drawEllipse, e.dp = e.drawPolyStar, e.p = e.decodePath, e._updateInstructions = function (e) {
                    var n = this._instructions, i = this._activeInstructions, r = this._commitIndex;
                    if (this._dirty && i.length) {
                        n.length = r, n.push(t.beginCmd);
                        var s = i.length, a = n.length;
                        n.length = a + s;
                        for (var o = 0; o < s; o++) n[o + a] = i[o];
                        this._fill && n.push(this._fill), this._stroke && (this._strokeDash !== this._oldStrokeDash && (this._oldStrokeDash = this._strokeDash, n.push(this._strokeDash)), this._strokeStyle !== this._oldStrokeStyle && (this._oldStrokeStyle = this._strokeStyle, n.push(this._strokeStyle)), n.push(this._stroke)), this._dirty = !1
                    }
                    e && (i.length = 0, this._commitIndex = n.length)
                }, e._setFill = function (t) {
                    return this._updateInstructions(!0), this.command = this._fill = t, this
                }, e._setStroke = function (t) {
                    return this._updateInstructions(!0), (this.command = this._stroke = t) && (t.ignoreScale = this._strokeIgnoreScale), this
                }, (n.LineTo = function (t, e) {
                    this.x = t, this.y = e
                }).prototype.exec = function (t) {
                    t.lineTo(this.x, this.y)
                }, (n.MoveTo = function (t, e) {
                    this.x = t, this.y = e
                }).prototype.exec = function (t) {
                    t.moveTo(this.x, this.y)
                }, (n.ArcTo = function (t, e, n, i, r) {
                    this.x1 = t, this.y1 = e, this.x2 = n, this.y2 = i, this.radius = r
                }).prototype.exec = function (t) {
                    t.arcTo(this.x1, this.y1, this.x2, this.y2, this.radius)
                }, (n.Arc = function (t, e, n, i, r, s) {
                    this.x = t, this.y = e, this.radius = n, this.startAngle = i, this.endAngle = r, this.anticlockwise = !!s
                }).prototype.exec = function (t) {
                    t.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise)
                }, (n.QuadraticCurveTo = function (t, e, n, i) {
                    this.cpx = t, this.cpy = e, this.x = n, this.y = i
                }).prototype.exec = function (t) {
                    t.quadraticCurveTo(this.cpx, this.cpy, this.x, this.y)
                }, (n.BezierCurveTo = function (t, e, n, i, r, s) {
                    this.cp1x = t, this.cp1y = e, this.cp2x = n, this.cp2y = i, this.x = r, this.y = s
                }).prototype.exec = function (t) {
                    t.bezierCurveTo(this.cp1x, this.cp1y, this.cp2x, this.cp2y, this.x, this.y)
                }, (n.Rect = function (t, e, n, i) {
                    this.x = t, this.y = e, this.w = n, this.h = i
                }).prototype.exec = function (t) {
                    t.rect(this.x, this.y, this.w, this.h)
                }, (n.ClosePath = function () {
                }).prototype.exec = function (t) {
                    t.closePath()
                }, (n.BeginPath = function () {
                }).prototype.exec = function (t) {
                    t.beginPath()
                }, e = (n.Fill = function (t, e) {
                    this.style = t, this.matrix = e
                }).prototype, e.exec = function (t) {
                    if (this.style) {
                        t.fillStyle = this.style;
                        var e = this.matrix;
                        e && (t.save(), t.transform(e.a, e.b, e.c, e.d, e.tx, e.ty)), t.fill(), e && t.restore()
                    }
                }, e.linearGradient = function (e, n, i, r, s, a) {
                    for (var o = this.style = t._ctx.createLinearGradient(i, r, s, a), u = 0, l = e.length; u < l; u++) o.addColorStop(n[u], e[u]);
                    return o.props = {colors: e, ratios: n, x0: i, y0: r, x1: s, y1: a, type: "linear"}, this
                }, e.radialGradient = function (e, n, i, r, s, a, o, u) {
                    for (var l = this.style = t._ctx.createRadialGradient(i, r, s, a, o, u), c = 0, h = e.length; c < h; c++) l.addColorStop(n[c], e[c]);
                    return l.props = {
                        colors: e,
                        ratios: n,
                        x0: i,
                        y0: r,
                        r0: s,
                        x1: a,
                        y1: o,
                        r1: u,
                        type: "radial"
                    }, this
                }, e.bitmap = function (e, n) {
                    if (e.naturalWidth || e.getContext || e.readyState >= 2) {
                        var i = this.style = t._ctx.createPattern(e, n || "");
                        i.props = {image: e, repetition: n, type: "bitmap"}
                    }
                    return this
                }, e.path = !1, e = (n.Stroke = function (t, e) {
                    this.style = t, this.ignoreScale = e
                }).prototype, e.exec = function (t) {
                    this.style && (t.strokeStyle = this.style, this.ignoreScale && (t.save(), t.setTransform(1, 0, 0, 1, 0, 0)), t.stroke(), this.ignoreScale && t.restore())
                }, e.linearGradient = n.Fill.prototype.linearGradient, e.radialGradient = n.Fill.prototype.radialGradient, e.bitmap = n.Fill.prototype.bitmap, e.path = !1, e = (n.StrokeStyle = function (t, e, n, i) {
                    this.width = t, this.caps = e, this.joints = n, this.miterLimit = i
                }).prototype, e.exec = function (e) {
                    e.lineWidth = null == this.width ? "1" : this.width, e.lineCap = null == this.caps ? "butt" : isNaN(this.caps) ? this.caps : t.STROKE_CAPS_MAP[this.caps], e.lineJoin = null == this.joints ? "miter" : isNaN(this.joints) ? this.joints : t.STROKE_JOINTS_MAP[this.joints], e.miterLimit = null == this.miterLimit ? "10" : this.miterLimit
                }, e.path = !1, (n.StrokeDash = function (t, e) {
                    this.segments = t, this.offset = e || 0
                }).prototype.exec = function (t) {
                    t.setLineDash && (t.setLineDash(this.segments || n.StrokeDash.EMPTY_SEGMENTS), t.lineDashOffset = this.offset || 0)
                }, n.StrokeDash.EMPTY_SEGMENTS = [], (n.RoundRect = function (t, e, n, i, r, s, a, o) {
                    this.x = t, this.y = e, this.w = n, this.h = i, this.radiusTL = r, this.radiusTR = s, this.radiusBR = a, this.radiusBL = o
                }).prototype.exec = function (t) {
                    var e = (u < l ? u : l) / 2, n = 0, i = 0, r = 0, s = 0, a = this.x, o = this.y, u = this.w,
                        l = this.h, c = this.radiusTL, h = this.radiusTR, d = this.radiusBR, f = this.radiusBL;
                    c < 0 && (c *= n = -1), c > e && (c = e), h < 0 && (h *= i = -1), h > e && (h = e), d < 0 && (d *= r = -1), d > e && (d = e), f < 0 && (f *= s = -1), f > e && (f = e), t.moveTo(a + u - h, o), t.arcTo(a + u + h * i, o - h * i, a + u, o + h, h), t.lineTo(a + u, o + l - d), t.arcTo(a + u + d * r, o + l + d * r, a + u - d, o + l, d), t.lineTo(a + f, o + l), t.arcTo(a - f * s, o + l + f * s, a, o + l - f, f), t.lineTo(a, o + c), t.arcTo(a - c * n, o - c * n, a + c, o, c), t.closePath()
                }, (n.Circle = function (t, e, n) {
                    this.x = t, this.y = e, this.radius = n
                }).prototype.exec = function (t) {
                    t.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
                }, (n.Ellipse = function (t, e, n, i) {
                    this.x = t, this.y = e, this.w = n, this.h = i
                }).prototype.exec = function (t) {
                    var e = this.x, n = this.y, i = this.w, r = this.h, s = .5522848, a = i / 2 * s, o = r / 2 * s,
                        u = e + i, l = n + r, c = e + i / 2, h = n + r / 2;
                    t.moveTo(e, h), t.bezierCurveTo(e, h - o, c - a, n, c, n), t.bezierCurveTo(c + a, n, u, h - o, u, h), t.bezierCurveTo(u, h + o, c + a, l, c, l), t.bezierCurveTo(c - a, l, e, h + o, e, h)
                }, (n.PolyStar = function (t, e, n, i, r, s) {
                    this.x = t, this.y = e, this.radius = n, this.sides = i, this.pointSize = r, this.angle = s
                }).prototype.exec = function (t) {
                    var e = this.x, n = this.y, i = this.radius, r = (this.angle || 0) / 180 * Math.PI, s = this.sides,
                        a = 1 - (this.pointSize || 0), o = Math.PI / s;
                    t.moveTo(e + Math.cos(r) * i, n + Math.sin(r) * i);
                    for (var u = 0; u < s; u++) r += o, 1 != a && t.lineTo(e + Math.cos(r) * i * a, n + Math.sin(r) * i * a), r += o, t.lineTo(e + Math.cos(r) * i, n + Math.sin(r) * i);
                    t.closePath()
                }, t.beginCmd = new n.BeginPath, i.Graphics = t
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t() {
                    this.EventDispatcher_constructor(), this.alpha = 1, this.cacheCanvas = null, this.cacheID = 0, this.id = i.UID.get(), this.mouseEnabled = !0, this.tickEnabled = !0, this.name = null, this.parent = null, this.regX = 0, this.regY = 0, this.rotation = 0, this.scaleX = 1, this.scaleY = 1, this.skewX = 0, this.skewY = 0, this.shadow = null, this.visible = !0, this.x = 0, this.y = 0, this.transformMatrix = null, this.compositeOperation = null, this.snapToPixel = !0, this.filters = null, this.mask = null,
                        this.hitArea = null, this.cursor = null, this._cacheOffsetX = 0, this._cacheOffsetY = 0, this._filterOffsetX = 0, this._filterOffsetY = 0, this._cacheScale = 1, this._cacheDataURLID = 0, this._cacheDataURL = null, this._props = new i.DisplayProps, this._rectangle = new i.Rectangle, this._bounds = null
                }

                var e = i.extend(t, i.EventDispatcher);
                t._MOUSE_EVENTS = ["click", "dblclick", "mousedown", "mouseout", "mouseover", "pressmove", "pressup", "rollout", "rollover"], t.suppressCrossDomainErrors = !1, t._snapToPixelEnabled = !1;
                var n = i.createCanvas ? i.createCanvas() : document.createElement("canvas");
                n.getContext && (t._hitTestCanvas = n, t._hitTestContext = n.getContext("2d"), n.width = n.height = 1), t._nextCacheID = 1, e.getStage = function () {
                    for (var t = this, e = i.Stage; t.parent;) t = t.parent;
                    return t instanceof e ? t : null
                };
                try {
                    Object.defineProperties(e, {stage: {get: e.getStage}})
                } catch (t) {
                }
                e.isVisible = function () {
                    return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY)
                }, e.draw = function (t, e) {
                    var n = this.cacheCanvas;
                    if (e || !n) return !1;
                    var i = this._cacheScale;
                    return t.drawImage(n, this._cacheOffsetX + this._filterOffsetX, this._cacheOffsetY + this._filterOffsetY, n.width / i, n.height / i), !0
                }, e.updateContext = function (e) {
                    var n = this, i = n.mask, r = n._props.matrix;
                    i && i.graphics && !i.graphics.isEmpty() && (i.getMatrix(r), e.transform(r.a, r.b, r.c, r.d, r.tx, r.ty), i.graphics.drawAsPath(e), e.clip(), r.invert(), e.transform(r.a, r.b, r.c, r.d, r.tx, r.ty)), this.getMatrix(r);
                    var s = r.tx, a = r.ty;
                    t._snapToPixelEnabled && n.snapToPixel && (s = s + (s < 0 ? -.5 : .5) | 0, a = a + (a < 0 ? -.5 : .5) | 0), e.transform(r.a, r.b, r.c, r.d, s, a), e.globalAlpha *= n.alpha, n.compositeOperation && (e.globalCompositeOperation = n.compositeOperation), n.shadow && this._applyShadow(e, n.shadow)
                }, e.cache = function (t, e, n, r, s) {
                    s = s || 1, this.cacheCanvas || (this.cacheCanvas = i.createCanvas ? i.createCanvas() : document.createElement("canvas")), this._cacheWidth = n, this._cacheHeight = r, this._cacheOffsetX = t, this._cacheOffsetY = e, this._cacheScale = s, this.updateCache()
                }, e.updateCache = function (e) {
                    var n = this.cacheCanvas;
                    if (!n) throw"cache() must be called before updateCache()";
                    var i = this._cacheScale, r = this._cacheOffsetX * i, s = this._cacheOffsetY * i,
                        a = this._cacheWidth, o = this._cacheHeight, u = n.getContext("2d"),
                        l = this._getFilterBounds();
                    r += this._filterOffsetX = l.x, s += this._filterOffsetY = l.y, a = Math.ceil(a * i) + l.width, o = Math.ceil(o * i) + l.height, a != n.width || o != n.height ? (n.width = a, n.height = o) : e || u.clearRect(0, 0, a + 1, o + 1), u.save(), u.globalCompositeOperation = e, u.setTransform(i, 0, 0, i, -r, -s), this.draw(u, !0), this._applyFilters(), u.restore(), this.cacheID = t._nextCacheID++
                }, e.uncache = function () {
                    this._cacheDataURL = this.cacheCanvas = null, this.cacheID = this._cacheOffsetX = this._cacheOffsetY = this._filterOffsetX = this._filterOffsetY = 0, this._cacheScale = 1
                }, e.getCacheDataURL = function () {
                    return this.cacheCanvas ? (this.cacheID != this._cacheDataURLID && (this._cacheDataURL = this.cacheCanvas.toDataURL()), this._cacheDataURL) : null
                }, e.localToGlobal = function (t, e, n) {
                    return this.getConcatenatedMatrix(this._props.matrix).transformPoint(t, e, n || new i.Point)
                }, e.globalToLocal = function (t, e, n) {
                    return this.getConcatenatedMatrix(this._props.matrix).invert().transformPoint(t, e, n || new i.Point)
                }, e.localToLocal = function (t, e, n, i) {
                    return i = this.localToGlobal(t, e, i), n.globalToLocal(i.x, i.y, i)
                }, e.setTransform = function (t, e, n, i, r, s, a, o, u) {
                    return this.x = t || 0, this.y = e || 0, this.scaleX = null == n ? 1 : n, this.scaleY = null == i ? 1 : i, this.rotation = r || 0, this.skewX = s || 0, this.skewY = a || 0, this.regX = o || 0, this.regY = u || 0, this
                }, e.getMatrix = function (t) {
                    var e = this, n = t && t.identity() || new i.Matrix2D;
                    return e.transformMatrix ? n.copy(e.transformMatrix) : n.appendTransform(e.x, e.y, e.scaleX, e.scaleY, e.rotation, e.skewX, e.skewY, e.regX, e.regY)
                }, e.getConcatenatedMatrix = function (t) {
                    for (var e = this, n = this.getMatrix(t); e = e.parent;) n.prependMatrix(e.getMatrix(e._props.matrix));
                    return n
                }, e.getConcatenatedDisplayProps = function (t) {
                    t = t ? t.identity() : new i.DisplayProps;
                    var e = this, n = e.getMatrix(t.matrix);
                    do t.prepend(e.visible, e.alpha, e.shadow, e.compositeOperation), e != this && n.prependMatrix(e.getMatrix(e._props.matrix)); while (e = e.parent);
                    return t
                }, e.hitTest = function (e, n) {
                    var i = t._hitTestContext;
                    i.setTransform(1, 0, 0, 1, -e, -n), this.draw(i);
                    var r = this._testHit(i);
                    return i.setTransform(1, 0, 0, 1, 0, 0), i.clearRect(0, 0, 2, 2), r
                }, e.set = function (t) {
                    for (var e in t) this[e] = t[e];
                    return this
                }, e.getBounds = function () {
                    if (this._bounds) return this._rectangle.copy(this._bounds);
                    var t = this.cacheCanvas;
                    if (t) {
                        var e = this._cacheScale;
                        return this._rectangle.setValues(this._cacheOffsetX, this._cacheOffsetY, t.width / e, t.height / e)
                    }
                    return null
                }, e.getTransformedBounds = function () {
                    return this._getBounds()
                }, e.setBounds = function (t, e, n, r) {
                    null == t && (this._bounds = t), this._bounds = (this._bounds || new i.Rectangle).setValues(t, e, n, r)
                }, e.clone = function () {
                    return this._cloneProps(new t)
                }, e.toString = function () {
                    return "[DisplayObject (name=" + this.name + ")]"
                }, e._cloneProps = function (t) {
                    return t.alpha = this.alpha, t.mouseEnabled = this.mouseEnabled, t.tickEnabled = this.tickEnabled, t.name = this.name, t.regX = this.regX, t.regY = this.regY, t.rotation = this.rotation, t.scaleX = this.scaleX, t.scaleY = this.scaleY, t.shadow = this.shadow, t.skewX = this.skewX, t.skewY = this.skewY, t.visible = this.visible, t.x = this.x, t.y = this.y, t.compositeOperation = this.compositeOperation, t.snapToPixel = this.snapToPixel, t.filters = null == this.filters ? null : this.filters.slice(0), t.mask = this.mask, t.hitArea = this.hitArea, t.cursor = this.cursor, t._bounds = this._bounds, t
                }, e._applyShadow = function (t, e) {
                    e = e || Shadow.identity, t.shadowColor = e.color, t.shadowOffsetX = e.offsetX, t.shadowOffsetY = e.offsetY, t.shadowBlur = e.blur
                }, e._tick = function (t) {
                    var e = this._listeners;
                    e && e.tick && (t.target = null, t.propagationStopped = t.immediatePropagationStopped = !1, this.dispatchEvent(t))
                }, e._testHit = function (e) {
                    try {
                        var n = e.getImageData(0, 0, 1, 1).data[3] > 1
                    } catch (e) {
                        if (!t.suppressCrossDomainErrors) throw"An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images."
                    }
                    return n
                }, e._applyFilters = function () {
                    if (this.filters && 0 != this.filters.length && this.cacheCanvas) for (var t = this.filters.length, e = this.cacheCanvas.getContext("2d"), n = this.cacheCanvas.width, i = this.cacheCanvas.height, r = 0; r < t; r++) this.filters[r].applyFilter(e, 0, 0, n, i)
                }, e._getFilterBounds = function (t) {
                    var e, n = this.filters, i = this._rectangle.setValues(0, 0, 0, 0);
                    if (!n || !(e = n.length)) return i;
                    for (var r = 0; r < e; r++) {
                        var s = this.filters[r];
                        s.getBounds && s.getBounds(i)
                    }
                    return i
                }, e._getBounds = function (t, e) {
                    return this._transformBounds(this.getBounds(), t, e)
                }, e._transformBounds = function (t, e, n) {
                    if (!t) return t;
                    var i = t.x, r = t.y, s = t.width, a = t.height, o = this._props.matrix;
                    o = n ? o.identity() : this.getMatrix(o), (i || r) && o.appendTransform(0, 0, 1, 1, 0, 0, 0, -i, -r), e && o.prependMatrix(e);
                    var u = s * o.a, l = s * o.b, c = a * o.c, h = a * o.d, d = o.tx, f = o.ty, p = d, g = d, v = f,
                        m = f;
                    return (i = u + d) < p ? p = i : i > g && (g = i), (i = u + c + d) < p ? p = i : i > g && (g = i), (i = c + d) < p ? p = i : i > g && (g = i), (r = l + f) < v ? v = r : r > m && (m = r), (r = l + h + f) < v ? v = r : r > m && (m = r), (r = h + f) < v ? v = r : r > m && (m = r), t.setValues(p, v, g - p, m - v)
                }, e._hasMouseEventListener = function () {
                    for (var e = t._MOUSE_EVENTS, n = 0, i = e.length; n < i; n++) if (this.hasEventListener(e[n])) return !0;
                    return !!this.cursor
                }, i.DisplayObject = i.promote(t, "EventDispatcher")
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t() {
                    this.DisplayObject_constructor(), this.children = [], this.mouseChildren = !0, this.tickChildren = !0
                }

                var e = i.extend(t, i.DisplayObject);
                e.getNumChildren = function () {
                    return this.children.length
                };
                try {
                    Object.defineProperties(e, {numChildren: {get: e.getNumChildren}})
                } catch (t) {
                }
                e.initialize = t, e.isVisible = function () {
                    var t = this.cacheCanvas || this.children.length;
                    return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && t)
                }, e.draw = function (t, e) {
                    if (this.DisplayObject_draw(t, e)) return !0;
                    for (var n = this.children.slice(), i = 0, r = n.length; i < r; i++) {
                        var s = n[i];
                        s.isVisible() && (t.save(), s.updateContext(t), s.draw(t), t.restore())
                    }
                    return !0
                }, e.addChild = function (t) {
                    if (null == t) return t;
                    var e = arguments.length;
                    if (e > 1) {
                        for (var n = 0; n < e; n++) this.addChild(arguments[n]);
                        return arguments[e - 1]
                    }
                    return t.parent && t.parent.removeChild(t), t.parent = this, this.children.push(t), t.dispatchEvent("added"), t
                }, e.addChildAt = function (t, e) {
                    var n = arguments.length, i = arguments[n - 1];
                    if (i < 0 || i > this.children.length) return arguments[n - 2];
                    if (n > 2) {
                        for (var r = 0; r < n - 1; r++) this.addChildAt(arguments[r], i + r);
                        return arguments[n - 2]
                    }
                    return t.parent && t.parent.removeChild(t), t.parent = this, this.children.splice(e, 0, t), t.dispatchEvent("added"), t
                }, e.removeChild = function (t) {
                    var e = arguments.length;
                    if (e > 1) {
                        for (var n = !0, r = 0; r < e; r++) n = n && this.removeChild(arguments[r]);
                        return n
                    }
                    return this.removeChildAt(i.indexOf(this.children, t))
                }, e.removeChildAt = function (t) {
                    var e = arguments.length;
                    if (e > 1) {
                        for (var n = [], i = 0; i < e; i++) n[i] = arguments[i];
                        n.sort(function (t, e) {
                            return e - t
                        });
                        for (var r = !0, i = 0; i < e; i++) r = r && this.removeChildAt(n[i]);
                        return r
                    }
                    if (t < 0 || t > this.children.length - 1) return !1;
                    var s = this.children[t];
                    return s && (s.parent = null), this.children.splice(t, 1), s.dispatchEvent("removed"), !0
                }, e.removeAllChildren = function () {
                    for (var t = this.children; t.length;) this.removeChildAt(0)
                }, e.getChildAt = function (t) {
                    return this.children[t]
                }, e.getChildByName = function (t) {
                    for (var e = this.children, n = 0, i = e.length; n < i; n++) if (e[n].name == t) return e[n];
                    return null
                }, e.sortChildren = function (t) {
                    this.children.sort(t)
                }, e.getChildIndex = function (t) {
                    return i.indexOf(this.children, t)
                }, e.swapChildrenAt = function (t, e) {
                    var n = this.children, i = n[t], r = n[e];
                    i && r && (n[t] = r, n[e] = i)
                }, e.swapChildren = function (t, e) {
                    for (var n, i, r = this.children, s = 0, a = r.length; s < a && (r[s] == t && (n = s), r[s] == e && (i = s), null == n || null == i); s++) ;
                    s != a && (r[n] = e, r[i] = t)
                }, e.setChildIndex = function (t, e) {
                    var n = this.children, i = n.length;
                    if (!(t.parent != this || e < 0 || e >= i)) {
                        for (var r = 0; r < i && n[r] != t; r++) ;
                        r != i && r != e && (n.splice(r, 1), n.splice(e, 0, t))
                    }
                }, e.contains = function (t) {
                    for (; t;) {
                        if (t == this) return !0;
                        t = t.parent
                    }
                    return !1
                }, e.hitTest = function (t, e) {
                    return null != this.getObjectUnderPoint(t, e)
                }, e.getObjectsUnderPoint = function (t, e, n) {
                    var i = [], r = this.localToGlobal(t, e);
                    return this._getObjectsUnderPoint(r.x, r.y, i, n > 0, 1 == n), i
                }, e.getObjectUnderPoint = function (t, e, n) {
                    var i = this.localToGlobal(t, e);
                    return this._getObjectsUnderPoint(i.x, i.y, null, n > 0, 1 == n)
                }, e.getBounds = function () {
                    return this._getBounds(null, !0)
                }, e.getTransformedBounds = function () {
                    return this._getBounds()
                }, e.clone = function (e) {
                    var n = this._cloneProps(new t);
                    return e && this._cloneChildren(n), n
                }, e.toString = function () {
                    return "[Container (name=" + this.name + ")]"
                }, e._tick = function (t) {
                    if (this.tickChildren) for (var e = this.children.length - 1; e >= 0; e--) {
                        var n = this.children[e];
                        n.tickEnabled && n._tick && n._tick(t)
                    }
                    this.DisplayObject__tick(t)
                }, e._cloneChildren = function (t) {
                    t.children.length && t.removeAllChildren();
                    for (var e = t.children, n = 0, i = this.children.length; n < i; n++) {
                        var r = this.children[n].clone(!0);
                        r.parent = t, e.push(r)
                    }
                }, e._getObjectsUnderPoint = function (e, n, r, s, a, o) {
                    if (o = o || 0, !o && !this._testMask(this, e, n)) return null;
                    var u, l = i.DisplayObject._hitTestContext;
                    a = a || s && this._hasMouseEventListener();
                    for (var c = this.children, h = c.length, d = h - 1; d >= 0; d--) {
                        var f = c[d], p = f.hitArea;
                        if (f.visible && (p || f.isVisible()) && (!s || f.mouseEnabled) && (p || this._testMask(f, e, n))) if (!p && f instanceof t) {
                            var g = f._getObjectsUnderPoint(e, n, r, s, a, o + 1);
                            if (!r && g) return s && !this.mouseChildren ? this : g
                        } else {
                            if (s && !a && !f._hasMouseEventListener()) continue;
                            var v = f.getConcatenatedDisplayProps(f._props);
                            if (u = v.matrix, p && (u.appendMatrix(p.getMatrix(p._props.matrix)), v.alpha = p.alpha), l.globalAlpha = v.alpha, l.setTransform(u.a, u.b, u.c, u.d, u.tx - e, u.ty - n), (p || f).draw(l), !this._testHit(l)) continue;
                            if (l.setTransform(1, 0, 0, 1, 0, 0), l.clearRect(0, 0, 2, 2), !r) return s && !this.mouseChildren ? this : f;
                            r.push(f)
                        }
                    }
                    return null
                }, e._testMask = function (t, e, n) {
                    var r = t.mask;
                    if (!r || !r.graphics || r.graphics.isEmpty()) return !0;
                    var s = this._props.matrix, a = t.parent;
                    s = a ? a.getConcatenatedMatrix(s) : s.identity(), s = r.getMatrix(r._props.matrix).prependMatrix(s);
                    var o = i.DisplayObject._hitTestContext;
                    return o.setTransform(s.a, s.b, s.c, s.d, s.tx - e, s.ty - n), r.graphics.drawAsPath(o), o.fillStyle = "#000", o.fill(), !!this._testHit(o) && (o.setTransform(1, 0, 0, 1, 0, 0), o.clearRect(0, 0, 2, 2), !0)
                }, e._getBounds = function (t, e) {
                    var n = this.DisplayObject_getBounds();
                    if (n) return this._transformBounds(n, t, e);
                    var i = this._props.matrix;
                    i = e ? i.identity() : this.getMatrix(i), t && i.prependMatrix(t);
                    for (var r = this.children.length, s = null, a = 0; a < r; a++) {
                        var o = this.children[a];
                        o.visible && (n = o._getBounds(i)) && (s ? s.extend(n.x, n.y, n.width, n.height) : s = n.clone())
                    }
                    return s
                }, i.Container = i.promote(t, "DisplayObject")
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t(t) {
                    this.Container_constructor(), this.autoClear = !0, this.canvas = "string" == typeof t ? document.getElementById(t) : t, this.mouseX = 0, this.mouseY = 0, this.drawRect = null, this.snapToPixelEnabled = !1, this.mouseInBounds = !1, this.tickOnUpdate = !0, this.mouseMoveOutside = !1, this.preventSelection = !0, this._pointerData = {}, this._pointerCount = 0, this._primaryPointerID = null, this._mouseOverIntervalID = null, this._nextStage = null, this._prevStage = null, this.enableDOMEvents(!0)
                }

                var e = i.extend(t, i.Container);
                e._get_nextStage = function () {
                    return this._nextStage
                }, e._set_nextStage = function (t) {
                    this._nextStage && (this._nextStage._prevStage = null), t && (t._prevStage = this), this._nextStage = t
                };
                try {
                    Object.defineProperties(e, {nextStage: {get: e._get_nextStage, set: e._set_nextStage}})
                } catch (t) {
                }
                e.update = function (t) {
                    if (this.canvas && (this.tickOnUpdate && this.tick(t), this.dispatchEvent("drawstart", !1, !0) !== !1)) {
                        i.DisplayObject._snapToPixelEnabled = this.snapToPixelEnabled;
                        var e = this.drawRect, n = this.canvas.getContext("2d");
                        n.setTransform(1, 0, 0, 1, 0, 0), this.autoClear && (e ? n.clearRect(e.x, e.y, e.width, e.height) : n.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1)), n.save(), this.drawRect && (n.beginPath(), n.rect(e.x, e.y, e.width, e.height), n.clip()), this.updateContext(n), this.draw(n, !1), n.restore(), this.dispatchEvent("drawend")
                    }
                }, e.tick = function (t) {
                    if (this.tickEnabled && this.dispatchEvent("tickstart", !1, !0) !== !1) {
                        var e = new i.Event("tick");
                        if (t) for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                        this._tick(e), this.dispatchEvent("tickend")
                    }
                }, e.handleEvent = function (t) {
                    "tick" == t.type && this.update(t)
                }, e.clear = function () {
                    if (this.canvas) {
                        var t = this.canvas.getContext("2d");
                        t.setTransform(1, 0, 0, 1, 0, 0), t.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1)
                    }
                }, e.toDataURL = function (t, e) {
                    var n, i = this.canvas.getContext("2d"), r = this.canvas.width, s = this.canvas.height;
                    if (t) {
                        n = i.getImageData(0, 0, r, s);
                        var a = i.globalCompositeOperation;
                        i.globalCompositeOperation = "destination-over", i.fillStyle = t, i.fillRect(0, 0, r, s)
                    }
                    var o = this.canvas.toDataURL(e || "image/png");
                    return t && (i.putImageData(n, 0, 0), i.globalCompositeOperation = a), o
                }, e.enableMouseOver = function (t) {
                    if (this._mouseOverIntervalID && (clearInterval(this._mouseOverIntervalID), this._mouseOverIntervalID = null, 0 == t && this._testMouseOver(!0)), null == t) t = 20; else if (t <= 0) return;
                    var e = this;
                    this._mouseOverIntervalID = setInterval(function () {
                        e._testMouseOver()
                    }, 1e3 / Math.min(50, t))
                }, e.enableDOMEvents = function (t) {
                    null == t && (t = !0);
                    var e, n, i = this._eventListeners;
                    if (!t && i) {
                        for (e in i) n = i[e], n.t.removeEventListener(e, n.f, !1);
                        this._eventListeners = null
                    } else if (t && !i && this.canvas) {
                        var r = window.addEventListener ? window : document, s = this;
                        i = this._eventListeners = {}, i.mouseup = {
                            t: r, f: function (t) {
                                s._handleMouseUp(t)
                            }
                        }, i.mousemove = {
                            t: r, f: function (t) {
                                s._handleMouseMove(t)
                            }
                        }, i.dblclick = {
                            t: this.canvas, f: function (t) {
                                s._handleDoubleClick(t)
                            }
                        }, i.mousedown = {
                            t: this.canvas, f: function (t) {
                                s._handleMouseDown(t)
                            }
                        };
                        for (e in i) n = i[e], n.t.addEventListener(e, n.f, !1)
                    }
                }, e.clone = function () {
                    throw"Stage cannot be cloned."
                }, e.toString = function () {
                    return "[Stage (name=" + this.name + ")]"
                }, e._getElementRect = function (t) {
                    var e;
                    try {
                        e = t.getBoundingClientRect()
                    } catch (n) {
                        e = {top: t.offsetTop, left: t.offsetLeft, width: t.offsetWidth, height: t.offsetHeight}
                    }
                    var n = (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || document.body.clientLeft || 0),
                        i = (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || document.body.clientTop || 0),
                        r = window.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle,
                        s = parseInt(r.paddingLeft) + parseInt(r.borderLeftWidth),
                        a = parseInt(r.paddingTop) + parseInt(r.borderTopWidth),
                        o = parseInt(r.paddingRight) + parseInt(r.borderRightWidth),
                        u = parseInt(r.paddingBottom) + parseInt(r.borderBottomWidth);
                    return {left: e.left + n + s, right: e.right + n - o, top: e.top + i + a, bottom: e.bottom + i - u}
                }, e._getPointerData = function (t) {
                    var e = this._pointerData[t];
                    return e || (e = this._pointerData[t] = {x: 0, y: 0}), e
                }, e._handleMouseMove = function (t) {
                    t || (t = window.event), this._handlePointerMove(-1, t, t.pageX, t.pageY)
                }, e._handlePointerMove = function (t, e, n, i, r) {
                    if ((!this._prevStage || void 0 !== r) && this.canvas) {
                        var s = this._nextStage, a = this._getPointerData(t), o = a.inBounds;
                        this._updatePointerPosition(t, e, n, i), (o || a.inBounds || this.mouseMoveOutside) && (t === -1 && a.inBounds == !o && this._dispatchMouseEvent(this, o ? "mouseleave" : "mouseenter", !1, t, a, e), this._dispatchMouseEvent(this, "stagemousemove", !1, t, a, e), this._dispatchMouseEvent(a.target, "pressmove", !0, t, a, e)), s && s._handlePointerMove(t, e, n, i, null)
                    }
                }, e._updatePointerPosition = function (t, e, n, i) {
                    var r = this._getElementRect(this.canvas);
                    n -= r.left, i -= r.top;
                    var s = this.canvas.width, a = this.canvas.height;
                    n /= (r.right - r.left) / s, i /= (r.bottom - r.top) / a;
                    var o = this._getPointerData(t);
                    (o.inBounds = n >= 0 && i >= 0 && n <= s - 1 && i <= a - 1) ? (o.x = n, o.y = i) : this.mouseMoveOutside && (o.x = n < 0 ? 0 : n > s - 1 ? s - 1 : n, o.y = i < 0 ? 0 : i > a - 1 ? a - 1 : i), o.posEvtObj = e, o.rawX = n, o.rawY = i, t !== this._primaryPointerID && t !== -1 || (this.mouseX = o.x, this.mouseY = o.y, this.mouseInBounds = o.inBounds)
                }, e._handleMouseUp = function (t) {
                    this._handlePointerUp(-1, t, !1)
                }, e._handlePointerUp = function (t, e, n, i) {
                    var r = this._nextStage, s = this._getPointerData(t);
                    if (!this._prevStage || void 0 !== i) {
                        var a = null, o = s.target;
                        i || !o && !r || (a = this._getObjectsUnderPoint(s.x, s.y, null, !0)), s.down && (this._dispatchMouseEvent(this, "stagemouseup", !1, t, s, e, a), s.down = !1), a == o && this._dispatchMouseEvent(o, "click", !0, t, s, e), this._dispatchMouseEvent(o, "pressup", !0, t, s, e), n ? (t == this._primaryPointerID && (this._primaryPointerID = null), delete this._pointerData[t]) : s.target = null, r && r._handlePointerUp(t, e, n, i || a && this)
                    }
                }, e._handleMouseDown = function (t) {
                    this._handlePointerDown(-1, t, t.pageX, t.pageY)
                }, e._handlePointerDown = function (t, e, n, i, r) {
                    this.preventSelection && e.preventDefault(), null != this._primaryPointerID && t !== -1 || (this._primaryPointerID = t), null != i && this._updatePointerPosition(t, e, n, i);
                    var s = null, a = this._nextStage, o = this._getPointerData(t);
                    r || (s = o.target = this._getObjectsUnderPoint(o.x, o.y, null, !0)), o.inBounds && (this._dispatchMouseEvent(this, "stagemousedown", !1, t, o, e, s), o.down = !0), this._dispatchMouseEvent(s, "mousedown", !0, t, o, e), a && a._handlePointerDown(t, e, n, i, r || s && this)
                }, e._testMouseOver = function (t, e, n) {
                    if (!this._prevStage || void 0 !== e) {
                        var i = this._nextStage;
                        if (!this._mouseOverIntervalID) return void(i && i._testMouseOver(t, e, n));
                        var r = this._getPointerData(-1);
                        if (r && (t || this.mouseX != this._mouseOverX || this.mouseY != this._mouseOverY || !this.mouseInBounds)) {
                            var s, a, o, u = r.posEvtObj, l = n || u && u.target == this.canvas, c = null, h = -1,
                                d = "";
                            !e && (t || this.mouseInBounds && l) && (c = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, !0), this._mouseOverX = this.mouseX, this._mouseOverY = this.mouseY);
                            var f = this._mouseOverTarget || [], p = f[f.length - 1], g = this._mouseOverTarget = [];
                            for (s = c; s;) g.unshift(s), d || (d = s.cursor), s = s.parent;
                            for (this.canvas.style.cursor = d, !e && n && (n.canvas.style.cursor = d), a = 0, o = g.length; a < o && g[a] == f[a]; a++) h = a;
                            for (p != c && this._dispatchMouseEvent(p, "mouseout", !0, -1, r, u, c), a = f.length - 1; a > h; a--) this._dispatchMouseEvent(f[a], "rollout", !1, -1, r, u, c);
                            for (a = g.length - 1; a > h; a--) this._dispatchMouseEvent(g[a], "rollover", !1, -1, r, u, p);
                            p != c && this._dispatchMouseEvent(c, "mouseover", !0, -1, r, u, p), i && i._testMouseOver(t, e || c && this, n || l && this)
                        }
                    }
                }, e._handleDoubleClick = function (t, e) {
                    var n = null, i = this._nextStage, r = this._getPointerData(-1);
                    e || (n = this._getObjectsUnderPoint(r.x, r.y, null, !0), this._dispatchMouseEvent(n, "dblclick", !0, -1, r, t)), i && i._handleDoubleClick(t, e || n && this)
                }, e._dispatchMouseEvent = function (t, e, n, r, s, a, o) {
                    if (t && (n || t.hasEventListener(e))) {
                        var u = new i.MouseEvent(e, n, (!1), s.x, s.y, a, r, r === this._primaryPointerID || r === -1, s.rawX, s.rawY, o);
                        t.dispatchEvent(u)
                    }
                }, i.Stage = i.promote(t, "Container")
            }(), this.createjs = this.createjs || {}, function () {
                function t(t) {
                    this.DisplayObject_constructor(), "string" == typeof t ? (this.image = document.createElement("img"), this.image.src = t) : this.image = t, this.sourceRect = null
                }

                var e = i.extend(t, i.DisplayObject);
                e.initialize = t, e.isVisible = function () {
                    var t = this.image,
                        e = this.cacheCanvas || t && (t.naturalWidth || t.getContext || t.readyState >= 2);
                    return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && e)
                }, e.draw = function (t, e) {
                    if (this.DisplayObject_draw(t, e) || !this.image) return !0;
                    var n = this.image, i = this.sourceRect;
                    if (i) {
                        var r = i.x, s = i.y, a = r + i.width, o = s + i.height, u = 0, l = 0, c = n.width,
                            h = n.height;
                        r < 0 && (u -= r, r = 0), a > c && (a = c), s < 0 && (l -= s, s = 0), o > h && (o = h), t.drawImage(n, r, s, a - r, o - s, u, l, a - r, o - s)
                    } else t.drawImage(n, 0, 0);
                    return !0
                }, e.getBounds = function () {
                    var t = this.DisplayObject_getBounds();
                    if (t) return t;
                    var e = this.image, n = this.sourceRect || e,
                        i = e && (e.naturalWidth || e.getContext || e.readyState >= 2);
                    return i ? this._rectangle.setValues(0, 0, n.width, n.height) : null
                }, e.clone = function () {
                    var e = new t(this.image);
                    return this.sourceRect && (e.sourceRect = this.sourceRect.clone()), this._cloneProps(e), e
                }, e.toString = function () {
                    return "[Bitmap (name=" + this.name + ")]"
                }, i.Bitmap = i.promote(t, "DisplayObject")
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t(t, e) {
                    this.DisplayObject_constructor(), this.currentFrame = 0, this.currentAnimation = null, this.paused = !0, this.spriteSheet = t, this.currentAnimationFrame = 0, this.framerate = 0, this._animation = null, this._currentFrame = null, this._skipAdvance = !1, null != e && this.gotoAndPlay(e)
                }

                var e = i.extend(t, i.DisplayObject);
                e.initialize = t, e.isVisible = function () {
                    var t = this.cacheCanvas || this.spriteSheet.complete;
                    return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && t)
                }, e.draw = function (t, e) {
                    if (this.DisplayObject_draw(t, e)) return !0;
                    this._normalizeFrame();
                    var n = this.spriteSheet.getFrame(0 | this._currentFrame);
                    if (!n) return !1;
                    var i = n.rect;
                    return i.width && i.height && t.drawImage(n.image, i.x, i.y, i.width, i.height, -n.regX, -n.regY, i.width, i.height), !0
                }, e.play = function () {
                    this.paused = !1
                }, e.stop = function () {
                    this.paused = !0
                }, e.gotoAndPlay = function (t) {
                    this.paused = !1, this._skipAdvance = !0, this._goto(t)
                }, e.gotoAndStop = function (t) {
                    this.paused = !0, this._goto(t)
                }, e.advance = function (t) {
                    var e = this.framerate || this.spriteSheet.framerate, n = e && null != t ? t / (1e3 / e) : 1;
                    this._normalizeFrame(n)
                }, e.getBounds = function () {
                    return this.DisplayObject_getBounds() || this.spriteSheet.getFrameBounds(this.currentFrame, this._rectangle)
                }, e.clone = function () {
                    return this._cloneProps(new t(this.spriteSheet))
                }, e.toString = function () {
                    return "[Sprite (name=" + this.name + ")]"
                }, e._cloneProps = function (t) {
                    return this.DisplayObject__cloneProps(t), t.currentFrame = this.currentFrame, t.currentAnimation = this.currentAnimation, t.paused = this.paused, t.currentAnimationFrame = this.currentAnimationFrame, t.framerate = this.framerate, t._animation = this._animation, t._currentFrame = this._currentFrame, t._skipAdvance = this._skipAdvance, t
                }, e._tick = function (t) {
                    this.paused || (this._skipAdvance || this.advance(t && t.delta), this._skipAdvance = !1), this.DisplayObject__tick(t)
                }, e._normalizeFrame = function (t) {
                    t = t || 0;
                    var e, n = this._animation, i = this.paused, r = this._currentFrame;
                    if (n) {
                        var s = n.speed || 1, a = this.currentAnimationFrame;
                        if (e = n.frames.length, a + t * s >= e) {
                            var o = n.next;
                            if (this._dispatchAnimationEnd(n, r, i, o, e - 1)) return;
                            if (o) return this._goto(o, t - (e - a) / s);
                            this.paused = !0, a = n.frames.length - 1
                        } else a += t * s;
                        this.currentAnimationFrame = a, this._currentFrame = n.frames[0 | a]
                    } else if (r = this._currentFrame += t, e = this.spriteSheet.getNumFrames(), r >= e && e > 0 && !this._dispatchAnimationEnd(n, r, i, e - 1) && (this._currentFrame -= e) >= e) return this._normalizeFrame();
                    r = 0 | this._currentFrame, this.currentFrame != r && (this.currentFrame = r, this.dispatchEvent("change"))
                }, e._dispatchAnimationEnd = function (t, e, n, r, s) {
                    var a = t ? t.name : null;
                    if (this.hasEventListener("animationend")) {
                        var o = new i.Event("animationend");
                        o.name = a, o.next = r, this.dispatchEvent(o)
                    }
                    var u = this._animation != t || this._currentFrame != e;
                    return u || n || !this.paused || (this.currentAnimationFrame = s, u = !0), u
                }, e._goto = function (t, e) {
                    if (this.currentAnimationFrame = 0, isNaN(t)) {
                        var n = this.spriteSheet.getAnimation(t);
                        n && (this._animation = n, this.currentAnimation = t, this._normalizeFrame(e))
                    } else this.currentAnimation = this._animation = null, this._currentFrame = t, this._normalizeFrame()
                }, i.Sprite = i.promote(t, "DisplayObject")
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t(t) {
                    this.DisplayObject_constructor(), this.graphics = t ? t : new i.Graphics
                }

                var e = i.extend(t, i.DisplayObject);
                e.isVisible = function () {
                    var t = this.cacheCanvas || this.graphics && !this.graphics.isEmpty();
                    return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && t)
                }, e.draw = function (t, e) {
                    return !!this.DisplayObject_draw(t, e) || (this.graphics.draw(t, this), !0)
                }, e.clone = function (e) {
                    var n = e && this.graphics ? this.graphics.clone() : this.graphics;
                    return this._cloneProps(new t(n))
                }, e.toString = function () {
                    return "[Shape (name=" + this.name + ")]"
                }, i.Shape = i.promote(t, "DisplayObject")
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t(t, e, n) {
                    this.DisplayObject_constructor(), this.text = t, this.font = e, this.color = n, this.textAlign = "left", this.textBaseline = "top", this.maxWidth = null, this.outline = 0, this.lineHeight = 0, this.lineWidth = null
                }

                var e = i.extend(t, i.DisplayObject),
                    n = i.createCanvas ? i.createCanvas() : document.createElement("canvas");
                n.getContext && (t._workingContext = n.getContext("2d"), n.width = n.height = 1), t.H_OFFSETS = {
                    start: 0,
                    left: 0,
                    center: -.5,
                    end: -1,
                    right: -1
                }, t.V_OFFSETS = {
                    top: 0,
                    hanging: -.01,
                    middle: -.4,
                    alphabetic: -.8,
                    ideographic: -.85,
                    bottom: -1
                }, e.isVisible = function () {
                    var t = this.cacheCanvas || null != this.text && "" !== this.text;
                    return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && t)
                }, e.draw = function (t, e) {
                    if (this.DisplayObject_draw(t, e)) return !0;
                    var n = this.color || "#000";
                    return this.outline ? (t.strokeStyle = n, t.lineWidth = 1 * this.outline) : t.fillStyle = n, this._drawText(this._prepContext(t)), !0
                }, e.getMeasuredWidth = function () {
                    return this._getMeasuredWidth(this.text)
                }, e.getMeasuredLineHeight = function () {
                    return 1.2 * this._getMeasuredWidth("M")
                }, e.getMeasuredHeight = function () {
                    return this._drawText(null, {}).height
                }, e.getBounds = function () {
                    var e = this.DisplayObject_getBounds();
                    if (e) return e;
                    if (null == this.text || "" === this.text) return null;
                    var n = this._drawText(null, {}),
                        i = this.maxWidth && this.maxWidth < n.width ? this.maxWidth : n.width,
                        r = i * t.H_OFFSETS[this.textAlign || "left"],
                        s = this.lineHeight || this.getMeasuredLineHeight(),
                        a = s * t.V_OFFSETS[this.textBaseline || "top"];
                    return this._rectangle.setValues(r, a, i, n.height)
                }, e.getMetrics = function () {
                    var e = {lines: []};
                    return e.lineHeight = this.lineHeight || this.getMeasuredLineHeight(), e.vOffset = e.lineHeight * t.V_OFFSETS[this.textBaseline || "top"], this._drawText(null, e, e.lines)
                }, e.clone = function () {
                    return this._cloneProps(new t(this.text, this.font, this.color))
                }, e.toString = function () {
                    return "[Text (text=" + (this.text.length > 20 ? this.text.substr(0, 17) + "..." : this.text) + ")]"
                }, e._cloneProps = function (t) {
                    return this.DisplayObject__cloneProps(t), t.textAlign = this.textAlign, t.textBaseline = this.textBaseline, t.maxWidth = this.maxWidth, t.outline = this.outline, t.lineHeight = this.lineHeight, t.lineWidth = this.lineWidth, t
                }, e._prepContext = function (t) {
                    return t.font = this.font || "10px sans-serif", t.textAlign = this.textAlign || "left", t.textBaseline = this.textBaseline || "top", t
                }, e._drawText = function (e, n, i) {
                    var r = !!e;
                    r || (e = t._workingContext, e.save(), this._prepContext(e));
                    for (var s = this.lineHeight || this.getMeasuredLineHeight(), a = 0, o = 0, u = String(this.text).split(/(?:\r\n|\r|\n)/), l = 0, c = u.length; l < c; l++) {
                        var h = u[l], d = null;
                        if (null != this.lineWidth && (d = e.measureText(h).width) > this.lineWidth) {
                            var f = h.split(/(\s)/);
                            h = f[0], d = e.measureText(h).width;
                            for (var p = 1, g = f.length; p < g; p += 2) {
                                var v = e.measureText(f[p] + f[p + 1]).width;
                                d + v > this.lineWidth ? (r && this._drawTextLine(e, h, o * s), i && i.push(h), d > a && (a = d), h = f[p + 1], d = e.measureText(h).width, o++) : (h += f[p] + f[p + 1], d += v)
                            }
                        }
                        r && this._drawTextLine(e, h, o * s), i && i.push(h), n && null == d && (d = e.measureText(h).width), d > a && (a = d), o++
                    }
                    return n && (n.width = a, n.height = o * s), r || e.restore(), n
                }, e._drawTextLine = function (t, e, n) {
                    this.outline ? t.strokeText(e, 0, n, this.maxWidth || 65535) : t.fillText(e, 0, n, this.maxWidth || 65535)
                }, e._getMeasuredWidth = function (e) {
                    var n = t._workingContext;
                    n.save();
                    var i = this._prepContext(n).measureText(e).width;
                    return n.restore(), i
                }, i.Text = i.promote(t, "DisplayObject")
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t(t, e) {
                    this.Container_constructor(), this.text = t || "", this.spriteSheet = e, this.lineHeight = 0, this.letterSpacing = 0, this.spaceWidth = 0, this._oldProps = {
                        text: 0,
                        spriteSheet: 0,
                        lineHeight: 0,
                        letterSpacing: 0,
                        spaceWidth: 0
                    }
                }

                var e = i.extend(t, i.Container);
                t.maxPoolSize = 100, t._spritePool = [], e.draw = function (t, e) {
                    this.DisplayObject_draw(t, e) || (this._updateText(), this.Container_draw(t, e))
                }, e.getBounds = function () {
                    return this._updateText(), this.Container_getBounds()
                }, e.isVisible = function () {
                    var t = this.cacheCanvas || this.spriteSheet && this.spriteSheet.complete && this.text;
                    return !!(this.visible && this.alpha > 0 && 0 !== this.scaleX && 0 !== this.scaleY && t)
                }, e.clone = function () {
                    return this._cloneProps(new t(this.text, this.spriteSheet))
                }, e.addChild = e.addChildAt = e.removeChild = e.removeChildAt = e.removeAllChildren = function () {
                }, e._cloneProps = function (t) {
                    return this.Container__cloneProps(t), t.lineHeight = this.lineHeight, t.letterSpacing = this.letterSpacing, t.spaceWidth = this.spaceWidth, t
                }, e._getFrameIndex = function (t, e) {
                    var n, i = e.getAnimation(t);
                    return i || (t != (n = t.toUpperCase()) || t != (n = t.toLowerCase()) || (n = null), n && (i = e.getAnimation(n))), i && i.frames[0]
                }, e._getFrame = function (t, e) {
                    var n = this._getFrameIndex(t, e);
                    return null == n ? n : e.getFrame(n)
                }, e._getLineHeight = function (t) {
                    var e = this._getFrame("1", t) || this._getFrame("T", t) || this._getFrame("L", t) || t.getFrame(0);
                    return e ? e.rect.height : 1
                }, e._getSpaceWidth = function (t) {
                    var e = this._getFrame("1", t) || this._getFrame("l", t) || this._getFrame("e", t) || this._getFrame("a", t) || t.getFrame(0);
                    return e ? e.rect.width : 1
                }, e._updateText = function () {
                    var e, n = 0, r = 0, s = this._oldProps, a = !1, o = this.spaceWidth, u = this.lineHeight,
                        l = this.spriteSheet, c = t._spritePool, h = this.children, d = 0, f = h.length;
                    for (var p in s) s[p] != this[p] && (s[p] = this[p], a = !0);
                    if (a) {
                        var g = !!this._getFrame(" ", l);
                        g || o || (o = this._getSpaceWidth(l)), u || (u = this._getLineHeight(l));
                        for (var v = 0, m = this.text.length; v < m; v++) {
                            var _ = this.text.charAt(v);
                            if (" " != _ || g) if ("\n" != _ && "\r" != _) {
                                var y = this._getFrameIndex(_, l);
                                null != y && (d < f ? e = h[d] : (h.push(e = c.length ? c.pop() : new i.Sprite), e.parent = this, f++), e.spriteSheet = l, e.gotoAndStop(y), e.x = n, e.y = r, d++, n += e.getBounds().width + this.letterSpacing)
                            } else "\r" == _ && "\n" == this.text.charAt(v + 1) && v++, n = 0, r += u; else n += o
                        }
                        for (; f > d;) c.push(e = h.pop()), e.parent = null, f--;
                        c.length > t.maxPoolSize && (c.length = t.maxPoolSize)
                    }
                }, i.BitmapText = i.promote(t, "Container")
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t() {
                    throw"SpriteSheetUtils cannot be instantiated"
                }

                var e = i.createCanvas ? i.createCanvas() : document.createElement("canvas");
                e.getContext && (t._workingCanvas = e, t._workingContext = e.getContext("2d"), e.width = e.height = 1), t.addFlippedFrames = function (e, n, i, r) {
                    if (n || i || r) {
                        var s = 0;
                        n && t._flip(e, ++s, !0, !1), i && t._flip(e, ++s, !1, !0), r && t._flip(e, ++s, !0, !0)
                    }
                }, t.extractFrame = function (e, n) {
                    isNaN(n) && (n = e.getAnimation(n).frames[0]);
                    var i = e.getFrame(n);
                    if (!i) return null;
                    var r = i.rect, s = t._workingCanvas;
                    s.width = r.width, s.height = r.height, t._workingContext.drawImage(i.image, r.x, r.y, r.width, r.height, 0, 0, r.width, r.height);
                    var a = document.createElement("img");
                    return a.src = s.toDataURL("image/png"), a
                }, t.mergeAlpha = function (t, e, n) {
                    n || (n = i.createCanvas ? i.createCanvas() : document.createElement("canvas")), n.width = Math.max(e.width, t.width), n.height = Math.max(e.height, t.height);
                    var r = n.getContext("2d");
                    return r.save(), r.drawImage(t, 0, 0), r.globalCompositeOperation = "destination-in", r.drawImage(e, 0, 0), r.restore(), n
                }, t._flip = function (e, n, i, r) {
                    for (var s = e._images, a = t._workingCanvas, o = t._workingContext, u = s.length / n, l = 0; l < u; l++) {
                        var c = s[l];
                        c.__tmp = l, o.setTransform(1, 0, 0, 1, 0, 0), o.clearRect(0, 0, a.width + 1, a.height + 1), a.width = c.width, a.height = c.height, o.setTransform(i ? -1 : 1, 0, 0, r ? -1 : 1, i ? c.width : 0, r ? c.height : 0),
                            o.drawImage(c, 0, 0);
                        var h = document.createElement("img");
                        h.src = a.toDataURL("image/png"), h.width = c.width, h.height = c.height, s.push(h)
                    }
                    var d = e._frames, f = d.length / n;
                    for (l = 0; l < f; l++) {
                        c = d[l];
                        var p = c.rect.clone();
                        h = s[c.image.__tmp + u * n];
                        var g = {image: h, rect: p, regX: c.regX, regY: c.regY};
                        i && (p.x = h.width - p.x - p.width, g.regX = p.width - c.regX), r && (p.y = h.height - p.y - p.height, g.regY = p.height - c.regY), d.push(g)
                    }
                    var v = "_" + (i ? "h" : "") + (r ? "v" : ""), m = e._animations, _ = e._data, y = m.length / n;
                    for (l = 0; l < y; l++) {
                        var b = m[l];
                        c = _[b];
                        var w = {name: b + v, speed: c.speed, next: c.next, frames: []};
                        c.next && (w.next += v), d = c.frames;
                        for (var x = 0, T = d.length; x < T; x++) w.frames.push(d[x] + f * n);
                        _[w.name] = w, m.push(w.name)
                    }
                }, i.SpriteSheetUtils = t
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t() {
                    this.EventDispatcher_constructor(), this.maxWidth = 2048, this.maxHeight = 2048, this.spriteSheet = null, this.scale = 1, this.padding = 1, this.timeSlice = .3, this.progress = -1, this._frames = [], this._animations = {}, this._data = null, this._nextFrameIndex = 0, this._index = 0, this._timerID = null, this._scale = 1
                }

                var e = i.extend(t, i.EventDispatcher);
                t.ERR_DIMENSIONS = "frame dimensions exceed max spritesheet dimensions", t.ERR_RUNNING = "a build is already running", e.addFrame = function (e, n, i, r, s) {
                    if (this._data) throw t.ERR_RUNNING;
                    var a = n || e.bounds || e.nominalBounds;
                    return !a && e.getBounds && (a = e.getBounds()), a ? (i = i || 1, this._frames.push({
                        source: e,
                        sourceRect: a,
                        scale: i,
                        funct: r,
                        data: s,
                        index: this._frames.length,
                        height: a.height * i
                    }) - 1) : null
                }, e.addAnimation = function (e, n, i, r) {
                    if (this._data) throw t.ERR_RUNNING;
                    this._animations[e] = {frames: n, next: i, frequency: r}
                }, e.addMovieClip = function (e, n, i, r, s, a) {
                    if (this._data) throw t.ERR_RUNNING;
                    var o = e.frameBounds, u = n || e.bounds || e.nominalBounds;
                    if (!u && e.getBounds && (u = e.getBounds()), u || o) {
                        var l, c, h = this._frames.length, d = e.timeline.duration;
                        for (l = 0; l < d; l++) {
                            var f = o && o[l] ? o[l] : u;
                            this.addFrame(e, f, i, this._setupMovieClipFrame, {i: l, f: r, d: s})
                        }
                        var p = e.timeline._labels, g = [];
                        for (var v in p) g.push({index: p[v], label: v});
                        if (g.length) for (g.sort(function (t, e) {
                            return t.index - e.index
                        }), l = 0, c = g.length; l < c; l++) {
                            for (var m = g[l].label, _ = h + g[l].index, y = h + (l == c - 1 ? d : g[l + 1].index), b = [], w = _; w < y; w++) b.push(w);
                            a && !(m = a(m, e, _, y)) || this.addAnimation(m, b, !0)
                        }
                    }
                }, e.build = function () {
                    if (this._data) throw t.ERR_RUNNING;
                    for (this._startBuild(); this._drawNext();) ;
                    return this._endBuild(), this.spriteSheet
                }, e.buildAsync = function (e) {
                    if (this._data) throw t.ERR_RUNNING;
                    this.timeSlice = e, this._startBuild();
                    var n = this;
                    this._timerID = setTimeout(function () {
                        n._run()
                    }, 50 - 50 * Math.max(.01, Math.min(.99, this.timeSlice || .3)))
                }, e.stopAsync = function () {
                    clearTimeout(this._timerID), this._data = null
                }, e.clone = function () {
                    throw"SpriteSheetBuilder cannot be cloned."
                }, e.toString = function () {
                    return "[SpriteSheetBuilder]"
                }, e._startBuild = function () {
                    var e = this.padding || 0;
                    this.progress = 0, this.spriteSheet = null, this._index = 0, this._scale = this.scale;
                    var n = [];
                    this._data = {images: [], frames: n, animations: this._animations};
                    var r = this._frames.slice();
                    if (r.sort(function (t, e) {
                            return t.height <= e.height ? -1 : 1
                        }), r[r.length - 1].height + 2 * e > this.maxHeight) throw t.ERR_DIMENSIONS;
                    for (var s = 0, a = 0, o = 0; r.length;) {
                        var u = this._fillRow(r, s, o, n, e);
                        if (u.w > a && (a = u.w), s += u.h, !u.h || !r.length) {
                            var l = i.createCanvas ? i.createCanvas() : document.createElement("canvas");
                            l.width = this._getSize(a, this.maxWidth), l.height = this._getSize(s, this.maxHeight), this._data.images[o] = l, u.h || (a = s = 0, o++)
                        }
                    }
                }, e._setupMovieClipFrame = function (t, e) {
                    var n = t.actionsEnabled;
                    t.actionsEnabled = !1, t.gotoAndStop(e.i), t.actionsEnabled = n, e.f && e.f(t, e.d, e.i)
                }, e._getSize = function (t, e) {
                    for (var n = 4; Math.pow(2, ++n) < t;) ;
                    return Math.min(e, Math.pow(2, n))
                }, e._fillRow = function (e, n, r, s, a) {
                    var o = this.maxWidth, u = this.maxHeight;
                    n += a;
                    for (var l = u - n, c = a, h = 0, d = e.length - 1; d >= 0; d--) {
                        var f = e[d], p = this._scale * f.scale, g = f.sourceRect, v = f.source,
                            m = Math.floor(p * g.x - a), _ = Math.floor(p * g.y - a),
                            y = Math.ceil(p * g.height + 2 * a), b = Math.ceil(p * g.width + 2 * a);
                        if (b > o) throw t.ERR_DIMENSIONS;
                        y > l || c + b > o || (f.img = r, f.rect = new i.Rectangle(c, n, b, y), h = h || y, e.splice(d, 1), s[f.index] = [c, n, b, y, r, Math.round(-m + p * v.regX - a), Math.round(-_ + p * v.regY - a)], c += b)
                    }
                    return {w: c, h: h}
                }, e._endBuild = function () {
                    this.spriteSheet = new i.SpriteSheet(this._data), this._data = null, this.progress = 1, this.dispatchEvent("complete")
                }, e._run = function () {
                    for (var t = 50 * Math.max(.01, Math.min(.99, this.timeSlice || .3)), e = (new Date).getTime() + t, n = !1; e > (new Date).getTime();) if (!this._drawNext()) {
                        n = !0;
                        break
                    }
                    if (n) this._endBuild(); else {
                        var r = this;
                        this._timerID = setTimeout(function () {
                            r._run()
                        }, 50 - t)
                    }
                    var s = this.progress = this._index / this._frames.length;
                    if (this.hasEventListener("progress")) {
                        var a = new i.Event("progress");
                        a.progress = s, this.dispatchEvent(a)
                    }
                }, e._drawNext = function () {
                    var t = this._frames[this._index], e = t.scale * this._scale, n = t.rect, i = t.sourceRect,
                        r = this._data.images[t.img], s = r.getContext("2d");
                    return t.funct && t.funct(t.source, t.data), s.save(), s.beginPath(), s.rect(n.x, n.y, n.width, n.height), s.clip(), s.translate(Math.ceil(n.x - i.x * e), Math.ceil(n.y - i.y * e)), s.scale(e, e), t.source.draw(s), s.restore(), ++this._index < this._frames.length
                }, i.SpriteSheetBuilder = i.promote(t, "EventDispatcher")
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t(t) {
                    this.DisplayObject_constructor(), "string" == typeof t && (t = document.getElementById(t)), this.mouseEnabled = !1;
                    var e = t.style;
                    e.position = "absolute", e.transformOrigin = e.WebkitTransformOrigin = e.msTransformOrigin = e.MozTransformOrigin = e.OTransformOrigin = "0% 0%", this.htmlElement = t, this._oldProps = null
                }

                var e = i.extend(t, i.DisplayObject);
                e.isVisible = function () {
                    return null != this.htmlElement
                }, e.draw = function (t, e) {
                    return !0
                }, e.cache = function () {
                }, e.uncache = function () {
                }, e.updateCache = function () {
                }, e.hitTest = function () {
                }, e.localToGlobal = function () {
                }, e.globalToLocal = function () {
                }, e.localToLocal = function () {
                }, e.clone = function () {
                    throw"DOMElement cannot be cloned."
                }, e.toString = function () {
                    return "[DOMElement (name=" + this.name + ")]"
                }, e._tick = function (t) {
                    var e = this.getStage();
                    e && e.on("drawend", this._handleDrawEnd, this, !0), this.DisplayObject__tick(t)
                }, e._handleDrawEnd = function (t) {
                    var e = this.htmlElement;
                    if (e) {
                        var n = e.style, r = this.getConcatenatedDisplayProps(this._props), s = r.matrix,
                            a = r.visible ? "visible" : "hidden";
                        if (a != n.visibility && (n.visibility = a), r.visible) {
                            var o = this._oldProps, u = o && o.matrix, l = 1e4;
                            if (!u || !u.equals(s)) {
                                var c = "matrix(" + (s.a * l | 0) / l + "," + (s.b * l | 0) / l + "," + (s.c * l | 0) / l + "," + (s.d * l | 0) / l + "," + (s.tx + .5 | 0);
                                n.transform = n.WebkitTransform = n.OTransform = n.msTransform = c + "," + (s.ty + .5 | 0) + ")", n.MozTransform = c + "px," + (s.ty + .5 | 0) + "px)", o || (o = this._oldProps = new i.DisplayProps((!0), NaN)), o.matrix.copy(s)
                            }
                            o.alpha != r.alpha && (n.opacity = "" + (r.alpha * l | 0) / l, o.alpha = r.alpha)
                        }
                    }
                }, i.DOMElement = i.promote(t, "DisplayObject")
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t() {
                }

                var e = t.prototype;
                e.getBounds = function (t) {
                    return t
                }, e.applyFilter = function (t, e, n, i, r, s, a, o) {
                    s = s || t, null == a && (a = e), null == o && (o = n);
                    try {
                        var u = t.getImageData(e, n, i, r)
                    } catch (t) {
                        return !1
                    }
                    return !!this._applyFilter(u) && (s.putImageData(u, a, o), !0)
                }, e.toString = function () {
                    return "[Filter]"
                }, e.clone = function () {
                    return new t
                }, e._applyFilter = function (t) {
                    return !0
                }, i.Filter = t
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t(t, e, n) {
                    (isNaN(t) || t < 0) && (t = 0), (isNaN(e) || e < 0) && (e = 0), (isNaN(n) || n < 1) && (n = 1), this.blurX = 0 | t, this.blurY = 0 | e, this.quality = 0 | n
                }

                var e = i.extend(t, i.Filter);
                t.MUL_TABLE = [1, 171, 205, 293, 57, 373, 79, 137, 241, 27, 391, 357, 41, 19, 283, 265, 497, 469, 443, 421, 25, 191, 365, 349, 335, 161, 155, 149, 9, 278, 269, 261, 505, 245, 475, 231, 449, 437, 213, 415, 405, 395, 193, 377, 369, 361, 353, 345, 169, 331, 325, 319, 313, 307, 301, 37, 145, 285, 281, 69, 271, 267, 263, 259, 509, 501, 493, 243, 479, 118, 465, 459, 113, 446, 55, 435, 429, 423, 209, 413, 51, 403, 199, 393, 97, 3, 379, 375, 371, 367, 363, 359, 355, 351, 347, 43, 85, 337, 333, 165, 327, 323, 5, 317, 157, 311, 77, 305, 303, 75, 297, 294, 73, 289, 287, 71, 141, 279, 277, 275, 68, 135, 67, 133, 33, 262, 260, 129, 511, 507, 503, 499, 495, 491, 61, 121, 481, 477, 237, 235, 467, 232, 115, 457, 227, 451, 7, 445, 221, 439, 218, 433, 215, 427, 425, 211, 419, 417, 207, 411, 409, 203, 202, 401, 399, 396, 197, 49, 389, 387, 385, 383, 95, 189, 47, 187, 93, 185, 23, 183, 91, 181, 45, 179, 89, 177, 11, 175, 87, 173, 345, 343, 341, 339, 337, 21, 167, 83, 331, 329, 327, 163, 81, 323, 321, 319, 159, 79, 315, 313, 39, 155, 309, 307, 153, 305, 303, 151, 75, 299, 149, 37, 295, 147, 73, 291, 145, 289, 287, 143, 285, 71, 141, 281, 35, 279, 139, 69, 275, 137, 273, 17, 271, 135, 269, 267, 133, 265, 33, 263, 131, 261, 130, 259, 129, 257, 1], t.SHG_TABLE = [0, 9, 10, 11, 9, 12, 10, 11, 12, 9, 13, 13, 10, 9, 13, 13, 14, 14, 14, 14, 10, 13, 14, 14, 14, 13, 13, 13, 9, 14, 14, 14, 15, 14, 15, 14, 15, 15, 14, 15, 15, 15, 14, 15, 15, 15, 15, 15, 14, 15, 15, 15, 15, 15, 15, 12, 14, 15, 15, 13, 15, 15, 15, 15, 16, 16, 16, 15, 16, 14, 16, 16, 14, 16, 13, 16, 16, 16, 15, 16, 13, 16, 15, 16, 14, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 13, 14, 16, 16, 15, 16, 16, 10, 16, 15, 16, 14, 16, 16, 14, 16, 16, 14, 16, 16, 14, 15, 16, 16, 16, 14, 15, 14, 15, 13, 16, 16, 15, 17, 17, 17, 17, 17, 17, 14, 15, 17, 17, 16, 16, 17, 16, 15, 17, 16, 17, 11, 17, 16, 17, 16, 17, 16, 17, 17, 16, 17, 17, 16, 17, 17, 16, 16, 17, 17, 17, 16, 14, 17, 17, 17, 17, 15, 16, 14, 16, 15, 16, 13, 16, 15, 16, 14, 16, 15, 16, 12, 16, 15, 16, 17, 17, 17, 17, 17, 13, 16, 15, 17, 17, 17, 16, 15, 17, 17, 17, 16, 15, 17, 17, 14, 16, 17, 17, 16, 17, 17, 16, 15, 17, 16, 14, 17, 16, 15, 17, 16, 17, 17, 16, 17, 15, 16, 17, 14, 17, 16, 15, 17, 16, 17, 13, 17, 16, 17, 17, 16, 17, 14, 17, 16, 17, 16, 17, 16, 17, 9], e.getBounds = function (t) {
                    var e = 0 | this.blurX, n = 0 | this.blurY;
                    if (e <= 0 && n <= 0) return t;
                    var r = Math.pow(this.quality, .2);
                    return (t || new i.Rectangle).pad(e * r + 1, n * r + 1, e * r + 1, n * r + 1)
                }, e.clone = function () {
                    return new t(this.blurX, this.blurY, this.quality)
                }, e.toString = function () {
                    return "[BlurFilter]"
                }, e._applyFilter = function (e) {
                    var n = this.blurX >> 1;
                    if (isNaN(n) || n < 0) return !1;
                    var i = this.blurY >> 1;
                    if (isNaN(i) || i < 0) return !1;
                    if (0 == n && 0 == i) return !1;
                    var r = this.quality;
                    (isNaN(r) || r < 1) && (r = 1), r |= 0, r > 3 && (r = 3), r < 1 && (r = 1);
                    var s = e.data, a = 0, o = 0, u = 0, l = 0, c = 0, h = 0, d = 0, f = 0, p = 0, g = 0, v = 0, m = 0,
                        _ = 0, y = 0, b = 0, w = n + n + 1 | 0, x = i + i + 1 | 0, T = 0 | e.width, E = 0 | e.height,
                        S = T - 1 | 0, L = E - 1 | 0, P = n + 1 | 0, C = i + 1 | 0, A = {r: 0, b: 0, g: 0, a: 0}, k = A;
                    for (u = 1; u < w; u++) k = k.n = {r: 0, b: 0, g: 0, a: 0};
                    k.n = A;
                    var O = {r: 0, b: 0, g: 0, a: 0}, R = O;
                    for (u = 1; u < x; u++) R = R.n = {r: 0, b: 0, g: 0, a: 0};
                    R.n = O;
                    for (var I = null, M = 0 | t.MUL_TABLE[n], j = 0 | t.SHG_TABLE[n], D = 0 | t.MUL_TABLE[i], N = 0 | t.SHG_TABLE[i]; r-- > 0;) {
                        d = h = 0;
                        var F = M, q = j;
                        for (o = E; --o > -1;) {
                            for (f = P * (m = s[0 | h]), p = P * (_ = s[h + 1 | 0]), g = P * (y = s[h + 2 | 0]), v = P * (b = s[h + 3 | 0]), k = A, u = P; --u > -1;) k.r = m, k.g = _, k.b = y, k.a = b, k = k.n;
                            for (u = 1; u < P; u++) l = h + ((S < u ? S : u) << 2) | 0, f += k.r = s[l], p += k.g = s[l + 1], g += k.b = s[l + 2], v += k.a = s[l + 3], k = k.n;
                            for (I = A, a = 0; a < T; a++) s[h++] = f * F >>> q, s[h++] = p * F >>> q, s[h++] = g * F >>> q, s[h++] = v * F >>> q, l = d + ((l = a + n + 1) < S ? l : S) << 2, f -= I.r - (I.r = s[l]), p -= I.g - (I.g = s[l + 1]), g -= I.b - (I.b = s[l + 2]), v -= I.a - (I.a = s[l + 3]), I = I.n;
                            d += T
                        }
                        for (F = D, q = N, a = 0; a < T; a++) {
                            for (h = a << 2 | 0, f = C * (m = s[h]) | 0, p = C * (_ = s[h + 1 | 0]) | 0, g = C * (y = s[h + 2 | 0]) | 0, v = C * (b = s[h + 3 | 0]) | 0, R = O, u = 0; u < C; u++) R.r = m, R.g = _, R.b = y, R.a = b, R = R.n;
                            for (c = T, u = 1; u <= i; u++) h = c + a << 2, f += R.r = s[h], p += R.g = s[h + 1], g += R.b = s[h + 2], v += R.a = s[h + 3], R = R.n, u < L && (c += T);
                            if (h = a, I = O, r > 0) for (o = 0; o < E; o++) l = h << 2, s[l + 3] = b = v * F >>> q, b > 0 ? (s[l] = f * F >>> q, s[l + 1] = p * F >>> q, s[l + 2] = g * F >>> q) : s[l] = s[l + 1] = s[l + 2] = 0, l = a + ((l = o + C) < L ? l : L) * T << 2, f -= I.r - (I.r = s[l]), p -= I.g - (I.g = s[l + 1]), g -= I.b - (I.b = s[l + 2]), v -= I.a - (I.a = s[l + 3]), I = I.n, h += T; else for (o = 0; o < E; o++) l = h << 2, s[l + 3] = b = v * F >>> q, b > 0 ? (b = 255 / b, s[l] = (f * F >>> q) * b, s[l + 1] = (p * F >>> q) * b, s[l + 2] = (g * F >>> q) * b) : s[l] = s[l + 1] = s[l + 2] = 0, l = a + ((l = o + C) < L ? l : L) * T << 2, f -= I.r - (I.r = s[l]), p -= I.g - (I.g = s[l + 1]), g -= I.b - (I.b = s[l + 2]), v -= I.a - (I.a = s[l + 3]), I = I.n, h += T
                        }
                    }
                    return !0
                }, i.BlurFilter = i.promote(t, "Filter")
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t(t) {
                    this.alphaMap = t, this._alphaMap = null, this._mapData = null
                }

                var e = i.extend(t, i.Filter);
                e.clone = function () {
                    var e = new t(this.alphaMap);
                    return e._alphaMap = this._alphaMap, e._mapData = this._mapData, e
                }, e.toString = function () {
                    return "[AlphaMapFilter]"
                }, e._applyFilter = function (t) {
                    if (!this.alphaMap) return !0;
                    if (!this._prepAlphaMap()) return !1;
                    for (var e = t.data, n = this._mapData, i = 0, r = e.length; i < r; i += 4) e[i + 3] = n[i] || 0;
                    return !0
                }, e._prepAlphaMap = function () {
                    if (!this.alphaMap) return !1;
                    if (this.alphaMap == this._alphaMap && this._mapData) return !0;
                    this._mapData = null;
                    var t, e = this._alphaMap = this.alphaMap, n = e;
                    e instanceof HTMLCanvasElement ? t = n.getContext("2d") : (n = i.createCanvas ? i.createCanvas() : document.createElement("canvas"), n.width = e.width, n.height = e.height, t = n.getContext("2d"), t.drawImage(e, 0, 0));
                    try {
                        var r = t.getImageData(0, 0, e.width, e.height)
                    } catch (t) {
                        return !1
                    }
                    return this._mapData = r.data, !0
                }, i.AlphaMapFilter = i.promote(t, "Filter")
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t(t) {
                    this.mask = t
                }

                var e = i.extend(t, i.Filter);
                e.applyFilter = function (t, e, n, i, r, s, a, o) {
                    return !this.mask || (s = s || t, null == a && (a = e), null == o && (o = n), s.save(), t == s && (s.globalCompositeOperation = "destination-in", s.drawImage(this.mask, a, o), s.restore(), !0))
                }, e.clone = function () {
                    return new t(this.mask)
                }, e.toString = function () {
                    return "[AlphaMaskFilter]"
                }, i.AlphaMaskFilter = i.promote(t, "Filter")
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t(t, e, n, i, r, s, a, o) {
                    this.redMultiplier = null != t ? t : 1, this.greenMultiplier = null != e ? e : 1, this.blueMultiplier = null != n ? n : 1, this.alphaMultiplier = null != i ? i : 1, this.redOffset = r || 0, this.greenOffset = s || 0, this.blueOffset = a || 0, this.alphaOffset = o || 0
                }

                var e = i.extend(t, i.Filter);
                e.toString = function () {
                    return "[ColorFilter]"
                }, e.clone = function () {
                    return new t(this.redMultiplier, this.greenMultiplier, this.blueMultiplier, this.alphaMultiplier, this.redOffset, this.greenOffset, this.blueOffset, this.alphaOffset)
                }, e._applyFilter = function (t) {
                    for (var e = t.data, n = e.length, i = 0; i < n; i += 4) e[i] = e[i] * this.redMultiplier + this.redOffset, e[i + 1] = e[i + 1] * this.greenMultiplier + this.greenOffset, e[i + 2] = e[i + 2] * this.blueMultiplier + this.blueOffset, e[i + 3] = e[i + 3] * this.alphaMultiplier + this.alphaOffset;
                    return !0
                }, i.ColorFilter = i.promote(t, "Filter")
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t(t, e, n, i) {
                    this.setColor(t, e, n, i)
                }

                var e = t.prototype;
                t.DELTA_INDEX = [0, .01, .02, .04, .05, .06, .07, .08, .1, .11, .12, .14, .15, .16, .17, .18, .2, .21, .22, .24, .25, .27, .28, .3, .32, .34, .36, .38, .4, .42, .44, .46, .48, .5, .53, .56, .59, .62, .65, .68, .71, .74, .77, .8, .83, .86, .89, .92, .95, .98, 1, 1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66, 1.72, 1.78, 1.84, 1.9, 1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75, 2.87, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7, 7.3, 7.5, 7.8, 8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10], t.IDENTITY_MATRIX = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], t.LENGTH = t.IDENTITY_MATRIX.length, e.setColor = function (t, e, n, i) {
                    return this.reset().adjustColor(t, e, n, i)
                }, e.reset = function () {
                    return this.copy(t.IDENTITY_MATRIX)
                }, e.adjustColor = function (t, e, n, i) {
                    return this.adjustHue(i), this.adjustContrast(e), this.adjustBrightness(t), this.adjustSaturation(n)
                }, e.adjustBrightness = function (t) {
                    return 0 == t || isNaN(t) ? this : (t = this._cleanValue(t, 255), this._multiplyMatrix([1, 0, 0, 0, t, 0, 1, 0, 0, t, 0, 0, 1, 0, t, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]), this)
                }, e.adjustContrast = function (e) {
                    if (0 == e || isNaN(e)) return this;
                    e = this._cleanValue(e, 100);
                    var n;
                    return e < 0 ? n = 127 + e / 100 * 127 : (n = e % 1, n = 0 == n ? t.DELTA_INDEX[e] : t.DELTA_INDEX[e << 0] * (1 - n) + t.DELTA_INDEX[(e << 0) + 1] * n, n = 127 * n + 127), this._multiplyMatrix([n / 127, 0, 0, 0, .5 * (127 - n), 0, n / 127, 0, 0, .5 * (127 - n), 0, 0, n / 127, 0, .5 * (127 - n), 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]), this
                }, e.adjustSaturation = function (t) {
                    if (0 == t || isNaN(t)) return this;
                    t = this._cleanValue(t, 100);
                    var e = 1 + (t > 0 ? 3 * t / 100 : t / 100), n = .3086, i = .6094, r = .082;
                    return this._multiplyMatrix([n * (1 - e) + e, i * (1 - e), r * (1 - e), 0, 0, n * (1 - e), i * (1 - e) + e, r * (1 - e), 0, 0, n * (1 - e), i * (1 - e), r * (1 - e) + e, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]), this
                }, e.adjustHue = function (t) {
                    if (0 == t || isNaN(t)) return this;
                    t = this._cleanValue(t, 180) / 180 * Math.PI;
                    var e = Math.cos(t), n = Math.sin(t), i = .213, r = .715, s = .072;
                    return this._multiplyMatrix([i + e * (1 - i) + n * -i, r + e * -r + n * -r, s + e * -s + n * (1 - s), 0, 0, i + e * -i + .143 * n, r + e * (1 - r) + .14 * n, s + e * -s + n * -.283, 0, 0, i + e * -i + n * -(1 - i), r + e * -r + n * r, s + e * (1 - s) + n * s, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]), this
                }, e.concat = function (e) {
                    return e = this._fixMatrix(e), e.length != t.LENGTH ? this : (this._multiplyMatrix(e), this)
                }, e.clone = function () {
                    return (new t).copy(this)
                }, e.toArray = function () {
                    for (var e = [], n = 0, i = t.LENGTH; n < i; n++) e[n] = this[n];
                    return e
                }, e.copy = function (e) {
                    for (var n = t.LENGTH, i = 0; i < n; i++) this[i] = e[i];
                    return this
                }, e.toString = function () {
                    return "[ColorMatrix]"
                }, e._multiplyMatrix = function (t) {
                    var e, n, i, r = [];
                    for (e = 0; e < 5; e++) {
                        for (n = 0; n < 5; n++) r[n] = this[n + 5 * e];
                        for (n = 0; n < 5; n++) {
                            var s = 0;
                            for (i = 0; i < 5; i++) s += t[n + 5 * i] * r[i];
                            this[n + 5 * e] = s
                        }
                    }
                }, e._cleanValue = function (t, e) {
                    return Math.min(e, Math.max(-e, t))
                }, e._fixMatrix = function (e) {
                    return e instanceof t && (e = e.toArray()), e.length < t.LENGTH ? e = e.slice(0, e.length).concat(t.IDENTITY_MATRIX.slice(e.length, t.LENGTH)) : e.length > t.LENGTH && (e = e.slice(0, t.LENGTH)), e
                }, i.ColorMatrix = t
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t(t) {
                    this.matrix = t
                }

                var e = i.extend(t, i.Filter);
                e.toString = function () {
                    return "[ColorMatrixFilter]"
                }, e.clone = function () {
                    return new t(this.matrix)
                }, e._applyFilter = function (t) {
                    for (var e, n, i, r, s = t.data, a = s.length, o = this.matrix, u = o[0], l = o[1], c = o[2], h = o[3], d = o[4], f = o[5], p = o[6], g = o[7], v = o[8], m = o[9], _ = o[10], y = o[11], b = o[12], w = o[13], x = o[14], T = o[15], E = o[16], S = o[17], L = o[18], P = o[19], C = 0; C < a; C += 4) e = s[C], n = s[C + 1], i = s[C + 2], r = s[C + 3], s[C] = e * u + n * l + i * c + r * h + d, s[C + 1] = e * f + n * p + i * g + r * v + m, s[C + 2] = e * _ + n * y + i * b + r * w + x, s[C + 3] = e * T + n * E + i * S + r * L + P;
                    return !0
                }, i.ColorMatrixFilter = i.promote(t, "Filter")
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t() {
                    throw"Touch cannot be instantiated"
                }

                t.isSupported = function () {
                    return !!("ontouchstart" in window || window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 0 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 0)
                }, t.enable = function (e, n, i) {
                    return !!(e && e.canvas && t.isSupported()) && (!!e.__touch || (e.__touch = {
                        pointers: {},
                        multitouch: !n,
                        preventDefault: !i,
                        count: 0
                    }, "ontouchstart" in window ? t._IOS_enable(e) : (window.navigator.msPointerEnabled || window.navigator.pointerEnabled) && t._IE_enable(e), !0))
                }, t.disable = function (e) {
                    e && ("ontouchstart" in window ? t._IOS_disable(e) : (window.navigator.msPointerEnabled || window.navigator.pointerEnabled) && t._IE_disable(e), delete e.__touch)
                }, t._IOS_enable = function (e) {
                    var n = e.canvas, i = e.__touch.f = function (n) {
                        t._IOS_handleEvent(e, n)
                    };
                    n.addEventListener("touchstart", i, !1), n.addEventListener("touchmove", i, !1), n.addEventListener("touchend", i, !1), n.addEventListener("touchcancel", i, !1)
                }, t._IOS_disable = function (t) {
                    var e = t.canvas;
                    if (e) {
                        var n = t.__touch.f;
                        e.removeEventListener("touchstart", n, !1), e.removeEventListener("touchmove", n, !1), e.removeEventListener("touchend", n, !1), e.removeEventListener("touchcancel", n, !1)
                    }
                }, t._IOS_handleEvent = function (t, e) {
                    if (t) {
                        t.__touch.preventDefault && e.preventDefault && e.preventDefault();
                        for (var n = e.changedTouches, i = e.type, r = 0, s = n.length; r < s; r++) {
                            var a = n[r], o = a.identifier;
                            a.target == t.canvas && ("touchstart" == i ? this._handleStart(t, o, e, a.pageX, a.pageY) : "touchmove" == i ? this._handleMove(t, o, e, a.pageX, a.pageY) : "touchend" != i && "touchcancel" != i || this._handleEnd(t, o, e))
                        }
                    }
                }, t._IE_enable = function (e) {
                    var n = e.canvas, i = e.__touch.f = function (n) {
                        t._IE_handleEvent(e, n)
                    };
                    void 0 === window.navigator.pointerEnabled ? (n.addEventListener("MSPointerDown", i, !1), window.addEventListener("MSPointerMove", i, !1), window.addEventListener("MSPointerUp", i, !1), window.addEventListener("MSPointerCancel", i, !1), e.__touch.preventDefault && (n.style.msTouchAction = "none")) : (n.addEventListener("pointerdown", i, !1), window.addEventListener("pointermove", i, !1), window.addEventListener("pointerup", i, !1), window.addEventListener("pointercancel", i, !1), e.__touch.preventDefault && (n.style.touchAction = "none")), e.__touch.activeIDs = {}
                }, t._IE_disable = function (t) {
                    var e = t.__touch.f;
                    void 0 === window.navigator.pointerEnabled ? (window.removeEventListener("MSPointerMove", e, !1), window.removeEventListener("MSPointerUp", e, !1), window.removeEventListener("MSPointerCancel", e, !1), t.canvas && t.canvas.removeEventListener("MSPointerDown", e, !1)) : (window.removeEventListener("pointermove", e, !1), window.removeEventListener("pointerup", e, !1), window.removeEventListener("pointercancel", e, !1), t.canvas && t.canvas.removeEventListener("pointerdown", e, !1))
                }, t._IE_handleEvent = function (t, e) {
                    if (t) {
                        t.__touch.preventDefault && e.preventDefault && e.preventDefault();
                        var n = e.type, i = e.pointerId, r = t.__touch.activeIDs;
                        if ("MSPointerDown" == n || "pointerdown" == n) {
                            if (e.srcElement != t.canvas) return;
                            r[i] = !0, this._handleStart(t, i, e, e.pageX, e.pageY)
                        } else r[i] && ("MSPointerMove" == n || "pointermove" == n ? this._handleMove(t, i, e, e.pageX, e.pageY) : "MSPointerUp" != n && "MSPointerCancel" != n && "pointerup" != n && "pointercancel" != n || (delete r[i], this._handleEnd(t, i, e)))
                    }
                }, t._handleStart = function (t, e, n, i, r) {
                    var s = t.__touch;
                    if (s.multitouch || !s.count) {
                        var a = s.pointers;
                        a[e] || (a[e] = !0, s.count++, t._handlePointerDown(e, n, i, r))
                    }
                }, t._handleMove = function (t, e, n, i, r) {
                    t.__touch.pointers[e] && t._handlePointerMove(e, n, i, r)
                }, t._handleEnd = function (t, e, n) {
                    var i = t.__touch, r = i.pointers;
                    r[e] && (i.count--, t._handlePointerUp(e, n, !0), delete r[e])
                }, i.Touch = t
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";
                var t = i.EaselJS = i.EaselJS || {};
                t.version = "0.8.1", t.buildDate = "Thu, 21 May 2015 16:17:39 GMT"
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";
                var t = i.PreloadJS = i.PreloadJS || {};
                t.version = "0.6.1", t.buildDate = "Thu, 21 May 2015 16:17:37 GMT"
            }(), this.createjs = this.createjs || {}, i.extend = function (t, e) {
                "use strict";

                function n() {
                    this.constructor = t
                }

                return n.prototype = e.prototype, t.prototype = new n
            }, this.createjs = this.createjs || {}, i.promote = function (t, e) {
                "use strict";
                var n = t.prototype, i = Object.getPrototypeOf && Object.getPrototypeOf(n) || n.__proto__;
                if (i) {
                    n[(e += "_") + "constructor"] = i.constructor;
                    for (var r in i) n.hasOwnProperty(r) && "function" == typeof i[r] && (n[e + r] = i[r])
                }
                return t
            }, this.createjs = this.createjs || {}, i.indexOf = function (t, e) {
                "use strict";
                for (var n = 0, i = t.length; n < i; n++) if (e === t[n]) return n;
                return -1
            }, this.createjs = this.createjs || {}, function () {
                "use strict";
                i.proxy = function (t, e) {
                    var n = Array.prototype.slice.call(arguments, 2);
                    return function () {
                        return t.apply(e, Array.prototype.slice.call(arguments, 0).concat(n))
                    }
                }
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t() {
                    throw"BrowserDetect cannot be instantiated"
                }

                var e = t.agent = window.navigator.userAgent;
                t.isWindowPhone = e.indexOf("IEMobile") > -1 || e.indexOf("Windows Phone") > -1, t.isFirefox = e.indexOf("Firefox") > -1, t.isOpera = null != window.opera, t.isChrome = e.indexOf("Chrome") > -1, t.isIOS = (e.indexOf("iPod") > -1 || e.indexOf("iPhone") > -1 || e.indexOf("iPad") > -1) && !t.isWindowPhone, t.isAndroid = e.indexOf("Android") > -1 && !t.isWindowPhone, t.isBlackberry = e.indexOf("Blackberry") > -1, i.BrowserDetect = t
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t(t, e, n) {
                    this.type = t, this.target = null, this.currentTarget = null, this.eventPhase = 0, this.bubbles = !!e, this.cancelable = !!n, this.timeStamp = (new Date).getTime(), this.defaultPrevented = !1, this.propagationStopped = !1, this.immediatePropagationStopped = !1, this.removed = !1
                }

                var e = t.prototype;
                e.preventDefault = function () {
                    this.defaultPrevented = this.cancelable && !0
                }, e.stopPropagation = function () {
                    this.propagationStopped = !0
                }, e.stopImmediatePropagation = function () {
                    this.immediatePropagationStopped = this.propagationStopped = !0
                }, e.remove = function () {
                    this.removed = !0
                }, e.clone = function () {
                    return new t(this.type, this.bubbles, this.cancelable)
                }, e.set = function (t) {
                    for (var e in t) this[e] = t[e];
                    return this
                }, e.toString = function () {
                    return "[Event (type=" + this.type + ")]"
                }, i.Event = t
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t(t, e, n) {
                    this.Event_constructor("error"), this.title = t, this.message = e, this.data = n
                }

                var e = i.extend(t, i.Event);
                e.clone = function () {
                    return new i.ErrorEvent(this.title, this.message, this.data)
                }, i.ErrorEvent = i.promote(t, "Event")
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t() {
                    this._listeners = null, this._captureListeners = null
                }

                var e = t.prototype;
                t.initialize = function (t) {
                    t.addEventListener = e.addEventListener, t.on = e.on, t.removeEventListener = t.off = e.removeEventListener, t.removeAllEventListeners = e.removeAllEventListeners, t.hasEventListener = e.hasEventListener, t.dispatchEvent = e.dispatchEvent, t._dispatchEvent = e._dispatchEvent, t.willTrigger = e.willTrigger
                }, e.addEventListener = function (t, e, n) {
                    var i;
                    i = n ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
                    var r = i[t];
                    return r && this.removeEventListener(t, e, n), r = i[t], r ? r.push(e) : i[t] = [e], e
                }, e.on = function (t, e, n, i, r, s) {
                    return e.handleEvent && (n = n || e, e = e.handleEvent), n = n || this, this.addEventListener(t, function (t) {
                        e.call(n, t, r), i && t.remove()
                    }, s)
                }, e.removeEventListener = function (t, e, n) {
                    var i = n ? this._captureListeners : this._listeners;
                    if (i) {
                        var r = i[t];
                        if (r) for (var s = 0, a = r.length; s < a; s++) if (r[s] == e) {
                            1 == a ? delete i[t] : r.splice(s, 1);
                            break
                        }
                    }
                }, e.off = e.removeEventListener, e.removeAllEventListeners = function (t) {
                    t ? (this._listeners && delete this._listeners[t], this._captureListeners && delete this._captureListeners[t]) : this._listeners = this._captureListeners = null
                }, e.dispatchEvent = function (t) {
                    if ("string" == typeof t) {
                        var e = this._listeners;
                        if (!e || !e[t]) return !1;
                        t = new i.Event(t)
                    } else t.target && t.clone && (t = t.clone());
                    try {
                        t.target = this
                    } catch (t) {
                    }
                    if (t.bubbles && this.parent) {
                        for (var n = this, r = [n]; n.parent;) r.push(n = n.parent);
                        var s, a = r.length;
                        for (s = a - 1; s >= 0 && !t.propagationStopped; s--) r[s]._dispatchEvent(t, 1 + (0 == s));
                        for (s = 1; s < a && !t.propagationStopped; s++) r[s]._dispatchEvent(t, 3)
                    } else this._dispatchEvent(t, 2);
                    return t.defaultPrevented
                }, e.hasEventListener = function (t) {
                    var e = this._listeners, n = this._captureListeners;
                    return !!(e && e[t] || n && n[t])
                }, e.willTrigger = function (t) {
                    for (var e = this; e;) {
                        if (e.hasEventListener(t)) return !0;
                        e = e.parent
                    }
                    return !1
                }, e.toString = function () {
                    return "[EventDispatcher]"
                }, e._dispatchEvent = function (t, e) {
                    var n, i = 1 == e ? this._captureListeners : this._listeners;
                    if (t && i) {
                        var r = i[t.type];
                        if (!r || !(n = r.length)) return;
                        try {
                            t.currentTarget = this
                        } catch (t) {
                        }
                        try {
                            t.eventPhase = e
                        } catch (t) {
                        }
                        t.removed = !1, r = r.slice();
                        for (var s = 0; s < n && !t.immediatePropagationStopped; s++) {
                            var a = r[s];
                            a.handleEvent ? a.handleEvent(t) : a(t), t.removed && (this.off(t.type, a, 1 == e), t.removed = !1)
                        }
                    }
                }, i.EventDispatcher = t
            }(), this.createjs = this.createjs || {}, function (t) {
                "use strict";

                function e(t, e) {
                    this.Event_constructor("progress"), this.loaded = t, this.total = null == e ? 1 : e, this.progress = 0 == e ? 0 : this.loaded / this.total
                }

                var n = i.extend(e, i.Event);
                n.clone = function () {
                    return new i.ProgressEvent(this.loaded, this.total)
                }, i.ProgressEvent = i.promote(e, "Event")
            }(window), function () {
                function i(t, e) {
                    function n(t) {
                        if (n[t] !== v) return n[t];
                        var i;
                        if ("bug-string-char-index" == t) i = "a" != "a"[0]; else if ("json" == t) i = n("json-stringify") && n("json-parse"); else {
                            var s, o = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                            if ("json-stringify" == t) {
                                var u = e.stringify, c = "function" == typeof u && y;
                                if (c) {
                                    (s = function () {
                                        return 1
                                    }).toJSON = s;
                                    try {
                                        c = "0" === u(0) && "0" === u(new r) && '""' == u(new a) && u(_) === v && u(v) === v && u() === v && "1" === u(s) && "[1]" == u([s]) && "[null]" == u([v]) && "null" == u(null) && "[null,null,null]" == u([v, _, null]) && u({a: [s, !0, !1, null, "\0\b\n\f\r\t"]}) == o && "1" === u(null, s) && "[\n 1,\n 2\n]" == u([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == u(new l((-864e13))) && '"+275760-09-13T00:00:00.000Z"' == u(new l(864e13)) && '"-000001-01-01T00:00:00.000Z"' == u(new l((-621987552e5))) && '"1969-12-31T23:59:59.999Z"' == u(new l((-1)))
                                    } catch (t) {
                                        c = !1
                                    }
                                }
                                i = c
                            }
                            if ("json-parse" == t) {
                                var h = e.parse;
                                if ("function" == typeof h) try {
                                    if (0 === h("0") && !h(!1)) {
                                        s = h(o);
                                        var d = 5 == s.a.length && 1 === s.a[0];
                                        if (d) {
                                            try {
                                                d = !h('"\t"')
                                            } catch (t) {
                                            }
                                            if (d) try {
                                                d = 1 !== h("01")
                                            } catch (t) {
                                            }
                                            if (d) try {
                                                d = 1 !== h("1.")
                                            } catch (t) {
                                            }
                                        }
                                    }
                                } catch (t) {
                                    d = !1
                                }
                                i = d
                            }
                        }
                        return n[t] = !!i
                    }

                    t || (t = o.Object()), e || (e = o.Object());
                    var r = t.Number || o.Number, a = t.String || o.String, u = t.Object || o.Object,
                        l = t.Date || o.Date, c = t.SyntaxError || o.SyntaxError, h = t.TypeError || o.TypeError,
                        d = t.Math || o.Math, f = t.JSON || o.JSON;
                    "object" == typeof f && f && (e.stringify = f.stringify, e.parse = f.parse);
                    var p, g, v, m = u.prototype, _ = m.toString, y = new l((-0xc782b5b800cec));
                    try {
                        y = y.getUTCFullYear() == -109252 && 0 === y.getUTCMonth() && 1 === y.getUTCDate() && 10 == y.getUTCHours() && 37 == y.getUTCMinutes() && 6 == y.getUTCSeconds() && 708 == y.getUTCMilliseconds()
                    } catch (t) {
                    }
                    if (!n("json")) {
                        var b = "[object Function]", w = "[object Date]", x = "[object Number]", T = "[object String]",
                            E = "[object Array]", S = "[object Boolean]", L = n("bug-string-char-index");
                        if (!y) var P = d.floor, C = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
                            A = function (t, e) {
                                return C[e] + 365 * (t - 1970) + P((t - 1969 + (e = +(e > 1))) / 4) - P((t - 1901 + e) / 100) + P((t - 1601 + e) / 400)
                            };
                        if ((p = m.hasOwnProperty) || (p = function (t) {
                                var e, n = {};
                                return (n.__proto__ = null, n.__proto__ = {toString: 1}, n).toString != _ ? p = function (t) {
                                    var e = this.__proto__, n = t in (this.__proto__ = null, this);
                                    return this.__proto__ = e, n
                                } : (e = n.constructor, p = function (t) {
                                    var n = (this.constructor || e).prototype;
                                    return t in this && !(t in n && this[t] === n[t])
                                }), n = null, p.call(this, t)
                            }), g = function (t, e) {
                                var n, i, r, a = 0;
                                (n = function () {
                                    this.valueOf = 0
                                }).prototype.valueOf = 0, i = new n;
                                for (r in i) p.call(i, r) && a++;
                                return n = i = null, a ? g = 2 == a ? function (t, e) {
                                    var n, i = {}, r = _.call(t) == b;
                                    for (n in t) r && "prototype" == n || p.call(i, n) || !(i[n] = 1) || !p.call(t, n) || e(n)
                                } : function (t, e) {
                                    var n, i, r = _.call(t) == b;
                                    for (n in t) r && "prototype" == n || !p.call(t, n) || (i = "constructor" === n) || e(n);
                                    (i || p.call(t, n = "constructor")) && e(n)
                                } : (i = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], g = function (t, e) {
                                    var n, r, a = _.call(t) == b,
                                        o = !a && "function" != typeof t.constructor && s[typeof t.hasOwnProperty] && t.hasOwnProperty || p;
                                    for (n in t) a && "prototype" == n || !o.call(t, n) || e(n);
                                    for (r = i.length; n = i[--r]; o.call(t, n) && e(n)) ;
                                }), g(t, e)
                            }, !n("json-stringify")) {
                            var k = {92: "\\\\", 34: '\\"', 8: "\\b", 12: "\\f", 10: "\\n", 13: "\\r", 9: "\\t"},
                                O = "000000", R = function (t, e) {
                                    return (O + (e || 0)).slice(-t)
                                }, I = "\\u00", M = function (t) {
                                    for (var e = '"', n = 0, i = t.length, r = !L || i > 10, s = r && (L ? t.split("") : t); n < i; n++) {
                                        var a = t.charCodeAt(n);
                                        switch (a) {
                                            case 8:
                                            case 9:
                                            case 10:
                                            case 12:
                                            case 13:
                                            case 34:
                                            case 92:
                                                e += k[a];
                                                break;
                                            default:
                                                if (a < 32) {
                                                    e += I + R(2, a.toString(16));
                                                    break
                                                }
                                                e += r ? s[n] : t.charAt(n)
                                        }
                                    }
                                    return e + '"'
                                }, j = function (t, e, n, i, r, s, a) {
                                    var o, u, l, c, d, f, m, y, b, L, C, k, O, I, D, N;
                                    try {
                                        o = e[t]
                                    } catch (t) {
                                    }
                                    if ("object" == typeof o && o) if (u = _.call(o), u != w || p.call(o, "toJSON")) "function" == typeof o.toJSON && (u != x && u != T && u != E || p.call(o, "toJSON")) && (o = o.toJSON(t)); else if (o > -1 / 0 && o < 1 / 0) {
                                        if (A) {
                                            for (d = P(o / 864e5), l = P(d / 365.2425) + 1970 - 1; A(l + 1, 0) <= d; l++) ;
                                            for (c = P((d - A(l, 0)) / 30.42); A(l, c + 1) <= d; c++) ;
                                            d = 1 + d - A(l, c), f = (o % 864e5 + 864e5) % 864e5, m = P(f / 36e5) % 24, y = P(f / 6e4) % 60, b = P(f / 1e3) % 60, L = f % 1e3
                                        } else l = o.getUTCFullYear(), c = o.getUTCMonth(), d = o.getUTCDate(), m = o.getUTCHours(), y = o.getUTCMinutes(), b = o.getUTCSeconds(), L = o.getUTCMilliseconds();
                                        o = (l <= 0 || l >= 1e4 ? (l < 0 ? "-" : "+") + R(6, l < 0 ? -l : l) : R(4, l)) + "-" + R(2, c + 1) + "-" + R(2, d) + "T" + R(2, m) + ":" + R(2, y) + ":" + R(2, b) + "." + R(3, L) + "Z"
                                    } else o = null;
                                    if (n && (o = n.call(e, t, o)), null === o) return "null";
                                    if (u = _.call(o), u == S) return "" + o;
                                    if (u == x) return o > -1 / 0 && o < 1 / 0 ? "" + o : "null";
                                    if (u == T) return M("" + o);
                                    if ("object" == typeof o) {
                                        for (I = a.length; I--;) if (a[I] === o) throw h();
                                        if (a.push(o), C = [], D = s, s += r, u == E) {
                                            for (O = 0, I = o.length; O < I; O++) k = j(O, o, n, i, r, s, a), C.push(k === v ? "null" : k);
                                            N = C.length ? r ? "[\n" + s + C.join(",\n" + s) + "\n" + D + "]" : "[" + C.join(",") + "]" : "[]"
                                        } else g(i || o, function (t) {
                                            var e = j(t, o, n, i, r, s, a);
                                            e !== v && C.push(M(t) + ":" + (r ? " " : "") + e)
                                        }), N = C.length ? r ? "{\n" + s + C.join(",\n" + s) + "\n" + D + "}" : "{" + C.join(",") + "}" : "{}";
                                        return a.pop(), N
                                    }
                                };
                            e.stringify = function (t, e, n) {
                                var i, r, a, o;
                                if (s[typeof e] && e) if ((o = _.call(e)) == b) r = e; else if (o == E) {
                                    a = {};
                                    for (var u, l = 0, c = e.length; l < c; u = e[l++], o = _.call(u), (o == T || o == x) && (a[u] = 1)) ;
                                }
                                if (n) if ((o = _.call(n)) == x) {
                                    if ((n -= n % 1) > 0) for (i = "", n > 10 && (n = 10); i.length < n; i += " ") ;
                                } else o == T && (i = n.length <= 10 ? n : n.slice(0, 10));
                                return j("", (u = {}, u[""] = t, u), r, a, i, "", [])
                            }
                        }
                        if (!n("json-parse")) {
                            var D, N, F = a.fromCharCode,
                                q = {92: "\\", 34: '"', 47: "/", 98: "\b", 116: "\t", 110: "\n", 102: "\f", 114: "\r"},
                                H = function () {
                                    throw D = N = null, c()
                                }, B = function () {
                                    for (var t, e, n, i, r, s = N, a = s.length; D < a;) switch (r = s.charCodeAt(D)) {
                                        case 9:
                                        case 10:
                                        case 13:
                                        case 32:
                                            D++;
                                            break;
                                        case 123:
                                        case 125:
                                        case 91:
                                        case 93:
                                        case 58:
                                        case 44:
                                            return t = L ? s.charAt(D) : s[D], D++, t;
                                        case 34:
                                            for (t = "@", D++; D < a;) if (r = s.charCodeAt(D), r < 32) H(); else if (92 == r) switch (r = s.charCodeAt(++D)) {
                                                case 92:
                                                case 34:
                                                case 47:
                                                case 98:
                                                case 116:
                                                case 110:
                                                case 102:
                                                case 114:
                                                    t += q[r], D++;
                                                    break;
                                                case 117:
                                                    for (e = ++D, n = D + 4; D < n; D++) r = s.charCodeAt(D), r >= 48 && r <= 57 || r >= 97 && r <= 102 || r >= 65 && r <= 70 || H();
                                                    t += F("0x" + s.slice(e, D));
                                                    break;
                                                default:
                                                    H()
                                            } else {
                                                if (34 == r) break;
                                                for (r = s.charCodeAt(D), e = D; r >= 32 && 92 != r && 34 != r;) r = s.charCodeAt(++D);
                                                t += s.slice(e, D)
                                            }
                                            if (34 == s.charCodeAt(D)) return D++, t;
                                            H();
                                        default:
                                            if (e = D, 45 == r && (i = !0, r = s.charCodeAt(++D)), r >= 48 && r <= 57) {
                                                for (48 == r && (r = s.charCodeAt(D + 1), r >= 48 && r <= 57) && H(), i = !1; D < a && (r = s.charCodeAt(D), r >= 48 && r <= 57); D++) ;
                                                if (46 == s.charCodeAt(D)) {
                                                    for (n = ++D; n < a && (r = s.charCodeAt(n),
                                                    r >= 48 && r <= 57); n++) ;
                                                    n == D && H(), D = n
                                                }
                                                if (r = s.charCodeAt(D), 101 == r || 69 == r) {
                                                    for (r = s.charCodeAt(++D), 43 != r && 45 != r || D++, n = D; n < a && (r = s.charCodeAt(n), r >= 48 && r <= 57); n++) ;
                                                    n == D && H(), D = n
                                                }
                                                return +s.slice(e, D)
                                            }
                                            if (i && H(), "true" == s.slice(D, D + 4)) return D += 4, !0;
                                            if ("false" == s.slice(D, D + 5)) return D += 5, !1;
                                            if ("null" == s.slice(D, D + 4)) return D += 4, null;
                                            H()
                                    }
                                    return "$"
                                }, V = function (t) {
                                    var e, n;
                                    if ("$" == t && H(), "string" == typeof t) {
                                        if ("@" == (L ? t.charAt(0) : t[0])) return t.slice(1);
                                        if ("[" == t) {
                                            for (e = []; t = B(), "]" != t; n || (n = !0)) n && ("," == t ? (t = B(), "]" == t && H()) : H()), "," == t && H(), e.push(V(t));
                                            return e
                                        }
                                        if ("{" == t) {
                                            for (e = {}; t = B(), "}" != t; n || (n = !0)) n && ("," == t ? (t = B(), "}" == t && H()) : H()), "," != t && "string" == typeof t && "@" == (L ? t.charAt(0) : t[0]) && ":" == B() || H(), e[t.slice(1)] = V(B());
                                            return e
                                        }
                                        H()
                                    }
                                    return t
                                }, X = function (t, e, n) {
                                    var i = U(t, e, n);
                                    i === v ? delete t[e] : t[e] = i
                                }, U = function (t, e, n) {
                                    var i, r = t[e];
                                    if ("object" == typeof r && r) if (_.call(r) == E) for (i = r.length; i--;) X(r, i, n); else g(r, function (t) {
                                        X(r, t, n)
                                    });
                                    return n.call(t, e, r)
                                };
                            e.parse = function (t, e) {
                                var n, i;
                                return D = 0, N = "" + t, n = V(B()), "$" != B() && H(), D = N = null, e && _.call(e) == b ? U((i = {}, i[""] = n, i), "", e) : n
                            }
                        }
                    }
                    return e.runInContext = i, e
                }

                var r = "function" == typeof define && define.amd, s = {function: !0, object: !0},
                    a = s[typeof n] && n && !n.nodeType && n, o = s[typeof window] && window || this,
                    u = a && s[typeof e] && e && !e.nodeType && "object" == typeof t && t;
                if (!u || u.global !== u && u.window !== u && u.self !== u || (o = u), a && !r) i(o, a); else {
                    var l = o.JSON, c = o.JSON3, h = !1, d = i(o, o.JSON3 = {
                        noConflict: function () {
                            return h || (h = !0, o.JSON = l, o.JSON3 = c, l = c = null), d
                        }
                    });
                    o.JSON = {parse: d.parse, stringify: d.stringify}
                }
                r && define(function () {
                    return d
                })
            }.call(this), function () {
                var t = {};
                t.appendToHead = function (e) {
                    t.getHead().appendChild(e)
                }, t.getHead = function () {
                    return document.head || document.getElementsByTagName("head")[0]
                }, t.getBody = function () {
                    return document.body || document.getElementsByTagName("body")[0]
                }, i.DomUtils = t
            }(), function () {
                var t = {};
                t.parseXML = function (t, e) {
                    var n = null;
                    try {
                        if (window.DOMParser) {
                            var i = new DOMParser;
                            n = i.parseFromString(t, e)
                        }
                    } catch (t) {
                    }
                    if (!n) try {
                        n = new ActiveXObject("Microsoft.XMLDOM"), n.async = !1, n.loadXML(t)
                    } catch (t) {
                        n = null
                    }
                    return n
                }, t.parseJSON = function (t) {
                    if (null == t) return null;
                    try {
                        return JSON.parse(t)
                    } catch (t) {
                        throw t
                    }
                }, i.DataUtils = t
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t() {
                    this.src = null, this.type = null, this.id = null, this.maintainOrder = !1, this.callback = null, this.data = null, this.method = i.LoadItem.GET, this.values = null, this.headers = null, this.withCredentials = !1, this.mimeType = null, this.crossOrigin = null, this.loadTimeout = n.LOAD_TIMEOUT_DEFAULT
                }

                var e = t.prototype = {}, n = t;
                n.LOAD_TIMEOUT_DEFAULT = 8e3, n.create = function (e) {
                    if ("string" == typeof e) {
                        var i = new t;
                        return i.src = e, i
                    }
                    if (e instanceof n) return e;
                    if (e instanceof Object && e.src) return null == e.loadTimeout && (e.loadTimeout = n.LOAD_TIMEOUT_DEFAULT), e;
                    throw new Error("Type not recognized.")
                }, e.set = function (t) {
                    for (var e in t) this[e] = t[e];
                    return this
                }, i.LoadItem = n
            }(), function () {
                var t = {};
                t.ABSOLUTE_PATT = /^(?:\w+:)?\/{2}/i, t.RELATIVE_PATT = /^[.\/]*?\//i, t.EXTENSION_PATT = /\/?[^\/]+\.(\w{1,5})$/i, t.parseURI = function (e) {
                    var n = {absolute: !1, relative: !1};
                    if (null == e) return n;
                    var i = e.indexOf("?");
                    i > -1 && (e = e.substr(0, i));
                    var r;
                    return t.ABSOLUTE_PATT.test(e) ? n.absolute = !0 : t.RELATIVE_PATT.test(e) && (n.relative = !0), (r = e.match(t.EXTENSION_PATT)) && (n.extension = r[1].toLowerCase()), n
                }, t.formatQueryString = function (t, e) {
                    if (null == t) throw new Error("You must specify data.");
                    var n = [];
                    for (var i in t) n.push(i + "=" + escape(t[i]));
                    return e && (n = n.concat(e)), n.join("&")
                }, t.buildPath = function (t, e) {
                    if (null == e) return t;
                    var n = [], i = t.indexOf("?");
                    if (i != -1) {
                        var r = t.slice(i + 1);
                        n = n.concat(r.split("&"))
                    }
                    return i != -1 ? t.slice(0, i) + "?" + this._formatQueryString(e, n) : t + "?" + this._formatQueryString(e, n)
                }, t.isCrossDomain = function (t) {
                    var e = document.createElement("a");
                    e.href = t.src;
                    var n = document.createElement("a");
                    n.href = location.href;
                    var i = "" != e.hostname && (e.port != n.port || e.protocol != n.protocol || e.hostname != n.hostname);
                    return i
                }, t.isLocal = function (t) {
                    var e = document.createElement("a");
                    return e.href = t.src, "" == e.hostname && "file:" == e.protocol
                }, t.isBinary = function (t) {
                    switch (t) {
                        case i.AbstractLoader.IMAGE:
                        case i.AbstractLoader.BINARY:
                            return !0;
                        default:
                            return !1
                    }
                }, t.isImageTag = function (t) {
                    return t instanceof HTMLImageElement
                }, t.isAudioTag = function (t) {
                    return !!window.HTMLAudioElement && t instanceof HTMLAudioElement
                }, t.isVideoTag = function (t) {
                    return !!window.HTMLVideoElement && t instanceof HTMLVideoElement
                }, t.isText = function (t) {
                    switch (t) {
                        case i.AbstractLoader.TEXT:
                        case i.AbstractLoader.JSON:
                        case i.AbstractLoader.MANIFEST:
                        case i.AbstractLoader.XML:
                        case i.AbstractLoader.CSS:
                        case i.AbstractLoader.SVG:
                        case i.AbstractLoader.JAVASCRIPT:
                        case i.AbstractLoader.SPRITESHEET:
                            return !0;
                        default:
                            return !1
                    }
                }, t.getTypeByExtension = function (t) {
                    if (null == t) return i.AbstractLoader.TEXT;
                    switch (t.toLowerCase()) {
                        case"jpeg":
                        case"jpg":
                        case"gif":
                        case"png":
                        case"webp":
                        case"bmp":
                            return i.AbstractLoader.IMAGE;
                        case"ogg":
                        case"mp3":
                        case"webm":
                            return i.AbstractLoader.SOUND;
                        case"mp4":
                        case"webm":
                        case"ts":
                            return i.AbstractLoader.VIDEO;
                        case"json":
                            return i.AbstractLoader.JSON;
                        case"xml":
                            return i.AbstractLoader.XML;
                        case"css":
                            return i.AbstractLoader.CSS;
                        case"js":
                            return i.AbstractLoader.JAVASCRIPT;
                        case"svg":
                            return i.AbstractLoader.SVG;
                        default:
                            return i.AbstractLoader.TEXT
                    }
                }, i.RequestUtils = t
            }(), this.createjs = this.createjs || {}, function () {
                "use strict";

                function t(t, e, n) {
                    this.EventDispatcher_constructor(), this.loaded = !1, this.canceled = !1, this.progress = 0, this.type = n, this.resultFormatter = null, t ? this._item = i.LoadItem.create(t) : this._item = null, this._preferXHR = e, this._result = null, this._rawResult = null, this._loadedItems = null, this._tagSrcAttribute = null, this._tag = null
                }

                var e = i.extend(t, i.EventDispatcher), n = t;
                n.POST = "POST", n.GET = "GET", n.BINARY = "binary", n.CSS = "css", n.IMAGE = "image", n.JAVASCRIPT = "javascript", n.JSON = "json", n.JSONP = "jsonp", n.MANIFEST = "manifest", n.SOUND = "sound", n.VIDEO = "video", n.SPRITESHEET = "spritesheet", n.SVG = "svg", n.TEXT = "text", n.XML = "xml", e.getItem = function () {
                    return this._item
                }, e.getResult = function (t) {
                    return t ? this._rawResult : this._result
                }, e.getTag = function () {
                    return this._tag
                }, e.setTag = function (t) {
                    this._tag = t
                }, e.load = function () {
                    this._createRequest(), this._request.on("complete", this, this), this._request.on("progress", this, this), this._request.on("loadStart", this, this), this._request.on("abort", this, this), this._request.on("timeout", this, this), this._request.on("error", this, this);
                    var t = new i.Event("initialize");
                    t.loader = this._request, this.dispatchEvent(t), this._request.load()
                }, e.cancel = function () {
                    this.canceled = !0, this.destroy()
                }, e.destroy = function () {
                    this._request && (this._request.removeAllEventListeners(), this._request.destroy()), this._request = null, this._item = null, this._rawResult = null, this._result = null, this._loadItems = null, this.removeAllEventListeners()
                }, e.getLoadedItems = function () {
                    return this._loadedItems
                }, e._createRequest = function () {
                    this._preferXHR ? this._request = new i.XHRRequest(this._item) : this._request = new i.TagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute)
                }, e._createTag = function (t) {
                    return null
                }, e._sendLoadStart = function () {
                    this._isCanceled() || this.dispatchEvent("loadstart")
                }, e._sendProgress = function (t) {
                    if (!this._isCanceled()) {
                        var e = null;
                        "number" == typeof t ? (this.progress = t, e = new i.ProgressEvent(this.progress)) : (e = t, this.progress = t.loaded / t.total, e.progress = this.progress, (isNaN(this.progress) || this.progress == 1 / 0) && (this.progress = 0)), this.hasEventListener("progress") && this.dispatchEvent(e)
                    }
                }, e._sendComplete = function () {
                    if (!this._isCanceled()) {
                        this.loaded = !0;
                        var t = new i.Event("complete");
                        t.rawResult = this._rawResult, null != this._result && (t.result = this._result), this.dispatchEvent(t)
                    }
                }, e._sendError = function (t) {
                    !this._isCanceled() && this.hasEventListener("error") && (null == t && (t = new i.ErrorEvent("PRELOAD_ERROR_EMPTY")), this.dispatchEvent(t))
                }, e._isCanceled = function () {
                    return !(null != window.createjs && !this.canceled)
                }, e.resultFormatter = null, e.handleEvent = function (t) {
                    switch (t.type) {
                        case"complete":
                            this._rawResult = t.target._response;
                            var e = this.resultFormatter && this.resultFormatter(this), n = this;
                            e instanceof Function ? e(function (t) {
                                n._result = t, n._sendComplete()
                            }) : (this._result = e || this._rawResult, this._sendComplete());
                            break;
                        case"progress":
                            this._sendProgress(t);
                            break;
                        case"error":
                            this._sendError(t);
                            break;
                        case"loadstart":
                            this._sendLoadStart();
                            break;
                        case"abort":
                        case"timeout":
                            this._isCanceled() || this.dispatchEvent(t.type)
                    }
                }, e.buildPath = function (t, e) {
                    return i.RequestUtils.buildPath(t, e)
                }, e.toString = function () {
                    return "[PreloadJS AbstractLoader]"
                }, i.AbstractLoader = i.promote(t, "EventDispatcher")
            }(), this.createjs = this.createjs || {},function () {
                "use strict";

                function t(t, e, n) {
                    this.AbstractLoader_constructor(t, e, n), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "src"
                }

                var e = i.extend(t, i.AbstractLoader);
                e.load = function () {
                    this._tag || (this._tag = this._createTag(this._item.src)), this._tag.preload = "auto", this._tag.load(), this.AbstractLoader_load()
                }, e._createTag = function () {
                }, e._createRequest = function () {
                    this._preferXHR ? this._request = new i.XHRRequest(this._item) : this._request = new i.MediaTagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute)
                }, e._formatResult = function (t) {
                    return this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler), this._tag.onstalled = null, this._preferXHR && (t.getTag().src = t.getResult(!0)), t.getTag()
                }, i.AbstractMediaLoader = i.promote(t, "AbstractLoader")
            }(),this.createjs = this.createjs || {},function () {
                "use strict";
                var t = function (t) {
                    this._item = t
                }, e = i.extend(t, i.EventDispatcher);
                e.load = function () {
                }, e.destroy = function () {
                }, e.cancel = function () {
                }, i.AbstractRequest = i.promote(t, "EventDispatcher")
            }(),this.createjs = this.createjs || {},function () {
                "use strict";

                function t(t, e, n) {
                    this.AbstractRequest_constructor(t), this._tag = e, this._tagSrcAttribute = n, this._loadedHandler = i.proxy(this._handleTagComplete, this), this._addedToDOM = !1, this._startTagVisibility = null
                }

                var e = i.extend(t, i.AbstractRequest);
                e.load = function () {
                    this._tag.onload = i.proxy(this._handleTagComplete, this), this._tag.onreadystatechange = i.proxy(this._handleReadyStateChange, this), this._tag.onerror = i.proxy(this._handleError, this);
                    var t = new i.Event("initialize");
                    t.loader = this._tag, this.dispatchEvent(t), this._hideTag(), this._loadTimeout = setTimeout(i.proxy(this._handleTimeout, this), this._item.loadTimeout), this._tag[this._tagSrcAttribute] = this._item.src, null == this._tag.parentNode && (window.document.body.appendChild(this._tag), this._addedToDOM = !0)
                }, e.destroy = function () {
                    this._clean(), this._tag = null, this.AbstractRequest_destroy()
                }, e._handleReadyStateChange = function () {
                    clearTimeout(this._loadTimeout);
                    var t = this._tag;
                    "loaded" != t.readyState && "complete" != t.readyState || this._handleTagComplete()
                }, e._handleError = function () {
                    this._clean(), this.dispatchEvent("error")
                }, e._handleTagComplete = function () {
                    this._rawResult = this._tag, this._result = this.resultFormatter && this.resultFormatter(this) || this._rawResult, this._clean(), this._showTag(), this.dispatchEvent("complete")
                }, e._handleTimeout = function () {
                    this._clean(), this.dispatchEvent(new i.Event("timeout"))
                }, e._clean = function () {
                    this._tag.onload = null, this._tag.onreadystatechange = null, this._tag.onerror = null, this._addedToDOM && null != this._tag.parentNode && this._tag.parentNode.removeChild(this._tag), clearTimeout(this._loadTimeout)
                }, e._hideTag = function () {
                    this._startTagVisibility = this._tag.style.visibility, this._tag.style.visibility = "hidden"
                }, e._showTag = function () {
                    this._tag.style.visibility = this._startTagVisibility
                }, e._handleStalled = function () {
                }, i.TagRequest = i.promote(t, "AbstractRequest")
            }(),this.createjs = this.createjs || {},function () {
                "use strict";

                function t(t, e, n) {
                    this.AbstractRequest_constructor(t), this._tag = e, this._tagSrcAttribute = n, this._loadedHandler = i.proxy(this._handleTagComplete, this)
                }

                var e = i.extend(t, i.TagRequest);
                e.load = function () {
                    var t = i.proxy(this._handleStalled, this);
                    this._stalledCallback = t;
                    var e = i.proxy(this._handleProgress, this);
                    this._handleProgress = e, this._tag.addEventListener("stalled", t), this._tag.addEventListener("progress", e), this._tag.addEventListener && this._tag.addEventListener("canplaythrough", this._loadedHandler, !1), this.TagRequest_load()
                }, e._handleReadyStateChange = function () {
                    clearTimeout(this._loadTimeout);
                    var t = this._tag;
                    "loaded" != t.readyState && "complete" != t.readyState || this._handleTagComplete()
                }, e._handleStalled = function () {
                }, e._handleProgress = function (t) {
                    if (t && !(t.loaded > 0 && 0 == t.total)) {
                        var e = new i.ProgressEvent(t.loaded, t.total);
                        this.dispatchEvent(e)
                    }
                }, e._clean = function () {
                    this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler), this._tag.removeEventListener("stalled", this._stalledCallback), this._tag.removeEventListener("progress", this._progressCallback), this.TagRequest__clean()
                }, i.MediaTagRequest = i.promote(t, "TagRequest")
            }(),this.createjs = this.createjs || {},function () {
                "use strict";

                function t(t) {
                    this.AbstractRequest_constructor(t), this._request = null, this._loadTimeout = null, this._xhrLevel = 1, this._response = null, this._rawResponse = null, this._canceled = !1, this._handleLoadStartProxy = i.proxy(this._handleLoadStart, this), this._handleProgressProxy = i.proxy(this._handleProgress, this), this._handleAbortProxy = i.proxy(this._handleAbort, this), this._handleErrorProxy = i.proxy(this._handleError, this), this._handleTimeoutProxy = i.proxy(this._handleTimeout, this), this._handleLoadProxy = i.proxy(this._handleLoad, this), this._handleReadyStateChangeProxy = i.proxy(this._handleReadyStateChange, this), !this._createXHR(t)
                }

                var e = i.extend(t, i.AbstractRequest);
                t.ACTIVEX_VERSIONS = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], e.getResult = function (t) {
                    return t && this._rawResponse ? this._rawResponse : this._response
                }, e.cancel = function () {
                    this.canceled = !0, this._clean(), this._request.abort()
                }, e.load = function () {
                    if (null == this._request) return void this._handleError();
                    null != this._request.addEventListener ? (this._request.addEventListener("loadstart", this._handleLoadStartProxy, !1), this._request.addEventListener("progress", this._handleProgressProxy, !1), this._request.addEventListener("abort", this._handleAbortProxy, !1), this._request.addEventListener("error", this._handleErrorProxy, !1), this._request.addEventListener("timeout", this._handleTimeoutProxy, !1), this._request.addEventListener("load", this._handleLoadProxy, !1), this._request.addEventListener("readystatechange", this._handleReadyStateChangeProxy, !1)) : (this._request.onloadstart = this._handleLoadStartProxy, this._request.onprogress = this._handleProgressProxy, this._request.onabort = this._handleAbortProxy, this._request.onerror = this._handleErrorProxy, this._request.ontimeout = this._handleTimeoutProxy, this._request.onload = this._handleLoadProxy, this._request.onreadystatechange = this._handleReadyStateChangeProxy), 1 == this._xhrLevel && (this._loadTimeout = setTimeout(i.proxy(this._handleTimeout, this), this._item.loadTimeout));
                    try {
                        this._item.values && this._item.method != i.AbstractLoader.GET ? this._item.method == i.AbstractLoader.POST && this._request.send(i.RequestUtils.formatQueryString(this._item.values)) : this._request.send()
                    } catch (t) {
                        this.dispatchEvent(new i.ErrorEvent("XHR_SEND", null, t))
                    }
                }, e.setResponseType = function (t) {
                    "blob" === t && (t = window.URL ? "blob" : "arraybuffer", this._responseType = t), this._request.responseType = t
                }, e.getAllResponseHeaders = function () {
                    return this._request.getAllResponseHeaders instanceof Function ? this._request.getAllResponseHeaders() : null
                }, e.getResponseHeader = function (t) {
                    return this._request.getResponseHeader instanceof Function ? this._request.getResponseHeader(t) : null
                }, e._handleProgress = function (t) {
                    if (t && !(t.loaded > 0 && 0 == t.total)) {
                        var e = new i.ProgressEvent(t.loaded, t.total);
                        this.dispatchEvent(e)
                    }
                }, e._handleLoadStart = function (t) {
                    clearTimeout(this._loadTimeout), this.dispatchEvent("loadstart")
                }, e._handleAbort = function (t) {
                    this._clean(), this.dispatchEvent(new i.ErrorEvent("XHR_ABORTED", null, t))
                }, e._handleError = function (t) {
                    this._clean(), this.dispatchEvent(new i.ErrorEvent(t.message))
                }, e._handleReadyStateChange = function (t) {
                    4 == this._request.readyState && this._handleLoad()
                }, e._handleLoad = function (t) {
                    if (!this.loaded) {
                        this.loaded = !0;
                        var e = this._checkError();
                        if (e) return void this._handleError(e);
                        if (this._response = this._getResponse(), "arraybuffer" === this._responseType) try {
                            this._response = new Blob([this._response])
                        } catch (t) {
                            if (window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, "TypeError" === t.name && window.BlobBuilder) {
                                var n = new BlobBuilder;
                                n.append(this._response), this._response = n.getBlob()
                            }
                        }
                        this._clean(), this.dispatchEvent(new i.Event("complete"))
                    }
                }, e._handleTimeout = function (t) {
                    this._clean(), this.dispatchEvent(new i.ErrorEvent("PRELOAD_TIMEOUT", null, t))
                }, e._checkError = function () {
                    var t = parseInt(this._request.status);
                    switch (t) {
                        case 404:
                        case 0:
                            return new Error(t)
                    }
                    return null
                }, e._getResponse = function () {
                    if (null != this._response) return this._response;
                    if (null != this._request.response) return this._request.response;
                    try {
                        if (null != this._request.responseText) return this._request.responseText
                    } catch (t) {
                    }
                    try {
                        if (null != this._request.responseXML) return this._request.responseXML
                    } catch (t) {
                    }
                    return null
                }, e._createXHR = function (t) {
                    var e = i.RequestUtils.isCrossDomain(t), n = {}, r = null;
                    if (window.XMLHttpRequest) r = new XMLHttpRequest, e && void 0 === r.withCredentials && window.XDomainRequest && (r = new XDomainRequest); else {
                        for (var a = 0, o = s.ACTIVEX_VERSIONS.length; a < o; a++) {
                            var u = s.ACTIVEX_VERSIONS[a];
                            try {
                                r = new ActiveXObject(u);
                                break
                            } catch (t) {
                            }
                        }
                        if (null == r) return !1
                    }
                    null == t.mimeType && i.RequestUtils.isText(t.type) && (t.mimeType = "text/plain; charset=utf-8"), t.mimeType && r.overrideMimeType && r.overrideMimeType(t.mimeType), this._xhrLevel = "string" == typeof r.responseType ? 2 : 1;
                    var l = null;
                    if (l = t.method == i.AbstractLoader.GET ? i.RequestUtils.buildPath(t.src, t.values) : t.src, r.open(t.method || i.AbstractLoader.GET, l, !0), e && r instanceof XMLHttpRequest && 1 == this._xhrLevel && (n.Origin = location.origin), t.values && t.method == i.AbstractLoader.POST && (n["Content-Type"] = "application/x-www-form-urlencoded"), e || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest"), t.headers) for (var c in t.headers) n[c] = t.headers[c];
                    for (c in n) r.setRequestHeader(c, n[c]);
                    return r instanceof XMLHttpRequest && void 0 !== t.withCredentials && (r.withCredentials = t.withCredentials), this._request = r, !0
                }, e._clean = function () {
                    clearTimeout(this._loadTimeout), null != this._request.removeEventListener ? (this._request.removeEventListener("loadstart", this._handleLoadStartProxy), this._request.removeEventListener("progress", this._handleProgressProxy), this._request.removeEventListener("abort", this._handleAbortProxy), this._request.removeEventListener("error", this._handleErrorProxy), this._request.removeEventListener("timeout", this._handleTimeoutProxy), this._request.removeEventListener("load", this._handleLoadProxy), this._request.removeEventListener("readystatechange", this._handleReadyStateChangeProxy)) : (this._request.onloadstart = null, this._request.onprogress = null, this._request.onabort = null, this._request.onerror = null, this._request.ontimeout = null, this._request.onload = null, this._request.onreadystatechange = null)
                }, e.toString = function () {
                    return "[PreloadJS XHRRequest]"
                }, i.XHRRequest = i.promote(t, "AbstractRequest")
            }(),this.createjs = this.createjs || {},function () {
                "use strict";

                function t(t, e, n) {
                    this.AbstractLoader_constructor(), this._plugins = [], this._typeCallbacks = {}, this._extensionCallbacks = {}, this.next = null, this.maintainScriptOrder = !0, this.stopOnError = !1, this._maxConnections = 1, this._availableLoaders = [i.ImageLoader, i.JavaScriptLoader, i.CSSLoader, i.JSONLoader, i.JSONPLoader, i.SoundLoader, i.ManifestLoader, i.SpriteSheetLoader, i.XMLLoader, i.SVGLoader, i.BinaryLoader, i.VideoLoader, i.TextLoader], this._defaultLoaderLength = this._availableLoaders.length, this.init(t, e, n)
                }

                var e = i.extend(t, i.AbstractLoader), n = t;
                e.init = function (t, e, n) {
                    this.useXHR = !0, this.preferXHR = !0, this._preferXHR = !0, this.setPreferXHR(t), this._paused = !1, this._basePath = e, this._crossOrigin = n, this._loadStartWasDispatched = !1, this._currentlyLoadingScript = null, this._currentLoads = [], this._loadQueue = [], this._loadQueueBackup = [], this._loadItemsById = {}, this._loadItemsBySrc = {}, this._loadedResults = {}, this._loadedRawResults = {}, this._numItems = 0, this._numItemsLoaded = 0, this._scriptOrder = [], this._loadedScripts = [], this._lastProgress = NaN
                }, n.loadTimeout = 8e3, n.LOAD_TIMEOUT = 0, n.BINARY = i.AbstractLoader.BINARY, n.CSS = i.AbstractLoader.CSS, n.IMAGE = i.AbstractLoader.IMAGE, n.JAVASCRIPT = i.AbstractLoader.JAVASCRIPT, n.JSON = i.AbstractLoader.JSON, n.JSONP = i.AbstractLoader.JSONP, n.MANIFEST = i.AbstractLoader.MANIFEST, n.SOUND = i.AbstractLoader.SOUND, n.VIDEO = i.AbstractLoader.VIDEO, n.SVG = i.AbstractLoader.SVG, n.TEXT = i.AbstractLoader.TEXT, n.XML = i.AbstractLoader.XML, n.POST = i.AbstractLoader.POST, n.GET = i.AbstractLoader.GET, e.registerLoader = function (t) {
                    if (!t || !t.canLoadItem) throw new Error("loader is of an incorrect type.");
                    if (this._availableLoaders.indexOf(t) != -1) throw new Error("loader already exists.");
                    this._availableLoaders.unshift(t)
                }, e.unregisterLoader = function (t) {
                    var e = this._availableLoaders.indexOf(t);
                    e != -1 && e < this._defaultLoaderLength - 1 && this._availableLoaders.splice(e, 1)
                }, e.setUseXHR = function (t) {
                    return this.setPreferXHR(t)
                }, e.setPreferXHR = function (t) {
                    return this.preferXHR = 0 != t && null != window.XMLHttpRequest, this.preferXHR
                }, e.removeAll = function () {
                    this.remove()
                }, e.remove = function (t) {
                    var e = null;
                    if (!t || t instanceof Array) {
                        if (t) e = t; else if (arguments.length > 0) return
                    } else e = [t];
                    var n = !1;
                    if (e) {
                        for (; e.length;) {
                            var i = e.pop(), r = this.getResult(i);
                            for (s = this._loadQueue.length - 1; s >= 0; s--) if (a = this._loadQueue[s].getItem(), a.id == i || a.src == i) {
                                this._loadQueue.splice(s, 1)[0].cancel();
                                break
                            }
                            for (s = this._loadQueueBackup.length - 1; s >= 0; s--) if (a = this._loadQueueBackup[s].getItem(), a.id == i || a.src == i) {
                                this._loadQueueBackup.splice(s, 1)[0].cancel();
                                break
                            }
                            if (r) this._disposeItem(this.getItem(i)); else for (var s = this._currentLoads.length - 1; s >= 0; s--) {
                                var a = this._currentLoads[s].getItem();
                                if (a.id == i || a.src == i) {
                                    this._currentLoads.splice(s, 1)[0].cancel(), n = !0;
                                    break
                                }
                            }
                        }
                        n && this._loadNext()
                    } else {
                        this.close();
                        for (var o in this._loadItemsById) this._disposeItem(this._loadItemsById[o]);
                        this.init(this.preferXHR, this._basePath)
                    }
                }, e.reset = function () {
                    this.close();
                    for (var t in this._loadItemsById) this._disposeItem(this._loadItemsById[t]);
                    for (var e = [], n = 0, i = this._loadQueueBackup.length; n < i; n++) e.push(this._loadQueueBackup[n].getItem());
                    this.loadManifest(e, !1)
                }, e.installPlugin = function (t) {
                    if (null != t && null != t.getPreloadHandlers) {
                        this._plugins.push(t);
                        var e = t.getPreloadHandlers();
                        if (e.scope = t, null != e.types) for (var n = 0, i = e.types.length; n < i; n++) this._typeCallbacks[e.types[n]] = e;
                        if (null != e.extensions) for (n = 0, i = e.extensions.length; n < i; n++) this._extensionCallbacks[e.extensions[n]] = e
                    }
                }, e.setMaxConnections = function (t) {
                    this._maxConnections = t, !this._paused && this._loadQueue.length > 0 && this._loadNext()
                }, e.loadFile = function (t, e, n) {
                    if (null == t) {
                        var r = new i.ErrorEvent("PRELOAD_NO_FILE");
                        return void this._sendError(r)
                    }
                    this._addItem(t, null, n), e !== !1 ? this.setPaused(!1) : this.setPaused(!0)
                }, e.loadManifest = function (t, e, r) {
                    var s = null, a = null;
                    if (t instanceof Array) {
                        if (0 == t.length) {
                            var o = new i.ErrorEvent("PRELOAD_MANIFEST_EMPTY");
                            return void this._sendError(o)
                        }
                        s = t
                    } else if ("string" == typeof t) s = [{src: t, type: n.MANIFEST}]; else {
                        if ("object" != typeof t) {
                            var o = new i.ErrorEvent("PRELOAD_MANIFEST_NULL");
                            return void this._sendError(o)
                        }
                        if (void 0 !== t.src) {
                            if (null == t.type) t.type = n.MANIFEST; else if (t.type != n.MANIFEST) {
                                var o = new i.ErrorEvent("PRELOAD_MANIFEST_TYPE");
                                this._sendError(o)
                            }
                            s = [t]
                        } else void 0 !== t.manifest && (s = t.manifest, a = t.path)
                    }
                    for (var u = 0, l = s.length; u < l; u++) this._addItem(s[u], a, r);
                    e !== !1 ? this.setPaused(!1) : this.setPaused(!0)
                }, e.load = function () {
                    this.setPaused(!1)
                }, e.getItem = function (t) {
                    return this._loadItemsById[t] || this._loadItemsBySrc[t]
                }, e.getResult = function (t, e) {
                    var n = this._loadItemsById[t] || this._loadItemsBySrc[t];
                    if (null == n) return null;
                    var i = n.id;
                    return e && this._loadedRawResults[i] ? this._loadedRawResults[i] : this._loadedResults[i]
                }, e.getItems = function (t) {
                    var e = [];
                    for (var n in this._loadItemsById) {
                        var i = this._loadItemsById[n], r = this.getResult(n);
                        t === !0 && null == r || e.push({item: i, result: r, rawResult: this.getResult(n, !0)})
                    }
                    return e
                }, e.setPaused = function (t) {
                    this._paused = t, this._paused || this._loadNext()
                }, e.close = function () {
                    for (; this._currentLoads.length;) this._currentLoads.pop().cancel();
                    this._scriptOrder.length = 0, this._loadedScripts.length = 0, this.loadStartWasDispatched = !1, this._itemCount = 0, this._lastProgress = NaN
                }, e._addItem = function (t, e, n) {
                    var r = this._createLoadItem(t, e, n);
                    if (null != r) {
                        var s = this._createLoader(r);
                        null != s && ("plugins" in s && (s.plugins = this._plugins), r._loader = s, this._loadQueue.push(s), this._loadQueueBackup.push(s), this._numItems++, this._updateProgress(), (this.maintainScriptOrder && r.type == i.LoadQueue.JAVASCRIPT || r.maintainOrder === !0) && (this._scriptOrder.push(r), this._loadedScripts.push(null)))
                    }
                }, e._createLoadItem = function (t, e, n) {
                    var r = i.LoadItem.create(t);
                    if (null == r) return null;
                    var s = "", a = n || this._basePath;
                    if (r.src instanceof Object) {
                        if (!r.type) return null;
                        if (e) {
                            s = e;
                            var o = i.RequestUtils.parseURI(e);
                            null == a || o.absolute || o.relative || (s = a + s)
                        } else null != a && (s = a)
                    } else {
                        var u = i.RequestUtils.parseURI(r.src);
                        u.extension && (r.ext = u.extension), null == r.type && (r.type = i.RequestUtils.getTypeByExtension(r.ext));
                        var l = r.src;
                        if (!u.absolute && !u.relative) if (e) {
                            s = e;
                            var o = i.RequestUtils.parseURI(e);
                            l = e + l, null == a || o.absolute || o.relative || (s = a + s)
                        } else null != a && (s = a);
                        r.src = s + r.src
                    }
                    r.path = s, void 0 !== r.id && null !== r.id && "" !== r.id || (r.id = l);
                    var c = this._typeCallbacks[r.type] || this._extensionCallbacks[r.ext];
                    if (c) {
                        var h = c.callback.call(c.scope, r, this);
                        if (h === !1) return null;
                        h === !0 || null != h && (r._loader = h), u = i.RequestUtils.parseURI(r.src), null != u.extension && (r.ext = u.extension)
                    }
                    return this._loadItemsById[r.id] = r, this._loadItemsBySrc[r.src] = r, null == r.crossOrigin && (r.crossOrigin = this._crossOrigin), r
                }, e._createLoader = function (t) {
                    if (null != t._loader) return t._loader;
                    for (var e = this.preferXHR, n = 0; n < this._availableLoaders.length; n++) {
                        var i = this._availableLoaders[n];
                        if (i && i.canLoadItem(t)) return new i(t, e)
                    }
                    return null
                }, e._loadNext = function () {
                    if (!this._paused) {
                        this._loadStartWasDispatched || (this._sendLoadStart(), this._loadStartWasDispatched = !0), this._numItems == this._numItemsLoaded ? (this.loaded = !0, this._sendComplete(), this.next && this.next.load && this.next.load()) : this.loaded = !1;
                        for (var t = 0; t < this._loadQueue.length && !(this._currentLoads.length >= this._maxConnections); t++) {
                            var e = this._loadQueue[t];
                            this._canStartLoad(e) && (this._loadQueue.splice(t, 1), t--, this._loadItem(e))
                        }
                    }
                }, e._loadItem = function (t) {
                    t.on("fileload", this._handleFileLoad, this), t.on("progress", this._handleProgress, this), t.on("complete", this._handleFileComplete, this), t.on("error", this._handleError, this), t.on("fileerror", this._handleFileError, this), this._currentLoads.push(t), this._sendFileStart(t.getItem()), t.load()
                }, e._handleFileLoad = function (t) {
                    t.target = null, this.dispatchEvent(t)
                }, e._handleFileError = function (t) {
                    var e = new i.ErrorEvent("FILE_LOAD_ERROR", null, t.item);
                    this._sendError(e)
                }, e._handleError = function (t) {
                    var e = t.target;
                    this._numItemsLoaded++, this._finishOrderedItem(e, !0), this._updateProgress();
                    var n = new i.ErrorEvent("FILE_LOAD_ERROR", null, e.getItem());
                    this._sendError(n), this.stopOnError ? this.setPaused(!0) : (this._removeLoadItem(e), this._cleanLoadItem(e), this._loadNext())
                }, e._handleFileComplete = function (t) {
                    var e = t.target, n = e.getItem(), i = e.getResult();
                    this._loadedResults[n.id] = i;
                    var r = e.getResult(!0);
                    null != r && r !== i && (this._loadedRawResults[n.id] = r), this._saveLoadedItems(e), this._removeLoadItem(e), this._finishOrderedItem(e) || this._processFinishedLoad(n, e), this._cleanLoadItem(e)
                }, e._saveLoadedItems = function (t) {
                    var e = t.getLoadedItems();
                    if (null !== e) for (var n = 0; n < e.length; n++) {
                        var i = e[n].item;
                        this._loadItemsBySrc[i.src] = i, this._loadItemsById[i.id] = i, this._loadedResults[i.id] = e[n].result, this._loadedRawResults[i.id] = e[n].rawResult
                    }
                }, e._finishOrderedItem = function (t, e) {
                    var n = t.getItem();
                    if (this.maintainScriptOrder && n.type == i.LoadQueue.JAVASCRIPT || n.maintainOrder) {
                        t instanceof i.JavaScriptLoader && (this._currentlyLoadingScript = !1);
                        var r = i.indexOf(this._scriptOrder, n);
                        return r != -1 && (this._loadedScripts[r] = e === !0 || n, this._checkScriptLoadOrder(), !0)
                    }
                    return !1
                }, e._checkScriptLoadOrder = function () {
                    for (var t = this._loadedScripts.length, e = 0; e < t; e++) {
                        var n = this._loadedScripts[e];
                        if (null === n) break;
                        if (n !== !0) {
                            var r = this._loadedResults[n.id];
                            n.type == i.LoadQueue.JAVASCRIPT && i.DomUtils.appendToHead(r);
                            var s = n._loader;
                            this._processFinishedLoad(n, s), this._loadedScripts[e] = !0
                        }
                    }
                }, e._processFinishedLoad = function (t, e) {
                    this._numItemsLoaded++, this.maintainScriptOrder || t.type != i.LoadQueue.JAVASCRIPT || i.DomUtils.appendToHead(t.result), this._updateProgress(), this._sendFileComplete(t, e), this._loadNext()
                }, e._canStartLoad = function (t) {
                    if (!this.maintainScriptOrder || t.preferXHR) return !0;
                    var e = t.getItem();
                    if (e.type != i.LoadQueue.JAVASCRIPT) return !0;
                    if (this._currentlyLoadingScript) return !1;
                    for (var n = this._scriptOrder.indexOf(e), r = 0; r < n;) {
                        var s = this._loadedScripts[r];
                        if (null == s) return !1;
                        r++
                    }
                    return this._currentlyLoadingScript = !0, !0
                }, e._removeLoadItem = function (t) {
                    for (var e = this._currentLoads.length, n = 0; n < e; n++) if (this._currentLoads[n] == t) {
                        this._currentLoads.splice(n, 1);
                        break
                    }
                }, e._cleanLoadItem = function (t) {
                    var e = t.getItem();
                    e && delete e._loader
                }, e._handleProgress = function (t) {
                    var e = t.target;
                    this._sendFileProgress(e.getItem(), e.progress), this._updateProgress()
                }, e._updateProgress = function () {
                    var t = this._numItemsLoaded / this._numItems, e = this._numItems - this._numItemsLoaded;
                    if (e > 0) {
                        for (var n = 0, i = 0, r = this._currentLoads.length; i < r; i++) n += this._currentLoads[i].progress;
                        t += n / e * (e / this._numItems)
                    }
                    this._lastProgress != t && (this._sendProgress(t), this._lastProgress = t)
                }, e._disposeItem = function (t) {
                    delete this._loadedResults[t.id], delete this._loadedRawResults[t.id], delete this._loadItemsById[t.id], delete this._loadItemsBySrc[t.src]
                }, e._sendFileProgress = function (t, e) {
                    if (!this._isCanceled() && !this._paused && this.hasEventListener("fileprogress")) {
                        var n = new i.Event("fileprogress");
                        n.progress = e, n.loaded = e, n.total = 1, n.item = t, this.dispatchEvent(n)
                    }
                }, e._sendFileComplete = function (t, e) {
                    if (!this._isCanceled() && !this._paused) {
                        var n = new i.Event("fileload");
                        n.loader = e, n.item = t, n.result = this._loadedResults[t.id], n.rawResult = this._loadedRawResults[t.id], t.completeHandler && t.completeHandler(n), this.hasEventListener("fileload") && this.dispatchEvent(n)
                    }
                }, e._sendFileStart = function (t) {
                    var e = new i.Event("filestart");
                    e.item = t, this.hasEventListener("filestart") && this.dispatchEvent(e)
                }, e.toString = function () {
                    return "[PreloadJS LoadQueue]"
                }, i.LoadQueue = i.promote(t, "AbstractLoader")
            }(),this.createjs = this.createjs || {},function () {
                "use strict";

                function t(t) {
                    this.AbstractLoader_constructor(t, !0, i.AbstractLoader.TEXT)
                }

                var e = (i.extend(t, i.AbstractLoader), t);
                e.canLoadItem = function (t) {
                    return t.type == i.AbstractLoader.TEXT
                }, i.TextLoader = i.promote(t, "AbstractLoader")
            }(),this.createjs = this.createjs || {},function () {
                "use strict";

                function t(t) {
                    this.AbstractLoader_constructor(t, !0, i.AbstractLoader.BINARY), this.on("initialize", this._updateXHR, this)
                }

                var e = i.extend(t, i.AbstractLoader), n = t;
                n.canLoadItem = function (t) {
                    return t.type == i.AbstractLoader.BINARY
                }, e._updateXHR = function (t) {
                    t.loader.setResponseType("arraybuffer")
                }, i.BinaryLoader = i.promote(t, "AbstractLoader")
            }(),this.createjs = this.createjs || {},function () {
                "use strict";

                function t(t, e) {
                    this.AbstractLoader_constructor(t, e, i.AbstractLoader.CSS), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "href", e ? this._tag = document.createElement("style") : this._tag = document.createElement("link"), this._tag.rel = "stylesheet", this._tag.type = "text/css"
                }

                var e = i.extend(t, i.AbstractLoader), n = t;
                n.canLoadItem = function (t) {
                    return t.type == i.AbstractLoader.CSS
                }, e._formatResult = function (t) {
                    if (this._preferXHR) {
                        var e = t.getTag();
                        if (e.styleSheet) e.styleSheet.cssText = t.getResult(!0); else {
                            var n = document.createTextNode(t.getResult(!0));
                            e.appendChild(n)
                        }
                    } else e = this._tag;
                    return i.DomUtils.appendToHead(e), e
                }, i.CSSLoader = i.promote(t, "AbstractLoader")
            }(),this.createjs = this.createjs || {},function () {
                "use strict";

                function t(t, e) {
                    this.AbstractLoader_constructor(t, e, i.AbstractLoader.IMAGE), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "src",
                        i.RequestUtils.isImageTag(t) ? this._tag = t : i.RequestUtils.isImageTag(t.src) ? this._tag = t.src : i.RequestUtils.isImageTag(t.tag) && (this._tag = t.tag), null != this._tag ? this._preferXHR = !1 : this._tag = document.createElement("img"), this.on("initialize", this._updateXHR, this)
                }

                var e = i.extend(t, i.AbstractLoader), n = t;
                n.canLoadItem = function (t) {
                    return t.type == i.AbstractLoader.IMAGE
                }, e.load = function () {
                    if ("" != this._tag.src && this._tag.complete) return void this._sendComplete();
                    var t = this._item.crossOrigin;
                    1 == t && (t = "Anonymous"), null == t || i.RequestUtils.isLocal(this._item.src) || (this._tag.crossOrigin = t), this.AbstractLoader_load()
                }, e._updateXHR = function (t) {
                    t.loader.mimeType = "text/plain; charset=x-user-defined-binary", t.loader.setResponseType && t.loader.setResponseType("blob")
                }, e._formatResult = function (t) {
                    var e = this;
                    return function (n) {
                        var i = e._tag, r = window.URL || window.webkitURL;
                        if (e._preferXHR) if (r) {
                            var s = r.createObjectURL(t.getResult(!0));
                            i.src = s, i.onload = function () {
                                r.revokeObjectURL(e.src)
                            }
                        } else i.src = t.getItem().src; else ;
                        i.complete ? n(i) : i.onload = function () {
                            n(this)
                        }
                    }
                }, i.ImageLoader = i.promote(t, "AbstractLoader")
            }(),this.createjs = this.createjs || {},function () {
                "use strict";

                function t(t, e) {
                    this.AbstractLoader_constructor(t, e, i.AbstractLoader.JAVASCRIPT), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "src", this.setTag(document.createElement("script"))
                }

                var e = i.extend(t, i.AbstractLoader), n = t;
                n.canLoadItem = function (t) {
                    return t.type == i.AbstractLoader.JAVASCRIPT
                }, e._formatResult = function (t) {
                    var e = t.getTag();
                    return this._preferXHR && (e.text = t.getResult(!0)), e
                }, i.JavaScriptLoader = i.promote(t, "AbstractLoader")
            }(),this.createjs = this.createjs || {},function () {
                "use strict";

                function t(t) {
                    this.AbstractLoader_constructor(t, !0, i.AbstractLoader.JSON), this.resultFormatter = this._formatResult
                }

                var e = i.extend(t, i.AbstractLoader), n = t;
                n.canLoadItem = function (t) {
                    return t.type == i.AbstractLoader.JSON && !t._loadAsJSONP
                }, e._formatResult = function (t) {
                    var e = null;
                    try {
                        e = i.DataUtils.parseJSON(t.getResult(!0))
                    } catch (t) {
                        var n = new i.ErrorEvent("JSON_FORMAT", null, t);
                        return this._sendError(n), t
                    }
                    return e
                }, i.JSONLoader = i.promote(t, "AbstractLoader")
            }(),this.createjs = this.createjs || {},function () {
                "use strict";

                function t(t) {
                    this.AbstractLoader_constructor(t, !1, i.AbstractLoader.JSONP), this.setTag(document.createElement("script")), this.getTag().type = "text/javascript"
                }

                var e = i.extend(t, i.AbstractLoader), n = t;
                n.canLoadItem = function (t) {
                    return t.type == i.AbstractLoader.JSONP || t._loadAsJSONP
                }, e.cancel = function () {
                    this.AbstractLoader_cancel(), this._dispose()
                }, e.load = function () {
                    if (null == this._item.callback) throw new Error("callback is required for loading JSONP requests.");
                    if (null != window[this._item.callback]) throw new Error("JSONP callback '" + this._item.callback + "' already exists on window. You need to specify a different callback or re-name the current one.");
                    window[this._item.callback] = i.proxy(this._handleLoad, this), window.document.body.appendChild(this._tag), this._loadTimeout = setTimeout(i.proxy(this._handleTimeout, this), this._item.loadTimeout), this._tag.src = this._item.src
                }, e._handleLoad = function (t) {
                    this._result = this._rawResult = t, this._sendComplete(), this._dispose()
                }, e._handleTimeout = function () {
                    this._dispose(), this.dispatchEvent(new i.ErrorEvent("timeout"))
                }, e._dispose = function () {
                    window.document.body.removeChild(this._tag), delete window[this._item.callback], clearTimeout(this._loadTimeout)
                }, i.JSONPLoader = i.promote(t, "AbstractLoader")
            }(),this.createjs = this.createjs || {},function () {
                "use strict";

                function t(t) {
                    this.AbstractLoader_constructor(t, null, i.AbstractLoader.MANIFEST), this.plugins = null, this._manifestQueue = null
                }

                var e = i.extend(t, i.AbstractLoader), n = t;
                n.MANIFEST_PROGRESS = .25, n.canLoadItem = function (t) {
                    return t.type == i.AbstractLoader.MANIFEST
                }, e.load = function () {
                    this.AbstractLoader_load()
                }, e._createRequest = function () {
                    var t = this._item.callback;
                    null != t ? this._request = new i.JSONPLoader(this._item) : this._request = new i.JSONLoader(this._item)
                }, e.handleEvent = function (t) {
                    switch (t.type) {
                        case"complete":
                            return this._rawResult = t.target.getResult(!0), this._result = t.target.getResult(), this._sendProgress(n.MANIFEST_PROGRESS), void this._loadManifest(this._result);
                        case"progress":
                            return t.loaded *= n.MANIFEST_PROGRESS, this.progress = t.loaded / t.total, (isNaN(this.progress) || this.progress == 1 / 0) && (this.progress = 0), void this._sendProgress(t)
                    }
                    this.AbstractLoader_handleEvent(t)
                }, e.destroy = function () {
                    this.AbstractLoader_destroy(), this._manifestQueue.close()
                }, e._loadManifest = function (t) {
                    if (t && t.manifest) {
                        var e = this._manifestQueue = new i.LoadQueue;
                        e.on("fileload", this._handleManifestFileLoad, this), e.on("progress", this._handleManifestProgress, this), e.on("complete", this._handleManifestComplete, this, !0), e.on("error", this._handleManifestError, this, !0);
                        for (var n = 0, r = this.plugins.length; n < r; n++) e.installPlugin(this.plugins[n]);
                        e.loadManifest(t)
                    } else this._sendComplete()
                }, e._handleManifestFileLoad = function (t) {
                    t.target = null, this.dispatchEvent(t)
                }, e._handleManifestComplete = function (t) {
                    this._loadedItems = this._manifestQueue.getItems(!0), this._sendComplete()
                }, e._handleManifestProgress = function (t) {
                    this.progress = t.progress * (1 - n.MANIFEST_PROGRESS) + n.MANIFEST_PROGRESS, this._sendProgress(this.progress)
                }, e._handleManifestError = function (t) {
                    var e = new i.Event("fileerror");
                    e.item = t.data, this.dispatchEvent(e)
                }, i.ManifestLoader = i.promote(t, "AbstractLoader")
            }(),this.createjs = this.createjs || {},function () {
                "use strict";

                function t(t, e) {
                    this.AbstractMediaLoader_constructor(t, e, i.AbstractLoader.SOUND), i.RequestUtils.isAudioTag(t) ? this._tag = t : i.RequestUtils.isAudioTag(t.src) ? this._tag = t : i.RequestUtils.isAudioTag(t.tag) && (this._tag = i.RequestUtils.isAudioTag(t) ? t : t.src), null != this._tag && (this._preferXHR = !1)
                }

                var e = i.extend(t, i.AbstractMediaLoader), n = t;
                n.canLoadItem = function (t) {
                    return t.type == i.AbstractLoader.SOUND
                }, e._createTag = function (t) {
                    var e = document.createElement("audio");
                    return e.autoplay = !1, e.preload = "none", e.src = t, e
                }, i.SoundLoader = i.promote(t, "AbstractMediaLoader")
            }(),this.createjs = this.createjs || {},function () {
                "use strict";

                function t(t, e) {
                    this.AbstractMediaLoader_constructor(t, e, i.AbstractLoader.VIDEO), i.RequestUtils.isVideoTag(t) || i.RequestUtils.isVideoTag(t.src) ? (this.setTag(i.RequestUtils.isVideoTag(t) ? t : t.src), this._preferXHR = !1) : this.setTag(this._createTag())
                }

                var e = i.extend(t, i.AbstractMediaLoader), n = t;
                e._createTag = function () {
                    return document.createElement("video")
                }, n.canLoadItem = function (t) {
                    return t.type == i.AbstractLoader.VIDEO
                }, i.VideoLoader = i.promote(t, "AbstractMediaLoader")
            }(),this.createjs = this.createjs || {},function () {
                "use strict";

                function t(t) {
                    this.AbstractLoader_constructor(t, null, i.AbstractLoader.SPRITESHEET), this._manifestQueue = null
                }

                var e = i.extend(t, i.AbstractLoader), n = t;
                n.SPRITESHEET_PROGRESS = .25, n.canLoadItem = function (t) {
                    return t.type == i.AbstractLoader.SPRITESHEET
                }, e.destroy = function () {
                    this.AbstractLoader_destroy, this._manifestQueue.close()
                }, e._createRequest = function () {
                    var t = this._item.callback;
                    null != t && t instanceof Function ? this._request = new i.JSONPLoader(this._item) : this._request = new i.JSONLoader(this._item)
                }, e.handleEvent = function (t) {
                    switch (t.type) {
                        case"complete":
                            return this._rawResult = t.target.getResult(!0), this._result = t.target.getResult(), this._sendProgress(n.SPRITESHEET_PROGRESS), void this._loadManifest(this._result);
                        case"progress":
                            return t.loaded *= n.SPRITESHEET_PROGRESS, this.progress = t.loaded / t.total, (isNaN(this.progress) || this.progress == 1 / 0) && (this.progress = 0), void this._sendProgress(t)
                    }
                    this.AbstractLoader_handleEvent(t)
                }, e._loadManifest = function (t) {
                    if (t && t.images) {
                        var e = this._manifestQueue = new i.LoadQueue;
                        e.on("complete", this._handleManifestComplete, this, !0), e.on("fileload", this._handleManifestFileLoad, this), e.on("progress", this._handleManifestProgress, this), e.on("error", this._handleManifestError, this, !0), e.loadManifest(t.images)
                    }
                }, e._handleManifestFileLoad = function (t) {
                    var e = t.result;
                    if (null != e) {
                        var n = this.getResult().images, i = n.indexOf(t.item.src);
                        n[i] = e
                    }
                }, e._handleManifestComplete = function (t) {
                    this._result = new i.SpriteSheet(this._result), this._loadedItems = this._manifestQueue.getItems(!0), this._sendComplete()
                }, e._handleManifestProgress = function (t) {
                    this.progress = t.progress * (1 - n.SPRITESHEET_PROGRESS) + n.SPRITESHEET_PROGRESS, this._sendProgress(this.progress)
                }, e._handleManifestError = function (t) {
                    var e = new i.Event("fileerror");
                    e.item = t.data, this.dispatchEvent(e)
                }, i.SpriteSheetLoader = i.promote(t, "AbstractLoader")
            }(),this.createjs = this.createjs || {},function () {
                "use strict";

                function t(t, e) {
                    this.AbstractLoader_constructor(t, e, i.AbstractLoader.SVG), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "data", e ? this.setTag(document.createElement("svg")) : (this.setTag(document.createElement("object")), this.getTag().type = "image/svg+xml")
                }

                var e = i.extend(t, i.AbstractLoader), n = t;
                n.canLoadItem = function (t) {
                    return t.type == i.AbstractLoader.SVG
                }, e._formatResult = function (t) {
                    var e = i.DataUtils.parseXML(t.getResult(!0), "text/xml"), n = t.getTag();
                    return !this._preferXHR && document.body.contains(n) && document.body.removeChild(n), null != e.documentElement ? (n.appendChild(e.documentElement), n.style.visibility = "visible", n) : e
                }, i.SVGLoader = i.promote(t, "AbstractLoader")
            }(),this.createjs = this.createjs || {},function () {
                "use strict";

                function t(t) {
                    this.AbstractLoader_constructor(t, !0, i.AbstractLoader.XML), this.resultFormatter = this._formatResult
                }

                var e = i.extend(t, i.AbstractLoader), n = t;
                n.canLoadItem = function (t) {
                    return t.type == i.AbstractLoader.XML
                }, e._formatResult = function (t) {
                    return i.DataUtils.parseXML(t.getResult(!0), "text/xml")
                }, i.XMLLoader = i.promote(t, "AbstractLoader")
            }(),this.createjs = this.createjs || {},i.extend = function (t, e) {
                "use strict";

                function n() {
                    this.constructor = t
                }

                return n.prototype = e.prototype, t.prototype = new n
            },this.createjs = this.createjs || {},i.promote = function (t, e) {
                "use strict";
                var n = t.prototype, i = Object.getPrototypeOf && Object.getPrototypeOf(n) || n.__proto__;
                if (i) {
                    n[(e += "_") + "constructor"] = i.constructor;
                    for (var r in i) n.hasOwnProperty(r) && "function" == typeof i[r] && (n[e + r] = i[r])
                }
                return t
            },this.createjs = this.createjs || {},function () {
                "use strict";

                function t(t, e, n) {
                    this.type = t, this.target = null, this.currentTarget = null, this.eventPhase = 0, this.bubbles = !!e, this.cancelable = !!n, this.timeStamp = (new Date).getTime(), this.defaultPrevented = !1, this.propagationStopped = !1, this.immediatePropagationStopped = !1, this.removed = !1
                }

                var e = t.prototype;
                e.preventDefault = function () {
                    this.defaultPrevented = this.cancelable && !0
                }, e.stopPropagation = function () {
                    this.propagationStopped = !0
                }, e.stopImmediatePropagation = function () {
                    this.immediatePropagationStopped = this.propagationStopped = !0
                }, e.remove = function () {
                    this.removed = !0
                }, e.clone = function () {
                    return new t(this.type, this.bubbles, this.cancelable)
                }, e.set = function (t) {
                    for (var e in t) this[e] = t[e];
                    return this
                }, e.toString = function () {
                    return "[Event (type=" + this.type + ")]"
                }, i.Event = t
            }(),this.createjs = this.createjs || {},function () {
                "use strict";

                function t() {
                    this._listeners = null, this._captureListeners = null
                }

                var e = t.prototype;
                t.initialize = function (t) {
                    t.addEventListener = e.addEventListener, t.on = e.on, t.removeEventListener = t.off = e.removeEventListener, t.removeAllEventListeners = e.removeAllEventListeners, t.hasEventListener = e.hasEventListener, t.dispatchEvent = e.dispatchEvent, t._dispatchEvent = e._dispatchEvent, t.willTrigger = e.willTrigger
                }, e.addEventListener = function (t, e, n) {
                    var i;
                    i = n ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
                    var r = i[t];
                    return r && this.removeEventListener(t, e, n), r = i[t], r ? r.push(e) : i[t] = [e], e
                }, e.on = function (t, e, n, i, r, s) {
                    return e.handleEvent && (n = n || e, e = e.handleEvent), n = n || this, this.addEventListener(t, function (t) {
                        e.call(n, t, r), i && t.remove()
                    }, s)
                }, e.removeEventListener = function (t, e, n) {
                    var i = n ? this._captureListeners : this._listeners;
                    if (i) {
                        var r = i[t];
                        if (r) for (var s = 0, a = r.length; s < a; s++) if (r[s] == e) {
                            1 == a ? delete i[t] : r.splice(s, 1);
                            break
                        }
                    }
                }, e.off = e.removeEventListener, e.removeAllEventListeners = function (t) {
                    t ? (this._listeners && delete this._listeners[t], this._captureListeners && delete this._captureListeners[t]) : this._listeners = this._captureListeners = null
                }, e.dispatchEvent = function (t) {
                    if ("string" == typeof t) {
                        var e = this._listeners;
                        if (!e || !e[t]) return !1;
                        t = new i.Event(t)
                    } else t.target && t.clone && (t = t.clone());
                    try {
                        t.target = this
                    } catch (t) {
                    }
                    if (t.bubbles && this.parent) {
                        for (var n = this, r = [n]; n.parent;) r.push(n = n.parent);
                        var s, a = r.length;
                        for (s = a - 1; s >= 0 && !t.propagationStopped; s--) r[s]._dispatchEvent(t, 1 + (0 == s));
                        for (s = 1; s < a && !t.propagationStopped; s++) r[s]._dispatchEvent(t, 3)
                    } else this._dispatchEvent(t, 2);
                    return t.defaultPrevented
                }, e.hasEventListener = function (t) {
                    var e = this._listeners, n = this._captureListeners;
                    return !!(e && e[t] || n && n[t])
                }, e.willTrigger = function (t) {
                    for (var e = this; e;) {
                        if (e.hasEventListener(t)) return !0;
                        e = e.parent
                    }
                    return !1
                }, e.toString = function () {
                    return "[EventDispatcher]"
                }, e._dispatchEvent = function (t, e) {
                    var n, i = 1 == e ? this._captureListeners : this._listeners;
                    if (t && i) {
                        var r = i[t.type];
                        if (!r || !(n = r.length)) return;
                        try {
                            t.currentTarget = this
                        } catch (t) {
                        }
                        try {
                            t.eventPhase = e
                        } catch (t) {
                        }
                        t.removed = !1, r = r.slice();
                        for (var s = 0; s < n && !t.immediatePropagationStopped; s++) {
                            var a = r[s];
                            a.handleEvent ? a.handleEvent(t) : a(t), t.removed && (this.off(t.type, a, 1 == e), t.removed = !1)
                        }
                    }
                }, i.EventDispatcher = t
            }(),this.createjs = this.createjs || {},function () {
                "use strict";

                function t() {
                    throw"Ticker cannot be instantiated."
                }

                t.RAF_SYNCHED = "synched", t.RAF = "raf", t.TIMEOUT = "timeout", t.useRAF = !1, t.timingMode = null, t.maxDelta = 0, t.paused = !1, t.removeEventListener = null, t.removeAllEventListeners = null, t.dispatchEvent = null, t.hasEventListener = null, t._listeners = null, i.EventDispatcher.initialize(t), t._addEventListener = t.addEventListener, t.addEventListener = function () {
                    return !t._inited && t.init(), t._addEventListener.apply(t, arguments)
                }, t._inited = !1, t._startTime = 0, t._pausedTime = 0, t._ticks = 0, t._pausedTicks = 0, t._interval = 50, t._lastTime = 0, t._times = null, t._tickTimes = null, t._timerId = null, t._raf = !0, t.setInterval = function (e) {
                    t._interval = e, t._inited && t._setupTick()
                }, t.getInterval = function () {
                    return t._interval
                }, t.setFPS = function (e) {
                    t.setInterval(1e3 / e)
                }, t.getFPS = function () {
                    return 1e3 / t._interval
                };
                try {
                    Object.defineProperties(t, {
                        interval: {get: t.getInterval, set: t.setInterval},
                        framerate: {get: t.getFPS, set: t.setFPS}
                    })
                } catch (t) {
                    console.log(t)
                }
                t.init = function () {
                    t._inited || (t._inited = !0, t._times = [], t._tickTimes = [], t._startTime = t._getTime(), t._times.push(t._lastTime = 0), t.interval = t._interval)
                }, t.reset = function () {
                    if (t._raf) {
                        var e = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
                        e && e(t._timerId)
                    } else clearTimeout(t._timerId);
                    t.removeAllEventListeners("tick"), t._timerId = t._times = t._tickTimes = null, t._startTime = t._lastTime = t._ticks = 0, t._inited = !1
                }, t.getMeasuredTickTime = function (e) {
                    var n = 0, i = t._tickTimes;
                    if (!i || i.length < 1) return -1;
                    e = Math.min(i.length, e || 0 | t.getFPS());
                    for (var r = 0; r < e; r++) n += i[r];
                    return n / e
                }, t.getMeasuredFPS = function (e) {
                    var n = t._times;
                    return !n || n.length < 2 ? -1 : (e = Math.min(n.length - 1, e || 0 | t.getFPS()), 1e3 / ((n[0] - n[e]) / e))
                }, t.setPaused = function (e) {
                    t.paused = e
                }, t.getPaused = function () {
                    return t.paused
                }, t.getTime = function (e) {
                    return t._startTime ? t._getTime() - (e ? t._pausedTime : 0) : -1
                }, t.getEventTime = function (e) {
                    return t._startTime ? (t._lastTime || t._startTime) - (e ? t._pausedTime : 0) : -1
                }, t.getTicks = function (e) {
                    return t._ticks - (e ? t._pausedTicks : 0)
                }, t._handleSynch = function () {
                    t._timerId = null, t._setupTick(), t._getTime() - t._lastTime >= .97 * (t._interval - 1) && t._tick()
                }, t._handleRAF = function () {
                    t._timerId = null, t._setupTick(), t._tick()
                }, t._handleTimeout = function () {
                    t._timerId = null, t._setupTick(), t._tick()
                }, t._setupTick = function () {
                    if (null == t._timerId) {
                        var e = t.timingMode || t.useRAF && t.RAF_SYNCHED;
                        if (e == t.RAF_SYNCHED || e == t.RAF) {
                            var n = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
                            if (n) return t._timerId = n(e == t.RAF ? t._handleRAF : t._handleSynch), void(t._raf = !0)
                        }
                        t._raf = !1, t._timerId = setTimeout(t._handleTimeout, t._interval)
                    }
                }, t._tick = function () {
                    var e = t.paused, n = t._getTime(), r = n - t._lastTime;
                    if (t._lastTime = n, t._ticks++, e && (t._pausedTicks++, t._pausedTime += r), t.hasEventListener("tick")) {
                        var s = new i.Event("tick"), a = t.maxDelta;
                        s.delta = a && r > a ? a : r, s.paused = e, s.time = n, s.runTime = n - t._pausedTime, t.dispatchEvent(s)
                    }
                    for (t._tickTimes.unshift(t._getTime() - n); t._tickTimes.length > 100;) t._tickTimes.pop();
                    for (t._times.unshift(n); t._times.length > 100;) t._times.pop()
                };
                var e = window.performance && (performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow);
                t._getTime = function () {
                    return (e && e.call(performance) || (new Date).getTime()) - t._startTime
                }, i.Ticker = t
            }(),this.createjs = this.createjs || {},function () {
                "use strict";

                function t(e, n, r) {
                    this.ignoreGlobalPause = !1, this.loop = !1, this.duration = 0, this.pluginData = r || {}, this.target = e, this.position = null, this.passive = !1, this._paused = !1, this._curQueueProps = {}, this._initQueueProps = {}, this._steps = [], this._actions = [], this._prevPosition = 0, this._stepPosition = 0, this._prevPos = -1, this._target = e, this._useTicks = !1, this._inited = !1, this._registered = !1, n && (this._useTicks = n.useTicks, this.ignoreGlobalPause = n.ignoreGlobalPause, this.loop = n.loop, n.onChange && this.addEventListener("change", n.onChange), n.override && t.removeTweens(e)), n && n.paused ? this._paused = !0 : i.Tween._register(this, !0), n && null != n.position && this.setPosition(n.position, t.NONE)
                }

                var e = i.extend(t, i.EventDispatcher);
                t.NONE = 0, t.LOOP = 1, t.REVERSE = 2, t.IGNORE = {}, t._tweens = [], t._plugins = {}, t.get = function (e, n, i, r) {
                    return r && t.removeTweens(e), new t(e, n, i)
                }, t.tick = function (e, n) {
                    for (var i = t._tweens.slice(), r = i.length - 1; r >= 0; r--) {
                        var s = i[r];
                        n && !s.ignoreGlobalPause || s._paused || s.tick(s._useTicks ? 1 : e)
                    }
                }, t.handleEvent = function (t) {
                    "tick" == t.type && this.tick(t.delta, t.paused)
                }, t.removeTweens = function (e) {
                    if (e.tweenjs_count) {
                        for (var n = t._tweens, i = n.length - 1; i >= 0; i--) {
                            var r = n[i];
                            r._target == e && (r._paused = !0, n.splice(i, 1))
                        }
                        e.tweenjs_count = 0
                    }
                }, t.removeAllTweens = function () {
                    for (var e = t._tweens, n = 0, i = e.length; n < i; n++) {
                        var r = e[n];
                        r._paused = !0, r.target && (r.target.tweenjs_count = 0)
                    }
                    e.length = 0
                }, t.hasActiveTweens = function (e) {
                    return e ? null != e.tweenjs_count && !!e.tweenjs_count : t._tweens && !!t._tweens.length
                }, t.installPlugin = function (e, n) {
                    var i = e.priority;
                    null == i && (e.priority = i = 0);
                    for (var r = 0, s = n.length, a = t._plugins; r < s; r++) {
                        var o = n[r];
                        if (a[o]) {
                            for (var u = a[o], l = 0, c = u.length; l < c && !(i < u[l].priority); l++) ;
                            a[o].splice(l, 0, e)
                        } else a[o] = [e]
                    }
                }, t._register = function (e, n) {
                    var r = e._target, s = t._tweens;
                    if (n && !e._registered) r && (r.tweenjs_count = r.tweenjs_count ? r.tweenjs_count + 1 : 1), s.push(e), !t._inited && i.Ticker && (i.Ticker.addEventListener("tick", t), t._inited = !0); else if (!n && e._registered) {
                        r && r.tweenjs_count--;
                        for (var a = s.length; a--;) if (s[a] == e) {
                            s.splice(a, 1);
                            break
                        }
                    }
                    e._registered = n
                }, e.wait = function (t, e) {
                    if (null == t || t <= 0) return this;
                    var n = this._cloneProps(this._curQueueProps);
                    return this._addStep({d: t, p0: n, e: this._linearEase, p1: n, v: e})
                }, e.to = function (t, e, n) {
                    return (isNaN(e) || e < 0) && (e = 0), this._addStep({
                        d: e || 0,
                        p0: this._cloneProps(this._curQueueProps),
                        e: n,
                        p1: this._cloneProps(this._appendQueueProps(t))
                    })
                }, e.call = function (t, e, n) {
                    return this._addAction({f: t, p: e ? e : [this], o: n ? n : this._target})
                }, e.set = function (t, e) {
                    return this._addAction({f: this._set, o: this, p: [t, e ? e : this._target]})
                }, e.play = function (t) {
                    return t || (t = this), this.call(t.setPaused, [!1], t)
                }, e.pause = function (t) {
                    return t || (t = this), this.call(t.setPaused, [!0], t)
                }, e.setPosition = function (t, e) {
                    t < 0 && (t = 0), null == e && (e = 1);
                    var n = t, i = !1;
                    if (n >= this.duration && (this.loop ? n %= this.duration : (n = this.duration, i = !0)), n == this._prevPos) return i;
                    var r = this._prevPos;
                    if (this.position = this._prevPos = n, this._prevPosition = t, this._target) if (i) this._updateTargetProps(null, 1); else if (this._steps.length > 0) {
                        for (var s = 0, a = this._steps.length; s < a && !(this._steps[s].t > n); s++) ;
                        var o = this._steps[s - 1];
                        this._updateTargetProps(o, (this._stepPosition = n - o.t) / o.d)
                    }
                    return 0 != e && this._actions.length > 0 && (this._useTicks ? this._runActions(n, n) : 1 == e && n < r ? (r != this.duration && this._runActions(r, this.duration), this._runActions(0, n, !0)) : this._runActions(r, n)), i && this.setPaused(!0), this.dispatchEvent("change"), i
                }, e.tick = function (t) {
                    this._paused || this.setPosition(this._prevPosition + t)
                }, e.setPaused = function (e) {
                    return this._paused === !!e ? this : (this._paused = !!e, t._register(this, !e), this)
                }, e.w = e.wait, e.t = e.to, e.c = e.call, e.s = e.set, e.toString = function () {
                    return "[Tween]"
                }, e.clone = function () {
                    throw"Tween can not be cloned."
                }, e._updateTargetProps = function (e, n) {
                    var i, r, s, a, o, u;
                    if (e || 1 != n) {
                        if (this.passive = !!e.v, this.passive) return;
                        e.e && (n = e.e(n, 0, 1, 1)), i = e.p0, r = e.p1
                    } else this.passive = !1, i = r = this._curQueueProps;
                    for (var l in this._initQueueProps) {
                        null == (a = i[l]) && (i[l] = a = this._initQueueProps[l]), null == (o = r[l]) && (r[l] = o = a), s = a == o || 0 == n || 1 == n || "number" != typeof a ? 1 == n ? o : a : a + (o - a) * n;
                        var c = !1;
                        if (u = t._plugins[l]) for (var h = 0, d = u.length; h < d; h++) {
                            var f = u[h].tween(this, l, s, i, r, n, !!e && i == r, !e);
                            f == t.IGNORE ? c = !0 : s = f
                        }
                        c || (this._target[l] = s)
                    }
                }, e._runActions = function (t, e, n) {
                    var i = t, r = e, s = -1, a = this._actions.length, o = 1;
                    for (t > e && (i = e, r = t, s = a, a = o = -1); (s += o) != a;) {
                        var u = this._actions[s], l = u.t;
                        (l == r || l > i && l < r || n && l == t) && u.f.apply(u.o, u.p)
                    }
                }, e._appendQueueProps = function (e) {
                    var n, i, r, s, a;
                    for (var o in e) if (void 0 === this._initQueueProps[o]) {
                        if (i = this._target[o], n = t._plugins[o]) for (r = 0, s = n.length; r < s; r++) i = n[r].init(this, o, i);
                        this._initQueueProps[o] = this._curQueueProps[o] = void 0 === i ? null : i
                    } else i = this._curQueueProps[o];
                    for (var o in e) {
                        if (i = this._curQueueProps[o], n = t._plugins[o]) for (a = a || {}, r = 0, s = n.length; r < s; r++) n[r].step && n[r].step(this, o, i, e[o], a);
                        this._curQueueProps[o] = e[o]
                    }
                    return a && this._appendQueueProps(a), this._curQueueProps
                }, e._cloneProps = function (t) {
                    var e = {};
                    for (var n in t) e[n] = t[n];
                    return e
                }, e._addStep = function (t) {
                    return t.d > 0 && (this._steps.push(t), t.t = this.duration, this.duration += t.d), this
                }, e._addAction = function (t) {
                    return t.t = this.duration, this._actions.push(t), this
                }, e._set = function (t, e) {
                    for (var n in t) e[n] = t[n]
                }, i.Tween = i.promote(t, "EventDispatcher")
            }(),this.createjs = this.createjs || {},function () {
                "use strict";

                function t(t, e, n) {
                    this.EventDispatcher_constructor(), this.ignoreGlobalPause = !1, this.duration = 0, this.loop = !1, this.position = null, this._paused = !1, this._tweens = [], this._labels = null, this._labelList = null, this._prevPosition = 0, this._prevPos = -1, this._useTicks = !1, this._registered = !1, n && (this._useTicks = n.useTicks, this.loop = n.loop, this.ignoreGlobalPause = n.ignoreGlobalPause, n.onChange && this.addEventListener("change", n.onChange)), t && this.addTween.apply(this, t), this.setLabels(e), n && n.paused ? this._paused = !0 : i.Tween._register(this, !0), n && null != n.position && this.setPosition(n.position, i.Tween.NONE)
                }

                var e = i.extend(t, i.EventDispatcher);
                e.addTween = function (t) {
                    var e = arguments.length;
                    if (e > 1) {
                        for (var n = 0; n < e; n++) this.addTween(arguments[n]);
                        return arguments[0]
                    }
                    return 0 == e ? null : (this.removeTween(t), this._tweens.push(t), t.setPaused(!0), t._paused = !1, t._useTicks = this._useTicks, t.duration > this.duration && (this.duration = t.duration), this._prevPos >= 0 && t.setPosition(this._prevPos, i.Tween.NONE), t)
                }, e.removeTween = function (t) {
                    var e = arguments.length;
                    if (e > 1) {
                        for (var n = !0, i = 0; i < e; i++) n = n && this.removeTween(arguments[i]);
                        return n
                    }
                    if (0 == e) return !1;
                    for (var r = this._tweens, i = r.length; i--;) if (r[i] == t) return r.splice(i, 1), t.duration >= this.duration && this.updateDuration(), !0;
                    return !1
                }, e.addLabel = function (t, e) {
                    this._labels[t] = e;
                    var n = this._labelList;
                    if (n) {
                        for (var i = 0, r = n.length; i < r && !(e < n[i].position); i++) ;
                        n.splice(i, 0, {label: t, position: e})
                    }
                }, e.setLabels = function (t) {
                    this._labels = t ? t : {}
                }, e.getLabels = function () {
                    var t = this._labelList;
                    if (!t) {
                        t = this._labelList = [];
                        var e = this._labels;
                        for (var n in e) t.push({label: n, position: e[n]});
                        t.sort(function (t, e) {
                            return t.position - e.position
                        })
                    }
                    return t
                }, e.getCurrentLabel = function () {
                    var t = this.getLabels(), e = this.position, n = t.length;
                    if (n) {
                        for (var i = 0; i < n && !(e < t[i].position); i++) ;
                        return 0 == i ? null : t[i - 1].label
                    }
                    return null
                }, e.gotoAndPlay = function (t) {
                    this.setPaused(!1), this._goto(t)
                }, e.gotoAndStop = function (t) {
                    this.setPaused(!0), this._goto(t)
                }, e.setPosition = function (t, e) {
                    var n = this._calcPosition(t), i = !this.loop && t >= this.duration;
                    if (n == this._prevPos) return i;
                    this._prevPosition = t, this.position = this._prevPos = n;
                    for (var r = 0, s = this._tweens.length; r < s; r++) if (this._tweens[r].setPosition(n, e), n != this._prevPos) return !1;
                    return i && this.setPaused(!0), this.dispatchEvent("change"), i
                }, e.setPaused = function (t) {
                    this._paused = !!t, i.Tween._register(this, !t)
                }, e.updateDuration = function () {
                    this.duration = 0;
                    for (var t = 0, e = this._tweens.length; t < e; t++) {
                        var n = this._tweens[t];
                        n.duration > this.duration && (this.duration = n.duration)
                    }
                }, e.tick = function (t) {
                    this.setPosition(this._prevPosition + t)
                }, e.resolve = function (t) {
                    var e = Number(t);
                    return isNaN(e) && (e = this._labels[t]), e
                }, e.toString = function () {
                    return "[Timeline]"
                }, e.clone = function () {
                    throw"Timeline can not be cloned."
                }, e._goto = function (t) {
                    var e = this.resolve(t);
                    null != e && this.setPosition(e)
                }, e._calcPosition = function (t) {
                    return t < 0 ? 0 : t < this.duration ? t : this.loop ? t % this.duration : this.duration
                }, i.Timeline = i.promote(t, "EventDispatcher")
            }(),this.createjs = this.createjs || {},function () {
                "use strict";

                function t() {
                    throw"Ease cannot be instantiated."
                }

                t.linear = function (t) {
                    return t
                }, t.none = t.linear, t.get = function (t) {
                    return t < -1 && (t = -1), t > 1 && (t = 1), function (e) {
                        return 0 == t ? e : t < 0 ? e * (e * -t + 1 + t) : e * ((2 - e) * t + (1 - t))
                    }
                }, t.getPowIn = function (t) {
                    return function (e) {
                        return Math.pow(e, t)
                    }
                }, t.getPowOut = function (t) {
                    return function (e) {
                        return 1 - Math.pow(1 - e, t)
                    }
                }, t.getPowInOut = function (t) {
                    return function (e) {
                        return (e *= 2) < 1 ? .5 * Math.pow(e, t) : 1 - .5 * Math.abs(Math.pow(2 - e, t))
                    }
                }, t.quadIn = t.getPowIn(2), t.quadOut = t.getPowOut(2), t.quadInOut = t.getPowInOut(2), t.cubicIn = t.getPowIn(3), t.cubicOut = t.getPowOut(3), t.cubicInOut = t.getPowInOut(3), t.quartIn = t.getPowIn(4), t.quartOut = t.getPowOut(4), t.quartInOut = t.getPowInOut(4), t.quintIn = t.getPowIn(5), t.quintOut = t.getPowOut(5), t.quintInOut = t.getPowInOut(5), t.sineIn = function (t) {
                    return 1 - Math.cos(t * Math.PI / 2)
                }, t.sineOut = function (t) {
                    return Math.sin(t * Math.PI / 2)
                }, t.sineInOut = function (t) {
                    return -.5 * (Math.cos(Math.PI * t) - 1)
                }, t.getBackIn = function (t) {
                    return function (e) {
                        return e * e * ((t + 1) * e - t)
                    }
                }, t.backIn = t.getBackIn(1.7), t.getBackOut = function (t) {
                    return function (e) {
                        return --e * e * ((t + 1) * e + t) + 1
                    }
                }, t.backOut = t.getBackOut(1.7), t.getBackInOut = function (t) {
                    return t *= 1.525, function (e) {
                        return (e *= 2) < 1 ? .5 * (e * e * ((t + 1) * e - t)) : .5 * ((e -= 2) * e * ((t + 1) * e + t) + 2)
                    }
                }, t.backInOut = t.getBackInOut(1.7), t.circIn = function (t) {
                    return -(Math.sqrt(1 - t * t) - 1)
                }, t.circOut = function (t) {
                    return Math.sqrt(1 - --t * t)
                }, t.circInOut = function (t) {
                    return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                }, t.bounceIn = function (e) {
                    return 1 - t.bounceOut(1 - e)
                }, t.bounceOut = function (t) {
                    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                }, t.bounceInOut = function (e) {
                    return e < .5 ? .5 * t.bounceIn(2 * e) : .5 * t.bounceOut(2 * e - 1) + .5
                }, t.getElasticIn = function (t, e) {
                    var n = 2 * Math.PI;
                    return function (i) {
                        if (0 == i || 1 == i) return i;
                        var r = e / n * Math.asin(1 / t);
                        return -(t * Math.pow(2, 10 * (i -= 1)) * Math.sin((i - r) * n / e))
                    }
                }, t.elasticIn = t.getElasticIn(1, .3), t.getElasticOut = function (t, e) {
                    var n = 2 * Math.PI;
                    return function (i) {
                        if (0 == i || 1 == i) return i;
                        var r = e / n * Math.asin(1 / t);
                        return t * Math.pow(2, -10 * i) * Math.sin((i - r) * n / e) + 1
                    }
                }, t.elasticOut = t.getElasticOut(1, .3), t.getElasticInOut = function (t, e) {
                    var n = 2 * Math.PI;
                    return function (i) {
                        var r = e / n * Math.asin(1 / t);
                        return (i *= 2) < 1 ? -.5 * (t * Math.pow(2, 10 * (i -= 1)) * Math.sin((i - r) * n / e)) : t * Math.pow(2, -10 * (i -= 1)) * Math.sin((i - r) * n / e) * .5 + 1
                    }
                }, t.elasticInOut = t.getElasticInOut(1, .3 * 1.5), i.Ease = t
            }(),this.createjs = this.createjs || {},function () {
                "use strict";

                function t() {
                    throw"MotionGuidePlugin cannot be instantiated."
                }

                t.priority = 0, t._rotOffS, t._rotOffE, t._rotNormS, t._rotNormE, t.install = function () {
                    return i.Tween.installPlugin(t, ["guide", "x", "y", "rotation"]), i.Tween.IGNORE
                }, t.init = function (t, e, n) {
                    var i = t.target;
                    return i.hasOwnProperty("x") || (i.x = 0), i.hasOwnProperty("y") || (i.y = 0), i.hasOwnProperty("rotation") || (i.rotation = 0), "rotation" == e && (t.__needsRot = !0), "guide" == e ? null : n
                }, t.step = function (e, n, i, r, s) {
                    if ("rotation" == n && (e.__rotGlobalS = i, e.__rotGlobalE = r, t.testRotData(e, s)), "guide" != n) return r;
                    var a, o = r;
                    o.hasOwnProperty("path") || (o.path = []);
                    var u = o.path;
                    if (o.hasOwnProperty("end") || (o.end = 1), o.hasOwnProperty("start") || (o.start = i && i.hasOwnProperty("end") && i.path === u ? i.end : 0), o.hasOwnProperty("_segments") && o._length) return r;
                    var l = u.length, c = 10;
                    if (!(l >= 6 && (l - 2) % 4 == 0)) throw"invalid 'path' data, please see documentation for valid paths";
                    o._segments = [], o._length = 0;
                    for (var h = 2; h < l; h += 4) {
                        for (var d, f, p = u[h - 2], g = u[h - 1], v = u[h + 0], m = u[h + 1], _ = u[h + 2], y = u[h + 3], b = p, w = g, x = 0, T = [], E = 1; E <= c; E++) {
                            var S = E / c, L = 1 - S;
                            d = L * L * p + 2 * L * S * v + S * S * _, f = L * L * g + 2 * L * S * m + S * S * y, x += T[T.push(Math.sqrt((a = d - b) * a + (a = f - w) * a)) - 1], b = d, w = f
                        }
                        o._segments.push(x), o._segments.push(T), o._length += x
                    }
                    a = o.orient, o.orient = !0;
                    var P = {};
                    return t.calc(o, o.start, P), e.__rotPathS = Number(P.rotation.toFixed(5)), t.calc(o, o.end, P), e.__rotPathE = Number(P.rotation.toFixed(5)), o.orient = !1, t.calc(o, o.end, s), o.orient = a, o.orient ? (e.__guideData = o, t.testRotData(e, s), r) : r
                }, t.testRotData = function (t, e) {
                    if (void 0 === t.__rotGlobalS || void 0 === t.__rotGlobalE) {
                        if (t.__needsRot) return;
                        void 0 !== t._curQueueProps.rotation ? t.__rotGlobalS = t.__rotGlobalE = t._curQueueProps.rotation : t.__rotGlobalS = t.__rotGlobalE = e.rotation = t.target.rotation || 0
                    }
                    if (void 0 !== t.__guideData) {
                        var n = t.__guideData, i = t.__rotGlobalE - t.__rotGlobalS, r = t.__rotPathE - t.__rotPathS,
                            s = i - r;
                        if ("auto" == n.orient) s > 180 ? s -= 360 : s < -180 && (s += 360); else if ("cw" == n.orient) {
                            for (; s < 0;) s += 360;
                            0 == s && i > 0 && 180 != i && (s += 360)
                        } else if ("ccw" == n.orient) {
                            for (s = i - (r > 180 ? 360 - r : r); s > 0;) s -= 360;
                            0 == s && i < 0 && i != -180 && (s -= 360)
                        }
                        n.rotDelta = s, n.rotOffS = t.__rotGlobalS - t.__rotPathS, t.__rotGlobalS = t.__rotGlobalE = t.__guideData = t.__needsRot = void 0
                    }
                }, t.tween = function (e, n, i, r, s, a, o, u) {
                    var l = s.guide;
                    if (void 0 == l || l === r.guide) return i;
                    if (l.lastRatio != a) {
                        var c = (l.end - l.start) * (o ? l.end : a) + l.start;
                        switch (t.calc(l, c, e.target), l.orient) {
                            case"cw":
                            case"ccw":
                            case"auto":
                                e.target.rotation += l.rotOffS + l.rotDelta * a;
                                break;
                            case"fixed":
                            default:
                                e.target.rotation += l.rotOffS
                        }
                        l.lastRatio = a
                    }
                    return "rotation" != n || l.orient && "false" != l.orient ? e.target[n] : i
                }, t.calc = function (e, n, i) {
                    void 0 == e._segments && t.validate(e), void 0 == i && (i = {x: 0, y: 0, rotation: 0});
                    for (var r = e._segments, s = e.path, a = e._length * n, o = r.length - 2, u = 0; a > r[u] && u < o;) a -= r[u], u += 2;
                    var l = r[u + 1], c = 0;
                    for (o = l.length - 1; a > l[c] && c < o;) a -= l[c], c++;
                    var h = c / ++o + a / (o * l[c]);
                    u = 2 * u + 2;
                    var d = 1 - h;
                    return i.x = d * d * s[u - 2] + 2 * d * h * s[u + 0] + h * h * s[u + 2], i.y = d * d * s[u - 1] + 2 * d * h * s[u + 1] + h * h * s[u + 3], e.orient && (i.rotation = 57.2957795 * Math.atan2((s[u + 1] - s[u - 1]) * d + (s[u + 3] - s[u + 1]) * h, (s[u + 0] - s[u - 2]) * d + (s[u + 2] - s[u + 0]) * h)), i
                }, i.MotionGuidePlugin = t
            }(),this.createjs = this.createjs || {},function () {
                "use strict";
                var t = i.TweenJS = i.TweenJS || {};
                t.version = "0.6.1", t.buildDate = "Thu, 21 May 2015 16:17:37 GMT"
            }(),"undefined" != typeof e && "undefined" != typeof e.exports && (e.exports = this.createjs)
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    2: [function (t, e, n) {
        !function (t) {
            "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof n ? e.exports = t : t(jQuery)
        }(function (t) {
            function e(e) {
                var a = e || window.event, o = u.call(arguments, 1), l = 0, h = 0, d = 0, f = 0, p = 0, g = 0;
                if (e = t.event.fix(a), e.type = "mousewheel", "detail" in a && (d = a.detail * -1), "wheelDelta" in a && (d = a.wheelDelta), "wheelDeltaY" in a && (d = a.wheelDeltaY), "wheelDeltaX" in a && (h = a.wheelDeltaX * -1), "axis" in a && a.axis === a.HORIZONTAL_AXIS && (h = d * -1, d = 0), l = 0 === d ? h : d, "deltaY" in a && (d = a.deltaY * -1, l = d), "deltaX" in a && (h = a.deltaX, 0 === d && (l = h * -1)), 0 !== d || 0 !== h) {
                    if (1 === a.deltaMode) {
                        var v = t.data(this, "mousewheel-line-height");
                        l *= v, d *= v, h *= v
                    } else if (2 === a.deltaMode) {
                        var m = t.data(this, "mousewheel-page-height");
                        l *= m, d *= m, h *= m
                    }
                    if (f = Math.max(Math.abs(d), Math.abs(h)), (!s || f < s) && (s = f, i(a, f) && (s /= 40)), i(a, f) && (l /= 40, h /= 40, d /= 40), l = Math[l >= 1 ? "floor" : "ceil"](l / s), h = Math[h >= 1 ? "floor" : "ceil"](h / s), d = Math[d >= 1 ? "floor" : "ceil"](d / s), c.settings.normalizeOffset && this.getBoundingClientRect) {
                        var _ = this.getBoundingClientRect();
                        p = e.clientX - _.left, g = e.clientY - _.top
                    }
                    return e.deltaX = h, e.deltaY = d, e.deltaFactor = s, e.offsetX = p, e.offsetY = g, e.deltaMode = 0, o.unshift(e, l, h, d), r && clearTimeout(r), r = setTimeout(n, 200), (t.event.dispatch || t.event.handle).apply(this, o);
                }
            }

            function n() {
                s = null
            }

            function i(t, e) {
                return c.settings.adjustOldDeltas && "mousewheel" === t.type && e % 120 === 0
            }

            var r, s, a = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
                o = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
                u = Array.prototype.slice;
            if (t.event.fixHooks) for (var l = a.length; l;) t.event.fixHooks[a[--l]] = t.event.mouseHooks;
            var c = t.event.special.mousewheel = {
                version: "3.1.12", setup: function () {
                    if (this.addEventListener) for (var n = o.length; n;) this.addEventListener(o[--n], e, !1); else this.onmousewheel = e;
                    t.data(this, "mousewheel-line-height", c.getLineHeight(this)), t.data(this, "mousewheel-page-height", c.getPageHeight(this))
                }, teardown: function () {
                    if (this.removeEventListener) for (var n = o.length; n;) this.removeEventListener(o[--n], e, !1); else this.onmousewheel = null;
                    t.removeData(this, "mousewheel-line-height"), t.removeData(this, "mousewheel-page-height")
                }, getLineHeight: function (e) {
                    var n = t(e), i = n["offsetParent" in t.fn ? "offsetParent" : "parent"]();
                    return i.length || (i = t("body")), parseInt(i.css("fontSize"), 10) || parseInt(n.css("fontSize"), 10) || 16
                }, getPageHeight: function (e) {
                    return t(e).height()
                }, settings: {adjustOldDeltas: !0, normalizeOffset: !0}
            };
            t.fn.extend({
                mousewheel: function (t) {
                    return t ? this.bind("mousewheel", t) : this.trigger("mousewheel")
                }, unmousewheel: function (t) {
                    return this.unbind("mousewheel", t)
                }
            })
        })
    }, {}],
    3: [function (t, e, n) {
        (function (t) {
            (function (t, e, n, i, r) {
                !function (e, n) {
                    "use strict";
                    "object" == typeof t && "object" == typeof t.exports ? t.exports = e.document ? n(e, !0) : function (t) {
                        if (!t.document) throw new Error("jQuery requires a window with a document");
                        return n(t)
                    } : n(e)
                }("undefined" != typeof window ? window : this, function (t, e) {
                    "use strict";

                    function n(t, e) {
                        e = e || nt;
                        var n = e.createElement("script");
                        n.text = t, e.head.appendChild(n).parentNode.removeChild(n)
                    }

                    function r(t) {
                        var e = !!t && "length" in t && t.length, n = gt.type(t);
                        return "function" !== n && !gt.isWindow(t) && ("array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
                    }

                    function s(t, e, n) {
                        return gt.isFunction(e) ? gt.grep(t, function (t, i) {
                            return !!e.call(t, i, t) !== n
                        }) : e.nodeType ? gt.grep(t, function (t) {
                            return t === e !== n
                        }) : "string" != typeof e ? gt.grep(t, function (t) {
                            return ot.call(e, t) > -1 !== n
                        }) : St.test(e) ? gt.filter(e, t, n) : (e = gt.filter(e, t), gt.grep(t, function (t) {
                            return ot.call(e, t) > -1 !== n && 1 === t.nodeType
                        }))
                    }

                    function a(t, e) {
                        for (; (t = t[e]) && 1 !== t.nodeType;) ;
                        return t
                    }

                    function o(t) {
                        var e = {};
                        return gt.each(t.match(Ot) || [], function (t, n) {
                            e[n] = !0
                        }), e
                    }

                    function u(t) {
                        return t
                    }

                    function l(t) {
                        throw t
                    }

                    function c(t, e, n) {
                        var i;
                        try {
                            t && gt.isFunction(i = t.promise) ? i.call(t).done(e).fail(n) : t && gt.isFunction(i = t.then) ? i.call(t, e, n) : e.call(void 0, t)
                        } catch (t) {
                            n.call(void 0, t)
                        }
                    }

                    function h() {
                        nt.removeEventListener("DOMContentLoaded", h), t.removeEventListener("load", h), gt.ready()
                    }

                    function d() {
                        this.expando = gt.expando + d.uid++
                    }

                    function f(t) {
                        return "true" === t || "false" !== t && ("null" === t ? null : t === +t + "" ? +t : Ft.test(t) ? JSON.parse(t) : t)
                    }

                    function p(t, e, n) {
                        var i;
                        if (void 0 === n && 1 === t.nodeType) if (i = "data-" + e.replace(qt, "-$&").toLowerCase(), n = t.getAttribute(i), "string" == typeof n) {
                            try {
                                n = f(n)
                            } catch (t) {
                            }
                            Nt.set(t, e, n)
                        } else n = void 0;
                        return n
                    }

                    function g(t, e, n, i) {
                        var r, s = 1, a = 20, o = i ? function () {
                                return i.cur()
                            } : function () {
                                return gt.css(t, e, "")
                            }, u = o(), l = n && n[3] || (gt.cssNumber[e] ? "" : "px"),
                            c = (gt.cssNumber[e] || "px" !== l && +u) && Bt.exec(gt.css(t, e));
                        if (c && c[3] !== l) {
                            l = l || c[3], n = n || [], c = +u || 1;
                            do s = s || ".5", c /= s, gt.style(t, e, c + l); while (s !== (s = o() / u) && 1 !== s && --a)
                        }
                        return n && (c = +c || +u || 0, r = n[1] ? c + (n[1] + 1) * n[2] : +n[2], i && (i.unit = l, i.start = c, i.end = r)), r
                    }

                    function v(t) {
                        var e, n = t.ownerDocument, i = t.nodeName, r = Gt[i];
                        return r ? r : (e = n.body.appendChild(n.createElement(i)), r = gt.css(e, "display"), e.parentNode.removeChild(e), "none" === r && (r = "block"), Gt[i] = r, r)
                    }

                    function m(t, e) {
                        for (var n, i, r = [], s = 0, a = t.length; s < a; s++) i = t[s], i.style && (n = i.style.display, e ? ("none" === n && (r[s] = Dt.get(i, "display") || null, r[s] || (i.style.display = "")), "" === i.style.display && Xt(i) && (r[s] = v(i))) : "none" !== n && (r[s] = "none", Dt.set(i, "display", n)));
                        for (s = 0; s < a; s++) null != r[s] && (t[s].style.display = r[s]);
                        return t
                    }

                    function _(t, e) {
                        var n;
                        return n = "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e || "*") : "undefined" != typeof t.querySelectorAll ? t.querySelectorAll(e || "*") : [], void 0 === e || e && gt.nodeName(t, e) ? gt.merge([t], n) : n
                    }

                    function y(t, e) {
                        for (var n = 0, i = t.length; n < i; n++) Dt.set(t[n], "globalEval", !e || Dt.get(e[n], "globalEval"))
                    }

                    function b(t, e, n, i, r) {
                        for (var s, a, o, u, l, c, h = e.createDocumentFragment(), d = [], f = 0, p = t.length; f < p; f++) if (s = t[f], s || 0 === s) if ("object" === gt.type(s)) gt.merge(d, s.nodeType ? [s] : s); else if (Qt.test(s)) {
                            for (a = a || h.appendChild(e.createElement("div")), o = ($t.exec(s) || ["", ""])[1].toLowerCase(), u = zt[o] || zt._default, a.innerHTML = u[1] + gt.htmlPrefilter(s) + u[2], c = u[0]; c--;) a = a.lastChild;
                            gt.merge(d, a.childNodes), a = h.firstChild, a.textContent = ""
                        } else d.push(e.createTextNode(s));
                        for (h.textContent = "", f = 0; s = d[f++];) if (i && gt.inArray(s, i) > -1) r && r.push(s); else if (l = gt.contains(s.ownerDocument, s), a = _(h.appendChild(s), "script"), l && y(a), n) for (c = 0; s = a[c++];) Wt.test(s.type || "") && n.push(s);
                        return h
                    }

                    function w() {
                        return !0
                    }

                    function x() {
                        return !1
                    }

                    function T() {
                        try {
                            return nt.activeElement
                        } catch (t) {
                        }
                    }

                    function E(t, e, n, i, r, s) {
                        var a, o;
                        if ("object" == typeof e) {
                            "string" != typeof n && (i = i || n, n = void 0);
                            for (o in e) E(t, o, n, i, e[o], s);
                            return t
                        }
                        if (null == i && null == r ? (r = n, i = n = void 0) : null == r && ("string" == typeof n ? (r = i, i = void 0) : (r = i, i = n, n = void 0)), r === !1) r = x; else if (!r) return t;
                        return 1 === s && (a = r, r = function (t) {
                            return gt().off(t), a.apply(this, arguments)
                        }, r.guid = a.guid || (a.guid = gt.guid++)), t.each(function () {
                            gt.event.add(this, e, r, i, n)
                        })
                    }

                    function S(t, e) {
                        return gt.nodeName(t, "table") && gt.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t : t
                    }

                    function L(t) {
                        return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t
                    }

                    function P(t) {
                        var e = re.exec(t.type);
                        return e ? t.type = e[1] : t.removeAttribute("type"), t
                    }

                    function C(t, e) {
                        var n, i, r, s, a, o, u, l;
                        if (1 === e.nodeType) {
                            if (Dt.hasData(t) && (s = Dt.access(t), a = Dt.set(e, s), l = s.events)) {
                                delete a.handle, a.events = {};
                                for (r in l) for (n = 0, i = l[r].length; n < i; n++) gt.event.add(e, r, l[r][n])
                            }
                            Nt.hasData(t) && (o = Nt.access(t), u = gt.extend({}, o), Nt.set(e, u))
                        }
                    }

                    function A(t, e) {
                        var n = e.nodeName.toLowerCase();
                        "input" === n && Yt.test(t.type) ? e.checked = t.checked : "input" !== n && "textarea" !== n || (e.defaultValue = t.defaultValue)
                    }

                    function k(t, e, i, r) {
                        e = st.apply([], e);
                        var s, a, o, u, l, c, h = 0, d = t.length, f = d - 1, p = e[0], g = gt.isFunction(p);
                        if (g || d > 1 && "string" == typeof p && !ft.checkClone && ie.test(p)) return t.each(function (n) {
                            var s = t.eq(n);
                            g && (e[0] = p.call(this, n, s.html())), k(s, e, i, r)
                        });
                        if (d && (s = b(e, t[0].ownerDocument, !1, t, r), a = s.firstChild, 1 === s.childNodes.length && (s = a), a || r)) {
                            for (o = gt.map(_(s, "script"), L), u = o.length; h < d; h++) l = s, h !== f && (l = gt.clone(l, !0, !0), u && gt.merge(o, _(l, "script"))), i.call(t[h], l, h);
                            if (u) for (c = o[o.length - 1].ownerDocument, gt.map(o, P), h = 0; h < u; h++) l = o[h], Wt.test(l.type || "") && !Dt.access(l, "globalEval") && gt.contains(c, l) && (l.src ? gt._evalUrl && gt._evalUrl(l.src) : n(l.textContent.replace(se, ""), c))
                        }
                        return t
                    }

                    function O(t, e, n) {
                        for (var i, r = e ? gt.filter(e, t) : t, s = 0; null != (i = r[s]); s++) n || 1 !== i.nodeType || gt.cleanData(_(i)), i.parentNode && (n && gt.contains(i.ownerDocument, i) && y(_(i, "script")), i.parentNode.removeChild(i));
                        return t
                    }

                    function R(t, e, n) {
                        var i, r, s, a, o = t.style;
                        return n = n || ue(t), n && (a = n.getPropertyValue(e) || n[e], "" !== a || gt.contains(t.ownerDocument, t) || (a = gt.style(t, e)), !ft.pixelMarginRight() && oe.test(a) && ae.test(e) && (i = o.width, r = o.minWidth, s = o.maxWidth, o.minWidth = o.maxWidth = o.width = a, a = n.width, o.width = i, o.minWidth = r, o.maxWidth = s)), void 0 !== a ? a + "" : a
                    }

                    function I(t, e) {
                        return {
                            get: function () {
                                return t() ? void delete this.get : (this.get = e).apply(this, arguments)
                            }
                        }
                    }

                    function M(t) {
                        if (t in fe) return t;
                        for (var e = t[0].toUpperCase() + t.slice(1), n = de.length; n--;) if (t = de[n] + e, t in fe) return t
                    }

                    function j(t, e, n) {
                        var i = Bt.exec(e);
                        return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : e
                    }

                    function D(t, e, n, i, r) {
                        var s, a = 0;
                        for (s = n === (i ? "border" : "content") ? 4 : "width" === e ? 1 : 0; s < 4; s += 2) "margin" === n && (a += gt.css(t, n + Vt[s], !0, r)), i ? ("content" === n && (a -= gt.css(t, "padding" + Vt[s], !0, r)), "margin" !== n && (a -= gt.css(t, "border" + Vt[s] + "Width", !0, r))) : (a += gt.css(t, "padding" + Vt[s], !0, r), "padding" !== n && (a += gt.css(t, "border" + Vt[s] + "Width", !0, r)));
                        return a
                    }

                    function N(t, e, n) {
                        var i, r = !0, s = ue(t), a = "border-box" === gt.css(t, "boxSizing", !1, s);
                        if (t.getClientRects().length && (i = t.getBoundingClientRect()[e]), i <= 0 || null == i) {
                            if (i = R(t, e, s), (i < 0 || null == i) && (i = t.style[e]), oe.test(i)) return i;
                            r = a && (ft.boxSizingReliable() || i === t.style[e]), i = parseFloat(i) || 0
                        }
                        return i + D(t, e, n || (a ? "border" : "content"), r, s) + "px"
                    }

                    function F(t, e, n, i, r) {
                        return new F.prototype.init(t, e, n, i, r)
                    }

                    function q() {
                        ge && (t.requestAnimationFrame(q), gt.fx.tick())
                    }

                    function H() {
                        return t.setTimeout(function () {
                            pe = void 0
                        }), pe = gt.now()
                    }

                    function B(t, e) {
                        var n, i = 0, r = {height: t};
                        for (e = e ? 1 : 0; i < 4; i += 2 - e) n = Vt[i], r["margin" + n] = r["padding" + n] = t;
                        return e && (r.opacity = r.width = t), r
                    }

                    function V(t, e, n) {
                        for (var i, r = (G.tweeners[e] || []).concat(G.tweeners["*"]), s = 0, a = r.length; s < a; s++) if (i = r[s].call(n, e, t)) return i
                    }

                    function X(t, e, n) {
                        var i, r, s, a, o, u, l, c, h = "width" in e || "height" in e, d = this, f = {}, p = t.style,
                            g = t.nodeType && Xt(t), v = Dt.get(t, "fxshow");
                        n.queue || (a = gt._queueHooks(t, "fx"), null == a.unqueued && (a.unqueued = 0, o = a.empty.fire, a.empty.fire = function () {
                            a.unqueued || o()
                        }), a.unqueued++, d.always(function () {
                            d.always(function () {
                                a.unqueued--, gt.queue(t, "fx").length || a.empty.fire()
                            })
                        }));
                        for (i in e) if (r = e[i], ve.test(r)) {
                            if (delete e[i], s = s || "toggle" === r, r === (g ? "hide" : "show")) {
                                if ("show" !== r || !v || void 0 === v[i]) continue;
                                g = !0
                            }
                            f[i] = v && v[i] || gt.style(t, i)
                        }
                        if (u = !gt.isEmptyObject(e), u || !gt.isEmptyObject(f)) {
                            h && 1 === t.nodeType && (n.overflow = [p.overflow, p.overflowX, p.overflowY], l = v && v.display, null == l && (l = Dt.get(t, "display")), c = gt.css(t, "display"), "none" === c && (l ? c = l : (m([t], !0), l = t.style.display || l, c = gt.css(t, "display"), m([t]))), ("inline" === c || "inline-block" === c && null != l) && "none" === gt.css(t, "float") && (u || (d.done(function () {
                                p.display = l
                            }), null == l && (c = p.display, l = "none" === c ? "" : c)), p.display = "inline-block")), n.overflow && (p.overflow = "hidden", d.always(function () {
                                p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
                            })), u = !1;
                            for (i in f) u || (v ? "hidden" in v && (g = v.hidden) : v = Dt.access(t, "fxshow", {display: l}), s && (v.hidden = !g), g && m([t], !0), d.done(function () {
                                g || m([t]), Dt.remove(t, "fxshow");
                                for (i in f) gt.style(t, i, f[i])
                            })), u = V(g ? v[i] : 0, i, d), i in v || (v[i] = u.start, g && (u.end = u.start, u.start = 0))
                        }
                    }

                    function U(t, e) {
                        var n, i, r, s, a;
                        for (n in t) if (i = gt.camelCase(n), r = e[i], s = t[n], gt.isArray(s) && (r = s[1], s = t[n] = s[0]), n !== i && (t[i] = s, delete t[n]), a = gt.cssHooks[i], a && "expand" in a) {
                            s = a.expand(s), delete t[i];
                            for (n in s) n in t || (t[n] = s[n], e[n] = r)
                        } else e[i] = r
                    }

                    function G(t, e, n) {
                        var i, r, s = 0, a = G.prefilters.length, o = gt.Deferred().always(function () {
                            delete u.elem
                        }), u = function () {
                            if (r) return !1;
                            for (var e = pe || H(), n = Math.max(0, l.startTime + l.duration - e), i = n / l.duration || 0, s = 1 - i, a = 0, u = l.tweens.length; a < u; a++) l.tweens[a].run(s);
                            return o.notifyWith(t, [l, s, n]), s < 1 && u ? n : (o.resolveWith(t, [l]), !1)
                        }, l = o.promise({
                            elem: t,
                            props: gt.extend({}, e),
                            opts: gt.extend(!0, {specialEasing: {}, easing: gt.easing._default}, n),
                            originalProperties: e,
                            originalOptions: n,
                            startTime: pe || H(),
                            duration: n.duration,
                            tweens: [],
                            createTween: function (e, n) {
                                var i = gt.Tween(t, l.opts, e, n, l.opts.specialEasing[e] || l.opts.easing);
                                return l.tweens.push(i), i
                            },
                            stop: function (e) {
                                var n = 0, i = e ? l.tweens.length : 0;
                                if (r) return this;
                                for (r = !0; n < i; n++) l.tweens[n].run(1);
                                return e ? (o.notifyWith(t, [l, 1, 0]), o.resolveWith(t, [l, e])) : o.rejectWith(t, [l, e]), this
                            }
                        }), c = l.props;
                        for (U(c, l.opts.specialEasing); s < a; s++) if (i = G.prefilters[s].call(l, t, c, l.opts)) return gt.isFunction(i.stop) && (gt._queueHooks(l.elem, l.opts.queue).stop = gt.proxy(i.stop, i)), i;
                        return gt.map(c, V, l), gt.isFunction(l.opts.start) && l.opts.start.call(t, l), gt.fx.timer(gt.extend(u, {
                            elem: t,
                            anim: l,
                            queue: l.opts.queue
                        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
                    }

                    function Y(t) {
                        var e = t.match(Ot) || [];
                        return e.join(" ")
                    }

                    function $(t) {
                        return t.getAttribute && t.getAttribute("class") || ""
                    }

                    function W(t, e, n, i) {
                        var r;
                        if (gt.isArray(e)) gt.each(e, function (e, r) {
                            n || Pe.test(t) ? i(t, r) : W(t + "[" + ("object" == typeof r && null != r ? e : "") + "]", r, n, i)
                        }); else if (n || "object" !== gt.type(e)) i(t, e); else for (r in e) W(t + "[" + r + "]", e[r], n, i)
                    }

                    function z(t) {
                        return function (e, n) {
                            "string" != typeof e && (n = e, e = "*");
                            var i, r = 0, s = e.toLowerCase().match(Ot) || [];
                            if (gt.isFunction(n)) for (; i = s[r++];) "+" === i[0] ? (i = i.slice(1) || "*", (t[i] = t[i] || []).unshift(n)) : (t[i] = t[i] || []).push(n)
                        }
                    }

                    function Q(t, e, n, i) {
                        function r(o) {
                            var u;
                            return s[o] = !0, gt.each(t[o] || [], function (t, o) {
                                var l = o(e, n, i);
                                return "string" != typeof l || a || s[l] ? a ? !(u = l) : void 0 : (e.dataTypes.unshift(l), r(l), !1)
                            }), u
                        }

                        var s = {}, a = t === qe;
                        return r(e.dataTypes[0]) || !s["*"] && r("*")
                    }

                    function J(t, e) {
                        var n, i, r = gt.ajaxSettings.flatOptions || {};
                        for (n in e) void 0 !== e[n] && ((r[n] ? t : i || (i = {}))[n] = e[n]);
                        return i && gt.extend(!0, t, i), t
                    }

                    function Z(t, e, n) {
                        for (var i, r, s, a, o = t.contents, u = t.dataTypes; "*" === u[0];) u.shift(), void 0 === i && (i = t.mimeType || e.getResponseHeader("Content-Type"));
                        if (i) for (r in o) if (o[r] && o[r].test(i)) {
                            u.unshift(r);
                            break
                        }
                        if (u[0] in n) s = u[0]; else {
                            for (r in n) {
                                if (!u[0] || t.converters[r + " " + u[0]]) {
                                    s = r;
                                    break
                                }
                                a || (a = r)
                            }
                            s = s || a
                        }
                        if (s) return s !== u[0] && u.unshift(s), n[s]
                    }

                    function K(t, e, n, i) {
                        var r, s, a, o, u, l = {}, c = t.dataTypes.slice();
                        if (c[1]) for (a in t.converters) l[a.toLowerCase()] = t.converters[a];
                        for (s = c.shift(); s;) if (t.responseFields[s] && (n[t.responseFields[s]] = e), !u && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)), u = s, s = c.shift()) if ("*" === s) s = u; else if ("*" !== u && u !== s) {
                            if (a = l[u + " " + s] || l["* " + s], !a) for (r in l) if (o = r.split(" "), o[1] === s && (a = l[u + " " + o[0]] || l["* " + o[0]])) {
                                a === !0 ? a = l[r] : l[r] !== !0 && (s = o[0], c.unshift(o[1]));
                                break
                            }
                            if (a !== !0) if (a && t.throws) e = a(e); else try {
                                e = a(e)
                            } catch (t) {
                                return {state: "parsererror", error: a ? t : "No conversion from " + u + " to " + s}
                            }
                        }
                        return {state: "success", data: e}
                    }

                    function tt(t) {
                        return gt.isWindow(t) ? t : 9 === t.nodeType && t.defaultView
                    }

                    var et = [], nt = t.document, it = Object.getPrototypeOf, rt = et.slice, st = et.concat,
                        at = et.push, ot = et.indexOf, ut = {}, lt = ut.toString, ct = ut.hasOwnProperty,
                        ht = ct.toString, dt = ht.call(Object), ft = {}, pt = "3.1.1", gt = function (t, e) {
                            return new gt.fn.init(t, e)
                        }, vt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, mt = /^-ms-/, _t = /-([a-z])/g, yt = function (t, e) {
                            return e.toUpperCase()
                        };
                    gt.fn = gt.prototype = {
                        jquery: pt, constructor: gt, length: 0, toArray: function () {
                            return rt.call(this)
                        }, get: function (t) {
                            return null == t ? rt.call(this) : t < 0 ? this[t + this.length] : this[t]
                        }, pushStack: function (t) {
                            var e = gt.merge(this.constructor(), t);
                            return e.prevObject = this, e
                        }, each: function (t) {
                            return gt.each(this, t)
                        }, map: function (t) {
                            return this.pushStack(gt.map(this, function (e, n) {
                                return t.call(e, n, e)
                            }))
                        }, slice: function () {
                            return this.pushStack(rt.apply(this, arguments))
                        }, first: function () {
                            return this.eq(0)
                        }, last: function () {
                            return this.eq(-1)
                        }, eq: function (t) {
                            var e = this.length, n = +t + (t < 0 ? e : 0);
                            return this.pushStack(n >= 0 && n < e ? [this[n]] : [])
                        }, end: function () {
                            return this.prevObject || this.constructor()
                        }, push: at, sort: et.sort, splice: et.splice
                    }, gt.extend = gt.fn.extend = function () {
                        var t, e, n, i, r, s, a = arguments[0] || {}, o = 1, u = arguments.length, l = !1;
                        for ("boolean" == typeof a && (l = a, a = arguments[o] || {}, o++), "object" == typeof a || gt.isFunction(a) || (a = {}), o === u && (a = this, o--); o < u; o++) if (null != (t = arguments[o])) for (e in t) n = a[e], i = t[e], a !== i && (l && i && (gt.isPlainObject(i) || (r = gt.isArray(i))) ? (r ? (r = !1, s = n && gt.isArray(n) ? n : []) : s = n && gt.isPlainObject(n) ? n : {}, a[e] = gt.extend(l, s, i)) : void 0 !== i && (a[e] = i));
                        return a
                    }, gt.extend({
                        expando: "jQuery" + (pt + Math.random()).replace(/\D/g, ""),
                        isReady: !0,
                        error: function (t) {
                            throw new Error(t)
                        },
                        noop: function () {
                        },
                        isFunction: function (t) {
                            return "function" === gt.type(t)
                        },
                        isArray: Array.isArray,
                        isWindow: function (t) {
                            return null != t && t === t.window
                        },
                        isNumeric: function (t) {
                            var e = gt.type(t);
                            return ("number" === e || "string" === e) && !isNaN(t - parseFloat(t))
                        },
                        isPlainObject: function (t) {
                            var e, n;
                            return !(!t || "[object Object]" !== lt.call(t)) && (!(e = it(t)) || (n = ct.call(e, "constructor") && e.constructor, "function" == typeof n && ht.call(n) === dt))
                        },
                        isEmptyObject: function (t) {
                            var e;
                            for (e in t) return !1;
                            return !0
                        },
                        type: function (t) {
                            return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? ut[lt.call(t)] || "object" : typeof t
                        },
                        globalEval: function (t) {
                            n(t)
                        },
                        camelCase: function (t) {
                            return t.replace(mt, "ms-").replace(_t, yt)
                        },
                        nodeName: function (t, e) {
                            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
                        },
                        each: function (t, e) {
                            var n, i = 0;
                            if (r(t)) for (n = t.length; i < n && e.call(t[i], i, t[i]) !== !1; i++) ; else for (i in t) if (e.call(t[i], i, t[i]) === !1) break;
                            return t
                        },
                        trim: function (t) {
                            return null == t ? "" : (t + "").replace(vt, "")
                        },
                        makeArray: function (t, e) {
                            var n = e || [];
                            return null != t && (r(Object(t)) ? gt.merge(n, "string" == typeof t ? [t] : t) : at.call(n, t)), n
                        },
                        inArray: function (t, e, n) {
                            return null == e ? -1 : ot.call(e, t, n)
                        },
                        merge: function (t, e) {
                            for (var n = +e.length, i = 0, r = t.length; i < n; i++) t[r++] = e[i];
                            return t.length = r, t
                        },
                        grep: function (t, e, n) {
                            for (var i, r = [], s = 0, a = t.length, o = !n; s < a; s++) i = !e(t[s], s), i !== o && r.push(t[s]);
                            return r
                        },
                        map: function (t, e, n) {
                            var i, s, a = 0, o = [];
                            if (r(t)) for (i = t.length; a < i; a++) s = e(t[a], a, n), null != s && o.push(s); else for (a in t) s = e(t[a], a, n), null != s && o.push(s);
                            return st.apply([], o)
                        },
                        guid: 1,
                        proxy: function (t, e) {
                            var n, i, r;
                            if ("string" == typeof e && (n = t[e], e = t, t = n), gt.isFunction(t)) return i = rt.call(arguments, 2), r = function () {
                                return t.apply(e || this, i.concat(rt.call(arguments)))
                            }, r.guid = t.guid = t.guid || gt.guid++, r
                        },
                        now: Date.now,
                        support: ft
                    }), "function" == typeof Symbol && (gt.fn[Symbol.iterator] = et[Symbol.iterator]), gt.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (t, e) {
                        ut["[object " + e + "]"] = e.toLowerCase()
                    });
                    var bt = function (t) {
                        function e(t, e, n, i) {
                            var r, s, a, o, u, l, c, d = e && e.ownerDocument, p = e ? e.nodeType : 9;
                            if (n = n || [], "string" != typeof t || !t || 1 !== p && 9 !== p && 11 !== p) return n;
                            if (!i && ((e ? e.ownerDocument || e : B) !== I && R(e), e = e || I, j)) {
                                if (11 !== p && (u = mt.exec(t))) if (r = u[1]) {
                                    if (9 === p) {
                                        if (!(a = e.getElementById(r))) return n;
                                        if (a.id === r) return n.push(a), n
                                    } else if (d && (a = d.getElementById(r)) && q(e, a) && a.id === r) return n.push(a), n
                                } else {
                                    if (u[2]) return Z.apply(n, e.getElementsByTagName(t)), n;
                                    if ((r = u[3]) && x.getElementsByClassName && e.getElementsByClassName) return Z.apply(n, e.getElementsByClassName(r)), n
                                }
                                if (x.qsa && !Y[t + " "] && (!D || !D.test(t))) {
                                    if (1 !== p) d = e, c = t; else if ("object" !== e.nodeName.toLowerCase()) {
                                        for ((o = e.getAttribute("id")) ? o = o.replace(wt, xt) : e.setAttribute("id", o = H), l = L(t), s = l.length; s--;) l[s] = "#" + o + " " + f(l[s]);
                                        c = l.join(","), d = _t.test(t) && h(e.parentNode) || e
                                    }
                                    if (c) try {
                                        return Z.apply(n, d.querySelectorAll(c)), n
                                    } catch (t) {
                                    } finally {
                                        o === H && e.removeAttribute("id")
                                    }
                                }
                            }
                            return C(t.replace(ot, "$1"), e, n, i)
                        }

                        function n() {
                            function t(n, i) {
                                return e.push(n + " ") > T.cacheLength && delete t[e.shift()], t[n + " "] = i
                            }

                            var e = [];
                            return t
                        }

                        function i(t) {
                            return t[H] = !0, t
                        }

                        function r(t) {
                            var e = I.createElement("fieldset");
                            try {
                                return !!t(e)
                            } catch (t) {
                                return !1
                            } finally {
                                e.parentNode && e.parentNode.removeChild(e), e = null
                            }
                        }

                        function s(t, e) {
                            for (var n = t.split("|"), i = n.length; i--;) T.attrHandle[n[i]] = e
                        }

                        function a(t, e) {
                            var n = e && t,
                                i = n && 1 === t.nodeType && 1 === e.nodeType && t.sourceIndex - e.sourceIndex;
                            if (i) return i;
                            if (n) for (; n = n.nextSibling;) if (n === e) return -1;
                            return t ? 1 : -1
                        }

                        function o(t) {
                            return function (e) {
                                var n = e.nodeName.toLowerCase();
                                return "input" === n && e.type === t
                            }
                        }

                        function u(t) {
                            return function (e) {
                                var n = e.nodeName.toLowerCase();
                                return ("input" === n || "button" === n) && e.type === t
                            }
                        }

                        function l(t) {
                            return function (e) {
                                return "form" in e ? e.parentNode && e.disabled === !1 ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && Et(e) === t : e.disabled === t : "label" in e && e.disabled === t
                            }
                        }

                        function c(t) {
                            return i(function (e) {
                                return e = +e, i(function (n, i) {
                                    for (var r, s = t([], n.length, e), a = s.length; a--;) n[r = s[a]] && (n[r] = !(i[r] = n[r]))
                                })
                            })
                        }

                        function h(t) {
                            return t && "undefined" != typeof t.getElementsByTagName && t
                        }

                        function d() {
                        }

                        function f(t) {
                            for (var e = 0, n = t.length, i = ""; e < n; e++) i += t[e].value;
                            return i
                        }

                        function p(t, e, n) {
                            var i = e.dir, r = e.next, s = r || i, a = n && "parentNode" === s, o = X++;
                            return e.first ? function (e, n, r) {
                                for (; e = e[i];) if (1 === e.nodeType || a) return t(e, n, r);
                                return !1
                            } : function (e, n, u) {
                                var l, c, h, d = [V, o];
                                if (u) {
                                    for (; e = e[i];) if ((1 === e.nodeType || a) && t(e, n, u)) return !0
                                } else for (; e = e[i];) if (1 === e.nodeType || a) if (h = e[H] || (e[H] = {}), c = h[e.uniqueID] || (h[e.uniqueID] = {}), r && r === e.nodeName.toLowerCase()) e = e[i] || e; else {
                                    if ((l = c[s]) && l[0] === V && l[1] === o) return d[2] = l[2];
                                    if (c[s] = d, d[2] = t(e, n, u)) return !0
                                }
                                return !1
                            }
                        }

                        function g(t) {
                            return t.length > 1 ? function (e, n, i) {
                                for (var r = t.length; r--;) if (!t[r](e, n, i)) return !1;
                                return !0
                            } : t[0]
                        }

                        function v(t, n, i) {
                            for (var r = 0, s = n.length; r < s; r++) e(t, n[r], i);
                            return i
                        }

                        function m(t, e, n, i, r) {
                            for (var s, a = [], o = 0, u = t.length, l = null != e; o < u; o++) (s = t[o]) && (n && !n(s, i, r) || (a.push(s), l && e.push(o)));
                            return a
                        }

                        function _(t, e, n, r, s, a) {
                            return r && !r[H] && (r = _(r)), s && !s[H] && (s = _(s, a)), i(function (i, a, o, u) {
                                var l, c, h, d = [], f = [], p = a.length,
                                    g = i || v(e || "*", o.nodeType ? [o] : o, []),
                                    _ = !t || !i && e ? g : m(g, d, t, o, u),
                                    y = n ? s || (i ? t : p || r) ? [] : a : _;
                                if (n && n(_, y, o, u), r) for (l = m(y, f), r(l, [], o, u), c = l.length; c--;) (h = l[c]) && (y[f[c]] = !(_[f[c]] = h));
                                if (i) {
                                    if (s || t) {
                                        if (s) {
                                            for (l = [], c = y.length; c--;) (h = y[c]) && l.push(_[c] = h);
                                            s(null, y = [], l, u)
                                        }
                                        for (c = y.length; c--;) (h = y[c]) && (l = s ? tt(i, h) : d[c]) > -1 && (i[l] = !(a[l] = h))
                                    }
                                } else y = m(y === a ? y.splice(p, y.length) : y), s ? s(null, a, y, u) : Z.apply(a, y)
                            })
                        }

                        function y(t) {
                            for (var e, n, i, r = t.length, s = T.relative[t[0].type], a = s || T.relative[" "], o = s ? 1 : 0, u = p(function (t) {
                                return t === e
                            }, a, !0), l = p(function (t) {
                                return tt(e, t) > -1
                            }, a, !0), c = [function (t, n, i) {
                                var r = !s && (i || n !== A) || ((e = n).nodeType ? u(t, n, i) : l(t, n, i));
                                return e = null, r
                            }]; o < r; o++) if (n = T.relative[t[o].type]) c = [p(g(c), n)]; else {
                                if (n = T.filter[t[o].type].apply(null, t[o].matches), n[H]) {
                                    for (i = ++o; i < r && !T.relative[t[i].type]; i++) ;
                                    return _(o > 1 && g(c), o > 1 && f(t.slice(0, o - 1).concat({value: " " === t[o - 2].type ? "*" : ""})).replace(ot, "$1"), n, o < i && y(t.slice(o, i)), i < r && y(t = t.slice(i)), i < r && f(t))
                                }
                                c.push(n)
                            }
                            return g(c)
                        }

                        function b(t, n) {
                            var r = n.length > 0, s = t.length > 0, a = function (i, a, o, u, l) {
                                var c, h, d, f = 0, p = "0", g = i && [], v = [], _ = A,
                                    y = i || s && T.find.TAG("*", l), b = V += null == _ ? 1 : Math.random() || .1,
                                    w = y.length;
                                for (l && (A = a === I || a || l); p !== w && null != (c = y[p]); p++) {
                                    if (s && c) {
                                        for (h = 0, a || c.ownerDocument === I || (R(c), o = !j); d = t[h++];) if (d(c, a || I, o)) {
                                            u.push(c);
                                            break
                                        }
                                        l && (V = b)
                                    }
                                    r && ((c = !d && c) && f--, i && g.push(c))
                                }
                                if (f += p, r && p !== f) {
                                    for (h = 0; d = n[h++];) d(g, v, a, o);
                                    if (i) {
                                        if (f > 0) for (; p--;) g[p] || v[p] || (v[p] = Q.call(u));
                                        v = m(v)
                                    }
                                    Z.apply(u, v), l && !i && v.length > 0 && f + n.length > 1 && e.uniqueSort(u)
                                }
                                return l && (V = b, A = _), g
                            };
                            return r ? i(a) : a
                        }

                        var w, x, T, E, S, L, P, C, A, k, O, R, I, M, j, D, N, F, q, H = "sizzle" + 1 * new Date,
                            B = t.document, V = 0, X = 0, U = n(), G = n(), Y = n(), $ = function (t, e) {
                                return t === e && (O = !0), 0
                            }, W = {}.hasOwnProperty, z = [], Q = z.pop, J = z.push, Z = z.push, K = z.slice,
                            tt = function (t, e) {
                                for (var n = 0, i = t.length; n < i; n++) if (t[n] === e) return n;
                                return -1
                            },
                            et = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                            nt = "[\\x20\\t\\r\\n\\f]", it = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                            rt = "\\[" + nt + "*(" + it + ")(?:" + nt + "*([*^$|!~]?=)" + nt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + it + "))|)" + nt + "*\\]",
                            st = ":(" + it + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + rt + ")*)|.*)\\)|)",
                            at = new RegExp(nt + "+", "g"),
                            ot = new RegExp("^" + nt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + nt + "+$", "g"),
                            ut = new RegExp("^" + nt + "*," + nt + "*"),
                            lt = new RegExp("^" + nt + "*([>+~]|" + nt + ")" + nt + "*"),
                            ct = new RegExp("=" + nt + "*([^\\]'\"]*?)" + nt + "*\\]", "g"), ht = new RegExp(st),
                            dt = new RegExp("^" + it + "$"), ft = {
                                ID: new RegExp("^#(" + it + ")"),
                                CLASS: new RegExp("^\\.(" + it + ")"),
                                TAG: new RegExp("^(" + it + "|[*])"),
                                ATTR: new RegExp("^" + rt),
                                PSEUDO: new RegExp("^" + st),
                                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + nt + "*(even|odd|(([+-]|)(\\d*)n|)" + nt + "*(?:([+-]|)" + nt + "*(\\d+)|))" + nt + "*\\)|)", "i"),
                                bool: new RegExp("^(?:" + et + ")$", "i"),
                                needsContext: new RegExp("^" + nt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + nt + "*((?:-\\d)?\\d*)" + nt + "*\\)|)(?=[^-]|$)", "i")
                            }, pt = /^(?:input|select|textarea|button)$/i, gt = /^h\d$/i, vt = /^[^{]+\{\s*\[native \w/,
                            mt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, _t = /[+~]/,
                            yt = new RegExp("\\\\([\\da-f]{1,6}" + nt + "?|(" + nt + ")|.)", "ig"),
                            bt = function (t, e, n) {
                                var i = "0x" + e - 65536;
                                return i !== i || n ? e : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
                            }, wt = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, xt = function (t, e) {
                                return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
                            }, Tt = function () {
                                R()
                            }, Et = p(function (t) {
                                return t.disabled === !0 && ("form" in t || "label" in t)
                            }, {dir: "parentNode", next: "legend"});
                        try {
                            Z.apply(z = K.call(B.childNodes), B.childNodes), z[B.childNodes.length].nodeType
                        } catch (t) {
                            Z = {
                                apply: z.length ? function (t, e) {
                                    J.apply(t, K.call(e))
                                } : function (t, e) {
                                    for (var n = t.length, i = 0; t[n++] = e[i++];) ;
                                    t.length = n - 1
                                }
                            }
                        }
                        x = e.support = {}, S = e.isXML = function (t) {
                            var e = t && (t.ownerDocument || t).documentElement;
                            return !!e && "HTML" !== e.nodeName
                        }, R = e.setDocument = function (t) {
                            var e, n, i = t ? t.ownerDocument || t : B;
                            return i !== I && 9 === i.nodeType && i.documentElement ? (I = i, M = I.documentElement, j = !S(I), B !== I && (n = I.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", Tt, !1) : n.attachEvent && n.attachEvent("onunload", Tt)), x.attributes = r(function (t) {
                                return t.className = "i", !t.getAttribute("className")
                            }), x.getElementsByTagName = r(function (t) {
                                return t.appendChild(I.createComment("")), !t.getElementsByTagName("*").length
                            }), x.getElementsByClassName = vt.test(I.getElementsByClassName), x.getById = r(function (t) {
                                return M.appendChild(t).id = H, !I.getElementsByName || !I.getElementsByName(H).length
                            }), x.getById ? (T.filter.ID = function (t) {
                                var e = t.replace(yt, bt);
                                return function (t) {
                                    return t.getAttribute("id") === e
                                }
                            }, T.find.ID = function (t, e) {
                                if ("undefined" != typeof e.getElementById && j) {
                                    var n = e.getElementById(t);
                                    return n ? [n] : []
                                }
                            }) : (T.filter.ID = function (t) {
                                var e = t.replace(yt, bt);
                                return function (t) {
                                    var n = "undefined" != typeof t.getAttributeNode && t.getAttributeNode("id");
                                    return n && n.value === e
                                }
                            }, T.find.ID = function (t, e) {
                                if ("undefined" != typeof e.getElementById && j) {
                                    var n, i, r, s = e.getElementById(t);
                                    if (s) {
                                        if (n = s.getAttributeNode("id"), n && n.value === t) return [s];
                                        for (r = e.getElementsByName(t), i = 0; s = r[i++];) if (n = s.getAttributeNode("id"), n && n.value === t) return [s]
                                    }
                                    return []
                                }
                            }), T.find.TAG = x.getElementsByTagName ? function (t, e) {
                                return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t) : x.qsa ? e.querySelectorAll(t) : void 0
                            } : function (t, e) {
                                var n, i = [], r = 0, s = e.getElementsByTagName(t);
                                if ("*" === t) {
                                    for (; n = s[r++];) 1 === n.nodeType && i.push(n);
                                    return i
                                }
                                return s
                            }, T.find.CLASS = x.getElementsByClassName && function (t, e) {
                                if ("undefined" != typeof e.getElementsByClassName && j) return e.getElementsByClassName(t)
                            }, N = [], D = [], (x.qsa = vt.test(I.querySelectorAll)) && (r(function (t) {
                                M.appendChild(t).innerHTML = "<a id='" + H + "'></a><select id='" + H + "-\r\\' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && D.push("[*^$]=" + nt + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || D.push("\\[" + nt + "*(?:value|" + et + ")"), t.querySelectorAll("[id~=" + H + "-]").length || D.push("~="), t.querySelectorAll(":checked").length || D.push(":checked"), t.querySelectorAll("a#" + H + "+*").length || D.push(".#.+[+~]")
                            }), r(function (t) {
                                t.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                                var e = I.createElement("input");
                                e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && D.push("name" + nt + "*[*^$|!~]?="), 2 !== t.querySelectorAll(":enabled").length && D.push(":enabled", ":disabled"), M.appendChild(t).disabled = !0, 2 !== t.querySelectorAll(":disabled").length && D.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), D.push(",.*:")
                            })), (x.matchesSelector = vt.test(F = M.matches || M.webkitMatchesSelector || M.mozMatchesSelector || M.oMatchesSelector || M.msMatchesSelector)) && r(function (t) {
                                x.disconnectedMatch = F.call(t, "*"), F.call(t, "[s!='']:x"), N.push("!=", st)
                            }), D = D.length && new RegExp(D.join("|")), N = N.length && new RegExp(N.join("|")), e = vt.test(M.compareDocumentPosition), q = e || vt.test(M.contains) ? function (t, e) {
                                var n = 9 === t.nodeType ? t.documentElement : t, i = e && e.parentNode;
                                return t === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(i)))
                            } : function (t, e) {
                                if (e) for (; e = e.parentNode;) if (e === t) return !0;
                                return !1
                            }, $ = e ? function (t, e) {
                                if (t === e) return O = !0, 0;
                                var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
                                return n ? n : (n = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 1 & n || !x.sortDetached && e.compareDocumentPosition(t) === n ? t === I || t.ownerDocument === B && q(B, t) ? -1 : e === I || e.ownerDocument === B && q(B, e) ? 1 : k ? tt(k, t) - tt(k, e) : 0 : 4 & n ? -1 : 1)
                            } : function (t, e) {
                                if (t === e) return O = !0, 0;
                                var n, i = 0, r = t.parentNode, s = e.parentNode, o = [t], u = [e];
                                if (!r || !s) return t === I ? -1 : e === I ? 1 : r ? -1 : s ? 1 : k ? tt(k, t) - tt(k, e) : 0;
                                if (r === s) return a(t, e);
                                for (n = t; n = n.parentNode;) o.unshift(n);
                                for (n = e; n = n.parentNode;) u.unshift(n);
                                for (; o[i] === u[i];) i++;
                                return i ? a(o[i], u[i]) : o[i] === B ? -1 : u[i] === B ? 1 : 0
                            }, I) : I
                        }, e.matches = function (t, n) {
                            return e(t, null, null, n)
                        }, e.matchesSelector = function (t, n) {
                            if ((t.ownerDocument || t) !== I && R(t), n = n.replace(ct, "='$1']"), x.matchesSelector && j && !Y[n + " "] && (!N || !N.test(n)) && (!D || !D.test(n))) try {
                                var i = F.call(t, n);
                                if (i || x.disconnectedMatch || t.document && 11 !== t.document.nodeType) return i
                            } catch (t) {
                            }
                            return e(n, I, null, [t]).length > 0
                        }, e.contains = function (t, e) {
                            return (t.ownerDocument || t) !== I && R(t), q(t, e)
                        }, e.attr = function (t, e) {
                            (t.ownerDocument || t) !== I && R(t);
                            var n = T.attrHandle[e.toLowerCase()],
                                i = n && W.call(T.attrHandle, e.toLowerCase()) ? n(t, e, !j) : void 0;
                            return void 0 !== i ? i : x.attributes || !j ? t.getAttribute(e) : (i = t.getAttributeNode(e)) && i.specified ? i.value : null
                        }, e.escape = function (t) {
                            return (t + "").replace(wt, xt)
                        }, e.error = function (t) {
                            throw new Error("Syntax error, unrecognized expression: " + t)
                        }, e.uniqueSort = function (t) {
                            var e, n = [], i = 0, r = 0;
                            if (O = !x.detectDuplicates, k = !x.sortStable && t.slice(0), t.sort($), O) {
                                for (; e = t[r++];) e === t[r] && (i = n.push(r));
                                for (; i--;) t.splice(n[i], 1)
                            }
                            return k = null, t
                        }, E = e.getText = function (t) {
                            var e, n = "", i = 0, r = t.nodeType;
                            if (r) {
                                if (1 === r || 9 === r || 11 === r) {
                                    if ("string" == typeof t.textContent) return t.textContent;
                                    for (t = t.firstChild; t; t = t.nextSibling) n += E(t)
                                } else if (3 === r || 4 === r) return t.nodeValue
                            } else for (; e = t[i++];) n += E(e);
                            return n
                        }, T = e.selectors = {
                            cacheLength: 50,
                            createPseudo: i,
                            match: ft,
                            attrHandle: {},
                            find: {},
                            relative: {
                                ">": {dir: "parentNode", first: !0},
                                " ": {dir: "parentNode"},
                                "+": {dir: "previousSibling", first: !0},
                                "~": {dir: "previousSibling"}
                            },
                            preFilter: {
                                ATTR: function (t) {
                                    return t[1] = t[1].replace(yt, bt), t[3] = (t[3] || t[4] || t[5] || "").replace(yt, bt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                                }, CHILD: function (t) {
                                    return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                                }, PSEUDO: function (t) {
                                    var e, n = !t[6] && t[2];
                                    return ft.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && ht.test(n) && (e = L(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), t[2] = n.slice(0, e)), t.slice(0, 3))
                                }
                            },
                            filter: {
                                TAG: function (t) {
                                    var e = t.replace(yt, bt).toLowerCase();
                                    return "*" === t ? function () {
                                        return !0
                                    } : function (t) {
                                        return t.nodeName && t.nodeName.toLowerCase() === e
                                    }
                                }, CLASS: function (t) {
                                    var e = U[t + " "];
                                    return e || (e = new RegExp("(^|" + nt + ")" + t + "(" + nt + "|$)")) && U(t, function (t) {
                                        return e.test("string" == typeof t.className && t.className || "undefined" != typeof t.getAttribute && t.getAttribute("class") || "")
                                    })
                                }, ATTR: function (t, n, i) {
                                    return function (r) {
                                        var s = e.attr(r, t);
                                        return null == s ? "!=" === n : !n || (s += "", "=" === n ? s === i : "!=" === n ? s !== i : "^=" === n ? i && 0 === s.indexOf(i) : "*=" === n ? i && s.indexOf(i) > -1 : "$=" === n ? i && s.slice(-i.length) === i : "~=" === n ? (" " + s.replace(at, " ") + " ").indexOf(i) > -1 : "|=" === n && (s === i || s.slice(0, i.length + 1) === i + "-"))
                                    }
                                }, CHILD: function (t, e, n, i, r) {
                                    var s = "nth" !== t.slice(0, 3), a = "last" !== t.slice(-4), o = "of-type" === e;
                                    return 1 === i && 0 === r ? function (t) {
                                        return !!t.parentNode
                                    } : function (e, n, u) {
                                        var l, c, h, d, f, p, g = s !== a ? "nextSibling" : "previousSibling",
                                            v = e.parentNode, m = o && e.nodeName.toLowerCase(), _ = !u && !o, y = !1;
                                        if (v) {
                                            if (s) {
                                                for (; g;) {
                                                    for (d = e; d = d[g];) if (o ? d.nodeName.toLowerCase() === m : 1 === d.nodeType) return !1;
                                                    p = g = "only" === t && !p && "nextSibling"
                                                }
                                                return !0
                                            }
                                            if (p = [a ? v.firstChild : v.lastChild], a && _) {
                                                for (d = v, h = d[H] || (d[H] = {}), c = h[d.uniqueID] || (h[d.uniqueID] = {}), l = c[t] || [], f = l[0] === V && l[1], y = f && l[2], d = f && v.childNodes[f]; d = ++f && d && d[g] || (y = f = 0) || p.pop();) if (1 === d.nodeType && ++y && d === e) {
                                                    c[t] = [V, f, y];
                                                    break
                                                }
                                            } else if (_ && (d = e, h = d[H] || (d[H] = {}), c = h[d.uniqueID] || (h[d.uniqueID] = {}), l = c[t] || [], f = l[0] === V && l[1], y = f), y === !1) for (; (d = ++f && d && d[g] || (y = f = 0) || p.pop()) && ((o ? d.nodeName.toLowerCase() !== m : 1 !== d.nodeType) || !++y || (_ && (h = d[H] || (d[H] = {}), c = h[d.uniqueID] || (h[d.uniqueID] = {}), c[t] = [V, y]), d !== e));) ;
                                            return y -= r, y === i || y % i === 0 && y / i >= 0
                                        }
                                    }
                                }, PSEUDO: function (t, n) {
                                    var r,
                                        s = T.pseudos[t] || T.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                                    return s[H] ? s(n) : s.length > 1 ? (r = [t, t, "", n], T.setFilters.hasOwnProperty(t.toLowerCase()) ? i(function (t, e) {
                                        for (var i, r = s(t, n), a = r.length; a--;) i = tt(t, r[a]), t[i] = !(e[i] = r[a])
                                    }) : function (t) {
                                        return s(t, 0, r)
                                    }) : s
                                }
                            },
                            pseudos: {
                                not: i(function (t) {
                                    var e = [], n = [], r = P(t.replace(ot, "$1"));
                                    return r[H] ? i(function (t, e, n, i) {
                                        for (var s, a = r(t, null, i, []), o = t.length; o--;) (s = a[o]) && (t[o] = !(e[o] = s))
                                    }) : function (t, i, s) {
                                        return e[0] = t, r(e, null, s, n), e[0] = null, !n.pop()
                                    }
                                }), has: i(function (t) {
                                    return function (n) {
                                        return e(t, n).length > 0
                                    }
                                }), contains: i(function (t) {
                                    return t = t.replace(yt, bt), function (e) {
                                        return (e.textContent || e.innerText || E(e)).indexOf(t) > -1
                                    }
                                }), lang: i(function (t) {
                                    return dt.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(yt, bt).toLowerCase(), function (e) {
                                        var n;
                                        do if (n = j ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return n = n.toLowerCase(), n === t || 0 === n.indexOf(t + "-"); while ((e = e.parentNode) && 1 === e.nodeType);
                                        return !1
                                    }
                                }), target: function (e) {
                                    var n = t.location && t.location.hash;
                                    return n && n.slice(1) === e.id
                                }, root: function (t) {
                                    return t === M
                                }, focus: function (t) {
                                    return t === I.activeElement && (!I.hasFocus || I.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                                }, enabled: l(!1), disabled: l(!0), checked: function (t) {
                                    var e = t.nodeName.toLowerCase();
                                    return "input" === e && !!t.checked || "option" === e && !!t.selected
                                }, selected: function (t) {
                                    return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                                }, empty: function (t) {
                                    for (t = t.firstChild; t; t = t.nextSibling) if (t.nodeType < 6) return !1;
                                    return !0
                                }, parent: function (t) {
                                    return !T.pseudos.empty(t)
                                }, header: function (t) {
                                    return gt.test(t.nodeName)
                                }, input: function (t) {
                                    return pt.test(t.nodeName)
                                }, button: function (t) {
                                    var e = t.nodeName.toLowerCase();
                                    return "input" === e && "button" === t.type || "button" === e
                                }, text: function (t) {
                                    var e;
                                    return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                                }, first: c(function () {
                                    return [0]
                                }), last: c(function (t, e) {
                                    return [e - 1]
                                }), eq: c(function (t, e, n) {
                                    return [n < 0 ? n + e : n]
                                }), even: c(function (t, e) {
                                    for (var n = 0; n < e; n += 2) t.push(n);
                                    return t
                                }), odd: c(function (t, e) {
                                    for (var n = 1; n < e; n += 2) t.push(n);
                                    return t
                                }), lt: c(function (t, e, n) {
                                    for (var i = n < 0 ? n + e : n; --i >= 0;) t.push(i);
                                    return t
                                }), gt: c(function (t, e, n) {
                                    for (var i = n < 0 ? n + e : n; ++i < e;) t.push(i);
                                    return t
                                })
                            }
                        }, T.pseudos.nth = T.pseudos.eq;
                        for (w in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0}) T.pseudos[w] = o(w);
                        for (w in{submit: !0, reset: !0}) T.pseudos[w] = u(w);
                        return d.prototype = T.filters = T.pseudos, T.setFilters = new d, L = e.tokenize = function (t, n) {
                            var i, r, s, a, o, u, l, c = G[t + " "];
                            if (c) return n ? 0 : c.slice(0);
                            for (o = t, u = [], l = T.preFilter; o;) {
                                i && !(r = ut.exec(o)) || (r && (o = o.slice(r[0].length) || o), u.push(s = [])), i = !1, (r = lt.exec(o)) && (i = r.shift(), s.push({
                                    value: i,
                                    type: r[0].replace(ot, " ")
                                }), o = o.slice(i.length));
                                for (a in T.filter) !(r = ft[a].exec(o)) || l[a] && !(r = l[a](r)) || (i = r.shift(), s.push({
                                    value: i,
                                    type: a,
                                    matches: r
                                }), o = o.slice(i.length));
                                if (!i) break
                            }
                            return n ? o.length : o ? e.error(t) : G(t, u).slice(0)
                        }, P = e.compile = function (t, e) {
                            var n, i = [], r = [], s = Y[t + " "];
                            if (!s) {
                                for (e || (e = L(t)), n = e.length; n--;) s = y(e[n]), s[H] ? i.push(s) : r.push(s);
                                s = Y(t, b(r, i)), s.selector = t
                            }
                            return s
                        }, C = e.select = function (t, e, n, i) {
                            var r, s, a, o, u, l = "function" == typeof t && t, c = !i && L(t = l.selector || t);
                            if (n = n || [], 1 === c.length) {
                                if (s = c[0] = c[0].slice(0), s.length > 2 && "ID" === (a = s[0]).type && 9 === e.nodeType && j && T.relative[s[1].type]) {
                                    if (e = (T.find.ID(a.matches[0].replace(yt, bt), e) || [])[0], !e) return n;
                                    l && (e = e.parentNode), t = t.slice(s.shift().value.length)
                                }
                                for (r = ft.needsContext.test(t) ? 0 : s.length; r-- && (a = s[r], !T.relative[o = a.type]);) if ((u = T.find[o]) && (i = u(a.matches[0].replace(yt, bt), _t.test(s[0].type) && h(e.parentNode) || e))) {
                                    if (s.splice(r, 1), t = i.length && f(s), !t) return Z.apply(n, i), n;
                                    break
                                }
                            }
                            return (l || P(t, c))(i, e, !j, n, !e || _t.test(t) && h(e.parentNode) || e), n
                        }, x.sortStable = H.split("").sort($).join("") === H, x.detectDuplicates = !!O, R(), x.sortDetached = r(function (t) {
                            return 1 & t.compareDocumentPosition(I.createElement("fieldset"))
                        }), r(function (t) {
                            return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
                        }) || s("type|href|height|width", function (t, e, n) {
                            if (!n) return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
                        }), x.attributes && r(function (t) {
                            return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
                        }) || s("value", function (t, e, n) {
                            if (!n && "input" === t.nodeName.toLowerCase()) return t.defaultValue
                        }), r(function (t) {
                            return null == t.getAttribute("disabled")
                        }) || s(et, function (t, e, n) {
                            var i;
                            if (!n) return t[e] === !0 ? e.toLowerCase() : (i = t.getAttributeNode(e)) && i.specified ? i.value : null
                        }), e
                    }(t);
                    gt.find = bt, gt.expr = bt.selectors, gt.expr[":"] = gt.expr.pseudos, gt.uniqueSort = gt.unique = bt.uniqueSort, gt.text = bt.getText, gt.isXMLDoc = bt.isXML, gt.contains = bt.contains, gt.escapeSelector = bt.escape;
                    var wt = function (t, e, n) {
                            for (var i = [], r = void 0 !== n; (t = t[e]) && 9 !== t.nodeType;) if (1 === t.nodeType) {
                                if (r && gt(t).is(n)) break;
                                i.push(t)
                            }
                            return i
                        }, xt = function (t, e) {
                            for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
                            return n
                        }, Tt = gt.expr.match.needsContext,
                        Et = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i, St = /^.[^:#\[\.,]*$/;
                    gt.filter = function (t, e, n) {
                        var i = e[0];
                        return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === i.nodeType ? gt.find.matchesSelector(i, t) ? [i] : [] : gt.find.matches(t, gt.grep(e, function (t) {
                            return 1 === t.nodeType
                        }))
                    }, gt.fn.extend({
                        find: function (t) {
                            var e, n, i = this.length, r = this;
                            if ("string" != typeof t) return this.pushStack(gt(t).filter(function () {
                                for (e = 0; e < i; e++) if (gt.contains(r[e], this)) return !0
                            }));
                            for (n = this.pushStack([]), e = 0; e < i; e++) gt.find(t, r[e], n);
                            return i > 1 ? gt.uniqueSort(n) : n
                        }, filter: function (t) {
                            return this.pushStack(s(this, t || [], !1))
                        }, not: function (t) {
                            return this.pushStack(s(this, t || [], !0))
                        }, is: function (t) {
                            return !!s(this, "string" == typeof t && Tt.test(t) ? gt(t) : t || [], !1).length
                        }
                    });
                    var Lt, Pt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, Ct = gt.fn.init = function (t, e, n) {
                        var i, r;
                        if (!t) return this;
                        if (n = n || Lt, "string" == typeof t) {
                            if (i = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [null, t, null] : Pt.exec(t), !i || !i[1] && e) return !e || e.jquery ? (e || n).find(t) : this.constructor(e).find(t);
                            if (i[1]) {
                                if (e = e instanceof gt ? e[0] : e, gt.merge(this, gt.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : nt, !0)), Et.test(i[1]) && gt.isPlainObject(e)) for (i in e) gt.isFunction(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
                                return this
                            }
                            return r = nt.getElementById(i[2]), r && (this[0] = r, this.length = 1), this
                        }
                        return t.nodeType ? (this[0] = t, this.length = 1, this) : gt.isFunction(t) ? void 0 !== n.ready ? n.ready(t) : t(gt) : gt.makeArray(t, this)
                    };
                    Ct.prototype = gt.fn, Lt = gt(nt);
                    var At = /^(?:parents|prev(?:Until|All))/, kt = {children: !0, contents: !0, next: !0, prev: !0};
                    gt.fn.extend({
                        has: function (t) {
                            var e = gt(t, this), n = e.length;
                            return this.filter(function () {
                                for (var t = 0; t < n; t++) if (gt.contains(this, e[t])) return !0
                            })
                        }, closest: function (t, e) {
                            var n, i = 0, r = this.length, s = [], a = "string" != typeof t && gt(t);
                            if (!Tt.test(t)) for (; i < r; i++) for (n = this[i]; n && n !== e; n = n.parentNode) if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && gt.find.matchesSelector(n, t))) {
                                s.push(n);
                                break
                            }
                            return this.pushStack(s.length > 1 ? gt.uniqueSort(s) : s)
                        }, index: function (t) {
                            return t ? "string" == typeof t ? ot.call(gt(t), this[0]) : ot.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                        }, add: function (t, e) {
                            return this.pushStack(gt.uniqueSort(gt.merge(this.get(), gt(t, e))))
                        }, addBack: function (t) {
                            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
                        }
                    }), gt.each({
                        parent: function (t) {
                            var e = t.parentNode;
                            return e && 11 !== e.nodeType ? e : null
                        }, parents: function (t) {
                            return wt(t, "parentNode")
                        }, parentsUntil: function (t, e, n) {
                            return wt(t, "parentNode", n)
                        }, next: function (t) {
                            return a(t, "nextSibling")
                        }, prev: function (t) {
                            return a(t, "previousSibling")
                        }, nextAll: function (t) {
                            return wt(t, "nextSibling")
                        }, prevAll: function (t) {
                            return wt(t, "previousSibling")
                        }, nextUntil: function (t, e, n) {
                            return wt(t, "nextSibling", n)
                        }, prevUntil: function (t, e, n) {
                            return wt(t, "previousSibling", n)
                        }, siblings: function (t) {
                            return xt((t.parentNode || {}).firstChild, t)
                        }, children: function (t) {
                            return xt(t.firstChild)
                        }, contents: function (t) {
                            return t.contentDocument || gt.merge([], t.childNodes)
                        }
                    }, function (t, e) {
                        gt.fn[t] = function (n, i) {
                            var r = gt.map(this, e, n);
                            return "Until" !== t.slice(-5) && (i = n), i && "string" == typeof i && (r = gt.filter(i, r)), this.length > 1 && (kt[t] || gt.uniqueSort(r), At.test(t) && r.reverse()), this.pushStack(r)
                        }
                    });
                    var Ot = /[^\x20\t\r\n\f]+/g;
                    gt.Callbacks = function (t) {
                        t = "string" == typeof t ? o(t) : gt.extend({}, t);
                        var e, n, i, r, s = [], a = [], u = -1, l = function () {
                            for (r = t.once, i = e = !0; a.length; u = -1) for (n = a.shift(); ++u < s.length;) s[u].apply(n[0], n[1]) === !1 && t.stopOnFalse && (u = s.length, n = !1);
                            t.memory || (n = !1), e = !1, r && (s = n ? [] : "")
                        }, c = {
                            add: function () {
                                return s && (n && !e && (u = s.length - 1, a.push(n)), function e(n) {
                                    gt.each(n, function (n, i) {
                                        gt.isFunction(i) ? t.unique && c.has(i) || s.push(i) : i && i.length && "string" !== gt.type(i) && e(i)
                                    })
                                }(arguments), n && !e && l()), this
                            }, remove: function () {
                                return gt.each(arguments, function (t, e) {
                                    for (var n; (n = gt.inArray(e, s, n)) > -1;) s.splice(n, 1), n <= u && u--
                                }), this
                            }, has: function (t) {
                                return t ? gt.inArray(t, s) > -1 : s.length > 0
                            }, empty: function () {
                                return s && (s = []), this
                            }, disable: function () {
                                return r = a = [], s = n = "", this
                            }, disabled: function () {
                                return !s
                            }, lock: function () {
                                return r = a = [], n || e || (s = n = ""), this
                            }, locked: function () {
                                return !!r
                            }, fireWith: function (t, n) {
                                return r || (n = n || [], n = [t, n.slice ? n.slice() : n], a.push(n), e || l()), this
                            }, fire: function () {
                                return c.fireWith(this, arguments), this
                            }, fired: function () {
                                return !!i
                            }
                        };
                        return c
                    }, gt.extend({
                        Deferred: function (e) {
                            var n = [["notify", "progress", gt.Callbacks("memory"), gt.Callbacks("memory"), 2], ["resolve", "done", gt.Callbacks("once memory"), gt.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", gt.Callbacks("once memory"), gt.Callbacks("once memory"), 1, "rejected"]],
                                i = "pending", r = {
                                    state: function () {
                                        return i
                                    }, always: function () {
                                        return s.done(arguments).fail(arguments), this
                                    }, catch: function (t) {
                                        return r.then(null, t)
                                    }, pipe: function () {
                                        var t = arguments;
                                        return gt.Deferred(function (e) {
                                            gt.each(n, function (n, i) {
                                                var r = gt.isFunction(t[i[4]]) && t[i[4]];
                                                s[i[1]](function () {
                                                    var t = r && r.apply(this, arguments);
                                                    t && gt.isFunction(t.promise) ? t.promise().progress(e.notify).done(e.resolve).fail(e.reject) : e[i[0] + "With"](this, r ? [t] : arguments)
                                                })
                                            }), t = null
                                        }).promise()
                                    }, then: function (e, i, r) {
                                        function s(e, n, i, r) {
                                            return function () {
                                                var o = this, c = arguments, h = function () {
                                                    var t, h;
                                                    if (!(e < a)) {
                                                        if (t = i.apply(o, c), t === n.promise()) throw new TypeError("Thenable self-resolution");
                                                        h = t && ("object" == typeof t || "function" == typeof t) && t.then, gt.isFunction(h) ? r ? h.call(t, s(a, n, u, r), s(a, n, l, r)) : (a++, h.call(t, s(a, n, u, r), s(a, n, l, r), s(a, n, u, n.notifyWith))) : (i !== u && (o = void 0, c = [t]), (r || n.resolveWith)(o, c))
                                                    }
                                                }, d = r ? h : function () {
                                                    try {
                                                        h()
                                                    } catch (t) {
                                                        gt.Deferred.exceptionHook && gt.Deferred.exceptionHook(t, d.stackTrace), e + 1 >= a && (i !== l && (o = void 0, c = [t]), n.rejectWith(o, c))
                                                    }
                                                };
                                                e ? d() : (gt.Deferred.getStackHook && (d.stackTrace = gt.Deferred.getStackHook()), t.setTimeout(d))
                                            }
                                        }

                                        var a = 0;
                                        return gt.Deferred(function (t) {
                                            n[0][3].add(s(0, t, gt.isFunction(r) ? r : u, t.notifyWith)), n[1][3].add(s(0, t, gt.isFunction(e) ? e : u)), n[2][3].add(s(0, t, gt.isFunction(i) ? i : l))
                                        }).promise()
                                    }, promise: function (t) {
                                        return null != t ? gt.extend(t, r) : r
                                    }
                                }, s = {};
                            return gt.each(n, function (t, e) {
                                var a = e[2], o = e[5];
                                r[e[1]] = a.add, o && a.add(function () {
                                    i = o
                                }, n[3 - t][2].disable, n[0][2].lock), a.add(e[3].fire), s[e[0]] = function () {
                                    return s[e[0] + "With"](this === s ? void 0 : this, arguments), this
                                }, s[e[0] + "With"] = a.fireWith
                            }), r.promise(s), e && e.call(s, s), s
                        }, when: function (t) {
                            var e = arguments.length, n = e, i = Array(n), r = rt.call(arguments), s = gt.Deferred(),
                                a = function (t) {
                                    return function (n) {
                                        i[t] = this, r[t] = arguments.length > 1 ? rt.call(arguments) : n, --e || s.resolveWith(i, r)
                                    }
                                };
                            if (e <= 1 && (c(t, s.done(a(n)).resolve, s.reject), "pending" === s.state() || gt.isFunction(r[n] && r[n].then))) return s.then();
                            for (; n--;) c(r[n], a(n), s.reject);
                            return s.promise()
                        }
                    });
                    var Rt = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
                    gt.Deferred.exceptionHook = function (e, n) {
                        t.console && t.console.warn && e && Rt.test(e.name) && t.console.warn("jQuery.Deferred exception: " + e.message, e.stack, n)
                    }, gt.readyException = function (e) {
                        t.setTimeout(function () {
                            throw e
                        })
                    };
                    var It = gt.Deferred();
                    gt.fn.ready = function (t) {
                        return It.then(t).catch(function (t) {
                            gt.readyException(t)
                        }), this
                    }, gt.extend({
                        isReady: !1, readyWait: 1, holdReady: function (t) {
                            t ? gt.readyWait++ : gt.ready(!0)
                        }, ready: function (t) {
                            (t === !0 ? --gt.readyWait : gt.isReady) || (gt.isReady = !0, t !== !0 && --gt.readyWait > 0 || It.resolveWith(nt, [gt]))
                        }
                    }), gt.ready.then = It.then, "complete" === nt.readyState || "loading" !== nt.readyState && !nt.documentElement.doScroll ? t.setTimeout(gt.ready) : (nt.addEventListener("DOMContentLoaded", h), t.addEventListener("load", h));
                    var Mt = function (t, e, n, i, r, s, a) {
                        var o = 0, u = t.length, l = null == n;
                        if ("object" === gt.type(n)) {
                            r = !0;
                            for (o in n) Mt(t, e, o, n[o], !0, s, a)
                        } else if (void 0 !== i && (r = !0, gt.isFunction(i) || (a = !0), l && (a ? (e.call(t, i), e = null) : (l = e, e = function (t, e, n) {
                                return l.call(gt(t), n)
                            })), e)) for (; o < u; o++) e(t[o], n, a ? i : i.call(t[o], o, e(t[o], n)));
                        return r ? t : l ? e.call(t) : u ? e(t[0], n) : s
                    }, jt = function (t) {
                        return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType
                    };
                    d.uid = 1, d.prototype = {
                        cache: function (t) {
                            var e = t[this.expando];
                            return e || (e = {}, jt(t) && (t.nodeType ? t[this.expando] = e : Object.defineProperty(t, this.expando, {
                                value: e,
                                configurable: !0
                            }))), e
                        }, set: function (t, e, n) {
                            var i, r = this.cache(t);
                            if ("string" == typeof e) r[gt.camelCase(e)] = n; else for (i in e) r[gt.camelCase(i)] = e[i];
                            return r
                        }, get: function (t, e) {
                            return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][gt.camelCase(e)]
                        }, access: function (t, e, n) {
                            return void 0 === e || e && "string" == typeof e && void 0 === n ? this.get(t, e) : (this.set(t, e, n), void 0 !== n ? n : e)
                        }, remove: function (t, e) {
                            var n, i = t[this.expando];
                            if (void 0 !== i) {
                                if (void 0 !== e) {
                                    gt.isArray(e) ? e = e.map(gt.camelCase) : (e = gt.camelCase(e), e = e in i ? [e] : e.match(Ot) || []), n = e.length;
                                    for (; n--;) delete i[e[n]]
                                }
                                (void 0 === e || gt.isEmptyObject(i)) && (t.nodeType ? t[this.expando] = void 0 : delete t[this.expando])
                            }
                        }, hasData: function (t) {
                            var e = t[this.expando];
                            return void 0 !== e && !gt.isEmptyObject(e)
                        }
                    };
                    var Dt = new d, Nt = new d, Ft = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, qt = /[A-Z]/g;
                    gt.extend({
                        hasData: function (t) {
                            return Nt.hasData(t) || Dt.hasData(t)
                        }, data: function (t, e, n) {
                            return Nt.access(t, e, n)
                        }, removeData: function (t, e) {
                            Nt.remove(t, e)
                        }, _data: function (t, e, n) {
                            return Dt.access(t, e, n)
                        }, _removeData: function (t, e) {
                            Dt.remove(t, e)
                        }
                    }), gt.fn.extend({
                        data: function (t, e) {
                            var n, i, r, s = this[0], a = s && s.attributes;
                            if (void 0 === t) {
                                if (this.length && (r = Nt.get(s), 1 === s.nodeType && !Dt.get(s, "hasDataAttrs"))) {
                                    for (n = a.length; n--;) a[n] && (i = a[n].name, 0 === i.indexOf("data-") && (i = gt.camelCase(i.slice(5)), p(s, i, r[i])));
                                    Dt.set(s, "hasDataAttrs", !0)
                                }
                                return r
                            }
                            return "object" == typeof t ? this.each(function () {
                                Nt.set(this, t)
                            }) : Mt(this, function (e) {
                                var n;
                                if (s && void 0 === e) {
                                    if (n = Nt.get(s, t), void 0 !== n) return n;
                                    if (n = p(s, t), void 0 !== n) return n
                                } else this.each(function () {
                                    Nt.set(this, t, e)
                                })
                            }, null, e, arguments.length > 1, null, !0)
                        }, removeData: function (t) {
                            return this.each(function () {
                                Nt.remove(this, t)
                            })
                        }
                    }), gt.extend({
                        queue: function (t, e, n) {
                            var i;
                            if (t) return e = (e || "fx") + "queue", i = Dt.get(t, e), n && (!i || gt.isArray(n) ? i = Dt.access(t, e, gt.makeArray(n)) : i.push(n)), i || []
                        }, dequeue: function (t, e) {
                            e = e || "fx";
                            var n = gt.queue(t, e), i = n.length, r = n.shift(), s = gt._queueHooks(t, e),
                                a = function () {
                                    gt.dequeue(t, e)
                                };
                            "inprogress" === r && (r = n.shift(), i--), r && ("fx" === e && n.unshift("inprogress"), delete s.stop, r.call(t, a, s)), !i && s && s.empty.fire()
                        }, _queueHooks: function (t, e) {
                            var n = e + "queueHooks";
                            return Dt.get(t, n) || Dt.access(t, n, {
                                empty: gt.Callbacks("once memory").add(function () {
                                    Dt.remove(t, [e + "queue", n])
                                })
                            })
                        }
                    }), gt.fn.extend({
                        queue: function (t, e) {
                            var n = 2;
                            return "string" != typeof t && (e = t, t = "fx", n--), arguments.length < n ? gt.queue(this[0], t) : void 0 === e ? this : this.each(function () {
                                var n = gt.queue(this, t, e);
                                gt._queueHooks(this, t), "fx" === t && "inprogress" !== n[0] && gt.dequeue(this, t)
                            })
                        }, dequeue: function (t) {
                            return this.each(function () {
                                gt.dequeue(this, t)
                            })
                        }, clearQueue: function (t) {
                            return this.queue(t || "fx", [])
                        }, promise: function (t, e) {
                            var n, i = 1, r = gt.Deferred(), s = this, a = this.length, o = function () {
                                --i || r.resolveWith(s, [s])
                            };
                            for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; a--;) n = Dt.get(s[a], t + "queueHooks"), n && n.empty && (i++, n.empty.add(o));
                            return o(), r.promise(e)
                        }
                    });
                    var Ht = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                        Bt = new RegExp("^(?:([+-])=|)(" + Ht + ")([a-z%]*)$", "i"),
                        Vt = ["Top", "Right", "Bottom", "Left"], Xt = function (t, e) {
                            return t = e || t, "none" === t.style.display || "" === t.style.display && gt.contains(t.ownerDocument, t) && "none" === gt.css(t, "display")
                        }, Ut = function (t, e, n, i) {
                            var r, s, a = {};
                            for (s in e) a[s] = t.style[s], t.style[s] = e[s];
                            r = n.apply(t, i || []);
                            for (s in e) t.style[s] = a[s];
                            return r
                        }, Gt = {};
                    gt.fn.extend({
                        show: function () {
                            return m(this, !0)
                        }, hide: function () {
                            return m(this)
                        }, toggle: function (t) {
                            return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function () {
                                Xt(this) ? gt(this).show() : gt(this).hide()
                            })
                        }
                    });
                    var Yt = /^(?:checkbox|radio)$/i, $t = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
                        Wt = /^$|\/(?:java|ecma)script/i, zt = {
                            option: [1, "<select multiple='multiple'>", "</select>"],
                            thead: [1, "<table>", "</table>"],
                            col: [2, "<table><colgroup>", "</colgroup></table>"],
                            tr: [2, "<table><tbody>", "</tbody></table>"],
                            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                            _default: [0, "", ""]
                        };
                    zt.optgroup = zt.option, zt.tbody = zt.tfoot = zt.colgroup = zt.caption = zt.thead, zt.th = zt.td;
                    var Qt = /<|&#?\w+;/;
                    !function () {
                        var t = nt.createDocumentFragment(), e = t.appendChild(nt.createElement("div")),
                            n = nt.createElement("input");
                        n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), e.appendChild(n), ft.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", ft.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue
                    }();
                    var Jt = nt.documentElement, Zt = /^key/, Kt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
                        te = /^([^.]*)(?:\.(.+)|)/;
                    gt.event = {
                        global: {}, add: function (t, e, n, i, r) {
                            var s, a, o, u, l, c, h, d, f, p, g, v = Dt.get(t);
                            if (v) for (n.handler && (s = n, n = s.handler, r = s.selector), r && gt.find.matchesSelector(Jt, r), n.guid || (n.guid = gt.guid++), (u = v.events) || (u = v.events = {}), (a = v.handle) || (a = v.handle = function (e) {
                                return "undefined" != typeof gt && gt.event.triggered !== e.type ? gt.event.dispatch.apply(t, arguments) : void 0
                            }), e = (e || "").match(Ot) || [""], l = e.length; l--;) o = te.exec(e[l]) || [], f = g = o[1], p = (o[2] || "").split(".").sort(), f && (h = gt.event.special[f] || {}, f = (r ? h.delegateType : h.bindType) || f, h = gt.event.special[f] || {}, c = gt.extend({
                                type: f,
                                origType: g,
                                data: i,
                                handler: n,
                                guid: n.guid,
                                selector: r,
                                needsContext: r && gt.expr.match.needsContext.test(r),
                                namespace: p.join(".")
                            }, s), (d = u[f]) || (d = u[f] = [], d.delegateCount = 0, h.setup && h.setup.call(t, i, p, a) !== !1 || t.addEventListener && t.addEventListener(f, a)), h.add && (h.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), r ? d.splice(d.delegateCount++, 0, c) : d.push(c), gt.event.global[f] = !0)
                        }, remove: function (t, e, n, i, r) {
                            var s, a, o, u, l, c, h, d, f, p, g, v = Dt.hasData(t) && Dt.get(t);
                            if (v && (u = v.events)) {
                                for (e = (e || "").match(Ot) || [""], l = e.length; l--;) if (o = te.exec(e[l]) || [], f = g = o[1], p = (o[2] || "").split(".").sort(), f) {
                                    for (h = gt.event.special[f] || {}, f = (i ? h.delegateType : h.bindType) || f, d = u[f] || [], o = o[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = s = d.length; s--;) c = d[s], !r && g !== c.origType || n && n.guid !== c.guid || o && !o.test(c.namespace) || i && i !== c.selector && ("**" !== i || !c.selector) || (d.splice(s, 1), c.selector && d.delegateCount--, h.remove && h.remove.call(t, c));
                                    a && !d.length && (h.teardown && h.teardown.call(t, p, v.handle) !== !1 || gt.removeEvent(t, f, v.handle), delete u[f])
                                } else for (f in u) gt.event.remove(t, f + e[l], n, i, !0);
                                gt.isEmptyObject(u) && Dt.remove(t, "handle events")
                            }
                        }, dispatch: function (t) {
                            var e, n, i, r, s, a, o = gt.event.fix(t), u = new Array(arguments.length),
                                l = (Dt.get(this, "events") || {})[o.type] || [], c = gt.event.special[o.type] || {};
                            for (u[0] = o, e = 1; e < arguments.length; e++) u[e] = arguments[e];
                            if (o.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, o) !== !1) {
                                for (a = gt.event.handlers.call(this, o, l), e = 0; (r = a[e++]) && !o.isPropagationStopped();) for (o.currentTarget = r.elem, n = 0; (s = r.handlers[n++]) && !o.isImmediatePropagationStopped();) o.rnamespace && !o.rnamespace.test(s.namespace) || (o.handleObj = s, o.data = s.data, i = ((gt.event.special[s.origType] || {}).handle || s.handler).apply(r.elem, u), void 0 !== i && (o.result = i) === !1 && (o.preventDefault(), o.stopPropagation()));
                                return c.postDispatch && c.postDispatch.call(this, o), o.result
                            }
                        }, handlers: function (t, e) {
                            var n, i, r, s, a, o = [], u = e.delegateCount, l = t.target;
                            if (u && l.nodeType && !("click" === t.type && t.button >= 1)) for (; l !== this; l = l.parentNode || this) if (1 === l.nodeType && ("click" !== t.type || l.disabled !== !0)) {
                                for (s = [], a = {}, n = 0; n < u; n++) i = e[n], r = i.selector + " ", void 0 === a[r] && (a[r] = i.needsContext ? gt(r, this).index(l) > -1 : gt.find(r, this, null, [l]).length), a[r] && s.push(i);
                                s.length && o.push({elem: l, handlers: s})
                            }
                            return l = this, u < e.length && o.push({elem: l, handlers: e.slice(u)}), o
                        }, addProp: function (t, e) {
                            Object.defineProperty(gt.Event.prototype, t, {
                                enumerable: !0,
                                configurable: !0,
                                get: gt.isFunction(e) ? function () {
                                    if (this.originalEvent) return e(this.originalEvent)
                                } : function () {
                                    if (this.originalEvent) return this.originalEvent[t]
                                },
                                set: function (e) {
                                    Object.defineProperty(this, t, {
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0,
                                        value: e
                                    })
                                }
                            })
                        }, fix: function (t) {
                            return t[gt.expando] ? t : new gt.Event(t)
                        }, special: {
                            load: {noBubble: !0}, focus: {
                                trigger: function () {
                                    if (this !== T() && this.focus) return this.focus(), !1
                                }, delegateType: "focusin"
                            }, blur: {
                                trigger: function () {
                                    if (this === T() && this.blur) return this.blur(), !1
                                }, delegateType: "focusout"
                            }, click: {
                                trigger: function () {
                                    if ("checkbox" === this.type && this.click && gt.nodeName(this, "input")) return this.click(), !1
                                }, _default: function (t) {
                                    return gt.nodeName(t.target, "a")
                                }
                            }, beforeunload: {
                                postDispatch: function (t) {
                                    void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                                }
                            }
                        }
                    }, gt.removeEvent = function (t, e, n) {
                        t.removeEventListener && t.removeEventListener(e, n)
                    }, gt.Event = function (t, e) {
                        return this instanceof gt.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && t.returnValue === !1 ? w : x, this.target = t.target && 3 === t.target.nodeType ? t.target.parentNode : t.target, this.currentTarget = t.currentTarget, this.relatedTarget = t.relatedTarget) : this.type = t, e && gt.extend(this, e), this.timeStamp = t && t.timeStamp || gt.now(), void(this[gt.expando] = !0)) : new gt.Event(t, e)
                    }, gt.Event.prototype = {
                        constructor: gt.Event,
                        isDefaultPrevented: x,
                        isPropagationStopped: x,
                        isImmediatePropagationStopped: x,
                        isSimulated: !1,
                        preventDefault: function () {
                            var t = this.originalEvent;
                            this.isDefaultPrevented = w, t && !this.isSimulated && t.preventDefault()
                        },
                        stopPropagation: function () {
                            var t = this.originalEvent;
                            this.isPropagationStopped = w, t && !this.isSimulated && t.stopPropagation()
                        },
                        stopImmediatePropagation: function () {
                            var t = this.originalEvent;
                            this.isImmediatePropagationStopped = w, t && !this.isSimulated && t.stopImmediatePropagation(), this.stopPropagation()
                        }
                    }, gt.each({
                        altKey: !0,
                        bubbles: !0,
                        cancelable: !0,
                        changedTouches: !0,
                        ctrlKey: !0,
                        detail: !0,
                        eventPhase: !0,
                        metaKey: !0,
                        pageX: !0,
                        pageY: !0,
                        shiftKey: !0,
                        view: !0,
                        char: !0,
                        charCode: !0,
                        key: !0,
                        keyCode: !0,
                        button: !0,
                        buttons: !0,
                        clientX: !0,
                        clientY: !0,
                        offsetX: !0,
                        offsetY: !0,
                        pointerId: !0,
                        pointerType: !0,
                        screenX: !0,
                        screenY: !0,
                        targetTouches: !0,
                        toElement: !0,
                        touches: !0,
                        which: function (t) {
                            var e = t.button;
                            return null == t.which && Zt.test(t.type) ? null != t.charCode ? t.charCode : t.keyCode : !t.which && void 0 !== e && Kt.test(t.type) ? 1 & e ? 1 : 2 & e ? 3 : 4 & e ? 2 : 0 : t.which
                        }
                    }, gt.event.addProp), gt.each({
                        mouseenter: "mouseover",
                        mouseleave: "mouseout",
                        pointerenter: "pointerover",
                        pointerleave: "pointerout"
                    }, function (t, e) {
                        gt.event.special[t] = {
                            delegateType: e, bindType: e, handle: function (t) {
                                var n, i = this, r = t.relatedTarget, s = t.handleObj;
                                return r && (r === i || gt.contains(i, r)) || (t.type = s.origType, n = s.handler.apply(this, arguments), t.type = e), n
                            }
                        }
                    }), gt.fn.extend({
                        on: function (t, e, n, i) {
                            return E(this, t, e, n, i)
                        }, one: function (t, e, n, i) {
                            return E(this, t, e, n, i, 1)
                        }, off: function (t, e, n) {
                            var i, r;
                            if (t && t.preventDefault && t.handleObj) return i = t.handleObj, gt(t.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                            if ("object" == typeof t) {
                                for (r in t) this.off(r, e, t[r]);
                                return this
                            }
                            return e !== !1 && "function" != typeof e || (n = e, e = void 0), n === !1 && (n = x), this.each(function () {
                                gt.event.remove(this, t, n, e)
                            })
                        }
                    });
                    var ee = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
                        ne = /<script|<style|<link/i, ie = /checked\s*(?:[^=]|=\s*.checked.)/i, re = /^true\/(.*)/,
                        se = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
                    gt.extend({
                        htmlPrefilter: function (t) {
                            return t.replace(ee, "<$1></$2>")
                        }, clone: function (t, e, n) {
                            var i, r, s, a, o = t.cloneNode(!0), u = gt.contains(t.ownerDocument, t);
                            if (!(ft.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || gt.isXMLDoc(t))) for (a = _(o), s = _(t), i = 0, r = s.length; i < r; i++) A(s[i], a[i]);
                            if (e) if (n) for (s = s || _(t), a = a || _(o), i = 0, r = s.length; i < r; i++) C(s[i], a[i]); else C(t, o);
                            return a = _(o, "script"), a.length > 0 && y(a, !u && _(t, "script")), o
                        }, cleanData: function (t) {
                            for (var e, n, i, r = gt.event.special, s = 0; void 0 !== (n = t[s]); s++) if (jt(n)) {
                                if (e = n[Dt.expando]) {
                                    if (e.events) for (i in e.events) r[i] ? gt.event.remove(n, i) : gt.removeEvent(n, i, e.handle);
                                    n[Dt.expando] = void 0
                                }
                                n[Nt.expando] && (n[Nt.expando] = void 0)
                            }
                        }
                    }), gt.fn.extend({
                        detach: function (t) {
                            return O(this, t, !0)
                        }, remove: function (t) {
                            return O(this, t)
                        }, text: function (t) {
                            return Mt(this, function (t) {
                                return void 0 === t ? gt.text(this) : this.empty().each(function () {
                                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = t)
                                })
                            }, null, t, arguments.length)
                        }, append: function () {
                            return k(this, arguments, function (t) {
                                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                    var e = S(this, t);
                                    e.appendChild(t)
                                }
                            })
                        }, prepend: function () {
                            return k(this, arguments, function (t) {
                                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                    var e = S(this, t);
                                    e.insertBefore(t, e.firstChild)
                                }
                            })
                        }, before: function () {
                            return k(this, arguments, function (t) {
                                this.parentNode && this.parentNode.insertBefore(t, this)
                            })
                        }, after: function () {
                            return k(this, arguments, function (t) {
                                this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
                            })
                        }, empty: function () {
                            for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (gt.cleanData(_(t, !1)), t.textContent = "");
                            return this
                        }, clone: function (t, e) {
                            return t = null != t && t, e = null == e ? t : e, this.map(function () {
                                return gt.clone(this, t, e)
                            })
                        }, html: function (t) {
                            return Mt(this, function (t) {
                                var e = this[0] || {}, n = 0, i = this.length;
                                if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                                if ("string" == typeof t && !ne.test(t) && !zt[($t.exec(t) || ["", ""])[1].toLowerCase()]) {
                                    t = gt.htmlPrefilter(t);
                                    try {
                                        for (; n < i; n++) e = this[n] || {}, 1 === e.nodeType && (gt.cleanData(_(e, !1)), e.innerHTML = t);
                                        e = 0
                                    } catch (t) {
                                    }
                                }
                                e && this.empty().append(t)
                            }, null, t, arguments.length)
                        }, replaceWith: function () {
                            var t = [];
                            return k(this, arguments, function (e) {
                                var n = this.parentNode;
                                gt.inArray(this, t) < 0 && (gt.cleanData(_(this)), n && n.replaceChild(e, this))
                            }, t)
                        }
                    }), gt.each({
                        appendTo: "append",
                        prependTo: "prepend",
                        insertBefore: "before",
                        insertAfter: "after",
                        replaceAll: "replaceWith"
                    }, function (t, e) {
                        gt.fn[t] = function (t) {
                            for (var n, i = [], r = gt(t), s = r.length - 1, a = 0; a <= s; a++) n = a === s ? this : this.clone(!0), gt(r[a])[e](n), at.apply(i, n.get());
                            return this.pushStack(i)
                        }
                    });
                    var ae = /^margin/, oe = new RegExp("^(" + Ht + ")(?!px)[a-z%]+$", "i"), ue = function (e) {
                        var n = e.ownerDocument.defaultView;
                        return n && n.opener || (n = t), n.getComputedStyle(e)
                    };
                    !function () {
                        function e() {
                            if (o) {
                                o.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", o.innerHTML = "", Jt.appendChild(a);
                                var e = t.getComputedStyle(o);
                                n = "1%" !== e.top, s = "2px" === e.marginLeft, i = "4px" === e.width, o.style.marginRight = "50%", r = "4px" === e.marginRight, Jt.removeChild(a), o = null
                            }
                        }

                        var n, i, r, s, a = nt.createElement("div"), o = nt.createElement("div");
                        o.style && (o.style.backgroundClip = "content-box", o.cloneNode(!0).style.backgroundClip = "", ft.clearCloneStyle = "content-box" === o.style.backgroundClip, a.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", a.appendChild(o), gt.extend(ft, {
                            pixelPosition: function () {
                                return e(), n
                            }, boxSizingReliable: function () {
                                return e(), i
                            }, pixelMarginRight: function () {
                                return e(), r
                            }, reliableMarginLeft: function () {
                                return e(), s
                            }
                        }))
                    }();
                    var le = /^(none|table(?!-c[ea]).+)/,
                        ce = {position: "absolute", visibility: "hidden", display: "block"},
                        he = {letterSpacing: "0", fontWeight: "400"}, de = ["Webkit", "Moz", "ms"],
                        fe = nt.createElement("div").style;
                    gt.extend({
                        cssHooks: {
                            opacity: {
                                get: function (t, e) {
                                    if (e) {
                                        var n = R(t, "opacity");
                                        return "" === n ? "1" : n
                                    }
                                }
                            }
                        },
                        cssNumber: {
                            animationIterationCount: !0,
                            columnCount: !0,
                            fillOpacity: !0,
                            flexGrow: !0,
                            flexShrink: !0,
                            fontWeight: !0,
                            lineHeight: !0,
                            opacity: !0,
                            order: !0,
                            orphans: !0,
                            widows: !0,
                            zIndex: !0,
                            zoom: !0
                        },
                        cssProps: {float: "cssFloat"},
                        style: function (t, e, n, i) {
                            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                                var r, s, a, o = gt.camelCase(e), u = t.style;
                                return e = gt.cssProps[o] || (gt.cssProps[o] = M(o) || o), a = gt.cssHooks[e] || gt.cssHooks[o], void 0 === n ? a && "get" in a && void 0 !== (r = a.get(t, !1, i)) ? r : u[e] : (s = typeof n, "string" === s && (r = Bt.exec(n)) && r[1] && (n = g(t, e, r), s = "number"), null != n && n === n && ("number" === s && (n += r && r[3] || (gt.cssNumber[o] ? "" : "px")), ft.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (u[e] = "inherit"), a && "set" in a && void 0 === (n = a.set(t, n, i)) || (u[e] = n)), void 0)
                            }
                        },
                        css: function (t, e, n, i) {
                            var r, s, a, o = gt.camelCase(e);
                            return e = gt.cssProps[o] || (gt.cssProps[o] = M(o) || o), a = gt.cssHooks[e] || gt.cssHooks[o], a && "get" in a && (r = a.get(t, !0, n)), void 0 === r && (r = R(t, e, i)), "normal" === r && e in he && (r = he[e]), "" === n || n ? (s = parseFloat(r), n === !0 || isFinite(s) ? s || 0 : r) : r
                        }
                    }), gt.each(["height", "width"], function (t, e) {
                        gt.cssHooks[e] = {
                            get: function (t, n, i) {
                                if (n) return !le.test(gt.css(t, "display")) || t.getClientRects().length && t.getBoundingClientRect().width ? N(t, e, i) : Ut(t, ce, function () {
                                    return N(t, e, i)
                                })
                            }, set: function (t, n, i) {
                                var r, s = i && ue(t),
                                    a = i && D(t, e, i, "border-box" === gt.css(t, "boxSizing", !1, s), s);
                                return a && (r = Bt.exec(n)) && "px" !== (r[3] || "px") && (t.style[e] = n, n = gt.css(t, e)), j(t, n, a)
                            }
                        }
                    }), gt.cssHooks.marginLeft = I(ft.reliableMarginLeft, function (t, e) {
                        if (e) return (parseFloat(R(t, "marginLeft")) || t.getBoundingClientRect().left - Ut(t, {marginLeft: 0}, function () {
                            return t.getBoundingClientRect().left
                        })) + "px"
                    }), gt.each({margin: "", padding: "", border: "Width"}, function (t, e) {
                        gt.cssHooks[t + e] = {
                            expand: function (n) {
                                for (var i = 0, r = {}, s = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) r[t + Vt[i] + e] = s[i] || s[i - 2] || s[0];
                                return r
                            }
                        }, ae.test(t) || (gt.cssHooks[t + e].set = j)
                    }), gt.fn.extend({
                        css: function (t, e) {
                            return Mt(this, function (t, e, n) {
                                var i, r, s = {}, a = 0;
                                if (gt.isArray(e)) {
                                    for (i = ue(t), r = e.length; a < r; a++) s[e[a]] = gt.css(t, e[a], !1, i);
                                    return s
                                }
                                return void 0 !== n ? gt.style(t, e, n) : gt.css(t, e)
                            }, t, e, arguments.length > 1)
                        }
                    }), gt.Tween = F, F.prototype = {
                        constructor: F, init: function (t, e, n, i, r, s) {
                            this.elem = t, this.prop = n, this.easing = r || gt.easing._default, this.options = e, this.start = this.now = this.cur(), this.end = i, this.unit = s || (gt.cssNumber[n] ? "" : "px")
                        }, cur: function () {
                            var t = F.propHooks[this.prop];
                            return t && t.get ? t.get(this) : F.propHooks._default.get(this)
                        }, run: function (t) {
                            var e, n = F.propHooks[this.prop];
                            return this.options.duration ? this.pos = e = gt.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : F.propHooks._default.set(this), this
                        }
                    }, F.prototype.init.prototype = F.prototype, F.propHooks = {
                        _default: {
                            get: function (t) {
                                var e;
                                return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = gt.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0)
                            }, set: function (t) {
                                gt.fx.step[t.prop] ? gt.fx.step[t.prop](t) : 1 !== t.elem.nodeType || null == t.elem.style[gt.cssProps[t.prop]] && !gt.cssHooks[t.prop] ? t.elem[t.prop] = t.now : gt.style(t.elem, t.prop, t.now + t.unit)
                            }
                        }
                    }, F.propHooks.scrollTop = F.propHooks.scrollLeft = {
                        set: function (t) {
                            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
                        }
                    }, gt.easing = {
                        linear: function (t) {
                            return t
                        }, swing: function (t) {
                            return .5 - Math.cos(t * Math.PI) / 2
                        }, _default: "swing"
                    }, gt.fx = F.prototype.init, gt.fx.step = {};
                    var pe, ge, ve = /^(?:toggle|show|hide)$/, me = /queueHooks$/;
                    gt.Animation = gt.extend(G, {
                        tweeners: {
                            "*": [function (t, e) {
                                var n = this.createTween(t, e);
                                return g(n.elem, t, Bt.exec(e), n), n
                            }]
                        }, tweener: function (t, e) {
                            gt.isFunction(t) ? (e = t, t = ["*"]) : t = t.match(Ot);
                            for (var n, i = 0, r = t.length; i < r; i++) n = t[i], G.tweeners[n] = G.tweeners[n] || [], G.tweeners[n].unshift(e)
                        }, prefilters: [X], prefilter: function (t, e) {
                            e ? G.prefilters.unshift(t) : G.prefilters.push(t)
                        }
                    }), gt.speed = function (t, e, n) {
                        var i = t && "object" == typeof t ? gt.extend({}, t) : {
                            complete: n || !n && e || gt.isFunction(t) && t,
                            duration: t,
                            easing: n && e || e && !gt.isFunction(e) && e
                        };
                        return gt.fx.off || nt.hidden ? i.duration = 0 : "number" != typeof i.duration && (i.duration in gt.fx.speeds ? i.duration = gt.fx.speeds[i.duration] : i.duration = gt.fx.speeds._default), null != i.queue && i.queue !== !0 || (i.queue = "fx"), i.old = i.complete, i.complete = function () {
                            gt.isFunction(i.old) && i.old.call(this), i.queue && gt.dequeue(this, i.queue)
                        }, i
                    }, gt.fn.extend({
                        fadeTo: function (t, e, n, i) {
                            return this.filter(Xt).css("opacity", 0).show().end().animate({opacity: e}, t, n, i)
                        }, animate: function (t, e, n, i) {
                            var r = gt.isEmptyObject(t), s = gt.speed(e, n, i), a = function () {
                                var e = G(this, gt.extend({}, t), s);
                                (r || Dt.get(this, "finish")) && e.stop(!0)
                            };
                            return a.finish = a, r || s.queue === !1 ? this.each(a) : this.queue(s.queue, a)
                        }, stop: function (t, e, n) {
                            var i = function (t) {
                                var e = t.stop;
                                delete t.stop, e(n)
                            };
                            return "string" != typeof t && (n = e, e = t, t = void 0), e && t !== !1 && this.queue(t || "fx", []), this.each(function () {
                                var e = !0, r = null != t && t + "queueHooks", s = gt.timers, a = Dt.get(this);
                                if (r) a[r] && a[r].stop && i(a[r]); else for (r in a) a[r] && a[r].stop && me.test(r) && i(a[r]);
                                for (r = s.length; r--;) s[r].elem !== this || null != t && s[r].queue !== t || (s[r].anim.stop(n), e = !1, s.splice(r, 1));
                                !e && n || gt.dequeue(this, t)
                            })
                        }, finish: function (t) {
                            return t !== !1 && (t = t || "fx"), this.each(function () {
                                var e, n = Dt.get(this), i = n[t + "queue"], r = n[t + "queueHooks"], s = gt.timers,
                                    a = i ? i.length : 0;
                                for (n.finish = !0, gt.queue(this, t, []), r && r.stop && r.stop.call(this, !0), e = s.length; e--;) s[e].elem === this && s[e].queue === t && (s[e].anim.stop(!0), s.splice(e, 1));
                                for (e = 0; e < a; e++) i[e] && i[e].finish && i[e].finish.call(this);
                                delete n.finish
                            })
                        }
                    }), gt.each(["toggle", "show", "hide"], function (t, e) {
                        var n = gt.fn[e];
                        gt.fn[e] = function (t, i, r) {
                            return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(B(e, !0), t, i, r)
                        }
                    }), gt.each({
                        slideDown: B("show"),
                        slideUp: B("hide"),
                        slideToggle: B("toggle"),
                        fadeIn: {opacity: "show"},
                        fadeOut: {opacity: "hide"},
                        fadeToggle: {opacity: "toggle"}
                    }, function (t, e) {
                        gt.fn[t] = function (t, n, i) {
                            return this.animate(e, t, n, i)
                        }
                    }), gt.timers = [], gt.fx.tick = function () {
                        var t, e = 0, n = gt.timers;
                        for (pe = gt.now(); e < n.length; e++) t = n[e], t() || n[e] !== t || n.splice(e--, 1);
                        n.length || gt.fx.stop(), pe = void 0
                    }, gt.fx.timer = function (t) {
                        gt.timers.push(t), t() ? gt.fx.start() : gt.timers.pop()
                    }, gt.fx.interval = 13, gt.fx.start = function () {
                        ge || (ge = t.requestAnimationFrame ? t.requestAnimationFrame(q) : t.setInterval(gt.fx.tick, gt.fx.interval))
                    }, gt.fx.stop = function () {
                        t.cancelAnimationFrame ? t.cancelAnimationFrame(ge) : t.clearInterval(ge), ge = null
                    }, gt.fx.speeds = {slow: 600, fast: 200, _default: 400}, gt.fn.delay = function (e, n) {
                        return e = gt.fx ? gt.fx.speeds[e] || e : e, n = n || "fx", this.queue(n, function (n, i) {
                            var r = t.setTimeout(n, e);
                            i.stop = function () {
                                t.clearTimeout(r)
                            }
                        })
                    }, function () {
                        var t = nt.createElement("input"), e = nt.createElement("select"),
                            n = e.appendChild(nt.createElement("option"));
                        t.type = "checkbox", ft.checkOn = "" !== t.value, ft.optSelected = n.selected, t = nt.createElement("input"), t.value = "t", t.type = "radio", ft.radioValue = "t" === t.value
                    }();
                    var _e, ye = gt.expr.attrHandle;
                    gt.fn.extend({
                        attr: function (t, e) {
                            return Mt(this, gt.attr, t, e, arguments.length > 1)
                        }, removeAttr: function (t) {
                            return this.each(function () {
                                gt.removeAttr(this, t)
                            })
                        }
                    }), gt.extend({
                        attr: function (t, e, n) {
                            var i, r, s = t.nodeType;
                            if (3 !== s && 8 !== s && 2 !== s) return "undefined" == typeof t.getAttribute ? gt.prop(t, e, n) : (1 === s && gt.isXMLDoc(t) || (r = gt.attrHooks[e.toLowerCase()] || (gt.expr.match.bool.test(e) ? _e : void 0)), void 0 !== n ? null === n ? void gt.removeAttr(t, e) : r && "set" in r && void 0 !== (i = r.set(t, n, e)) ? i : (t.setAttribute(e, n + ""), n) : r && "get" in r && null !== (i = r.get(t, e)) ? i : (i = gt.find.attr(t, e), null == i ? void 0 : i))
                        }, attrHooks: {
                            type: {
                                set: function (t, e) {
                                    if (!ft.radioValue && "radio" === e && gt.nodeName(t, "input")) {
                                        var n = t.value;
                                        return t.setAttribute("type", e), n && (t.value = n), e
                                    }
                                }
                            }
                        }, removeAttr: function (t, e) {
                            var n, i = 0, r = e && e.match(Ot);
                            if (r && 1 === t.nodeType) for (; n = r[i++];) t.removeAttribute(n)
                        }
                    }), _e = {
                        set: function (t, e, n) {
                            return e === !1 ? gt.removeAttr(t, n) : t.setAttribute(n, n), n
                        }
                    }, gt.each(gt.expr.match.bool.source.match(/\w+/g), function (t, e) {
                        var n = ye[e] || gt.find.attr;
                        ye[e] = function (t, e, i) {
                            var r, s, a = e.toLowerCase();
                            return i || (s = ye[a], ye[a] = r, r = null != n(t, e, i) ? a : null, ye[a] = s), r
                        }
                    });
                    var be = /^(?:input|select|textarea|button)$/i, we = /^(?:a|area)$/i;
                    gt.fn.extend({
                        prop: function (t, e) {
                            return Mt(this, gt.prop, t, e, arguments.length > 1)
                        }, removeProp: function (t) {
                            return this.each(function () {
                                delete this[gt.propFix[t] || t]
                            })
                        }
                    }), gt.extend({
                        prop: function (t, e, n) {
                            var i, r, s = t.nodeType;
                            if (3 !== s && 8 !== s && 2 !== s) return 1 === s && gt.isXMLDoc(t) || (e = gt.propFix[e] || e, r = gt.propHooks[e]), void 0 !== n ? r && "set" in r && void 0 !== (i = r.set(t, n, e)) ? i : t[e] = n : r && "get" in r && null !== (i = r.get(t, e)) ? i : t[e]
                        }, propHooks: {
                            tabIndex: {
                                get: function (t) {
                                    var e = gt.find.attr(t, "tabindex");
                                    return e ? parseInt(e, 10) : be.test(t.nodeName) || we.test(t.nodeName) && t.href ? 0 : -1
                                }
                            }
                        }, propFix: {for: "htmlFor", class: "className"}
                    }), ft.optSelected || (gt.propHooks.selected = {
                        get: function (t) {
                            var e = t.parentNode;
                            return e && e.parentNode && e.parentNode.selectedIndex, null
                        }, set: function (t) {
                            var e = t.parentNode;
                            e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
                        }
                    }), gt.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
                        gt.propFix[this.toLowerCase()] = this
                    }), gt.fn.extend({
                        addClass: function (t) {
                            var e, n, i, r, s, a, o, u = 0;
                            if (gt.isFunction(t)) return this.each(function (e) {
                                gt(this).addClass(t.call(this, e, $(this)))
                            });
                            if ("string" == typeof t && t) for (e = t.match(Ot) || []; n = this[u++];) if (r = $(n), i = 1 === n.nodeType && " " + Y(r) + " ") {
                                for (a = 0; s = e[a++];) i.indexOf(" " + s + " ") < 0 && (i += s + " ");
                                o = Y(i), r !== o && n.setAttribute("class", o)
                            }
                            return this
                        }, removeClass: function (t) {
                            var e, n, i, r, s, a, o, u = 0;
                            if (gt.isFunction(t)) return this.each(function (e) {
                                gt(this).removeClass(t.call(this, e, $(this)))
                            });
                            if (!arguments.length) return this.attr("class", "");
                            if ("string" == typeof t && t) for (e = t.match(Ot) || []; n = this[u++];) if (r = $(n), i = 1 === n.nodeType && " " + Y(r) + " ") {
                                for (a = 0; s = e[a++];) for (; i.indexOf(" " + s + " ") > -1;) i = i.replace(" " + s + " ", " ");
                                o = Y(i), r !== o && n.setAttribute("class", o)
                            }
                            return this
                        }, toggleClass: function (t, e) {
                            var n = typeof t;
                            return "boolean" == typeof e && "string" === n ? e ? this.addClass(t) : this.removeClass(t) : gt.isFunction(t) ? this.each(function (n) {
                                gt(this).toggleClass(t.call(this, n, $(this), e), e)
                            }) : this.each(function () {
                                var e, i, r, s;
                                if ("string" === n) for (i = 0, r = gt(this), s = t.match(Ot) || []; e = s[i++];) r.hasClass(e) ? r.removeClass(e) : r.addClass(e); else void 0 !== t && "boolean" !== n || (e = $(this), e && Dt.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || t === !1 ? "" : Dt.get(this, "__className__") || ""))
                            })
                        }, hasClass: function (t) {
                            var e, n, i = 0;
                            for (e = " " + t + " "; n = this[i++];) if (1 === n.nodeType && (" " + Y($(n)) + " ").indexOf(e) > -1) return !0;
                            return !1
                        }
                    });
                    var xe = /\r/g;
                    gt.fn.extend({
                        val: function (t) {
                            var e, n, i, r = this[0];
                            {
                                if (arguments.length) return i = gt.isFunction(t), this.each(function (n) {
                                    var r;
                                    1 === this.nodeType && (r = i ? t.call(this, n, gt(this).val()) : t, null == r ? r = "" : "number" == typeof r ? r += "" : gt.isArray(r) && (r = gt.map(r, function (t) {
                                        return null == t ? "" : t + ""
                                    })), e = gt.valHooks[this.type] || gt.valHooks[this.nodeName.toLowerCase()], e && "set" in e && void 0 !== e.set(this, r, "value") || (this.value = r))
                                });
                                if (r) return e = gt.valHooks[r.type] || gt.valHooks[r.nodeName.toLowerCase()], e && "get" in e && void 0 !== (n = e.get(r, "value")) ? n : (n = r.value, "string" == typeof n ? n.replace(xe, "") : null == n ? "" : n)
                            }
                        }
                    }), gt.extend({
                        valHooks: {
                            option: {
                                get: function (t) {
                                    var e = gt.find.attr(t, "value");
                                    return null != e ? e : Y(gt.text(t))
                                }
                            }, select: {
                                get: function (t) {
                                    var e, n, i, r = t.options, s = t.selectedIndex, a = "select-one" === t.type,
                                        o = a ? null : [], u = a ? s + 1 : r.length;
                                    for (i = s < 0 ? u : a ? s : 0; i < u; i++) if (n = r[i], (n.selected || i === s) && !n.disabled && (!n.parentNode.disabled || !gt.nodeName(n.parentNode, "optgroup"))) {
                                        if (e = gt(n).val(), a) return e;
                                        o.push(e)
                                    }
                                    return o
                                }, set: function (t, e) {
                                    for (var n, i, r = t.options, s = gt.makeArray(e), a = r.length; a--;) i = r[a], (i.selected = gt.inArray(gt.valHooks.option.get(i), s) > -1) && (n = !0);
                                    return n || (t.selectedIndex = -1), s
                                }
                            }
                        }
                    }), gt.each(["radio", "checkbox"], function () {
                        gt.valHooks[this] = {
                            set: function (t, e) {
                                if (gt.isArray(e)) return t.checked = gt.inArray(gt(t).val(), e) > -1
                            }
                        }, ft.checkOn || (gt.valHooks[this].get = function (t) {
                            return null === t.getAttribute("value") ? "on" : t.value
                        })
                    });
                    var Te = /^(?:focusinfocus|focusoutblur)$/;
                    gt.extend(gt.event, {
                        trigger: function (e, n, i, r) {
                            var s, a, o, u, l, c, h, d = [i || nt], f = ct.call(e, "type") ? e.type : e,
                                p = ct.call(e, "namespace") ? e.namespace.split(".") : [];
                            if (a = o = i = i || nt, 3 !== i.nodeType && 8 !== i.nodeType && !Te.test(f + gt.event.triggered) && (f.indexOf(".") > -1 && (p = f.split("."), f = p.shift(), p.sort()), l = f.indexOf(":") < 0 && "on" + f, e = e[gt.expando] ? e : new gt.Event(f, "object" == typeof e && e), e.isTrigger = r ? 2 : 3, e.namespace = p.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = i), n = null == n ? [e] : gt.makeArray(n, [e]), h = gt.event.special[f] || {}, r || !h.trigger || h.trigger.apply(i, n) !== !1)) {
                                if (!r && !h.noBubble && !gt.isWindow(i)) {
                                    for (u = h.delegateType || f, Te.test(u + f) || (a = a.parentNode); a; a = a.parentNode) d.push(a), o = a;
                                    o === (i.ownerDocument || nt) && d.push(o.defaultView || o.parentWindow || t)
                                }
                                for (s = 0; (a = d[s++]) && !e.isPropagationStopped();) e.type = s > 1 ? u : h.bindType || f, c = (Dt.get(a, "events") || {})[e.type] && Dt.get(a, "handle"), c && c.apply(a, n), c = l && a[l], c && c.apply && jt(a) && (e.result = c.apply(a, n), e.result === !1 && e.preventDefault());
                                return e.type = f, r || e.isDefaultPrevented() || h._default && h._default.apply(d.pop(), n) !== !1 || !jt(i) || l && gt.isFunction(i[f]) && !gt.isWindow(i) && (o = i[l], o && (i[l] = null), gt.event.triggered = f, i[f](), gt.event.triggered = void 0, o && (i[l] = o)), e.result
                            }
                        }, simulate: function (t, e, n) {
                            var i = gt.extend(new gt.Event, n, {type: t, isSimulated: !0});
                            gt.event.trigger(i, null, e)
                        }
                    }), gt.fn.extend({
                        trigger: function (t, e) {
                            return this.each(function () {
                                gt.event.trigger(t, e, this)
                            })
                        }, triggerHandler: function (t, e) {
                            var n = this[0];
                            if (n) return gt.event.trigger(t, e, n, !0)
                        }
                    }), gt.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (t, e) {
                        gt.fn[e] = function (t, n) {
                            return arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
                        }
                    }), gt.fn.extend({
                        hover: function (t, e) {
                            return this.mouseenter(t).mouseleave(e || t)
                        }
                    }), ft.focusin = "onfocusin" in t, ft.focusin || gt.each({
                        focus: "focusin",
                        blur: "focusout"
                    }, function (t, e) {
                        var n = function (t) {
                            gt.event.simulate(e, t.target, gt.event.fix(t))
                        };
                        gt.event.special[e] = {
                            setup: function () {
                                var i = this.ownerDocument || this, r = Dt.access(i, e);
                                r || i.addEventListener(t, n, !0), Dt.access(i, e, (r || 0) + 1)
                            }, teardown: function () {
                                var i = this.ownerDocument || this, r = Dt.access(i, e) - 1;
                                r ? Dt.access(i, e, r) : (i.removeEventListener(t, n, !0), Dt.remove(i, e))
                            }
                        }
                    });
                    var Ee = t.location, Se = gt.now(), Le = /\?/;
                    gt.parseXML = function (e) {
                        var n;
                        if (!e || "string" != typeof e) return null;
                        try {
                            n = (new t.DOMParser).parseFromString(e, "text/xml")
                        } catch (t) {
                            n = void 0
                        }
                        return n && !n.getElementsByTagName("parsererror").length || gt.error("Invalid XML: " + e), n
                    };
                    var Pe = /\[\]$/, Ce = /\r?\n/g, Ae = /^(?:submit|button|image|reset|file)$/i,
                        ke = /^(?:input|select|textarea|keygen)/i;
                    gt.param = function (t, e) {
                        var n, i = [], r = function (t, e) {
                            var n = gt.isFunction(e) ? e() : e;
                            i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(null == n ? "" : n)
                        };
                        if (gt.isArray(t) || t.jquery && !gt.isPlainObject(t)) gt.each(t, function () {
                            r(this.name, this.value)
                        }); else for (n in t) W(n, t[n], e, r);
                        return i.join("&")
                    }, gt.fn.extend({
                        serialize: function () {
                            return gt.param(this.serializeArray())
                        }, serializeArray: function () {
                            return this.map(function () {
                                var t = gt.prop(this, "elements");
                                return t ? gt.makeArray(t) : this
                            }).filter(function () {
                                var t = this.type;
                                return this.name && !gt(this).is(":disabled") && ke.test(this.nodeName) && !Ae.test(t) && (this.checked || !Yt.test(t))
                            }).map(function (t, e) {
                                var n = gt(this).val();
                                return null == n ? null : gt.isArray(n) ? gt.map(n, function (t) {
                                    return {name: e.name, value: t.replace(Ce, "\r\n")}
                                }) : {name: e.name, value: n.replace(Ce, "\r\n")}
                            }).get()
                        }
                    });
                    var Oe = /%20/g, Re = /#.*$/, Ie = /([?&])_=[^&]*/, Me = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                        je = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, De = /^(?:GET|HEAD)$/,
                        Ne = /^\/\//, Fe = {}, qe = {}, He = "*/".concat("*"), Be = nt.createElement("a");
                    Be.href = Ee.href, gt.extend({
                        active: 0,
                        lastModified: {},
                        etag: {},
                        ajaxSettings: {
                            url: Ee.href,
                            type: "GET",
                            isLocal: je.test(Ee.protocol),
                            global: !0,
                            processData: !0,
                            async: !0,
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            accepts: {
                                "*": He,
                                text: "text/plain",
                                html: "text/html",
                                xml: "application/xml, text/xml",
                                json: "application/json, text/javascript"
                            },
                            contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/},
                            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
                            converters: {
                                "* text": String,
                                "text html": !0,
                                "text json": JSON.parse,
                                "text xml": gt.parseXML
                            },
                            flatOptions: {url: !0, context: !0}
                        },
                        ajaxSetup: function (t, e) {
                            return e ? J(J(t, gt.ajaxSettings), e) : J(gt.ajaxSettings, t)
                        },
                        ajaxPrefilter: z(Fe),
                        ajaxTransport: z(qe),
                        ajax: function (e, n) {
                            function i(e, n, i, o) {
                                var l, d, f, b, w, x = n;
                                c || (c = !0, u && t.clearTimeout(u), r = void 0, a = o || "", T.readyState = e > 0 ? 4 : 0, l = e >= 200 && e < 300 || 304 === e, i && (b = Z(p, T, i)), b = K(p, b, T, l), l ? (p.ifModified && (w = T.getResponseHeader("Last-Modified"), w && (gt.lastModified[s] = w), w = T.getResponseHeader("etag"), w && (gt.etag[s] = w)), 204 === e || "HEAD" === p.type ? x = "nocontent" : 304 === e ? x = "notmodified" : (x = b.state, d = b.data, f = b.error, l = !f)) : (f = x, !e && x || (x = "error", e < 0 && (e = 0))), T.status = e, T.statusText = (n || x) + "", l ? m.resolveWith(g, [d, x, T]) : m.rejectWith(g, [T, x, f]), T.statusCode(y), y = void 0, h && v.trigger(l ? "ajaxSuccess" : "ajaxError", [T, p, l ? d : f]), _.fireWith(g, [T, x]), h && (v.trigger("ajaxComplete", [T, p]), --gt.active || gt.event.trigger("ajaxStop")))
                            }

                            "object" == typeof e && (n = e, e = void 0), n = n || {};
                            var r, s, a, o, u, l, c, h, d, f, p = gt.ajaxSetup({}, n), g = p.context || p,
                                v = p.context && (g.nodeType || g.jquery) ? gt(g) : gt.event, m = gt.Deferred(),
                                _ = gt.Callbacks("once memory"), y = p.statusCode || {}, b = {}, w = {}, x = "canceled",
                                T = {
                                    readyState: 0, getResponseHeader: function (t) {
                                        var e;
                                        if (c) {
                                            if (!o) for (o = {}; e = Me.exec(a);) o[e[1].toLowerCase()] = e[2];
                                            e = o[t.toLowerCase()]
                                        }
                                        return null == e ? null : e
                                    }, getAllResponseHeaders: function () {
                                        return c ? a : null
                                    }, setRequestHeader: function (t, e) {
                                        return null == c && (t = w[t.toLowerCase()] = w[t.toLowerCase()] || t, b[t] = e), this
                                    }, overrideMimeType: function (t) {
                                        return null == c && (p.mimeType = t), this
                                    }, statusCode: function (t) {
                                        var e;
                                        if (t) if (c) T.always(t[T.status]); else for (e in t) y[e] = [y[e], t[e]];
                                        return this
                                    }, abort: function (t) {
                                        var e = t || x;
                                        return r && r.abort(e), i(0, e), this
                                    }
                                };
                            if (m.promise(T), p.url = ((e || p.url || Ee.href) + "").replace(Ne, Ee.protocol + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = (p.dataType || "*").toLowerCase().match(Ot) || [""], null == p.crossDomain) {
                                l = nt.createElement("a");
                                try {
                                    l.href = p.url, l.href = l.href, p.crossDomain = Be.protocol + "//" + Be.host != l.protocol + "//" + l.host
                                } catch (t) {
                                    p.crossDomain = !0
                                }
                            }
                            if (p.data && p.processData && "string" != typeof p.data && (p.data = gt.param(p.data, p.traditional)), Q(Fe, p, n, T), c) return T;
                            h = gt.event && p.global, h && 0 === gt.active++ && gt.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !De.test(p.type), s = p.url.replace(Re, ""), p.hasContent ? p.data && p.processData && 0 === (p.contentType || "").indexOf("application/x-www-form-urlencoded") && (p.data = p.data.replace(Oe, "+")) : (f = p.url.slice(s.length), p.data && (s += (Le.test(s) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (s = s.replace(Ie, "$1"), f = (Le.test(s) ? "&" : "?") + "_=" + Se++ + f), p.url = s + f), p.ifModified && (gt.lastModified[s] && T.setRequestHeader("If-Modified-Since", gt.lastModified[s]), gt.etag[s] && T.setRequestHeader("If-None-Match", gt.etag[s])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && T.setRequestHeader("Content-Type", p.contentType), T.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + He + "; q=0.01" : "") : p.accepts["*"]);
                            for (d in p.headers) T.setRequestHeader(d, p.headers[d]);
                            if (p.beforeSend && (p.beforeSend.call(g, T, p) === !1 || c)) return T.abort();
                            if (x = "abort", _.add(p.complete), T.done(p.success), T.fail(p.error), r = Q(qe, p, n, T)) {
                                if (T.readyState = 1, h && v.trigger("ajaxSend", [T, p]), c) return T;
                                p.async && p.timeout > 0 && (u = t.setTimeout(function () {
                                    T.abort("timeout")
                                }, p.timeout));
                                try {
                                    c = !1, r.send(b, i)
                                } catch (t) {
                                    if (c) throw t;
                                    i(-1, t)
                                }
                            } else i(-1, "No Transport");
                            return T
                        },
                        getJSON: function (t, e, n) {
                            return gt.get(t, e, n, "json")
                        },
                        getScript: function (t, e) {
                            return gt.get(t, void 0, e, "script")
                        }
                    }), gt.each(["get", "post"], function (t, e) {
                        gt[e] = function (t, n, i, r) {
                            return gt.isFunction(n) && (r = r || i, i = n, n = void 0), gt.ajax(gt.extend({
                                url: t,
                                type: e,
                                dataType: r,
                                data: n,
                                success: i
                            }, gt.isPlainObject(t) && t))
                        }
                    }), gt._evalUrl = function (t) {
                        return gt.ajax({
                            url: t,
                            type: "GET",
                            dataType: "script",
                            cache: !0,
                            async: !1,
                            global: !1,
                            throws: !0
                        })
                    }, gt.fn.extend({
                        wrapAll: function (t) {
                            var e;
                            return this[0] && (gt.isFunction(t) && (t = t.call(this[0])), e = gt(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function () {
                                for (var t = this; t.firstElementChild;) t = t.firstElementChild;
                                return t
                            }).append(this)), this
                        }, wrapInner: function (t) {
                            return gt.isFunction(t) ? this.each(function (e) {
                                gt(this).wrapInner(t.call(this, e))
                            }) : this.each(function () {
                                var e = gt(this), n = e.contents();
                                n.length ? n.wrapAll(t) : e.append(t)
                            })
                        }, wrap: function (t) {
                            var e = gt.isFunction(t);
                            return this.each(function (n) {
                                gt(this).wrapAll(e ? t.call(this, n) : t)
                            })
                        }, unwrap: function (t) {
                            return this.parent(t).not("body").each(function () {
                                gt(this).replaceWith(this.childNodes)
                            }), this
                        }
                    }), gt.expr.pseudos.hidden = function (t) {
                        return !gt.expr.pseudos.visible(t)
                    }, gt.expr.pseudos.visible = function (t) {
                        return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length)
                    }, gt.ajaxSettings.xhr = function () {
                        try {
                            return new t.XMLHttpRequest
                        } catch (t) {
                        }
                    };
                    var Ve = {0: 200, 1223: 204}, Xe = gt.ajaxSettings.xhr();
                    ft.cors = !!Xe && "withCredentials" in Xe, ft.ajax = Xe = !!Xe, gt.ajaxTransport(function (e) {
                        var n, i;
                        if (ft.cors || Xe && !e.crossDomain) return {
                            send: function (r, s) {
                                var a, o = e.xhr();
                                if (o.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (a in e.xhrFields) o[a] = e.xhrFields[a];
                                e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType), e.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                                for (a in r) o.setRequestHeader(a, r[a]);
                                n = function (t) {
                                    return function () {
                                        n && (n = i = o.onload = o.onerror = o.onabort = o.onreadystatechange = null, "abort" === t ? o.abort() : "error" === t ? "number" != typeof o.status ? s(0, "error") : s(o.status, o.statusText) : s(Ve[o.status] || o.status, o.statusText, "text" !== (o.responseType || "text") || "string" != typeof o.responseText ? {binary: o.response} : {text: o.responseText}, o.getAllResponseHeaders()))
                                    }
                                }, o.onload = n(), i = o.onerror = n("error"), void 0 !== o.onabort ? o.onabort = i : o.onreadystatechange = function () {
                                    4 === o.readyState && t.setTimeout(function () {
                                        n && i()
                                    })
                                }, n = n("abort");
                                try {
                                    o.send(e.hasContent && e.data || null)
                                } catch (t) {
                                    if (n) throw t
                                }
                            }, abort: function () {
                                n && n()
                            }
                        }
                    }), gt.ajaxPrefilter(function (t) {
                        t.crossDomain && (t.contents.script = !1)
                    }), gt.ajaxSetup({
                        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
                        contents: {script: /\b(?:java|ecma)script\b/},
                        converters: {
                            "text script": function (t) {
                                return gt.globalEval(t), t
                            }
                        }
                    }), gt.ajaxPrefilter("script", function (t) {
                        void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET")
                    }), gt.ajaxTransport("script", function (t) {
                        if (t.crossDomain) {
                            var e, n;
                            return {
                                send: function (i, r) {
                                    e = gt("<script>").prop({
                                        charset: t.scriptCharset,
                                        src: t.url
                                    }).on("load error", n = function (t) {
                                        e.remove(), n = null, t && r("error" === t.type ? 404 : 200, t.type)
                                    }), nt.head.appendChild(e[0])
                                }, abort: function () {
                                    n && n()
                                }
                            }
                        }
                    });
                    var Ue = [], Ge = /(=)\?(?=&|$)|\?\?/;
                    gt.ajaxSetup({
                        jsonp: "callback", jsonpCallback: function () {
                            var t = Ue.pop() || gt.expando + "_" + Se++;
                            return this[t] = !0, t
                        }
                    }), gt.ajaxPrefilter("json jsonp", function (e, n, i) {
                        var r, s, a,
                            o = e.jsonp !== !1 && (Ge.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Ge.test(e.data) && "data");
                        if (o || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = gt.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, o ? e[o] = e[o].replace(Ge, "$1" + r) : e.jsonp !== !1 && (e.url += (Le.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function () {
                            return a || gt.error(r + " was not called"), a[0]
                        }, e.dataTypes[0] = "json", s = t[r], t[r] = function () {
                            a = arguments
                        }, i.always(function () {
                            void 0 === s ? gt(t).removeProp(r) : t[r] = s, e[r] && (e.jsonpCallback = n.jsonpCallback, Ue.push(r)), a && gt.isFunction(s) && s(a[0]), a = s = void 0
                        }), "script"
                    }), ft.createHTMLDocument = function () {
                        var t = nt.implementation.createHTMLDocument("").body;
                        return t.innerHTML = "<form></form><form></form>", 2 === t.childNodes.length
                    }(), gt.parseHTML = function (t, e, n) {
                        if ("string" != typeof t) return [];
                        "boolean" == typeof e && (n = e, e = !1);
                        var i, r, s;
                        return e || (ft.createHTMLDocument ? (e = nt.implementation.createHTMLDocument(""), i = e.createElement("base"), i.href = nt.location.href, e.head.appendChild(i)) : e = nt), r = Et.exec(t), s = !n && [], r ? [e.createElement(r[1])] : (r = b([t], e, s), s && s.length && gt(s).remove(), gt.merge([], r.childNodes))
                    }, gt.fn.load = function (t, e, n) {
                        var i, r, s, a = this, o = t.indexOf(" ");
                        return o > -1 && (i = Y(t.slice(o)), t = t.slice(0, o)), gt.isFunction(e) ? (n = e, e = void 0) : e && "object" == typeof e && (r = "POST"), a.length > 0 && gt.ajax({
                            url: t,
                            type: r || "GET",
                            dataType: "html",
                            data: e
                        }).done(function (t) {
                            s = arguments, a.html(i ? gt("<div>").append(gt.parseHTML(t)).find(i) : t)
                        }).always(n && function (t, e) {
                            a.each(function () {
                                n.apply(this, s || [t.responseText, e, t])
                            })
                        }), this
                    }, gt.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (t, e) {
                        gt.fn[e] = function (t) {
                            return this.on(e, t)
                        }
                    }), gt.expr.pseudos.animated = function (t) {
                        return gt.grep(gt.timers, function (e) {
                            return t === e.elem
                        }).length
                    }, gt.offset = {
                        setOffset: function (t, e, n) {
                            var i, r, s, a, o, u, l, c = gt.css(t, "position"), h = gt(t), d = {};
                            "static" === c && (t.style.position = "relative"), o = h.offset(), s = gt.css(t, "top"), u = gt.css(t, "left"), l = ("absolute" === c || "fixed" === c) && (s + u).indexOf("auto") > -1, l ? (i = h.position(), a = i.top, r = i.left) : (a = parseFloat(s) || 0, r = parseFloat(u) || 0), gt.isFunction(e) && (e = e.call(t, n, gt.extend({}, o))), null != e.top && (d.top = e.top - o.top + a), null != e.left && (d.left = e.left - o.left + r), "using" in e ? e.using.call(t, d) : h.css(d)
                        }
                    }, gt.fn.extend({
                        offset: function (t) {
                            if (arguments.length) return void 0 === t ? this : this.each(function (e) {
                                gt.offset.setOffset(this, t, e)
                            });
                            var e, n, i, r, s = this[0];
                            if (s) return s.getClientRects().length ? (i = s.getBoundingClientRect(), i.width || i.height ? (r = s.ownerDocument, n = tt(r), e = r.documentElement, {
                                top: i.top + n.pageYOffset - e.clientTop,
                                left: i.left + n.pageXOffset - e.clientLeft
                            }) : i) : {top: 0, left: 0}
                        }, position: function () {
                            if (this[0]) {
                                var t, e, n = this[0], i = {top: 0, left: 0};
                                return "fixed" === gt.css(n, "position") ? e = n.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), gt.nodeName(t[0], "html") || (i = t.offset()), i = {
                                    top: i.top + gt.css(t[0], "borderTopWidth", !0),
                                    left: i.left + gt.css(t[0], "borderLeftWidth", !0)
                                }), {
                                    top: e.top - i.top - gt.css(n, "marginTop", !0),
                                    left: e.left - i.left - gt.css(n, "marginLeft", !0)
                                }
                            }
                        }, offsetParent: function () {
                            return this.map(function () {
                                for (var t = this.offsetParent; t && "static" === gt.css(t, "position");) t = t.offsetParent;
                                return t || Jt
                            })
                        }
                    }), gt.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (t, e) {
                        var n = "pageYOffset" === e;
                        gt.fn[t] = function (i) {
                            return Mt(this, function (t, i, r) {
                                var s = tt(t);
                                return void 0 === r ? s ? s[e] : t[i] : void(s ? s.scrollTo(n ? s.pageXOffset : r, n ? r : s.pageYOffset) : t[i] = r)
                            }, t, i, arguments.length)
                        }
                    }), gt.each(["top", "left"], function (t, e) {
                        gt.cssHooks[e] = I(ft.pixelPosition, function (t, n) {
                            if (n) return n = R(t, e), oe.test(n) ? gt(t).position()[e] + "px" : n
                        })
                    }), gt.each({Height: "height", Width: "width"}, function (t, e) {
                        gt.each({padding: "inner" + t, content: e, "": "outer" + t}, function (n, i) {
                            gt.fn[i] = function (r, s) {
                                var a = arguments.length && (n || "boolean" != typeof r),
                                    o = n || (r === !0 || s === !0 ? "margin" : "border");
                                return Mt(this, function (e, n, r) {
                                    var s;
                                    return gt.isWindow(e) ? 0 === i.indexOf("outer") ? e["inner" + t] : e.document.documentElement["client" + t] : 9 === e.nodeType ? (s = e.documentElement, Math.max(e.body["scroll" + t], s["scroll" + t], e.body["offset" + t], s["offset" + t], s["client" + t])) : void 0 === r ? gt.css(e, n, o) : gt.style(e, n, r, o)
                                }, e, a ? r : void 0, a)
                            }
                        })
                    }), gt.fn.extend({
                        bind: function (t, e, n) {
                            return this.on(t, null, e, n)
                        }, unbind: function (t, e) {
                            return this.off(t, null, e)
                        }, delegate: function (t, e, n, i) {
                            return this.on(e, t, n, i)
                        }, undelegate: function (t, e, n) {
                            return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
                        }
                    }), gt.parseJSON = JSON.parse, "function" == typeof i && i.amd && i("jquery", [], function () {
                        return gt
                    });
                    var Ye = t.jQuery, $e = t.$;
                    return gt.noConflict = function (e) {
                        return t.$ === gt && (t.$ = $e), e && t.jQuery === gt && (t.jQuery = Ye), gt
                    }, e || (t.jQuery = t.$ = gt), gt
                }), r("undefined" != typeof $ ? $ : window.$)
            }).call(t, void 0, void 0, void 0, void 0, function (t) {
                e.exports = t
            })
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    4: [function (t, e, n) {
        !function (t) {
            "use strict";

            function e(t) {
                var e = t.length, i = n.type(t);
                return "function" !== i && !n.isWindow(t) && (!(1 !== t.nodeType || !e) || ("array" === i || 0 === e || "number" == typeof e && e > 0 && e - 1 in t))
            }

            if (!t.jQuery) {
                var n = function (t, e) {
                    return new n.fn.init(t, e)
                };
                n.isWindow = function (t) {
                    return t && t === t.window
                }, n.type = function (t) {
                    return t ? "object" == typeof t || "function" == typeof t ? r[a.call(t)] || "object" : typeof t : t + ""
                }, n.isArray = Array.isArray || function (t) {
                    return "array" === n.type(t)
                }, n.isPlainObject = function (t) {
                    var e;
                    if (!t || "object" !== n.type(t) || t.nodeType || n.isWindow(t)) return !1;
                    try {
                        if (t.constructor && !s.call(t, "constructor") && !s.call(t.constructor.prototype, "isPrototypeOf")) return !1
                    } catch (t) {
                        return !1
                    }
                    for (e in t) ;
                    return void 0 === e || s.call(t, e)
                }, n.each = function (t, n, i) {
                    var r, s = 0, a = t.length, o = e(t);
                    if (i) {
                        if (o) for (; s < a && (r = n.apply(t[s], i), r !== !1); s++) ; else for (s in t) if (t.hasOwnProperty(s) && (r = n.apply(t[s], i), r === !1)) break
                    } else if (o) for (; s < a && (r = n.call(t[s], s, t[s]), r !== !1); s++) ; else for (s in t) if (t.hasOwnProperty(s) && (r = n.call(t[s], s, t[s]), r === !1)) break;
                    return t
                }, n.data = function (t, e, r) {
                    if (void 0 === r) {
                        var s = t[n.expando], a = s && i[s];
                        if (void 0 === e) return a;
                        if (a && e in a) return a[e]
                    } else if (void 0 !== e) {
                        var o = t[n.expando] || (t[n.expando] = ++n.uuid);
                        return i[o] = i[o] || {}, i[o][e] = r, r
                    }
                }, n.removeData = function (t, e) {
                    var r = t[n.expando], s = r && i[r];
                    s && (e ? n.each(e, function (t, e) {
                        delete s[e]
                    }) : delete i[r])
                }, n.extend = function () {
                    var t, e, i, r, s, a, o = arguments[0] || {}, u = 1, l = arguments.length, c = !1;
                    for ("boolean" == typeof o && (c = o, o = arguments[u] || {}, u++), "object" != typeof o && "function" !== n.type(o) && (o = {}), u === l && (o = this, u--); u < l; u++) if (s = arguments[u]) for (r in s) s.hasOwnProperty(r) && (t = o[r], i = s[r], o !== i && (c && i && (n.isPlainObject(i) || (e = n.isArray(i))) ? (e ? (e = !1, a = t && n.isArray(t) ? t : []) : a = t && n.isPlainObject(t) ? t : {}, o[r] = n.extend(c, a, i)) : void 0 !== i && (o[r] = i)));
                    return o
                }, n.queue = function (t, i, r) {
                    function s(t, n) {
                        var i = n || [];
                        return t && (e(Object(t)) ? !function (t, e) {
                            for (var n = +e.length, i = 0, r = t.length; i < n;) t[r++] = e[i++];
                            if (n !== n) for (; void 0 !== e[i];) t[r++] = e[i++];
                            return t.length = r, t
                        }(i, "string" == typeof t ? [t] : t) : [].push.call(i, t)), i
                    }

                    if (t) {
                        i = (i || "fx") + "queue";
                        var a = n.data(t, i);
                        return r ? (!a || n.isArray(r) ? a = n.data(t, i, s(r)) : a.push(r), a) : a || []
                    }
                }, n.dequeue = function (t, e) {
                    n.each(t.nodeType ? [t] : t, function (t, i) {
                        e = e || "fx";
                        var r = n.queue(i, e), s = r.shift();
                        "inprogress" === s && (s = r.shift()), s && ("fx" === e && r.unshift("inprogress"), s.call(i, function () {
                            n.dequeue(i, e)
                        }))
                    })
                }, n.fn = n.prototype = {
                    init: function (t) {
                        if (t.nodeType) return this[0] = t, this;
                        throw new Error("Not a DOM node.")
                    }, offset: function () {
                        var e = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {top: 0, left: 0};
                        return {
                            top: e.top + (t.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
                            left: e.left + (t.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
                        }
                    }, position: function () {
                        function t(t) {
                            for (var e = t.offsetParent || document; e && "html" !== e.nodeType.toLowerCase && "static" === e.style.position;) e = e.offsetParent;
                            return e || document
                        }

                        var e = this[0], i = t(e), r = this.offset(),
                            s = /^(?:body|html)$/i.test(i.nodeName) ? {top: 0, left: 0} : n(i).offset();
                        return r.top -= parseFloat(e.style.marginTop) || 0, r.left -= parseFloat(e.style.marginLeft) || 0, i.style && (s.top += parseFloat(i.style.borderTopWidth) || 0, s.left += parseFloat(i.style.borderLeftWidth) || 0), {
                            top: r.top - s.top,
                            left: r.left - s.left
                        }
                    }
                };
                var i = {};
                n.expando = "velocity" + (new Date).getTime(), n.uuid = 0;
                for (var r = {}, s = r.hasOwnProperty, a = r.toString, o = "Boolean Number String Function Array Date RegExp Object Error".split(" "), u = 0; u < o.length; u++) r["[object " + o[u] + "]"] = o[u].toLowerCase();
                n.fn.init.prototype = n.fn, t.Velocity = {Utilities: n}
            }
        }(window), function (t) {
            "use strict";
            "object" == typeof e && "object" == typeof e.exports ? e.exports = t() : "function" == typeof define && define.amd ? define(t) : t()
        }(function () {
            "use strict";
            return function (t, e, n, i) {
                function r(t) {
                    for (var e = -1, n = t ? t.length : 0, i = []; ++e < n;) {
                        var r = t[e];
                        r && i.push(r)
                    }
                    return i
                }

                function s(t) {
                    return g.isWrapped(t) ? t = [].slice.call(t) : g.isNode(t) && (t = [t]), t
                }

                function a(t) {
                    var e = d.data(t, "velocity");
                    return null === e ? i : e
                }

                function o(t) {
                    return function (e) {
                        return Math.round(e * t) * (1 / t)
                    }
                }

                function u(t, n, i, r) {
                    function s(t, e) {
                        return 1 - 3 * e + 3 * t
                    }

                    function a(t, e) {
                        return 3 * e - 6 * t
                    }

                    function o(t) {
                        return 3 * t
                    }

                    function u(t, e, n) {
                        return ((s(e, n) * t + a(e, n)) * t + o(e)) * t
                    }

                    function l(t, e, n) {
                        return 3 * s(e, n) * t * t + 2 * a(e, n) * t + o(e)
                    }

                    function c(e, n) {
                        for (var r = 0; r < g; ++r) {
                            var s = l(n, t, i);
                            if (0 === s) return n;
                            var a = u(n, t, i) - e;
                            n -= a / s
                        }
                        return n
                    }

                    function h() {
                        for (var e = 0; e < y; ++e) T[e] = u(e * b, t, i)
                    }

                    function d(e, n, r) {
                        var s, a, o = 0;
                        do a = n + (r - n) / 2, s = u(a, t, i) - e, s > 0 ? r = a : n = a; while (Math.abs(s) > m && ++o < _);
                        return a
                    }

                    function f(e) {
                        for (var n = 0, r = 1, s = y - 1; r !== s && T[r] <= e; ++r) n += b;
                        --r;
                        var a = (e - T[r]) / (T[r + 1] - T[r]), o = n + a * b, u = l(o, t, i);
                        return u >= v ? c(e, o) : 0 === u ? o : d(e, n, n + b)
                    }

                    function p() {
                        E = !0, t === n && i === r || h()
                    }

                    var g = 4, v = .001, m = 1e-7, _ = 10, y = 11, b = 1 / (y - 1), w = "Float32Array" in e;
                    if (4 !== arguments.length) return !1;
                    for (var x = 0; x < 4; ++x) if ("number" != typeof arguments[x] || isNaN(arguments[x]) || !isFinite(arguments[x])) return !1;
                    t = Math.min(t, 1), i = Math.min(i, 1), t = Math.max(t, 0), i = Math.max(i, 0);
                    var T = w ? new Float32Array(y) : new Array(y), E = !1, S = function (e) {
                        return E || p(), t === n && i === r ? e : 0 === e ? 0 : 1 === e ? 1 : u(f(e), n, r)
                    };
                    S.getControlPoints = function () {
                        return [{x: t, y: n}, {x: i, y: r}]
                    };
                    var L = "generateBezier(" + [t, n, i, r] + ")";
                    return S.toString = function () {
                        return L
                    }, S
                }

                function l(t, e) {
                    var n = t;
                    return g.isString(t) ? y.Easings[t] || (n = !1) : n = g.isArray(t) && 1 === t.length ? o.apply(null, t) : g.isArray(t) && 2 === t.length ? b.apply(null, t.concat([e])) : !(!g.isArray(t) || 4 !== t.length) && u.apply(null, t), n === !1 && (n = y.Easings[y.defaults.easing] ? y.defaults.easing : _), n
                }

                function c(t) {
                    if (t) {
                        var e = (new Date).getTime(), n = y.State.calls.length;
                        n > 1e4 && (y.State.calls = r(y.State.calls), n = y.State.calls.length);
                        for (var s = 0; s < n; s++) if (y.State.calls[s]) {
                            var o = y.State.calls[s], u = o[0], l = o[2], f = o[3], p = !!f, v = null;
                            f || (f = y.State.calls[s][3] = e - 16);
                            for (var m = Math.min((e - f) / l.duration, 1), _ = 0, b = u.length; _ < b; _++) {
                                var x = u[_], E = x.element;
                                if (a(E)) {
                                    var S = !1;
                                    if (l.display !== i && null !== l.display && "none" !== l.display) {
                                        if ("flex" === l.display) {
                                            var L = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                                            d.each(L, function (t, e) {
                                                w.setPropertyValue(E, "display", e)
                                            })
                                        }
                                        w.setPropertyValue(E, "display", l.display)
                                    }
                                    l.visibility !== i && "hidden" !== l.visibility && w.setPropertyValue(E, "visibility", l.visibility);
                                    for (var P in x) if (x.hasOwnProperty(P) && "element" !== P) {
                                        var C, A = x[P], k = g.isString(A.easing) ? y.Easings[A.easing] : A.easing;
                                        if (1 === m) C = A.endValue; else {
                                            var O = A.endValue - A.startValue;
                                            if (C = A.startValue + O * k(m, l, O), !p && C === A.currentValue) continue
                                        }
                                        if (A.currentValue = C, "tween" === P) v = C; else {
                                            var R;
                                            if (w.Hooks.registered[P]) {
                                                R = w.Hooks.getRoot(P);
                                                var I = a(E).rootPropertyValueCache[R];
                                                I && (A.rootPropertyValue = I)
                                            }
                                            var M = w.setPropertyValue(E, P, A.currentValue + (0 === parseFloat(C) ? "" : A.unitType), A.rootPropertyValue, A.scrollData);
                                            w.Hooks.registered[P] && (w.Normalizations.registered[R] ? a(E).rootPropertyValueCache[R] = w.Normalizations.registered[R]("extract", null, M[1]) : a(E).rootPropertyValueCache[R] = M[1]), "transform" === M[0] && (S = !0)
                                        }
                                    }
                                    l.mobileHA && a(E).transformCache.translate3d === i && (a(E).transformCache.translate3d = "(0px, 0px, 0px)", S = !0), S && w.flushTransformCache(E)
                                }
                            }
                            l.display !== i && "none" !== l.display && (y.State.calls[s][2].display = !1), l.visibility !== i && "hidden" !== l.visibility && (y.State.calls[s][2].visibility = !1), l.progress && l.progress.call(o[1], o[1], m, Math.max(0, f + l.duration - e), f, v),
                            1 === m && h(s)
                        }
                    }
                    y.State.isTicking && T(c)
                }

                function h(t, e) {
                    if (!y.State.calls[t]) return !1;
                    for (var n = y.State.calls[t][0], r = y.State.calls[t][1], s = y.State.calls[t][2], o = y.State.calls[t][4], u = !1, l = 0, c = n.length; l < c; l++) {
                        var h = n[l].element;
                        e || s.loop || ("none" === s.display && w.setPropertyValue(h, "display", s.display), "hidden" === s.visibility && w.setPropertyValue(h, "visibility", s.visibility));
                        var f = a(h);
                        if (s.loop !== !0 && (d.queue(h)[1] === i || !/\.velocityQueueEntryFlag/i.test(d.queue(h)[1])) && f) {
                            f.isAnimating = !1, f.rootPropertyValueCache = {};
                            var p = !1;
                            d.each(w.Lists.transforms3D, function (t, e) {
                                var n = /^scale/.test(e) ? 1 : 0, r = f.transformCache[e];
                                f.transformCache[e] !== i && new RegExp("^\\(" + n + "[^.]").test(r) && (p = !0, delete f.transformCache[e])
                            }), s.mobileHA && (p = !0, delete f.transformCache.translate3d), p && w.flushTransformCache(h), w.Values.removeClass(h, "velocity-animating")
                        }
                        if (!e && s.complete && !s.loop && l === c - 1) try {
                            s.complete.call(r, r)
                        } catch (t) {
                            setTimeout(function () {
                                throw t
                            }, 1)
                        }
                        o && s.loop !== !0 && o(r), f && s.loop === !0 && !e && (d.each(f.tweensContainer, function (t, e) {
                            if (/^rotate/.test(t) && (parseFloat(e.startValue) - parseFloat(e.endValue)) % 360 === 0) {
                                var n = e.startValue;
                                e.startValue = e.endValue, e.endValue = n
                            }
                            /^backgroundPosition/.test(t) && 100 === parseFloat(e.endValue) && "%" === e.unitType && (e.endValue = 0, e.startValue = 100)
                        }), y(h, "reverse", {loop: !0, delay: s.delay})), s.queue !== !1 && d.dequeue(h, s.queue)
                    }
                    y.State.calls[t] = !1;
                    for (var g = 0, v = y.State.calls.length; g < v; g++) if (y.State.calls[g] !== !1) {
                        u = !0;
                        break
                    }
                    u === !1 && (y.State.isTicking = !1, delete y.State.calls, y.State.calls = [])
                }

                var d, f = function () {
                    if (n.documentMode) return n.documentMode;
                    for (var t = 7; t > 4; t--) {
                        var e = n.createElement("div");
                        if (e.innerHTML = "<!--[if IE " + t + "]><span></span><![endif]-->", e.getElementsByTagName("span").length) return e = null, t
                    }
                    return i
                }(), p = function () {
                    var t = 0;
                    return e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || function (e) {
                        var n, i = (new Date).getTime();
                        return n = Math.max(0, 16 - (i - t)), t = i + n, setTimeout(function () {
                            e(i + n)
                        }, n)
                    }
                }(), g = {
                    isString: function (t) {
                        return "string" == typeof t
                    }, isArray: Array.isArray || function (t) {
                        return "[object Array]" === Object.prototype.toString.call(t)
                    }, isFunction: function (t) {
                        return "[object Function]" === Object.prototype.toString.call(t)
                    }, isNode: function (t) {
                        return t && t.nodeType
                    }, isNodeList: function (t) {
                        return "object" == typeof t && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(t)) && t.length !== i && (0 === t.length || "object" == typeof t[0] && t[0].nodeType > 0)
                    }, isWrapped: function (t) {
                        return t && (t.jquery || e.Zepto && e.Zepto.zepto.isZ(t))
                    }, isSVG: function (t) {
                        return e.SVGElement && t instanceof e.SVGElement
                    }, isEmptyObject: function (t) {
                        for (var e in t) if (t.hasOwnProperty(e)) return !1;
                        return !0
                    }
                }, v = !1;
                if (t.fn && t.fn.jquery ? (d = t, v = !0) : d = e.Velocity.Utilities, f <= 8 && !v) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
                if (f <= 7) return void(jQuery.fn.velocity = jQuery.fn.animate);
                var m = 400, _ = "swing", y = {
                    State: {
                        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                        isAndroid: /Android/i.test(navigator.userAgent),
                        isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
                        isChrome: e.chrome,
                        isFirefox: /Firefox/i.test(navigator.userAgent),
                        prefixElement: n.createElement("div"),
                        prefixMatches: {},
                        scrollAnchor: null,
                        scrollPropertyLeft: null,
                        scrollPropertyTop: null,
                        isTicking: !1,
                        calls: []
                    },
                    CSS: {},
                    Utilities: d,
                    Redirects: {},
                    Easings: {},
                    Promise: e.Promise,
                    defaults: {
                        queue: "",
                        duration: m,
                        easing: _,
                        begin: i,
                        complete: i,
                        progress: i,
                        display: i,
                        visibility: i,
                        loop: !1,
                        delay: !1,
                        mobileHA: !0,
                        _cacheValues: !0
                    },
                    init: function (t) {
                        d.data(t, "velocity", {
                            isSVG: g.isSVG(t),
                            isAnimating: !1,
                            computedStyle: null,
                            tweensContainer: null,
                            rootPropertyValueCache: {},
                            transformCache: {}
                        })
                    },
                    hook: null,
                    mock: !1,
                    version: {major: 1, minor: 3, patch: 1},
                    debug: !1
                };
                e.pageYOffset !== i ? (y.State.scrollAnchor = e, y.State.scrollPropertyLeft = "pageXOffset", y.State.scrollPropertyTop = "pageYOffset") : (y.State.scrollAnchor = n.documentElement || n.body.parentNode || n.body, y.State.scrollPropertyLeft = "scrollLeft", y.State.scrollPropertyTop = "scrollTop");
                var b = function () {
                    function t(t) {
                        return -t.tension * t.x - t.friction * t.v
                    }

                    function e(e, n, i) {
                        var r = {x: e.x + i.dx * n, v: e.v + i.dv * n, tension: e.tension, friction: e.friction};
                        return {dx: r.v, dv: t(r)}
                    }

                    function n(n, i) {
                        var r = {dx: n.v, dv: t(n)}, s = e(n, .5 * i, r), a = e(n, .5 * i, s), o = e(n, i, a),
                            u = 1 / 6 * (r.dx + 2 * (s.dx + a.dx) + o.dx),
                            l = 1 / 6 * (r.dv + 2 * (s.dv + a.dv) + o.dv);
                        return n.x = n.x + u * i, n.v = n.v + l * i, n
                    }

                    return function t(e, i, r) {
                        var s, a, o, u = {x: -1, v: 0, tension: null, friction: null}, l = [0], c = 0, h = 1e-4,
                            d = .016;
                        for (e = parseFloat(e) || 500, i = parseFloat(i) || 20, r = r || null, u.tension = e, u.friction = i, s = null !== r, s ? (c = t(e, i), a = c / r * d) : a = d; ;) if (o = n(o || u, a), l.push(1 + o.x), c += 16, !(Math.abs(o.x) > h && Math.abs(o.v) > h)) break;
                        return s ? function (t) {
                            return l[t * (l.length - 1) | 0]
                        } : c
                    }
                }();
                y.Easings = {
                    linear: function (t) {
                        return t
                    }, swing: function (t) {
                        return .5 - Math.cos(t * Math.PI) / 2
                    }, spring: function (t) {
                        return 1 - Math.cos(4.5 * t * Math.PI) * Math.exp(6 * -t)
                    }
                }, d.each([["ease", [.25, .1, .25, 1]], ["ease-in", [.42, 0, 1, 1]], ["ease-out", [0, 0, .58, 1]], ["ease-in-out", [.42, 0, .58, 1]], ["easeInSine", [.47, 0, .745, .715]], ["easeOutSine", [.39, .575, .565, 1]], ["easeInOutSine", [.445, .05, .55, .95]], ["easeInQuad", [.55, .085, .68, .53]], ["easeOutQuad", [.25, .46, .45, .94]], ["easeInOutQuad", [.455, .03, .515, .955]], ["easeInCubic", [.55, .055, .675, .19]], ["easeOutCubic", [.215, .61, .355, 1]], ["easeInOutCubic", [.645, .045, .355, 1]], ["easeInQuart", [.895, .03, .685, .22]], ["easeOutQuart", [.165, .84, .44, 1]], ["easeInOutQuart", [.77, 0, .175, 1]], ["easeInQuint", [.755, .05, .855, .06]], ["easeOutQuint", [.23, 1, .32, 1]], ["easeInOutQuint", [.86, 0, .07, 1]], ["easeInExpo", [.95, .05, .795, .035]], ["easeOutExpo", [.19, 1, .22, 1]], ["easeInOutExpo", [1, 0, 0, 1]], ["easeInCirc", [.6, .04, .98, .335]], ["easeOutCirc", [.075, .82, .165, 1]], ["easeInOutCirc", [.785, .135, .15, .86]]], function (t, e) {
                    y.Easings[e[0]] = u.apply(null, e[1])
                });
                var w = y.CSS = {
                    RegEx: {
                        isHex: /^#([A-f\d]{3}){1,2}$/i,
                        valueUnwrap: /^[A-z]+\((.*)\)$/i,
                        wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
                        valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
                    },
                    Lists: {
                        colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
                        transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
                        transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
                    },
                    Hooks: {
                        templates: {
                            textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
                            boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
                            clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
                            backgroundPosition: ["X Y", "0% 0%"],
                            transformOrigin: ["X Y Z", "50% 50% 0px"],
                            perspectiveOrigin: ["X Y", "50% 50%"]
                        }, registered: {}, register: function () {
                            for (var t = 0; t < w.Lists.colors.length; t++) {
                                var e = "color" === w.Lists.colors[t] ? "0 0 0 1" : "255 255 255 1";
                                w.Hooks.templates[w.Lists.colors[t]] = ["Red Green Blue Alpha", e]
                            }
                            var n, i, r;
                            if (f) for (n in w.Hooks.templates) if (w.Hooks.templates.hasOwnProperty(n)) {
                                i = w.Hooks.templates[n], r = i[0].split(" ");
                                var s = i[1].match(w.RegEx.valueSplit);
                                "Color" === r[0] && (r.push(r.shift()), s.push(s.shift()), w.Hooks.templates[n] = [r.join(" "), s.join(" ")])
                            }
                            for (n in w.Hooks.templates) if (w.Hooks.templates.hasOwnProperty(n)) {
                                i = w.Hooks.templates[n], r = i[0].split(" ");
                                for (var a in r) if (r.hasOwnProperty(a)) {
                                    var o = n + r[a], u = a;
                                    w.Hooks.registered[o] = [n, u]
                                }
                            }
                        }, getRoot: function (t) {
                            var e = w.Hooks.registered[t];
                            return e ? e[0] : t
                        }, cleanRootPropertyValue: function (t, e) {
                            return w.RegEx.valueUnwrap.test(e) && (e = e.match(w.RegEx.valueUnwrap)[1]), w.Values.isCSSNullValue(e) && (e = w.Hooks.templates[t][1]), e
                        }, extractValue: function (t, e) {
                            var n = w.Hooks.registered[t];
                            if (n) {
                                var i = n[0], r = n[1];
                                return e = w.Hooks.cleanRootPropertyValue(i, e), e.toString().match(w.RegEx.valueSplit)[r]
                            }
                            return e
                        }, injectValue: function (t, e, n) {
                            var i = w.Hooks.registered[t];
                            if (i) {
                                var r, s, a = i[0], o = i[1];
                                return n = w.Hooks.cleanRootPropertyValue(a, n), r = n.toString().match(w.RegEx.valueSplit), r[o] = e, s = r.join(" ")
                            }
                            return n
                        }
                    },
                    Normalizations: {
                        registered: {
                            clip: function (t, e, n) {
                                switch (t) {
                                    case"name":
                                        return "clip";
                                    case"extract":
                                        var i;
                                        return w.RegEx.wrappedValueAlreadyExtracted.test(n) ? i = n : (i = n.toString().match(w.RegEx.valueUnwrap), i = i ? i[1].replace(/,(\s+)?/g, " ") : n), i;
                                    case"inject":
                                        return "rect(" + n + ")"
                                }
                            }, blur: function (t, e, n) {
                                switch (t) {
                                    case"name":
                                        return y.State.isFirefox ? "filter" : "-webkit-filter";
                                    case"extract":
                                        var i = parseFloat(n);
                                        if (!i && 0 !== i) {
                                            var r = n.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                                            i = r ? r[1] : 0
                                        }
                                        return i;
                                    case"inject":
                                        return parseFloat(n) ? "blur(" + n + ")" : "none"
                                }
                            }, opacity: function (t, e, n) {
                                if (f <= 8) switch (t) {
                                    case"name":
                                        return "filter";
                                    case"extract":
                                        var i = n.toString().match(/alpha\(opacity=(.*)\)/i);
                                        return n = i ? i[1] / 100 : 1;
                                    case"inject":
                                        return e.style.zoom = 1, parseFloat(n) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(n), 10) + ")"
                                } else switch (t) {
                                    case"name":
                                        return "opacity";
                                    case"extract":
                                        return n;
                                    case"inject":
                                        return n
                                }
                            }
                        }, register: function () {
                            f && !(f > 9) || y.State.isGingerbread || (w.Lists.transformsBase = w.Lists.transformsBase.concat(w.Lists.transforms3D));
                            for (var t = 0; t < w.Lists.transformsBase.length; t++) !function () {
                                var e = w.Lists.transformsBase[t];
                                w.Normalizations.registered[e] = function (t, n, r) {
                                    switch (t) {
                                        case"name":
                                            return "transform";
                                        case"extract":
                                            return a(n) === i || a(n).transformCache[e] === i ? /^scale/i.test(e) ? 1 : 0 : a(n).transformCache[e].replace(/[()]/g, "");
                                        case"inject":
                                            var s = !1;
                                            switch (e.substr(0, e.length - 1)) {
                                                case"translate":
                                                    s = !/(%|px|em|rem|vw|vh|\d)$/i.test(r);
                                                    break;
                                                case"scal":
                                                case"scale":
                                                    y.State.isAndroid && a(n).transformCache[e] === i && r < 1 && (r = 1), s = !/(\d)$/i.test(r);
                                                    break;
                                                case"skew":
                                                    s = !/(deg|\d)$/i.test(r);
                                                    break;
                                                case"rotate":
                                                    s = !/(deg|\d)$/i.test(r)
                                            }
                                            return s || (a(n).transformCache[e] = "(" + r + ")"), a(n).transformCache[e]
                                    }
                                }
                            }();
                            for (var e = 0; e < w.Lists.colors.length; e++) !function () {
                                var t = w.Lists.colors[e];
                                w.Normalizations.registered[t] = function (e, n, r) {
                                    switch (e) {
                                        case"name":
                                            return t;
                                        case"extract":
                                            var s;
                                            if (w.RegEx.wrappedValueAlreadyExtracted.test(r)) s = r; else {
                                                var a, o = {
                                                    black: "rgb(0, 0, 0)",
                                                    blue: "rgb(0, 0, 255)",
                                                    gray: "rgb(128, 128, 128)",
                                                    green: "rgb(0, 128, 0)",
                                                    red: "rgb(255, 0, 0)",
                                                    white: "rgb(255, 255, 255)"
                                                };
                                                /^[A-z]+$/i.test(r) ? a = o[r] !== i ? o[r] : o.black : w.RegEx.isHex.test(r) ? a = "rgb(" + w.Values.hexToRgb(r).join(" ") + ")" : /^rgba?\(/i.test(r) || (a = o.black), s = (a || r).toString().match(w.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                                            }
                                            return (!f || f > 8) && 3 === s.split(" ").length && (s += " 1"), s;
                                        case"inject":
                                            return f <= 8 ? 4 === r.split(" ").length && (r = r.split(/\s+/).slice(0, 3).join(" ")) : 3 === r.split(" ").length && (r += " 1"), (f <= 8 ? "rgb" : "rgba") + "(" + r.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
                                    }
                                }
                            }()
                        }
                    },
                    Names: {
                        camelCase: function (t) {
                            return t.replace(/-(\w)/g, function (t, e) {
                                return e.toUpperCase()
                            })
                        }, SVGAttribute: function (t) {
                            var e = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                            return (f || y.State.isAndroid && !y.State.isChrome) && (e += "|transform"), new RegExp("^(" + e + ")$", "i").test(t)
                        }, prefixCheck: function (t) {
                            if (y.State.prefixMatches[t]) return [y.State.prefixMatches[t], !0];
                            for (var e = ["", "Webkit", "Moz", "ms", "O"], n = 0, i = e.length; n < i; n++) {
                                var r;
                                if (r = 0 === n ? t : e[n] + t.replace(/^\w/, function (t) {
                                        return t.toUpperCase()
                                    }), g.isString(y.State.prefixElement.style[r])) return y.State.prefixMatches[t] = r, [r, !0]
                            }
                            return [t, !1]
                        }
                    },
                    Values: {
                        hexToRgb: function (t) {
                            var e, n = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                                i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
                            return t = t.replace(n, function (t, e, n, i) {
                                return e + e + n + n + i + i
                            }), e = i.exec(t), e ? [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)] : [0, 0, 0]
                        }, isCSSNullValue: function (t) {
                            return !t || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(t)
                        }, getUnitType: function (t) {
                            return /^(rotate|skew)/i.test(t) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(t) ? "" : "px"
                        }, getDisplayType: function (t) {
                            var e = t && t.tagName.toString().toLowerCase();
                            return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(e) ? "inline" : /^(li)$/i.test(e) ? "list-item" : /^(tr)$/i.test(e) ? "table-row" : /^(table)$/i.test(e) ? "table" : /^(tbody)$/i.test(e) ? "table-row-group" : "block"
                        }, addClass: function (t, e) {
                            t.classList ? t.classList.add(e) : t.className += (t.className.length ? " " : "") + e
                        }, removeClass: function (t, e) {
                            t.classList ? t.classList.remove(e) : t.className = t.className.toString().replace(new RegExp("(^|\\s)" + e.split(" ").join("|") + "(\\s|$)", "gi"), " ")
                        }
                    },
                    getPropertyValue: function (t, n, r, s) {
                        function o(t, n) {
                            var r = 0;
                            if (f <= 8) r = d.css(t, n); else {
                                var u = !1;
                                /^(width|height)$/.test(n) && 0 === w.getPropertyValue(t, "display") && (u = !0, w.setPropertyValue(t, "display", w.Values.getDisplayType(t)));
                                var l = function () {
                                    u && w.setPropertyValue(t, "display", "none")
                                };
                                if (!s) {
                                    if ("height" === n && "border-box" !== w.getPropertyValue(t, "boxSizing").toString().toLowerCase()) {
                                        var c = t.offsetHeight - (parseFloat(w.getPropertyValue(t, "borderTopWidth")) || 0) - (parseFloat(w.getPropertyValue(t, "borderBottomWidth")) || 0) - (parseFloat(w.getPropertyValue(t, "paddingTop")) || 0) - (parseFloat(w.getPropertyValue(t, "paddingBottom")) || 0);
                                        return l(), c
                                    }
                                    if ("width" === n && "border-box" !== w.getPropertyValue(t, "boxSizing").toString().toLowerCase()) {
                                        var h = t.offsetWidth - (parseFloat(w.getPropertyValue(t, "borderLeftWidth")) || 0) - (parseFloat(w.getPropertyValue(t, "borderRightWidth")) || 0) - (parseFloat(w.getPropertyValue(t, "paddingLeft")) || 0) - (parseFloat(w.getPropertyValue(t, "paddingRight")) || 0);
                                        return l(), h
                                    }
                                }
                                var p;
                                p = a(t) === i ? e.getComputedStyle(t, null) : a(t).computedStyle ? a(t).computedStyle : a(t).computedStyle = e.getComputedStyle(t, null), "borderColor" === n && (n = "borderTopColor"), r = 9 === f && "filter" === n ? p.getPropertyValue(n) : p[n], "" !== r && null !== r || (r = t.style[n]), l()
                            }
                            if ("auto" === r && /^(top|right|bottom|left)$/i.test(n)) {
                                var g = o(t, "position");
                                ("fixed" === g || "absolute" === g && /top|left/i.test(n)) && (r = d(t).position()[n] + "px")
                            }
                            return r
                        }

                        var u;
                        if (w.Hooks.registered[n]) {
                            var l = n, c = w.Hooks.getRoot(l);
                            r === i && (r = w.getPropertyValue(t, w.Names.prefixCheck(c)[0])), w.Normalizations.registered[c] && (r = w.Normalizations.registered[c]("extract", t, r)), u = w.Hooks.extractValue(l, r)
                        } else if (w.Normalizations.registered[n]) {
                            var h, p;
                            h = w.Normalizations.registered[n]("name", t), "transform" !== h && (p = o(t, w.Names.prefixCheck(h)[0]), w.Values.isCSSNullValue(p) && w.Hooks.templates[n] && (p = w.Hooks.templates[n][1])), u = w.Normalizations.registered[n]("extract", t, p)
                        }
                        if (!/^[\d-]/.test(u)) {
                            var g = a(t);
                            if (g && g.isSVG && w.Names.SVGAttribute(n)) if (/^(height|width)$/i.test(n)) try {
                                u = t.getBBox()[n]
                            } catch (t) {
                                u = 0
                            } else u = t.getAttribute(n); else u = o(t, w.Names.prefixCheck(n)[0])
                        }
                        return w.Values.isCSSNullValue(u) && (u = 0), y.debug >= 2 && console.log("Get " + n + ": " + u), u
                    },
                    setPropertyValue: function (t, n, i, r, s) {
                        var o = n;
                        if ("scroll" === n) s.container ? s.container["scroll" + s.direction] = i : "Left" === s.direction ? e.scrollTo(i, s.alternateValue) : e.scrollTo(s.alternateValue, i); else if (w.Normalizations.registered[n] && "transform" === w.Normalizations.registered[n]("name", t)) w.Normalizations.registered[n]("inject", t, i), o = "transform", i = a(t).transformCache[n]; else {
                            if (w.Hooks.registered[n]) {
                                var u = n, l = w.Hooks.getRoot(n);
                                r = r || w.getPropertyValue(t, l), i = w.Hooks.injectValue(u, i, r), n = l
                            }
                            if (w.Normalizations.registered[n] && (i = w.Normalizations.registered[n]("inject", t, i), n = w.Normalizations.registered[n]("name", t)), o = w.Names.prefixCheck(n)[0], f <= 8) try {
                                t.style[o] = i
                            } catch (t) {
                                y.debug && console.log("Browser does not support [" + i + "] for [" + o + "]")
                            } else {
                                var c = a(t);
                                c && c.isSVG && w.Names.SVGAttribute(n) ? t.setAttribute(n, i) : t.style[o] = i
                            }
                            y.debug >= 2 && console.log("Set " + n + " (" + o + "): " + i)
                        }
                        return [o, i]
                    },
                    flushTransformCache: function (t) {
                        var e = "", n = a(t);
                        if ((f || y.State.isAndroid && !y.State.isChrome) && n && n.isSVG) {
                            var i = function (e) {
                                return parseFloat(w.getPropertyValue(t, e))
                            }, r = {
                                translate: [i("translateX"), i("translateY")],
                                skewX: [i("skewX")],
                                skewY: [i("skewY")],
                                scale: 1 !== i("scale") ? [i("scale"), i("scale")] : [i("scaleX"), i("scaleY")],
                                rotate: [i("rotateZ"), 0, 0]
                            };
                            d.each(a(t).transformCache, function (t) {
                                /^translate/i.test(t) ? t = "translate" : /^scale/i.test(t) ? t = "scale" : /^rotate/i.test(t) && (t = "rotate"), r[t] && (e += t + "(" + r[t].join(" ") + ") ", delete r[t])
                            })
                        } else {
                            var s, o;
                            d.each(a(t).transformCache, function (n) {
                                return s = a(t).transformCache[n], "transformPerspective" === n ? (o = s, !0) : (9 === f && "rotateZ" === n && (n = "rotate"), void(e += n + s + " "))
                            }), o && (e = "perspective" + o + " " + e)
                        }
                        w.setPropertyValue(t, "transform", e)
                    }
                };
                w.Hooks.register(), w.Normalizations.register(), y.hook = function (t, e, n) {
                    var r;
                    return t = s(t), d.each(t, function (t, s) {
                        if (a(s) === i && y.init(s), n === i) r === i && (r = y.CSS.getPropertyValue(s, e)); else {
                            var o = y.CSS.setPropertyValue(s, e, n);
                            "transform" === o[0] && y.CSS.flushTransformCache(s), r = o
                        }
                    }), r
                };
                var x = function () {
                    function t() {
                        return u ? C.promise || null : f
                    }

                    function r(t, r) {
                        function s(s) {
                            var f, p;
                            if (u.begin && 0 === S) try {
                                u.begin.call(v, v)
                            } catch (t) {
                                setTimeout(function () {
                                    throw t
                                }, 1)
                            }
                            if ("scroll" === A) {
                                var m, x, T, L = /^x$/i.test(u.axis) ? "Left" : "Top", P = parseFloat(u.offset) || 0;
                                u.container ? g.isWrapped(u.container) || g.isNode(u.container) ? (u.container = u.container[0] || u.container, m = u.container["scroll" + L], T = m + d(t).position()[L.toLowerCase()] + P) : u.container = null : (m = y.State.scrollAnchor[y.State["scrollProperty" + L]], x = y.State.scrollAnchor[y.State["scrollProperty" + ("Left" === L ? "Top" : "Left")]], T = d(t).offset()[L.toLowerCase()] + P), h = {
                                    scroll: {
                                        rootPropertyValue: !1,
                                        startValue: m,
                                        currentValue: m,
                                        endValue: T,
                                        unitType: "",
                                        easing: u.easing,
                                        scrollData: {container: u.container, direction: L, alternateValue: x}
                                    }, element: t
                                }, y.debug && console.log("tweensContainer (scroll): ", h.scroll, t)
                            } else if ("reverse" === A) {
                                if (f = a(t), !f) return;
                                if (!f.tweensContainer) return void d.dequeue(t, u.queue);
                                "none" === f.opts.display && (f.opts.display = "auto"), "hidden" === f.opts.visibility && (f.opts.visibility = "visible"), f.opts.loop = !1, f.opts.begin = null, f.opts.complete = null, b.easing || delete u.easing, b.duration || delete u.duration, u = d.extend({}, f.opts, u), p = d.extend(!0, {}, f ? f.tweensContainer : null);
                                for (var k in p) if (p.hasOwnProperty(k) && "element" !== k) {
                                    var O = p[k].startValue;
                                    p[k].startValue = p[k].currentValue = p[k].endValue, p[k].endValue = O, g.isEmptyObject(b) || (p[k].easing = u.easing), y.debug && console.log("reverse tweensContainer (" + k + "): " + JSON.stringify(p[k]), t)
                                }
                                h = p
                            } else if ("start" === A) {
                                f = a(t), f && f.tweensContainer && f.isAnimating === !0 && (p = f.tweensContainer);
                                var R = function (e, n) {
                                    var s, a, o;
                                    return g.isArray(e) ? (s = e[0], !g.isArray(e[1]) && /^[\d-]/.test(e[1]) || g.isFunction(e[1]) || w.RegEx.isHex.test(e[1]) ? o = e[1] : (g.isString(e[1]) && !w.RegEx.isHex.test(e[1]) || g.isArray(e[1])) && (a = n ? e[1] : l(e[1], u.duration), e[2] !== i && (o = e[2]))) : s = e, n || (a = a || u.easing), g.isFunction(s) && (s = s.call(t, r, E)), g.isFunction(o) && (o = o.call(t, r, E)), [s || 0, a, o]
                                };
                                d.each(_, function (t, e) {
                                    if (RegExp("^" + w.Lists.colors.join("$|^") + "$").test(w.Names.camelCase(t))) {
                                        var n = R(e, !0), r = n[0], s = n[1], a = n[2];
                                        if (w.RegEx.isHex.test(r)) {
                                            for (var o = ["Red", "Green", "Blue"], u = w.Values.hexToRgb(r), l = a ? w.Values.hexToRgb(a) : i, c = 0; c < o.length; c++) {
                                                var h = [u[c]];
                                                s && h.push(s), l !== i && h.push(l[c]), _[w.Names.camelCase(t) + o[c]] = h
                                            }
                                            delete _[t]
                                        }
                                    }
                                });
                                for (var I in _) if (_.hasOwnProperty(I)) {
                                    var D = R(_[I]), N = D[0], F = D[1], q = D[2];
                                    I = w.Names.camelCase(I);
                                    var H = w.Hooks.getRoot(I), B = !1;
                                    if (f && f.isSVG || "tween" === H || w.Names.prefixCheck(H)[1] !== !1 || w.Normalizations.registered[H] !== i) {
                                        (u.display !== i && null !== u.display && "none" !== u.display || u.visibility !== i && "hidden" !== u.visibility) && /opacity|filter/.test(I) && !q && 0 !== N && (q = 0), u._cacheValues && p && p[I] ? (q === i && (q = p[I].endValue + p[I].unitType), B = f.rootPropertyValueCache[H]) : w.Hooks.registered[I] ? q === i ? (B = w.getPropertyValue(t, H), q = w.getPropertyValue(t, I, B)) : B = w.Hooks.templates[H][1] : q === i && (q = w.getPropertyValue(t, I));
                                        var V, X, U, G = !1, Y = function (t, e) {
                                            var n, i;
                                            return i = (e || "0").toString().toLowerCase().replace(/[%A-z]+$/, function (t) {
                                                return n = t, ""
                                            }), n || (n = w.Values.getUnitType(t)), [i, n]
                                        };
                                        V = Y(I, q), q = V[0], U = V[1], V = Y(I, N), N = V[0].replace(/^([+-\/*])=/, function (t, e) {
                                            return G = e, ""
                                        }), X = V[1], q = parseFloat(q) || 0, N = parseFloat(N) || 0, "%" === X && (/^(fontSize|lineHeight)$/.test(I) ? (N /= 100, X = "em") : /^scale/.test(I) ? (N /= 100, X = "") : /(Red|Green|Blue)$/i.test(I) && (N = N / 100 * 255, X = ""));
                                        var $ = function () {
                                            var i = {
                                                    myParent: t.parentNode || n.body,
                                                    position: w.getPropertyValue(t, "position"),
                                                    fontSize: w.getPropertyValue(t, "fontSize")
                                                }, r = i.position === M.lastPosition && i.myParent === M.lastParent,
                                                s = i.fontSize === M.lastFontSize;
                                            M.lastParent = i.myParent, M.lastPosition = i.position, M.lastFontSize = i.fontSize;
                                            var a = 100, o = {};
                                            if (s && r) o.emToPx = M.lastEmToPx, o.percentToPxWidth = M.lastPercentToPxWidth, o.percentToPxHeight = M.lastPercentToPxHeight; else {
                                                var u = f && f.isSVG ? n.createElementNS("http://www.w3.org/2000/svg", "rect") : n.createElement("div");
                                                y.init(u), i.myParent.appendChild(u), d.each(["overflow", "overflowX", "overflowY"], function (t, e) {
                                                    y.CSS.setPropertyValue(u, e, "hidden")
                                                }), y.CSS.setPropertyValue(u, "position", i.position), y.CSS.setPropertyValue(u, "fontSize", i.fontSize), y.CSS.setPropertyValue(u, "boxSizing", "content-box"), d.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function (t, e) {
                                                    y.CSS.setPropertyValue(u, e, a + "%")
                                                }), y.CSS.setPropertyValue(u, "paddingLeft", a + "em"), o.percentToPxWidth = M.lastPercentToPxWidth = (parseFloat(w.getPropertyValue(u, "width", null, !0)) || 1) / a, o.percentToPxHeight = M.lastPercentToPxHeight = (parseFloat(w.getPropertyValue(u, "height", null, !0)) || 1) / a, o.emToPx = M.lastEmToPx = (parseFloat(w.getPropertyValue(u, "paddingLeft")) || 1) / a, i.myParent.removeChild(u)
                                            }
                                            return null === M.remToPx && (M.remToPx = parseFloat(w.getPropertyValue(n.body, "fontSize")) || 16), null === M.vwToPx && (M.vwToPx = parseFloat(e.innerWidth) / 100, M.vhToPx = parseFloat(e.innerHeight) / 100), o.remToPx = M.remToPx, o.vwToPx = M.vwToPx, o.vhToPx = M.vhToPx, y.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(o), t), o
                                        };
                                        if (/[\/*]/.test(G)) X = U; else if (U !== X && 0 !== q) if (0 === N) X = U; else {
                                            o = o || $();
                                            var W = /margin|padding|left|right|width|text|word|letter/i.test(I) || /X$/.test(I) || "x" === I ? "x" : "y";
                                            switch (U) {
                                                case"%":
                                                    q *= "x" === W ? o.percentToPxWidth : o.percentToPxHeight;
                                                    break;
                                                case"px":
                                                    break;
                                                default:
                                                    q *= o[U + "ToPx"]
                                            }
                                            switch (X) {
                                                case"%":
                                                    q *= 1 / ("x" === W ? o.percentToPxWidth : o.percentToPxHeight);
                                                    break;
                                                case"px":
                                                    break;
                                                default:
                                                    q *= 1 / o[X + "ToPx"]
                                            }
                                        }
                                        switch (G) {
                                            case"+":
                                                N = q + N;
                                                break;
                                            case"-":
                                                N = q - N;
                                                break;
                                            case"*":
                                                N = q * N;
                                                break;
                                            case"/":
                                                N = q / N
                                        }
                                        h[I] = {
                                            rootPropertyValue: B,
                                            startValue: q,
                                            currentValue: q,
                                            endValue: N,
                                            unitType: X,
                                            easing: F
                                        }, y.debug && console.log("tweensContainer (" + I + "): " + JSON.stringify(h[I]), t)
                                    } else y.debug && console.log("Skipping [" + H + "] due to a lack of browser support.")
                                }
                                h.element = t
                            }
                            h.element && (w.Values.addClass(t, "velocity-animating"), j.push(h), f = a(t), f && ("" === u.queue && (f.tweensContainer = h, f.opts = u), f.isAnimating = !0), S === E - 1 ? (y.State.calls.push([j, v, u, null, C.resolver]), y.State.isTicking === !1 && (y.State.isTicking = !0, c())) : S++)
                        }

                        var o, u = d.extend({}, y.defaults, b), h = {};
                        switch (a(t) === i && y.init(t), parseFloat(u.delay) && u.queue !== !1 && d.queue(t, u.queue, function (e) {
                            y.velocityQueueEntryFlag = !0, a(t).delayTimer = {
                                setTimeout: setTimeout(e, parseFloat(u.delay)),
                                next: e
                            }
                        }), u.duration.toString().toLowerCase()) {
                            case"fast":
                                u.duration = 200;
                                break;
                            case"normal":
                                u.duration = m;
                                break;
                            case"slow":
                                u.duration = 600;
                                break;
                            default:
                                u.duration = parseFloat(u.duration) || 1
                        }
                        y.mock !== !1 && (y.mock === !0 ? u.duration = u.delay = 1 : (u.duration *= parseFloat(y.mock) || 1, u.delay *= parseFloat(y.mock) || 1)), u.easing = l(u.easing, u.duration), u.begin && !g.isFunction(u.begin) && (u.begin = null), u.progress && !g.isFunction(u.progress) && (u.progress = null), u.complete && !g.isFunction(u.complete) && (u.complete = null), u.display !== i && null !== u.display && (u.display = u.display.toString().toLowerCase(), "auto" === u.display && (u.display = y.CSS.Values.getDisplayType(t))), u.visibility !== i && null !== u.visibility && (u.visibility = u.visibility.toString().toLowerCase()), u.mobileHA = u.mobileHA && y.State.isMobile && !y.State.isGingerbread, u.queue === !1 ? u.delay ? setTimeout(s, u.delay) : s() : d.queue(t, u.queue, function (t, e) {
                            return e === !0 ? (C.promise && C.resolver(v), !0) : (y.velocityQueueEntryFlag = !0, void s(t))
                        }), "" !== u.queue && "fx" !== u.queue || "inprogress" === d.queue(t)[0] || d.dequeue(t)
                    }

                    var o, u, f, p, v, _, b,
                        T = arguments[0] && (arguments[0].p || d.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || g.isString(arguments[0].properties));
                    if (g.isWrapped(this) ? (u = !1, p = 0, v = this, f = this) : (u = !0, p = 1, v = T ? arguments[0].elements || arguments[0].e : arguments[0]), v = s(v)) {
                        T ? (_ = arguments[0].properties || arguments[0].p, b = arguments[0].options || arguments[0].o) : (_ = arguments[p], b = arguments[p + 1]);
                        var E = v.length, S = 0;
                        if (!/^(stop|finish|finishAll)$/i.test(_) && !d.isPlainObject(b)) {
                            var L = p + 1;
                            b = {};
                            for (var P = L; P < arguments.length; P++) g.isArray(arguments[P]) || !/^(fast|normal|slow)$/i.test(arguments[P]) && !/^\d/.test(arguments[P]) ? g.isString(arguments[P]) || g.isArray(arguments[P]) ? b.easing = arguments[P] : g.isFunction(arguments[P]) && (b.complete = arguments[P]) : b.duration = arguments[P]
                        }
                        var C = {promise: null, resolver: null, rejecter: null};
                        u && y.Promise && (C.promise = new y.Promise(function (t, e) {
                            C.resolver = t, C.rejecter = e
                        }));
                        var A;
                        switch (_) {
                            case"scroll":
                                A = "scroll";
                                break;
                            case"reverse":
                                A = "reverse";
                                break;
                            case"finish":
                            case"finishAll":
                            case"stop":
                                d.each(v, function (t, e) {
                                    a(e) && a(e).delayTimer && (clearTimeout(a(e).delayTimer.setTimeout), a(e).delayTimer.next && a(e).delayTimer.next(), delete a(e).delayTimer), "finishAll" !== _ || b !== !0 && !g.isString(b) || (d.each(d.queue(e, g.isString(b) ? b : ""), function (t, e) {
                                        g.isFunction(e) && e()
                                    }), d.queue(e, g.isString(b) ? b : "", []))
                                });
                                var k = [];
                                return d.each(y.State.calls, function (t, e) {
                                    e && d.each(e[1], function (n, r) {
                                        var s = b === i ? "" : b;
                                        return s !== !0 && e[2].queue !== s && (b !== i || e[2].queue !== !1) || void d.each(v, function (n, i) {
                                            if (i === r) if ((b === !0 || g.isString(b)) && (d.each(d.queue(i, g.isString(b) ? b : ""), function (t, e) {
                                                    g.isFunction(e) && e(null, !0)
                                                }), d.queue(i, g.isString(b) ? b : "", [])), "stop" === _) {
                                                var o = a(i);
                                                o && o.tweensContainer && s !== !1 && d.each(o.tweensContainer, function (t, e) {
                                                    e.endValue = e.currentValue
                                                }), k.push(t)
                                            } else "finish" !== _ && "finishAll" !== _ || (e[2].duration = 1)
                                        })
                                    })
                                }), "stop" === _ && (d.each(k, function (t, e) {
                                    h(e, !0)
                                }), C.promise && C.resolver(v)), t();
                            default:
                                if (!d.isPlainObject(_) || g.isEmptyObject(_)) {
                                    if (g.isString(_) && y.Redirects[_]) {
                                        o = d.extend({}, b);
                                        var O = o.duration, R = o.delay || 0;
                                        return o.backwards === !0 && (v = d.extend(!0, [], v).reverse()), d.each(v, function (t, e) {
                                            parseFloat(o.stagger) ? o.delay = R + parseFloat(o.stagger) * t : g.isFunction(o.stagger) && (o.delay = R + o.stagger.call(e, t, E)), o.drag && (o.duration = parseFloat(O) || (/^(callout|transition)/.test(_) ? 1e3 : m), o.duration = Math.max(o.duration * (o.backwards ? 1 - t / E : (t + 1) / E), .75 * o.duration, 200)), y.Redirects[_].call(e, e, o || {}, t, E, v, C.promise ? C : i)
                                        }), t()
                                    }
                                    var I = "Velocity: First argument (" + _ + ") was not a property map, a known action, or a registered redirect. Aborting.";
                                    return C.promise ? C.rejecter(new Error(I)) : console.log(I), t()
                                }
                                A = "start"
                        }
                        var M = {
                            lastParent: null,
                            lastPosition: null,
                            lastFontSize: null,
                            lastPercentToPxWidth: null,
                            lastPercentToPxHeight: null,
                            lastEmToPx: null,
                            remToPx: null,
                            vwToPx: null,
                            vhToPx: null
                        }, j = [];
                        d.each(v, function (t, e) {
                            g.isNode(e) && r(e, t)
                        }), o = d.extend({}, y.defaults, b), o.loop = parseInt(o.loop, 10);
                        var D = 2 * o.loop - 1;
                        if (o.loop) for (var N = 0; N < D; N++) {
                            var F = {delay: o.delay, progress: o.progress};
                            N === D - 1 && (F.display = o.display, F.visibility = o.visibility, F.complete = o.complete), x(v, "reverse", F)
                        }
                        return t()
                    }
                };
                y = d.extend(x, y), y.animate = x;
                var T = e.requestAnimationFrame || p;
                return y.State.isMobile || n.hidden === i || n.addEventListener("visibilitychange", function () {
                    n.hidden ? (T = function (t) {
                        return setTimeout(function () {
                            t(!0)
                        }, 16)
                    }, c()) : T = e.requestAnimationFrame || p
                }), t.Velocity = y, t !== e && (t.fn.velocity = x, t.fn.velocity.defaults = y.defaults), d.each(["Down", "Up"], function (t, e) {
                    y.Redirects["slide" + e] = function (t, n, r, s, a, o) {
                        var u = d.extend({}, n), l = u.begin, c = u.complete,
                            h = {height: "", marginTop: "", marginBottom: "", paddingTop: "", paddingBottom: ""},
                            f = {};
                        u.display === i && (u.display = "Down" === e ? "inline" === y.CSS.Values.getDisplayType(t) ? "inline-block" : "block" : "none"), u.begin = function () {
                            l && l.call(a, a);
                            for (var n in h) if (h.hasOwnProperty(n)) {
                                f[n] = t.style[n];
                                var i = y.CSS.getPropertyValue(t, n);
                                h[n] = "Down" === e ? [i, 0] : [0, i]
                            }
                            f.overflow = t.style.overflow, t.style.overflow = "hidden"
                        }, u.complete = function () {
                            for (var e in f) f.hasOwnProperty(e) && (t.style[e] = f[e]);
                            c && c.call(a, a), o && o.resolver(a)
                        }, y(t, h, u)
                    }
                }), d.each(["In", "Out"], function (t, e) {
                    y.Redirects["fade" + e] = function (t, n, r, s, a, o) {
                        var u = d.extend({}, n), l = u.complete, c = {opacity: "In" === e ? 1 : 0};
                        r !== s - 1 ? u.complete = u.begin = null : u.complete = function () {
                            l && l.call(a, a), o && o.resolver(a)
                        }, u.display === i && (u.display = "In" === e ? "auto" : "none"), y(this, c, u)
                    }
                }), y
            }(window.jQuery || window.Zepto || window, window, document)
        })
    }, {}],
    5: [function (t, e, n) {
        "use strict";

        function i(t) {
            return t && t.__esModule ? t : {default: t}
        }

        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        };
        t("jquery");
        var s = t("velocity-animate");
        i(s);
        t("./functions/jquery.typewriter");
        var a = t("./functions/pages"), o = t("./functions/update"), u = i(o), l = t("./functions/initialize"),
            c = i(l), h = t("./functions/transition-request"), d = t("./include/service"), f = i(d);
        t("jquery-mousewheel"), $(window).on("load", function () {
            var t = $(".menu-btn");
            t.on("click", function () {
                var t = $(this);
                t.hasClass("is-active") ? (t.removeClass("is-active"), e.close()) : (t.addClass("is-active"), e.open())
            });
            var e = function () {
                var n = $(".navi"), i = n.find("li"), r = n.find("a"), s = $(".wrapper");
                return r.on("click", function (e) {
                    t.trigger("click")
                }), {
                    open: function () {
                        s.css("overflow", "hidden"), i.css({
                            opacity: "",
                            transform: ""
                        }), n.velocity("stop").velocity({opacity: [1, 0], scale: [1, 1.4]}, {
                            duration: 300,
                            display: "flex",
                            complete: function () {
                                s.css("overflow", ""), i.each(function (t) {
                                    $(this).velocity("stop").velocity({
                                        translateY: [0, 150],
                                        opacity: [1, 0]
                                    }, {duration: 500, easing: "easeOutCubic", delay: 50 * t})
                                })
                            }
                        }), e.update((0, a.getPageIndex)())
                    }, close: function () {
                        n.velocity("stop").velocity("fadeOut", {duration: 300})
                    }, update: function (t) {
                        r.removeClass("is-active"), r.filter(":eq(" + t + ")").addClass("is-active")
                    }
                }
            }(), n = function () {
                (0, u.default)(), f.default.updateStage($(".card-list"))
            }, i = function (t) {
                t.preventDefault();
                var e = $(this).attr("href");
                (0, h.request)(e).then(function (t, i, r) {
                    history.pushState({url: e}, null, e), n()
                })
            };
            $(document).on("click", ".link-btn", i), $(".navi").find("a").on("click", i), $(".pagination").find("a").on("click", i), $(document).on("click", ".next-link", i);
            var s = function () {
                var t = (0, a.getPageIndex)();
                return function (e) {
                    return e.state ? void(0, h.request)(e.state.url, t).then(function () {
                        n(), t = (0, a.getPageIndexFromUrl)(history.state.url)
                    }) : void(0, h.request)("/", t).then(function () {
                        n(), t = (0, a.getPageIndexFromUrl)(history.state.url)
                    })
                }
            }();
            window.addEventListener("popstate", s);
            var o = 0, l = function (t, e) {
                    $(".content").velocity("stop").velocity({translateY: [0, -o], opacity: 1}, {
                        duration: t,
                        easing: "easeOutCubic",
                        complete: function () {
                            "function" == typeof e && e()
                        }
                    })
                }, d = "onwheel" in document ? "wheel" : "onmousewheel" in document ? "mousewheel" : "DOMMouseScroll",
                p = 30, g = function () {
                    var t = 200, e = $(window).innerHeight(), i = void 0;
                    return $(window).on("resize", function () {
                        e = $(window).innerHeight()
                    }), function (s) {
                        if (clearTimeout(i), !(e < 520)) if (Math.abs(o) <= p) {
                            var u = s.originalEvent.deltaY || s.originalEvent.wheelDelta;
                            o += u / 20, $(".content").css("transform", "translateY(" + 2 * -o + "px)"), i = setTimeout(function () {
                                l(800), o = 0
                            }, t)
                        } else {
                            var c = function () {
                                var t = o > 0 ? (0, a.getNextUrl)() : (0, a.getPrevUrl)();
                                return t ? ($("body").off(d, g), void l(100, function () {
                                    (0, h.request)(t).then(function () {
                                        history.pushState({url: t}, null, t), o = 0, n(), setTimeout(function () {
                                            $("body").on(d, g)
                                        }, 2e3)
                                    })
                                })) : (l(800), o = 0, {v: void 0})
                            }();
                            if ("object" === ("undefined" == typeof c ? "undefined" : r(c))) return c.v
                        }
                    }
                }();
            $("body").on(d, g), f.default.updateStage($(".card-list")), (0, u.default)(), (0, c.default)()
        }), $(document).ajaxSuccess(function (t, e, n) {
            ga("send", "pageview", n.url)
        })
    }, {
        "./functions/initialize": 7,
        "./functions/jquery.typewriter": 8,
        "./functions/pages": 9,
        "./functions/transition-request": 12,
        "./functions/update": 13,
        "./include/service": 14,
        jquery: 3,
        "jquery-mousewheel": 2,
        "velocity-animate": 4
    }],
    6: [function (t, e, n) {
        "use strict";

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(n, "__esModule", {value: !0});
        var r = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }

            return function (e, n, i) {
                return n && t(e.prototype, n), i && t(e, i), e
            }
        }(), s = function () {
            function t(e) {
                i(this, t), this.settings = e
            }

            return r(t, [{
                key: "transition", value: function (t, e) {
                    this.settings.forEach(function (n) {
                        var i = e ? -n.delta : n.delta, r = {duration: 1600, easing: "easeOutCirc"};
                        n.translateReset && (r.begin = function () {
                            $(this).css("transition", "none")
                        }, r.complete = function () {
                            $(this).css({transform: "", transition: ""})
                        }), t.find(n.selector).velocity("stop").velocity({translateY: [0, i]}, r)
                    })
                }
            }, {
                key: "prev", value: function (t) {
                    this.transition(t, !0)
                }
            }, {
                key: "next", value: function (t) {
                    this.transition(t, !1)
                }
            }]), t
        }();
        n.default = s
    }, {}],
    7: [function (t, e, n) {
        "use strict";

        function i(t) {
            return t && t.__esModule ? t : {default: t}
        }

        function r() {
            (0, u.isPage)("/") ? ($(".on-loading").velocity("fadeOut", {
                duration: 500, complete: function () {
                    $(this).remove()
                }
            }), (0, o.default)()) : (0, s.renderBackground)()
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.default = r;
        var s = t("../functions/render-background"), a = t("../functions/renderTopAnimation"), o = i(a),
            u = t("../functions/pages")
    }, {"../functions/pages": 9, "../functions/render-background": 10, "../functions/renderTopAnimation": 11}],
    8: [function (t, e, n) {
        "use strict";

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        var r = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }

            return function (e, n, i) {
                return n && t(e.prototype, n), i && t(e, i), e
            }
        }();
        !function (t) {
            var e = function () {
                function e(t) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 50;
                    i(this, e);
                    var r = t.text().split(""), s = r.map(function (t) {
                        return '<span style="opacity: 0">' + t + "</span>"
                    });
                    t.html(s), this.$textElements = t.children("span"), this.timeout = n
                }

                return r(e, [{
                    key: "render", value: function () {
                        var e = this;
                        this.$textElements.each(function (n) {
                            var i = this;
                            setTimeout(function () {
                                t(i).css("opacity", 1)
                            }, e.timeout * n)
                        })
                    }
                }]), e
            }();
            t.fn.typewriter = function (n) {
                var i = t.extend({prepare: !1, timeout: 50}, n);
                return "render" === n && this.each(function () {
                    t(this).data("typewriter").render()
                }), this.each(function (n) {
                    t(this).data("typewriter", new e(t(this), i.timeout)), i.prepare || t(this).data("typewriter").render()
                })
            }
        }(jQuery)
    }, {}],
    9: [function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0});
        var i = function (t) {
            var e = t || location.pathname, n = e.split("/").filter(function (t) {
                return "" !== t
            });
            return n[0] || "/"
        }, r = function (t) {
            return t === i()
        }, s = ["/", "message", "service", "socsoc", "information"], a = function (t) {
            return s.indexOf(t || i())
        }, o = function (t) {
            return a(i(t))
        }, u = function () {
            var t = s[a() + 1];
            return t ? "/" === t ? t : "/" + t + "/" : null
        }, l = function () {
            var t = s[a() - 1];
            return t ? "/" === t ? t : "/" + t + "/" : null
        };
        n.getPage = i, n.isPage = r, n.getPageIndex = a, n.getPageIndexFromUrl = o, n.getNextUrl = u, n.getPrevUrl = l, n.pageList = s
    }, {}],
    10: [function (t, e, n) {
        "use strict";

        function i(t) {
            return t && t.__esModule ? t : {default: t}
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function s() {
            function t() {
                h.update()
            }

            function e(t) {
                g.forEach(function (e, n) {
                    setTimeout(function () {
                        e.appear(), n === g.length - 1 && "function" == typeof t && t()
                    }, 200 * n)
                })
            }

            function i() {
                p.getBorders().forEach(function (t) {
                    t.move()
                })
            }

            n.isRendered = l = !0;
            var s = document.getElementById("background"), o = window.innerWidth, c = window.innerHeight;
            s.width = o, s.height = c;
            var h = new u.default.Stage(s);
            h.autoClear = !0, u.default.Ticker.setFPS(30), u.default.Ticker.timingMode = u.default.Ticker.RAF_SYNCHED, u.default.Ticker.addEventListener("tick", t);
            var d = function () {
                function t(e) {
                    r(this, t), this.x = e, this.shape = new u.default.Shape, this.graphics = this.shape.graphics, this.initialize(this.x)
                }

                return a(t, [{
                    key: "initialize", value: function (t) {
                        this.graphics.setStrokeStyle(1), this.graphics.beginStroke("#000"), this.shape.x = this.x, this.shape.y = -c, this.graphics.moveTo(0, 0), this.graphics.lineTo(0, c), h.addChild(this.shape)
                    }
                }, {
                    key: "appear", value: function () {
                        u.default.Tween.get(this.shape).to({y: 0, alpha: .1}, 5e3, u.default.Ease.quintOut)
                    }
                }, {
                    key: "move", value: function () {
                        var t = this, e = Math.random() * o, n = 8e3 * Math.random() + 4e3;
                        u.default.Tween.get(this.shape).to({x: e}, n, u.default.Ease.cubicInOut).call(function () {
                            t.move()
                        })
                    }
                }]), t
            }(), f = function () {
                function t(e) {
                    r(this, t), this.borders = [];
                    for (var n = o / (e + 1), i = 0; i < e; i++) this.borders[i] = new d(i * n + n)
                }

                return a(t, [{
                    key: "getBorders", value: function () {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                        return "number" == typeof t ? this.borders[t] : this.borders
                    }
                }, {
                    key: "getBorderShape", value: function (t) {
                        return this.getBorders(t).shape
                    }
                }]), t
            }(), p = new f(7), g = p.getBorders();
            e(i)
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.isRendered = void 0;
        var a = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }

            return function (e, n, i) {
                return n && t(e.prototype, n), i && t(e, i), e
            }
        }();
        n.renderBackground = s;
        var o = t("createjs-collection"), u = i(o), l = !1;
        n.isRendered = l
    }, {"createjs-collection": 1}],
    11: [function (t, e, n) {
        "use strict";

        function i() {
            function t() {
                i.addClass("is-enter").removeClass("is-ready").on("transitionend", n)
            }

            function e() {
                i.off("transitionend", e), (0, r.renderBackground)(), s.typewriter("render")
            }

            function n() {
                i.off("transitionend", n).css({position: "", zIndex: ""})
            }

            var i = $(".top-heading"), s = $(".top-heading__text");
            s.typewriter({prepare: !0}), i.addClass("is-ready").css({
                position: "relative",
                zIndex: 999
            }).on("transitionend", e), setTimeout(t, 1e3), setTimeout(function () {
                r.isRendered || (0, r.renderBackground)()
            }, 5e3)
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.default = i;
        var r = t("../functions/render-background")
    }, {"../functions/render-background": 10}],
    12: [function (t, e, n) {
        "use strict";

        function i(t) {
            return t && t.__esModule ? t : {default: t}
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.request = n.transition = void 0;
        var r = t("../functions/pages"), s = t("../classes/content-animation"), a = i(s), o = function () {
            var t = !1, e = [];
            e[0] = new a.default([{selector: ".top-heading__text", delta: 600}, {
                selector: ".top-heading__title",
                delta: 450
            }]), e[1] = new a.default([{selector: ".message__content", delta: 450}, {
                selector: ".message__image",
                delta: 200
            }, {selector: ".message__text", delta: 100}]), e[2] = new a.default([{
                selector: ".socsoc__content",
                delta: 600
            }, {selector: ".socsoc__image", delta: 300}]), e[3] = new a.default([{
                selector: ".information__image",
                delta: 200
            }, {selector: ".information__heading", delta: 400}, {
                selector: ".description-list",
                delta: 600
            }]), e[4] = new a.default([{selector: ".card--01", delta: 300, translateReset: !0}, {
                selector: ".card--02",
                delta: 550,
                translateReset: !0
            }, {selector: ".card--03", delta: 820, translateReset: !0}, {
                selector: ".card--04",
                delta: 500,
                translateReset: !0
            }]);
            var n = function (t) {
                e.forEach(function (e) {
                    e.next(t)
                })
            }, i = function (t) {
                e.forEach(function (e) {
                    e.prev(t)
                })
            }, r = function (e, r, s) {
                var a = "-100%", o = 0, u = function () {
                };
                s ? (a = 0, o = "-100%", r.css("transform", "translateY(" + o + ")").before(e.css("transform", "translateY(" + o + ")")), u = i) : (r.after(e), u = n), r.add(e).each(function () {
                    $(this).velocity("stop").velocity({translateY: [a, o]}, {
                        duration: 800,
                        easing: "easeInOutQuart",
                        complete: function () {
                            r.remove(), e.css("transform", ""), t = !1
                        }
                    })
                }), u(e)
            }, s = function (e, n) {
                n.each(function (n) {
                    var i = $(this);
                    0 === n && (i.after(e), e.velocity("stop").velocity({
                        opacity: [1, 0],
                        scale: [1, 1.1]
                    }, {duration: 300})), i.remove(), t = !1
                })
            };
            return function (e, n, i, a) {
                if (t || i === a) s(e, n); else {
                    t = !0;
                    var o = i < a;
                    r(e, n, o)
                }
            }
        }(), u = function (t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            return $.ajax({url: t}).done(function (n) {
                var i = $(n).find(".content"), s = $(".content"), a = (0, r.getPageIndexFromUrl)(t),
                    u = 0 === e ? 0 : e || (0, r.getPageIndex)();
                document.title = $(n).filter("title").text(), o(i, s, a, u)
            })
        };
        n.transition = o, n.request = u
    }, {"../classes/content-animation": 6, "../functions/pages": 9}],
    13: [function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0});
        var i = t("../functions/pages"), r = function () {
            var t = void 0, e = void 0;
            return $(window).on("load", function () {
                t = $(".pagination"), e = t.find("a")
            }), function () {
                e.removeClass("is-active").filter(":eq(" + (0, i.getPageIndex)() + ")").addClass("is-active")
            }
        }(), s = function () {
            var t = void 0, e = void 0;
            return $(window).on("load", function () {
                t = $(".current"), e = $(".current__counter")
            }), function () {
                (0, i.isPage)("message") || (0, i.isPage)("service") || (0, i.isPage)("socsoc") ? t.addClass("is-white") : t.removeClass("is-white"), e.text("0" + (0, i.getPageIndex)())
            }
        }();
        n.default = function () {
            r(), s()
        }
    }, {"../functions/pages": 9}],
    14: [function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.default = function () {
            var t = $(window), e = t.innerWidth() / 2, n = $(".card-list"), i = function (t) {
                var i = (e - t.pageX) / 150, r = -(e - t.pageY) / 75;
                n.css({transform: "rotateY(" + i + "deg) rotateX(" + r + "deg)"})
            };
            return $(document).on("mousemove", i), t.on("resize", function () {
                e = t.innerWidth() / 2
            }), {
                updateStage: function (t) {
                    n = t
                }
            }
        }(), $(window).on("load", function () {
            var t = function (t, e) {
                var n = $(".card-list"), i = $(".link-btn"), r = t.find(".card__text"), s = t.find(".card__close");
                "open" !== e || t.hasClass("is-active") ? "close" === e && t.hasClass("is-active") && (t.removeClass("is-active"), n.removeClass("has-active-item"), i.removeClass("is-hidden"), r.velocity("slideUp", {duration: 500}), s.velocity("fadeOut", {duration: 500})) : (t.addClass("is-active"), n.addClass("has-active-item"), i.addClass("is-hidden"), r.velocity("slideDown", {
                    display: "block",
                    duration: 500
                }), s.velocity("fadeIn", {display: "block", duration: 500}))
            };
            $(document).on("click", ".card", function (e) {
                e.preventDefault(), t($(this), "open")
            }), $(document).on("click", ".card__close", function (e) {
                e.preventDefault(), e.stopPropagation();
                var n = $(this).parents(".card");
                t(n, "close")
            }), $(document).on("keydown", function (t) {
                $(".card-list.has-active-item").length && (27 !== t.keyCode && 8 !== t.keyCode || (t.preventDefault(), $(".card__close").trigger("click")))
            })
        })
    }, {}]
}, {}, [5]);