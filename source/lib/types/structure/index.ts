/**
 * The primitive value types for [[StructureMessage]].
 */
export type StructureValuePrimitive = 'int' | 'long' | 'float' | 'double' | 'char*';

/**
 * The type of a [[StructureValue]] of a [[StructureMessage]].
 */
export type StructureValueDefinition = {
    /** The type of the value */
    type: StructureValuePrimitive;
    /** An expression that specifies how to obtain the value from a raw message */
    value: string;
};

/**
 * The value type for a [[StructureMessage]], which can be directly the type of the value or an object defining also how to obtain the value.
 */
export type StructureValue = StructureValuePrimitive | StructureValueDefinition;

/**
 * The type of the composite value of a message, which is an object of [[StructureMessageValue]].
 */
export type StructureCompositeValue = Record<string, StructureValue>;

/**
 * The possible networks that a [[StructureMessage]] can belong to.
 */
export type StructureNetwork = 'PRIMARY' | 'SECONDARY';

/**
 * The type of the details of a message.
 */
export interface StructureMessage {
    /** The definition of the timestamp of the message */
    timestamp: StructureValuePrimitive;
    /** The definition of the value of the message */
    value: StructureValue | StructureCompositeValue;
    /** The maximum number of messages in the same document */
    maxLength: number;
    /** The name of the message */
    message?: string;
    /** The network that the message belongs to */
    network?: StructureNetwork;
    /** The definition of temporaneous variables used to extract the message value */
    defines?: Record<string, StructureValueDefinition>;
}

/**
 * The type of the arrray defining a message.
 */
export type StructureMessagesDetails = [StructureMessage];

/**
 * The type of the value of a non-message key of StructureModel, which is a group of messages.
 */
export interface StructureMessagesGroup {
    [key: string]: StructureMessagesDetails | StructureMessagesGroup;
}

/**
 * The structure model type, defining the content of a structure.model.json.
 */
export type StructureModel = {
    id: StructureValuePrimitive;
    sessionName: StructureValuePrimitive;
    timestamp: StructureValuePrimitive;
} & StructureMessagesGroup;

/**
 * A function that checks if the given data is a [[StructureNetwork]].
 * @param data The data to check
 * @returns True if the data is a [[StructureNetwork]].
 */
export function isStructureNetwork(data: any): data is StructureNetwork {
    return typeof data === 'string' && ['PRIMARY', 'SECONDARY'].includes(data);
}

/**
 * A function that checks if the given data is a [[StructureValuePrimitive]].
 * @param data The data to check
 * @returns True if the data is a [[StructureValuePrimitive]].
 */
export function isStructureValuePrimitive(data: any): data is StructureValuePrimitive {
    return typeof data === 'string' && ['int', 'long', 'float', 'double', 'char*'].includes(data);
}

/**
 * A function that checks if the given data is a [[StructureValueDefinition]].
 * @param data The data to check
 * @returns True if the data is a [[StructureValueDefinition]].
 */
export function isStructureValueDefinition(data: any): data is StructureValueDefinition {
    return typeof data === 'object' && typeof data.type === 'string' && isStructureValuePrimitive(data.value);
}

/**
 * A function that checks if the given data is a [[StructureValue]].
 * @param data The data to check
 * @returns True if the data is a [[StructureValue]].
 */
export function isStructureValue(data: any): data is StructureValue {
    return isStructureValuePrimitive(data) || isStructureValueDefinition(data);
}

/**
 * A function that checks if the given data is a [[isStructureCompositeValue]].
 * @param data The data to check
 * @returns True if the data is a [[isStructureCompositeValue]].
 */
export function isStructureCompositeValue(data: any): data is StructureCompositeValue {
    return typeof data.value === 'object' && Object.keys(data.value).every(key => isStructureValue(data.value[key]));
}

/**
 * A function that checks if the given data is a [[StructureMessage]].
 * @param data The data to check
 * @returns True if the data is a [[StructureMessage]].
 */
export function isStructureMessage(data: any): data is StructureMessage {
    return (
        typeof data === 'object' &&
        typeof data.timestamp === 'string' &&
        typeof data.maxLength === 'string' &&
        (isStructureValue(data.value) || isStructureCompositeValue(data.value)) &&
        (data.message === undefined || (typeof data.message === 'string' && data.message)) &&
        (data.network === undefined || isStructureNetwork(data.network)) &&
        (data.defines === undefined ||
            (typeof data.defines === 'object' &&
                Object.keys(data.defines).every(key => isStructureValueDefinition(data.defines[key]))))
    );
}
