// twitch-dl download https://www.twitch.tv/kanonkc/clip/RefinedBlatantWoodcockPartyTime-5Z3UtcRwvm-dO4s3 -q source

import { exec } from "child_process";
import { Model } from "sequelize";
import { getTwitchVideoData } from "./get-twitch-video-data";
import { generateRandomString } from "../../../utilities/String";
import { prisma } from "../../../prisma";
import { DownloadedVideo } from "@prisma/client";
import { configDotenv } from "dotenv";

configDotenv();

export async function downloadTwitchVideo(url:string, start?:string, end?:string):Promise<DownloadedVideo> {

    const videoInfo = await getTwitchVideoData(url)
    // const randomString = generateRandomString(4)
    // const id = `twitch_${videoInfo.id}_${randomString}`
    // const filename = `${id}.mp4`

    let videoId:string;
    let filename:string;
	let command:string;

    if (start && end) {
        const startText = start.split(':').join("_");
        const endText = end.split(':').join("_");
        videoId = `twitch_${videoInfo.id}_range_${startText}-${endText}_${generateRandomString(4)}`;
        filename = `${videoId}.mp4`;
        command = `twitch-dl download ${url} -q source --start ${start} --end ${end} --overwrite -o ${process.env.VIDEO_STORAGE_PATH}/${filename}`
    }
    else {
        videoId = `twitch_${videoInfo.id}_${generateRandomString(4)}`;
        filename = `${videoId}.mp4`;
        command = `twitch-dl download ${url} -q source --overwrite -o ${process.env.VIDEO_STORAGE_PATH}/${filename}`
    }

    return new Promise((resolve, reject) => {
		exec(
			command,
			async (error, stdout, stderr) => {
				if (error) {
                    throw new Error(error.message)
				}
				else {
                    const result = await prisma.downloadedVideo.create({
                        data: {
                            title: videoInfo.title,
                            filename: filename,
                            platform: "Twitch",
                            platformId: videoInfo.id,
                        }
                    })
					resolve(result)
				}

			}
		);
	});
}