import { promises as fsPromises } from 'fs';
import { join } from 'path';

export class Logger {

  static date= new Date();
  static dateForLog: string = String(this.date.getFullYear())+'/'+String(Number(this.date.getMonth())+1)+'/'+String(this.date.getDate())+'-'+String(this.date.getHours())+':'+String(this.date.getMinutes())+':'+String(this.date.getSeconds())+':'+String(this.date.getMilliseconds());
  static async asyncWriteFile(filename:string, data: any) {
    try {
      await fsPromises.writeFile(join('./writables/logs/', filename), data, {
        flag: 'a+',
      });
    }
    catch (err) {
      console.log(err);
      return 'Something went wrong'+err;
    }
  }

  static async createFolderIfNotExist(folderName:string){
    try {
      let fs = require('fs');
      let dir = './writables/logs/'+folderName;

      if(!fs.existsSync(dir)){
        await fsPromises.mkdir(dir);
        return 'Folder created';
      } else {
        return 'Folder already exists';
      }
    }
    catch (err) {
      console.log(err);
      return 'Something went wrong'+err;
    }
  }

  static async Log(type: string, data: string) {
    try {

      let today = this.date.getDate();
      let month = this.date.getMonth();
      month = Number(month) + 1;
      let year = this.date.getFullYear();
      let filename;

      await this.createFolderIfNotExist(String(year));
      await this.createFolderIfNotExist(String(year) + '/' + String(month));
      await this.createFolderIfNotExist(String(year) + '/' + String(month) + '/' + String(today));

      switch (type) {
        case 'api': {
          filename = 'API_Log.log';
          break;
        }
        case 'server': {
          filename = 'Server_Log.log';
          break;
        }
        default: {
          filename = 'General.log';
          break;
        }
      }

      await this.asyncWriteFile(year+'/'+month+'/'+today+'/'+filename, data);
    }
    catch (err) {
      console.log(err);
      return 'Something went wrong'+err;
    }
  }

  static async callLogWithParams(msg:string, type:string){
    try {
      await this.Log(type, msg);
    }
    catch (err) {
      console.log(err);
      return 'Something went wrong'+err;
    }
  }

  static async warnLog(type:string, msg:string) {
    let message:string = '[WARN]'+'_'+this.dateForLog+'_'+msg+'\n';
    await this.callLogWithParams(message, type);
  }

  static async errorLog(type:string, msg:string) {
    let message:string = '[ERROR]'+'_'+this.dateForLog+'_'+msg+'\n';
    await this.callLogWithParams(message, type);
  }

  static async infoLog(type:string, msg:string) {
    let message:string = '[INFO]'+'_'+this.dateForLog+'_'+msg+'\n';
    await this.callLogWithParams(message, type);
  }

  static async debugLog(type:string, msg:string) {
    let message:string = '[DEBUG]'+'_'+this.dateForLog+'_'+msg+'\n';
    await this.callLogWithParams(message, type);
  }
}