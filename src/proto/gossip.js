(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.Register = (function() {
    
        /**
         * Properties of a Register.
         * @exports IRegister
         * @interface IRegister
         * @property {string|null} [value] Register value
         * @property {number|null} [ts] Register ts
         */
    
        /**
         * Constructs a new Register.
         * @exports Register
         * @classdesc Represents a Register.
         * @implements IRegister
         * @constructor
         * @param {IRegister=} [properties] Properties to set
         */
        function Register(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Register value.
         * @member {string} value
         * @memberof Register
         * @instance
         */
        Register.prototype.value = "";
    
        /**
         * Register ts.
         * @member {number} ts
         * @memberof Register
         * @instance
         */
        Register.prototype.ts = 0;
    
        /**
         * Creates a new Register instance using the specified properties.
         * @function create
         * @memberof Register
         * @static
         * @param {IRegister=} [properties] Properties to set
         * @returns {Register} Register instance
         */
        Register.create = function create(properties) {
            return new Register(properties);
        };
    
        /**
         * Encodes the specified Register message. Does not implicitly {@link Register.verify|verify} messages.
         * @function encode
         * @memberof Register
         * @static
         * @param {IRegister} message Register message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Register.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.value);
            if (message.ts != null && Object.hasOwnProperty.call(message, "ts"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.ts);
            return writer;
        };
    
        /**
         * Encodes the specified Register message, length delimited. Does not implicitly {@link Register.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Register
         * @static
         * @param {IRegister} message Register message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Register.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Register message from the specified reader or buffer.
         * @function decode
         * @memberof Register
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Register} Register
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Register.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Register();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.value = reader.string();
                        break;
                    }
                case 2: {
                        message.ts = reader.float();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a Register message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Register
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Register} Register
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Register.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Register message.
         * @function verify
         * @memberof Register
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Register.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.value != null && message.hasOwnProperty("value"))
                if (!$util.isString(message.value))
                    return "value: string expected";
            if (message.ts != null && message.hasOwnProperty("ts"))
                if (typeof message.ts !== "number")
                    return "ts: number expected";
            return null;
        };
    
        /**
         * Creates a Register message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Register
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Register} Register
         */
        Register.fromObject = function fromObject(object) {
            if (object instanceof $root.Register)
                return object;
            var message = new $root.Register();
            if (object.value != null)
                message.value = String(object.value);
            if (object.ts != null)
                message.ts = Number(object.ts);
            return message;
        };
    
        /**
         * Creates a plain object from a Register message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Register
         * @static
         * @param {Register} message Register
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Register.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.value = "";
                object.ts = 0;
            }
            if (message.value != null && message.hasOwnProperty("value"))
                object.value = message.value;
            if (message.ts != null && message.hasOwnProperty("ts"))
                object.ts = options.json && !isFinite(message.ts) ? String(message.ts) : message.ts;
            return object;
        };
    
        /**
         * Converts this Register to JSON.
         * @function toJSON
         * @memberof Register
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Register.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        /**
         * Gets the default type url for Register
         * @function getTypeUrl
         * @memberof Register
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Register.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Register";
        };
    
        return Register;
    })();
    
    $root.Registers = (function() {
    
        /**
         * Properties of a Registers.
         * @exports IRegisters
         * @interface IRegisters
         * @property {Object.<string,IRegister>|null} [registers] Registers registers
         */
    
        /**
         * Constructs a new Registers.
         * @exports Registers
         * @classdesc Represents a Registers.
         * @implements IRegisters
         * @constructor
         * @param {IRegisters=} [properties] Properties to set
         */
        function Registers(properties) {
            this.registers = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Registers registers.
         * @member {Object.<string,IRegister>} registers
         * @memberof Registers
         * @instance
         */
        Registers.prototype.registers = $util.emptyObject;
    
        /**
         * Creates a new Registers instance using the specified properties.
         * @function create
         * @memberof Registers
         * @static
         * @param {IRegisters=} [properties] Properties to set
         * @returns {Registers} Registers instance
         */
        Registers.create = function create(properties) {
            return new Registers(properties);
        };
    
        /**
         * Encodes the specified Registers message. Does not implicitly {@link Registers.verify|verify} messages.
         * @function encode
         * @memberof Registers
         * @static
         * @param {IRegisters} message Registers message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Registers.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.registers != null && Object.hasOwnProperty.call(message, "registers"))
                for (var keys = Object.keys(message.registers), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.Register.encode(message.registers[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            return writer;
        };
    
        /**
         * Encodes the specified Registers message, length delimited. Does not implicitly {@link Registers.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Registers
         * @static
         * @param {IRegisters} message Registers message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Registers.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Registers message from the specified reader or buffer.
         * @function decode
         * @memberof Registers
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Registers} Registers
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Registers.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Registers(), key, value;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (message.registers === $util.emptyObject)
                            message.registers = {};
                        var end2 = reader.uint32() + reader.pos;
                        key = "";
                        value = null;
                        while (reader.pos < end2) {
                            var tag2 = reader.uint32();
                            switch (tag2 >>> 3) {
                            case 1:
                                key = reader.string();
                                break;
                            case 2:
                                value = $root.Register.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag2 & 7);
                                break;
                            }
                        }
                        message.registers[key] = value;
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a Registers message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Registers
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Registers} Registers
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Registers.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Registers message.
         * @function verify
         * @memberof Registers
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Registers.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.registers != null && message.hasOwnProperty("registers")) {
                if (!$util.isObject(message.registers))
                    return "registers: object expected";
                var key = Object.keys(message.registers);
                for (var i = 0; i < key.length; ++i) {
                    var error = $root.Register.verify(message.registers[key[i]]);
                    if (error)
                        return "registers." + error;
                }
            }
            return null;
        };
    
        /**
         * Creates a Registers message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Registers
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Registers} Registers
         */
        Registers.fromObject = function fromObject(object) {
            if (object instanceof $root.Registers)
                return object;
            var message = new $root.Registers();
            if (object.registers) {
                if (typeof object.registers !== "object")
                    throw TypeError(".Registers.registers: object expected");
                message.registers = {};
                for (var keys = Object.keys(object.registers), i = 0; i < keys.length; ++i) {
                    if (typeof object.registers[keys[i]] !== "object")
                        throw TypeError(".Registers.registers: object expected");
                    message.registers[keys[i]] = $root.Register.fromObject(object.registers[keys[i]]);
                }
            }
            return message;
        };
    
        /**
         * Creates a plain object from a Registers message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Registers
         * @static
         * @param {Registers} message Registers
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Registers.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.objects || options.defaults)
                object.registers = {};
            var keys2;
            if (message.registers && (keys2 = Object.keys(message.registers)).length) {
                object.registers = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.registers[keys2[j]] = $root.Register.toObject(message.registers[keys2[j]], options);
            }
            return object;
        };
    
        /**
         * Converts this Registers to JSON.
         * @function toJSON
         * @memberof Registers
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Registers.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        /**
         * Gets the default type url for Registers
         * @function getTypeUrl
         * @memberof Registers
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Registers.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Registers";
        };
    
        return Registers;
    })();

    return $root;
});
