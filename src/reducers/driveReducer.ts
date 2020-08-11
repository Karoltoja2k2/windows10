import Files from '../models/fileStructure2'
import File from '../models/File';

const driveReducer = (state: File[] = Files, action: any) => {
    switch (action.type){
        default: {
            return state;
        }
    }
}

export default driveReducer;