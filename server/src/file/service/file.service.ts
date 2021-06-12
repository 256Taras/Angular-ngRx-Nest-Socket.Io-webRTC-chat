import {Injectable} from '@nestjs/common';

import * as  path from 'path';
import * as  fs from 'fs';
import * as uuid from 'uuid'
import {from, Observable, of} from "rxjs";

@Injectable()
export class FileService {
    constructor() {
    }

    public async uploadUserAvatar(file, phone): Promise<{ avatar: string } | null> {
        try {
            if (!file) {
                return null
            }
            const folder = phone.substring(1, 13)
            const fileExtension = this.fileExt(file)
            const fileName = folder + uuid.v4() + '.' + fileExtension

            const filePath = path.resolve(__dirname, '..', '..', 'static', 'avatar', folder)

            await this.createFileDirectory(file, filePath, fileName)

            const urlPath = {avatar: 'avatar/' + folder + '/' + fileName}
            return urlPath
        } catch (e) {
            console.log(e)
        }
    }


    private async createFileDirectory(file, filePath, fileName): Promise<void> {
        try {
            await fs.access(filePath, function (err) {
                if (err && err.code === 'ENOENT') {
                    fs.mkdir(filePath, {recursive: true}, (err) => {
                        if (err) throw err;
                        fs.writeFile(path.resolve(filePath, fileName), file.buffer, (err) => {
                            if (err) {
                                console.error(err)
                                return err
                            }
                        })
                    })
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    private fileExt(file) {
        return file.originalname.split('.').pop()
    }

}
