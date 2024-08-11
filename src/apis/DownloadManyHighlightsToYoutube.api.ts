import { downloadRange } from "../services/downloads";
import { YoutubeUploadVideoResponse, youtubeUpload } from "../services/uploads/youtube-upload";
import { YoutubeUploadVideoDetail } from "../types/Youtube";
import { downloadManyHighlightsAPI } from "./DownloadManyHighlight.api";

export interface DownloadManyHighlightsToYoutubeRequest {
    url: string;
    highlights: {
        start: string;
        end: string;
    }[],
    detail: YoutubeUploadVideoDetail;
}

export interface DownloadManyHighlightsToYoutubeResponse {
    url: string;
}

export async function downloadManyHighlightsToYoutubeAPI(payload: DownloadManyHighlightsToYoutubeRequest):Promise<YoutubeUploadVideoResponse> {
    const downloadManyHighlightsRequest = {
        url: payload.url,
        highlights: payload.highlights,
        concatVideo: true
    }
    
    const video = await downloadManyHighlightsAPI(downloadManyHighlightsRequest)

    if (!video.concatVideo) throw new Error("No video to upload")

    return youtubeUpload(`src/dumps/${video.concatVideo!.filename}`, payload.detail)
}