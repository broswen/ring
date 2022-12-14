import {Env} from "./src";

declare global {
    function getMiniflareBindings(): Env;
    function getMiniflareDurableObjectStorage(
        id: DurableObjectId
    ): Promise<DurableObjectStorage>;
    function getMiniflareDurableObjectState(id: DurableObjectId): Promise<DurableObjectState>;
}