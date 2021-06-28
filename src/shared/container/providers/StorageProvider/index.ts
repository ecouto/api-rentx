import { container } from "tsyringe"
import { LocalStorageProvider } from "./Implemetations/LocalStorageProvider"
import { S3StorageProvider } from "./Implemetations/S3StorageProvider"
import { IStorageProvider } from "./IStorageProvider"



const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.disk]
)