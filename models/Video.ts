import mongoose,{Schema,model,models} from "mongoose";

export const VIDEO_DIMENSIONS = {
    width: 1080,
    height: 1920,
} as const;

// interface - what it does is IVideo help us to define the shape of the data
export interface IVideo{
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoURL: string;
    thumbnail: string;
    controls?:boolean;
    transformation?:{
        height:number;
        width:number;
        quality?:number;
    };
}
//different between schema and interface - interface is used to define the shape of the data , schema is used to define the structure of the data
const videoSchema = new Schema<IVideo>({
    {
        title:{type: String, required: true},
        description:{type: String, required: true},
        videoURL:{type: String, required: true},
        thumbnail:{type: String, required: true},
        controls:{type: Boolean, required: true},
        transformation:{
            height:{type: Number, default: VIDEO_DIMENSIONS.height},
            width:{type: Number, default: VIDEO_DIMENSIONS.width},
            quality:{type: Number, type: Number, min:1, max:100}},
        },
    },
    {
        timestamps: true
    }
})

const Video =  models?:Video || model<IVideo>("Video", videoSchema);

export default Video;