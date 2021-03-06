/**
 * Sequential Uploader sample
 */
import { Uploader } from '../../src/uploader/uploader';

let uploadObj: Uploader = new Uploader({
    asyncSettings: {
        saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
        removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
    },
    sequentialUpload : true
});
uploadObj.appendTo('#fileupload');