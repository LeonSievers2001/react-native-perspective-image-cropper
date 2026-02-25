"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomCrop = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_svg_1 = __importStar(require("react-native-svg"));
var AnimatedPolygon = react_native_1.Animated.createAnimatedComponent(react_native_svg_1.Polygon);
var CustomCrop = (0, react_1.forwardRef)(function (props, forwarededRef) {
    var _a, _b, _c, _d, _e, _f;
    var state = {};
    var vars = {};
    _a = (0, react_1.useState)(react_native_1.Dimensions.get('window').width * (props.height / props.width)), state.viewHeight = _a[0], state.setViewHeight = _a[1];
    _b = (0, react_1.useState)(props.height), state.height = _b[0], state.setHeight = _b[1];
    _c = (0, react_1.useState)(props.width), state.width = _c[0], state.setWidth = _c[1];
    _d = (0, react_1.useState)(false), state.moving = _d[0], state.setMoving = _d[1];
    _e = (0, react_1.useState)({
        topLeft: getInitialCoordinateValue({ corner: 'topLeft', props: props, state: state }),
        topRight: getInitialCoordinateValue({ corner: 'topRight', props: props, state: state }),
        bottomRight: getInitialCoordinateValue({ corner: 'bottomRight', props: props, state: state }),
        bottomLeft: getInitialCoordinateValue({ corner: 'bottomLeft', props: props, state: state }),
    }), state.corners = _e[0], state.setCorners = _e[1];
    _f = (0, react_1.useState)(getOverlayPositions({
        topLeft: state.corners.topLeft,
        topRight: state.corners.topRight,
        bottomRight: state.corners.bottomRight,
        bottomLeft: state.corners.bottomLeft,
    })), state.overlayPositions = _f[0], state.setOverlayPositions = _f[1];
    vars.panResponderTopLeft = (0, react_1.useRef)(createPanResponser({ corner: state.corners.topLeft, state: state }));
    vars.panResponderTopRight = (0, react_1.useRef)(createPanResponser({ corner: state.corners.topRight, state: state }));
    vars.panResponderBottomLeft = (0, react_1.useRef)(createPanResponser({ corner: state.corners.bottomLeft, state: state }));
    vars.panResponderBottomRight = (0, react_1.useRef)(createPanResponser({ corner: state.corners.bottomRight, state: state }));
    vars.polygonRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        react_native_1.NativeModules.CustomCropManager.findDocument("file://".concat(props.path), function (error, coordinates) {
            if (error) {
                console.warn(error);
                return;
            }
            if (coordinates) {
                var topLeft = coordinates.topLeft, topRight = coordinates.topRight, bottomLeft = coordinates.bottomLeft, bottomRight = coordinates.bottomRight;
                var adjustment = 20;
                var viewTopLeft = imageCoordinatesToViewCoordinates({ corner: { x: topLeft.x + adjustment, y: topLeft.y + adjustment }, state: state });
                var viewTopRight = imageCoordinatesToViewCoordinates({ corner: { x: topRight.x - adjustment, y: topRight.y + adjustment }, state: state });
                var viewBottomLeft = imageCoordinatesToViewCoordinates({ corner: { x: bottomLeft.x + adjustment, y: bottomLeft.y - adjustment }, state: state });
                var viewBottomRight = imageCoordinatesToViewCoordinates({ corner: { x: bottomRight.x - adjustment, y: bottomRight.y - adjustment }, state: state });
                var animatedTopLeft = new react_native_1.Animated.ValueXY(viewTopLeft);
                var animatedTopRight = new react_native_1.Animated.ValueXY(viewTopRight);
                var animatedBottomLeft = new react_native_1.Animated.ValueXY(viewBottomLeft);
                var animatedBottomRight = new react_native_1.Animated.ValueXY(viewBottomRight);
                state.setCorners({
                    topLeft: animatedTopLeft,
                    topRight: animatedTopRight,
                    bottomRight: animatedBottomRight,
                    bottomLeft: animatedBottomLeft,
                });
                state.setOverlayPositions(getOverlayPositions({
                    topLeft: animatedTopLeft,
                    topRight: animatedTopRight,
                    bottomRight: animatedBottomRight,
                    bottomLeft: animatedBottomLeft,
                }));
            }
        });
    }, []);
    (0, react_1.useEffect)(function () {
        vars.panResponderTopLeft.current = createPanResponser({ corner: state.corners.topLeft, state: state });
        vars.panResponderTopRight.current = createPanResponser({ corner: state.corners.topRight, state: state });
        vars.panResponderBottomLeft.current = createPanResponser({ corner: state.corners.bottomLeft, state: state });
        vars.panResponderBottomRight.current = createPanResponser({ corner: state.corners.bottomRight, state: state });
    }, [state.corners]);
    if (forwarededRef) {
        var refInstance = {
            crop: function () { return crop({ props: props, state: state }); },
        };
        if (typeof forwarededRef === 'function') {
            forwarededRef(refInstance);
        }
        else {
            forwarededRef.current = refInstance;
        }
    }
    (0, react_1.useEffect)(function () {
        var createListener = function (_a) {
            var xIndex = _a.xIndex, yIndex = _a.yIndex;
            return function (_a) {
                var _b, _c;
                var x = _a.x, y = _a.y;
                var points = ((_b = vars.polygonRef.current) === null || _b === void 0 ? void 0 : _b.props).points;
                points[xIndex] = x;
                points[yIndex] = y;
                (_c = vars.polygonRef.current) === null || _c === void 0 ? void 0 : _c.setNativeProps({ points: points });
            };
        };
        var listenerTopLeftId = state.corners.topLeft.addListener(createListener({ xIndex: 0, yIndex: 1 }));
        var listenerTopRightId = state.corners.topRight.addListener(createListener({ xIndex: 2, yIndex: 3 }));
        var listenerBottomRightId = state.corners.bottomRight.addListener(createListener({ xIndex: 4, yIndex: 5 }));
        var listenerBottomLeftId = state.corners.bottomLeft.addListener(createListener({ xIndex: 6, yIndex: 7 }));
        return function () {
            state.corners.topLeft.removeListener(listenerTopLeftId);
            state.corners.topRight.removeListener(listenerTopRightId);
            state.corners.bottomRight.removeListener(listenerBottomRightId);
            state.corners.bottomLeft.removeListener(listenerBottomLeftId);
        };
    }, [state.corners]);
    return (react_1.default.createElement(react_native_1.View, { style: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
        } },
        react_1.default.createElement(react_native_1.View, { style: [
                s(props).cropContainer,
                { height: state.viewHeight },
            ] },
            react_1.default.createElement(react_native_1.Image, { style: [
                    s(props).image,
                    { height: state.viewHeight },
                ], resizeMode: 'contain', source: { uri: "file://".concat(props.path) } }),
            react_1.default.createElement(react_native_svg_1.default, { height: state.viewHeight, width: react_native_1.Dimensions.get('window').width, style: { position: 'absolute', left: 0, top: 0 } },
                react_1.default.createElement(AnimatedPolygon, { fill: props.overlayColor || 'blue', fillOpacity: props.overlayOpacity || 0.5, stroke: props.overlayStrokeColor || 'blue', points: state.overlayPositions, ref: vars.polygonRef, strokeWidth: props.overlayStrokeWidth || 3 })),
            react_1.default.createElement(react_native_1.Animated.View, __assign({}, vars.panResponderTopLeft.current.panHandlers, { style: [
                    state.corners.topLeft.getLayout(),
                    s(props).handler,
                ] }),
                react_1.default.createElement(react_native_1.View, { style: [
                        s(props).handlerI,
                        { left: -10, top: -10 },
                    ] }),
                react_1.default.createElement(react_native_1.View, { style: [
                        s(props).handlerRound,
                        { left: 31, top: 31 },
                    ] })),
            react_1.default.createElement(react_native_1.Animated.View, __assign({}, vars.panResponderTopRight.current.panHandlers, { style: [
                    state.corners.topRight.getLayout(),
                    s(props).handler,
                ] }),
                react_1.default.createElement(react_native_1.View, { style: [
                        s(props).handlerI,
                        { left: 10, top: -10 },
                    ] }),
                react_1.default.createElement(react_native_1.View, { style: [
                        s(props).handlerRound,
                        { right: 31, top: 31 },
                    ] })),
            react_1.default.createElement(react_native_1.Animated.View, __assign({}, vars.panResponderBottomLeft.current.panHandlers, { style: [
                    state.corners.bottomLeft.getLayout(),
                    s(props).handler,
                ] }),
                react_1.default.createElement(react_native_1.View, { style: [
                        s(props).handlerI,
                        { left: -10, top: 10 },
                    ] }),
                react_1.default.createElement(react_native_1.View, { style: [
                        s(props).handlerRound,
                        { left: 31, bottom: 31 },
                    ] })),
            react_1.default.createElement(react_native_1.Animated.View, __assign({}, vars.panResponderBottomRight.current.panHandlers, { style: [
                    state.corners.bottomRight.getLayout(),
                    s(props).handler,
                ] }),
                react_1.default.createElement(react_native_1.View, { style: [
                        s(props).handlerI,
                        { left: 10, top: 10 },
                    ] }),
                react_1.default.createElement(react_native_1.View, { style: [
                        s(props).handlerRound,
                        { right: 31, bottom: 31 },
                    ] })))));
});
exports.CustomCrop = CustomCrop;
var createPanResponser = function (_a) {
    var corner = _a.corner, state = _a.state;
    return react_native_1.PanResponder.create({
        onStartShouldSetPanResponder: function () { return true; },
        onPanResponderMove: react_native_1.Animated.event([null, { dx: corner.x, dy: corner.y }], { useNativeDriver: false }),
        onPanResponderRelease: function () {
            corner.flattenOffset();
            updateOverlayString({ state: state });
        },
        onPanResponderGrant: function () {
            corner.setOffset(getAnimatedXyNumbers(corner));
            corner.setValue({ x: 0, y: 0 });
        },
    });
};
var crop = function (_a) {
    var props = _a.props, state = _a.state;
    var coordinates = {
        topLeft: viewCoordinatesToImageCoordinates({ corner: getAnimatedXyNumbers(state.corners.topLeft), state: state }),
        topRight: viewCoordinatesToImageCoordinates({ corner: getAnimatedXyNumbers(state.corners.topRight), state: state }),
        bottomLeft: viewCoordinatesToImageCoordinates({ corner: getAnimatedXyNumbers(state.corners.bottomLeft), state: state }),
        bottomRight: viewCoordinatesToImageCoordinates({ corner: getAnimatedXyNumbers(state.corners.bottomRight), state: state }),
    };
    react_native_1.NativeModules.CustomCropManager.crop(coordinates, "file://".concat(props.path), function (error, res) {
        if (error) {
            console.warn(error);
            return;
        }
        props.updateImage(res.path, coordinates);
    });
};
var getAnimatedNumber = function (value) {
    return value._value;
};
var getAnimatedXyNumbers = function (value) {
    return { x: getAnimatedNumber(value.x), y: getAnimatedNumber(value.y) };
};
var getInitialCoordinateValue = function (_a) {
    var corner = _a.corner, props = _a.props, state = _a.state;
    var defaultValues = {
        topLeft: { x: 100, y: 100 },
        topRight: { x: react_native_1.Dimensions.get('window').width - 100, y: 100 },
        bottomLeft: { x: 100, y: state.viewHeight - 100 },
        bottomRight: { x: react_native_1.Dimensions.get('window').width - 100, y: state.viewHeight - 100 },
    };
    var value = props.rectangleCoordinates ? imageCoordinatesToViewCoordinates({ corner: props.rectangleCoordinates[corner], state: state }) : defaultValues[corner];
    return new react_native_1.Animated.ValueXY(value);
};
var getOverlayPositions = function (_a) {
    var topLeft = _a.topLeft, topRight = _a.topRight, bottomRight = _a.bottomRight, bottomLeft = _a.bottomLeft;
    return [
        getAnimatedNumber(topLeft.x),
        getAnimatedNumber(topLeft.y),
        getAnimatedNumber(topRight.x),
        getAnimatedNumber(topRight.y),
        getAnimatedNumber(bottomRight.x),
        getAnimatedNumber(bottomRight.y),
        getAnimatedNumber(bottomLeft.x),
        getAnimatedNumber(bottomLeft.y),
    ];
};
var imageCoordinatesToViewCoordinates = function (_a) {
    var corner = _a.corner, state = _a.state;
    return {
        x: (corner.x * react_native_1.Dimensions.get('window').width) / state.width,
        y: (corner.y * state.viewHeight) / state.height,
    };
};
var updateOverlayString = function (_a) {
    var state = _a.state;
    var overlayPositions = getOverlayPositions({
        topLeft: state.corners.topLeft,
        topRight: state.corners.topRight,
        bottomRight: state.corners.bottomRight,
        bottomLeft: state.corners.bottomLeft,
    });
    state.setOverlayPositions(overlayPositions);
};
var viewCoordinatesToImageCoordinates = function (_a) {
    var corner = _a.corner, state = _a.state;
    return {
        x: (corner.x / react_native_1.Dimensions.get('window').width) * state.width,
        y: (corner.y / state.viewHeight) * state.height,
    };
};
var s = function (props) { return ({
    handlerI: {
        borderRadius: 0,
        height: 20,
        width: 20,
        backgroundColor: props.handlerColor || 'blue',
    },
    handlerRound: {
        width: 39,
        position: 'absolute',
        height: 39,
        borderRadius: 100,
        backgroundColor: props.handlerColor || 'blue',
    },
    image: {
        width: react_native_1.Dimensions.get('window').width,
        position: 'absolute',
    },
    bottomButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
        width: 70,
        height: 70,
        borderRadius: 100,
    },
    handler: {
        height: 140,
        width: 140,
        overflow: 'visible',
        marginLeft: -70,
        marginTop: -70,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    cropContainer: {
        position: 'absolute',
        left: 0,
        width: react_native_1.Dimensions.get('window').width,
        top: 0,
    },
}); };
