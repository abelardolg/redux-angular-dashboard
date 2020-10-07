import { IngresoEgresoType } from '../types/IngresoEgreso.type';

export class IngresoEgresoModel {

    static fromFirebaseStore(uid: string, description: string, amount: number, operationType: IngresoEgresoType): IngresoEgresoModel {
        return new IngresoEgresoModel(description, amount, operationType, uid);
    }

    constructor(
        private _description: string
        , private _amount: number
        , private _operationType: IngresoEgresoType
        , private _uid?: string
    ){
        this.uid = _uid;
        this.description = _description;
        this.amount = _amount;
        this.operationType = _operationType;
    }

    get uid(): string {
        return this._uid;
    }

    set uid(newUID: string) {
        this._uid = newUID;
    }

    get description(): string {
        return this._description;
    }

    set description(newDescription: string) {
        this._uid = newDescription;
    }

    get amount(): number {
        return this._amount;
    }

    set amount(newAmount: number) {
        this._amount = newAmount;
    }

    get operationType(): IngresoEgresoType {
        return this._operationType;
    }

    set operationType(newOperationType: IngresoEgresoType) {
        this._operationType = newOperationType;
    }

}
