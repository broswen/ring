import * as $protobuf from "protobufjs";
import Long = require("long");
/** Properties of a Register. */
export interface IRegister {

    /** Register value */
    value?: (string|null);

    /** Register ts */
    ts?: (number|null);

    /** Register version */
    version?: ({ [k: string]: number }|null);
}

/** Represents a Register. */
export class Register implements IRegister {

    /**
     * Constructs a new Register.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRegister);

    /** Register value. */
    public value: string;

    /** Register ts. */
    public ts: number;

    /** Register version. */
    public version: { [k: string]: number };

    /**
     * Creates a new Register instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Register instance
     */
    public static create(properties?: IRegister): Register;

    /**
     * Encodes the specified Register message. Does not implicitly {@link Register.verify|verify} messages.
     * @param message Register message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRegister, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Register message, length delimited. Does not implicitly {@link Register.verify|verify} messages.
     * @param message Register message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRegister, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Register message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Register
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Register;

    /**
     * Decodes a Register message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Register
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Register;

    /**
     * Verifies a Register message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Register message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Register
     */
    public static fromObject(object: { [k: string]: any }): Register;

    /**
     * Creates a plain object from a Register message. Also converts values to other types if specified.
     * @param message Register
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Register, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Register to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Register
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a Registers. */
export interface IRegisters {

    /** Registers registers */
    registers?: ({ [k: string]: IRegister }|null);
}

/** Represents a Registers. */
export class Registers implements IRegisters {

    /**
     * Constructs a new Registers.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRegisters);

    /** Registers registers. */
    public registers: { [k: string]: IRegister };

    /**
     * Creates a new Registers instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Registers instance
     */
    public static create(properties?: IRegisters): Registers;

    /**
     * Encodes the specified Registers message. Does not implicitly {@link Registers.verify|verify} messages.
     * @param message Registers message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRegisters, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Registers message, length delimited. Does not implicitly {@link Registers.verify|verify} messages.
     * @param message Registers message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRegisters, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Registers message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Registers
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Registers;

    /**
     * Decodes a Registers message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Registers
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Registers;

    /**
     * Verifies a Registers message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Registers message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Registers
     */
    public static fromObject(object: { [k: string]: any }): Registers;

    /**
     * Creates a plain object from a Registers message. Also converts values to other types if specified.
     * @param message Registers
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Registers, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Registers to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Registers
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}
