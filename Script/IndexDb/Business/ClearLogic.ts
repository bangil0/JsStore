module JsStore {
    export module IndexDb {
        export module Business {
            export class ClearLogic {
                constructor(tableName: string, onSuccess: Function, onError: Function) {
                    var ObjectStore: IDBObjectStore = DbConnection.transaction([tableName], "readwrite").Transaction.objectStore(tableName)
                        , ClearRequest = ObjectStore.clear();

                    ClearRequest.onsuccess = function (e) {
                        if (onSuccess != null) {
                            onSuccess();
                        }
                    }

                    ClearRequest.onerror = function (e) {
                        if (onError != null) {
                            onError();
                        }
                    }
                }
            }
        }
    }
}
