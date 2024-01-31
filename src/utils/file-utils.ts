import fs from 'node:fs';
import path from 'node:path';

export class UtilsFileUser{
    private static _userPath = ['src','assets','files'];

    private static _validateFolder(patchArray : string | Array<string>){
        if(Array.isArray(patchArray)){
        return fs.existsSync(path.resolve(...this._userPath,...patchArray));
        
    }
    return fs.existsSync(path.resolve(...this._userPath,patchArray));

}

    public static createFolderUser(patchArray : string | Array<string>){
        if(!this._validateFolder(patchArray)){
            if(Array.isArray(patchArray)){
           return fs.mkdirSync(path.resolve(...this._userPath,...patchArray));
        }
        return fs.mkdirSync(path.resolve(...this._userPath,patchArray));
        }
    }

    public static deleteFolderUser(patchArray : string | Array<string>){
        if(this._validateFolder(patchArray)){
            if(Array.isArray(patchArray)){
            return fs.rmSync(path.resolve(...this._userPath,...patchArray),{
                recursive : true,
            });
        }
        return fs.rmSync(path.resolve(...this._userPath,...patchArray),{
            recursive : true,
        });

        }
        throw new Error();
    }

}