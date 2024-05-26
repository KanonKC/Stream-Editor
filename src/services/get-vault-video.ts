import { opendir, readdirSync } from "fs";
import { DownloadedVideo } from "../types/Video";
import { includeAll } from "../utilities/StringMatch";
import { DownloadVideoAttribute, DownloadVideoModel } from "../models/DownloadedVideo.model";
import { getTwitchVideoInfo } from "./twitch-info";
import { Model } from "sequelize";

export async function getVaultVideo(url:string):Promise<Model<DownloadVideoAttribute, DownloadVideoAttribute> | null>{

    if (url.includes("youtube")) {
        const prefixId = url.split("v=")[1];
        return DownloadVideoModel.findOne({
            where: {
                platform: "Youtube",
                platformId: prefixId
            }
        })
    }
    else if (url.includes("twitch")) {
        const data = await getTwitchVideoInfo(url)
        return DownloadVideoModel.findOne({
            where: {
                platform: "Twitch",
                platformId: data.id
            }
        })
    }

    return null
}